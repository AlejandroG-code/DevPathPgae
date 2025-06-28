// src/app/learning/c/c-memory-address/page.tsx
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
# C Memory Address

In C, variables are stored in memory, and each memory location has a unique address. Understanding memory addresses is crucial for grasping how C works at a lower level and is fundamental to using pointers effectively.

## The Address-Of Operator ('&')

The address-of operator ('&') is a unary operator that returns the memory address of its operand. It is also known as the reference operator.

**Syntax:**

\`\`\`c
&variableName
\`\`\`

**Example: Getting the address of a variable**

\`\`\`c
#include <stdio.h>

int main() {
    int myAge = 30;
    float mySalary = 50000.0f;
    char myGrade = 'A';

    printf("Value of myAge: %d\\n", myAge);
    printf("Memory address of myAge: %p\\n", &myAge); // '%p' is the format specifier for pointers/addresses

    printf("Value of mySalary: %.2f\\n", mySalary);
    printf("Memory address of mySalary: %p\\n", &mySalary);

    printf("Value of myGrade: %c\\n", myGrade);
    printf("Memory address of myGrade: %p\\n", &myGrade);

    return 0;
}
\`\`\`

**Possible Output (addresses will vary):**

\`\`\`
Value of myAge: 30
Memory address of myAge: 0x7ffee5a8e0dc
Value of mySalary: 50000.00
Memory address of mySalary: 0x7ffee5a8e0d8
Value of myGrade: A
Memory address of myGrade: 0x7ffee5a8e0db
\`\`\`

## Why are Memory Addresses Important?

1.  **Pointers:** Memory addresses are what pointers store. A pointer is a variable that stores the memory address of another variable. This is a core concept in C and allows for dynamic memory management, efficient array traversal, and passing arguments by reference to functions.
2.  **Pass by Reference:** When you pass the address of a variable to a function, the function can directly modify the original variable, which is known as "pass by reference." This is a powerful feature for functions that need to return multiple values or modify large data structures without copying them.
3.  **Dynamic Memory Allocation:** Functions like 'malloc()', 'calloc()', and 'realloc()' return memory addresses (pointers) to newly allocated memory from the heap. Understanding addresses is fundamental to managing this memory.
4.  **Hardware Interaction:** In embedded systems programming, knowing memory addresses is critical for interacting directly with hardware registers and memory-mapped I/O.

## Memory Organization (Simplified)

When your C program runs, it typically uses different areas of memory:

-   **Stack:** Used for local variables, function parameters, and return addresses. Memory is allocated and deallocated automatically as functions are called and return.
-   **Heap (Dynamic Memory):** Used for dynamic memory allocation (e.g., using 'malloc()', 'calloc()'). Memory must be explicitly allocated and deallocated by the programmer.
-   **Static/Global Data Segment:** Stores global variables, static variables, and string literals. Memory is allocated once at program startup.
-   **Code (Text) Segment:** Stores the compiled machine code instructions of the program.

The memory addresses you see with the '&' operator will typically point to locations within the Stack or Global Data Segment, depending on where the variable is declared. Dynamic memory addresses will point to the Heap.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The concept of memory addresses is a foundational stepping stone to understanding pointers in C, which are one of the most powerful (and sometimes tricky) features of the language. Get comfortable with using the '&' operator to reveal where your data lives!
    </div>
</div>
`;


export default function CMemoryAddressPage({ }: { params: { courseId: string; lessonId: string } }) {

  useEffect(() => {
    // Load Prism CSS
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Prism core JS
    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      // Load C language component after core is loaded
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true;

      scriptCLang.onload = () => {
        // Highlight all code blocks after C language component is loaded
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptCLang);
    };
    document.body.appendChild(scriptCore);

    // Cleanup function
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const cLangScript = document.querySelector('script[src*="prism-c.min.js"]');
      if (cLangScript && document.body.contains(cLangScript)) {
        document.body.removeChild(cLangScript);
      }
    };
  }, [LESSON_CONTENT]); // Re-run effect if lesson content changes

  const components: Components = {
    // Custom renderers for markdown elements to apply Tailwind CSS
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
          prevLesson="c-user-input"
          nextLesson="c-pointers"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
