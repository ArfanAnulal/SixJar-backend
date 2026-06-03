const express = require('express');
const router = express.Router();
const authenticateFirebaseToken = require('../middlewares/authMiddleware');
const { getCategories, addCategory } = require('../controllers/categoriesController');

router.get('/', authenticateFirebaseToken, getCategories);
router.post('/', authenticateFirebaseToken, addCategory);

module.exports = router;
