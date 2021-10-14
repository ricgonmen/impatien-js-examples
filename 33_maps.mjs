// https://exploringjs.com/impatient-js/ch_maps.html
import assert from "assert-strict";

// Map 'maps' keys to values. A single key-value mapping is called an entry.

// ### CREATE
// you can use the constructor without any parameters to create an empty Map:
const emptyMap = new Map();
assert.equal(emptyMap.size, 0);

// you can pass an iterable to the constructor:
const onIterableMap = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"], // trailing comma is ignored
]);
assert.equal(onIterableMap.size, 3);

// Maps are also iterables over key-value pairs. Therefore, you can use the
// constructor to create a copy of a Map
const copyMap = new Map(onIterableMap);
assert.deepEqual(onIterableMap, copyMap);

// the .set() method adds entries to a Map and is chainable:
const setMap = new Map().set(1, "one").set(2, "two").set(3, "three");
assert.equal(setMap.size, 3);

// ### Working with entries
// .set() and .get() are for writing and reading values (given keys).
const map = new Map();

map.set("foo", 123);
assert.equal(map.get("foo"), 123);
assert.equal(map.get("bar"), undefined); // Unknown key
assert.equal(map.get("bar") ?? "", ""); // Use the default value '' if an entry is missing

// .has() checks if a Map has an entry with a given key. .delete() removes entries
assert.equal(map.has("foo"), true);
assert.equal(map.delete("foo"), true);
assert.equal(map.has("foo"), false);

// .size contains the number of entries in a Map. .clear() removes all entries of a Map
map.set("foo", 123);
map.set("bar", 123);
assert.equal(map.size, 2);
map.clear();
assert.equal(map.size, 0);

// ### Getting the keys and values of a Map
// .keys() returns an iterable over the keys of a Map. Maps record in which order
// entries were created and honor that order when listing entries, keys, or values
map.set("foo", 123);
map.set("bar", 456);

for (const key of map.keys()) {
  console.log(key);
}

// We can use spreading (...) to convert the iterable returned by .keys() to an Array:
assert.deepEqual([...map.keys()], ["foo", "bar"]);

// .values() works like .keys(), but for values instead of keys.
assert.deepEqual([...map.values()], [123, 456]);

// .entries() returns an iterable over the entries of a Map:
for (const entry of map.entries()) {
  console.log(entry);
}

// Spreading (...) converts the iterable returned by .entries() to an Array
assert.deepEqual(
  [...map.entries()],
  [
    ["foo", 123],
    ["bar", 456],
  ]
);

// Map instances are also iterables over entries
for (const [key, value] of map) {
  console.log(key, value);
}

// ### Any value can be a key, even an object
const mapAdvanced = new Map();

const KEY1 = {};
const KEY2 = {};

mapAdvanced.set(KEY1, "hello");
mapAdvanced.set(KEY2, "world");

assert.equal(mapAdvanced.get(KEY1), "hello");
assert.equal(mapAdvanced.get(KEY2), "world");

// ### What keys are considered equal?
// A close to === operation is used to check whether a value is equal to one
// of the keys, except for NaN value
const mapNaN = new Map().set(NaN, 123);
assert.equal(mapNaN.get(NaN), 123);

// Different objects are always considered to be different
assert.notEqual({}, {});
assert.equal(new Map().set({}, 1).set({}, 2).size, 2);

// ### Missing Map operations

// You can .map() and .filter() an Array, but there are no such operations for a Map.
// The solution is:
// 1) Convert the Map into an Array of [key, value] pairs.
// 2) Map or filter the Array.
// 3) Convert the result back to a Map.
const originalMap = new Map().set(1, "a").set(2, "b").set(3, "c");

// Mapping originalMap

const mappedMap = new Map( // step 3
  [...originalMap] // step 1
    .map(([k, v]) => [k * 2, "_" + v]) // step 2
);
assert.deepEqual(
  [...mappedMap],
  [
    [2, "_a"],
    [4, "_b"],
    [6, "_c"],
  ]
);

// Filtering originalMap
const filteredMap = new Map( // step 3
  [...originalMap] // step 1
    .filter(([k, v]) => k < 3) // step 2
);
assert.deepEqual(
  [...filteredMap],
  [
    [1, "a"],
    [2, "b"],
  ]
);

// There are no methods for combining Maps, a workaround can be used
const map1 = new Map().set(1, "1a").set(2, "1b").set(3, "1c");
const map2 = new Map().set(2, "2b").set(3, "2c").set(4, "2d");
const combinedMap = new Map([...map1, ...map2]); // (A)
assert.deepEqual(
  [...combinedMap], // convert to Array for comparison
  [
    [1, "1a"],
    [2, "2b"],
    [3, "2c"],
    [4, "2d"],
  ]
);

// ### When should I use a Map, and when should I use an object?
// MAP -> A dictionary-like data structure with keys that are neither strings nor symbols
// OBJECT -> keys are either strings or symbols but they are know before excution
// MAP -> The keys are not know before execution

// ### WeakMaps are similar to Maps, with the following differences:
// -> They are black boxes, where a value can only be accessed if you have both 
// the WeakMap and the key.
// -> The keys of a WeakMap are weakly held: if an object is a key in a WeakMap, 
// it can still be garbage-collected. That lets us use WeakMaps to attach data to objects.
