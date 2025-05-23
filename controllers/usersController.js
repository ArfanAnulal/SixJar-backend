const User = require('../models/User'); 
const admin = require('../config/firebaseAdmin');
const { setDefaultJar } = require('../utils/jarHelpers');

/**
 * @description Create/Sync a user profile in MongoDB after successful Firebase client-side signup/login.
 * The client should call this endpoint AFTER Firebase authentication is successful on the client-side
 * and should send the Firebase ID token in the Authorization header.
 * This endpoint should be protected by your authMiddleware.
 */

const syncUserProfile = async (req, res) => {
    try {
        // req.user is populated by your authMiddleware after verifying the Firebase ID token
        // It contains the decoded token, including uid, email, name (displayName), etc.
        const { uid: firebaseTokenUid, email, name: displayNameFromToken} = req.user;

        // Check if user already exists in MongoDB using the 'uid' field from your schema
        let user = await User.findOne({ uid: firebaseTokenUid });
        console.log('Found user:', user);

        if (user) {
            // User already exists, timestamps:true will update 'updatedAt'
            // Sync displayName if it has changed in Firebase
            if (displayNameFromToken && user.name !== displayNameFromToken) {
                user.name = displayNameFromToken;
            }

            await user.save();
            return res.status(200).json({ message: 'User profile synced.', user });
        }

        // Create new user in MongoDB
        // Use displayName from token, or from request body (if client sends it for new profiles), or derive from email
        const newDisplayName = displayNameFromToken || req.body.name || email.split('@')[0];

        const newUser = new User({
            uid: firebaseTokenUid, 
            email: email,
            name: newDisplayName,  
        });

        await newUser.save();
        await setDefaultJar(newUser.uid);

        res.status(201).json({ message: 'User profile created successfully in MongoDB.', user: newUser });

    } catch (error) {
        console.error('Error syncing user profile in MongoDB:', error);
        if (error.code === 11000) { // MongoDB duplicate key error (likely on your 'uid' field)
            return res.status(409).json({ message: 'User with this Firebase UID already exists in MongoDB.' });
        }
        res.status(500).json({ message: 'Internal server error while syncing user profile.' });
    }
};

/**
 * @description Get the current authenticated user's profile from MongoDB.
 * This endpoint should be protected by your authMiddleware.
 * Client calls this after login to get their app-specific profile data.
 */
const getCurrentUserProfile = async (req, res) => {
    try {
        // req.user is populated by your authMiddleware
        const { uid: firebaseTokenUid } = req.user; // uid from Firebase token

        // Find user in MongoDB by the 'uid' field which stores the Firebase UID
        const user = await User.findOne({ uid: firebaseTokenUid });
        console.log('Found user:', user);

        if (!user) {
            return res.status(404).json({ message: 'User profile not found in MongoDB. Please complete the profile sync process.' });
        }

        res.status(200).json(user);

    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error while fetching user profile.' });
    }
};



module.exports = {syncUserProfile, getCurrentUserProfile}