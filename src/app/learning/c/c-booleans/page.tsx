/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-booleans/page.tsx
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
## C Booleans

In C, there isn't a built-in boolean data type like in some other languages (e.g., C++, Java, Python). Instead, C uses integers to represent Boolean values:

* **0 (zero)** is considered **false**.
* **Any non-zero value** (typically 1) is considered **true**.

### Using Integers as Booleans

\`\`\`c
#include <stdio.h>

int main() {
    int isProgrammingFun = 1; // True (non-zero)
    int isWaterCold = 0;      // False (zero)

    printf("Is programming fun? %d\\n", isProgrammingFun); // Output: 1
    printf("Is water cold? %d\\n", isWaterCold);         // Output: 0

    // Using Booleans in an if statement
    if (isProgrammingFun) {
        printf("Yes, it is fun!\\n");
    }

    if (isWaterCold) {
        printf("The water is cold.\\n"); // This will not be printed
    } else {
        printf("The water is not cold.\\n");
    }

    return 0;
}
\`\`\`

### The '<stdbool.h>' Header

Since C99, a standard header file called <stdbool.h> was introduced, which defines a bool macro and the true and false macros. Using this header makes your code more readable and explicitly indicates Boolean intent.

\`\`\`c
#include <stdio.h>
#include <stdbool.h> // Include for bool, true, false

int main() {
    bool isCInteresting = true; // Now you can use 'bool' and 'true'
    bool hasFinished = false;    // And 'false'

    printf("Is C interesting? %d\\n", isCInteresting); // Output: 1
    printf("Has finished? %d\\n", hasFinished);         // Output: 0

    if (isCInteresting) {
        printf("Keep learning!\\n");
    }

    return 0;
}
\`\`\`

Even when using <stdbool.h>, the bool type is essentially an integer internally (often a _Bool type) and true evaluates to 1 and false to 0. When printed using %d, they will still show 1 or 0.

Booleans are fundamental for controlling the flow of your program, especially in conditional statements and loops.
`;


export default function CBooleansPage() {
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
