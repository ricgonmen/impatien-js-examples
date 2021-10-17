// https://exploringjs.com/impatient-js/ch_async-js.html
import assert from "assert-strict";

// Normal functions are synchronous: the caller waits until the callee is finished
// By default, JavaScript tasks are functions that are executed sequentially
// in a single process. We don’t want a task to block other tasks from being
// executed while, for example, it waits for results coming from a server.
// This can be done with callbacks or promises

// Promises are two things:
// -> A standard pattern that makes working with callbacks easier.
// -> The mechanism on which async functions are built.

function main() {
  try {
    const result = divideSync(12, 3); // synchronous function call
    assert.equal(result, 4);
  } catch (err) {
    assert.fail(err);
  }

  // Callback-based asynchronous function
  divideCallback(12, 3, (err, result) => {
    if (err) {
      assert.fail(err);
    } else {
      assert.equal(result, 4);
    }
  });

  // Promise-based asynchronous functions
  dividePromise(12, 3)
    .then((result) => assert.equal(result, 4))
    .catch((err) => assert.fail(err));

  // Async functions is as better syntax for Promise-based code
  // 'await' can only be used inside a special kind of function
  try {
    // const result = await dividePromise(12, 3);
    assert.equal(result, 4);
  } catch (err) {
    assert.fail(err);
  }
}

// ### The call stack
// Whenever a function calls another function, we need to remember where to
// return to after the latter function is finished.
function h(z) {
  const error = new Error();
  console.log(error.stack);
}
function g(y) {
  h(y + 1);
}
function f(x) {
  g(x + 1);
}
f(3);

// ### The event loop
// By default, JavaScript runs in a single process. The so-called event loop
// sequentially executes tasks (pieces of code) inside that process
// https://exploringjs.com/impatient-js/ch_async-js.html#the-event-loop
// The event loop runs continuously inside the JavaScript process. During each
// loop iteration, it takes one task out of the queue (if the queue is empty,
// it waits until it isn’t) and executes it. Each task is always finished
// (“run to completion”) before the next task is executed.

// ### How to avoid blocking the JavaScript process
// There are several ways in which you can prevent a long-running operation
// from blocking the browser:
// -> The operation can deliver its result asynchronously (events, callbacks, promises)
// -> Perform long computations in separate processes (webworkers)
// -> Take breaks during long computations with setTimeout
console.log("start");
setTimeout(() => {          // puts its parameter into the task queue
  console.log("callback");  // this will be executed later
}, 0);
console.log("end");

