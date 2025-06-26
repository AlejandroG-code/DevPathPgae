/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-arrays/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LessonSidebar from '@/app/_components/LessonSidebar'; // Adjust path if _components is not used
// Ya no usamos useParams, los params vienen directamente en las props
// import { useParams } from 'next/navigation'; 

// Extend the Window interface to include the Prism property
declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

// Interfaz para las props de la página de la lección
// Ajustamos 'params' para que pueda ser un objeto directo o una Promesa
interface LessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  } | Promise<{ // Permite que params sea un objeto o una promesa
    courseId: string;
    lessonId: string;
  }>;
}

const LESSON_CONTENT = `
## C Arrays

An array in C is a collection of items of the **same data type** stored at **contiguous memory locations**. Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.

### Declaring an Array

To declare an array in C, you specify the type of elements, followed by the array name, and then the size of the array inside square brackets \`[]\`.

\`\`\`c
dataType arrayName[arraySize];
\`\`\`

* \`dataType\`: The type of elements the array will store (e.g., \`int\`, \`float\`, \`char\`).
* \`arrayName\`: The name of the array.
* \`arraySize\`: The number of elements the array can hold. This must be a **constant integer** or a **constant expression** (or a variable if using Variable Length Arrays, VLA, since C99).

**Example:**

\`\`\`c
int numbers[5]; // Declares an array named 'numbers' that can hold 5 integers
float prices[10]; // Declares an array named 'prices' that can hold 10 floating-point numbers
char name[50];   // Declares an array named 'name' that can hold 50 characters
\`\`\`

### Initializing an Array

You can initialize an array during its declaration:

\`\`\`c
// 1. Initialize with a list of values
int numbers[] = {10, 20, 30, 40, 50}; // Size is automatically determined (5 elements)

// 2. Initialize with specific size
float temperatures[3] = {25.5, 28.0, 22.3}; 

// 3. Initialize only some elements (remaining will be zero/null)
int scores[5] = {100, 90}; // scores will be {100, 90, 0, 0, 0}

// 4. Initialize all elements to zero (useful for numeric types)
int zeros[10] = {0}; // All 10 elements will be 0

// For character arrays (strings), you can use a string literal
char greeting[] = "Hello"; // Same as {'H', 'e', 'l', 'l', 'o', '\\0'}
\`\`\`

### Accessing Array Elements

Array elements are accessed using an **index**. In C, arrays are **zero-indexed**, meaning the first element is at index 0, the second at index 1, and so on. The last element is at 'arraySize - 1'.

\`\`\`c
arrayName[index];
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    int ages[] = {25, 30, 22, 45, 38}; // Array of 5 integers

    // Accessing elements
    printf("First age: %d\\n", ages[0]);   // Output: First age: 25
    printf("Third age: %d\\n", ages[2]);   // Output: Third age: 22

    // Modifying an element
    ages[1] = 31; // Change the second element from 30 to 31
    printf("Second age (modified): %d\\n", ages[1]); // Output: Second age (modified): 31

    return 0;
}
\`\`\`

### Iterating Through an Array

Loops (especially 'for' loops) are commonly used to process all elements in an array.

\`\`\`c
#include <stdio.h>

int main() {
    int grades[4] = {85, 92, 78, 95};
    int i;

    printf("Grades:\\n");
    for (i = 0; i < 4; i++) { // Loop from index 0 to 3
        printf("Grade at index %d: %d\\n", i, grades[i]);
    }
    return 0;
}
\`\`\`

### Array Bounds Checking

C **does not perform automatic bounds checking** on arrays. If you try to access an element outside the defined size of the array (e.g., 'grades[4]' or 'grades[-1]' in the example above), the program will exhibit **undefined behavior**. This can lead to crashes, incorrect results, or security vulnerabilities (like buffer overflows). It's the programmer's responsibility to ensure valid array indexing.

Arrays are a fundamental data structure in C, providing an efficient way to store and manage collections of homogeneous data.
`;

// Make the component async
export default async function CArraysPage({ params }: LessonPageProps) {
  // Await params to resolve it, as it might be a Promise in the build environment
  const resolvedParams = await params;
  const { courseId, lessonId } = resolvedParams; // Destructure after awaiting

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
  }, [LESSON_CONTENT, courseId, lessonId]); // Keep dependencies as before

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
