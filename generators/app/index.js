'use strict';

var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('ItpApiProjectSetupNode') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is your app\'s name ?',
      default: 'itp-myProject-api-node'
    },
    {
      type: 'confirm',
      name: 'createProjectDirectory',
      message: 'Would you like to create a new directory for your project?',
      default: true
    },
    {
      type: 'input',
      name: 'documentationUrl',
      message: 'Wat is the project url on Confluence?'
    },
    {
      type: 'input',
      name: 'sshRepoPath',
      message: 'Wat is the SSH repo path of the project?',
      default: 'git@bitbucket.org:inthepocket/itp-myProject-api-node.git'
    },
    {
      type: 'confirm',
      name: 'apiInfoRoute',
      message: 'Create test/info api route?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useMongoose',
      message: 'Would you like to include Mongoose in your project?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;

      // Set destination root path for project
      if (this.props.createProjectDirectory) {
        this.destinationRoot(this.props.appName);
      }

      done();
    }.bind(this));
  },

  writing: {
    scaffoldFolders: function() {
      this.log('\n');
      this.log(chalk.blue('- Create project directory structure.'));

      mkdirp(this.destinationPath('app'));
      mkdirp(this.destinationPath('config'));
      mkdirp(this.destinationPath('controllers'));
      mkdirp(this.destinationPath('logs'));
      mkdirp(this.destinationPath('public'));
      mkdirp(this.destinationPath('routes'));
      mkdirp(this.destinationPath('utils'));

      if (this.props.useMongoose) {
        mkdirp(this.destinationPath('schemas'));
      }
    },

    copyMainFiles: function () {
      this.log(chalk.blue('- Copy main files.'));

      this.template(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        this.props
      );

      this.template(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );

      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );

      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    copyProjectfiles: function () {
      this.log(chalk.blue('- Copy project files.'));

      // Config files
      this.template(
        this.templatePath('config/_default.json'),
        this.destinationPath('config/default.json'),
        this.props
      );

      this.template(
        this.templatePath('config/_staging.json'),
        this.destinationPath('config/staging.json'),
        this.props
      );

      this.template(
        this.templatePath('config/_production.json'),
        this.destinationPath('config/production.json'),
        this.props
      );

      // Utils
      this.template(
        this.templatePath('utils/_logger.js'),
        this.destinationPath('utils/logger.js'),
        this.props
      );

      // DB
      if (this.props.useMongoose) {
        this.fs.copy(
          this.templatePath('schemas/_index.js'),
          this.destinationPath('schemas/index.js')
        );

        this.fs.copy(
          this.templatePath('schemas/_sample_schema.js'),
          this.destinationPath('schemas/sample_schema.js')
        );
      }

      // Project files
      this.template(
        this.templatePath('_server.js'),
        this.destinationPath('server.js'),
        this.props
      );

      if (this.props.apiInfoRoute) {
        this.fs.copy(
          this.templatePath('routes/_router_v1.js'),
          this.destinationPath('routes/router_v1.js')
        );

        this.fs.copy(
          this.templatePath('controllers/_api_controller.js'),
          this.destinationPath('controllers/api_controller.js')
        );
      }
    }
  },

  install: function () {

    this.installDependencies({
      bower: false,
      npm: true,
      callback: null
    });
  }
});
