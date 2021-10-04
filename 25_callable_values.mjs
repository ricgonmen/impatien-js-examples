// https://exploringjs.com/impatient-js/ch_callables.html
import assert from "assert-strict";

// In JavaScript, values that can be invoked are: functions, methods, and classes.

// ### Kinds of functions
// JavaScript has two categories of functions:
// 1) An ordinary function can play several roles:
//  -> Real function
//  -> Method
//  -> Constructor function
// 2) A specialized function can only play one of those roles [ES6]:
//  -> An arrow function can only be a real function.
//  -> A method can only be a method.
//  -> A class can only be a constructor function.

// ### Ordinary functions
// Creating an ordinary function can be done in two ways:

// Function declaration (a statement)
//  -> Are activated early, can be called before they are declared.
function ordinary1(a, b, c) {
  // ···
}

// const plus anonymous (nameless) function expression
//  -> Are not activated early
const ordinary2 = function (a, b, c) {
  // ···
};

// ### Named function expressions (advanced)
const namedFuncExpr = function myName(a, b, c) {
  // `myName` is only accessible in here
};

const func = function funcExpr() {
  return funcExpr;
};
console.log(func);
console.log(func());
assert.equal(func(), func);

// The name `funcExpr` only exists inside the function body:
assert.throws(() => funcExpr(), ReferenceError);

// Even if they are not assigned to variables, named function expressions have
// names.
function getNameOfCallback(callback) {
  return callback.name;
}

assert.equal(
  getNameOfCallback(function () {}),
  ""
); // anonymous
assert.equal(
  getNameOfCallback(function named() {}),
  "named"
); // (A)

// Also functions created via function declarations or variable declarations
// always have names
function funcDecl() {}
assert.equal(getNameOfCallback(funcDecl), "funcDecl");

const funcExpr = function () {};
assert.equal(getNameOfCallback(funcExpr), "funcExpr");

// ### Terminology: function definitions and function expressions
// A function definition is syntax that creates functions:
// --> A function declaration (a statement) -> produce ordinary functions
// --> A function expression -> produce ordinary or specialized functions

// Ordinary function expressions are Anonymous/Name function expressions, and
// Specialized function expressions are Arro Functions

// WHILE FUNCTION DECLARATIONS ARE STILL POPULAR IN JAVASCRIPT, FUNCTION
// EXPRESSIONS ARE ALMOST ALWAYS ARROW FUNCTIONS IN MODERN CODE

// ### Roles played by ordinary functions
function add(x, y) {
  // --> add(x, y) is the head, add is the name and x,y parameters
  return x + y; // --> everything between { } are the body
} // --> return statement explicitly returns a value

// As an ordinary function, add() can play three roles:
// 1) Real function: invoked via a function call
assert.equal(add(2, 1), 3);
// 2) Method: stored in a property, invoked via a method call.
const obj = { addAsMethod: add };
assert.equal(obj.addAsMethod(2, 4), 6); // obj is called the receiver of the method call.
// 3) Constructor function: invoked via new
const inst = new add();
assert.equal(inst instanceof add, true);
// >> the names of constructor functions (incl. classes) normally start with capital letters. <<

// ### Terminology: entity vs. syntax vs. role
// --> An entity is a JavaScript feature as it “lives” in RAM.
//      => Entities are ordinary functions, arrow functions, methods, and classes.
// --> Syntax is the code that we use to create entities
//      => Syntax are function declarations and anonymous function expressions.
// --> A role describes how we use entities.
//      => Roles are real function, method, and constructor function

// ### Specialized functions
// Specialized functions are single-purpose versions of ordinary functions and
// and classes are still categorized as functions

// The purpose of an arrow function is to be a real function:
const arrow = () => {
  return 123;
};
assert.equal(arrow(), 123);
assert.equal(arrow instanceof Function, true);

// The purpose of a method is to be a method:
const object = {
  myMethod() {
    return "abc";
  },
};
assert.equal(object.myMethod(), "abc");
assert.equal(object.myMethod instanceof Function, true);

// The purpose of a class is to be a constructor function:
class MyClass {
  /* ··· */
}
const instMyClass = new MyClass();
assert.equal(MyClass instanceof Function, true);

// ### Arrow functions
// Arrow functions were added to JavaScript for two reasons:
// 1) To provide a more concise way for creating functions.
// 2) They work better as real functions inside methods.

// Anonymous function expression can be writed as arrow function expresion
const f_anon = function (x, y, z) {
  return 123;
};
const f_arrow1 = (x, y, z) => {
  return 123;
};
const f_arrow2 = (x, y, z) => 123; // works exactly like the previous one

// If an arrow function has only a single parameter and that parameter is an
// identifier then you can omit the parentheses around the parameter
console.log([1, 2, 3].map((x) => x + 1));

// The same task with a function expression, our code is more verbose:
console.log(
  [1, 2, 3].map(function (x) {
    return x + 1;
  })
);

// Becaus object literals and code blocks have the same syntax, to return
// an object literal, you must put the literal in parentheses:
const func1 = () => ({ a: 1 }); // Without () {a: 1} is interpreted as a block
assert.deepEqual(func1(), { a: 1 });

// ### The special variable this in methods, ordinary functions and arrow functions
// --> Methods, the special variable this gives access to receiver (the object)
const objMethodThis = {
  myMethod() {
    assert.equal(this, objMethodThis);
  },
};
objMethodThis.myMethod();

// --> Ordinary functions can be methods and therefore have this
const objOrdinaryFunctionThis = {
  myMethod: function () {
    assert.equal(this, objOrdinaryFunctionThis);
  },
};
objOrdinaryFunctionThis.myMethod();

// --> Ordinary functions as a real funtions can’t access the this
function ordinaryFunc() {
  assert.equal(this, undefined);
}
ordinaryFunc();

// In contrast, arrow functions can access the this of a surrounding method

const jill = {
  name: "Jill",
  someMethod() {
    console.log("inside someMethod > this", this);
    function ordinaryFunc() {
      console.log("inside ordinaryFunc > this", this);
      assert.throws(
        () => this.name, // (A)
        /^TypeError: Cannot read property 'name' of undefined$/
      );
    }
    ordinaryFunc();

    const arrowFunc = () => {
      console.log("inside arrowFunc > this", this);
      assert.equal(this.name, "Jill"); // (B)
    };
    arrowFunc();
  },
};
jill.someMethod();

/*
--> Dynamic this: In line A, we try to access the this of .someMethod() from 
an ordinary function. There, it is shadowed by the function’s own this, which 
is undefined (as filled in by the function call). Given that ordinary functions 
receive their this via (dynamic) function or method calls, their this is 
called dynamic.

--> Lexical this: In line B, we again try to access the this of .someMethod(). 
This time, we succeed because the arrow function does not have its own this. 
this is resolved lexically, just like any other variable. That’s why the this 
of arrow functions is called lexical.
*/

// ### Recommendation: prefer specialized functions over ordinary functions
// --> You should prefer specialized functions over ordinary functions,
// especially  classes and methods
// --> When it comes to real functions, depends on ...

// For anonymous inline function expressions, arrow functions: because more
// compact and the use of this
const twiceOrdinary = [1, 2, 3].map(function (x) {
  return x * 2;
});
const twiceArrow = [1, 2, 3].map((x) => x * 2);

// For stand-alone named function declarations, arrow functions still benefit
// from lexical this. But function declarations (which produce ordinary
// functions) have nice syntax and early activation is also occasionally useful
// If this doesn’t appear in the body of an ordinary function ..

function timesOrdinary(x, y) {
  return x * y;
}
const timesArrow = (x, y) => {
  return x * y;
};

// ### Returning values from functions and methods
// The return statement explicitly returns a value from a function- If, at the
// end of a function, you haven’t returned anything explicitly, JavaScript
// returns undefined for you:

function noReturn() {
  // No explicit return
}
assert.equal(noReturn(), undefined);

// ### Parameter handling from functions and methods
// JavaScript does not complain if a function call provides a different number
// of arguments than expected by the function definition:
// --> Extra arguments are ignored.
// --> Missing parameters are set to undefined.

function foo(x, y) {
  return [x, y];
}
// Too many arguments:
assert.deepEqual(foo("a", "b", "c"), ["a", "b"]);
// The expected number of arguments:
assert.deepEqual(foo("a", "b"), ["a", "b"]);
// Not enough arguments:
assert.deepEqual(foo("a"), ["a", undefined]);

// Parameter default values specify the value to use if a parameter has not
// been provided

function f(x, y = 0) {
  return [x, y];
}

assert.deepEqual(f(1), [1, 0]);
assert.deepEqual(f(), [undefined, 0]);
assert.deepEqual(f(undefined, undefined), [undefined, 0]);

//  ### Rest parameters
// A rest parameter is declared by prefixing an identifier with three dots (...)
// It receives an Array with all remaining arguments.
// If there are no extra arguments at the end, it is an empty Array

function fRestParam(x, ...y) {
  return [x, y];
}
assert.deepEqual(fRestParam("a", "b", "c"), ["a", ["b", "c"]]);
assert.deepEqual(fRestParam(), [undefined, []]);

// Can be used to force callers to always provide N arguments
function createPoint(...args) {
  if (args.length !== 2) {
    throw new Error("Please provide exactly 2 arguments!");
  }
  const [x, y] = args; // (A)
  return { x, y };
}

// ### Simulating named parameters
// JavaScript doesn’t have real named parameters. The official way of simulating
// them is via object literals:
function selectEntries({ start = 0, end = -1, step = 1 } = {}) {
  return { start, end, step };
}
assert.deepEqual(selectEntries(), { start: 0, end: -1, step: 1 });

// ### Spreading (...) into function calls
// That means that the argument must be an iterable object and the iterated
// values all become arguments
function spreading(x, y) {
  console.log(x);
  console.log(y);
}
const someIterable = ["a", "b"];
spreading(...someIterable);

// ### Methods of functions: .call(), .apply(), .bind()
// Functions have methods ... 3 ot them are: .call(), .apply(), and .bind().

// With .call(), we can also specify a value for the implicit parameter this
function funcMethods(x, y) {
  return [this, x, y];
}
assert.deepEqual(funcMethods("a", "b"), [undefined, "a", "b"]); // ordinary function, its this is undefined
assert.deepEqual(funcMethods.call("hello", "a", "b"), ["hello", "a", "b"]);

// .apply() is loosely equivalent to the following function call (+ spreading)
const args = ["a", "b"];
assert.deepEqual(funcMethods.apply("hello", args), ["hello", "a", "b"]);

// .bind() returns a new function with this and fixed arguments
const boundFunc = funcMethods.bind("hello", 'a');
assert.deepEqual(boundFunc('b'), ["hello", "a", "b"]); // later more arguments given


