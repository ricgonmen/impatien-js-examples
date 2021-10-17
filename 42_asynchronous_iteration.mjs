// https://exploringjs.com/impatient-js/ch_async-iteration.html
import assert from "assert-strict";

// -> An Iterable is a data structure whose contents can be accessed via iteration.
//     It is a factory for iterators.
// -> An Iterator is a factory for iteration results that we retrieve by calling the
//     method .next(). the values produced should be delivered asynchronously
// -> Each IterationResult contains the iterated .value and a boolean .done that is
//     true after the last element and false before.

async function* syncToAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
    yield elem;
  }
}

async function f() {
  const asyncIterable = syncToAsyncIterable(["a", "b"]);
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();

  // Call .next() manually until .done is true:
  assert.deepEqual(await asyncIterator.next(), { value: "a", done: false });
  assert.deepEqual(await asyncIterator.next(), { value: "b", done: false });
  assert.deepEqual(await asyncIterator.next(), {
    value: undefined,
    done: true,
  });
}

f();

// for-await-of loop to iterate
for await (const x of syncToAsyncIterable(["a", "b"])) {
  console.log(x);
}

// also supports synchronous iterables:
for await (const x of ["a", "b"]) {
  console.log(x);
}

//And it supports synchronous iterables over values that are wrapped in Promises:
const arr = [Promise.resolve("a"), Promise.resolve("b")];
for await (const x of arr) {
  console.log(x);
}

// ### Asynchronous generators
// asynchronous generator has:
// -> Input that can be:
//      -> synchronous (single values, sync iterables) or
//      -> asynchronous (Promises, async iterables).
// -> Output that is an asynchronous iterable.

// The following code creates an async iterable with three numbers:
async function* yield123() {
  for (let i=1; i<=3; i++) {
    yield i;
  }
}

// Does the result of yield123() conform to the async iteration protocol?
(async () => {
  const asyncIterable = yield123();
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  assert.deepEqual(
    await asyncIterator.next(),
    { value: 1, done: false });
  assert.deepEqual(
    await asyncIterator.next(),
    { value: 2, done: false });
  assert.deepEqual(
    await asyncIterator.next(),
    { value: 3, done: false });
  assert.deepEqual(
    await asyncIterator.next(),
    { value: undefined, done: true });
})();