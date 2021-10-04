// https://exploringjs.com/impatient-js/ch_values.html
import assert from 'assert-strict';

// JavaScript distinguishes two kinds of values: primitive values and objects.
// ECMAScript specification only knows a total of eight types

// undefined with the only element undefined
// null with the only element null
// boolean with the elements false and true
// number the type of all numbers (e.g., -123, 3.141)
// bigint the type of all big integers (e.g., -123n)
// string the type of all strings (e.g., 'abc')
// symbol the type of all symbols (e.g., Symbol('My Symbol'))
// object the type of all objects (different from Object, the type of all instances of class Object and its subclasses)

// Primitive values are the elements of the types undefined, null, boolean, number, bigint, string, symbol that are
// imutables, and passed and compared by value. All other values are objects, that are mutable and passed and compared 
// by reference (¿pointers?)

// Two common ways of creating objects are:
// Object literal
const objLiteral = {
    first: 'Jane',
    last: 'Doe',
};

// Array literal
const arrLiteral = ['strawberry', 'apple'];

// Mutables
const a = {}; // fresh empty object
// Pass the identity in `a` to `b`:
const b = a;

// Now `a` and `b` point to the same object
// (they “share” that object):
assert.equal(a === b, true);

// Changing `a` also changes `b`:
a.name = 'Tessa';
assert.equal(b.name, 'Tessa');

// JavaScript uses garbage collection to automatically manage memory
let obj = { prop: 'value' };
obj = {};

// #### The operators typeof and instanceof: what’s the type of a value?
// typeof distinguishes the 7 types of the specification (minus one omission, plus one addition).
//      - typeof null returns 'object' and not 'null'. That’s a bug. Unfortunately, it can’t be fixed.
//      - typeof of a function should be 'object' (functions are objects).
// instanceof tests which class created a given value.

// ### Classes and constructor functions
// JavaScript’s original factories for objects are constructor functions: ordinary functions 
// that return “instances” of themselves if you invoke them via the new operator.
// ES6 introduced classes, which are mainly better syntax for constructor functions.

// Each primitive type (except for the spec-internal types for undefined and null) 
// has an associated constructor function (think class): The constructor function Boolean 
// is associated with booleans, Number is associated with numbers, String is associated with
// strings and Symbol is associated with symbols.

assert.equal(Number('123'), 123);
assert.equal((123).toString, Number.prototype.toString);
assert.equal(Number.isInteger(123), true);
assert.notEqual(new Number(123), 123);
assert.equal(new Number(123).valueOf(), 123);

const prim = true;
assert.equal(typeof prim, 'boolean');
assert.equal(prim instanceof Boolean, false);
const wrapped = Object(prim);
assert.equal(typeof wrapped, 'object');
assert.equal(wrapped instanceof Boolean, true);
assert.equal(wrapped.valueOf(), prim); // unwrap

// #### Converting between types
// There are two ways in which values are converted to other types in JavaScript:
//  - Explicit conversion: via functions such as String().
assert.equal(Number('123'), 123);
//  - Coercion (automatic conversion).
assert.equal('7' * '3', 7 * 3);

