// src/app/games/cpp/memory-manager-maze/data.ts

export interface MemoryMazeQuestion {
    id: string;
    task: string;
    codeSnippet: string;
    blankPlaceholder: string;
    correctAnswer: string;
    explanation: string;
  }
  
  export const allMemoryManagerMazeQuestions: MemoryMazeQuestion[] = [
    {
      id: 'memory-001',
      task: "Dynamically allocate an integer and initialize it to 10.",
      codeSnippet: `int* numPtr = /* YOUR ANSWER HERE */ int(10);`,
      blankPlaceholder: "new / malloc",
      correctAnswer: "new",
      explanation: "In C++, `new` is used to dynamically allocate memory for a single object or an array of objects on the heap."
    },
    {
      id: 'memory-002',
      task: "Deallocate the dynamically allocated integer pointed to by `numPtr`.",
      codeSnippet: `int* numPtr = new int(20);
  /* YOUR ANSWER HERE */ numPtr;`,
      blankPlaceholder: "delete / free",
      correctAnswer: "delete",
      explanation: "The `delete` operator is used to deallocate memory previously allocated with `new`. Failing to `delete` memory leads to memory leaks."
    },
    {
      id: 'memory-003',
      task: "Dynamically allocate an array of 5 integers.",
      codeSnippet: `int* arrPtr = /* YOUR ANSWER HERE */ int[5];`,
      blankPlaceholder: "new / new[]",
      correctAnswer: "new", // Correct form is `new int[5]`
      explanation: "To dynamically allocate an array in C++, you use `new Type[size]`. The `[]` is part of the syntax when allocating arrays, but the base operator is `new`."
    },
    {
      id: 'memory-004',
      task: "Deallocate the dynamically allocated array pointed to by `arrPtr`.",
      codeSnippet: `int* arrPtr = new int[10];
  /* YOUR ANSWER HERE */ arrPtr;`,
      blankPlaceholder: "delete[] / delete",
      correctAnswer: "delete[]",
      explanation: "When deallocating a dynamically allocated array (allocated with `new[]`), you **must** use `delete[]`. Using `delete` alone for an array leads to undefined behavior and potential memory leaks."
    },
    {
      id: 'memory-005',
      task: "What happens if you forget to `delete` memory allocated with `new`?",
      codeSnippet: `// What's the problem here?
  void myFunction() {
    int* data = new int(100);
    // No delete!
  }`,
      blankPlaceholder: "Memory Leak / Stack Overflow",
      correctAnswer: "Memory Leak",
      explanation: "A memory leak occurs when a program allocates memory dynamically but fails to deallocate it when it's no longer needed, causing that memory to remain occupied and unavailable for other uses until the program terminates."
    },
    {
      id: 'memory-006',
      task: "Before deleting a pointer, it's good practice to set it to `nullptr` to prevent dangling pointers. What's missing?",
      codeSnippet: `int* ptr = new int;
  delete ptr;
  ptr = /* YOUR ANSWER HERE */;`,
      blankPlaceholder: "nullptr / 0",
      correctAnswer: "nullptr",
      explanation: "Setting a pointer to `nullptr` after `delete` prevents it from being a 'dangling pointer' (a pointer that points to deallocated memory). This helps avoid use-after-free errors."
    },
    {
      id: 'memory-007',
      task: "Access the third element (index 2) of a dynamically allocated integer array `myArray`.",
      codeSnippet: `int* myArray = new int[5]; // Array of 5 integers
  myArray[2] = 7;
  int val = /* YOUR ANSWER HERE */;`,
      blankPlaceholder: "myArray[2] / *(myArray + 2)",
      correctAnswer: "myArray[2]", // Both are technically correct, but myArray[2] is the direct answer.
      explanation: "You can access elements of a dynamically allocated array using array subscript notation `[]`, just like with static arrays. `*(myArray + 2)` is pointer arithmetic that achieves the same."
    },
    {
      id: 'memory-008',
      task: "Fill in the blank to safely allocate memory for a character array for a string of length 20 (plus null terminator).",
      codeSnippet: `char* name = /* YOUR ANSWER HERE */ char[21]; // For a 20-char string + null terminator`,
      blankPlaceholder: "new / new()",
      correctAnswer: "new",
      explanation: "When allocating an array, `new Type[size]` is the correct syntax. We need 21 characters for a 20-character string plus the null terminator `\\0`."
    },
    {
      id: 'memory-009',
      task: "What is the primary benefit of using `std::unique_ptr` over raw pointers for dynamic memory?",
      codeSnippet: `// What does unique_ptr provide automatically?
  std::unique_ptr<int> data = std::make_unique<int>(10);
  // No manual delete needed!
  `,
      blankPlaceholder: "Automatic deallocation / Faster execution",
      correctAnswer: "Automatic deallocation",
      explanation: "`std::unique_ptr` is a smart pointer that provides exclusive ownership of a dynamically allocated object. It automatically calls `delete` on the owned object when the `unique_ptr` goes out of scope, preventing memory leaks."
    },
    {
      id: 'memory-010',
      task: "What is the primary benefit of using `std::shared_ptr` for dynamic memory?",
      codeSnippet: `// What does shared_ptr manage?
  std::shared_ptr<int> ptr1 = std::make_shared<int>(10);
  std::shared_ptr<int> ptr2 = ptr1; // Shared ownership!
  `,
      blankPlaceholder: "Shared ownership and automatic deallocation / Fixed memory size",
      correctAnswer: "Shared ownership and automatic deallocation",
      explanation: "`std::shared_ptr` is a smart pointer that enables shared ownership of a dynamically allocated object. It uses a reference count to determine when the object should be deallocated (when the last `shared_ptr` owning it is destroyed)."
    },
  ];