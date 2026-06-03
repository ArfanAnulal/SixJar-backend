const express = require('express');
const router = express.Router();
const authenticateFirebaseToken = require('../middlewares/authMiddleware');
const { getGoals, addGoal } = require('../controllers/goalsController');

router.get('/', authenticateFirebaseToken, getGoals);
router.post('/', authenticateFirebaseToken, addGoal);

module.exports = router;
