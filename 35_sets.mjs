// https://exploringjs.com/impatient-js/ch_sets.html
import assert from "assert-strict";
// Before ES6, JavaScript didn’t have a data structure for sets. Instead,
// arrays or keys of objects were used (slower).

// ### Create an working with items
// You can use the constructor without any parameters to create an empty Set:
const emptySet = new Set();
assert.equal(emptySet.size, 0);

// you can pass an iterable to the constructor.
const iterableSet = new Set(["red", "green", "blue"]);
assert.equal(iterableSet.size, 3);

// the .add() method adds elements to a Set and is chainable:
const setSet = new Set().add("red").add("green").add("blue");
assert.equal(setSet.size, 3);

// .add() adds an element to a Set.
const set = new Set();
set.add("red");

// .has() checks if an element is a member of a Set.
assert.equal(set.has("red"), true);

// .delete() removes an element from a Set.
assert.equal(set.delete("red"), true); // there was a deletion
assert.equal(set.has("red"), false);

// .size contains the number of elements in a Set.
set.add("foo").add("bar");
assert.equal(set.size, 2);

// .clear() removes all elements of a Set.
set.clear();
assert.equal(set.size, 0);

// Sets are iterable and preserve insertion order
set.add("red").add("green").add("blue");
for (const x of set) {
  console.log(x);
}

// Given that Sets are iterable, you can use spreading (...)
assert.deepEqual([...set], ["red", "green", "blue"]);

// ### What Set elements are considered equal?
// Set elements are compared similarly to ===, with the exception of NaN
assert.equal(new Set([NaN, NaN, NaN]).size, 1);
assert.equal(new Set().add({}).add({}).size, 2);

// ### Missing Set operations
// There are workarrounds for several missing common operations
// Use spreading to concatenate two iterables
const a = new Set([1, 2, 3]);
const b = new Set([4, 3, 2]);
const union = new Set([...a, ...b]);
assert.deepEqual([...union], [1, 2, 3, 4]);

// Intersection
const intersection = new Set([...a].filter((x) => b.has(x)));
assert.deepEqual([...intersection], [2, 3]);

// Difference or minus
const difference = new Set([...a].filter((x) => !b.has(x)));
assert.deepEqual([...difference], [1]);

// Map
const notMappedset = new Set([1, 2, 3]);
const mappedSet = new Set([...notMappedset].map(x => x * 2));
assert.deepEqual([...mappedSet], [2, 4, 6]);

// ### Symmetry with Map
// Sets and Maps have similar interfaces. Each Set element is handled as if it 
// were a Map entry whose key and value are both the element.
// .entries() enables you to convert a Set to a Map:
const set2map = new Set(['a', 'b', 'c']);
const map = new Map(set2map.entries());
assert.deepEqual(
[...map.entries()],
[['a','a'], ['b','b'], ['c','c']]);

// WeakSets are similar to Sets, with the following differences:
// -> They can hold objects without preventing those objects from being 
// garbage-collected.
// -> They are black boxes: we only get any data out of a WeakSet if we have 
// both the WeakSet and a value. The only methods that are supported are .add(), 
// .delete(), .has(). 

