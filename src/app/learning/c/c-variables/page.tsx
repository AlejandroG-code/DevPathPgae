// src/app/learning/c/c-variables/page.tsx
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
# C Variables

Variables are containers for storing data values. In C, before you can use a variable, you must **declare** it to tell the compiler its name and the type of data it will store. C is a **statically typed** language, meaning a variable's type cannot change after it's declared.

## Declaring Variables

To declare a variable, you specify the data type, followed by the variable name, and end with a semicolon.

**Syntax:**

\`\`\`c
dataType variableName;
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

int myNumber;     // Declares an integer variable
char myLetter;    // Declares a character variable
float myFloatNum; // Declares a floating-point variable
double myDoubleNum; // Declares a double-precision floating-point variable
\`\`\`

## Assigning Values to Variables

You can assign a value to a variable using the assignment operator ('=').

\`\`\`c
#include <stdio.h>

int main() {
    int myNumber;     // Declared
    myNumber = 15;    // Assigned a value
    printf("%d\\n", myNumber); // Output: 15
    return 0;
}
\`\`\`

You can also assign a value at the time of declaration:

\`\`\`c
#include <stdio.h>

int main() {
    int myNumber = 15;
    printf("%d\\n", myNumber); // Output: 15

    char myLetter = 'D';
    printf("%c\\n", myLetter); // Output: D

    float myFloatNum = 5.99f; // 'f' suffix for float literal
    printf("%.2f\\n", myFloatNum); // .2f for 2 decimal places

    return 0;
}
\`\`\`

## Changing Variable Values

Since variables are "variable," you can change their values after they are declared and initialized.

\`\`\`c
#include <stdio.h>

int main() {
    int myNum = 10;
    printf("Initial value: %d\\n", myNum); // Output: 10

    myNum = 20; // Change the value
    printf("New value: %d\\n", myNum);    // Output: 20
    return 0;
}
\`\`\`

## Copying Variable Values

You can copy the value of one variable to another. Note that this is a copy by value: the 'copy' variable gets its own memory space with the 'original''s value, but they are not linked afterwards.

\`\`\`c
#include <stdio.h>

int main() {
    int original = 100;
    int copy = original; // 'copy' now holds the value of 'original'

    printf("Original: %d\\n", original); // Output: 100
    printf("Copy: %d\\n", copy);       // Output: 100

    copy = 200; // Changing 'copy' does not affect 'original'
    printf("Original after copy change: %d\\n", original); // Output: 100
    printf("Copy after change: %d\\n", copy);           // Output: 200
    return 0;
}
\`\`\`

## Variable Naming Rules

<div class="bg-gradient-to-r from-gray-800 to-gray-700 border border-vibrant-teal/50 rounded-lg shadow-xl p-6 mb-6">
    <h3 class="text-2xl font-bold text-vibrant-teal mb-3">Key Rules</h3>
    <ul class="list-disc list-inside ml-4 text-gray-300 space-y-1">
        <li>Variable names must begin with an alphabet letter (A-Z, a-z) or an underscore ('_'). They cannot start with a number.</li>
        <li>Variables are case-sensitive. ('myVar' and 'myvar' are different).</li>
        <li>They cannot contain spaces or special symbols like '!', '@', '#', '$', '%', etc., except for the underscore.</li>
        <li>They cannot be a reserved C keyword (e.g., 'int', 'return').</li>
        <li>It is recommended to use descriptive names to improve code readability (e.g., 'numberOfStudents' instead of 'n').</li>
    </ul>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-gray-200 leading-relaxed">
        Variables are the fundamental building blocks for storing and manipulating data in any C program. Good variable management is the foundation for writing effective code.
    </div>
</div>
`;


export default function CVariablesPage() {

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
          prevLesson="c-comments"
          nextLesson="c-data-types"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
