/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-if-else/page.tsx
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
# C Conditional Statements: 'if...else' and 'if...else if...else'

Building upon the basic 'if' statement, C provides 'else' and 'else if' clauses to handle scenarios where different blocks of code should be executed when a condition is false, or when multiple conditions need to be checked in sequence.

## The 'if...else' Statement

The 'if...else' statement allows you to execute one block of code if the condition is true, and a different block of code if the condition is false.

**Syntax:**

\`\`\`c
if (condition) {
    // Code to be executed if condition is true
} else {
    // Code to be executed if condition is false
}
\`\`\`

## Flowchart of 'if...else' Statement

\`\`\`mermaid
flowchart TD;
    A[Start] --> B{Condition?};
    B -- True --> C[Execute If-Block];
    B -- False --> D[Execute Else-Block];
    C --> E[End];
    D --> E;
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    int time = 20;

    if (time < 18) {
        printf("Good day.\\n");
    } else {
        printf("Good evening.\\n");
    }
    // Output: Good evening.
    return 0;
}
\`\`\`

## The 'if...else if...else' Statement

This structure is used when you have multiple conditions to check. The conditions are evaluated in order. As soon as one condition evaluates to true, its corresponding code block is executed, and the rest of the 'else if' and 'else' ladder is skipped. If none of the 'if' or 'else if' conditions are true, the 'else' block (if present) is executed.

**Syntax:**

\`\`\`c
if (condition1) {
    // Code to be executed if condition1 is true
} else if (condition2) {
    // Code to be executed if condition1 is false AND condition2 is true
} else if (condition3) {
    // Code to be executed if condition1 and condition2 are false AND condition3 is true
} else {
    // Code to be executed if all preceding conditions are false
}
'
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    int score = 85;
    char grade;

    if (score >= 90) {
        grade = 'A';
    } else if (score >= 80) { // Only checked if score < 90
        grade = 'B';
    } else if (score >= 70) { // Only checked if score < 80
        grade = 'C';
    } else { // Only checked if score < 70
        grade = 'F';
    }

    printf("Your grade is: %c\\n", grade); // Output: Your grade is: B
    return 0;
}
\`\`\`

## Nested 'if' Statements

You can also nest 'if' or 'if...else' statements inside other 'if' or 'else' blocks.

\`\`\`c
#include <stdio.h>

int main() {
    int age = 20;
    int hasLicense = 1; // 1 for true, 0 for false

    if (age >= 18) {
        printf("You are old enough to drive.\\n");
        if (hasLicense) {
            printf("You have a license, so you can drive!\\n");
        } else {
            printf("But you don't have a license yet.\\n");
        }
    } else {
        printf("You are not old enough to drive.\\n");
    }
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Conditional statements are essential for controlling the flow of your program, allowing it to respond differently based on varying inputs or states.
    </div>
</div>
`;


export default function CIfElsePage() {

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
          prevLesson="c-booleans"
          nextLesson="c-switch"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
