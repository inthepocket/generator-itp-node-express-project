'use strict';

var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var yosay  = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('ITP Node Express project') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is your app\'s name ?',
      default: 'itp-myProject-node'
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
      message: 'What is the project url on Confluence?',
      default: 'https://confluence.itpservices.be/display/itp-myProject-node'
    },
    {
      type: 'input',
      name: 'sshRepoPath',
      message: 'What is the SSH repo path of the project?',
      default: 'git@bitbucket.org:inthepocket/itp-myProject-node.git'
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
    },
    {
      type: 'confirm',
      name: 'includeEjsTemplateEngine',
      message: 'Would you like to include EJS (template engine) in your project?',
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

      if (this.props.includeEjsTemplateEngine) {
        mkdirp(this.destinationPath('views'));
      }

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
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
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

      // Views - template engine EJS
      if (this.props.includeEjsTemplateEngine) {
        this.fs.copy(
          this.templatePath('routes/_app_router.js'),
          this.destinationPath('routes/app_router.js')
        );

        this.template(
          this.templatePath('views/_index.ejs'),
          this.destinationPath('views/index.ejs'),
          this.props
        );
      }

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
          this.templatePath('routes/_api_router_v1.js'),
          this.destinationPath('routes/api_router_v1.js')
        );

        this.fs.copy(
          this.templatePath('controllers/_api_controller.js'),
          this.destinationPath('controllers/api_controller.js')
        );
      }
    }
  },

  install: function () {
    // Install npm packages
    this.spawnCommand('npm', ['install', 'express', '--save']);
    this.spawnCommand('npm', ['install', 'ejs', '--save']);

    if (this.props.useMongoose) {
      this.spawnCommand('npm', ['install', 'mongoose', '--save']);
    }

    this.spawnCommand('npm', ['install', 'config', '--save']);
    this.spawnCommand('npm', ['install', 'log4js', '--save']);
    this.spawnCommand('npm', ['install', 'body-parser', '--save']);
    this.spawnCommand('npm', ['install', 'tv4', '--save']);
    this.spawnCommand('npm', ['install', 'underscore', '--save']);
    this.spawnCommand('npm', ['install', 'moment', '--save']);

    this.spawnCommand('npm', ['install', 'gulp', '--save-dev']);
    this.spawnCommand('npm', ['install', 'gulp-nodemon', '--save-dev']);
  }
});
