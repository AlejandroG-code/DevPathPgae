/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-errors/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LessonSidebar from '@/app/_components/LessonSidebar'; // Adjust path if _components is not used
import { useParams } from 'next/navigation'; // Needed for useEffect dependencies

// Extend the Window interface to include the Prism property
declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

interface LessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

const LESSON_CONTENT = `
## C Errors

Errors are an inevitable part of programming. In C, errors can occur at different stages of program development and execution. Understanding the types of errors helps in debugging and writing robust code.

### 1. Compile-Time Errors (Syntax Errors)

These errors occur during the compilation phase, before the program can even run. They are usually caused by violations of the C language's syntax rules. The compiler detects these errors and prevents the program from being compiled into an executable.

**Common Compile-Time Errors:**
* **Missing Semicolon:** Every statement in C must end with a semicolon.
* **Undeclared Variable:** Using a variable without declaring it first.
* **Type Mismatch:** Assigning a value of an incompatible data type.
* **Missing Parenthesis or Curly Brace:** Imbalanced delimiters.
* **Keywords as Identifiers:** Using reserved keywords (e.g., 'int', 'for', 'while') as variable names.

**Example of a Compile-Time Error:**

\`\`\`c
#include <stdio.h>

int main() {
    int x = 10 // Missing semicolon here!
    printf("Value of x: %d\\n", x);
    return 0;
}
\`\`\`
**Compiler Output (GCC):**
\`\`\`
example.c:5:14: error: expected ';' before 'printf'
    printf("Value of x: %d\\n", x);
             ^
\`\`\`
The compiler points out the line where it detected an issue and often suggests the expected token.

### 2. Link-Time Errors

These errors occur during the linking phase, after compilation but before execution. They typically arise when the compiler successfully generates object code, but the linker cannot find the definitions for functions or variables that were declared but not defined (e.g., a function prototype exists, but its implementation is missing).

**Common Link-Time Errors:**
* **Undefined Reference:** A function or global variable is called/used, but its definition cannot be found in any of the compiled object files or linked libraries.
* **Multiple Definition:** A function or global variable is defined more than once.

**Example of a Link-Time Error (hypothetical):**

\`\`\`c
// my_program.c
#include <stdio.h>

void myFunction(); // Function declared (prototype exists)

int main() {
    myFunction(); // Called here
    return 0;
}

// myFunction() definition is MISSING or in another unlinked file!
\`\`\`
**Linker Output (GCC):**
\`\`\`
/tmp/ccQweR.o: In function 'main':
example.c:(.text+0x10): undefined reference to 'myFunction'
collect2: error: ld returned 1 exit status
\`\`\`

### 3. Run-Time Errors

These errors occur while the program is executing. They are usually not caught by the compiler or linker. Run-time errors often lead to program crashes, unexpected behavior, or incorrect results.

**Common Run-Time Errors:**
* **Division by Zero:** Attempting to divide a number by zero.
* **Null Pointer Dereference:** Trying to access memory through a pointer that points to 'NULL'.
* **Array Out-of-Bounds Access:** Trying to access an array element outside its defined range.
* **Memory Leaks:** Failing to 'free' dynamically allocated memory, leading to exhaustion of available memory.
* **Infinite Loops:** A loop whose condition never becomes false, causing the program to hang.

**Example of a Run-Time Error (Division by Zero):**

\`\`\`c
#include <stdio.h>

int main() {
    int numerator = 10;
    int denominator = 0; // This will cause a runtime error

    int result = numerator / denominator; // Division by zero
    printf("Result: %d\\n", result); // This line might not be reached

    return 0;
}
\`\`\`
When you run this, your program will likely crash with an error like "Floating point exception" or "Division by zero" depending on the system.

### 4. Logical Errors

These are the most difficult type of errors to detect because they don't cause the program to crash or issue warnings. The program runs successfully, but it produces incorrect or unexpected output because of flaws in the program's logic.

**Example of a Logical Error:**

\`\`\`c
#include <stdio.h>

int main() {
    int num1 = 5;
    int num2 = 3;
    int sum;

    // Logical error: Instead of addition, we used subtraction by mistake
    sum = num1 - num2; // Should be num1 + num2

    printf("The sum is: %d\\n", sum); // Output: The sum is: 2 (Incorrect!)
    return 0;
}
\`\`\`
The program runs fine, but the output '2' is logically incorrect for a "sum" operation of 5 and 3.

Understanding these different types of errors is the first step towards effective debugging and writing more reliable C programs.
`;

export default function CErrorsPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true;
      
      const scriptBashLang = document.createElement('script'); // For compilation output
      scriptBashLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js';
      scriptBashLang.async = true;

      scriptCLang.onload = () => {
        document.body.appendChild(scriptBashLang); // Append Bash script
        scriptBashLang.onload = () => {
          if (window.Prism) {
            window.Prism.highlightAll();
          }
        };
      };
      document.body.appendChild(scriptCLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [LESSON_CONTENT, courseId, lessonId]);

  return (
    <div className="flex min-h-screen"> 
      <LessonSidebar /> 
      
      <main className="flex-1 ml-0 md:ml-64"> 
        <div className="lesson-content p-4 md:p-8 bg-gray-900 text-white rounded-lg shadow-xl">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              code: ({ inline, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
                const match = /language-(\w+)/.exec(className || '');
                const lang = match ? match[1] : 'markup'; 

                return !inline ? (
                  <pre className="my-4 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-4 text-sm">
                    <code className={`language-${lang}`} {...props}>
                      {String(children).replace(/\n$/, '')}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-gray-700 text-vibrant-teal px-1 py-0.5 rounded-md text-xs" {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({ node, ...props }) => <h1 className="text-4xl md:text-5xl font-extrabold text-vibrant-teal mb-4 mt-8 drop-shadow-md" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-white mb-3 mt-6 border-b border-gray-700 pb-2" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold text-vibrant-teal mb-2 mt-5" {...props} />,
              p: ({ node, ...props }) => <p className="text-lg text-gray-300 mb-4 leading-relaxed" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-bold text-vibrant-teal" {...props} />,
              a: ({ node, ...props }) => <a className="text-accent-purple hover:underline" {...props} />,
              table: ({ node, ...props }) => <table className="w-full text-left border-collapse my-6" {...props} />,
              th: ({ node, ...props }) => <th className="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700" {...props} />,
              td: ({ node, ...props }) => <td className="p-3 border-b border-gray-700 text-gray-300" {...props} />,
            }}
          >
            {LESSON_CONTENT}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
