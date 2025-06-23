// src/app/games/javascript/callback-conundrum/data.ts

export interface CallbackConundrumQuestion {
    id: string;
    codeSnippet: string; // El código JavaScript con async/callbacks
    question: string; // La pregunta (ej. "¿Cuál será la salida en la consola?")
    options: string[]; // Posibles salidas para selección múltiple (multilínea si aplica)
    correctAnswer: string; // La opción correcta (multilínea si aplica)
    explanation: string; // Explicación del Event Loop y el orden de ejecución
  }
  
  export const allCallbackConundrumQuestions: CallbackConundrumQuestion[] = [
    {
      id: 'js-cc-001',
      codeSnippet: `
  console.log("Start");
  
  setTimeout(() => {
    console.log("Timeout 1");
  }, 0);
  
  console.log("End");
      `,
      question: "What will be printed to the console?",
      options: [
        "Start\nEnd\nTimeout 1",
        "Start\nTimeout 1\nEnd",
        "Timeout 1\nStart\nEnd",
        "Error"
      ],
      correctAnswer: "Start\nEnd\nTimeout 1",
      explanation: "Even with a delay of 0, `setTimeout` schedules its callback to be executed in the next tick of the Event Loop, after the current synchronous code has finished. So, 'Start' and 'End' print first, then 'Timeout 1'."
    },
    {
      id: 'js-cc-002',
      codeSnippet: `
  console.log("A");
  
  setTimeout(() => console.log("B"), 10);
  setTimeout(() => console.log("C"), 0);
  
  console.log("D");
      `,
      question: "What will be printed to the console?",
      options: [
        "A\nD\nC\nB",
        "A\nC\nB\nD",
        "A\nB\nC\nD",
        "A\nD\nB\nC"
      ],
      correctAnswer: "A\nD\nC\nB",
      explanation: "Synchronous code ('A', 'D') runs first. Then, microtasks (like Promises, though not used here) would run. Finally, macrotasks (like `setTimeout` callbacks) run from the task queue. 'C' (0ms) is scheduled before 'B' (10ms) and thus runs first among timeouts."
    },
    {
      id: 'js-cc-003',
      codeSnippet: `
  function asyncOperation(callback) {
    setTimeout(() => {
      callback("Data received!");
    }, 50);
  }
  
  console.log("Requesting data...");
  asyncOperation((data) => {
    console.log(data);
  });
  console.log("Request sent.");
      `,
      question: "What will be printed to the console?",
      options: [
        "Requesting data...\nRequest sent.\nData received!",
        "Requesting data...\nData received!\nRequest sent.",
        "Data received!\nRequesting data...\nRequest sent.",
        "Error"
      ],
      correctAnswer: "Requesting data...\nRequest sent.\nData received!",
      explanation: "The `asyncOperation` is asynchronous due to `setTimeout`. 'Requesting data...' and 'Request sent.' are synchronous and execute immediately. The callback for `asyncOperation` runs after the 50ms delay, printing 'Data received!'."
    },
    {
      id: 'js-cc-004',
      codeSnippet: `
  let count = 0;
  
  function increment() {
    setTimeout(() => {
      count++;
      console.log('Count:', count);
    }, 0);
  }
  
  increment();
  count++;
  console.log('Main:', count);
      `,
      question: "What will be printed to the console?",
      options: [
        "Main: 1\nCount: 2",
        "Count: 1\nMain: 2",
        "Main: 2\nCount: 1",
        "Main: 0\nCount: 1"
      ],
      correctAnswer: "Main: 1\nCount: 2", // Corrected
      explanation: "The `increment` function's `setTimeout` schedules its callback to run later. The synchronous `count++` (making `count` 1) and `console.log('Main:', count)` (printing 'Main: 1') execute first. Then, the `setTimeout` callback runs, incrementing `count` to 2 and printing 'Count: 2'."
    },
    {
      id: 'js-cc-005',
      codeSnippet: `
  console.log("Start");
  
  new Promise(resolve => {
    console.log("Promise executing");
    resolve("Promise resolved");
  }).then(val => {
    console.log(val);
  });
  
  setTimeout(() => {
    console.log("Timeout");
  }, 0);
  
  console.log("End");
      `,
      question: "What will be printed to the console?",
      options: [
        "Start\nPromise executing\nEnd\nPromise resolved\nTimeout",
        "Start\nEnd\nPromise executing\nPromise resolved\nTimeout",
        "Start\nPromise executing\nPromise resolved\nEnd\nTimeout",
        "Start\nEnd\nTimeout\nPromise executing\nPromise resolved"
      ],
      correctAnswer: "Start\nPromise executing\nEnd\nPromise resolved\nTimeout",
      explanation: "1. Synchronous code: 'Start'.\n2. Promise constructor executes immediately: 'Promise executing'.\n3. Promise `then` callback is scheduled as a microtask.\n4. `setTimeout` callback is scheduled as a macrotask.\n5. Synchronous code: 'End'.\n6. Event Loop processes microtasks: 'Promise resolved'.\n7. Event Loop processes macrotasks: 'Timeout'."
    },
  ];