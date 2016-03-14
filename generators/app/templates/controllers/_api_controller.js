const config = require('config');
const logger = require('../utils/logger');

const ApiController = {
  info: function(req, res) {

    // Test logging
    logger.info('[ApiController] Info test log');
    logger.error('[ApiController] Error test log');

    // Load app name from the config file
    var appName = 'App name';

    if (config.has('app.name')) {
      appName = config.get('app.name');
    }

    res.send(appName + ': v1');
  }
}

module.exports = ApiController;
