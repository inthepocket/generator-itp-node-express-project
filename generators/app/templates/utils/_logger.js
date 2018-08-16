const { format, loggers, transports } = require('winston');

loggers.add('default', {
  transports: [
    new transports.Console(),
  ],
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
});

module.exports = loggers.get('default');
