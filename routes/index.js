const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
router.use('/jars', require('./jars'));
router.use('/goals', require('./goals'));
router.use('/categories', require('./categories'));

module.exports = router;