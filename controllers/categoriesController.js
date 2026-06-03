const Category = require('../models/Category');
const { getUserIdFromToken } = require('../utils/tokenHelpers');

// @desc    Get all categories for a user
// @route   GET /api/categories
const getCategories = async (req, res) => {
  try {
    const uid = getUserIdFromToken(req.user);
    const categories = await Category.find({ uid }).sort({ categoryName: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching categories' });
  }
};

// @desc    Add a new category
// @route   POST /api/categories
const addCategory = async (req, res) => {
  try {
    const uid = getUserIdFromToken(req.user);
    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required.' });
    }

    const newCategory = new Category({
      uid,
      categoryName,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'This category already exists.' });
    }
    res.status(500).json({ message: 'Server error while adding a new category' });
  }
};

module.exports = { getCategories, addCategory };
