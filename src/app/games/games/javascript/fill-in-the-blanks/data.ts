// src/app/games/fill-in-the-blanks/data.ts

export interface FillInTheBlanksQuestion {
    id: string;
    codeBefore: string;
    blank: string; // The correct text for the blank
    codeAfter: string;
    correctAnswer: string; // User's submission will be compared to this (should be same as blank)
    hint?: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }
  
  export const allFillInTheBlanksQuestions: FillInTheBlanksQuestion[] = [
    {
      id: "fitb-1",
      codeBefore: "function greet(name) {\n  console.log('Hello, ' + ",
      blank: "name",
      codeAfter: " + '!');\n}",
      correctAnswer: "name",
      hint: "What variable holds the person's name?",
      explanation: "The function parameter `name` is used to construct the greeting message.",
      difficulty: "easy"
    },
    {
      id: "fitb-2",
      codeBefore: "const numbers = [1, 2, 3];\nfor (let i = 0; i < numbers.length; i++) {\n  if (numbers[i] % 2 === 0) {\n    console.",
      blank: "log",
      codeAfter: "(numbers[i]);\n  }\n}",
      correctAnswer: "log",
      hint: "How do you print something to the console?",
      explanation: "`console.log()` is used to print output to the console.",
      difficulty: "easy"
    },
    {
      id: "fitb-3",
      codeBefore: "function sum(a, b) {\n  return a ",
      blank: "+",
      codeAfter: " b;\n}",
      correctAnswer: "+",
      hint: "What operator do you use for addition?",
      explanation: "The `+` operator is used to add two numbers.",
      difficulty: "easy"
    },
    {
      id: "fitb-4",
      codeBefore: "const array = [1, 2, 3];\narray.",
      blank: "pop",
      codeAfter: "();\nconsole.log(array); // Expected: [1, 2]",
      correctAnswer: "pop",
      hint: "Which array method removes the last element?",
      explanation: "The `pop()` method removes the last element from an array and returns that element.",
      difficulty: "easy"
    },
    {
      id: "fitb-5",
      codeBefore: "const message = 'Hello';\nconsole.log(message.",
      blank: "toUpperCase",
      codeAfter: "()); // Expected: 'HELLO'",
      correctAnswer: "toUpperCase",
      hint: "How do you convert a string to uppercase?",
      explanation: "The `toUpperCase()` method converts a string to uppercase letters.",
      difficulty: "easy"
    },
    {
      id: "fitb-6",
      codeBefore: "let num = 10;\nif (num > 5 ",
      blank: "&&",
      codeAfter: " num < 15) {\n  console.log('Within range');\n}",
      correctAnswer: "&&",
      hint: "What logical operator means 'and'?",
      explanation: "The `&&` (logical AND) operator returns true if both operands are true.",
      difficulty: "medium"
    },
    {
      id: "fitb-7",
      codeBefore: "class Car {\n  constructor(brand) {\n    this.",
      blank: "brand",
      codeAfter: " = brand;\n  }\n}",
      correctAnswer: "brand",
      hint: "How do you store properties in a class constructor?",
      explanation: "`this.propertyName = value;` is used to assign properties to the instance of a class.",
      difficulty: "medium"
    },
    {
      id: "fitb-8",
      codeBefore: "const data = [1, 2, 3, 4, 5];\nconst even = data.",
      blank: "filter",
      codeAfter: "(n => n % 2 === 0);\nconsole.log(even); // Expected: [2, 4]",
      correctAnswer: "filter",
      hint: "Which array method creates a new array with elements that pass a test?",
      explanation: "The `filter()` method creates a new array with all elements that pass the test implemented by the provided function.",
      difficulty: "medium"
    },
    {
      id: "fitb-9",
      codeBefore: "let counter = 0;\nconst intervalId = setInterval(() => {\n  counter++;\n  if (counter === 3) {\n    clearInterval(",
      blank: "intervalId",
      codeAfter: ");\n  }\n}, 1000);",
      correctAnswer: "intervalId",
      hint: "What is returned by `setInterval` that you use to stop it?",
      explanation: "`setInterval` returns an interval ID, which is then used by `clearInterval` to stop the interval.",
      difficulty: "hard"
    },
    {
      id: "fitb-10",
      codeBefore: "Promise.resolve(1)\n  .then(val => val + 1)\n  .",
      blank: "catch",
      codeAfter: "(err => console.error(err))\n  .then(finalVal => console.log(finalVal));",
      correctAnswer: "catch",
      hint: "What keyword handles errors in Promises?",
      explanation: "The `catch()` method is used for error handling in Promise chains.",
      difficulty: "medium"
    },
    {
      id: "fitb-11",
      codeBefore: "const myMap = new Map();\nmyMap.set('a', 1);\nconsole.log(myMap.",
      blank: "get",
      codeAfter: "('a'));",
      correctAnswer: "get",
      hint: "How do you retrieve a value from a Map using its key?",
      explanation: "The `get()` method retrieves a value associated with a key in a Map.",
      difficulty: "easy"
    },
    {
      id: "fitb-12",
      codeBefore: "const set = new Set();\nset.add(1);\nset.add(2);\nset.add(1);\nconsole.log(set.size);",
      blank: "size",
      codeAfter: "",
      correctAnswer: "size",
      hint: "What property tells you the number of elements in a Set?",
      explanation: "The `size` property of a Set returns the number of elements in the Set. Duplicate values are ignored.",
      difficulty: "easy"
    },
    {
      id: "fitb-13",
      codeBefore: "let result = 10 ",
      blank: "**",
      codeAfter: " 2;\nconsole.log(result);",
      correctAnswer: "**",
      hint: "What operator is used for exponentiation?",
      explanation: "The `**` operator is used for exponentiation (e.g., `10 ** 2` is `10` to the power of `2`, which is `100`).",
      difficulty: "easy"
    },
    {
      id: "fitb-14",
      codeBefore: "const person = { name: 'Alice' };\nconsole.log(person?.",
      blank: "age",
      codeAfter: ");",
      correctAnswer: "age",
      hint: "How do you safely access a potentially undefined property?",
      explanation: "The optional chaining operator (`?.`) allows you to read the value of a property located deep within a chain of connected objects without having to expressly validate that each reference in the chain is valid.",
      difficulty: "medium"
    },
    {
      id: "fitb-15",
      codeBefore: "const numbers = [1, 2, 3];\nconst sum = numbers.",
      blank: "reduce",
      codeAfter: "((acc, curr) => acc + curr, 0);\nconsole.log(sum);",
      correctAnswer: "reduce",
      hint: "Which array method applies a function against an accumulator and each element to reduce it to a single value?",
      explanation: "The `reduce()` method executes a reducer function on each element of the array, resulting in a single output value.",
      difficulty: "hard"
    },
    {
      id: "fitb-16",
      codeBefore: "const value = '123';\nconst num = Number(value);\nconsole.log(typeof ",
      blank: "num",
      codeAfter: ");",
      correctAnswer: "num",
      hint: "What variable holds the converted number?",
      explanation: "The `Number()` global function converts a string to a number type.",
      difficulty: "easy"
    },
    {
      id: "fitb-17",
      codeBefore: "let x = 5;\nlet y = `The value is ${",
      blank: "x",
      codeAfter: "}`;\nconsole.log(y);",
      correctAnswer: "x",
      hint: "How do you embed a variable in a template literal?",
      explanation: "Variables are embedded in template literals using `${variableName}` syntax.",
      difficulty: "easy"
    },
    {
      id: "fitb-18",
      codeBefore: "function outer() {\n  let a = 10;\n  function inner() {\n    return a;\n  }\n  return inner;\n}\nconst getA = outer();\nconsole.log(getA());",
      blank: "getA",
      codeAfter: "()",
      correctAnswer: "getA",
      hint: "Which function call will access the variable 'a'?",
      explanation: "This demonstrates a closure. The `inner` function 'closes over' the `a` variable from `outer`'s scope, even after `outer` has finished executing.",
      difficulty: "medium"
    },
    {
      id: "fitb-19",
      codeBefore: "const data = [10, 20, 30];\nconst mapped = data.map(item => item ",
      blank: "*",
      codeAfter: " 2);\nconsole.log(mapped);",
      correctAnswer: "*",
      hint: "What mathematical operator would double each item?",
      explanation: "The `map()` method creates a new array populated with the results of calling a provided function on every element in the calling array.",
      difficulty: "easy"
    },
    {
      id: "fitb-20",
      codeBefore: "console.log(typeof undefined === 'undefined' ",
      blank: "&&",
      codeAfter: " typeof null === 'object');",
      correctAnswer: "&&",
      hint: "What logical operator connects two conditions, both of which must be true?",
      explanation: "This checks two conditions. `typeof undefined` is `'undefined'` and `typeof null` is `'object'`.",
      difficulty: "medium"
    },
    {
      id: "fitb-21",
      codeBefore: "const numbers = [1, 5, 2, 8];\nnumbers.sort((a, b) => a ",
      blank: "-",
      codeAfter: " b);\nconsole.log(numbers);",
      correctAnswer: "-",
      hint: "For ascending sort, what mathematical operation helps compare two numbers?",
      explanation: "For numeric sort in ascending order, the sort comparison function should return a negative value if `a` should come before `b`, a positive value if `a` should come after `b`, and 0 if they are equal. `a - b` achieves this.",
      difficulty: "medium"
    },
    {
      id: "fitb-22",
      codeBefore: "try {\n  throw 'An error occurred!';\n} ",
      blank: "catch",
      codeAfter: "(e) {\n  console.log(e);\n}",
      correctAnswer: "catch",
      hint: "What block handles errors thrown in a `try` block?",
      explanation: "The `catch` block is used to handle exceptions that occur within the `try` block.",
      difficulty: "easy"
    },
    {
      id: "fitb-23",
      codeBefore: "let arr1 = [1, 2];\nlet arr2 = [3, 4];\nlet combined = [...arr1, ...",
      blank: "arr2",
      codeAfter: "];\nconsole.log(combined);",
      correctAnswer: "arr2",
      hint: "What's the name of the second array you want to spread?",
      explanation: "The spread syntax (`...`) allows an iterable (like an array) to be expanded in places where zero or more arguments or elements are expected.",
      difficulty: "easy"
    },
    {
      id: "fitb-24",
      codeBefore: "const myString = 'JavaScript';\nconsole.log(myString.",
      blank: "length",
      codeAfter: ");",
      correctAnswer: "length",
      hint: "What property gives you the number of characters in a string?",
      explanation: "The `length` property returns the length of a string (the number of characters in it).",
      difficulty: "easy"
    },
    {
      id: "fitb-25",
      codeBefore: "for (let i = 0; i < 5; i++) {\n  if (i === 3) {\n    ",
      blank: "continue",
      codeAfter: ";\n  }\n  console.log(i);\n}",
      correctAnswer: "continue",
      hint: "What keyword skips the current iteration of a loop?",
      explanation: "The `continue` statement terminates execution of the statements in the current iteration of the current or labeled loop, and continues execution of the loop with the next iteration.",
      difficulty: "medium"
    },
    {
      id: "fitb-26",
      codeBefore: "const obj = { a: 1, b: 2 };\nfor (const key ",
      blank: "in",
      codeAfter: " obj) {\n  console.log(key);\n}",
      correctAnswer: "in",
      hint: "What keyword iterates over object properties?",
      explanation: "The `for...in` statement iterates over enumerable string properties of an object.",
      difficulty: "medium"
    },
    {
      id: "fitb-27",
      codeBefore: "const arr = [1, 2, 3];\narr.forEach(element => console.",
      blank: "log",
      codeAfter: "(element * 2));",
      correctAnswer: "log",
      hint: "What console method prints values?",
      explanation: "The `forEach()` method executes a provided function once for each array element. `console.log` is used to display output.",
      difficulty: "easy"
    },
    {
      id: "fitb-28",
      codeBefore: "function Person(name) {\n  this.name = name;\n}\nconst p = new ",
      blank: "Person",
      codeAfter: "('Bob');\nconsole.log(p.name);",
      correctAnswer: "Person",
      hint: "What is the name of the constructor function being called?",
      explanation: "The `new` keyword creates an instance of a user-defined object type or of one of the built-in object types that has a constructor function.",
      difficulty: "medium"
    },
    {
      id: "fitb-29",
      codeBefore: "const numbers = [1, 2, 3];\nconst [a, b, c] = ",
      blank: "numbers",
      codeAfter: ";\nconsole.log(a, b, c);",
      correctAnswer: "numbers",
      hint: "What array are we destructuring?",
      explanation: "Array destructuring allows you to unpack values from arrays into distinct variables.",
      difficulty: "easy"
    },
    {
      id: "fitb-30",
      codeBefore: "console.log(Math.",
      blank: "floor",
      codeAfter: "(4.7));",
      correctAnswer: "floor",
      hint: "What Math method rounds a number down to the nearest integer?",
      explanation: "The `Math.floor()` function returns the largest integer less than or equal to a given number.",
      difficulty: "easy"
    },
    {
      id: "fitb-31",
      codeBefore: "const data = [1, 2, 3];\nconst index = data.",
      blank: "indexOf",
      codeAfter: "(2);\nconsole.log(index);",
      correctAnswer: "indexOf",
      hint: "What method finds the first index of a given element?",
      explanation: "The `indexOf()` method returns the first index at which a given element can be found in the array, or -1 if it is not present.",
      difficulty: "easy"
    },
    {
      id: "fitb-32",
      codeBefore: "let x = 'hello';\nlet y = x.slice(1, ",
      blank: "3",
      codeAfter: ");\nconsole.log(y);",
      correctAnswer: "3",
      hint: "The ending index for slice is exclusive. What value gives 'el'?",
      explanation: "The `slice()` method extracts a section of a string. The second argument (end index) is exclusive.",
      difficulty: "medium"
    },
    {
      id: "fitb-33",
      codeBefore: "const obj = { a: 1, b: 2 };\nconst { a, b } = ",
      blank: "obj",
      codeAfter: ";\nconsole.log(a, b);",
      correctAnswer: "obj",
      hint: "What object are we destructuring?",
      explanation: "Object destructuring allows you to unpack properties from objects into distinct variables.",
      difficulty: "easy"
    },
    {
      id: "fitb-34",
      codeBefore: "console.log(typeof new Date());",
      blank: "Date",
      codeAfter: "()",
      correctAnswer: "Date",
      hint: "What object are we creating an instance of?",
      explanation: "`new Date()` creates a new Date object. The `typeof` operator for objects returns `'object'`.",
      difficulty: "easy"
    },
    {
      id: "fitb-35",
      codeBefore: "function greet() {\n  return 'Hello, ' + ",
      blank: "this",
      codeAfter: ".name;\n}\nconst person = { name: 'Alice', greet: greet };\nconsole.log(person.greet());",
      correctAnswer: "this",
      hint: "What keyword refers to the current object?",
      explanation: "In this context, `this` refers to the `person` object when `person.greet()` is called.",
      difficulty: "hard"
    },
    {
      id: "fitb-36",
      codeBefore: "let x = 10;\nconst y = (x > 5) ? 'Greater' : 'Smaller';\nconsole.log(y);",
      blank: "?",
      codeAfter: "",
      correctAnswer: "?",
      hint: "What operator is used in a ternary expression?",
      explanation: "The ternary operator (`condition ? exprIfTrue : exprIfFalse`) is a shorthand for an `if...else` statement.",
      difficulty: "medium"
    },
    {
      id: "fitb-37",
      codeBefore: "const arr = [1, 2, 3];\narr.splice(1, 1); // removes 1 element at index 1\nconsole.log(arr);",
      blank: "splice",
      codeAfter: "",
      correctAnswer: "splice",
      hint: "What array method changes the contents of an array by removing or replacing existing elements and/or adding new elements?",
      explanation: "The `splice()` method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.",
      difficulty: "hard"
    },
    {
      id: "fitb-38",
      codeBefore: "const str = 'apple,banana,orange';\nconst arr = str.",
      blank: "split",
      codeAfter: "(',');\nconsole.log(arr);",
      correctAnswer: "split",
      hint: "What string method divides a string into an ordered list of substrings?",
      explanation: "The `split()` method divides a String into an ordered list of substrings, puts these substrings into an array, and returns the array.",
      difficulty: "easy"
    },
    {
      id: "fitb-39",
      codeBefore: "const numbers = [1, 2, 3];\nconst joined = numbers.",
      blank: "join",
      codeAfter: "('-');\nconsole.log(joined);",
      correctAnswer: "join",
      hint: "What array method creates and returns a new string by concatenating all of the elements in an array?",
      explanation: "The `join()` method creates and returns a new string by concatenating all of the elements in an array (or an array-like object), separated by commas or a specified separator string.",
      difficulty: "easy"
    },
    {
      id: "fitb-40",
      codeBefore: "const obj = { key: 'value' };\nconsole.log(Object.keys(",
      blank: "obj",
      codeAfter: "));",
      correctAnswer: "obj",
      hint: "What object are we getting the keys from?",
      explanation: "`Object.keys()` returns an array of a given object's own enumerable string-keyed property names.",
      difficulty: "medium"
    }
  ];