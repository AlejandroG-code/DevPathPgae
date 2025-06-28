// src/app/learning/c/c-pointers/page.tsx
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
# C Pointers

Pointers are one of the most powerful and unique features of C programming. A pointer is a variable that stores the **memory address** of another variable. By storing memory addresses, pointers allow for direct memory manipulation, which is crucial for dynamic memory allocation, efficient array operations, and passing arguments by reference to functions.

## What is a Pointer?

Think of a variable as a box that holds a value. A pointer is like a small note that says "this value is in box number X". Instead of holding the value itself, it holds the address of the box where the value is stored.

## Declaring Pointers

To declare a pointer variable, you use an asterisk ('*') between the data type and the pointer variable name.

**Syntax:**

\`\`\`c
dataType *pointerName;
\`\`\`

-   'dataType': The data type of the variable that the pointer will point to. This tells the compiler what kind of data is expected at the memory address stored by the pointer.
-   '*': The dereference operator (when used in declaration, it declares a pointer).
-   'pointerName': The name of the pointer variable.

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    int *ptr;    // Declares a pointer to an integer
    char *charPtr; // Declares a pointer to a character
    float *floatPtr; // Declares a pointer to a float
    return 0;
}
\`\`\`

## Assigning Addresses to Pointers

To make a pointer point to a specific variable, you use the **address-of operator** ('&') (which we learned in the previous lesson) to get the memory address of that variable, and then assign it to the pointer.

\`\`\`c
#include <stdio.h>

int main() {
    int myAge = 30;    // An integer variable
    int *ptrAge;      // A pointer to an integer

    ptrAge = &myAge; // Assign the memory address of myAge to ptrAge

    printf("Value of myAge: %d\\n", myAge);           // Output: 30
    printf("Address of myAge: %p\\n", &myAge);       // Output: (e.g.) 0x7ffee5a8e0dc
    printf("Value of ptrAge (address it stores): %p\\n", ptrAge); // Output: (e.g.) 0x7ffee5a8e0dc
    return 0;
}
\`\`\`

## Dereferencing Pointers ('*')

Once a pointer holds a memory address, you can use the **dereference operator** ('*') (when used with an initialized pointer, it accesses the value at the address) to access or modify the value stored at that memory address.

**Syntax:**

\`\`\`c
*pointerName // Accesses the value pointed to by pointerName
\`\`\`

**Example: Accessing and modifying value via pointer**

\`\`\`c
#include <stdio.h>

int main() {
    int myNum = 25;    // Variable
    int *ptr = &myNum; // Pointer stores address of myNum

    printf("Value of myNum: %d\\n", myNum);   // Output: 25
    printf("Address stored in ptr: %p\\n", ptr); // Output: (e.g.) 0x7ffee5a8e0d4
    printf("Value pointed to by ptr: %d\\n", *ptr); // Dereference ptr to get the value (Output: 25)

    *ptr = 100; // Change the value at the address pointed to by ptr
                // This effectively changes myNum's value
    printf("New value of myNum: %d\\n", myNum); // Output: 100
    return 0;
}
\`\`\`

## Pointers and Arrays

In C, there's a strong relationship between pointers and arrays. An array's name often behaves like a pointer to its first element.

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[] = {10, 20, 30, 40, 50};

    // 'numbers' itself is a pointer to the first element (numbers[0])
    printf("Address of numbers[0]: %p\\n", &numbers[0]); // Output: (e.g.) 0x7ffee5a8e0a0
    printf("Value of numbers (as pointer): %p\\n", numbers); // Output: (e.g.) 0x7ffee5a8e0a0 (Same address!)

    // Accessing array elements using pointer arithmetic
    printf("Value of numbers[0] using pointer: %d\\n", *numbers);         // Output: 10
    printf("Value of numbers[1] using pointer: %d\\n", *(numbers + 1));     // Output: 20
    printf("Value of numbers[2] using pointer: %d\\n", *(numbers + 2));     // Output: 30

    // You can also declare a pointer and assign the array to it
    int *arrPtr = numbers;
    printf("Value of numbers[0] via arrPtr: %d\\n", *arrPtr);        // Output: 10
    printf("Value of numbers[1] via arrPtr: %d\\n", *(arrPtr + 1));    // Output: 20
    return 0;
}
\`\`\`

## Null Pointers

A null pointer is a pointer that points to no valid memory location. It's often used to indicate that a pointer variable doesn't point to anything yet, or as an error indicator. The 'NULL' macro (defined in '<stddef.h>' or '<stdio.h>' or '<stdlib.h>') represents a null pointer constant (typically 0).

\`\`\`c
#include <stdio.h>
#include <stddef.h> // For NULL

int main() {
    int *nullPtr = NULL; // Declare and initialize a null pointer

    if (nullPtr == NULL) {
        printf("The pointer is NULL (points to nothing).\\n");
    } else {
        printf("The pointer is not NULL.\\n");
    }

    // Accessing a NULL pointer leads to undefined behavior/segmentation fault
    // printf("%d", *nullPtr); // DANGER: Do NOT dereference a NULL pointer!
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Pointers are powerful but can be dangerous if not used correctly. Dereferencing a pointer that is uninitialized, points to freed memory, or points to an invalid address (like 'NULL') will result in **undefined behavior**, often leading to program crashes (segmentation faults). Always initialize your pointers and ensure they point to valid memory before dereferencing them.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Pointers are central to advanced C programming concepts. While they might seem complex at first, understanding how they store and manipulate memory addresses unlocks the full potential of C for tasks like dynamic data structures and low-level system interactions.
    </div>
</div>
`;


export default function CPointersPage({ }: { params: { courseId: string; lessonId: string } }) {

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
          prevLesson="c-memory-address"
          nextLesson="c-functions"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
