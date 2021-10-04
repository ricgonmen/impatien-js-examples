// https://exploringjs.com/impatient-js/ch_dynamic-code-evaluation.html
import assert from "assert-strict";

// ### eval()
globalThis.myVariable = "global";
function func() {
  const myVariable = "local";

  // Direct eval --> via a function call. Then the code in its argument 
  // is evaluated inside the current scope.
  assert.equal(eval("myVariable"), "local");

  // Indirect eval --> not via a function call. Then it evaluates its 
  // code in global scope (means “anything that looks different than eval(···)”)
  assert.equal(eval.call(undefined, "myVariable"), "global");
}

// ### new Function()
// new Function() creates a function object and is invoked as follows
// By default, functions created via new Function() are sloppy. If we want the 
// function body to be in strict mode, we have to switch it on manually.
const times1 = new Function('a', 'b', 'return a * b');
const times2 = function (a, b) { return a * b };

// ### Recommendations
// AVOID DYNAMIC EVALUATION OF CODE AS MUCH AS YOU CAN
// -> It’s a security risk
// -> It may be switched off – for example, in browsers

// If you have to dynamically evaluate code:
// -> Prefer new Function() over eval(): it always executes its code in global 
// context and a function provides a clean interface to the evaluated code.
// -> Prefer indirect eval over direct eval: evaluating code in global context 
// is safer.