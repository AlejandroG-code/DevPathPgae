/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-for-loop/page.tsx
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
## C For Loop

The for loop is a versatile and commonly used control flow statement that provides a concise way to write loops that need to be executed a specific number of times. It's particularly useful when you know in advance how many times you want to iterate.

### Syntax

\`\`\`c
for (initialization; condition; increment/decrement) {
    // code to be executed in each iteration
}
\`\`\`

The for loop consists of three main parts, separated by semicolons:

1.  **Initialization:** Executed once at the beginning of the loop. It's typically used to declare and initialize a loop counter variable.
2.  **Condition:** Evaluated before each iteration. If the condition is true (non-zero), the loop body is executed. If false (zero), the loop terminates.
3.  **Increment/Decrement:** Executed after each iteration of the loop body. It's typically used to update the loop counter.

### Example: Counting Up to 5

\`\`\`c
#include <stdio.h>

int main() {
    // i starts at 0
    // Loop as long as i is less than 5
    // Increment i by 1 after each iteration
    for (int i = 0; i < 5; i++) {
        printf("%d\\n", i);
    }
    // Output:
    // 0
    // 1
    // 2
    // 3
    // 4

    return 0;
}
\`\`\`

### Example: Counting Down

You can also use a for loop to count down:

\`\`\`c
#include <stdio.h>

int main() {
    for (int i = 5; i > 0; i--) {
        printf("%d\\n", i);
    }
    // Output:
    // 5
    // 4
    // 3
    // 2
    // 1

    return 0;
}
\`\`\`

### Nested For Loops

You can place a for loop inside another for loop. This is known as a nested loop. The inner loop will execute completely for each iteration of the outer loop.

\`\`\`c
#include <stdio.h>

int main() {
    // Outer loop
    for (int i = 1; i <= 2; i++) { // Executes 2 times
        printf("Outer: %d\\n", i); 
        
        // Inner loop
        for (int j = 1; j <= 3; j++) { // Executes 3 times for each outer loop iteration
            printf("  Inner: %d\\n", j);
        }
    }
    // Output:
    // Outer: 1
    //   Inner: 1
    //   Inner: 2
    //   Inner: 3
    // Outer: 2
    //   Inner: 1
    //   Inner: 2
    //   Inner: 3

    return 0;
}
\`\`\`

Nested loops are commonly used when working with 2D arrays (matrices) or when you need to perform repetitive tasks on combinations of data.

The for loop is a powerful and efficient construct for iterative tasks in C programming, especially when the number of iterations is known.
`;

export default function CForLoopPage() {
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
