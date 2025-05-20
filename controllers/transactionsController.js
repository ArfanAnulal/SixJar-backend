const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');
const { getUserIdFromToken } = require('../utils/helpers');

const JAR_PERCENTAGES = {
  Necessities: 55,
  Savings: 10,
  Education: 10,
  Play: 10,
  Give: 5,
  Investment: 10,
};

async function addIncome(req, res) {
  try {
    const uid = getUserIdFromToken(req.user); // from auth middleware
    const { amount, notes } = req.body;
    

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid income amount' });
    }

    // 1. Save overall income transaction (optional)
    await Transaction.create({
      uid,
      type: 'Income',
      jarName: 'Split between jars',
      amount,
      notes: notes || '',
    });

    // 2. Calculate and update jars + create separate income transactions
    const jarUpdates = [];
    for (const [jarName, percent] of Object.entries(JAR_PERCENTAGES)) {
      const jarAmount = (amount * percent) / 100;

      jarUpdates.push(
        Jar.findOneAndUpdate(
         { uid, jarName },
         { $inc: { currentAmount: jarAmount } },
         { new: true, upsert: true }
        )
     );
    }

    await Promise.all(jarUpdates);

    res.status(201).json({ message: 'Income added and split successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error adding income' });
  }
}

module.exports = { addIncome };