var assert = require('assert');

// Test data
var fooData = "bar";

// Start test
describe('Start sample tests: ', function() {

  describe('[TEST 01] Sample test 1: ', function() {

    it('Should return valid result', function() {
      var result = { foo: "bar" };

      assert.equal(result.foo, fooData, 'Foo is invalid: ' + result.foo);
    });

  });

});
