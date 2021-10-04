// https://exploringjs.com/impatient-js/ch_symbols.html
import assert from "assert-strict";

// Symbols are primitives that are also like objects
// Ceated via the factory function Symbol() with an optional description

const mySymbol = Symbol('mySymbol description');
assert.equal(mySymbol.toString(), 'Symbol(mySymbol description)');
assert.equal(mySymbol.description, 'mySymbol description');
assert.equal(typeof mySymbol, 'symbol');

// Prior to symbols, objects were the best choice if we needed values that were 
// unique (only equal to themselves):

const string1 = 'abc';
const string2 = 'abc';
assert.equal(
  string1 === string2, true); // not unique

const object1 = {};
const object2 = {};
assert.equal(
  object1 === object2, false); // unique

const symbol1 = Symbol();
const symbol2 = Symbol();
assert.equal(
  symbol1 === symbol2, false); // unique

// ### Use cases for symbols
// -> Symbols as values for constants
// two strings with the same content are considered equal:

const COLOR_BLUE_STR = 'Blue';
const MOOD_BLUE_STR = 'Blue';
assert.equal(COLOR_BLUE_STR, MOOD_BLUE_STR);

// We can fix that problem via symbols:

const COLOR_BLUE_SYM = Symbol('Blue');
const MOOD_BLUE_SYM = Symbol('Blue');
assert.notEqual(COLOR_BLUE_SYM, MOOD_BLUE_SYM);

// -> Symbols as unique property keys
// If we use names (strings) as property keys, we are facing the challenge of
// naming collision with the meta-names of javascript.

// Each symbol is unique and a symbol key never clashes with any other 
// string or symbol key

const specialMethod = Symbol('specialMethod');
const obj = {
  _id: 'kf12oi',
  [specialMethod]() { // (A)
    return this._id;
  }
};
assert.equal(obj[specialMethod](), 'kf12oi');

// The square brackets in line A enable us to specify that the method must have 
// the key specialMethod. 

// ### Publicly known symbols 
// -> Symbol.iterator: makes an object iterable.
// -> Symbol.hasInstance: customizes how instanceof works.
// -> Symbol.toStringTag: influences the default .toString() method.
