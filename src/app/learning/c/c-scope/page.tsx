/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-scope/page.tsx
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
## C Scope

Scope in C refers to the region of a program where a declared variable can be accessed or used. Variables can have different scopes: local scope, global scope, and function parameter scope.

### 1. Local Scope (Block Scope)

A variable declared inside a block of code (e.g., inside a function, an 'if' statement, a 'for' loop, or any curly braces '{}'') has **local scope**. It can only be accessed from within that block.

\`\`\`c
#include <stdio.h>

void myFunction() {
    int localVar = 10; // localVar has local scope (within myFunction)
    printf("Inside myFunction: localVar = %d\\n", localVar);
}

int main() {
    // Attempting to access localVar here would cause a compile-time error
    // printf("Outside myFunction: localVar = %d\\n", localVar); // ERROR!

    myFunction(); // Call the function

    int mainLocalVar = 20; // mainLocalVar has local scope (within main)
    printf("Inside main: mainLocalVar = %d\\n", mainLocalVar);

    // Variables declared inside a loop or if statement also have local scope to that block
    for (int i = 0; i < 2; i++) {
        int loopVar = 100; // loopVar is local to this for loop block
        printf("Inside loop: loopVar = %d\\n", loopVar);
    }
    // printf("Outside loop: loopVar = %d\\n", loopVar); // ERROR!

    return 0;
}
\`\`\`

### 2. Global Scope

A variable declared outside any function or block has **global scope**. It can be accessed from anywhere in the program, after its declaration.

\`\`\`c
#include <stdio.h>

int globalVar = 50; // globalVar has global scope

void displayGlobal() {
    printf("Inside displayGlobal: globalVar = %d\\n", globalVar);
}

int main() {
    printf("Inside main: globalVar = %d\\n", globalVar); // Accessible here
    displayGlobal(); // Accessible in other functions
    
    globalVar = 75; // Global variables can be modified from anywhere
    printf("Inside main (after modification): globalVar = %d\\n", globalVar);

    return 0;
}
\`\`\`

**Warning:** While convenient, overusing global variables can lead to code that is harder to debug and maintain, as their values can be changed by any part of the program.

### 3. Function Parameter Scope

Parameters defined in a function's declaration have scope local to that function. They behave like local variables within the function body.

\`\`\`c
#include <stdio.h>

void calculateSum(int a, int b) { // 'a' and 'b' have scope local to calculateSum
    int sum = a + b; // 'sum' is also local to calculateSum
    printf("Sum: %d\\n", sum);
}

int main() {
    calculateSum(10, 20);
    // Attempting to access 'a', 'b', or 'sum' here would result in an error
    return 0;
}
\`\`\`

Understanding variable scope is critical for preventing naming conflicts and ensuring that variables are used correctly and securely within your C programs.
`;

export default function CScopePage() {
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
