/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-macros/page.tsx
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
## C Macros

Macros in C are pieces of code in a program that are replaced by the value of the macro. They are defined using the **preprocessor directive** '#define'. The preprocessor is the first phase of compilation, and it performs text substitution before the actual compilation begins.

Macros are typically used for:
* Defining constant values.
* Creating small, inlined functions to avoid function call overhead.
* Conditional compilation.

### 1. Object-like Macros (Symbolic Constants)

These are simple identifier-value substitutions. They are often used as an alternative to 'const' variables for defining constants.

\`\`\`c
#include <stdio.h>

#define PI 3.14159 // No semicolon at the end!
#define MAX_SIZE 100
#define MESSAGE "Hello, Macros!"

int main() {
    printf("Value of PI: %f\\n", PI);
    printf("Max size allowed: %d\\n", MAX_SIZE);
    printf("%s\\n", MESSAGE);
    
    // The preprocessor replaces PI with 3.14159 before compilation.
    // So, the compiler sees: printf("Value of PI: %f\\n", 3.14159);
    
    return 0;
}
\`\`\`

**Key points:**
* No semicolon after the value.
* The substitution is purely textual.
* No type checking is performed (unlike 'const' variables).

### 2. Function-like Macros

These macros take arguments and resemble function calls. They are useful for creating small, efficient code snippets that avoid the overhead of a regular function call.

\`\`\`c
#include <stdio.h>

// Function-like macro to find the maximum of two numbers
#define MAX(a, b) ((a) > (b) ? (a) : (b))

// Function-like macro for squaring a number
#define SQUARE(x) ((x) * (x))

int main() {
    int x = 10, y = 20;
    printf("Maximum of %d and %d is: %d\\n", x, y, MAX(x, y)); // Output: 20

    int num = 5;
    printf("Square of %d is: %d\\n", num, SQUARE(num));     // Output: 25
    printf("Square of %d + 1 is: %d\\n", num, SQUARE(num + 1)); // Output: 36 (correct: (5+1)*(5+1))

    // Important: Use parentheses around arguments in macro definitions
    // Without them: #define BAD_SQUARE(x) x * x
    // BAD_SQUARE(num + 1) would expand to num + 1 * num + 1 (i.e., 5 + 1 * 5 + 1 = 5 + 5 + 1 = 11) - INCORRECT!
    
    return 0;
}
\`\`\`

**Important Considerations for Function-like Macros:**

* **Parentheses are CRUCIAL:** Always enclose each argument in parentheses in the macro definition to avoid unexpected behavior due to operator precedence issues. Also, enclose the entire macro definition in parentheses if it's an expression.
* **Side Effects:** Be careful with arguments that have side effects (e.g., 'i++'). If an argument with side effects is used multiple times in the macro expansion, it will be evaluated multiple times, leading to unintended results.

\`\`\`c
#include <stdio.h>
#define MAX_DANGEROUS(a, b) (a > b ? a : b)

int main() {
    int i = 5;
    int j = 7;
    int result = MAX_DANGEROUS(i++, j); // Expands to: (i++ > j ? i++ : j)
    // If i++ is evaluated twice, i might become 7 before comparison, leading to incorrect result.
    // Best practice is to avoid such expressions in macros.
    printf("Result with side effect: %d (i=%d, j=%d)\\n", result, i, j); // Output may vary, often 7 (i=6, j=7) or 8 (i=7, j=7) depending on evaluation order.
    return 0;
}
\`\`\`

### 3. Conditional Compilation

Macros are often used with preprocessor directives like '#ifdef', '#ifndef', '#if', '#else', '#elif', and '#endif' to conditionally include or exclude blocks of code during compilation.

\`\`\`c
#include <stdio.h>

#define DEBUG // Define the DEBUG macro (or could be defined via compiler flag: -DDEBUG)

int main() {
    printf("Program is running...\\n");

#ifdef DEBUG // If DEBUG is defined
    printf("DEBUG MODE: Debugging messages are enabled.\\n");
#else // Otherwise
    printf("RELEASE MODE: Debugging messages are disabled.\\n");
#endif

    int x = 10;
#if x > 5 // Conditional compilation based on integer expression
    printf("x is greater than 5.\\n");
#else
    printf("x is not greater than 5.\\n");
#endif

    return 0;
}
\`\`\`

Macros offer powerful text substitution capabilities, but they require careful handling, especially function-like macros, to avoid common pitfalls. They are essential for low-level optimizations and conditional compilation.
`;

export default function CMacrosPage({ params }: LessonPageProps) {
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

      scriptCLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
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
