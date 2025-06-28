/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-memory-management/page.tsx
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

interface LessonMetadata {
  id: string;
  title: string;
  description: string;
}

const LESSON_CONTENT = `
# C Memory Management

In C, memory management refers to the process of allocating and deallocating computer memory for program data and instructions. C gives the programmer direct control over memory, which is both powerful and prone to errors. This lesson focuses on **dynamic memory management** using functions from the '<stdlib.h>' library.

## Memory Areas

Recall from the "C Memory Address" lesson that a C program's memory is typically divided into segments:

-   **Stack:** Used for local variables, function parameters, and return addresses. Memory is automatically allocated and deallocated.
-   **Heap (Dynamic Memory):** A large pool of free memory available to the program. Memory here must be explicitly allocated and deallocated by the programmer.
-   **Static/Global Data Segment:** Stores global variables and static variables. Memory is allocated once at program startup.
-   **Code (Text) Segment:** Stores the compiled machine code.

Dynamic memory management deals with allocating and freeing memory from the **Heap**.

## Functions for Dynamic Memory Allocation

The standard library '<stdlib.h>' provides four functions for dynamic memory management:

1.  **'malloc()' (Memory Allocation):**
    -   Allocates a block of memory of a specified size in bytes.
    -   Returns a 'void*' pointer to the beginning of the allocated block, or 'NULL' if the allocation fails.
    -   The allocated memory is *not* initialized (contains garbage values).

    **Syntax:**
    \`\`\`c
    void *malloc(size_t size);
    \`\`\`

2.  **'calloc()' (Contiguous Allocation):**
    -   Allocates a block of memory for an array of 'nmemb' elements, each of 'size' bytes.
    -   **Initializes** all allocated memory to zero.
    -   Returns a 'void*' pointer to the beginning of the allocated block, or 'NULL' if the allocation fails.

    **Syntax:**
    \`\`\`c
    void *calloc(size_t nmemb, size_t size);
    \`\`\`

3.  **'realloc()' (Reallocate Memory):**
    -   Changes the size of a previously allocated block of memory.
    -   Can expand or shrink the memory block.
    -   If there's enough space after the old block, it might extend it. Otherwise, it allocates a new, larger block, copies the content of the old block to the new one, and frees the old block.
    -   Returns a 'void*' pointer to the new (possibly moved) block, or 'NULL' if the reallocation fails (the original block is *not* freed in this case).

    **Syntax:**
    \`\`\`c
    void *realloc(void *ptr, size_t size);
    \`\`\`

4.  **'free()' (Free Memory):**
    -   Deallocates a block of memory previously allocated by 'malloc()', 'calloc()', or 'realloc()'.
    -   **Crucial for preventing memory leaks.**
    -   Passing a 'NULL' pointer to 'free()' has no effect.

    **Syntax:**
    \`\`\`c
    void free(void *ptr);
    \`\`\`

## Examples

### Using 'malloc()'

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For malloc, free

int main() {
    int *ptr;
    int n = 5; // Number of integers

    // Allocate memory for 5 integers
    ptr = (int *) malloc(n * sizeof(int)); // Cast is good practice, but not strictly required in C

    // Check if malloc was successful
    if (ptr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    printf("Memory allocated successfully using malloc.\\n");

    // Initialize and print allocated memory
    for (int i = 0; i < n; i++) {
        ptr[i] = (i + 1) * 10; // Assign values
        printf("%d ", ptr[i]);
    }
    printf("\\n");

    // Free the allocated memory
    free(ptr);
    printf("Memory freed.\\n");
    ptr = NULL; // Good practice: set pointer to NULL after freeing

    return 0;
}
\`\`\`

### Using 'calloc()'

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For calloc, free

int main() {
    int *ptr;
    int n = 5;

    // Allocate memory for 5 integers and initialize to zero
    ptr = (int *) calloc(n, sizeof(int));

    if (ptr == NULL) {
        printf("Memory allocation failed!\\n");
        return 1;
    }

    printf("Memory allocated and initialized using calloc:\\n");
    for (int i = 0; i < n; i++) {
        printf("%d ", ptr[i]); // Will print 0 0 0 0 0
    }
    printf("\\n");

    free(ptr);
    ptr = NULL;
    return 0;
}
\`\`\`

### Using 'realloc()'

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For malloc, realloc, free

int main() {
    int *ptr;
    int n1 = 5;
    int n2 = 10;

    // Allocate memory for 5 integers
    ptr = (int *) malloc(n1 * sizeof(int));
    if (ptr == NULL) { /* handle error */ return 1; }

    printf("Initial memory (5 ints):\\n");
    for (int i = 0; i < n1; i++) {
        ptr[i] = i + 1;
        printf("%d ", ptr[i]);
    }
    printf("\\n");

    // Reallocate to hold 10 integers
    int *new_ptr = (int *) realloc(ptr, n2 * sizeof(int));
    if (new_ptr == NULL) {
        printf("Reallocation failed! Original memory still valid.\\n");
        // Don't free ptr here, it's still valid
        free(ptr); // Only if you want to give up on this block
        return 1;
    }
    ptr = new_ptr; // Update ptr to point to the new block

    printf("Reallocated memory (10 ints):\\n");
    for (int i = 0; i < n2; i++) {
        if (i >= n1) { // Initialize new elements
            ptr[i] = (i + 1) * 10;
        }
        printf("%d ", ptr[i]);
    }
    printf("\\n");

    free(ptr);
    ptr = NULL;
    return 0;
}
\`\`\`

## Common Dynamic Memory Errors

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Common Errors</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Controlling memory manually is powerful but requires extreme care. Common errors include:
        <ul class="list-disc list-inside ml-4 mt-2">
            <li><strong>Memory Leaks:</strong> Forgetting to 'free()' allocated memory. This leads to the program consuming more and more memory, eventually crashing or slowing down the system.</li>
            <li><strong>Dangling Pointers:</strong> Using a pointer after the memory it points to has been freed. This leads to undefined behavior. Always set pointers to 'NULL' after freeing.</li>
            <li><strong>Double Free:</strong> Attempting to 'free()' the same memory block twice. This also leads to undefined behavior and crashes.</li>
            <li><strong>Invalid Memory Access:</strong> Accessing memory outside the bounds of an allocated block (e.g., array out of bounds). This can corrupt data or cause segmentation faults.</li>
            <li><strong>Null Pointer Dereference:</strong> Attempting to use a pointer that is 'NULL' (e.g., 'malloc()' failed and you didn't check). Always check if allocation functions return 'NULL'.</li>
        </ul>
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Dynamic memory management is essential for flexible data structures like linked lists, trees, and graphs, where the exact memory requirements are not known at compile time. Always allocate memory when needed and, more importantly, always 'free()' it when no longer required to prevent memory leaks.
    </div>
</div>
`;

interface CMemoryManagementPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function CMemoryManagementPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { courseId, lessonId } = params;

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
          prevLesson="c-enums"
          nextLesson="c-errors"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
