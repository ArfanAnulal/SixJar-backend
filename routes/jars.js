const express = require('express');
const router = express.Router();
const authenticateFirebaseToken = require('../middlewares/authMiddleware');
const {sayBye} = require('../controllers/jarsController');

router.get('/Bye',authenticateFirebaseToken, sayBye);

module.exports = router;