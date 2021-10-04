// https://exploringjs.com/impatient-js/ch_strings.html
import assert from "assert-strict";

// Strings are primitive values in JavaScript and immutable. That is, 
// string-related operations always produce new strings and never change existing strings.

// ### Plain string literals
const str1 = 'abc';
const str2 = "abc";
assert.equal(str1, str2);
assert.equal(
    'She said: "Let\'s go!"',
    "She said: \"Let's go!\"");

// ### Accessing characters and Unicode code points
// JavaScript has no extra data type for characters – characters are always represented as strings
const str = 'abc';
assert.equal(str[1], 'b');
assert.equal(str.length, 3);

// This is how we iterate over the code point characters of a string via for-of:
for (const ch of 'x🙂y') {
  console.log(ch);
}

// And this is how we convert a string into an Array of code point characters via spreading:
assert.deepEqual([...'x🙂y'], ['x', '🙂', 'y']);

// ### String concatenation via +
// is quite efficient because most JavaScript engines internally optimize it.
assert.equal(3 + ' times ' + 4, '3 times 4');

// ### Converting to string
// These are three ways of converting a value x to a string:
// String(x) --> Recommended
// ''+x
// x.toString() (does not work for undefined and null)

assert.equal(String(undefined), 'undefined');
assert.equal(String(null), 'null');
assert.equal(String(false), 'false');
assert.equal(String(true), 'true');
assert.equal(String(123.45), '123.45');

// ### Stringifying objects
// Plain objects have a default string representation that is not very useful
// Arrays have a better string representation, but it still hides much information
console.log(String({a: 1}));
console.log(String(['a', 'b']));

// The JSON data format is a text representation of JavaScript values. Therefore, 
// JSON.stringify() can also be used to convert values to strings
console.log(JSON.stringify({first: 'Jane', last: 'Doe'}, null, 2));

// ### Comparing strings
// Strings can be compared via the following operators < <= > >=
// These operators compare based on the numeric values of JavaScript characters
console.log('A' < 'B');
console.log('a' < 'B');

// ### Atoms of text: Unicode characters, JavaScript characters, grapheme clusters
// -> Unicode characters are represented by code points – numbers which have a range of 21 bits
// -> In JavaScript strings, Unicode is implemented via code units based on the encoding format UTF-16. Each code unit is a 16-bit number. 
//      One to two of code units are needed to encode a single code point.
// -> Grapheme clusters (user-perceived characters) are written symbols, as displayed on screen or paper. 
//      One or more Unicode characters are needed to encode a single grapheme cluster.

// 3 Unicode characters, 3 JavaScript characters:
assert.equal('abc'.length, 3);

// 1 Unicode character, 2 JavaScript characters:
assert.equal('🙂'.length, 2);

// A Unicode code point escape lets us specify a code point hexadecimally
console.log('\u{1F642}');

// String.fromCodePoint() converts a single code point to 1–2 JavaScript characters
console.log(String.fromCodePoint(0x1F642));

// To specify a code unit hexadecimally, we can use a Unicode code unit escape with exactly 
// four hexadecimal digits
console.log('\uD83D\uDE42');

// And we can use String.fromCharCode(). Char code is the standard library’s name for code unit
console.log(String.fromCharCode(0xD83D) + String.fromCharCode(0xDE42));

// If the code point of a character is below 256, we can refer to it via a ASCII escape 
// with exactly two hexadecimal digits
console.log('He\x6C\x6Co');
