// https://exploringjs.com/impatient-js/ch_arrays.html
import assert from "assert-strict";

// Arrays play two roles in JavaScript:
// 1) Tuples: Arrays-as-tuples have a fixed number of indexed elements.
//      Each of those elements can have a different type.
// 2) Sequences: Arrays-as-sequences have a variable number of indexed elements.
//      Each of those elements has the same type.

// #############################
// ## Basic Array operations ###
// #############################

// The best way to create an Array is via an Array literal:
const arr = ["a", "b", "c"];
// To read an Array element, you put an index in square brackets (indices start at zero):
assert.equal(arr[0], "a");
// To change an Array element, you assign to an Array with an index:
arr[0] = "x";
assert.deepEqual(arr, ["x", "b", "c"]);

// The length of an Array is always the highest index plus one:
assert.equal(arr.length, 3);

// If you write to the Array at the index of the length, you append an element:
arr[arr.length] = "d";
assert.deepEqual(arr, ["x", "b", "c", "d"]);

// Another way of (destructively) appending an element is via the Array method .push():
arr.push("e");
assert.deepEqual(arr, ["x", "b", "c", "d", "e"]);

// If you set .length, you are pruning the Array by removing elements:
arr.length = 1;
assert.deepEqual(arr, ["x"]);

// To clear (empty) an Array, you can either set its .length to zero or
// or you can assign a new empty Array to the variable storing the Array
arr.length = 0;
assert.deepEqual(arr, []);
let letarr = ["a", "b", "c"];
letarr = [];
assert.deepEqual(letarr, []);

// A spread element consists of three dots (...) followed by an expression.
// It results in the expression being evaluated and then iterated over.
const iterable = ["b", "c"];
assert.deepEqual(["a", ...iterable, "d"], ["a", "b", "c", "d"]);

// ### Arrays: listing indices and entries
// Method .keys() lists the indices of an Array.
const arr2 = ["a", "b"];
assert.deepEqual(
  [...arr2.keys()], // keys() returns an iterable that can be spread to an Array.
  [0, 1]
);

// Listing Array indices is different from listing properties.
arr2.prop = true;
assert.deepEqual(Object.keys(arr2), ["0", "1", "prop"]);

// Method .entries() lists the contents of an Array as [index, element] pairs:
assert.deepEqual(
  [...arr2.entries()],
  [
    [0, "a"],
    [1, "b"],
  ]
);

// Following are two ways of checking if a value is an Array
assert.equal([] instanceof Array, true);
assert.equal(Array.isArray([]), true);
assert.equal(typeof [], "object");

// #############################
// ## for-of and Arrays ###
// #############################
// The following for-of loop iterates over the elements of an Array:
for (const element of ["a", "b"]) {
  console.log(element);
}

// This for-of loop iterates over the indices of an Array:
for (const element of ["a", "b"].keys()) {
  console.log(element);
}

// The following for-of loop iterates over [index, element] pairs
for (const [index, element] of ["a", "b"].entries()) {
  console.log(index, element);
}

// #############################
// ## Array-like objects ###
// #############################
// An Array-like value is an object with the following properties:
//  -> .length: holds the length of the Array-like object.
//  -> [0]: holds the element at index 0 (etc.).

assert.deepEqual(Array.from({}), []); // If you omit .length, it is interpreted as 0
assert.deepEqual(Array.from({ length: 2, 0: "a", 1: "b" }), ["a", "b"]);

// With a single parameter, Array.from() converts anything iterable
// or Array-like to an Array:
assert.deepEqual(Array.from(new Set(["a", "b"])), ["a", "b"]);
assert.deepEqual(Array.from({ length: 2, 0: "a", 1: "b" }), ["a", "b"]);

// The second mode of Array.from() involves two parameters. It iterates over
// iterable and applies a map function collecting the results in a new Array
assert.deepEqual(
  Array.from(new Set(["a", "b"]), (x) => x + x),
  ["aa", "bb"]
);

// #############################
// ## Creating and filling Arrays with arbitrary lengths ###
// #############################
// Empty Array that you’ll fill completely later on
assert.deepEqual(new Array(3), [, , ,]);
// An Array filled with a primitive value (sharin it, is the same object)
assert.deepEqual(new Array(3).fill(0), [0, 0, 0]);
// An Array filled with objects
assert.deepEqual(
  Array.from(new Array(3), () => ({})),
  [{}, {}, {}]
); // Temp array
assert.deepEqual(
  Array.from({ length: 3 }, () => ({})),
  [{}, {}, {}]
); // Array-like

// #############################
// ## Adding and removing elements (destructively and non-destructively)
// #############################

// Destructively prepend
const arr3 = ["a", "b"];
arr3.unshift("x", "y"); // prepend single elements
assert.deepEqual(arr3, ["x", "y", "a", "b"]);
arr3.unshift(...["m", "n"]); // prepend Array
assert.deepEqual(arr3, ["m", "n", "x", "y", "a", "b"]);

// Non-destructive prepending is done via spread elements
const arr4 = ["a", "b"];
assert.deepEqual(
  ["x", "y", ...arr4], // prepend single elements
  ["x", "y", "a", "b"]
);
assert.deepEqual(arr4, ["a", "b"]); // unchanged!
assert.deepEqual(
  [...["x", "y"], ...arr4], // prepend Array
  ["x", "y", "a", "b"]
);
assert.deepEqual(arr4, ["a", "b"]); // unchanged!

// Destructively append
const arr5 = ["a", "b"];
arr5.push("x", "y"); // append single elements
assert.deepEqual(arr5, ["a", "b", "x", "y"]);
arr5.push(...["m", "n"]); // append Array
assert.deepEqual(arr5, ["a", "b", "x", "y", "m", "n"]);

// Non-destructive appending is done via spread elements
const arr6 = ["a", "b"];
assert.deepEqual(
  [...arr6, "x", "y"], // append single elements
  ["a", "b", "x", "y"]
);
assert.deepEqual(arr6, ["a", "b"]); // unchanged!
const arr7 = ["a", "b"];
assert.deepEqual(
  [...arr7, ...["x", "y"]], // append Array
  ["a", "b", "x", "y"]
);
assert.deepEqual(arr7, ["a", "b"]); // unchanged!

// These are three destructive ways of removing Array elements
const arr8 = ["a", "b", "c"];
assert.equal(arr8.shift(), "a"); // Destructively remove first element:
assert.deepEqual(arr8, ["b", "c"]);

const arr9 = ["a", "b", "c"];
assert.equal(arr9.pop(), "c"); // Destructively remove last element:
assert.deepEqual(arr9, ["a", "b"]);

const arr10 = ["a", "b", "c", "d"];
assert.deepEqual(arr10.splice(1, 2), ["b", "c"]); // Remove one or more elements anywhere
assert.deepEqual(arr10, ["a", "d"]);

// #############################
// ## Methods: iteration and transformation (.find(), .map(), .filter(), etc.)
// #############################
// All iteration and transformation methods use callbacks that gets three parameters
//  -> value holds the iterated value
//  -> index can additionally tell the callback what the index of the iterated value is.
//  -> array points to the current Array (the receiver of the method call).
//     Some algorithms need to refer to the whole Array

// .find() returns the first element for which its callback returns a truthy value
assert.equal(
  [6, -5, 8].find((x) => x < 0),
  -5
);
assert.equal(
  [6, 5, 8].find((x) => x < 0),
  undefined
);

// .map() returns a modified copy of the receiver. The elements of the copy are
// the results of applying map’s callback
assert.deepEqual(
  [1, 2, 3].map((x) => x * 3),
  [3, 6, 9]
);
assert.deepEqual(
  ["how", "are", "you"].map((str) => str.toUpperCase()),
  ["HOW", "ARE", "YOU"]
);

// .flatMap() can map to zero or more values (.map only one)
assert.deepEqual(
  ["a", "b", "c"].flatMap((x) => [x, x]),
  ["a", "a", "b", "b", "c", "c"]
);

function stringsToCodePoints(strs) {
  return strs.flatMap((str) => [...str]); // 1 element iterated -> 0..n outputs
}
console.log(stringsToCodePoints(['many', 'a', 'moon']));

// .filter() returns an Array collecting all elements for which the callback returns a truthy value
assert.deepEqual([-1, 2, 5, -7, 6].filter(x => x >= 0),[ 2, 5, 6 ]);
assert.deepEqual(['a', 'b', 'c', 'd'].filter((_x,i) => (i%2)===0), [ 'a', 'c' ]);

// .reduce() computes a “summary” of an Array ussing a callback with:
// -> previousValue (the value resulting from the previous call to callbackfn)
// -> currentValue (the value of the current element)
// -> currentIndex [Optional]
// -> array (the array to traverse) [Optional]



