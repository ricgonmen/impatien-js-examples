// https://exploringjs.com/impatient-js/ch_exception-handling.html
import assert from "assert-strict";

// JavaScript didn’t support exceptions until ES3. That explains why they are
// used sparingly by the language and its standard library.

// When an error occurred, maybe the best place to handle the problem is not the
// current location, then a exception is throw exiting the nested constructs
// until it encounters a try statement. Execution continues in the catch clause
// of that try statement.

// ### throw
// throw «value»;
// Using class Error we can add our own properties to instances:
const err = new Error("Could not find the file");
err.filePath = "filePath";
// throw err;
// Also can use one of JavaScript’s subclasses of Error o create yours:
class MyError extends Error {}
function func1() {
  throw new MyError("Problem!");
}
assert.throws(() => func1(), MyError);

// ### The try statement
/* try {
  «try_statements»  --> body of the statement,  we execute the regular code.
} catch (error) {
  «catch_statements» --> executed if an exception reaches the try block
} finally {
  «finally_statements» --> always executed, no matter what happens in the try block or the catch clause.
} */

const errorObject = new Error();
function func2() {
  throw errorObject; // (A)
}

try {
  console.log("Executed");
  if (true) func2();
  console.log("Skiped?");
} catch (err) {
  // (B)
  assert.equal(err, errorObject);
  console.log("Executed catch");
} finally {
  console.log("Executed finally");
}

try {
  console.log("Executed");
  if (false) func2();
  console.log("Skiped?");
} catch (err) {
  // (B)
  assert.equal(err, errorObject);
  console.log("Executed catch");
} finally {
  console.log("Executed finally");
}

// ### Error classes
// Error is the common superclass of all built-in error classes. It has the 
// following subclasses
// RangeError: Indicates a value that is not in the set or range of allowable values.
// ReferenceError: Indicate that an invalid reference value has been detected.
// SyntaxError: Indicates that a parsing error has occurred.
// TypeError: is used to indicate an unsuccessful operation when none of the other 
//      NativeError objects are an appropriate indication of the failure cause.
// URIError: Indicates that one of the global URI handling functions was used in 
//      a way that is incompatible with its definition.

// ### error objects
const errObj = new Error('Hello!');
assert.equal(String(errObj), 'Error: Hello!');
assert.equal(errObj.message, 'Hello!');
console.log(errObj.stack); // Maybe diffent stack depending on context
assert.equal(
    errObj.stack,
    `
    Error: Hello!
    at file:///c:/Users/ricardo/git/impatient-js-examples/25_exceptions.mjs:75:16
    at ModuleJob.run (internal/modules/esm/module_job.js:169:25)
    at async Loader.import (internal/modules/esm/loader.js:177:24)
    at async Object.loadESM (internal/process/esm_loader.js:68:5)
    `.trim());