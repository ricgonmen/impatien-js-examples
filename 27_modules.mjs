// https://exploringjs.com/impatient-js/ch_modules.html
import assert from "assert-strict";

console.log(Object.keys(assert));

for (const index in Object.keys(assert)) {
    console.log(Object.keys(assert)[index]);
}