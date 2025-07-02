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
# Java Recursion

Recursion is a programming technique where a function (or method) calls itself to solve a problem. It's a powerful concept often used for problems that can be broken down into smaller, self-similar subproblems.

## Understanding Recursion

A recursive method must have:
1.  **Base Case(s):** A condition that stops the recursion. Without a base case, the method would call itself indefinitely, leading to a 'StackOverflowError'.
2.  **Recursive Step:** The part where the method calls itself, usually with a modified input that moves closer to the base case.

## Example: Factorial Calculation

A classic example of recursion is calculating the factorial of a number. The factorial of a non-negative integer 'n', denoted as 'n!', is the product of all positive integers less than or equal to 'n'.
-   '5!' = 5 * 4 * 3 * 2 * 1 = 120
-   '0!' = 1 (base case)

\`\`\`java
public class FactorialRecursion {

  // Recursive method to calculate factorial
  public static int factorial(int n) {
    if (n == 0) { // Base case: factorial of 0 is 1
      return 1;
    } else {
      // Recursive step: n * factorial(n-1)
      return n * factorial(n - 1);
    }
  }

  public static void main(String[] args) {
    int number = 5;
    int result = factorial(number);
    System.out.println("Factorial of " + number + " is: " + result); // Output: Factorial of 5 is: 120

    number = 0;
    result = factorial(number);
    System.out.println("Factorial of " + number + " is: " + result); // Output: Factorial of 0 is: 1
  }
}
\`\`\`

### How 'factorial(5)' works:
1.  'factorial(5)' calls '5 * factorial(4)'
2.  'factorial(4)' calls '4 * factorial(3)'
3.  'factorial(3)' calls '3 * factorial(2)'
4.  'factorial(2)' calls '2 * factorial(1)'
5.  'factorial(1)' calls '1 * factorial(0)'
6.  'factorial(0)' returns 1 (base case)
7.  'factorial(1)' returns '1 * 1 = 1'
8.  'factorial(2)' returns '2 * 1 = 2'
9.  'factorial(3)' returns '3 * 2 = 6'
10. 'factorial(4)' returns '4 * 6 = 24'
11. 'factorial(5)' returns '5 * 24 = 120'

## Direct vs. Indirect Recursion

-   **Direct Recursion:** A method calls itself directly. (e.g., the 'factorial' example).
-   **Indirect Recursion:** Two or more methods call each other in a circular fashion.
    \`\`\`java
    public class IndirectRecursion {
      public static void methodA(int n) {
        if (n > 0) {
          System.out.println("Method A: " + n);
          methodB(n - 1);
        }
      }

      public static void methodB(int n) {
        if (n > 0) {
          System.out.println("Method B: " + n);
          methodA(n - 1);
        }
      }

      public static void main(String[] args) {
        methodA(3);
        // Output:
        // Method A: 3
        // Method B: 2
        // Method A: 1
      }
    }
    \`\`\`

## Advantages of Recursion

-   **Elegance and Readability:** For certain problems (like tree traversals, graph algorithms), recursive solutions can be more elegant and easier to understand than iterative ones.
-   **Reduced Code Length:** Can lead to more concise code.

## Disadvantages of Recursion

-   **Performance Overhead:** Each recursive call adds a new stack frame to the call stack, which consumes memory and can be slower than iteration.
-   **Stack Overflow:** If the recursion goes too deep (too many nested calls without reaching a base case), it can lead to a 'StackOverflowError'.
-   **Debugging Difficulty:** Debugging recursive methods can be more challenging due to the call stack.

## Recursion vs. Iteration

Many problems can be solved using either recursion or iteration (loops).

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Recursion</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Iteration (Loops)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Definition</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Method calls itself.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Uses loops ('for', 'while', 'do-while') to repeat code.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Base Case / Termination</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Requires a base case to stop.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Loop condition eventually becomes 'false'.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Memory Usage</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Higher (due to call stack for each call).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Lower (no new stack frames for each iteration).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Performance</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Generally slower due to function call overhead.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Generally faster.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Readability</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Can be more elegant for certain problems.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Can be more straightforward for simple repetitions.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: When to Use Recursion</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Recursion is often a good choice when the problem naturally breaks down into smaller instances of the same problem. Examples include traversing tree-like data structures, certain sorting algorithms (like Merge Sort), and mathematical functions defined recursively (like Fibonacci sequence).
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Stack Overflow</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The most common error with recursion is forgetting or incorrectly defining the base case, which leads to infinite recursion and a 'StackOverflowError'. Always ensure your recursive calls move towards a termination condition.
    </div>
</div>
`;

export default function JavaRecursionPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptJavaLang = document.createElement('script');
      scriptJavaLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js';
      scriptJavaLang.async = true;

      scriptJavaLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptJavaLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const javaLangScript = document.querySelector('script[src*="prism-java.min.js"]');
      if (javaLangScript && document.body.contains(javaLangScript)) {
        document.body.removeChild(javaLangScript);
      }
    };
  }, [LESSON_CONTENT]);

  const components: Components = {
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
          currentCourseId="java"
          prevLesson="java-scope"
          nextLesson="java-oop" // Next lesson, start of OOP section
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
