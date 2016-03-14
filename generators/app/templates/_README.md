# <%= appName %>

## Project setup

<% if (documentationUrl) { %>Documentation on Confluence:

    <%= documentationUrl %>
<% } %>
<% if (sshRepoPath) { %>Clone this project:

    git clone <%= sshRepoPath %><% } %>

Install Node.js (the minimum expected version for this project is v4)

    http://nodejs.org

Install npm

    curl http://npmjs.org/install.sh | sh

Install npm dependencies

    npm install

## Run project

This project uses [Gulp](http://gulpjs.com/) as build system. The default task is "dev".

    gulp [dev]

## Log files

Logging is implemented with [log4js](https://github.com/nomiddlename/log4js-node) and files are stored
in `./logs`

<% if (includeUnitTesting) { %>## Unit tests

The test framework [Mocha](http://mochajs.org) is used in this project. Tests are found in `./test` and
can be run via:

    npm test<% } %>
