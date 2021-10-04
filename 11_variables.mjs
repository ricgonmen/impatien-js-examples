// https://exploringjs.com/impatient-js/ch_variables-assignment.html
import assert from 'assert-strict';

// #### Variables mutables (LET) vs inmutables (CONST)

// Variables declared via let are mutable (not user var)
let i;
i = 0;
i = i + 1;
assert.equal(i, 1);

// You can also declare and assign at the same time:
let i2 = 0;

// Variables declared via const are immutable. You must always initialize immediately:
const i3 = 0; // must initialize

assert.throws(
  () => { i3 = i3 + 1 },
  {
    name: 'TypeError',
    message: 'Assignment to constant variable.',
  }
);

// Const only means that the binding (the association between variable name and 
// variable value) is immutable. The value itself may be mutable, like obj in the following example.

const obj = { prop: 0 };

// Allowed: changing properties of `obj`
obj.prop = obj.prop + 1;
assert.equal(obj.prop, 1);

// Not allowed: assigning to `obj`
assert.throws(
  () => { obj = {} },
  {
    name: 'TypeError',
    message: 'Assignment to constant variable.',
  }
);

// You can use const with for-of loops, where a fresh binding is created for each iteration:
const arr = ['hello', 'world'];
for (const elem of arr) {
  console.log(elem);
}

// In plain for loops, you must use let, however:
for (let i=0; i<arr.length; i++) {
  const elem = arr[i];
  console.log(elem);
}

// #### The scope of a variable

// The scope of a variable is the region of a program where it can be accessed. 

{ // // Scope A. Accessible: x
  const x = 0;
  assert.equal(x, 0);
  { // Scope B. Accessible: x, y
    const y = 1;
    assert.equal(x, 0);
    assert.equal(y, 1);
    { // Scope C. Accessible: x, y, z
      const z = 2;
      assert.equal(x, 0);
      assert.equal(y, 1);
      assert.equal(z, 2);
    }
  }
}
// Outside. Not accessible: x, y, z
assert.throws(
  () => console.log(x),
  {
    name: 'ReferenceError',
    message: 'x is not defined',
  }
);

// You can’t declare the same variable twice at the same level:
assert.throws(
  () => {
    eval('let x = 1; let x = 2;');
  },
  {
    name: 'SyntaxError',
    message: "Identifier 'x' has already been declared",
  });

// You can, however, nest a block and use the same variable name x that you used outside the block:
const xx = 1;
assert.equal(xx, 1);
{
  const xx = 2;
  assert.equal(xx, 2);
}
assert.equal(xx, 1);

// The following code illustrates the temporal dead zone:
if (true) { // entering scope of `tmp`, TDZ starts
  // `tmp` is uninitialized:
  assert.throws(() => (tmp = 'abc'), ReferenceError);
  assert.throws(() => console.log(tmp), ReferenceError);

  let tmp; // TDZ ends
  assert.equal(tmp, undefined);
}

//The next example shows that the temporal dead zone is truly temporal (related to time):
if (true) { // entering scope of `myVar`, TDZ starts
  const func = () => {
    console.log(myVar); // executed later
  };

  // We are within the TDZ:
  // Accessing `myVar` causes `ReferenceError`

  let myVar = 3; // TDZ ends
  func(); // OK, called outside TDZ
}

// A function declaration is always executed when entering its scope, regardless of where
// it is located within that scope. That enables you to call a function foo() before it is declared:
assert.equal(foo(), 123); // OK
function foo() { return 123; }

// The early activation of foo() means that the previous code is equivalent to:
// function foo() { return 123; }
assert.equal(foo(), 123);

// If you declare a function via const or let, then it is not activated early. 
// In the following example, you can only use bar() after its declaration.
assert.throws(
  () => bar(), // before declaration
  ReferenceError);

const bar = () => { return 123; };

assert.equal(bar(), 123); // after declaration 

// Even though they are similar to function declarations in some ways, class declarations are not activated early
assert.throws(
    () => new MyClass(),
    ReferenceError);
  
class MyClass {}
assert.equal(new MyClass() instanceof MyClass, true);


// #### Closure
// All functions in JavaScript are closures. A closure is a function plus a connection 
// to the variables that exist at its “birth place” to provide the values for the free 
// variables of the function

function funcFactory(value) {
    return () => {
      return value;
    };
  }
  
const func = funcFactory('abc');
assert.equal(func(), 'abc'); 

// funcFactory returns a closure that is assigned to func. Because func has the connection 
// to the variables at its birth place, it can still access the free variable value when it is called