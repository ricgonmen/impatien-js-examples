// https://exploringjs.com/impatient-js/ch_numbers.html
import assert from "assert-strict";

// JavaScript has two kinds of numeric values:
// -> Numbers are 64-bit floating point numbers and are also used 
//    for smaller integers (within a range of plus/minus 53 bits). This chapter covers it.
// -> Bigints represent integers with an arbitrary precision. 

// ### Numbers are used for both floating point numbers and integers 
// Integer numbers are simply floating point numbers without a decimal fraction
assert.strictEqual(1.0,1);

// ### Number literals
// Binary (base 2)
assert.equal(0b11, 3); // ES6
// Octal (base 8)
assert.equal(0o10, 8); // ES6
// Decimal (base 10)
assert.equal(35, 35);
// Hexadecimal (base 16)
assert.equal(0xE7, 231);
// Floating point numbers can only be expressed in base 10
assert.equal(30,0.3e2);
// If the integer literal is immediately followed by a dot, then that dot is interpreted as a decimal dot:
// 7.toString(); // syntax error
console.log(7.0.toString());
console.log((7).toString());
console.log(7..toString());
console.log(7 .toString());
// We can use underscores as separators in number literals:
const inhabitantsOfLondon = 1_335_000;
const distanceEarthSunInKm = 149_600_000;
const fileSystemPermission = 0b111_111_000;
// But the following functions for parsing numbers do not support separators:
console.log(Number('123_123'));
console.log(parseInt('123_123'));
console.log(parseFloat('123_123.10'));

// ### Arithmetic operators
console.log(3 + 4); // 7
console.log(9 - 1); // 8
console.log(3 * 2.25); // 6.75
console.log(5.625 / 5); //1.125
console.log(8 % 5); //3
console.log(-8 % 5); //3
console.log(4 ** 2); //16
console.log(+(-7)); // -7
console.log(-(-7)); // 7

// ### Incrementing (++) and decrementing (--) 
// Both exists in a prefix version and a suffix version. In both versions, 
// it destructively adds one to its operand. Therefore, its operand must be 
// a storage location that can be changed.

let v=0;
console.log(v++,v);
console.log(v--,v);

// Prefix ++ and prefix -- change their operands and then return them.
let bar = 3;
assert.equal(--bar, 2);
assert.equal(bar, 2);
// Suffix ++ and suffix -- return their operands and then change them.
bar = 3;
assert.equal(bar--, 3);
assert.equal(bar, 2);

// ### Converting to number
// Number(value) is the recomended way

assert.equal(Number(123.45), 123.45);
assert.equal(Number(''), 0);
assert.equal(Number('\n 123.45 \t'), 123.45);
assert.equal(Number('xyz'), NaN);

// ### Error values
// NaN is an abbreviation of “not a number”. NaN is returned if a number can’t be parsed.
console.log(Number('$$$'));
// Or iff an operation can’t be performed:
console.log(Math.log(-1));
// Returned if an operand or argument is NaN
console.log(NaN - 3);
// Infinity is returned if a number is too large
console.log(Math.pow(2, 1024));
// Infinity is returned if there is a division by zero:
console.log(2 / 0);

// ### Checking for NaN
// NaN is the only JavaScript value that is not strictly equal to itself:
const n = NaN;
assert.equal(n === n, false);
// These are several ways of checking if a value x is NaN:
assert.equal(Number.isNaN(n), true); // preferred
assert.equal(Object.is(n, NaN), true);
// Some Array methods can’t find NaN:
console.log([NaN].indexOf(NaN));
// Others can:
console.log([NaN].includes(NaN));
console.log([NaN].findIndex(x => Number.isNaN(x)));
console.log([NaN].find(x => Number.isNaN(x)));

// ### Checking for Infinity
// These are two common ways of checking if a value x is Infinity:
const inf = Infinity;
assert.equal(inf === Infinity, true);
assert.equal(Number.isFinite(inf), false);

// ### The precision of numbers: careful with decimal fractions
// Need to take rounding errors into consideration when performing arithmetic
console.log(0.1 + 0.2);

// ### Integer numbers in JavaScript 
// Integer numbers are normal (floating point) numbers without decimal fractions
// The recommended way of converting numbers to integers is to use one of the 
// rounding methods of the Math object
console.log(Math.floor(2.1));
console.log(Math.ceil(2.1));
console.log(Math.round(2.4));
console.log(Math.round(2.5));
console.log(Math.trunc(2.1));

// ### Safe integers
assert.equal(Number.MAX_SAFE_INTEGER, (2 ** 53) - 1);
assert.equal(Number.MIN_SAFE_INTEGER, -Number.MAX_SAFE_INTEGER);
assert.equal(Number.isSafeInteger(5), true);
