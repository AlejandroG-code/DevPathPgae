/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-break-continue/page.tsx
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
## C Break and Continue

The break and continue statements are used to alter the flow of loops (for, while, do...while). They provide powerful mechanisms to skip iterations or terminate loops prematurely based on specific conditions.

### The break Statement

The break statement is used to **terminate the loop immediately** when it is encountered. Control of the program then jumps to the statement immediately following the loop.

\`\`\`c
#include <stdio.h>

int main() {
    int i;
    for (i = 0; i < 10; i++) {
        if (i == 5) { // When i is 5, the condition becomes true
            break;    // The loop terminates immediately
        }
        printf("%d\\n", i);
    }
    printf("Loop ended.\\n");
    // Output:
    // 0
    // 1
    // 2
    // 3
    // 4
    // Loop ended.
    return 0;
}
\`\`\`

In the example above, the loop is designed to run 10 times, but it breaks when 'i' reaches 5.

### The continue Statement

The continue statement is used to **skip the rest of the current iteration** of the loop and immediately jump to the next iteration. It does not terminate the loop entirely.

\`\`\`c
#include <stdio.h>

int main() {
    int i;
    for (i = 0; i < 10; i++) {
        if (i % 2 == 0) { // If i is even
            continue;     // Skip the rest of this iteration (printf)
        }
        printf("%d\\n", i); // This line is skipped for even numbers
    }
    printf("Loop ended.\\n");
    // Output:
    // 1
    // 3
    // 5
    // 7
    // 9
    // Loop ended.
    return 0;
}
\`\`\`

In this example, when 'i' is an even number, the 'continue' statement is executed, and the 'printf()' call for that iteration is skipped. The loop then proceeds to the next iteration.

### break and continue in while loops

Both 'break' and 'continue' can be used effectively in 'while' loops as well:

\`\`\`c
#include <stdio.h>

int main() {
    // Example with break in while loop
    int count = 0;
    while (1) { // Infinite loop
        printf("Counting: %d\\n", count);
        count++;
        if (count == 3) {
            break; // Exit the loop when count is 3
        }
    }
    printf("Break loop finished.\\n");

    // Example with continue in while loop
    int num = 0;
    while (num < 5) {
        num++; // Increment first
        if (num == 3) {
            continue; // Skip printing for num == 3
        }
        printf("Number: %d\\n", num);
    }
    printf("Continue loop finished.\\n");

    return 0;
}
\`\`\`

**Output:**

\`\`\`
Counting: 0
Counting: 1
Counting: 2
Break loop finished.
Number: 1
Number: 2
Number: 4
Number: 5
Continue loop finished.
\`\`\`

break and continue provide fine-grained control over loop execution, allowing you to handle specific conditions that require exiting or skipping iterations.
`;

export default function CBreakContinuePage() {
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
