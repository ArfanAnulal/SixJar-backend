const express = require('express');
const router = express.Router();
const authenticateFirebaseToken = require('../middlewares/authMiddleware');
const {sayBye, getUserJars} = require('../controllers/jarsController');

router.get('/Bye',authenticateFirebaseToken, sayBye);
router.get('/getUserJars', authenticateFirebaseToken, getUserJars);

module.exports = router;