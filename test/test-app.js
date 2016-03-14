const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('itp-node-express-project:app', () => {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({ someOption: true })
      .on('end', done);
  });

  it('creates files', function(done) {
    assert.file([
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);

    done();
  });
});
