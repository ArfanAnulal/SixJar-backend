const express = require('express');
const router = express.Router();   
const authenticateFirebaseToken = require('../middlewares/authMiddleware');     
const {addIncome, addExpense} = require('../controllers/transactionsController');

router.post('/income', authenticateFirebaseToken, addIncome);
router.post('/expense', authenticateFirebaseToken, addExpense);

module.exports = router;