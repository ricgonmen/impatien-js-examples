// https://exploringjs.com/impatient-js/ch_assertion-api.html
import assert from 'assert-strict';

assert.equal(3 + 5, 8);

assert.notEqual({foo: 1}, {foo: 1});
assert.deepEqual({foo: 1}, {foo: 1});

assert.notEqual(['a', 'b', 'c'], ['a', 'b', 'c']);
assert.deepEqual(['a', 'b', 'c'], ['a', 'b', 'c']);

assert.notDeepEqual([1,2,3], [1,2]);

let e;
try {
  const x = 3;
  assert.equal(x, 8, 'x must be equal to 8')
} catch (err) {
  console.log('catch');
  assert.equal(
    String(err),
    'AssertionError [ERR_ASSERTION]: x must be equal to 8');
}
