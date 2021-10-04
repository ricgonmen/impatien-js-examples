// https://exploringjs.com/impatient-js/ch_undefined-null.html
import assert from "assert-strict";

// The primitive type boolean comprises two values – false and true
console.log(typeof true);
console.log(typeof false);

// ### 3 ways converting to boolean
// Most descriptive; recommended.
console.log(Boolean("X"));
console.log(Boolean(""));

// Uses the conditional operator (explained later in this chapter).
console.log("X" ? true : false);
console.log("" ? true : false);

// The ! operator coerces its operand to boolean
console.log(!!"X");
console.log(!!"");

// ### Falsy and truthy values 
// When checking the condition of an if statement, a while loop, 
// or a do-while loop, JavaScript works differently than you may expect. 
// JavaScript checks if value is true when converted to boolean so
// the following names were introduced:
// - > A value is called falsy if it is false when converted to boolean 
//     (undefined,null,Boolean: false,Numbers: 0, NaN,Bigint: 0n,String: '').
// - > A value is called truthy if it is true when converted to boolean.
//     (all others)
var foo;
if (foo) {
    // x is truthy
}
  
if (!foo) {
    // x is falsy
}
  
if (foo) {
    // x is truthy
} else {
    // x is falsy
}

const result = foo ? 'truthy' : 'falsy';

// ### Truthiness-based existence checks
// In JavaScript, if you read something that doesn’t exist you usually get 
// undefined as a result. So the following if statements are equivalent:

let obj = {};

if (obj.prop !== undefined) {
    // obj has property .prop
}

if (obj.prop) {
    // obj has property .prop
}

// However, for the last option it is also skipped if:
// -> obj.prop is there but undefined.
// -> obj.prop is any other falsy value (null, 0, '', etc.).

if (foo === undefined); // Better aproach for variables
if ('prop' in obj); // Better aproach for properties on objects

// ### Conditional operator (? :) #
// «condition» ? «thenExpression» : «elseExpression»
// It is evaluated as follows:
// -> If condition is truthy, evaluate and return thenExpression.
// -> Otherwise, evaluate and return elseExpression.
console.log(true ? 'yes' : 'no');
console.log(false ? 'yes' : 'no');
console.log('' ? 'yes' : 'no');

// ### Binary logical operators: And (x && y), Or (x || y)
// The binary logical operators && and || are value-preserving and short-circuiting.

console.log(12 || 'hello');
console.log(0 || 'hello');

const shortCircuit1 = false && console.log('not evaluated');
const shortCircuit2 = true && console.log('evaluated');

// ### Logical Not (!)
// Evaluate x. Is it truthy? Return false. Otherwise, return true.
console.log(!false);
console.log(!true);
console.log(!'X');
console.log(!'');
