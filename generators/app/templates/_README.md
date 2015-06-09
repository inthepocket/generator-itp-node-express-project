##<%= appName %>

### Project setup
---
<% if (documentationUrl) { %>Documentation on Confluence:

    <%= documentationUrl %>
<% } %>
<% if (sshRepoPath) { %>Clone this project:

    git clone <%= sshRepoPath %><% } %>

Install Node.js

    http://nodejs.org

Install npm

    curl http://npmjs.org/install.sh | sh

Install npm dependencies

    npm install

### Run project
---

This project uses Gulp as build system

    gulp dev

### Log files
---

./logs

<% if (includeUnitTesting) { %>### Unit tests
---
Test JavaScript framework Mocha: http://mochajs.org

Run Unit tests

    npm test<% } %>
