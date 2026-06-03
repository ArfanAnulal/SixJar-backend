const Goal = require('../models/Goal');
const { getUserIdFromToken } = require('../utils/tokenHelpers');

// @desc    Get all goals for a user
// @route   GET /api/goals
const getGoals = async (req, res) => {
  try {
    const uid = getUserIdFromToken(req.user);
    const goals = await Goal.find({ uid }).sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching goals' });
  }
};

// @desc    Add a new goal
// @route   POST /api/goals
const addGoal = async (req, res) => {
  try {
    const uid = getUserIdFromToken(req.user);
    const { goalName, targetAmount } = req.body;

    if (!goalName || !targetAmount) {
      return res.status(400).json({ message: 'Goal name and target amount are required.' });
    }

    const newGoal = new Goal({
      uid,
      goalName,
      targetAmount,
    });

    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: 'Server error while adding a new goal' });
  }
};

module.exports = { getGoals, addGoal };
