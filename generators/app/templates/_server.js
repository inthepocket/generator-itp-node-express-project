const express = require('express');<% if (useMongoose) { %>
const mongoose = require('mongoose');<% } %>
const bodyParser = require('body-parser');
const path = require('path');<% if (includeSentry) { %>
const config = require('config');
const raven = require('raven');<% } %>
const logger = require('./utils/logger');<% if (apiInfoRoute) { %>
const apiRouterV1 = require('./routes/api_router_v1');<% } %>

const port = process.env.PORT || 3000;<% if (useMongoose) { %>
const dbUrl = process.env.MONGO_URI || 'mongodb://<% if (dockerize) { %>mongo<% } else { %>localhost<% } %>/<%= appName %>';
const dbOptions = { server: { socketOptions: { keepAlive: 1 } } };

// Connect to mongodb
const connect = () => {
  mongoose.connect(dbUrl, dbOptions);
};

connect();

mongoose.connection.on('error', console.error);
mongoose.connection.on('disconnected', connect);<% } %>

// Globals
global.appRootPath = path.resolve(__dirname);

// App
const app = express();<% if (includeSentry) { %>

// Sentry exception logging
if (config.get('sentry.enabled')) {
  app.use(raven.middleware.express.requestHandler(config.get('sentry.dsn')));
}<% } %>

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));<% if (apiInfoRoute) { %>
app.use('/v1/', apiRouterV1);<% } %>

app.use((req, res, next) => {
  logger.info(req.method, req.url, res.statusCode);
  next();
});<% if (includeSentry) { %>

// Sentry exception logging
if (config.get('sentry.enabled')) {
  app.use(raven.middleware.express.errorHandler(config.get('sentry.dsn')));
}<% } %>

// Default error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const errorResponse = {
    code: err.code,
    message: err.message,
  };<% if (includeSentry) { %>

  if (config.get('sentry.enabled') && res.sentry) {
    errorResponse.sentryCode = res.sentry;
  }<% } %>

  res.send(errorResponse);

  next();
});

const server = app.listen(port, () => {
  logger.info(`Listening on port ${server.address().port}`);
});

module.exports = app;
