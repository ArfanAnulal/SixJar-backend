const express = require('express');
const router = express.Router();   
const authenticateFirebaseToken = require('../middlewares/authMiddleware');     
const {addIncome, addExpense, getTransactions, getMonthlySummary} = require('../controllers/transactionsController');

router.post('/income', authenticateFirebaseToken, addIncome);
router.post('/expense', authenticateFirebaseToken, addExpense);
router.get('/getTransactions', authenticateFirebaseToken, getTransactions);
router.get('/getMonthlySummary', authenticateFirebaseToken, getMonthlySummary);

module.exports = router;