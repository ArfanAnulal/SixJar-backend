const express = require('express');
const router = express.Router();
const {syncUserProfile, getCurrentUserProfile} = require('../controllers/usersController'); 
const authenticateFirebaseToken = require('../middlewares/authMiddleware');

// Route for client to call after it has successfully signed up/logged in with Firebase Client SDK.
// This endpoint ensures a user profile exists in MongoDB and/or updates it.
// It requires a valid Firebase ID token.
router.post('/sync-user', authenticateFirebaseToken, syncUserProfile);

// Route to get current authenticated user's profile from MongoDB
// Requires a valid Firebase ID token.
router.get('/me', authenticateFirebaseToken, getCurrentUserProfile);

module.exports = router;