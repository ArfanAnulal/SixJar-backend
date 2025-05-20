const express = require('express');
const router = express.Router();   
const authenticateFirebaseToken = require('../middlewares/authMiddleware');     
const {addIncome} = require('../controllers/transactionsController');

router.post('/income', authenticateFirebaseToken, addIncome);

module.exports = router;