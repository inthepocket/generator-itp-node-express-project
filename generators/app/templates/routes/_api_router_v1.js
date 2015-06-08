var express       = require('express');
var apiController = require('../controllers/api_controller');

var router        = express.Router();

// Api routes
router.get('/v1', apiController.info);

module.exports = router;
