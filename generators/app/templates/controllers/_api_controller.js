const config = require('config');
const logger = require('../utils/logger');

/**
 * @api {get} /info  info
 * @apiVersion 0.1.0
 * @apiName info
 * @apiGroup Info
 * @apiDescription Sample api call
 *
 * @apiSuccess {String} appName  Name of the app
 * @apiSuccess {String} version Api version
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "appName": "itp-myProject-node",
 *       "version": "v1"
 *     }
 */
const ApiController = {
  info: function (req, res) {

    // Test logging
    logger.info('[ApiController] Info test log');
    logger.error('[ApiController] Error test log');

    // Load app name from the config file
    var appName = 'App name';

    if (config.has('app.name')) {
      appName = config.get('app.name');
    }

    const response = {
      appName: appName,
      version: 'v1',
    };

    res.json(response);
  },
};

module.exports = ApiController;
