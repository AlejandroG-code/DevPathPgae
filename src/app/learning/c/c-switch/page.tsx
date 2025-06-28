// src/app/learning/c/c-switch/page.tsx
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
# C Conditional Statements: 'switch'

The 'switch' statement is a multi-way branch statement that provides a more efficient and readable alternative to a long 'if-else if-else' ladder when you need to execute different code blocks based on the value of a single variable or expression.

## The 'switch' Statement

The 'switch' statement evaluates an expression (which must evaluate to an integer type: 'int', 'char', 'short', 'long', 'enum'), and then executes the block of code associated with the matching 'case' label.

**Syntax:**

\`\`\`c
switch (expression) {
    case value1:
        // Code to be executed if expression == value1
        break; // Optional
    case value2:
        // Code to be executed if expression == value2
        break; // Optional
    // ...
    default:
        // Code to be executed if expression doesn't match any case
        break; // Optional
}
\`\`\`

-   'expression': The integer expression or variable whose value will be compared.
-   'case valueN': A 'case' label specifies a constant value to be compared with the 'expression'. 'valueN' must be a constant (literal, '#define' constant, or 'enum' member).
-   'break;': The 'break' statement is crucial. It terminates the 'switch' statement, causing execution to jump to the statement immediately following the 'switch' block. If 'break' is omitted, execution "falls through" to the next 'case' block, executing its code as well.
-   'default:': The 'default' label is optional. Its code block is executed if the 'expression' does not match any of the 'case' values. It's similar to the final 'else' in an 'if-else if-else' chain.

## Flowchart of 'switch' Statement

\`\`\`mermaid
graph TD
    A[Start] --> B{Expression Value?};
    B -- Case 1 --> C[Execute Block 1];
    B -- Case 2 --> D[Execute Block 2];
    B -- Default --> E[Execute Default Block];
    C -- Break --> F[End];
    D -- Break --> F;
    E --> F;
    C -- No Break --> D;
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    int day = 4; // Represents Thursday

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
            printf("Thursday\\n");
            break;
        case 5:
            printf("Friday\\n");
            break;
        case 6:
            printf("Saturday\\n");
            break;
        case 7:
            printf("Sunday\\n");
            break;
        default:
            printf("Invalid day number.\\n");
            break;
    }
    // Output: Thursday
    return 0;
}
\`\`\`

## The Importance of 'break'

Consider what happens without 'break' statements (fall-through):

\`\`\`c
#include <stdio.h>

int main() {
    char grade = 'B';

    switch (grade) {
        case 'A':
            printf("Excellent!\\n");
        case 'B':
            printf("Very Good!\\n"); // This will execute
        case 'C':
            printf("Good!\\n");      // This will also execute (fall-through)
            break; // Stops here
        default:
            printf("Needs Improvement.\\n");
    }
    // Output:
    // Very Good!
    // Good!
    return 0;
}
\`\`\`
In this example, if 'grade' is 'B', both "Very Good!" and "Good!" will be printed because execution falls through from 'case 'B':' to 'case 'C':' until a 'break' is encountered. This behavior can be useful in specific scenarios (e.g., handling multiple cases with the same code), but it's often a source of bugs if not intentional.

## Multiple Case Labels for Same Code

You can group multiple case labels if they should execute the same block of code.

\`\`\`c
#include <stdio.h>

int main() {
    int month = 2; // February

    switch (month) {
        case 1: // January
        case 3: // March
        case 5: // May
        case 7: // July
        case 8: // August
        case 10: // October
        case 12: // December
            printf("This month has 31 days.\\n");
            break;
        case 4: // April
        case 6: // June
        case 9: // September
        case 11: // November
            printf("This month has 30 days.\\n");
            break;
        case 2: // February
            printf("This month has 28 or 29 days.\\n");
            break;
        default:
            printf("Invalid month.\\n");
            break;
    }
    // Output: This month has 28 or 29 days.
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The 'switch' statement is a powerful construct for handling multiple choices cleanly, provided the decision is based on a single integer-like expression. Always remember to use 'break' unless intentional fall-through is desired.
    </div>
</div>
`;


export default function CSwitchPage() {

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
          prevLesson="c-if-else"
          nextLesson="c-while-loop"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
