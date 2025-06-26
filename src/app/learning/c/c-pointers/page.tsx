/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-pointers/page.tsx
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
## C Pointers

Pointers are one of the most powerful and unique features of C. A **pointer** is a variable that stores the **memory address** of another variable. They are used for:

* Dynamic Memory Allocation (e.g., creating arrays or structures whose size is not known at compile time).
* Passing arguments to functions by reference.
* Working with data structures like linked lists, trees, etc.
* Direct memory access.

### Declaring Pointers

To declare a pointer, you use the asterisk ('*') operator:

\`\`\`c
type *pointerName;
\`\`\`

* 'type': The data type of the variable whose address the pointer will hold (e.g., 'int*' for a pointer to an integer).
* '*': The dereference operator (used in declaration to indicate it's a pointer).
* 'pointerName': The name of the pointer variable.

**Example:**

\`\`\`c
int *ptr;    // Declares a pointer to an integer
float *fPtr; // Declares a pointer to a float
char *cPtr;  // Declares a pointer to a character
\`\`\`

### Assigning Addresses to Pointers

To assign the memory address of a variable to a pointer, you use the **address-of operator** ('&'):

\`\`\`c
#include <stdio.h>

int main() {
    int myAge = 30; // An int variable
    int *ptrAge = &myAge; // A pointer variable that stores the memory address of myAge

    printf("Value of myAge: %d\\n", myAge);          // Output: 30
    printf("Memory address of myAge: %p\\n", &myAge); // Output: (some memory address)
    printf("Value of ptrAge (address it stores): %p\\n", ptrAge); // Output: (same memory address)
    
    return 0;
}
\`\`\`

### Dereferencing Pointers (The Dereference Operator '*')

The asterisk ('*') operator, when used *after* a pointer declaration, is called the **dereference operator**. It is used to access the value stored at the memory address that the pointer holds.

\`\`\`c
#include <stdio.h>

int main() {
    int myAge = 30;
    int *ptrAge = &myAge; // ptrAge stores the address of myAge

    printf("Value of myAge: %d\\n", myAge);           // Output: 30
    printf("Value at address stored by ptrAge: %d\\n", *ptrAge); // Dereference ptrAge, Output: 30
    
    // You can also change the value of the variable using the pointer
    *ptrAge = 40; // Change the value at the address ptrAge points to
    printf("New value of myAge: %d\\n", myAge); // Output: 40
    printf("New value at address stored by ptrAge: %d\\n", *ptrAge); // Output: 40
    
    return 0;
}
\`\`\`

### Pointers and Arrays

Array names in C often behave like pointers to their first element.

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[] = {10, 20, 30};
    int *ptrNumbers = numbers; // 'numbers' itself is treated as &numbers[0]

    printf("Value of first element using array name: %d\\n", numbers[0]); // Output: 10
    printf("Value of first element using pointer: %d\\n", *ptrNumbers); // Output: 10

    // Pointer arithmetic: Incrementing a pointer moves it to the next element
    ptrNumbers++; // ptrNumbers now points to numbers[1]
    printf("Value of second element using pointer: %d\\n", *ptrNumbers); // Output: 20

    return 0;
}
\`\`\`

Pointers are a fundamental concept in C, offering direct control over memory, which is essential for advanced programming tasks.
`;

export default function CPointersPage({ params }: LessonPageProps) {
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
