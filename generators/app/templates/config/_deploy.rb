# config valid only for current version of Capistrano
lock '3.6.1'

set :application, '<%= appName %>'
set :repo_url, '<%= sshRepoPath %>'

# Default branch is :master
ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/var/www/<%= appName %>.inthepocket.mobi'

# Path to tmp directory
set :tmp_dir, deploy_to + '/tmp'

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :debug

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

set :stages, ["staging", "test", "production"]
# set :default_stage, "staging"

after :deploy, :clear_cache do
	on roles(:web) do
		within release_path do

			info 'Install node packages'
			execute :npm, 'install'

			info 'Run Gulp'
			execute :node, './node_modules/.bin/gulp'

			info 'Restart the server'
			execute :bash, '../../reload_nodejs.sh'

		end
	end
end

task :rollback, :clear_cache do
	on roles(:web) do
		within release_path do

			info 'Install node packages'
			execute :npm, 'install'

			info 'Run Gulp'
            execute :node, './node_modules/.bin/gulp'

			info 'Restart the server'
			execute :bash, '../../reload_nodejs.sh'

		end
	end
end
