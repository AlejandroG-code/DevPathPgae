// src/app/learning/c/c-errors/page.tsx
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
# C Errors

Errors are an inevitable part of programming. Understanding the different types of errors and how to identify and resolve them is a crucial skill for any C programmer. Errors can broadly be categorized into:

1.  **Compile-time Errors**
2.  **Run-time Errors**
3.  **Logical Errors**

## 1. Compile-time Errors

These errors are detected by the compiler during the compilation phase, before the program can even run. The compiler will typically stop compilation and report these errors, often with line numbers and descriptions. Your program will not generate an executable until all compile-time errors are fixed.

### Types of Compile-time Errors:

-   **Syntax Errors:** Violations of the C language's grammar rules. These are the most common type of compile-time error.
    -   Missing semicolons (';')
    -   Missing curly braces ('{}')
    -   Misspelled keywords ('int' vs 'Int')
    -   Incorrect operator usage
    -   Undeclared variables or functions

    **Example (Syntax Error):**
    \`\`\`c
    #include <stdio.h>

    int main() {
        printf("Hello World") // Missing semicolon here
        return 0;
    }
    \`\`\`
    **Compiler Output Example:**
    \`\`\`
    error: expected ';' before 'return'
    \`\`\`

-   **Type Errors (Semantic Errors):** Occur when operations are performed on incompatible data types.
    -   Assigning a string to an integer variable.
    -   Performing arithmetic operations on non-numeric types.

    **Example (Type Error):**
    \`\`\`c
    #include <stdio.h>

    int main() {
        int num = "hello"; // Assigning string literal to int
        printf("%d\\n", num);
        return 0;
    }
    \`\`\`
    **Compiler Output Example:**
    \`\`\`
    error: incompatible pointer to integer conversion assigning to 'int' from 'char [6]'
    \`\`\`

-   **Linker Errors:** Occur during the linking phase (after compilation, before execution) when the linker cannot find the definition of a function or variable. This often happens if you declare a function but don't define it, or if you forget to link a library (e.g., '-lm' for math functions).

    **Example (Linker Error):**
    \`\`\`c
    #include <stdio.h>
    #include <math.h> // For sqrt

    int main() {
        double result = sqrt(25.0); // sqrt is declared in math.h, but needs -lm to link
        printf("Square root: %lf\\n", result);
        return 0;
    }
    \`\`\`
    **Compiler Output Example (if compiled without '-lm'):**
    \`\`\`
    /tmp/ccXxxxx.o: In function 'main':
    undefined reference to 'sqrt'
    collect2: error: ld returned 1 exit status
    \`\`\`

## 2. Run-time Errors

These errors occur while the program is executing. The compiler cannot detect these errors because they depend on external factors or specific program states that only become apparent during runtime. Run-time errors often cause the program to crash or behave unexpectedly.

### Types of Run-time Errors:

-   **Division by Zero:** Attempting to divide a number by zero.
    **Example:** 'int result = 10 / 0;' (This will likely cause a crash/segmentation fault).
-   **Null Pointer Dereference:** Attempting to access memory through a pointer that points to 'NULL'.
    **Example:** 'int *ptr = NULL; *ptr = 10;' (Causes a segmentation fault).
-   **Array Out-of-Bounds Access:** Trying to access an array element beyond its defined size.
    **Example:** 'int arr[5]; arr[10] = 100;' (Causes undefined behavior, often a crash).
-   **Memory Exhaustion:** Trying to allocate more memory than available (e.g., 'malloc' returning 'NULL').
-   **File Not Found/Access Denied:** Attempting to open a file that doesn't exist or without proper permissions.

## 3. Logical Errors

Logical errors (or semantic errors) are the hardest to detect because the program compiles and runs without crashing, but it produces incorrect or unexpected output. The program logic is flawed.

**Example (Logical Error):**

\`\`\`c
#include <stdio.h>

// Function to calculate average, but has a logical flaw
float calculateAverage(int a, int b) {
    return (a + b) / 2; // Integer division: if a+b is odd, result is truncated
}

int main() {
    int x = 5, y = 4;
    float avg = calculateAverage(x, y); // Expected (5+4)/2 = 4.5
    printf("Average: %.1f\\n", avg); // Output: Average: 4.0 (due to integer division)
    return 0;
}
\`\`\`
**Fix for the logical error:** Cast one of the operands to float: 'return (float)(a + b) / 2;' or 'return (a + b) / 2.0;'

### Debugging Logical Errors:

-   **Print Statements:** Inserting 'printf()' statements to display variable values at various points in the program can help trace the execution and identify where the logic goes wrong.
-   **Debuggers:** Using a debugger (like GDB) allows you to step through your code line by line, inspect variable values, set breakpoints, and examine the call stack, which is invaluable for finding logical errors.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Developing a systematic approach to error detection and debugging is essential. Pay attention to compiler warnings, write robust code that anticipates runtime issues (e.g., check 'NULL' from malloc), and test your program thoroughly with various inputs to uncover logical flaws.
    </div>
</div>
`;


export default function CErrorsPage() {

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
          prevLesson="c-memory-management"
          nextLesson="c-error-handling"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
