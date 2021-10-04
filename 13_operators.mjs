// https://exploringjs.com/impatient-js/ch_operators.html
import assert from 'assert-strict';

// JavaScript’s operators with the following two rules they are easier to understand:
// - Operators coerce their operands to appropriate types
assert.equal('7' * '3', 7 * 3);
const obj = {};
obj['true'] = 123;
assert.equal(obj[true], 123); // Coerce true to the string 'true', [] only operates with Strings
// - Most operators only work with primitive values
assert.equal([1,2,3] + [4,5,6], '1,2,34,5,6');

// ### The plus operator (+)
// it converts both operands to primitive values. Then it switches to one of two modes:
//  - String mode: If one of the two primitive values is a string, then it converts the other 
// one to a string, concatenates both strings, and returns the result.
//  - Number mode: Otherwise, It converts both operands to numbers, adds them, and returns the result.
console.log('There are ' + 3 + ' items');
console.log(4 + true);

// ### Assignment operators
// The plain assignment operator is used to change storage locations:
const x = 10;
let y = 10;

let str = '';
str += '<b>';
str += 'Hello!';
str += '</b>';
assert.equal(str, '<b>Hello!</b>');

// ### Loose equality (== and !=)
// Loose equality it often coerces operands. Some of those coercions make sense, other don't.
console.log('123' == 123); // true
console.log(false == 0); // true
console.log('' == 0); // true
console.log(NaN == NaN); // false

// ### Strict equality (=== and !==)
// Strict equality never coerces. Two values are only equal if they have the same type. 

console.log('123' === 123); // false
console.log(false === 0); // false
console.log('' === 0); // false
console.log(NaN === NaN); // false

// Recommendation: always use strict equality

if (x == 123) {  // x is either 123 or '123'
}
// Prefered alternatives:
if (x === 123 || x === '123');
if (Number(x) === 123);

if (x == null) {
    // x is either null or undefined
}
// Prefered alternatives:
if (x === undefined || x === null);
if (!x);

// ### Even stricter than ===: Object.is()
console.log(Object.is(NaN, NaN));

// ### Ordering operators
console.log(5 >= 2);

// ### Comma operator
// The comma operator has two operands, evaluates both of them and returns the second one
console.log(('a', 'b'));

// ### void operator
// The void operator evaluates its operand and returns undefined:
console.log(void(3+2));