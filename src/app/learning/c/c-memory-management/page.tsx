/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-memory-management/page.tsx
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
## C Memory Management

Memory management in C refers to the process of allocating and deallocating memory during the execution of a C program. Unlike higher-level languages that have automatic garbage collection, C gives you explicit control over memory, which, while powerful, also carries the responsibility of managing it correctly.

C programs utilize different types of memory:

* **Stack:** Used for local variables and function call information. Memory is automatically allocated and deallocated as functions are called and return. It's fast but limited in size.
* **Heap (Dynamic Memory):** A region of memory available for dynamic allocation during program runtime. Programmers explicitly request and release memory from the heap. This memory persists until explicitly deallocated or until the program ends.

### Dynamic Memory Allocation (Heap)

C provides functions in the '<stdlib.h>' header for dynamic memory management. These functions return 'void*' pointers, which can be cast to any data type.

<div class="grid grid-cols-1 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>malloc()</code> (Memory Allocation):</p>
    <p class="text-gray-300">Allocates a block of memory of a specified size in bytes. Returns a <code>void*</code> pointer to the beginning of the allocated block, or <code>NULL</code> if allocation fails.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <stdlib.h>
int *ptr;
ptr = (int *) malloc(5 * sizeof(int)); // Allocate memory for 5 integers (e.g., 20 bytes)
if (ptr == NULL) { /* Handle error */ }</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>calloc()</code> (Contiguous Allocation):</p>
    <p class="text-gray-300">Allocates a specified number of blocks of memory, each of a specified size, and initializes all bytes to zero. Useful for arrays.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <stdlib.h>
int *ptr;
ptr = (int *) calloc(5, sizeof(int)); // Allocate for 5 ints, all set to 0
if (ptr == NULL) { /* Handle error */ }</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>realloc()</code> (Reallocate Memory):</p>
    <p class="text-gray-300">Changes the size of a previously allocated memory block. It can expand or shrink the block. Returns a new <code>void*</code> pointer.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <stdlib.h>
int *ptr = (int *) malloc(5 * sizeof(int));
// ... use ptr ...
ptr = (int *) realloc(ptr, 10 * sizeof(int)); // Resize to hold 10 integers
if (ptr == NULL) { /* Handle error */ }</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>free()</code> (Deallocate Memory):</p>
    <p class="text-gray-300">Frees the memory block pointed to by <code>ptr</code>. This memory is then available for reuse. **Crucial to prevent memory leaks.**</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <stdlib.h>
int *ptr = (int *) malloc(5 * sizeof(int));
// ... use ptr ...
free(ptr); // Release the memory
ptr = NULL; // Good practice: set pointer to NULL after freeing</code></pre>
  </div>
</div>

### Example: Dynamic Array Allocation

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For malloc and free

int main() {
    int *arr;
    int n, i;

    printf("Enter the number of elements: ");
    scanf("%d", &n);

    // Allocate memory for 'n' integers using malloc
    arr = (int *) malloc(n * sizeof(int));

    // Check if malloc was successful
    if (arr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1; // Exit with error code
    }

    printf("Enter %d elements:\\n", n);
    for (i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    printf("Elements entered are: ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");

    // Free the allocated memory
    free(arr);
    arr = NULL; // Set pointer to NULL after freeing

    printf("Memory freed successfully.\\n");

    return 0;
}
\`\`\`

### Importance of 'free()'

Forgetting to call 'free()' for dynamically allocated memory leads to **memory leaks**. A memory leak occurs when a program continuously allocates memory but fails to release it when it's no longer needed, causing the program to consume more and more memory, potentially leading to system slowdowns or crashes.

Always pair 'malloc()' (or 'calloc()', 'realloc()') with a corresponding 'free()' call.

### 'void' Pointers and Type Casting

'malloc()', 'calloc()', and 'realloc()' return a 'void*' (generic pointer). This means they can point to any type of data. You must explicitly cast them to the correct pointer type (e.g., '(int *)', '(char *)') before using them.

Memory management is one of C's most powerful but also most challenging aspects. Proper dynamic memory allocation and deallocation are essential for writing robust and efficient C applications.
`;

export default function CMemoryManagementPage() {
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
