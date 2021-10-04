// https://exploringjs.com/impatient-js/ch_bigints.html
import assert from "assert-strict";

// Bigint is a new primitive data type for integers. Bigints don’t have a fixed
// storage size in bits; their sizes adapt to the integers they represent
//  -> Small integers are represented with fewer bits than large integers.
//  -> There is no negative lower limit or positive upper limit for the integers that can be represented.

console.log(123n * 456n);

// Like number literals, bigint literals support several bases
console.log(123n); // Decimal: 
console.log(0xFFn); // Hexadecimal:
console.log(0b1101n); // Binary:
console.log(0o777n); // Octal: 

// Just like in number literals, we can use underscores (_) as separators in bigint literals:
const massOfEarthInKg = 6_000_000_000_000_000_000_000_000n;

// Reusing number operators for bigints (overloading)
// With most operators, we are not allowed to mix bigints and numbers. If we do, exceptions are thrown
// The reason for this rule is that there is no general way of coercing a number and a bigint to a common type

// ### Arithmetic operators
// Binary +, binary -, *, ** work as expected
console.log(7n * 3n);
// It is OK to mix bigints and strings:
console.log(6n + ' apples');
// /, % round towards zero (like Math.trunc()):
console.log(1n / 2n);
// Unary - works as expected, but Unary + is not supported
console.log(-(-64n));

// ### Ordering operators 
// Ordering operators <, >, >=, <= work as expected:
console.log(17n <= 17n);
// Comparing bigints and numbers does not pose any risks. Therefore, we can mix bigints and numbers:
console.log(3n > -1);

// ### Loose equality (==) and inequality (!=)
// Loose equality (==) and inequality (!=) coerce values
console.log(0n == false);
console.log(1n == true);
console.log(123n == 123);
console.log(123n == '123');

// Strict equality (===) and inequality (!==) 
// Only consider values to be equal if they have the same type
console.log(123n === 123);
console.log(123n === 123n);

// ### The wrapper constructor BigInt
// Analogously to numbers, bigints have the associated wrapper constructor BigInt
// BigInt(x) converts arbitrary values x to bigint. 

BigInt('123');
BigInt('0xFF');

// ### Casting and 64-bit integers
// Casting allows us to create integer values with a specific number of bits. 
// If we want to restrict ourselves to just 64-bit integers, we have to always cast:
const uint64a = BigInt.asUintN(64, 12345n);
const uint64b = BigInt.asUintN(64, 67890n);
const result = BigInt.asUintN(64, uint64a * uint64b);

// ### Bigints and JSON
// JSON can’t be extended to contain bigints, Therefore, our best option is to store bigints in strings
const bigintPrefix = '[[bigint]]';

function bigintReplacer(_key, value) {
  if (typeof value === 'bigint') {
    return bigintPrefix + value;
  }
  return value;
}

const data = { value: 9007199254740993n };
assert.equal(
  JSON.stringify(data, bigintReplacer),
  '{"value":"[[bigint]]9007199254740993"}'
);

function bigintReviver(_key, value) {
    if (typeof value === 'string' && value.startsWith(bigintPrefix)) {
      return BigInt(value.slice(bigintPrefix.length));
    }
    return value;
}
  
const str = '{"value":"[[bigint]]9007199254740993"}';
assert.deepEqual(
    JSON.parse(str, bigintReviver),
    { value: 9007199254740993n }
);

