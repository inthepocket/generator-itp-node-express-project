const config = require('config');
const winston = require('winston');

/**
 * @api {get} /v1/info  info
 * @apiVersion 1.0.0
 * @apiName info
 * @apiGroup Default
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
exports.info = (req, res) => {
  // Test logging
  winston.info('[ApiController] Info test log');
  winston.error('[ApiController] Error test log');

  // Load app name from the config file
  let appName = 'App name';

  if (config.has('app.name')) {
    appName = config.get('app.name');
  }

  res.json({
    appName,
    version: 'v1',
  });
};
