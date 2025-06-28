/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-booleans/page.tsx
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
# C Booleans

In C, there isn't a built-in 'boolean' data type like in many other programming languages (e.g., 'true'/'false' keywords). Instead, C represents boolean (truth) values using integers:

-   **Zero (0)** is interpreted as **false**.
-   **Any non-zero value** (typically 1, but could be any other non-zero integer) is interpreted as **true**.

Since C99, a standard header '\<stdbool.h\>' was introduced, which defines a 'bool' type and 'true'/'false' macros for convenience, making C code more readable and similar to other languages.

## Using Integers as Booleans

Without '\<stdbool.h\>', you typically use 'int' variables to store boolean states.

\`\`\`c
#include \<stdio.h\>

int main() {
    int isSunny = 1;    // Represents true
    int isRaining = 0; // Represents false

    if (isSunny) { // Condition is true because isSunny is non-zero
        printf("It's sunny today!\\n");
    }

    if (isRaining) { // Condition is false because isRaining is zero
        printf("It's raining today.\\n");
    } else {
        printf("It's not raining today.\\n");
    }

    int temperature = 25;
    int isHot = (temperature > 30); // 0 (false) because 25 is not > 30
    printf("Is it hot? %d\\n", isHot); // Output: 0

    return 0;
}
\`\`\`

## Using '\<stdbool.h\>' for Booleans

Including the '\<stdbool.h\>' header allows you to use the 'bool' data type and the 'true'/'false' keywords, which are essentially macros that map to 'int' and 1/0 internally. This makes your code more explicit and easier to read.

\`\`\`c
#include <stdio.h>
#include \<stdbool.h\> // Include this header to use 'bool', 'true', 'false'

int main() {
    bool isLoggedIn = true;   // isLoggedIn will be stored as 1
    bool hasPermission = false; // hasPermission will be stored as 0

    printf("Is logged in? %d\\n", isLoggedIn);     // Output: 1
    printf("Has permission? %d\\n", hasPermission); // Output: 0

    if (isLoggedIn && !hasPermission) {
        printf("Logged in but no permission.\\n");
    }

    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While C internally uses integers for boolean logic, using the '&ltstdbool.h&gt' header and the 'bool', 'true', 'false' keywords is highly recommended for modern C programming. It significantly improves code readability and maintainability by making the intent clearer.
    </div>
</div>
`;


export default function CBooleansPage() {

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
          prevLesson="c-operators"
          nextLesson="c-if-else"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
