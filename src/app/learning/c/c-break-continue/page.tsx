/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-break-continue/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams } from 'next/navigation';

import LessonNavigationButtons from '@/app/_components/LessonNavigationButtons';

declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}


const LESSON_CONTENT = `
# C Loop Control: 'break' and 'continue'

In addition to the standard loop constructs ('for', 'while', 'do-while'), C provides two important control statements that allow you to alter the normal flow of a loop: 'break' and 'continue'.

## The 'break' Statement

The 'break' statement is used to **terminate the loop immediately**. When 'break' is encountered inside a loop (or a 'switch' statement), the loop is exited, and program execution continues with the statement immediately following the loop.

**Usage:**

-   **Terminating Loops:** Useful when a specific condition occurs that makes further looping unnecessary.
-   **Exiting 'switch' cases:** (Already discussed in the 'switch' lesson) Prevents fall-through.

## Flowchart of 'break' Statement

\`\`\`mermaid
graph TD
    A[Start Loop] --> B{Condition?};
    B -- True --> C[Loop Body];
    C --> D{Break Condition?};
    D -- True --> E[Exit Loop];
    D -- False --> F[Rest of Loop Body];
    F --> A;
    E --> G[Statement After Loop];
\`\`\`

**Example 1: Using 'break' in a 'for' loop**

\`\`\`c
#include <stdio.h>

int main() {
    int i;
    for (i = 1; i <= 10; i++) {
        if (i == 5) {
            break; // Exit the loop when i is 5
        }
        printf("%d\\n", i);
    }
    printf("Loop ended.\\n");
    // Output:
    // 1
    // 2
    // 3
    // 4
    // Loop ended.
    return 0;
}
\`\`\`
In this example, the loop is designed to run from 1 to 10, but it stops prematurely when 'i' becomes 5 due to the 'break' statement.

**Example 2: Using 'break' in a 'while' loop for input validation**

\`\`\`c
#include <stdio.h>

int main() {
    int num;
    while (1) { // Infinite loop (will run forever if not explicitly broken)
        printf("Enter a positive number (0 to exit): ");
        scanf("%d", &num);
        if (num == 0) {
            break; // Exit the loop if user enters 0
        }
        if (num < 0) {
            printf("Invalid input. Please enter a positive number.\\n");
            continue; // Skip to next iteration if negative
        }
        printf("You entered: %d\\n", num);
    }
    printf("Program finished.\\n");
    return 0;
}
\`\`\`

## The 'continue' Statement

The 'continue' statement is used to **skip the current iteration of the loop** and proceed to the next iteration. When 'continue' is encountered, the rest of the loop body for the current iteration is skipped, and the loop's condition (for 'while' and 'for') or update part ('for') is evaluated for the next iteration.

## Flowchart of 'continue' Statement

\`\`\`mermaid
graph TD
    A[Start Loop] --> B{Condition?};
    B -- True --> C[Loop Body];
    C --> D{Continue Condition?};
    D -- True --> E[Skip rest of current iteration];
    E --> A; // Go back to check condition (or update, then condition for 'for')
    D -- False --> F[Rest of Loop Body];
    F --> A;
    B -- False --> G[End];
\`\`\`

**Example: Using 'continue' to skip even numbers**

\`\`\`c
#include <stdio.h>

int main() {
    int i;
    for (i = 1; i <= 10; i++) {
        if (i % 2 == 0) { // If i is even
            continue; // Skip the rest of this iteration, go to next i
        }
        printf("%d\\n", i); // This line is skipped for even numbers
    }
    // Output:
    // 1
    // 3
    // 5
    // 7
    // 9
    return 0;
}
\`\`\`
In this example, when 'i' is an even number, 'continue' is executed, and the 'printf()' statement is skipped for that iteration. The loop proceeds directly to the next value of 'i'.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        'break' and 'continue' offer powerful ways to fine-tune loop behavior. Use 'break' to exit a loop entirely, and 'continue' to skip to the next iteration, making your loop logic more flexible and efficient.
    </div>
</div>
`;


export default function CBreakContinuePage() {

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
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
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
          currentCourseId="c"
          prevLesson="c-for-loop"
          nextLesson="c-arrays"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
