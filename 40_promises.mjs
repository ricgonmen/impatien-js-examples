// https://exploringjs.com/impatient-js/ch_promises.html
import assert from "assert-strict";

// Promises are a pattern for delivering results asynchronously similar to
// the event pattern. There is an object (a Promise), where we register callbacks
// -> Method .then() registers callbacks that handle results.
// -> Method .catch() registers callbacks that handle errors.

// In contrast to the event pattern are optimized for one-off results:
// ->  A result (or an error) is cached so that it doesn’t matter if we register
//     a callback before or after the result (or error) was sent.
// ->  We can chain the Promise methods .then() and .catch() because they both
//     return Promises.

// ### Implementing a Promise-based function
// An example of a Promise-based function that adds two numbers x and y
function addAsync(x, y) {
  return new Promise((resolve, reject) => {
    console.log(resolve);
    console.log(reject);
    // (A)
    if (x === undefined || y === undefined) {
      reject(new Error("Must provide two parameters"));
    } else {
      resolve(x + y);
    }
  });
}

// (A) that callback is provided with two functions:
// ->    resolve is used for delivering a result (in case of success).
// ->    reject is used for delivering an error (in case of failure).

addAsync(3, 4)
  .then((result) => {
    // success
    assert.equal(result, 7);
  })
  .catch((error) => {
    // failure
    assert.fail(error);
  });

// ### States of Promises
// Promise can be in either one of three states: pending, fulfilled, or rejected.
// If a Promise is in a final (non-pending) state, it is called settled.

// Promises protect us against race conditions (registering too early or too late)
// -> If we register a .then() callback or a .catch() callback too early,
//    it is notified once a Promise is settled.
// -> Once a Promise is settled:
//      - the settlement value (result or error) is cached.
//      - its state and settlement value can’t change anymore.

// Promise.resolve(x) creates a Promise that is fulfilled with the value x
Promise.resolve(123).then((x) => {
  assert.equal(x, 123);
});

// Promise.reject(err) creates a Promise that is rejected with the value err
const myError = new Error("My error!");
Promise.reject(myError).catch((err) => {
  assert.equal(err, myError);
});

// ### Returning and throwing in .then() callbacks
// .then() handles Promise fulfillments. It also returns a fresh Promise or
// can throw an exception.

Promise.resolve("abc")
  .then((str) => {
    return str + str; // Even if this value is not a Promise is converted
  })
  .then((str2) => {
    assert.equal(str2, "abcabc");
  });

Promise.resolve("abc")
  .then((str) => {
    return Promise.resolve(str + str); // Explicit return of a new Promise
  })
  .then((str2) => {
    assert.equal(str2, "abcabc");
  });

Promise.resolve("abc")
  .then((str) => {
    throw myError; // Throws an exception
  })
  .catch((err) => {
    assert.equal(err, myError);
  });

// The difference between .then() and .catch() is that the latter is triggered by
// rejections, not fulfillments. However, both methods turn the actions of their
// callbacks into Promises in the same manner.
Promise.reject(myError)
  .catch((e) => {
    assert.equal(e, myError);
    return "default value"; //Something went wrong, use a default value (new fullfilment)
  })
  .then((str) => {
    assert.equal(str, "default value");
  });

// The .finally() callback is always executed – independently of somePromise
// and the values returned by .then() and/or .catch().

Promise.resolve(123)
  .finally(() => {})
  .then((result) => {
    assert.equal(result, 123);
  });

Promise.reject("error")
  .finally(() => {})
  .catch((error) => {
    assert.equal(error, "error");
  });

// ### Chaining method calls
// .then() and .catch() always return Promises. That enables us to create
// arbitrary long chains of method calls. In a way, .then() ¿and .catch()? are
// the asynchronous version of the synchronous semicolon
//   ->  .then() executes two asynchronous operations sequentially.
//   ->  The semicolon executes two synchronous operations sequentially.

// ### Promise-based functions start synchronously, settle asynchronously
function asyncFunc() {
  console.log("asyncFunc");
  return new Promise((resolveFunctionThen) => {
    console.log("new Promise()");
    resolveFunctionThen();
  });
}

const functionThen = () => {
  console.log(".then()");
};

console.log("START");
asyncFunc().then(functionThen);
console.log("END");

// ### Promise combinator functions: working with Arrays of Promises
// The combinator pattern is a pattern in functional programming for
// building structures. Based on two kinds of functions:
// -> Primitive functions include: Promise.resolve(), Promise.reject()
// -> Combinators include: Promise.all(), Promise.race(), Promise.any(), Promise.allSettled().

// Promise.all() returns a Promise which is:
// -> Fulfilled if all promises are fulfilled.
// -> Rejected if at least one Promise is rejected.
const promisesAll = [
  Promise.resolve("result a"),
  Promise.resolve("result b"),
  Promise.resolve("result c"),
];
Promise.all(promisesAll).then((arr) =>
  assert.deepEqual(arr, ["result a", "result b", "result c"])
);

const promisesNotAll = [
  Promise.resolve("result a"),
  Promise.resolve("result b"),
  Promise.reject("ERROR"),
];
Promise.all(promisesNotAll).catch((err) => assert.equal(err, "ERROR"));

// Promise.race() returns a Promise q which is settled as soon as the first
// Promise p among promises is settled (fullfilled or rejected, doesn't care)
const promisesRaceWinFullfilled = [
  new Promise((resolve, reject) => setTimeout(() => resolve("result"), 100)),
  new Promise((resolve, reject) => setTimeout(() => reject("ERROR"), 200)),
];
Promise.race(promisesRaceWinFullfilled).then((result) =>
  assert.equal(result, "result")
);

const promisesRaceWinRejected = [
  new Promise((resolve, reject) => setTimeout(() => resolve("result"), 200)),
  new Promise((resolve, reject) => setTimeout(() => reject("ERROR"), 100)),
];
Promise.race(promisesRaceWinRejected).then(
  (result) => assert.fail(),
  (err) => assert.equal(err, "ERROR")
);

// Promise.any() returns a Promise p. How it is settled, depends on the parameter promises
// -> If and when the first Promise is fulfilled, p is resolved with that Promise.
// -> If all Promises are rejected, p is rejected with an instance of AggregateError
//    that contains all rejection values.

const promisesAnyOK = [
  Promise.reject("ERROR A"),
  Promise.reject("ERROR B"),
  Promise.resolve("result"),
];
Promise.any(promisesAnyOK).then((result) => assert.equal(result, "result"));

const promisesKO = [
  Promise.reject("ERROR A"),
  Promise.reject("ERROR B"),
  Promise.reject("ERROR C"),
];
Promise.any(promisesKO).catch((aggregateError) =>
  assert.deepEqual(aggregateError.errors, ["ERROR A", "ERROR B", "ERROR C"])
);

// Promise.allSettled() returns a Promise out. Once all promises are settled,
// out is fulfilled with an Array. Each element e of that Array corresponds to
// one Promise p of promises:
// -> If p is fulfilled with the fulfillment value v, then e is { status: 'fulfilled', value:  v }
// -> If p is rejected with the rejection value r, then e is { status: 'rejected',  reason: r }
const promisesAllSettled = [Promise.resolve("a"), Promise.reject("b")];
Promise.allSettled(promisesAllSettled).then((arr) =>
  assert.deepEqual(arr, [
    { status: "fulfilled", value: "a" },
    { status: "rejected", reason: "b" },
  ])
);
