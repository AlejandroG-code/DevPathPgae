/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-if-else/page.tsx
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
## C If...Else

Conditional statements are fundamental to programming, allowing your program to make decisions and execute different blocks of code based on whether a condition is true or false. In C, the primary conditional statements are if, else if, and else.

### The if Statement

The if statement is used to execute a block of code only if a specified condition is true.

\`\`\`c
#include <stdio.h>

int main() {
    int time = 20;

    if (time < 18) { // Condition: is time less than 18?
        printf("Good day.\\n"); // This code runs only if the condition is true
    }
    // Output: (nothing, because 20 is not < 18)

    int temperature = 25;
    if (temperature > 20) {
        printf("It's a warm day!\\n"); // Output: It's a warm day!
    }
    return 0;
}
\`\`\`

### The else Statement

The else statement is used to execute a block of code if the same condition in the if statement is false.

\`\`\`c
#include <stdio.h>

int main() {
    int time = 20;

    if (time < 18) {
        printf("Good day.\\n");
    } else { // This block runs if the condition (time < 18) is false
        printf("Good evening.\\n");
    }
    // Output: Good evening.

    return 0;
}
\`\`\`

### The else if Statement

The else if statement allows you to test a new condition if the first if condition is false. You can have multiple else if statements.

\`\`\`c
#include <stdio.h>

int main() {
    int time = 22;

    if (time < 10) {
        printf("Good morning.\\n");
    } else if (time < 20) { // New condition tested if first 'if' is false
        printf("Good day.\\n");
    } else { // This block runs if both previous conditions are false
        printf("Good evening.\\n");
    }
    // Output: Good evening.

    return 0;
}
\`\`\`

### Short Hand If...Else (Ternary Operator)

C also has a shorthand if else, known as the **ternary operator**. It can be used to replace simple if else statements.

\`\`\`c
condition ? expressionIfTrue : expressionIfFalse;
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    int time = 20;
    // If time < 18 is true, result is "Good day.", else "Good evening."
    char* result = (time < 18) ? "Good day." : "Good evening.";
    printf("%s\\n", result); // Output: Good evening.

    return 0;
}
\`\`\`

Using conditional statements effectively is crucial for creating programs that can respond dynamically to different inputs and scenarios.
`;

export default function CIfElsePage({ params }: LessonPageProps) {
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
