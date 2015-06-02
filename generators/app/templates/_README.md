##<%= appName %>

### Project setup
---
<% if (documentationUrl) { %>Documentation on Confluence:

    <%= documentationUrl %>
<% } %>
<% if (sshRepoPath) { %>Clone this project:

    git clone <%= sshRepoPath %>
<% } %>

Install Node.js

    http://nodejs.org

Install npm

    curl http://npmjs.org/install.sh | sh

Install npm dependencies

    npm install

### Log files
---

./logs
