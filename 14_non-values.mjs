// https://exploringjs.com/impatient-js/ch_undefined-null.html
import assert from 'assert-strict';

// Many programming languages have one “non-value” called null. JavaScript has two of them: undefined and null.

// ### undefined vs. null
//  - undefined means “not initialized” (e.g., a variable) or “not existing” (e.g., a property of an object).
//  - null means “the intentional absence of any object value”.

// ### Occurrences of undefined and null
// Uninitialized variable myVar:
let myVar;
assert.equal(myVar, undefined);

// Parameter x is not provided:
function func1(x) {
  return x;
}
assert.equal(func1(), undefined);

// Property .unknownProp is missing:
const obj = {};
assert.equal(obj.unknownProp, undefined);

// If we don’t explicitly specify the result of a function via a return statement
function func2() {}
assert.equal(func2(), undefined);

// Object.prototype does not have a prototype:
console.log(Object.getPrototypeOf(Object.prototype));

// regular expression not match
console.log(/a/.exec('x'));

// The JSON data format does not support undefined, only null:
console.log(JSON.stringify({a: undefined, b: null}));

// ### Checking for undefined or null 
// Truthy means “is true if coerced to boolean”. Falsy means “is false if coerced to boolean”
let x;
if (x === null);
if (x === undefined); 

// Does x have a value?

if (x !== undefined && x !== null) {
  // ···
}
if (x) { // truthy?
  // x is neither: undefined, null, false, 0, NaN, ''
}

// Is x either undefined or null?
if (x === undefined || x === null) {
  // ···
}
if (!x) { // falsy?
  // x is: undefined, null, false, 0, NaN, ''
}

// ### The nullish coalescing operator (??) for default values
// Sometimes we receive a value and only want to use it if it isn’t either null 
// or undefined. Otherwise, we’d like to use a default value, as a fallback. 
console.log(undefined ?? 'default');
console.log(null ?? 'default');
console.log(0 ?? 'default');

// Before ECMAScript 2020 and the nullish coalescing operator, logical Or was used for default values
// But it also returns the default for all other falsy values
console.log(undefined || 'default');
console.log(null || 'default');
console.log(0 || 'default');

// ### undefined and null don’t have properties
// undefined and null are the only two JavaScript values where we get an exception if we try to read a property
let x3;
// x3.foo -> "TypeError: Cannot read property 'foo' of undefined"
