// https://exploringjs.com/impatient-js/ch_control-flow.html
import assert from "assert-strict";

// The control flow statements are: if statement [ES1], switch statement [ES3], 
// while loop [ES1], do-while loop [ES3], for loop [ES1], for-of loop [ES6], 
// for-await-of loop [ES2018], for-in loop [ES1]

// ### Controlling loops: break and continue
// break -> It immediately leaves the current statement, works inside the following 
// statements: while, do-while, for, for-of, for-await-of, for-in and switch
for (const x of ['a', 'b', 'c']) {
    console.log(x);
    if (x === 'b') break;
    console.log('---')
}

// break label -> leaves the statement labeled. Works everywhere.
my_label: { // label
    if (true) break my_label; // labeled break
    console.log('not reached')
}

// continue -> It immediately leaves the current loop iteration and continues 
// with the next one. only works inside while, do-while, for, for-of, 
// for-await-of, and for-in.
const lines = [
    'Normal line',
    '# Comment',
    'Another normal line',
  ];
for (const line of lines) {
    if (line.startsWith('#')) continue;
    console.log(line);
}

// ### Conditions of control flow statements
// if, while, and do-while have conditions that are, in principle, boolean. 
// However, a condition only has to be truthy (true if coerced to boolean) in 
// order to be accepted
// This is a list of all falsy values: undefined, null, false, 0, NaN, 0n, ''
// All other values are truthy.

// ### if statements
// if (cond) «then_statement» else «else_statement»
if (true) {
// then branch
}
  
if (true) {
// then branch
} else {
// else branch
}

if (true) console.log('Yes1'); else console.log('No1');
if (false) console.log('Yes2'); else console.log('No2');

// ### switch statements
// switch («switch_expression») { «switch_body» }
//      -> The body of switch consists of zero or more case clauses:
//          case «case_expression»: «statements»
//      -> And, optionally, a default clause: 
//          default: «statements»
// At the end of a case clause, execution continues with the next case clause, 
// unless we return or break
function englishToFrench(english) {
    let french;
    switch (english) {
      case 'hello':
        french = 'bonjour';
        break;
      case 'goodbye':
        french = 'au revoir';
        break;
    }
    return french;
  }
  assert.equal(englishToFrench('hello'), 'bonjour');

  function isWeekDay(name) {
    switch (name) {
      case 'Monday':
      case 'Tuesday':
      case 'Wednesday':
      case 'Thursday':
      case 'Friday':
        return true;
      case 'Saturday':
      case 'Sunday':
        return false;
      default:
        throw new Error('Illegal value: '+name);
    }
  }
  assert.throws(
    () => isWeekDay('January'),
    {message: 'Illegal value: January'});

// ### while loops
// while («condition») { «statements» }
const arr = ['a', 'b', 'c'];
while (arr.length > 0) {
  const elem = arr.shift(); // remove first element
  console.log(elem);
}

// ### do-while loops
// works much like while, but it checks its condition after each loop iteration, 
// not before.
// do { «statements» } while («condition»)

// ### for loops
// for («initialization»; «condition»; «post_iteration») {  «statements» }
// -> initialization: sets up variables, etc. for the loop. Variables declared 
//    here via let or const only exist inside the loop.
// -> condition: This condition is checked before each loop iteration. If it is 
//    falsy, the loop stops.
// -> post_iteration: This code is executed after each loop iteration.
for (let i=0; i<3; i++) {
    console.log(i);
}

// ### for-of loops
// A for-of loop iterates over any iterable. Each iterated value is stored in a 
// variable, as specified in the head
// for («iteration_variable» of «iterable») { «statements» }
// The iteration variable is usually created via a variable declaration. Think 
// of it as a new const declaration being executed each time in a fresh scope.
const iterable = ['hello', 'world'];
for (const elem of iterable) {
  console.log(elem);
}
// But we can also use a (mutable) variable that already exists
let elem;
for (elem of iterable) {
  console.log(elem);
}
// Not only arrays are iterable, also works for sets:
const set = new Set(['hello', 'world']);
for (const elem of set) {
  console.log(elem);
}
// Also iterate over the [index, element] entries of Arrays:
const abc = ['a', 'b', 'c'];
for (const [index, elem] of abc.entries()) {
  console.log(`${index} -> ${elem}`);
}

// ### for-await-of loops
// for-await-of is like for-of, but it works with asynchronous iterables instead 
// of synchronous ones. And it can only be used inside async functions and async 
// generators.
// for await (const item of asyncIterable) {  // ··· }

// ### for-in loops (avoid)
// for-in loop visits all (own and inherited) enumerable property keys of an 
// object. When looping over an Array, it is rarely a good choice
arr.propKey = 'property value';
for (const key in arr) {
  console.log(key);
}