'use strict';

const generators = require('yeoman-generator');
const chalk  = require('chalk');
const yosay  = require('yosay');
const mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

  /**
   * Definition of user prompts
   */
  prompting: function () {
    const done = this.async();

    this.log(yosay(
      'Welcome to the terrific ' + chalk.red('ITP Node Express project') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What is your app\'s name ?',
      default: 'itp-myProject-node',
    }, {
      type: 'confirm',
      name: 'createProjectDirectory',
      message: 'Would you like to create a new directory for your project?',
      default: true,
    }, {
      type: 'input',
      name: 'documentationUrl',
      message: 'What is the project url on Confluence?',
      default: 'https://confluence.itpservices.be/display/itp-myProject-node',
    }, {
      type: 'input',
      name: 'sshRepoPath',
      message: 'What is the SSH repo path of the project?',
      default: 'git@bitbucket.org:inthepocket/itp-myProject-node.git',
    }, {
      type: 'confirm',
      name: 'apiInfoRoute',
      message: 'Create test/info api route?',
      default: true,
    }, {
      type: 'confirm',
      name: 'useMongoose',
      message: 'Would you like to include Mongoose in your project?',
      default: false,
    }, {
      type: 'confirm',
      name: 'includeMomentJs',
      message: 'Would you like to include Moment.js in your project?',
      default: false,
    }, {
      type: 'confirm',
      name: 'includeEjsTemplateEngine',
      message: 'Would you like to include EJS (template engine) in your project?',
      default: false,
    }, {
      type: 'confirm',
      name: 'includeUnitTesting',
      message: 'Would you like to include Unit Testing in your project? ',
      default: true,
    }, {
      type: 'confirm',
      name: 'includeNewRelic',
      message: 'Would you like to include New Relic in your project? ',
      default: true,
    }, {
      type: 'confirm',
      name: 'includeSentry',
      message: 'Would you like to include Sentry (exception logging) in your project? ',
      default: true,
    }, {
      type: 'confirm',
      name: 'includeCapistrano',
      message: 'Would you like to include Capistrano in your project? ',
      default: true,
    }, {
      type: 'confirm',
      name: 'dockerize',
      message: 'Would you like to use Docker for your development environment?',
      default: false,
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
    /**
     * Folder structure creation
     */
    scaffoldFolders: function () {
      this.log('\n');
      this.log(chalk.blue('- Create project directory structure'));

      mkdirp(this.destinationPath('app'));
      mkdirp(this.destinationPath('config'));
      mkdirp(this.destinationPath('controllers/v1'));
      mkdirp(this.destinationPath('logs'));
      mkdirp(this.destinationPath('public'));
      mkdirp(this.destinationPath('routes'));
      mkdirp(this.destinationPath('utils'));

      if (this.props.includeCapistrano) {
        mkdirp(this.destinationPath('config/deploy'));
      }

      if (this.props.includeEjsTemplateEngine) {
        mkdirp(this.destinationPath('views'));
      }

      if (this.props.useMongoose) {
        mkdirp(this.destinationPath('schemas'));
      }

      if (this.props.includeUnitTesting) {
        mkdirp(this.destinationPath('test'));
      }
    },

    /**
     * Copy of general project files
     */
    copyMainFiles: function () {
      this.log(chalk.blue('- Copy main files'));

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

      if (this.props.includeCapistrano) {
        this.fs.copy(
          this.templatePath('_Capfile'),
          this.destinationPath('Capfile')
        );

        this.template(
          this.templatePath('config/_deploy.rb'),
          this.destinationPath('config/deploy.rb'),
          this.props
        );

        this.template(
          this.templatePath('config/deploy/_staging.rb'),
          this.destinationPath('config/deploy/staging.rb'),
          this.props
        );

        this.template(
          this.templatePath('config/deploy/_production.rb'),
          this.destinationPath('config/deploy/production.rb'),
          this.props
        );
      }

      if (this.props.dockerize) {
        this.fs.copy(
          this.templatePath('Dockerfile'),
          this.destinationPath('Dockerfile')
        )
      }
    },

    /**
     * Copy of project files
     */
    copyProjectfiles: function () {
      this.log(chalk.blue('- Copy project files'));

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

      // Custom environment variables
      this.template(
        this.templatePath('config/_custom-environment-variables.json'),
        this.destinationPath('config/custom-environment-variables.json'),
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

      // New Relic
      if (this.props.includeNewRelic) {
        this.fs.copy(
          this.templatePath('_newrelic.js'),
          this.destinationPath('newrelic.js')
        );
      }

      // Unit testing
      if (this.props.includeUnitTesting) {
        this.fs.copy(
          this.templatePath('test/_sample_test.js'),
          this.destinationPath('test/sample_test.js')
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
          this.templatePath('controllers/v1/_default.js'),
          this.destinationPath('controllers/v1/default.js')
        );
      }
    },
  },

  /**
   * Install npm modules
   */
  install: function () {
    this.log(chalk.blue('- Install npm packages.'));

    this.spawnCommand('npm', ['config', 'set', 'save-prefix="~"']);

    this.npmInstall(['express', 'config', 'winston', 'body-parser', 'tv4'], { save: true });

    if (this.props.includeMomentJs) {
      this.npmInstall('moment', { save: true });
    }

    if (this.props.includeEjsTemplateEngine) {
      this.npmInstall('ejs', { save: true });
    }

    if (this.props.useMongoose) {
      this.npmInstall('mongoose', { save: true });
    }

    if (this.props.includeNewRelic) {
      this.npmInstall('newrelic', { save: true });
    }

    if (this.props.includeSentry) {
      this.npmInstall('raven', { save: true });
    }

    // Dev dependencies
    this.npmInstall(['gulp', 'gulp-nodemon', 'gulp-apidoc'], { 'save-dev': true });

    if (this.props.includeUnitTesting) {
      this.npmInstall(['mocha', 'supertest', 'chai'], { 'save-dev': true });
    }
  },

  /**
   * fin
   */
  end: function () {
    this.log(chalk.blue('- Done 👊'));
  },
});
