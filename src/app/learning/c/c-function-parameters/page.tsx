// src/app/learning/c/c-function-parameters/page.tsx
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
# C Function Parameters

Functions often need to receive data from the calling part of the program to perform their task. This data is passed through **parameters** (also known as formal parameters or arguments). Parameters act as placeholders inside the function for the values that will be passed into it when the function is called.

## Passing Arguments

In C, arguments are primarily passed to functions in two ways:

1.  **Pass by Value (Call by Value)**: This is the default way to pass arguments. A copy of the actual value of the argument is passed to the function. Any modifications made to the parameter inside the function do not affect the original variable in the calling function.
2.  **Pass by Reference (Call by Reference)**: The memory address of the variable is passed to the function using pointers. This allows the function to directly access and modify the original variable's value.

## 1. Pass by Value (Default)

When you pass arguments by value, a local copy of the argument's value is created within the function's scope.

**Example:**

\`\`\`c
#include <stdio.h>

// Function that takes an integer by value
void increment(int num) {
    printf("Inside function: Value of num before increment: %d\\n", num);
    num++; // Increment the LOCAL copy of num
    printf("Inside function: Value of num after increment: %d\\n", num);
}

int main() {
    int myValue = 10;
    printf("Outside function: Original myValue: %d\\n", myValue);

    increment(myValue); // Pass the value of myValue

    printf("Outside function: myValue after function call: %d\\n", myValue);
    // myValue is still 10, because 'increment' worked on a copy.
    return 0;
}
\`\`\`

**Output:**

\`\`\`
Outside function: Original myValue: 10
Inside function: Value of num before increment: 10
Inside function: Value of num after increment: 11
Outside function: myValue after function call: 10
\`\`\`

**When to use Pass by Value:**
- When the function only needs to read the value of the variable.
- When you want to protect the original variable from being modified by the function.

## 2. Pass by Reference (Using Pointers)

To allow a function to modify the original variable, you need to pass its memory address (a pointer) to the function. Inside the function, you use the dereference operator ('*') to access and modify the value at that address.

**Example:**

\`\`\`c
#include <stdio.h>

// Function that takes a pointer to an integer (address)
void incrementByReference(int *numPtr) { // numPtr is a pointer to an int
    printf("Inside function: Value at address %p before increment: %d\\n", numPtr, *numPtr);
    (*numPtr)++; // Increment the VALUE at the address pointed to by numPtr
    printf("Inside function: Value at address %p after increment: %d\\n", numPtr, *numPtr);
}

int main() {
    int myValue = 10;
    printf("Outside function: Original myValue: %d\\n", myValue);
    printf("Outside function: Address of myValue: %p\\n", &myValue);

    incrementByReference(&myValue); // Pass the ADDRESS of myValue

    printf("Outside function: myValue after function call: %d\\n", myValue);
    // myValue is now 11, because 'incrementByReference' modified the original.
    return 0;
}
\`\`\`

**Output (addresses will vary):**

\`\`\`
Outside function: Original myValue: 10
Outside function: Address of myValue: 0x7ffee5a8e0dc
Inside function: Value at address 0x7ffee5a8e0dc before increment: 10
Inside function: Value at address 0x7ffee5a8e0dc after increment: 11
Outside function: myValue after function call: 11
\`\`\`

**When to use Pass by Reference:**
- When the function needs to modify the original variable in the calling function.
- When passing large data structures (like arrays or structs) to avoid copying them, which can be inefficient.

## Parameters for Arrays

When you pass an array to a function, it is always passed by reference (more accurately, the base address of the array is passed). The function receives a pointer to the first element of the array.

\`\`\`c
#include <stdio.h>

// Function to print array elements
void printArray(int arr[], int size) { // Can also be written as 'int *arr'
    printf("Elements in function: ");
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    // You can modify array elements inside this function, and it will affect the original.
    arr[0] = 99; // Modifies the original array
}

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int n = sizeof(numbers) / sizeof(numbers[0]);

    printf("Original array in main: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n");

    printArray(numbers, n); // Pass the array (its base address) and its size

    printf("Array in main after function call: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n"); // Output: 99 20 30 40 50
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Understanding pass by value and pass by reference is crucial for controlling how data is shared and modified between different parts of your C program. Choose the method that aligns with whether your function needs to work on a copy or the original data.
    </div>
</div>
`;


export default function CFunctionParametersPage({ }: { params: { courseId: string; lessonId: string } }) {

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
          prevLesson="c-functions"
          nextLesson="c-scope"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
