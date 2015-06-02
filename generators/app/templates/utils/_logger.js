var Logger = {};

var log4js = require('log4js');

log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('./logs/<%= appName %>-log.log'), '<%= appName %>-log');

Logger = log4js.getLogger('<%= appName %>-log');
Logger.setLevel('INFO');

module.exports = Logger;
