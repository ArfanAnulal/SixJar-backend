const express = require('express');
const router = express.Router();
const {sayBye} = require('../controllers/jarsController');

router.get('/Bye', sayBye);

module.exports = router;