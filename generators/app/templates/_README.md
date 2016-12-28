# <%= appName %>

## Project setup

<% if (sshRepoPath) { %>Clone this project:

    git clone <%= sshRepoPath %><% } %>

Install Node.js (latest LTS)

    http://nodejs.org

Install npm

    curl http://npmjs.org/install.sh | sh

Install yarn

    brew update
    brew install yarn

Install all dependencies

    yarn install

## Run project
<% if (dockerize) { %>
This project is using [Docker](http://www.docker.com) for the development environment. Visit the website to install the
necessary tools, then from the root directory run

    docker-compose up -d

to start the processes as a background task.
<% } else { %>
    npm start
    npm run watch
<% } %>
## Log files

Logging is implemented with [winston](https://github.com/winstonjs/winston) and files are stored in `./logs`
<% if (includeUnitTesting) { %>
## Unit tests

The test framework [Mocha](http://mochajs.org) is used in this project. Tests are found in `./test` and
can be run via:

    npm test

## Code coverage

The coverage framework [Istanbul](https://github.com/gotwarlost/istanbul) is used in this project. Reports are found in `./coverage` and
can be run via:

    npm run coverage
<% } %>
## Documentation

API responses are documentated using the apidoc tool:

    npm run apidoc
