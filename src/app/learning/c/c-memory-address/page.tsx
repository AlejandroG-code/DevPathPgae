/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-memory-address/page.tsx
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
## C Memory Address

Every variable in C is stored in a unique memory location. The **memory address** is the numerical label for that location. Understanding memory addresses is crucial in C, especially when working with pointers, as it allows for direct manipulation of data in memory.

### The Address-Of Operator ('&')

In C, the **address-of operator** ('&') is used to get the memory address of a variable. When placed before a variable name, it returns the memory address where that variable is stored.

\`\`\`c
#include <stdio.h>

int main() {
    int myAge = 30; // Declare an integer variable
    
    // Print the value of myAge
    printf("Value of myAge: %d\\n", myAge); 
    
    // Print the memory address of myAge using the & operator
    // %p is the format specifier for printing addresses
    printf("Memory address of myAge: %p\\n", &myAge); 

    // Output might look something like:
    // Value of myAge: 30
    // Memory address of myAge: 0x7ffe04e0e6c4 (this address will vary)
    
    return 0;
}
\`\`\`

**Note:** The actual memory address you see will vary each time the program is executed, and it will be different on different systems. This is normal, as the operating system allocates memory dynamically. The important concept is that every variable has a unique, identifiable location.

### Why Memory Addresses are Important

* **Pointers:** Memory addresses are the foundation of pointers. A pointer is a variable that stores the memory address of another variable. Without understanding addresses, pointers wouldn't make sense.
* **Direct Memory Access:** C allows direct memory manipulation using addresses, which is powerful for low-level programming (e.g., operating systems, embedded systems, device drivers).
* **Efficiency:** Sometimes, passing the address of a variable (instead of its entire value) to a function can be more efficient, especially for large data structures.

### Example: Addresses of Different Data Types

The concept applies to all data types. Each variable, regardless of its type, has a memory address.

\`\`\`c
#include <stdio.h>

int main() {
    int num = 10;
    float pi = 3.14;
    char grade = 'A';

    printf("Address of int num: %p\\n", &num);
    printf("Address of float pi: %p\\n", &pi);
    printf("Address of char grade: %p\\n", &grade);

    // You might observe that consecutive variables are stored in consecutive memory locations,
    // depending on system architecture and compiler optimizations.
    
    return 0;
}
\`\`\`

Understanding memory addresses is the stepping stone to mastering pointers, which unlock a significant portion of C's power and flexibility.
`;

export default function CMemoryAddressPage() {
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
