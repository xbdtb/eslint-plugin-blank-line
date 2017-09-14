# eslint-plugin-blank-line
require a blank line before code blocks

.eslintrc
```javascript
{
  ...,
  "plugins": [
    ...,
    "blank-line",
    ...
  ],
  ...,
  rules: [
    ...,
    "blank-line/blank-line": "error",
    ...
  ],
  ...
 }
```

the following code

```javascript
const a = 1;
const b = 2; // comment 1
// coment 2
function f1() {
  console.log('');
}
function f2() {
  console.log('');
}
class A {
  constructor() {
  }
  a = 1;
  b = 2;
  f1() {}
  f2() {}
  f3() {
    console.log('');
  }
  f4() {
    console.log('');
  }
  // some comments
  // some comments
  f5() {
    console.log('');
  }
}
```
will be fixed to (eslint --fix)
```javascript
const a = 1;
const b = 2; // comment 1

// coment 2
function f1() {
  console.log('');
}

function f2() {
  console.log('');
}

class A {
  constructor() {
  }

  a = 1;
  b = 2;

  f1() {}
  f2() {}

  f3() {
    console.log('');
  }

  f4() {
    console.log('');
  }

  // some comments
  // some comments
  f5() {
    console.log('');
  }
}
```
