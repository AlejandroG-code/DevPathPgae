// src/app/learning/c/c-arrays/page.tsx
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
# C Arrays

An array is a collection of data items of the **same data type** stored at contiguous memory locations. It's a fundamental data structure in C used to store a fixed-size sequence of elements.

## Declaring an Array

To declare an array, you specify the data type of the elements, followed by the array name, and then the size of the array in square brackets.

**Syntax:**

\`\`\`c
dataType arrayName[arraySize];
\`\`\`

-   'dataType': The type of data that the array will hold (e.g., 'int', 'char', 'float').
-   'arrayName': The name of the array.
-   'arraySize': The number of elements the array can store. This must be a constant integer expression.

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[5]; // Declares an integer array named 'numbers' that can hold 5 elements
    char name[10]; // Declares a character array named 'name' that can hold 10 characters
    float temperatures[7]; // Declares a float array for 7 temperatures
    return 0;
}
\`\`\`

## Initializing Arrays

You can initialize an array during declaration.

### 1. Initializing with all elements

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[5] = {10, 20, 30, 40, 50}; // Initialize all 5 elements
    return 0;
}
\`\`\`

### 2. Initializing without specifying size

If you initialize an array without specifying its size, the compiler will automatically determine the size based on the number of elements provided.

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[] = {10, 20, 30, 40, 50}; // Size automatically determined as 5
    // sizeof(numbers) will be 5 * sizeof(int)
    printf("Size of numbers array: %zu bytes\\n", sizeof(numbers));
    return 0;
}
\`\`\`

### 3. Initializing with fewer elements than size

If you specify the size but provide fewer elements, the remaining elements will be initialized to 0 (for numeric types) or null characters (for character types).

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[5] = {10, 20}; // numbers[0]=10, numbers[1]=20, numbers[2]=0, numbers[3]=0, numbers[4]=0
    printf("numbers[2]: %d\\n", numbers[2]); // Output: 0
    return 0;
}
\`\`\`

## Accessing Array Elements

Array elements are accessed using **indexes**. C arrays are **zero-indexed**, meaning the first element is at index 0, the second at index 1, and so on. For an array of size 'N', the valid indexes range from 0 to 'N-1'.

**Syntax:**

\`\`\`c
arrayName[index]
\`\`\`

**Example: Accessing and modifying array elements**

\`\`\`c
#include <stdio.h>

int main() {
    int scores[4] = {100, 95, 88, 70};

    // Accessing elements
    printf("First score: %d\\n", scores[0]);  // Output: 100
    printf("Third score: %d\\n", scores[2]); // Output: 88

    // Modifying an element
    scores[1] = 92; // Change the second element from 95 to 92
    printf("Modified second score: %d\\n", scores[1]); // Output: 92

    // Accessing an out-of-bounds index (DANGER!)
    // printf("Out of bounds: %d\\n", scores[4]); // This can lead to undefined behavior
                                                // as arraySize is 4, valid indices 0-3
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        C does not perform automatic bounds checking for arrays. Accessing an index outside the declared range ('arraySize') results in **undefined behavior**, which can lead to crashes, incorrect results, or security vulnerabilities. It's the programmer's responsibility to ensure valid index access.
    </div>
</div>

## Iterating Through Arrays

Loops (especially 'for' loops) are commonly used to process all elements in an array.

**Example: Printing all elements of an array**

\`\`\`c
#include <stdio.h>

int main() {
    int numbers[] = {5, 10, 15, 20, 25};
    int i;

    // Calculate the number of elements: total size / size of one element
    int numElements = sizeof(numbers) / sizeof(numbers[0]);

    printf("Elements of the array:\\n");
    for (i = 0; i < numElements; i++) {
        printf("%d ", numbers[i]);
    }
    printf("\\n"); // Newline after printing all elements
    // Output: 5 10 15 20 25
    return 0;
}
\`\`\`

## Multidimensional Arrays (2D Arrays)

Arrays can have more than one dimension. A two-dimensional array (or matrix) is essentially an array of arrays.

**Declaring a 2D Array:**

\`\`\`c
dataType arrayName[rows][columns];
\`\`\`

**Example: 2D Array (Matrix)**

\`\`\`c
#include <stdio.h>

int main() {
    // Declares a 2x3 integer array (2 rows, 3 columns)
    int matrix[2][3] = {
        {1, 2, 3}, // Row 0
        {4, 5, 6}  // Row 1
    };

    // Accessing elements
    printf("Element at [0][0]: %d\\n", matrix[0][0]); // Output: 1
    printf("Element at [1][2]: %d\\n", matrix[1][2]); // Output: 6

    // Iterating through a 2D array
    int i, j;
    printf("Matrix elements:\\n");
    for (i = 0; i < 2; i++) { // Loop through rows
        for (j = 0; j < 3; j++) { // Loop through columns
            printf("%d ", matrix[i][j]);
        }
        printf("\\n"); // Newline after each row
    }
    /* Output:
    1 2 3 
    4 5 6 
    */
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Arrays are fundamental for organizing and managing collections of similar data. Understanding single and multidimensional arrays is crucial for solving many programming problems in C.
    </div>
</div>
`;


export default function CArraysPage() {
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
    }, [LESSON_CONTENT]); // Re-run effect if lesson content changes;

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
          prevLesson="c-break-continue"
          nextLesson="c-strings"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
