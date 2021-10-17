// https://exploringjs.com/impatient-js/ch_sync-generators.html
import assert from "assert-strict";

// Synchronous generators are special versions of function definitions and
// method definitions that always return synchronous iterables. Asterisks (*)
// mark functions and methods as generators
// Due to pausing, generators provide many of the features of coroutines
// (cooperative tasks, exceptions, event loops, iterators, infinite lists and pipes)

function* genFunc1() {
  /*···*/
} // Generator function declaration
const genFunc2 = function* () {
  /*···*/
}; // Generator function expression
const obj = {
  *generatorMethod() {
    // Generator method definition in an object literal
    // ···
  },
};
class MyClass {
  *generatorMethod() {
    // Generator method definition in a class definition
    // ···
  }
}

// If we call a generator function, it returns an iterable
// The generator fills that iterable via the yield operator
// -> Like return, a yield exits the body of the function and returns
//    a value (to/via .next()).
// ->  Unlike return, if we repeat the invocation (of .next()),
//    execution resumes directly after the yield.

let location = 0;
function* genFunc3() {
  console.log("<1>");
  location = 1;
  yield "a";
  console.log("<2>");
  location = 2;
  yield "b";
  console.log("<3>");
  location = 3;
}

const iter = genFunc3();
console.log("<A>");
assert.equal(location, 0);
assert.deepEqual(iter.next(), { value: "a", done: false });
console.log("<B>");
assert.equal(location, 1);
assert.deepEqual(iter.next(), { value: "b", done: false });
console.log("<C>");
assert.equal(location, 2);
assert.deepEqual(iter.next(), { value: undefined, done: true });
assert.equal(location, 3);

// yield* lets us make recursive calls in generators working with iterables
function* gen() {
  yield* [1, 2];
}
assert.deepEqual([...gen()], [1, 2]);

// https://ichi.pro/es/generadores-en-javascript-cuando-debo-usar-yield-y-yield-182363949291045

function* fibonacciGeneratorFunction(a = 0, b = 1) {
  yield a;
  yield* fibonacciGeneratorFunction(b, b + a);
}

const fibonacciGenerator = fibonacciGeneratorFunction();
console.log(fibonacciGenerator.next());
console.log(fibonacciGenerator.next());
console.log(fibonacciGenerator.next());
console.log(fibonacciGenerator.next());
console.log(fibonacciGenerator.next());

// ### external iteration vs. internal iteration
// External iteration (pull) --> asks the object for the values via an iteration protocol
for (const x of ["a", "b"]) {
  console.log(x);
}
// Internal iteration (push) --> We pass a callback function to a method of the
// object and the method feeds the values to the callback
["a", "b"].forEach((x) => {
  console.log(x);
});
