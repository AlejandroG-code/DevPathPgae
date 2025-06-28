// src/app/learning/c/c-while-loop/page.tsx
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
# C Loops: 'while' Loop

Loops are fundamental control structures in programming that allow a block of code to be executed repeatedly as long as a certain condition remains true. The 'while' loop is one of the most basic looping constructs in C.

## The 'while' Loop

The 'while' loop repeatedly executes a block of code as long as its given condition evaluates to true (non-zero). The condition is checked *before* each iteration of the loop.

**Syntax:**

\`\`\`c
while (condition) {
    // Code to be executed repeatedly
    // This block must eventually make the condition false
    // to avoid an infinite loop.
}
\`\`\`

-   'condition': An expression that is evaluated before each loop iteration. If it's true (non-zero), the loop body executes. If false (zero), the loop terminates.
-   '{}': Curly braces define the loop body. If there's only a single statement, they are optional, but it's best practice to always include them.

## Flowchart of 'while' Loop

\`\`\`mermaid
graph TD
    A[Start] --> B{Condition?};
    B -- True --> C[Loop Body];
    C --> B;
    B -- False --> D[End];
\`\`\`

**Example 1: Counting up to 5**

\`\`\`c
#include <stdio.h>

int main() {
    int i = 1; // Initialization

    while (i <= 5) { // Condition: loop as long as i is less than or equal to 5
        printf("%d\\n", i);
        i++; // Update: increment i to eventually make the condition false
    }
    // Output:
    // 1
    // 2
    // 3
    // 4
    // 5
    return 0;
}
\`\`\`

**Example 2: Sum of numbers until a condition is met**

\`\`\`c
#include <stdio.h>

int main() {
    int num;
    int sum = 0;

    printf("Enter positive numbers (enter 0 or negative to stop):\\n");
    scanf("%d", &num); // Initial read

    while (num > 0) { // Loop as long as the number is positive
        sum += num;    // Add to sum
        printf("Enter positive numbers (enter 0 or negative to stop):\\n");
        scanf("%d", &num); // Read next number
    }

    printf("Sum: %d\\n", sum);
    return 0;
}
\`\`\`

## Infinite Loops

If the condition in a 'while' loop never becomes false, the loop will run indefinitely, leading to an **infinite loop**. This often causes your program to freeze or consume excessive resources. Ensure there's always a mechanism inside the loop body to change the condition.

\`\`\`c
#include <stdio.h>

int main() {
    int counter = 0;
    while (counter < 5) {
        printf("This loop will run forever because 'counter' never changes!\\n");
        // MISSING: counter++; // If this line is uncommented, it becomes a finite loop.
    }
    // This part of the code will never be reached in an infinite loop.
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always ensure that the condition of a 'while' loop will eventually become false. Forgetting to update a variable involved in the condition is a common source of infinite loops.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The 'while' loop is ideal when you don't know in advance how many times you need to loop, but rather want to loop until a specific condition is met.
    </div>
</div>
`;


export default function CWhileLoopPage() {

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
          prevLesson="c-switch"
          nextLesson="c-for-loop"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
