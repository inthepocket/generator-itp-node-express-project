# <%= appName %>

## Project setup

<% if (sshRepoPath) { %>Clone this project:

    $ git clone <%= sshRepoPath %><% } %>

## Run project
<% if (dockerize) { %>
This project is using [Docker](http://www.docker.com) for the development environment. Visit the website to install the
necessary tools, then from the root directory run

Start project:

    $ make start

Stop project:

    $ make stop

to start the processes as a background task.
<% } else { %>
    $ npm start
    $ npm run watch
<% } %>
## Log files

Logging is implemented with [winston](https://github.com/winstonjs/winston) and files are stored in `./logs`

## Unit tests

The test framework [Mocha](http://mochajs.org) is used in this project. Tests are found in `./test` and
can be run via:

    $ make test

## Lint project

[ESLint](https://eslint.org) is used in this project and can be run via:

    $ make lint-local

## Code coverage

The coverage framework [Istanbul](https://github.com/gotwarlost/istanbul) is used in this project. Reports are found in `./coverage` and
can be run via:

    $ npm run coverage

## Documentation

API responses are documentated using the apidoc tool:

    $ npm run apidoc
