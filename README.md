# deep-clone

- [Overview](#overview)
- [Usage](#usage)
    - [Simple clone](#simple-clone)
    - [Clone with custom function](#clone-with-custom-function)
    - [Possible errors](#possible-errors)

## Overview

The **deep-clone** module provides a function that can be used to clone both json **objects** and json **arrays**.

Rather that a single parameter, the function takes two parameters: the object to clone and an optional function that
will be called in case a function or a non-native object is found in the object to clone.

In this way, the **developer can decide** what to do with the function or the **non-native object**.

In case this function is not provided and a function or a non-native object is found, the function will throw an error.

## Usage

### Simple clone

```js
const {deepClone} = require('deep-clone');

const obj = {
  a: 1,
  b: {
    c: undefined,
    d: {
      e: null,
      f: [1, 2, 3, 4, 5, 6, 7, 8, 9, {g: 10}]
    }
  }
};

const clonedObj = deepClone(obj);

console.log(clonedObj);

// {
//   a: 1,
//   b: {
//     c: undefined,
//     d: {
//       e: null,
//       f: [1, 2, 3, 4, 5, 6, 7, 8, 9, { g: 10 }]
//     }
//   }
// }
```

### Clone with custom function

As said before, the function takes two parameters: the object to clone and an optional function that will be called in
case a function or a non-native object is found in the object to clone.

In this way, the developer can decide what to do with the function or the *non-native object.

```js
const {deepClone} = require('deep-clone');

const obj = {
  a: 1,
  b: {
    c: new Date("2023-03-25T21:27:20.469Z")
    d: [1, 2, 3, 4, 5, 6, 7, 8, 9, {g: 10}]
  },
  c: function () {
    console.log('Hello world!');
  },
  d: new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ])
};

const clonedObj = deepClone(obj, (value) => {
  if (value instanceof Date) {
    return new Date(value);
  }

  if (value instanceof Map) {
    return new Map(value);
  }

  return value;
});
```

### Possible errors

The function will throw an error if a function or a non-native object is found in the object to clone and no custom
function is provided, like in the following example:

```js
const {deepClone} = require('deep-clone');

const obj = {
  a: 1,
  b: {
    c: new Date("2023-03-25T21:27:20.469Z")
    d: [1, 2, 3, 4, 5, 6, 7, 8, 9, {g: 10}]
  },
  c: new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
  ])
};

const clonedObj = deepClone(obj);
```
