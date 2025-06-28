// src/app/learning/c/c-recursion/page.tsx
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
# C Recursion

Recursion is a programming technique where a function calls itself, directly or indirectly, to solve a problem. It's often used for problems that can be broken down into smaller, self-similar sub-problems. A recursive function must have a **base case** to prevent infinite recursion.

## How Recursion Works

When a function calls itself, new instances of the function are created on the call stack. Each instance has its own set of local variables and parameters. The function keeps calling itself until it reaches a **base case**, at which point it stops calling itself and returns a value. As each instance returns, the previous instance resumes execution.

## Key Components of a Recursive Function

1.  **Base Case:** A condition that stops the recursion. Without a base case, the function would call itself indefinitely, leading to a stack overflow error (the call stack runs out of memory).
2.  **Recursive Step:** The part of the function where it calls itself, typically with modified arguments that move it closer to the base case.

## Example 1: Factorial Calculation (Common Recursive Example)

The factorial of a non-negative integer 'n' (denoted as 'n!') is the product of all positive integers less than or equal to 'n'.
-   Base case: '0! = 1'
-   Recursive step: 'n! = n * (n-1)!'

\`\`\`c
#include <stdio.h>

// Function to calculate factorial using recursion
long long factorial(int n) {
    // Base case: if n is 0, return 1
    if (n == 0) {
        return 1;
    }
    // Recursive step: n * factorial of (n-1)
    return (long long)n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d is %lld\\n", num, factorial(num)); // Output: Factorial of 5 is 120

    num = 0;
    printf("Factorial of %d is %lld\\n", num, factorial(num)); // Output: Factorial of 0 is 1

    num = 10;
    printf("Factorial of %d is %lld\\n", num, factorial(num)); // Output: Factorial of 10 is 3628800
    return 0;
}
\`\`\`

**Breakdown of 'factorial(5)':**
-   'factorial(5)' calls 'factorial(4)'
-   'factorial(4)' calls 'factorial(3)'
-   'factorial(3)' calls 'factorial(2)'
-   'factorial(2)' calls 'factorial(1)'
-   'factorial(1)' calls 'factorial(0)'
-   'factorial(0)' returns 1 (Base case)
-   'factorial(1)' receives 1, returns 1 * 1 = 1
-   'factorial(2)' receives 1, returns 2 * 1 = 2
-   'factorial(3)' receives 2, returns 3 * 2 = 6
-   'factorial(4)' receives 6, returns 4 * 6 = 24
-   'factorial(5)' receives 24, returns 5 * 24 = 120

## Example 2: Fibonacci Sequence

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.
-   Base cases: 'fib(0) = 0', 'fib(1) = 1'
-   Recursive step: 'fib(n) = fib(n-1) + fib(n-2)'

\`\`\`c
#include <stdio.h>

int fibonacci(int n) {
    if (n == 0) {
        return 0; // Base Case 1
    } else if (n == 1) {
        return 1; // Base Case 2
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2); // Recursive Step
    }
}

int main() {
    int i;
    printf("Fibonacci sequence (first 10 terms):\\n");
    for (i = 0; i < 10; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    // Output: 0 1 1 2 3 5 8 13 21 34
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While elegant, recursion can be less efficient than iterative solutions for some problems due to the overhead of function calls and stack space usage. For problems like Fibonacci, a purely recursive solution can lead to redundant calculations (e.g., 'fib(2)' is calculated multiple times). For production code, often an iterative solution or memoization (dynamic programming) is preferred for performance.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Recursion is a powerful tool for solving problems that have a naturally recursive structure. It often leads to more concise and readable code for such problems, but always ensure you define a proper base case to prevent infinite loops.
    </div>
</div>
`;


export default function CRecursionPage() {

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
          prevLesson="c-function-declaration"
          nextLesson="c-math-functions"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
