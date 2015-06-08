var express    = require('express');<% if (useMongoose) { %>
var mongoose   = require('mongoose');<% } %>
var bodyParser = require('body-parser');
var path       = require('path');
var log4js     = require('log4js');<% if (apiInfoRoute) { %>
var routerV1   = require('./routes/router_v1');<% } %>
var logger     = require('./utils/logger');

var port       = process.env.PORT || 3000;<% if (useMongoose) { %>
var dbUrl      = process.env.MONGO_URI || 'mongodb://localhost/<%= appName %>';
var dbOptions  = { server: { socketOptions: { keepAlive: 1 } } };

// Connect to mongodb
var connect = function() {
  mongoose.connect(dbUrl, dbOptions);
};

connect();

mongoose.connection.on('error', console.error);
mongoose.connection.on('disconnected', connect);<% } %>

// Globals
global.appRootPath = path.resolve(__dirname);

// App
var app = express();

app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO, format: ':method :url :status' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));<% if (apiInfoRoute) { %>
app.use('/v1/', routerV1);<% } %>

// Default error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    code: err.message,
    message: err.message
  });
});

var server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = app;
