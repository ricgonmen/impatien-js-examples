node `assert` is deprecated in favour of `assert.strict`, but `commonjs-assert`
doesn't support strict mode. Get the strictest assert possible today!

instead of:

```js
import assertModule from 'assert';

const assert = assertModule.strict || assertModule;
```

in every test just do this:

```shell
npm install --save-dev 'assert-strict'
```

```js
import assert from 'assert-strict';
```


The contents of this module are as follows:
```js
module.exports=function(a){return a.strict||a}(require('assert'));
```
