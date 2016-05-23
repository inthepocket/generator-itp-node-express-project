<% if (includeNewRelic) { %>// Initialise New Relic if an app name and license key exists
if (process.env.NEW_RELIC_APP_NAME && process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

<% } %>const express     = require('express');<% if (useMongoose) { %>
const mongoose    = require('mongoose');<% } %>
const bodyParser  = require('body-parser');
const path        = require('path');
const winston     = require('winston');<% if (apiInfoRoute) { %>
const apiRouterV1 = require('./routes/api_router_v1');<% } if (includeEjsTemplateEngine) { %>
const appRouter   = require('./routes/app_router');<% } %>

const port        = process.env.PORT || 3000;<% if (useMongoose) { %>
const dbUrl       = process.env.MONGO_URI || 'mongodb://localhost/<%= appName %>';
const dbOptions   = { server: { socketOptions: { keepAlive: 1 } } };

// Connect to mongodb
const connect = function() {
  mongoose.connect(dbUrl, dbOptions);
};

connect();

mongoose.connection.on('error', console.error);
mongoose.connection.on('disconnected', connect);<% } %>

// Globals
global.appRootPath = path.resolve(__dirname);

// App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));<% if (includeEjsTemplateEngine) { %>
app.set('view engine', 'ejs');<% } if (apiInfoRoute) { %>
app.use('/v1/', apiRouterV1);<% } if (includeEjsTemplateEngine) { %>
app.use('/', appRouter);<% } %>

// Logging
winston.add(winston.transports.File, { filename: 'logs/<%= appName %>.log' });

app.use(function (req, res, next) {
  winston.info(req.method, req.url, res.statusCode);
  next();
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    code: err.message,
    message: err.message,
  });
});

const server = app.listen(port, function () {
  winston.log('info', 'Listening on port %d', server.address().port);
});

module.exports = app;
