const express           = require('express');
const defaultController = require('../controllers/v1/default');

const router = express.Router();

// Define API routes
router.get('/info', defaultController.info);

module.exports = router;
