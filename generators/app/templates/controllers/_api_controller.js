var ApiController   = {};

var logger          = require('../utils/logger');
var config          = require('config');

// Routes
ApiController.info = function(req, res) {

  // Test logs
  logger.info('[ApiController] Info test log');
  logger.error('[ApiController] Error test log');

  // Load app name from the config file
  var appName = 'App name';

  if (config.has('app.name')) {
    appName = config.get('app.name');
  }
  
  res.send(appName + ': v1');
};

module.exports = ApiController;
