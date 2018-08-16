const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {

  constructor(generatorArgs, opts) {
    super(generatorArgs, opts);

    /**
     * Takes one or more sets of files and copies them to the correct paths
     */
    this.copy = (...args) => {
      let targets = Array.from(args);

      targets = typeof targets[0] === 'string' ? [targets] : targets;

      targets.forEach((target) => {
        this.fs.copy(this.templatePath(target[0]), this.destinationPath(target[1]));
      });
    };

    /**
     * Takes one or more sets of files and templates them at the correct paths
     */
    this.makeTemplate = (...args) => {
      let targets = Array.from(args);

      targets = typeof targets[0] === 'string' ? [targets] : targets;

      targets.forEach((target) => {
        this.fs.copyTpl(this.templatePath(target[0]), this.destinationPath(target[1]), this.props);
      });
    };
  }

  /**
   * Definition of user prompts
   */
  prompting() {
    this.log(yosay(`Welcome to the terrific ${chalk.red('ITP Node Express project')} generator!`));

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
      name: 'useMySQL',
      message: 'Would you like to include MySQL in your project?',
      default: false,
    }, {
      type: 'confirm',
      name: 'includeSentry',
      message: 'Would you like to include Sentry (exception logging) in your project? ',
      default: true,
    }, {
      type: 'confirm',
      name: 'dockerize',
      message: 'Would you like to use Docker for your development environment?',
      default: true,
    }, {
      type: 'confirm',
      name: 'nativeDocker',
      message: 'Include native dependencies in the Docker image?',
      default: false,
      when: answers => answers.dockerize,
    }, {
      type: 'confirm',
      name: 'includeCIAndCD',
      message: 'Include Continuous Integration and Continuous Deployment?',
      default: true,
    }];

    return this.prompt(prompts).then((props) => {
      this.props = props;

      // Set destination root path for project
      if (this.props.createProjectDirectory) {
        this.destinationRoot(this.props.appName);
      }
    });
  }

  writing() {
    /**
     * Folder structure creation
     */
    const scaffoldFolders = () => {
      this.log('\n');
      this.log(chalk.blue('- Create project directory structure'));

      mkdirp(this.destinationPath('app'));
      mkdirp(this.destinationPath('config'));
      mkdirp(this.destinationPath('controllers/v1'));
      mkdirp(this.destinationPath('public'));
      mkdirp(this.destinationPath('routes'));
      mkdirp(this.destinationPath('utils'));
      mkdirp(this.destinationPath('test'));

      if (this.props.useMongoose) {
        mkdirp(this.destinationPath('schemas'));
      }

      if (this.props.includeCIAndCD) {
        mkdirp(this.destinationPath('docker/node'));
      }
    };

    /**
     * Copy of general project files
     */
    const copyMainFiles = () => {
      this.log(chalk.blue('- Copy main files'));

      this.makeTemplate(
        ['_README.md', 'README.md'],
        ['_package.json', 'package.json']);

      this.copy(
        ['editorconfig', '.editorconfig'],
        ['eslintrc', '.eslintrc'],
        ['eslintignore', '.eslintignore'],
        ['gitignore', '.gitignore']);

      if (this.props.dockerize) {
        this.makeTemplate(
          ['docker/_docker-compose.yml', 'docker/docker-compose.yml'],
          ['docker/node/_Dockerfile', 'docker/node/Dockerfile'],
          ['docker/_docker.env', 'docker/docker.env']
        );
        this.copy('dockerignore', '.dockerignore');
      }

      this.makeTemplate(
        ['_Makefile', 'Makefile'],
      );

      if (this.props.includeCIAndCD) {
        this.makeTemplate('_Jenkinsfile', 'Jenkinsfile');
      }
    };

    /**
     * Copy of project files
     */
    const copyProjectfiles = () => {
      this.log(chalk.blue('- Copy project files'));

      // Config files
      this.makeTemplate(
        ['config/_default.json', 'config/default.json'],
        ['config/_staging.json', 'config/staging.json'],
        ['config/_production.json', 'config/production.json'],
        ['config/_custom-environment-variables.json', 'config/custom-environment-variables.json']);

      // DB
      if (this.props.useMongoose) {
        this.copy(
          ['schemas/_index.js', 'schemas/index.js'],
          ['schemas/_sample_schema.js', 'schemas/sample_schema.js']);
      }

      // Unit testing
      this.copy('test/_sample_test.js', 'test/sample_test.js');
      this.makeTemplate('_sonar-project.properties', 'sonar-project.properties');

      // Logging
      this.copy('utils/_logger.js', 'utils/logger.js');

      // Project files
      this.makeTemplate('_server.js', 'server.js');

      if (this.props.apiInfoRoute) {
        this.copy(
          ['routes/_api_router_v1.js', 'routes/api_router_v1.js'],
          ['controllers/v1/_default.js', 'controllers/v1/default.js']);
      }
    };

    scaffoldFolders();
    copyMainFiles();
    copyProjectfiles();
  }

  /**
   * Install npm modules
   */
  install() {
    const npmPackages = ['install'];
    const npmDevPackages = ['install'];

    this.log(chalk.blue('- Install npm packages.'));

    npmPackages.push('express', 'config', 'winston', 'body-parser');

    if (this.props.useMongoose) {
      npmPackages.push('mongoose');
    }

    if (this.props.includeSentry) {
      npmPackages.push('raven');
    }

    // Dev dependencies
    npmDevPackages.push('nodemon', 'mocha', 'supertest', 'chai', 'istanbul', 'mocha-junit-reporter');

    // Save to package.json
    npmDevPackages.push('--save-dev');
    npmPackages.push('--save');

    this.spawnCommandSync('npm', npmPackages);
    this.spawnCommandSync('npm', npmDevPackages);
    this.spawnCommandSync('bash', [this.templatePath('install_airbnb_eslint.sh')]);
  }

  /**
   * fin
   */
  end() {
    this.log(chalk.blue('- Done 👊'));
  }
};
