const express = require('express');
const router = express.Router();        
const {sayHello} = require('../controllers/transactionsController');

router.get('/Hello', sayHello);

module.exports = router;