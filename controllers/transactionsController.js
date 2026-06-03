const Transaction = require('../models/Transaction');
const { getUserIdFromToken} = require('../utils/tokenHelpers');
const { splitIncomeIntoJars, checkJarExistsAndBalance, updateJarBalance } = require('../utils/jarHelpers');



async function addIncome(req, res) {
  try {
    const uid = getUserIdFromToken(req.user); // from auth middleware
    const { amount, notes, categoryId } = req.body;
    

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid income amount' });
    }

    // 1. Save overall income transaction 
    await Transaction.create({
      uid,
      type: 'Income',
      jarName: 'Split between jars',
      amount,
      notes: notes || '',
      categoryId: categoryId || null,
    });

    // 2. Calculate and update jars 
    await splitIncomeIntoJars(uid, amount);

    res.status(201).json({ message: 'Income added and split successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error adding income' });
  }
}

async function addExpense(req, res) {
  try {
    const uid = getUserIdFromToken(req.user);
    const { jarName, amount, notes } = req.body;

    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: 'Invalid expense amount' });
    }  
    if (!jarName) {
      return res.status(400).json({ message: 'Jar name is required' });
    }

    await checkJarExistsAndBalance(uid, jarName, amount);

    // 1. Save overall expense transaction
    await Transaction.create({
      uid,
      type: 'Expense',
      jarName,
      amount,
      notes: notes || '',
    });

    // 2. Calculate and update jars
    await updateJarBalance(uid, jarName, amount);

    res.status(201).json({ message: 'Expense added and jar updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });;
  }
}

async function getTransactions(req, res) {
  try {
    const uid = getUserIdFromToken(req.user);
    const transactions = await Transaction.find({ uid });
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error fetching transactions' });
  }
}

async function getMonthlySummary(req, res) {
  try {
    const uid = getUserIdFromToken(req.user); // assuming req.user has the token info

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const transactions = await Transaction.find({
      uid,
      createdAt: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
    });

    let incomeSum = 0;
    let expenseSum = 0;

    transactions.forEach((txn) => {
      if (txn.type === 'Income') {
        incomeSum += txn.amount;
      } else if (txn.type === 'Expense') {
        expenseSum += txn.amount;
      }
    });

    res.status(200).json({ income: incomeSum, expense: expenseSum });
  } catch (error) {
    console.error('Error fetching monthly summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = { addIncome, addExpense, getTransactions, getMonthlySummary };