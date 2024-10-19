const express = require('express');
const userRoutes = require('./user.routes.js');
const serviceRoutes = require('./service.routes.js');
const transactionRoutes = require('./transaction.routes.js');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/services', serviceRoutes)
router.use('/transactions', transactionRoutes)

module.exports = router;