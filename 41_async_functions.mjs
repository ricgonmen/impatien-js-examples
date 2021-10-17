// https://exploringjs.com/impatient-js/ch_async-functions.html
import assert from "assert-strict";

// async functions provide better syntax for code that uses Promises
// -> Async functions are marked with the keyword async.
// -> Inside the body of an async function, we write Promise-based code as
//    if it were synchronous. We only need to apply the await operator whenever
//    a value is a Promise. That operator pauses the async function and resumes
//    it once the Promise is settled
// -> The result of an async function is always a Promise:
//      -> Any value that is returned (explicitly or implicitly) is used to
//      fulfill the Promise.
//      -> Any exception that is thrown is used to reject the Promise.

// ### Async constructs
async function func1() {} // Async function declaration
const func2 = async function () {}; // Async function expression
const func3 = async () => {}; // Async arrow function
const obj = { async m() {} }; // Async method definition in an object literal
class MyClass {
  async m() {} // Async method definition in a class definition
}

// ### Async functions always return promises
async function asyncFuncFullfilled() {
  return 123; // (A)
}
asyncFuncFullfilled().then((result) => {
  assert.equal(result, 123);
});

async function asyncFuncRejected() {
  throw new Error("Problem!"); // (A)
}
asyncFuncRejected().catch((err) => {
  assert.deepEqual(err, new Error("Problem!"));
});

// ### synchronous start, asynchronous settlement
async function asyncFunc() {
  console.log("asyncFunc() starts"); // function is started synchronously
  return "abc";
}
asyncFunc().then((x) => {
  // the result Promise is settled – asynchronously
  console.log(`Resolved: ${x}`);
});
console.log("Task ends"); // the current task finishes

// ### await: working with Promises
// The await operator can only be used inside async functions and async generators
// -> The current async function is paused and returned from. This step is similar
//    to how yield works in sync generators.
// -> Eventually, the current task is finished and processing of the task queue continues.
// -> When and if the Promise is settled, the async function is resumed in a new task:
//      -> If the Promise is fulfilled, await returns the fulfillment value.
//      -> If the Promise is rejected, await throws the rejection value.

// If its operand ends up being a fulfilled Promise, await returns its fulfillment value
assert.equal(await Promise.resolve("yes!"), "yes!");
assert.equal(await "yes!", "yes!");

// If its operand is a rejected Promise, then await throws the rejection value:
try {
  await Promise.reject(new Error());
  assert.fail(); // we never get here
} catch (e) {
  assert.equal(e instanceof Error, true);
}
