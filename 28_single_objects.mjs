// https://exploringjs.com/impatient-js/ch_single-objects.html
import assert from "assert-strict";

// An object is a set of properties (key-value entries) and a property key can
// only be a string or a symbol.

// Objects play two roles in JavaScript:
// -> Records: Objects-as-records have a fixed number of properties, whose keys
//    are known at development time. Their values can have different types.
// -> Dictionaries: Objects-as-dictionaries have a variable number of properties,
//    whose keys are not known at development time. Their values have the same type.

// ### Objects as records
// Object literals are one way of creating objects-as-records. No need for classes.
const jane = {
  first: "Jane",
  last: "Doe", // optional trailing comma
};

console.log(Object.keys(jane)); // lists property keys
assert.equal(jane.first, "Jane"); // Get property .first
assert.equal(jane.unknownProperty, undefined); // Getting an unknown property

jane.last = "Smith"; // This is how we set (write to) an existing property
assert.equal(jane.last, "Smith");
jane.unknownProperty = "new"; // This is how we create a new property
assert.equal(jane.unknownProperty, "new");

// Whenever the value of a property is defined via a variable name and that
// name is the same as the key, we can omit the key.
function createPoint(x, y) {
  return { x, y };
}
assert.deepEqual(createPoint(9, 2), { x: 9, y: 2 });

// ### Object literals: methods
const janeMethod = {
  first: "Jane", // data property
  says(text) {
    console.log("janeMethod this", this);
    // method
    return `${this.first} says “${text}”`; // (A)
  }, // comma as separator (optional at end)
};
assert.equal(janeMethod.says("hello"), "Jane says “hello”");

// ### Object literals: accessors
// A getter/setter  is a method-like entity that is invoked by getting/setting a property
const janeGetSet = {
  first: "Jane",
  last: "Doe",
  get full() {
    console.log("GET called");
    return `${this.first} ${this.last}`;
  },
  set full(fullName) {
    console.log("SET called");
    const parts = fullName.split(" ");
    this.first = parts[0];
    this.last = parts[1];
  },
};
console.log(Object.keys(janeGetSet)); // lists property keys

console.log("About to call GET .. ");
assert.equal(janeGetSet.full, "Jane Doe");
console.log("About to call SET .. ");
janeGetSet.full = "Jane Smith";
assert.equal(janeGetSet.first, "Jane");
assert.equal(janeGetSet.last, "Smith");

/// ### Spreading into object literals (...)
// Inside an object literal, a spread property adds the properties of another
// object to the current one. If property keys clash, the property that is
// mentioned last “wins”.
const obj = { foo: 1, bar: 2 };
console.log("obj", { ...obj, baz: 3 });
console.log("obj", { ...obj, foo: true });

// We can use spreading to create a copy of an object (fresh object with
// duplicates of all properties, but if property values are objects, then those
// are not copied themselves; they are shared between original and copy).
const original = { a: 1, b: { foo: true } };
const copy = { ...original };
copy.a = 2;
assert.deepEqual(original, { a: 1, b: { foo: true } }); // no change
copy.b.foo = false;
assert.deepEqual(original, { a: 1, b: { foo: false } }); // change

// An use case for spreading is default values for missing properties
const DEFAULTS = { foo: "a", bar: "b" };
const providedData = { foo: 1 };
const allData = { ...DEFAULTS, ...providedData };
assert.deepEqual(allData, { foo: 1, bar: "b" });

// ### Methods and the special variable this
// Ordinary functions play several roles. Method is one of those roles.
assert.equal(typeof janeMethod.says, "function");

// In line B, obj is the receiver of a method call. It is passed to the function
// stored in obj.someMethod via an implicit (hidden) parameter whose name is
// this (line A).
const object = {
  someMethod(x, y) {
    assert.equal(this, object); // (A)
    assert.equal(x, "a");
    assert.equal(y, "b");
  },
};
object.someMethod("a", "b"); // (B)

// The best way to understand this is as an implicit parameter of ordinary
// functions (and therefore methods, too). So this identical ways of calling it:
object.someMethod("a", "b");
object.someMethod.call(object, "a", "b");
const funcObject = object.someMethod;
funcObject.call(object, "a", "b");

// As methods are functions bind() can be used to
const funcJane = janeMethod.says.bind(janeMethod, "hello");
assert.equal(funcJane(), "Jane says “hello”");

// PITFALL: In the following example, we fail when we extract method
const funcJaneWrong = janeMethod.says; // extract the method
assert.throws(
  () => funcJaneWrong("hello"), // (A)
  {
    name: "TypeError",
    message: "Cannot read property 'first' of undefined",
  }
);
// in normal function calls (A) this is undefined and funcJaneWrong("hello")
// is equal to janeMethod.says.call(undefined, 'hello'), can be solved by:
const func2 = janeMethod.says.bind(janeMethod);
assert.equal(func2("hello"), "Jane says “hello”");
// or
const func3 = (text) => janeMethod.says(text);
assert.equal(func3("hello"), "Jane says “hello”");

// PITFALL: Avoiding the pitfall of accidentally shadowing this
// -> Use arrow functions as anonymous inline functions. They don’t have this
//    as an implicit parameter and don’t shadow it.
// -> For named stand-alone function declarations you can either use arrow
//    functions or function declarations.
const prefixer = {
  prefix: "==> ",
  prefixStringArray(stringArray) {
    return stringArray.map((x) => {
      // => don't have this
      console.log(Object.keys(this)); // so this is prefixer object
      return this.prefix + x;
    });
  },
};
assert.deepEqual(prefixer.prefixStringArray(["a", "b"]), ["==> a", "==> b"]);

// The value of this depends on how the callable entity is invoked
// -> Function call:
//      - Ordinary functions: this === undefined (in strict mode)
//      - Arrow functions: this is same as in surrounding scope (lexical this)
// -> Method call: this is receiver of call
// -> new: this refers to newly created instance
// <script> element: this === globalThis
// ECMAScript modules: this === undefined
// CommonJS modules: this === module.exports
console.log(this);

// ### Optional chaining for property accesses and method calls
// The following kinds of optional chaining operations exist:
// obj?.prop     // optional static property access
// obj?.[«expr»] // optional dynamic property access
// func?.(«arg0», «arg1») // optional function or method call
// The rough idea is:
//     -> If the value before the question mark is neither undefined nor null,
//        then perform the operation after the question mark.
//     -> Otherwise, return undefined.

const persons = [
  {
    surname: "Zoe",
    address: {
      street: {
        name: "Sesame Street",
        number: "123",
      },
    },
  },
  {
    surname: "Mariner",
  },
  {
    surname: "Carmen",
    address: {},
  },
];

// We can use optional chaining to safely extract street names:
const streetNames1 = persons.map((p) => p.address?.street?.name);
assert.deepEqual(streetNames1, ["Sesame Street", undefined, undefined]);

// The nullish coalescing operator allows us to use the default instead of undefined
const streetNames2 = persons.map((p) => p.address?.street?.name ?? "(no name)");
assert.deepEqual(streetNames2, ["Sesame Street", "(no name)", "(no name)"]);

// More examples
assert.equal(undefined?.prop, undefined);
assert.equal(null?.prop, undefined);
assert.equal({ prop: 1 }?.prop, 1);

const key = "prop";
assert.equal(undefined?.[key], undefined);
assert.equal(null?.[key], undefined);
assert.equal({ prop: 1 }?.[key], 1);

assert.equal(undefined?.(123), undefined);
assert.equal(null?.(123), undefined);
assert.equal(String?.(123), "123");
assert.throws(() => true?.(123), TypeError);

// dots in o?.[x] and f?.() are less elegant syntax but necessary to
// distinguishing the ideal syntax (obj?[«expr»] or func?(«arg0», «arg1»))
// from the conditional operator

// ### Objects as dictionaries
// Objects work best as records. But before ES6, JavaScript did not have a data
// structure for dictionaries (ES6 brought Maps). Therefore, objects had to be
// used as dictionaries, which imposed a signficant constraint: keys had to be
// strings (symbols were also introduced with ES6).

// ### Arbitrary fixed strings as property keys
// Property keys were fixed tokens that had to be valid identifiers and
// internally became strings
const obj2 = {
  mustBeAnIdentifier: 123,
};

assert.equal(obj2.mustBeAnIdentifier, 123); // Get property
obj2.mustBeAnIdentifier = "abc"; // Set property
assert.equal(obj2.mustBeAnIdentifier, "abc");

// We can quote property keys (with single or double quotes)
const obj3 = {
  "Can be any string!": 123,
  "A nice method"() {
    return "Yes!";
  },
};

assert.equal(obj3["Can be any string!"], 123); // Get property
obj3["Can be any string!"] = "abc"; // Set property
assert.equal(obj3["Can be any string!"], "abc");
assert.equal(obj3["A nice method"](), "Yes!");

// ### Computed property keys
// We can use square brackets to wrap expressions
const methodKey = Symbol();
const obj4 = {
  ["Hello world!"]: true,
  ["f" + "o" + "o"]: 123,
  [Symbol.toStringTag]: "Goodbye", // main use case for computed keys is having symbols
  [methodKey]() {
    return "Yes!";
  },
};

assert.equal(obj4["Hello world!"], true);
assert.equal(obj4.foo, 123);
assert.equal(obj4[Symbol.toStringTag], "Goodbye");
assert.equal(obj4[methodKey](), "Yes!");

// ### The in / ? operator to check is there a property with a given key
assert.equal("foo" in obj, true);
assert.equal("unknownKey" in obj, false);
assert.equal(obj.foo ? "exists" : "does not exist", "exists");
assert.equal(obj.unknownKey ? "exists" : "does not exist", "does not exist");

// ### Deleting properties
const obj6 = {
  foo: 123,
};
assert.deepEqual(Object.keys(obj6), ["foo"]);
delete obj6.foo;
assert.deepEqual(Object.keys(obj6), []);

// ### Listing property keys
// By default, most properties are enumerable.
// Object.values() lists the values of all enumerable properties of an object
const obj7 = { foo: 1, bar: 2 };
assert.deepEqual(Object.values(obj7), [1, 2]);

// Object.entries() lists key-value pairs of enumerable properties.
// Each pair is encoded as a two-element Array:
assert.deepEqual(Object.entries(obj7), [
  ["foo", 1],
  ["bar", 2],
]);

// Own (non-inherited) properties of objects are always listed in order
console.log(
  "Object.keys({b:0,a:0, 10:0,2:0}) -> ",
  Object.keys({ b: 0, a: 0, 10: 0, 2: 0 })
);

console.log("obj4:", JSON.stringify(obj4));
console.log("obj4 getOwnPropertyNames:", Object.getOwnPropertyNames(obj4));
console.log("obj4 getOwnPropertySymbols:", Object.getOwnPropertySymbols(obj4));

// ### Assembling objects via Object.fromEntries()
// Given an iterable over [key, value] pairs, Object.fromEntries() creates an object
assert.deepEqual(
  Object.fromEntries([
    ["foo", 1],
    ["bar", 2],
  ]),
  {
    foo: 1,
    bar: 2,
  }
);

// ### The pitfalls of using an object as a dictionary
// The first pitfall is that the in operator also finds inherited properties:
const dict = {};
assert.equal("toString" in dict, true);
// We can’t use the property key __proto__ because it has special powers
// (it sets the prototype of the object)
dict["__proto__"] = 123; // No property was added to dict:
assert.deepEqual(Object.keys(dict), []);

// So how do you avoid the two pitfalls?
// -> Whenever you can, use Maps. They are the best solution for dictionaries.
// -> If you can’t, use a library for objects-as-dictionaries that does everything safely.
// -> If you can’t, use an object without a prototype.

// ### Standard methods
// .toString() determines how objects are converted to strings
console.log(
  String({
    toString() {
      return "Hello!";
    },
  })
);
console.log(String({}));
// .valueOf() determines how objects are converted to numbers:
console.log(
  Number({
    valueOf() {
      return 123;
    },
  })
);
console.log(Number({}));

// Object.assign() assigns all properties of source to target
const target = { foo: 1 };
const result = Object.assign(target, { bar: 2 }, { baz: 3, bar: 4 });
assert.deepEqual(result, { foo: 1, bar: 4, baz: 3 });
assert.equal(result, target); // target was modified and returned

// Object.freeze(obj) makes obj completely immutable (only properties not objects)
const frozen = Object.freeze({ x: 2, y: 5 });
assert.throws(
  () => {
    frozen.x = 7;
  },
  {
    name: "TypeError",
    message: /^Cannot assign to read only property 'x'/,
  }
);
