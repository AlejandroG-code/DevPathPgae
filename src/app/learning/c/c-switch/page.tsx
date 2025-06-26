/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-switch/page.tsx
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
## C Switch Statement

The switch statement is a control flow statement that allows you to choose one of many different code blocks to execute. It's an alternative to a long chain of if...else if...else statements when you have a single expression that needs to be compared against multiple constant values.

### Syntax

\`\`\`c
switch (expression) {
    case value1:
        // code to be executed if expression == value1
        break; // Stops the execution of the switch block
    case value2:
        // code to be executed if expression == value2
        break;
    case value3:
        // code to be executed if expression == value3
        break;
    default:
        // code to be executed if expression doesn't match any case
        // (optional)
        break; 
}
\`\`\`

* **expression:** An integer or character expression whose value is compared against the case values.
* **case valueX:** A constant value that the expression is compared against. If a match is found, the code block associated with that case is executed.
* **break:** The break keyword is crucial. It terminates the switch statement, preventing "fall-through" to the next case. If break is omitted, execution will continue to the next case block (and subsequent ones) until a break is encountered or the switch block ends.
* **default:** The default keyword is optional. It specifies a block of code to be executed if no case matches the expression's value. It acts like the final else in an if...else if...else chain.

### Example: Day of the Week

\`\`\`c
#include <stdio.h>

int main() {
    int day = 4; // Let's say 1=Monday, 2=Tuesday, ..., 7=Sunday

    switch (day) {
        case 1:
            printf("Monday\\n");
            break;
        case 2:
            printf("Tuesday\\n");
            break;
        case 3:
            printf("Wednesday\\n");
            break;
        case 4:
            printf("Thursday\\n"); // This case matches, "Thursday" is printed
            break;                 // The switch statement terminates here
        case 5:
            printf("Friday\\n");
            break;
        case 6:
            printf("Saturday\\n");
            break;
        case 7:
            printf("Sunday\\n");
            break;
        default: // If 'day' is not between 1 and 7
            printf("Invalid day!\\n");
            break;
    }

    return 0;
}
\`\`\`

**Output:**

\`\`\`
Thursday
\`\`\`

### The Importance of break

Consider what happens if you forget a break statement:

\`\`\`c
#include <stdio.h>

int main() {
    int level = 1;

    switch (level) {
        case 1:
            printf("You are at Level 1.\\n");
            // No break here! Execution falls through to case 2.
        case 2:
            printf("You are at Level 2.\\n");
            break; // This break stops execution here.
        case 3:
            printf("You are at Level 3.\\n");
            break;
        default:
            printf("Unknown Level.\\n");
            break;
    }
    // Output:
    // You are at Level 1.
    // You are at Level 2.

    return 0;
}
\`\`\`

This "fall-through" behavior can sometimes be used intentionally for specific logic, but it's often a source of bugs if not intended. Always remember break unless you have a clear reason to omit it.

The switch statement is a powerful tool for handling multiple choices in a clean and efficient way in your C programs.
`;

export default function CSwitchPage({ params }: LessonPageProps) {
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
