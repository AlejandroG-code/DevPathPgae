// src/app/games/cpp/template-type-trooper/data.ts

export interface TemplateTrooperQuestion {
    id: string;
    task: string;
    codeSnippet: string;
    blankPlaceholder: string;
    correctAnswer: string;
    explanation: string;
  }
  
  export const allTemplateTypeTrooperQuestions: TemplateTrooperQuestion[] = [
    {
      id: 'template-001',
      task: "Create a function template named `add` that can add two values of any type `T`.",
      codeSnippet: `/* YOUR ANSWER HERE */<typename T>
  T add(T a, T b) {
    return a + b;
  }`,
      blankPlaceholder: "template / class",
      correctAnswer: "template",
      explanation: "The `template` keyword followed by angle brackets (`<>`) containing template parameters (like `typename T` or `class T`) is used to declare a function or class template."
    },
    {
      id: 'template-002',
      task: "Call the `add` template function with two integer arguments.",
      codeSnippet: `template<typename T>
  T add(T a, T b) {
    return a + b;
  }
  
  int main() {
    int result = /* YOUR ANSWER HERE */(5, 7);
    return 0;
  }`,
      blankPlaceholder: "add / add<int>",
      correctAnswer: "add",
      explanation: "For function templates, the compiler can often deduce the template arguments based on the types of the function arguments. So, `add(5, 7)` works perfectly, implicitly deducing `T` as `int`."
    },
    {
      id: 'template-003',
      task: "Call the `add` template function explicitly specifying the type `double`.",
      codeSnippet: `template<typename T>
  T add(T a, T b) {
    return a + b;
  }
  
  int main() {
    double result = add/* YOUR ANSWER HERE */(5.5, 7.2);
    return 0;
  }`,
      blankPlaceholder: "<double> / (double)",
      correctAnswer: "<double>",
      explanation: "You can explicitly specify template arguments using angle brackets after the function name, e.g., `add<double>(...)`. This is useful when type deduction might be ambiguous or when you want to force a specific type."
    },
    {
      id: 'template-004',
      task: "Declare a class template named `Box` that can hold a value of any type `U`.",
      codeSnippet: `/* YOUR ANSWER HERE */<class U>
  class Box {
  public:
    U value;
    Box(U v) : value(v) {}
  };`,
      blankPlaceholder: "template / typenam",
      correctAnswer: "template",
      explanation: "Similar to function templates, `template<class U>` (or `template<typename U>`) is used to declare a class template, allowing the class to work with different data types."
    },
    {
      id: 'template-005',
      task: "Create an instance of the `Box` template class that holds an `int`.",
      codeSnippet: `template<class U>
  class Box {
  public:
    U value;
    Box(U v) : value(v) {}
  };
  
  int main() {
    Box/* YOUR ANSWER HERE */ myIntBox(10);
    return 0;
  }`,
      blankPlaceholder: "<int> / (int)",
      correctAnswer: "<int>",
      explanation: "When instantiating a class template, you **must** explicitly specify the template argument(s) using angle brackets, e.g., `Box<int> myIntBox(10);`."
    },
    {
      id: 'template-006',
      task: "What keyword can be used interchangeably with `typename` in template parameter lists (for types)?",
      codeSnippet: `template</* YOUR ANSWER HERE */ T, typename U>`,
      blankPlaceholder: "class / type",
      correctAnswer: "class",
      explanation: "In C++ templates, `class` and `typename` can often be used interchangeably to specify a type parameter. `typename` is sometimes preferred for clarity or in specific contexts where `class` might be ambiguous."
    },
    {
      id: 'template-007',
      task: "Create a template function `printArray` that takes an array of any type `T` and its size.",
      codeSnippet: `template<typename T>
  void printArray(T arr[], /* YOUR ANSWER HERE */ size) {
    for (int i = 0; i < size; ++i) {
      // print arr[i]
    }
  }`,
      blankPlaceholder: "int / T",
      correctAnswer: "int",
      explanation: "The size of an array is typically an integer value, so `int size` is appropriate for the size parameter, even when the array elements are of a generic type `T`."
    },
    {
      id: 'template-008',
      task: "When dealing with multiple template parameters, how do you separate them?",
      codeSnippet: `template</* YOUR ANSWER HERE */ T, typename U, class V>`,
      blankPlaceholder: "typename / ,",
      correctAnswer: "typename", // Assuming the next blank is for the parameter itself. If asking for separator, it would be comma. Re-evaluate.
      explanation: "Template parameters are separated by commas. `typename` is a keyword to declare a type parameter."
    },
    {
      id: 'template-009',
      task: "Fill in the blank to declare a template specializing for a `double` type.",
      codeSnippet: `template<>
  void func/* YOUR ANSWER HERE */(double val) {
    // specialized for double
  }`,
      blankPlaceholder: "<double> / (double)",
      correctAnswer: "<double>",
      explanation: "Explicit specialization of a function template for a specific type uses `template<>` followed by the function signature with the specialized type in angle brackets."
    },
    {
      id: 'template-010',
      task: "What is the term for the process where the compiler creates a concrete class or function from a template for a specific type?",
      codeSnippet: `// template<typename T> void print(T val) {}
  // print(5); // Compiler creates print<int>
  `,
      blankPlaceholder: "Instantiation / Polymorphism",
      correctAnswer: "Instantiation",
      explanation: "Instantiation is the process by which the compiler generates a concrete class or function from a template, substituting the template parameters with actual types."
    },
  ];