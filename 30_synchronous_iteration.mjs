// https://exploringjs.com/impatient-js/ch_sync-iteration.html
import assert from "assert-strict";

// Synchronous iteration is a protocol (interfaces plus rules for using them)
// that connects two groups of entities in JavaScript
// -> Data sources: On one hand, data comes in all shapes and sizes
//    (Map, Array, String, ...)
// -> Data consumers: On the other hand, you have a whole class of constructs
//    and algorithms that only need to access their input sequentially: one
//    value at a time, until all values were visited (for-of, spreading)

// The iteration protocol connects these two groups via the interface Iterable:
// data sources deliver their contents sequentially “through it”; data consumers
// get their input via it.

// The interfaces are used as follows:
// 1) Ask an Iterable for an iterator via the method whose key is Symbol.iterator.
// 2) The Iterator returns the iterated values via its method .next().
// 3) The values are wrapped in objects with two properties:
//   .value is the iterated value itself.
//   .done indicates if the end of the iteration has been reached yet.

const iterable = ["a", "b"];

// The iterable is a factory for iterators:
const iterator = iterable[Symbol.iterator]();

// Manually we can call .next() until .done is true:
assert.deepEqual(iterator.next(), { value: "a", done: false });
assert.deepEqual(iterator.next(), { value: "b", done: false });
assert.deepEqual(iterator.next(), { value: undefined, done: true });

// ### Iteration in practice
// The protocol is not meant to be used directly, it is meant to be used via
// higher-level language constructs built on top of it
// The following built-in data sources are iterable: Arrays, Strings, Maps,
// Sets, (Browsers: DOM data structures)

// Arrays are iterable. That enables us to use the for-of loop:
const myArray = ["a", "b", "c"];
for (const x of myArray) {
  console.log(x);
}

// Set data structure is iterable. That means for-of works:
const mySet = new Set().add("a").add("b").add("c");
for (const x of mySet) {
  console.log(x);
}

// ### The following constructs are based on iteration:
//  - Destructuring via an Array pattern: const [x,y] = iterable;
//  - The for-of loop: for (const x of iterable) { /*···*/ }
//  - Array.from(): const arr1 = Array.from(iterable);
//  - Spreading (via ...) into function calls and Array literals:
//    func(...iterable); OR const arr2 = [...iterable];
//  - new Map() and new Set():
//  - Promise.all() and Promise.race():
//  - yield*: