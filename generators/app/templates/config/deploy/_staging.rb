# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :app, %w{staging@<%= appName %>.inthepocket.mobi}
role :web, %w{staging@<%= appName %>.inthepocket.mobi}

# Example SSH forwarding config
set :ssh_options, {
  keys: %w('~/.ssh/id_rsa'),
  forward_agent: true,
  auth_methods: %w(publickey),
}
