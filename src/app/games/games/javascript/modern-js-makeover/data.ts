// src/app/games/javascript/modern-js-makeover/data.ts

export interface ModernJsMakeoverQuestion {
    id: string;
    task: string; // Descripción de la tarea (qué modernizar)
    oldCode: string; // El código JS "antiguo"
    options: string[]; // Opciones de código refactorizado
    correctAnswer: string; // La opción de código correcta/más moderna
    explanation: string; // Explicación de por qué la solución es mejor
  }
  
  export const allModernJsMakeoverQuestions: ModernJsMakeoverQuestion[] = [
    {
      id: 'js-mjm-001',
      task: "Refactor this variable declaration to use modern JavaScript practices.",
      oldCode: `
  var myVariable = "Hello";
  myVariable = "World";
      `,
      options: [
        `let myVariable = "Hello";\nmyVariable = "World";`,
        `const myVariable = "Hello";\nmyVariable = "World";`, // Incorrect as it's reassigned
        `let myVariable = "Hello";\nconst myVariable = "World";`,
        `var myVariable = "Hello"; // No change`
      ],
      correctAnswer: `let myVariable = "Hello";\nmyVariable = "World";`,
      explanation: "Use `let` instead of `var` for block-scoped variables that might be reassigned. `const` would cause an error here because `myVariable` is reassigned."
    },
    {
      id: 'js-mjm-002',
      task: "Convert this function to an arrow function.",
      oldCode: `
  function add(a, b) {
    return a + b;
  }
      `,
      options: [
        `const add = (a, b) => {\n  return a + b;\n};`,
        `function add = (a, b) => a + b;`,
        `let add(a, b) => a + b;`,
        `var add = function(a, b) { return a + b; };`
      ],
      correctAnswer: `const add = (a, b) => {\n  return a + b;\n};`,
      explanation: "Arrow functions provide a more concise syntax for functions. Using `const` is preferred for function declarations."
    },
    {
      id: 'js-mjm-003',
      task: "Refactor string concatenation using template literals.",
      oldCode: `
  var name = "Alice";
  var age = 30;
  var message = "Hello, my name is " + name + " and I am " + age + " years old.";
      `,
      options: [
        "`Hello, my name is ${name} and I am ${age} years old.`",
        `"Hello, my name is {name} and I am {age} years old."`,
        `'Hello, my name is ' + \`\${name}\` + ' and I am ' + \`\${age}\` + ' years old.';`,
        `"Hello, my name is " + name.toString() + " and I am " + age.toString() + " years old.";`
      ],
      correctAnswer: "`Hello, my name is ${name} and I am ${age} years old.`",
      explanation: "Template literals (backticks `` ` ``) allow for easy embedding of expressions (${expression}) within strings, making concatenation cleaner and more readable."
    },
    {
      id: 'js-mjm-004',
      task: "Use array destructuring to extract 'firstName' and 'lastName' from the 'names' array.",
      oldCode: `
  var names = ["John", "Doe", "Developer"];
  var firstName = names[0];
  var lastName = names[1];
      `,
      options: [
        `const [firstName, lastName] = names;`,
        `const firstName, lastName = names;`,
        `var [firstName, lastName] = names;`, // Technically works but const/let preferred
        `const {firstName, lastName} = names;` // Object destructuring, not array
      ],
      correctAnswer: `const [firstName, lastName] = names;`,
      explanation: "Array destructuring allows you to unpack values from arrays into distinct variables using a syntax that mirrors array literals."
    },
    {
      id: 'js-mjm-005',
      task: "Use the spread operator to combine two arrays.",
      oldCode: `
  var arr1 = [1, 2];
  var arr2 = [3, 4];
  var combinedArr = arr1.concat(arr2);
      `,
      options: [
        `const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combinedArr = [...arr1, ...arr2];`,
        `const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combinedArr = [arr1, arr2];`,
        `const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combinedArr = arr1 + arr2;`,
        `const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combinedArr = arr1.push(arr2);`
      ],
      correctAnswer: `const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combinedArr = [...arr1, ...arr2];`,
      explanation: "The spread operator (`...`) allows an iterable (like an array) to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected. It's concise for combining arrays."
    },
  ];