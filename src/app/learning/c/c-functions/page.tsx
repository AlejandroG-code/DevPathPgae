// src/app/learning/c/c-functions/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import LessonNavigationButtons from '@/app/_components/LessonNavigationButtons';

declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}


const LESSON_CONTENT = `
# C Functions

Functions are blocks of code that perform a specific task. They are fundamental to modular programming, allowing you to break down a large program into smaller, manageable, and reusable pieces. Using functions makes your code:

-   **Modular:** Programs are organized into logical units.
-   **Reusable:** A function can be called multiple times from different parts of the program.
-   **Easier to Debug:** You can isolate issues to specific functions.
-   **More Readable:** Complex logic is encapsulated, improving clarity.

## Anatomy of a Function

A typical C function has the following structure:

\`\`\`c
returnType functionName(parameter1Type parameter1Name, parameter2Type parameter2Name, ...) {
    // Function body: code to be executed
    // ...
    return returnValue; // Optional: if returnType is not void
}
\`\`\`

-   'returnType': The type of value the function will return. If the function does not return any value, its return type is 'void'.
-   'functionName': A unique identifier for the function.
-   'parameters': A comma-separated list of input variables (and their types) that the function accepts. These are optional.
-   '{...}': The function body, enclosed in curly braces, contains the statements that perform the function's task.
-   'return': (Optional) Used to send a value back from the function to the caller. The 'returnValue' must match the 'returnType'.

## Declaring, Defining, and Calling Functions

### 1. Function Declaration (Prototype)

A function declaration (or prototype) tells the compiler about a function's name, its return type, and the types of its parameters. It's usually placed at the top of the file or in a header file, allowing the compiler to know about the function before it's actually defined.

**Syntax:**

\`\`\`c
returnType functionName(parameterType1, parameterType2, ...); // Parameter names are optional in declaration
\`\`\`

### 2. Function Definition

The function definition contains the actual code (body) of the function.

**Syntax:**

\`\`\`c
returnType functionName(parameter1Type parameter1Name, parameter2Type parameter2Name, ...) {
    // Function body
}
\`\`\`

### 3. Function Call

To use a function, you "call" it from another part of the program (e.g., from 'main()' or another function) by its name, followed by parentheses containing any arguments required.

**Syntax:**

\`\`\`c
functionName(argument1, argument2, ...);
\`\`\`

**Example: A Simple Function**

\`\`\`c
#include <stdio.h> // For printf

// 1. Function Declaration (Prototype)
// Tells the compiler that a function called 'greet' exists,
// it takes no arguments, and returns nothing (void).
void greet();

// 2. Another Function Declaration
// Takes two integers, returns an integer.
int addNumbers(int num1, int num2);

int main() {
    // 3. Function Calls
    greet(); // Call the 'greet' function

    int result = addNumbers(10, 5); // Call 'addNumbers', store the returned value
    printf("Sum: %d\\n", result);

    printf("Sum of 7 and 3 is: %d\\n", addNumbers(7, 3)); // Call directly in printf

    return 0; // The 'main' function also returns a value
}

// 4. Function Definition for 'greet'
// This is where the actual code for the 'greet' function is.
void greet() {
    printf("Hello from a function!\\n");
}

// 5. Function Definition for 'addNumbers'
int addNumbers(int num1, int num2) {
    int sum = num1 + num2;
    return sum; // Return the calculated sum
}
\`\`\`

**Output:**

\`\`\`
Hello from a function!
Sum: 15
Sum of 7 and 3 is: 10
\`\`\`

## Functions with No Return Value ('void')

If a function does not need to return any value to the caller, its return type should be 'void'. The 'return' statement can still be used, but without a value, to simply exit the function.

\`\`\`c
#include <stdio.h>

void printMessage(char *msg) { // Takes a string, returns nothing
    printf("Message: %s\\n", msg);
}

int main() {
    printMessage("This is a void function.");
    return 0;
}
\`\`\`

## Functions with Return Values

Functions can compute a value and send it back to the calling part of the program using the 'return' statement.

\`\`\`c
#include <stdio.h>

int multiply(int x, int y) {
    return x * y; // Returns the product of x and y
}

int main() {
    int product = multiply(8, 4);
    printf("Product: %d\\n", product); // Output: 32
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Functions are the building blocks of well-structured C programs. They promote code organization, reusability, and make debugging significantly easier. Get comfortable with creating and using them.
    </div>
</div>
`;


export default function CFunctionsPage() {

  useEffect(() => {
    // Load Prism CSS
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Prism core JS
    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      // Load C language component after core is loaded
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true;

      scriptCLang.onload = () => {
        // Highlight all code blocks after C language component is loaded
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptCLang);
    };
    document.body.appendChild(scriptCore);

    // Cleanup function
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const cLangScript = document.querySelector('script[src*="prism-c.min.js"]');
      if (cLangScript && document.body.contains(cLangScript)) {
        document.body.removeChild(cLangScript);
      }
    };
  }, [LESSON_CONTENT]); // Re-run effect if lesson content changes

  const components: Components = {
    // Custom renderers for markdown elements to apply Tailwind CSS
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const lang = match ? match[1] : 'markup'; 
      return (
        <pre className="my-4 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-4 text-sm">
          <code className={`language-${lang}`} {...props}>
            {String(children).replace(/\n$/, '')}
          </code>
        </pre>
      );
    },
    h1: ({ ...props }) => <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-vibrant-teal mb-4 mt-8 drop-shadow-md" {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 mt-6 border-b border-gray-700 pb-2" {...props} />,
    h3: ({ ...props }) => <h3 className="text-2xl md:text-3xl font-semibold text-vibrant-teal mb-2 mt-5" {...props} />,
    p: ({ ...props }) => <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed" {...props} />,
    strong: ({ ...props }) => <strong className="font-bold text-vibrant-teal" {...props} />,
    a: ({ ...props }) => <a className="text-accent-purple hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc list-inside ml-4 text-gray-300 mb-4 space-y-1" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal list-inside ml-4 text-gray-300 mb-4 space-y-1" {...props} />,
    li: ({ ...props }) => <li className="mb-2" {...props} />,
    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-accent-purple pl-4 italic text-gray-400 my-4" {...props} />,
    table: ({ ...props }) => <table className="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden" {...props} />,
    thead: ({ ...props }) => <thead className="bg-gray-700" {...props} />,
    th: ({ ...props }) => <th className="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm" {...props} />,
    tbody: ({ ...props }) => <tbody {...props} />,
    td: ({ ...props }) => <td className="p-3 border-b border-gray-700 text-gray-300 text-sm" {...props} />,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-full px-4 md:px-8 mx-auto">
        <div className="lesson-content p-4 md:p-8 bg-gray-900 text-white rounded-lg shadow-xl w-full">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {LESSON_CONTENT}
          </ReactMarkdown>
        </div>
        <LessonNavigationButtons
          currentCourseId="c"
          prevLesson="c-pointers"
          nextLesson="c-function-parameters"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
