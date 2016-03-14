const express       = require('express');
const apiController = require('../controllers/api_controller');

const router = express.Router();

// Define API routes
router.get('/info', apiController.info);

module.exports = router;
