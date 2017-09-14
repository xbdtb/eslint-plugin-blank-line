# eslint-plugin-blank-line
require a blank line before blocks in classes

.eslintrc
```
  "plugins": [
    ...,
    "blank-line"
  ],
  ...,
  rules: [
    ...,
    "blank-line/blank-line": "error"
  ]
```

the following code

```
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
will be fixed to
```
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
