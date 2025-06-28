// src/app/learning/c/c-for-loop/page.tsx
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
# C Loops: 'for' Loop

The 'for' loop is a control flow statement that allows code to be executed repeatedly. It is typically used when you know in advance how many times you want to iterate or when you need a simple counter-controlled loop.

## The 'for' Loop

The 'for' loop has three main parts: initialization, condition, and update, all specified in a single line within the parentheses.

**Syntax:**

\`\`\`c
for (initialization; condition; update) {
    // Code to be executed repeatedly
}
\`\`\`

-   **initialization**: Executed once at the beginning of the loop. It typically initializes a loop counter variable.
-   **condition**: Evaluated before each iteration. If true (non-zero), the loop body executes. If false (zero), the loop terminates.
-   **update**: Executed after each iteration of the loop body. It typically updates the loop counter variable (e.g., incrementing or decrementing).
-   '{}': Curly braces define the loop body. Optional for a single statement, but recommended.

## Flowchart of 'for' Loop

\`\`\`mermaid
graph TD
    A[Start] --> B(Initialization);
    B --> C{Condition?};
    C -- True --> D[Loop Body];
    D --> E(Update);
    E --> C;
    C -- False --> F[End];
\`\`\`

**Example 1: Counting from 1 to 5**

\`\`\`c
#include <stdio.h>

int main() {
    int i; // Declare the loop variable

    // i starts at 1
    // Loop as long as i is <= 5
    // i increments by 1 after each iteration
    for (i = 1; i <= 5; i++) {
        printf("%d\\n", i);
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

**Example 2: Counting down**

\`\`\`c
#include <stdio.h>

int main() {
    int count;
    for (count = 10; count > 0; count--) {
        printf("Count: %d\\n", count);
    }
    printf("Blast off!\\n");
    return 0;
}
\`\`\`

**Example 3: Sum of numbers using a for loop**

\`\`\`c
#include <stdio.h>

int main() {
    int sum = 0;
    int i;
    for (i = 1; i <= 10; i++) {
        sum += i; // sum = sum + i;
    }
    printf("Sum of numbers from 1 to 10 is: %d\\n", sum); // Output: 55
    return 0;
}
\`\`\`

## Optional Parts of the 'for' Loop

Any of the three parts (initialization, condition, update) can be omitted, but the semicolons must remain.

-   **Omitting initialization:** The variable must be initialized before the loop.
    \`\`\`c
    int i = 1;
    for (; i <= 5; i++) { // No initialization part here
        printf("%d\\n", i);
    }
    \`\`\`

-   **Omitting condition:** This creates an infinite loop unless a 'break' statement is used inside the loop body.
    \`\`\`c
    int i = 1;
    for (; ; i++) { // Infinite loop
        printf("%d\\n", i);
        if (i == 5) {
            break; // Exit the loop
        }
    }
    \`\`\`

-   **Omitting update:** The update must be done inside the loop body.
    \`\`\`c
    int i = 1;
    for ( ; i <= 5; ) {
        printf("%d\\n", i);
        i++; // Update done here
    }
    \`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The 'for' loop is especially useful when you know the number of iterations in advance, or when dealing with iterative tasks like traversing arrays. It compacts the loop control elements into a single line, improving readability for such cases.
    </div>
</div>
`;


export default function CForLoopPage({ }: { params: { courseId: string; lessonId: string } }) {

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
          prevLesson="c-while-loop"
          nextLesson="c-break-continue"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
