// https://exploringjs.com/impatient-js/ch_destructuring.html
import assert from "assert-strict";

// With normal assignment, you extract one piece of data at a time – for example:
const arr = ["a", "b", "c"];
const x1 = arr[0]; // extract
const y1 = arr[1]; // extract

// With destructuring, you can extract multiple pieces of data at the same time
// via patterns in locations that receive data.
// The left-hand side of = in the previous code is one such location.
const [x, y] = arr; // a [] destructuring pattern, equals to previous code
assert.equal(x, "a");
assert.equal(y, "b");

// ### Constructing vs. extracting
// Constructing data looks as follows
const jane1 = {};
jane1.first = "Jane"; // Constructing: one property at a time
jane1.last = "Doe";
const jane2 = {
  // Constructing: multiple properties
  first: "Jane",
  last: "Doe",
};
assert.deepEqual(jane1, jane2);

// Extracting data looks as follows
const jane3 = {
  first: "Jane",
  last: "Doe",
};

const f1 = jane3.first; // Extracting: one property at a time
const l1 = jane3.last;
assert.equal(f1, "Jane");
assert.equal(l1, "Doe");

const { first: f2, last: l2 } = jane3; // Extracting: a {} destructuring pattern
assert.equal(f2, "Jane");
assert.equal(l2, "Doe");

// ### Where can we destructure?
// Variable declarations
const [a] = ["x", "y"];
assert.equal(a, "x");
let [b] = ["y", "z"];
assert.equal(b, "y");

// Assignments
let c;
[c] = ["z", "1"];
assert.equal(c, "z");

// Parameter definitions
const f = ([x]) => x;
assert.equal(f(["a", "b"]), "a");

// ## Object-destructuring
// It lets you batch-extract values of properties via patterns
const address = {
  street: "Evergreen Terrace",
  number: "742",
  city: "Springfield",
  state: "NT",
  zip: "49007",
};

const { street: st, city: ci } = address;
assert.equal(st, "Evergreen Terrace");
assert.equal(ci, "Springfield");

// Object literals support property value shorthands and so do object patterns
const { street, city } = address;
assert.equal(street, "Evergreen Terrace");
assert.equal(city, "Springfield");

// You can also object-destructure primitive values
const { length: len } = "abc";
assert.equal(len, 3);

// And you can object-destructure Arrays because Array indices are also properties
const { 0: first, 2: third } = ["a", "b", "c"];
assert.equal(first, "a");
assert.equal(third, "c");

// In object patterns, you can have rest properties (which must come last)
const obj = { a: 1, b: 2, c: 3 };
const { a: propValue, ...remaining } = obj;

assert.equal(propValue, 1);
assert.deepEqual(remaining, { b: 2, c: 3 });

// Because syntactic ambiguity (you can’t start a statement with a curly) to
// assigning via object destructuring you need to put the whole assignment in ()
let prop;
({prop} = { prop: 'hello' }); // And not {prop} = { prop: 'hello' } -> SyntaxError
assert.equal(prop, 'hello');

// ### Array-destructuring
// Array-destructuring lets you batch-extract values of Array elements via 
// patterns that look like Array literals:
const [x2, y2] = ['a', 'b'];
assert.equal(x2, 'a');
assert.equal(y2, 'b');

// You can skip elements by mentioning holes inside Array patterns:
const [, x3, y3] = ['a', 'b', 'c']; // element at index 0 is ignored.
assert.equal(x3, 'b');
assert.equal(y3, 'c');

// Array-destructuring apply to iterable, like Sets
const mySet = new Set().add('a').add('b').add('c');
const [first1, second1] = mySet;
assert.equal(first1, 'a');
assert.equal(second1, 'b');

// Strings are iterable
const [a1, b1] = 'xyz';
assert.equal(a1, 'x');
assert.equal(b1, 'y');

// In Array patterns, you can have rest elements (which must come last)
const [x4, y4, ...remaining1] = ['a', 'b', 'c', 'd']; 
assert.equal(x4, 'a');
assert.equal(y4, 'b');
assert.deepEqual(remaining1, ['c', 'd']);

// ### What happens if a pattern part does not match anything?
// If a property in an object pattern or array patter has no match on the 
// right-hand side, undefined
const {prop: p} = {};
assert.equal(p, undefined);
const [x5] = [];
assert.equal(x5, undefined);

// ### Default values
// default value for properties via =
const {prop: p2 = 123} = {}; 
assert.equal(p2, 123);
const [x6=1, y6=2] = [];
assert.equal(x6, 1);
assert.equal(y6, 2);