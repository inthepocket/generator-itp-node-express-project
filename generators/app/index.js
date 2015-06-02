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
      mkdirp(this.destinationPath('schemas'));
      mkdirp(this.destinationPath('utils'));
    },

    copyMainFiles: function () {
      this.log(chalk.blue('- Copy main files.'));

      var context = {
        appName: this.props.appName,
        documentationUrl: this.props.documentationUrl,
        sshRepoPath: this.props.sshRepoPath,
      };

      this.template(
        this.templatePath('_README.md'),
        this.destinationPath('README.md'),
        context
      );

      this.template(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        context
      );

      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );

      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    copyProjectfiles: function () {
      this.log(chalk.blue('- Copy project files.'));

      var context = {
        appName: this.props.appName,
        documentationUrl: this.props.documentationUrl,
        sshRepoPath: this.props.sshRepoPath,
        apiInfoRoute: this.props.apiInfoRoute
      };

      // Config files
      this.template(
        this.templatePath('config/_default.json'),
        this.destinationPath('config/default.json'),
        context
      );

      this.template(
        this.templatePath('config/_staging.json'),
        this.destinationPath('config/staging.json'),
        context
      );

      this.template(
        this.templatePath('config/_production.json'),
        this.destinationPath('config/production.json'),
        context
      );

      // Utils

      this.template(
        this.templatePath('utils/_logger.js'),
        this.destinationPath('utils/logger.js'),
        context
      );

      // Project files
      this.template(
        this.templatePath('_server.js'),
        this.destinationPath('server.js'),
        context
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
