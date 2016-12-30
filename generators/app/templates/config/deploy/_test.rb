# Clean up text output for more readable logs
set :format, :simpletext

# Don't keep any previous releases when testing as this just uses up workspace
set :keep_releases, 0

# Example SSH forwarding config
set :ssh_options, {
  keys: %w('~/.ssh/id_rsa'),
  forward_agent: true,
  auth_methods: %w(publickey),
}
