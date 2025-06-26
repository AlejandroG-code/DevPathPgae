/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-function-parameters/page.tsx
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
## C Function Parameters

Functions can receive data as inputs. These inputs are called **parameters** (or formal parameters) when defined in the function signature, and **arguments** (or actual parameters) when values are passed during the function call. Parameters allow functions to be more flexible and reusable, as they can operate on different data each time they are called.

### Function with Parameters

To define a function with parameters, you list the type and name for each parameter inside the parentheses during function declaration and definition.

\`\`\`c
returnType functionName(parameter1Type parameter1Name, parameter2Type parameter2Name, ...) {
    // code using parameters
}
\`\`\`

**Example: Function with a Single Parameter**

\`\`\`c
#include <stdio.h>

// Function definition: greet
void greet(char name[]) { // 'name' is a parameter (a character array for string)
    printf("Hello, %s!\\n", name);
}

int main() {
    // Call the function with an argument (a string literal)
    greet("Alice"); 
    greet("Bob");
    // Output:
    // Hello, Alice!
    // Hello, Bob!
    return 0;
}
\`\`\`

### Function with Multiple Parameters

You can define a function to accept multiple parameters by separating them with commas.

\`\`\`c
#include <stdio.h>

// Function definition: addNumbers
int addNumbers(int num1, int num2) { // num1 and num2 are integer parameters
    return num1 + num2; // Returns the sum of the two numbers
}

int main() {
    int sum1 = addNumbers(5, 7);    // Call with arguments 5 and 7
    int sum2 = addNumbers(10, 20); // Call with arguments 10 and 20

    printf("Sum 1: %d\\n", sum1); // Output: Sum 1: 12
    printf("Sum 2: %d\\n", sum2); // Output: Sum 2: 30
    return 0;
}
\`\`\`

**Important Considerations:**

* **Order Matters:** When calling a function, the arguments must be passed in the same order as the parameters are defined in the function.
* **Data Type Matching:** The data type of the arguments passed during the function call should match the data type of the parameters defined in the function. C will perform implicit type conversions if possible, but it's best to be explicit to avoid unexpected behavior.
* **Call by Value (Default):** In C, function parameters are typically passed by **call by value**. This means that a copy of the argument's value is passed to the function. Any modifications made to the parameter *inside the function* will not affect the original variable in the calling function.
\`\`\`c
#include <stdio.h>

void modifyValue(int x) { // x is a copy of the argument
    x = x * 2; // This only modifies the copy
    printf("Inside function: x = %d\\n", x);
}

int main() {
    int originalNum = 10;
    printf("Before function call: originalNum = %d\\n", originalNum); // Output: 10
    modifyValue(originalNum); // Pass the value 10
    printf("After function call: originalNum = %d\\n", originalNum);  // Output: 10 (still)
    return 0;
}
\`\`\`
* **Call by Reference (Using Pointers):** To allow a function to modify the original variable, you need to use pointers. This is known as **call by reference**. We will cover this in detail in the Pointers section.

Functions with parameters are essential for writing modular, flexible, and powerful C programs that can process and manipulate diverse data.
`;

export default function CFunctionParametersPage() {
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
