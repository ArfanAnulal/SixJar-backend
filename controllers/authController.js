const User = require('../models/User'); 
const admin = require('firebase-admin');
/**
 * @description (Optional) Register a user from the backend in both Firebase and MongoDB.
 * This is useful for admin panels, migrations, or specific server-driven workflows.
 * The client would typically not call this for their own signup.
 */

/*
exports.registerUserBackend = async (req, res) => {
    const { email, password, displayName } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required for registration.' });
    }

    try {
        // 1. Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: displayName || email.split('@')[0],
        });

        // 2. Create user in your MongoDB, matching your schema
        const newUserInDb = new User({
            uid: userRecord.uid, // Firebase UID for your schema's 'uid' field
            email: userRecord.email,
            name: userRecord.displayName, // For your schema's 'name' field
        });
        await newUserInDb.save();

        res.status(201).json({
            message: 'User registered successfully via backend in Firebase and MongoDB.',
            user: { 
                firebaseUid: userRecord.uid, // Keep 'firebaseUid' for clarity if preferred in response
                email: userRecord.email,
                displayName: userRecord.displayName,
                profileFromDb: newUserInDb 
            }
        });

    } catch (error) {
        console.error('Error during backend user registration:', error);
        if (error.code === 'auth/email-already-exists') {
            return res.status(409).json({ message: 'The email address is already in use by another Firebase account.' });
        }
        if (error.code === 'auth/invalid-password') {
            return res.status(400).json({ message: `Password is invalid: ${error.message}` });
        }
        if (error.code === 11000) { 
            return res.status(409).json({ message: 'User with this Firebase UID or email (if unique) already exists in the database.' });
        }
        res.status(500).json({ message: 'Internal server error during backend registration.' });
    }
};
*/

