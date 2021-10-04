// https://exploringjs.com/impatient-js/ch_template-literals.html
import assert from "assert-strict";

// The following three things are significantly different despite all having 
// template in their names and despite all of them looking similar:

// -> A text template is a function from data to text. It is frequently used in 
// web development

/*
<div class="entry">
  <h1>{{title}}</h1>
  <div class="body">
    {{body}}
  </div>
</div>

This template has two blanks to be filled in: title and body. It is used like 
this:

// First step: retrieve the template text, e.g. from a text file.
const tmplFunc = Handlebars.compile(TMPL_TEXT); // compile string
const data = {title: 'My page', body: 'Welcome to my page!'};
const html = tmplFunc(data);
*/

// -> A template literal is similar to a string literal
const num = 5;
assert.equal(`Count: ${num}!`, 'Count: 5!');

// -> A tagged template is a template literal that follows a function
// (or rather, an expression that evaluates to a function). That leads to the 
// function being called. Its arguments are derived from the contents of the 
// template literal.
const getArgs = (...args) => args;
assert.deepEqual(
  getArgs`Count: ${5}!`,
  [['Count: ', '!'], 5] );

// ### Template literals
// A template literal has two new features compared to a normal string literal.
// It supports string interpolation (dynamic values)
const MAX = 100;
function doSomeWork(x) {
  if (x > MAX) {
    throw new Error(`At most ${MAX} allowed: ${x}!`);
  }
  // ···
}
assert.throws(
  () => doSomeWork(101),
  {message: 'At most 100 allowed: 101!'});

// Second, template literals can span multiple lines:
const str = `this is
a text with
multiple lines`;

// ### Tagged templates
// The expression in line A is a tagged template. It is equivalent to invoking 
//tagFunc() with the arguments listed in the Array in line B.

function tagFunc(...args) {
  return args;
}

const setting = 'dark mode';
const value = true;

console.log (`Setting ${setting} is ${value}!`);
console.log (JSON.stringify(tagFunc`Setting ${setting} is ${value}!`));

assert.deepEqual(
  tagFunc`Setting ${setting} is ${value}!`, // (A)
  [['Setting ', ' is ', '!'], 'dark mode', true] // (B)
);

// The function tagFunc before the first backtick is called a tag function. 
// Its arguments are:
// --> Template strings (first argument): an Array with the text fragments 
//      surrounding the interpolations ${}.
//      In the example: ['Setting ', ' is ', '!']
// --> Substitutions (remaining arguments): the interpolated values.
//      In the example: 'dark mode' and true

// Tagged templates are great for supporting small embedded languages 
// (so-called domain-specific languages). 

// ### Raw string literals
// Raw string literals are implemented via the tag function String.raw.
//  They are string literals where backslashes don’t do anything special 
// (such as escaping characters, etc.):

assert.equal(String.raw`\back`, '\\back');
const WIN_PATH = String.raw`C:\foo\bar`;
assert.equal(WIN_PATH, 'C:\\foo\\bar');