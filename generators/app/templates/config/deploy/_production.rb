# Example SSH forwarding config
set :ssh_options, {
  keys: %w('~/.ssh/id_rsa'),
  forward_agent: true,
  auth_methods: %w(publickey),
  port: 9999
}
