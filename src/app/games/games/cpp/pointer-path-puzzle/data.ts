// src/app/games/cpp/pointer-path-puzzle/data.ts

export interface PointerPuzzleQuestion {
    id: string;
    task: string;
    codeSnippet: string;
    blankPlaceholder: string;
    correctAnswer: string;
    explanation: string;
  }
  
  export const allPointerPathPuzzleQuestions: PointerPuzzleQuestion[] = [
    {
      id: 'pointer-001',
      task: "Declare an integer pointer named `ptr`.",
      codeSnippet: `int value = 10;
  /* YOUR ANSWER HERE */ ptr;`,
      blankPlaceholder: "int* / int",
      correctAnswer: "int*",
      explanation: "To declare a pointer to an integer, you use `int*`. The asterisk `*` signifies that it's a pointer type."
    },
    {
      id: 'pointer-002',
      task: "Assign the address of the `value` variable to the pointer `ptr`.",
      codeSnippet: `int value = 10;
  int* ptr;
  ptr = /* YOUR ANSWER HERE */ value;`,
      blankPlaceholder: "& / *",
      correctAnswer: "&",
      explanation: "The `&` (address-of) operator is used to get the memory address of a variable. This address is then assigned to a pointer."
    },
    {
      id: 'pointer-003',
      task: "Dereference the pointer `ptr` to access the value it points to, assigning it to `result`.",
      codeSnippet: `int value = 25;
  int* ptr = &value;
  int result = /* YOUR ANSWER HERE */ ptr;`,
      blankPlaceholder: "* / &",
      correctAnswer: "*",
      explanation: "The `*` (dereference) operator, when used with a pointer, accesses the value stored at the memory address the pointer holds."
    },
    {
      id: 'pointer-004',
      task: "Change the value of `data` (through its pointer `pData`) to 50.",
      codeSnippet: `int data = 100;
  int* pData = &data;
  /* YOUR ANSWER HERE */ pData = 50;`,
      blankPlaceholder: "* / &",
      correctAnswer: "*",
      explanation: "By dereferencing `pData` (`*pData`), you are accessing the memory location that `pData` points to. Assigning a new value to `*pData` changes the content of `data`."
    },
    {
      id: 'pointer-005',
      task: "Declare a pointer `pChar` and initialize it to point to the first element of the `message` array.",
      codeSnippet: `char message[] = "Hello";
  char* /* YOUR ANSWER HERE */ = message;`,
      blankPlaceholder: "pChar / &pChar",
      correctAnswer: "pChar",
      explanation: "When an array name is used without brackets or an index, it decays into a pointer to its first element. So, `char* pChar = message;` correctly initializes `pChar` to point to 'H'."
    },
    {
      id: 'pointer-006',
      task: "Move the pointer `ptr` to point to the next integer in memory.",
      codeSnippet: `int arr[] = {10, 20, 30};
  int* ptr = arr; // ptr points to 10
  ptr/* YOUR ANSWER HERE */; // ptr should now point to 20`,
      blankPlaceholder: "++ / --",
      correctAnswer: "++",
      explanation: "Pointer arithmetic allows you to move a pointer by increments of the size of the data type it points to. `ptr++` moves `ptr` to the memory location of the next `int`."
    },
    {
      id: 'pointer-007',
      task: "Declare a `nullptr` for an integer pointer.",
      codeSnippet: `int* myPtr = /* YOUR ANSWER HERE */;`,
      blankPlaceholder: "nullptr / NULL / 0",
      correctAnswer: "nullptr",
      explanation: "`nullptr` is a keyword introduced in C++11 to represent a null pointer. It's type-safe and preferred over `NULL` or `0` for initializing null pointers."
    },
    {
      id: 'pointer-008',
      task: "Check if the pointer `dataPtr` is NOT null.",
      codeSnippet: `int* dataPtr = new int(5);
  if (dataPtr /* YOUR ANSWER HERE */ nullptr) {
    // do something
  }`,
      blankPlaceholder: "!= / ==",
      correctAnswer: "!=",
      explanation: "You compare a pointer to `nullptr` to check if it points to a valid memory location or not. `!= nullptr` means it is not a null pointer."
    },
    {
      id: 'pointer-009',
      task: "Create a constant pointer to an integer that can be modified (the value it points to can change, but the pointer itself cannot point to a different address).",
      codeSnippet: `int x = 10;
  int y = 20;
  int* const /* YOUR ANSWER HERE */ = &x; // p_const_ptr points to x, but can't point elsewhere`,
      blankPlaceholder: "p_const_ptr / const_ptr_p",
      correctAnswer: "p_const_ptr",
      explanation: "The `const` keyword placed *after* the asterisk (`*`) in a pointer declaration makes the pointer itself constant. It must be initialized and cannot be reassigned to point to a different address."
    },
    {
      id: 'pointer-010',
      task: "Create a pointer to a constant integer (the pointer can change what it points to, but the value it points to cannot be modified through this pointer).",
      codeSnippet: `const int x = 10;
  int y = 20;
  const int* /* YOUR ANSWER HERE */; // p_to_const can point to x or y, but not change their values through it
  p_to_const = &x;`,
      blankPlaceholder: "p_to_const / const_p_to",
      correctAnswer: "p_to_const",
      explanation: "The `const` keyword placed *before* the asterisk (`*`) in a pointer declaration makes the data pointed to constant. You cannot modify the value through this pointer, but the pointer itself can be reassigned to point to other (potentially non-const) locations."
    },
  ];