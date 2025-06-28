/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-constants/page.tsx
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
# C Constants

Constants are fixed values that do not change during the execution of a program. They are useful for values that are known at compile time and remain constant throughout the program, such as the value of PI or the maximum size of a buffer.

In C, there are two main ways to define constants:

1.  Using the '#define' preprocessor directive.
2.  Using the 'const' keyword.

## 1. Using '#define'

The '#define' preprocessor directive is used to define **symbolic constants** or **macros**. When the program is compiled, the preprocessor replaces all occurrences of the constant's identifier with its defined value, *before* the compiler sees the code. It's a simple text substitution.

**Syntax:**

\`\`\`c
#define IDENTIFIER replacement_value
\`\`\`

\`\`\`c
#include <stdio.h>

#define PI_VALUE 3.14159 // Defines PI_VALUE as a numeric constant
#define MAX_BUFFER_SIZE 1024 // Defines a maximum buffer size

int main() {
    printf("Value of PI: %f\\n", PI_VALUE);
    char buffer[MAX_BUFFER_SIZE]; // MAX_BUFFER_SIZE will be replaced by 1024

    printf("Buffer size: %lu bytes\\n", sizeof(buffer));

    // PI_VALUE = 3.0; // COMPILE-TIME ERROR: You cannot assign a value, it's a text substitution
    // This would expand to "3.14159 = 3.0;", which is not valid C code.

    return 0;
}
\`\`\`

### Characteristics of '#define' Constants

<ul class="list-disc list-inside ml-4 text-base md:text-lg text-gray-300 space-y-1">
    <li>They are processed by the **preprocessor**, not the compiler.</li>
    <li>No memory is allocated for them; they are direct text substitutions.</li>
    <li>No semicolon is needed at the end of '#define' statements.</li>
    <li>By convention, '#define' constant names are written in 'UPPERCASE'.</li>
    <li>They do not have a "type" in the sense of C data types, which can sometimes lead to type safety issues.</li>
</ul>

## 2. Using the 'const' Keyword

The 'const' keyword is used to declare a variable as constant, meaning its value **cannot be changed after initialization**. Unlike '#define', 'const' variables are handled by the compiler, which provides **type safety** and better scope management.

\`\`\`c
#include <stdio.h>

int main() {
    const float EARTH_RADIUS_KM = 6371.0f; // Defines a constant float
    const int MAX_ATTEMPTS = 3;      // Defines a constant int

    printf("Earth Radius: %.1f km\\n", EARTH_RADIUS_KM);
    printf("Maximum attempts: %d\\n", MAX_ATTEMPTS);

    // EARTH_RADIUS_KM = 6378.0f; // COMPILE-TIME ERROR: Assignment of read-only variable
    // MAX_ATTEMPTS = 5;  // COMPILE-TIME ERROR: Assignment of read-only variable

    return 0;
}
\`\`\`

### Characteristics of 'const' Constants

<ul class="list-disc list-inside ml-4 text-base md:text-lg text-gray-300 space-y-1">
    <li>They are handled by the **compiler**, not the preprocessor.</li>
    <li>Memory is allocated for them, just like any other variable, but the memory is read-only.</li>
    <li>They must be initialized at the time of their declaration.</li>
    <li>They provide **type safety**, meaning the compiler can check if they are used correctly with other data types.</li>
    <li>They can be declared inside functions (local scope) or globally, respecting scope rules.</li>
</ul>

## When to Use Which?

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        <ul class="list-disc list-inside ml-4 text-gray-200 space-y-1">
            <li>Use <strong>'#define'</strong> for simple constant values that are text substitutions, especially when you don't want them to occupy memory or for preprocessor macros.</li>
            <li>Use <strong>'const'</strong> for constants that have a specific data type and require type checking. This is the <strong>preferred</strong> way in modern C programming due to its safety and better error handling by the compiler.</li>
        </ul>
    </div>
</div>
`;


export default function CConstantsPage() {

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
          prevLesson="c-data-types"
          nextLesson="c-operators"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
