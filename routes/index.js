const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/transactions', require('./transactions'));
router.use('/jars', require('./jars'));

module.exports = router;