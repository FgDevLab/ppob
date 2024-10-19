const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller.js');
const { authenticate } = require('../middleware/auth.middleware.js');
const { validators } = require('../utils/validations.js');
const { validate } = require('../middleware/validation.middleware.js');


router.post('/topup', authenticate, validate(validators.topup), transactionController.topupTransaction);
router.post('/payment', authenticate, validate(validators.payment), transactionController.paymentTransaction);
router.get('/', authenticate, transactionController.getTransactions);

module.exports = router;
