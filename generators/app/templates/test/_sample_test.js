const assert = require('chai').assert;

// Test data
const fooData = 'bar';

describe('Start sample tests: ', () => {
  describe('[TEST 01] Sample test 1: ', () => {
    it('Should return valid result', () => {
      const result = { foo: 'bar' };

      assert.equal(result.foo, fooData, 'Foo is invalid: ' + result.foo);
    });
  });
});
