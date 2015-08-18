var express       = require('express');
var apiController = require('../controllers/api_controller');

var router        = express.Router();

// Api routes
router.get('/info', apiController.info);

module.exports = router;
