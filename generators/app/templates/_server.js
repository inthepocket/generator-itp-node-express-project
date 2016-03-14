const express     = require('express');<% if (useMongoose) { %>
const mongoose    = require('mongoose');<% } %>
const bodyParser  = require('body-parser');
const path        = require('path');
const log4js      = require('log4js');<% if (apiInfoRoute) { %>
const apiRouterV1 = require('./routes/api_router_v1');<% } if (includeEjsTemplateEngine) { %>
const appRouter   = require('./routes/app_router');<% } %>
const logger      = require('./utils/logger');

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

app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO, format: ':method :url :status' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));<% if (includeEjsTemplateEngine) { %>
app.set('view engine', 'ejs');<% } if (apiInfoRoute) { %>
app.use('/v1/', apiRouterV1);<% } if (includeEjsTemplateEngine) { %>
app.use('/', appRouter);<% } %>

// Default error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    code: err.message,
    message: err.message
  });
});

const server = app.listen(port, function() {
  console.log('Listening on port %d', server.address().port);
});

module.exports = app;
