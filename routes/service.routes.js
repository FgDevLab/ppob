const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller.js');

router.get('/', serviceController.getAllServices);

module.exports = router;