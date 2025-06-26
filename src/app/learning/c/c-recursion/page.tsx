/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-recursion/page.tsx
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
## C Recursion

Recursion is a programming technique where a function calls itself to solve a problem. It's often used for problems that can be broken down into smaller, self-similar subproblems.

### How Recursion Works

A recursive function typically has two main parts:

1.  **Base Case:** This is the condition that stops the recursion. Without a base case, the function would call itself indefinitely, leading to a stack overflow error.
2.  **Recursive Step:** The part where the function calls itself with a modified input, moving closer to the base case.

### Example: Factorial Calculation

The factorial of a non-negative integer 'n' (denoted as 'n!') is the product of all positive integers less than or equal to 'n'.
For example: 5! = 5 * 4 * 3 * 2 * 1 = 120.
The base case for factorial is 0! = 1.

\`\`\`c
#include <stdio.h>

// Recursive function to calculate factorial
long int factorial(int n) {
    // Base Case: If n is 0 or 1, return 1
    if (n == 0 || n == 1) {
        return 1;
    } 
    // Recursive Step: n * factorial(n-1)
    else {
        return n * factorial(n - 1); // Function calls itself
    }
}

int main() {
    int number = 5;
    long int result = factorial(number);
    printf("Factorial of %d is %ld\\n", number, result); // Output: Factorial of 5 is 120
    
    number = 0;
    result = factorial(number);
    printf("Factorial of %d is %ld\\n", number, result); // Output: Factorial of 0 is 1
    
    return 0;
}
\`\`\`
\`\`\`
**Breakdown of 'factorial(5)':**

* 'factorial(5)' calls '5 * factorial(4)'
* 'factorial(4)' calls '4 * factorial(3)'
* 'factorial(3)' calls '3 * factorial(2)'
* 'factorial(2)' calls '2 * factorial(1)'
* 'factorial(1)' returns '1' (Base Case)
* 'factorial(2)' returns '2 * 1 = 2'
* 'factorial(3)' returns '3 * 2 = 6'
* 'factorial(4)' returns '4 * 6 = 24'
* 'factorial(5)' returns '5 * 24 = 120'
\`\`\`
### Advantages and Disadvantages of Recursion

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Advantages:</p>
    <ul class="list-disc list-inside text-gray-300">
      <li>Often makes code shorter and more elegant for certain problems (e.g., tree traversals, quicksort).</li>
      <li>Naturally expresses problems that are inherently recursive.</li>
    </ul>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Disadvantages:</p>
    <ul class="list-disc list-inside text-gray-300">
      <li>Can be harder to understand and debug for beginners.</li>
      <li>May lead to slower execution and more memory consumption (due to function call overhead and stack usage).</li>
      <li>Risk of **stack overflow** if the base case is not reached or if recursion is too deep.</li>
    </ul>
  </div>
</div>

For simple problems like factorial, an iterative (loop-based) solution is often more efficient. However, for complex problems where a recursive definition naturally fits, recursion can lead to cleaner and more intuitive code.

Understanding recursion is crucial for advanced algorithm design and data structures.
`;

export default function CRecursionPage() {
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
