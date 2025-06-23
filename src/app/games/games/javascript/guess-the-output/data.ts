// src/app/games/guess-the-output/data.ts

export interface GuessTheOutputQuestion {
    id: string;
    code: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }
  
  export const allGuessTheOutputQuestions: GuessTheOutputQuestion[] = [
    {
      id: "gto-1",
      code: "let x = 5;\nlet y = x++ + 2;\nconsole.log(y);",
      options: ["7", "8", "6", "5"],
      correctAnswer: "7",
      explanation: "The `x++` (post-increment) operator means `x`'s original value (5) is used in the expression `x + 2` first, resulting in `y = 7`. Then `x` is incremented to 6.",
      difficulty: "easy"
    },
    {
      id: "gto-2",
      code: "let arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);",
      options: ["3", "4", "undefined", "Error"],
      correctAnswer: "4",
      explanation: "The `push()` method adds an element to the end of an array, increasing its length.",
      difficulty: "easy"
    },
    {
      id: "gto-3",
      code: "for (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
      options: ["0 1 2", "3 3 3", "Error", "undefined"],
      correctAnswer: "0 1 2",
      explanation: "With `let` in a loop, each iteration creates a new, block-scoped `i`. Therefore, each `setTimeout` callback closes over its own unique `i` from that specific iteration, logging 0, 1, and 2 in sequence.",
      difficulty: "medium"
    },
    {
      id: "gto-4",
      code: "let a = [1, 2];\nlet b = a;\na.push(3);\nconsole.log(b);",
      options: ["[1, 2]", "[1, 2, 3]", "[1, 3]", "Error"],
      correctAnswer: "[1, 2, 3]",
      explanation: "Arrays in JavaScript are objects, and assignments like `let b = a;` create a reference to the same array in memory. Modifying `a` also affects `b` because both variables point to the same underlying array.",
      difficulty: "easy"
    },
    {
      id: "gto-5",
      code: "function f(a, b) {\n  a = 10;\n  b.push(5);\n}\nlet x = 1;\nlet y = [2];\nf(x, y);\nconsole.log(x, y);",
      options: ["1 [2, 5]", "10 [2, 5]", "1 [2]", "10 [2]"],
      correctAnswer: "1 [2, 5]",
      explanation: "Primitive types (like numbers) are passed by value, so `a = 10` doesn't affect `x`. Objects (like arrays) are passed by reference, so `b.push(5)` modifies the original array `y`.",
      difficulty: "hard"
    },
    {
      id: "gto-6",
      code: "console.log(typeof null);",
      options: ["'object'", "'null'", "'undefined'", "'boolean'"],
      correctAnswer: "'object'",
      explanation: "In JavaScript, `typeof null` is historically and intentionally `'object'`, which is considered a long-standing bug in the language.",
      difficulty: "medium"
    },
    {
      id: "gto-7",
      code: "console.log(0.1 + 0.2 === 0.3);",
      options: ["true", "false", "Error", "NaN"],
      correctAnswer: "false",
      explanation: "Due to floating-point precision issues in JavaScript (and many other languages), `0.1 + 0.2` evaluates to `0.30000000000000004`, which is not strictly equal to `0.3`.",
      difficulty: "hard"
    },
    {
      id: "gto-8",
      code: "const obj = { a: 1 };\nconst obj2 = { ...obj };\nobj.a = 2;\nconsole.log(obj2.a);",
      options: ["1", "2", "undefined", "Error"],
      correctAnswer: "1",
      explanation: "The spread operator (`...`) creates a shallow copy. `obj2` gets a copy of `obj.a`'s value at the time of creation. Subsequent changes to `obj.a` do not affect `obj2.a`.",
      difficulty: "easy"
    },
    {
      id: "gto-9",
      code: "let count = 0;\nfunction increment() {\n  return ++count;\n}\nconsole.log(increment());\nconsole.log(increment());",
      options: ["1 1", "0 1", "1 2", "2 1"],
      correctAnswer: "1 2",
      explanation: "The `++count` (pre-increment) operator increments `count` and then returns the new value. The `count` variable persists between function calls.",
      difficulty: "easy"
    },
    {
      id: "gto-10",
      code: "console.log(NaN === NaN);",
      options: ["true", "false", "Error", "undefined"],
      correctAnswer: "false",
      explanation: "In JavaScript, `NaN` is the only value that is not equal to itself. You must use `isNaN()` to check for `NaN`.",
      difficulty: "medium"
    },
    {
      id: "gto-11",
      code: "console.log(parseInt('10.99', 10));",
      options: ["10", "10.99", "NaN", "Error"],
      correctAnswer: "10",
      explanation: "`parseInt()` parses a string argument and returns an integer. It stops parsing at the first non-numeric character.",
      difficulty: "easy"
    },
    {
      id: "gto-12",
      code: "console.log('5' - 3);",
      options: ["2", "53", "NaN", "Error"],
      correctAnswer: "2",
      explanation: "The subtraction operator (`-`) forces JavaScript to convert the string '5' to a number before performing the operation.",
      difficulty: "easy"
    },
    {
      id: "gto-13",
      code: "console.log([] + []);",
      options: ["''", "[]", "0", "NaN"],
      correctAnswer: "''",
      explanation: "When using the `+` operator with arrays, JavaScript converts them to strings. `[].toString()` is an empty string, so `'' + ''` results in `''`.",
      difficulty: "hard"
    },
    {
      id: "gto-14",
      code: "console.log({} + []);",
      options: ["'[object Object]'", "'[object Object]'", "0", "NaN"],
      correctAnswer: "'[object Object]'",
      explanation: "When an object is converted to a string (e.g., for string concatenation), it often becomes `'[object Object]'`. An empty array becomes `''`. So `[object Object] + ''` is `'[object Object]'`. Note that if `{}` is at the beginning of the line, it might be parsed as a block and the result could be different in browser console. Here, assume it's an expression.",
      difficulty: "hard"
    },
    {
      id: "gto-15",
      code: "console.log(typeof function(){});",
      options: ["'function'", "'object'", "'undefined'", "'boolean'"],
      correctAnswer: "'function'",
      explanation: "The `typeof` operator correctly identifies functions as `'function'`.",
      difficulty: "easy"
    },
    {
      id: "gto-16",
      code: "console.log(true + false);",
      options: ["1", "0", "truefalse", "NaN"],
      correctAnswer: "1",
      explanation: "In JavaScript, `true` coerces to 1 and `false` to 0 in arithmetic operations. So, `1 + 0` equals `1`.",
      difficulty: "easy"
    },
    {
      id: "gto-17",
      code: "let val = 10;\nif (val === '10') {\n  console.log('Equal');\n} else {\n  console.log('Not Equal');\n}",
      options: ["Equal", "Not Equal", "Error", "undefined"],
      correctAnswer: "Not Equal",
      explanation: "The strict equality operator `===` checks both value and type. `10` (number) is not strictly equal to `'10'` (string).",
      difficulty: "easy"
    },
    {
      id: "gto-18",
      code: "let arr = [1, 2, 3];\ndelete arr[1];\nconsole.log(arr.length);",
      options: ["2", "3", "undefined", "Error"],
      correctAnswer: "3",
      explanation: "The `delete` operator removes an element from an array by setting it to `empty`, but it does not reindex the array or affect its length. It leaves a 'hole' in the array.",
      difficulty: "medium"
    },
    {
      id: "gto-19",
      code: "console.log(Math.max());",
      options: ["-Infinity", "Infinity", "0", "NaN"],
      correctAnswer: "-Infinity",
      explanation: "If `Math.max()` is called with no arguments, it returns `-Infinity`.",
      difficulty: "hard"
    },
    {
      id: "gto-20",
      code: "console.log('hello'.charAt(0));",
      options: ["'h'", "'e'", "''", "Error"],
      correctAnswer: "'h'",
      explanation: "The `charAt()` method returns the character at the specified index in a string. Indexing starts from 0.",
      difficulty: "easy"
    },
    {
      id: "gto-21",
      code: "let nums = [1, 2, 3];\nnums[5] = 6;\nconsole.log(nums.length);",
      options: ["3", "4", "5", "6"],
      correctAnswer: "6",
      explanation: "When you assign a value to an index beyond the current length of an array, JavaScript automatically increases the array's length to accommodate the new element, filling intermediate indices with `empty` slots.",
      difficulty: "medium"
    },
    {
      id: "gto-22",
      code: "console.log(parseInt('xyz123'));",
      options: ["NaN", "123", "0", "Error"],
      correctAnswer: "NaN",
      explanation: "`parseInt()` attempts to parse a string from its beginning. If the first non-whitespace character cannot be converted to a number, it returns `NaN`.",
      difficulty: "easy"
    },
    {
      id: "gto-23",
      code: "console.log(+'10');",
      options: ["10", "'10'", "NaN", "Error"],
      correctAnswer: "10",
      explanation: "The unary plus operator (`+`) attempts to convert its operand into a number. For a string containing a valid number, it converts it.",
      difficulty: "medium"
    },
    {
      id: "gto-24",
      code: "let p = new Promise(resolve => setTimeout(() => resolve(1), 10));\np.then(val => console.log(val));\nconsole.log(0);",
      options: ["0 1", "1 0", "0", "1"],
      correctAnswer: "0 1",
      explanation: "Promises are asynchronous. The `console.log(0)` executes immediately. The `then` callback for the promise executes after a delay (even 0ms `setTimeout` puts it in the microtask queue, after current script execution).",
      difficulty: "hard"
    },
    {
      id: "gto-25",
      code: "let arr = [1, 2, 3];\nconsole.log(arr.slice(1, 2));",
      options: ["[2]", "[1, 2]", "[2, 3]", "[1]"],
      correctAnswer: "[2]",
      explanation: "The `slice()` method extracts a section of an array and returns a new array. The second argument (end index) is exclusive.",
      difficulty: "easy"
    },
    {
      id: "gto-26",
      code: "console.log(typeof [1,2]);",
      options: ["'object'", "'array'", "'function'", "'undefined'"],
      correctAnswer: "'object'",
      explanation: "In JavaScript, arrays are a type of object. `typeof` operator returns `'object'` for arrays.",
      difficulty: "easy"
    },
    {
      id: "gto-27",
      code: "let a = 1;\nlet b = 2;\n[a, b] = [b, a];\nconsole.log(a, b);",
      options: ["1 2", "2 1", "undefined undefined", "Error"],
      correctAnswer: "2 1",
      explanation: "Array destructuring assignment can be used to swap variable values concisely.",
      difficulty: "medium"
    },
    {
      id: "gto-28",
      code: "const x = 'Hello';\nsetTimeout(() => console.log(x), 1000);\nconst x = 'World';\nconsole.log(x);",
      options: ["Hello World", "World Hello", "World", "Error"],
      correctAnswer: "Error",
      explanation: "Redeclaring a `const` variable `x` will cause a `SyntaxError: Identifier 'x' has already been declared`.",
      difficulty: "hard"
    },
    {
      id: "gto-29",
      code: "console.log(Boolean(0));\nconsole.log(Boolean(''));\nconsole.log(Boolean(null));\nconsole.log(Boolean(undefined));",
      options: ["false false false false", "true true true true", "false true false true", "true false true false"],
      correctAnswer: "false false false false",
      explanation: "0, empty string, null, and undefined are all 'falsy' values in JavaScript, meaning they coerce to `false` when converted to a boolean.",
      difficulty: "easy"
    },
    {
      id: "gto-30",
      code: "let obj = { a: 1 };\nlet clone = JSON.parse(JSON.stringify(obj));\nobj.a = 2;\nconsole.log(clone.a);",
      options: ["1", "2", "undefined", "Error"],
      correctAnswer: "1",
      explanation: "`JSON.parse(JSON.stringify(obj))` creates a deep copy (for simple objects). Changes to the original `obj` do not affect the `clone`.",
      difficulty: "medium"
    },
    {
      id: "gto-31",
      code: "console.log(+'abc');",
      options: ["NaN", "0", "Error", "undefined"],
      correctAnswer: "NaN",
      explanation: "The unary plus operator attempts to convert its operand to a number. If the string is not a valid number, it results in `NaN` (Not a Number).",
      difficulty: "easy"
    },
    {
      id: "gto-32",
      code: "let num = 10;\nnum = num ?? 5;\nconsole.log(num);",
      options: ["10", "5", "undefined", "Error"],
      correctAnswer: "10",
      explanation: "The nullish coalescing operator `??` returns its right-hand operand when its left-hand operand is `null` or `undefined`. Since `num` is 10 (not null or undefined), it keeps its value.",
      difficulty: "medium"
    },
    {
      id: "gto-33",
      code: "console.log(5 < 6 < 7);",
      options: ["true", "false", "Error", "NaN"],
      correctAnswer: "true",
      explanation: "Expressions are evaluated from left to right. `5 < 6` is `true`. Then `true < 7` is evaluated. `true` coerces to `1` in numeric contexts, so `1 < 7` is `true`.",
      difficulty: "hard"
    },
    {
      id: "gto-34",
      code: "console.log(7 < 6 < 5);",
      options: ["true", "false", "Error", "NaN"],
      correctAnswer: "true",
      explanation: "`7 < 6` is `false`. Then `false < 5` is evaluated. `false` coerces to `0` in numeric contexts, so `0 < 5` is `true`.",
      difficulty: "hard"
    },
    {
      id: "gto-35",
      code: "let val = 1;\nswitch (val) {\n  case 1:\n    console.log('One');\n  case 2:\n    console.log('Two');\n    break;\n  default:\n    console.log('Other');\n}",
      options: ["One", "One Two", "Two", "Other"],
      correctAnswer: "One Two",
      explanation: "Without a `break` statement after `case 1`, the code 'falls through' to `case 2` and executes its code as well.",
      difficulty: "medium"
    },
    {
      id: "gto-36",
      code: "console.log(Array.isArray([]));",
      options: ["true", "false", "undefined", "Error"],
      correctAnswer: "true",
      explanation: "`Array.isArray()` is the reliable way to check if a value is an array.",
      difficulty: "easy"
    },
    {
      id: "gto-37",
      code: "function func() { return arguments.length; }\nconsole.log(func(1, 2, 3));",
      options: ["3", "undefined", "Error", "1"],
      correctAnswer: "3",
      explanation: "The `arguments` object is an array-like object corresponding to the arguments passed to a function. `arguments.length` gives the number of arguments.",
      difficulty: "medium"
    },
    {
      id: "gto-38",
      code: "const arr = [1, 2, 3];\narr[10] = 100;\nconsole.log(arr.indexOf(undefined));",
      options: ["-1", "1", "4", "Error"],
      correctAnswer: "-1",
      explanation: "`indexOf()` returns the first index at which a given element can be found in the array. `undefined` is not strictly equal to the `empty` slots created when an array is extended, so it won't find them.",
      difficulty: "hard"
    },
    {
      id: "gto-39",
      code: "console.log('abc'[0]);",
      options: ["'a'", "undefined", "Error", "null"],
      correctAnswer: "'a'",
      explanation: "Strings can be accessed like arrays using bracket notation to get individual characters.",
      difficulty: "easy"
    },
    {
      id: "gto-40",
      code: "let x = 1;\nlet y = x;\ny = 2;\nconsole.log(x);",
      options: ["1", "2", "undefined", "Error"],
      correctAnswer: "1",
      explanation: "For primitive types (like numbers), assignment creates a copy. Changing `y` does not affect `x`.",
      difficulty: "easy"
    },
  ];