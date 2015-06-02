var express               = require('express');
var apiController         = require('../controllers/api_controller');

var router                = express.Router();

// Routes
router.get('/', apiController.info);

module.exports = router;
