// src/app/learning/c/c-data-types/page.tsx
'use client'; 

import React, { useEffect, useState } from 'react';
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
# C Data Types

Data types in C define the type of information a variable can store. This is important because it dictates how much memory is allocated for the variable and what kind of operations can be performed on it. C is a **statically typed** language, meaning you must declare the type of a variable before using it, and its type cannot change.

## Basic Built-in Data Types

C offers several basic built-in data types:

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Data Type</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Description</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Size (Typical)</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Range (Typical)</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Format Specifier</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'int'</td><td class="p-3 border-b border-gray-700 text-gray-300">Integer (whole number)</td><td class="p-3 border-b border-gray-700 text-gray-300">2 or 4 bytes</td><td class="p-3 border-b border-gray-700 text-gray-300">-32,768 to 32,767 (2 bytes) / -2x10^9 to 2x10^9 (4 bytes)</td><td class="p-3 border-b border-gray-700 text-gray-300">'%d' or '%i'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'float'</td><td class="p-3 border-b border-gray-700 text-gray-300">Floating point number (single precision)</td><td class="p-3 border-b border-gray-700 text-gray-300">4 bytes</td><td class="p-3 border-b border-gray-700 text-gray-300">~1.2E-38 to 3.4E+38 (6-7 decimal digits)</td><td class="p-3 border-b border-gray-700 text-gray-300">'%f'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'double'</td><td class="p-3 border-b border-gray-700 text-gray-300">Floating point number (double precision)</td><td class="p-3 border-b border-gray-700 text-gray-300">8 bytes</td><td class="p-3 border-b border-gray-700 text-gray-300">~2.3E-308 to 1.7E+308 (15-17 decimal digits)</td><td class="p-3 border-b border-gray-700 text-gray-300">'%lf' (scanf), '%f' (printf)</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'char'</td><td class="p-3 border-b border-gray-700 text-gray-300">Single character</td><td class="p-3 border-b border-gray-700 text-gray-300">1 byte</td><td class="p-3 border-b border-gray-700 text-gray-300">-128 to 127 or 0 to 255</td><td class="p-3 border-b border-gray-700 text-gray-300">'%c'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'_Bool'</td><td class="p-3 border-b border-gray-700 text-gray-300">Boolean (0 for false, 1 for true)</td><td class="p-3 border-b border-gray-700 text-gray-300">1 byte</td><td class="p-3 border-b border-gray-700 text-gray-300">0 or 1 (requires "&ltstdbool.h&gt")</td><td class="p-3 border-b border-gray-700 text-gray-300">'%d'</td></tr>
        </tbody>
    </table>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-blue-600 bg-blue-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-blue-400">Note</p>
    <div class="text-gray-200 leading-relaxed">
        Note: The exact size and range of data types can vary slightly depending on the compiler and the system architecture. For instance, 'int' on a 64-bit system is typically 4 bytes, while on older 16-bit systems it might be 2 bytes.
    </div>
</div>

## 'int' (Integer)

Used to store whole numbers (positive or negative).

\`\`\`c
#include <stdio.h>

int main() {
    int age = 30;
    int year = -2023;
    printf("Age: %d\\n", age);
    printf("Year: %d\\n", year);
    return 0;
}
\`\`\`

## 'float' and 'double' (Floating Point Numbers)

Used to store numbers with decimal points. 'double' provides more precision than 'float' and is generally preferred for calculations requiring high accuracy.

\`\`\`c
#include <stdio.h>

int main() {
    float price = 19.99f;  // 'f' suffix to indicate a float literal
    double PI = 3.1415926535; // Double precision, no suffix for double literals
    printf("Price: %.2f\\n", price); // .2f for 2 decimal places
    printf("PI: %.10f\\n", PI); // .10f for 10 decimal places
    return 0;
}
\`\`\`

## 'char' (Character)

Used to store a single character. Characters are enclosed in single quotes (e.g., ''A'', ''7'', ''#''). Internally, characters are stored as integer numbers according to their ASCII value.

\`\`\`c
#include <stdio.h>

int main() {
    char grade = 'A';
    char initial = 'J';
    printf("Grade: %c\\n", grade);
    printf("Initial: %c\\n", initial);

    // You can treat a char as a number
    printf("ASCII value of 'A': %d\\n", grade); // Output: 65 (ASCII value of 'A')
    return 0;
}
\`\`\`

## Data Type Modifiers

You can use type modifiers to change the size or behavior of basic data types:

<ul class="list-disc list-inside ml-4 text-gray-300 mb-4 space-y-1">
    <li><strong>'short'</strong>: Used with 'int' to indicate a smaller integer type.</li>
    <li><strong>'long'</strong>: Used with 'int' or 'double' to indicate a larger type. 'long long' can be used for even larger integers.</li>
    <li><strong>'signed'</strong>: Can hold both positive and negative values (this is the default for 'int', 'short', 'long').</li>
    <li><strong>'unsigned'</strong>: Can hold only non-negative values, which doubles the positive range by not using a bit for the sign.</li>
</ul>

\`\`\`c
#include <stdio.h>

int main() {
    short int s_num = 32000;      // Short integer
    long int l_num = 2000000000L; // Long integer (L suffix for long)
    unsigned int u_num = 4000000000U; // Unsigned integer (U suffix for unsigned)
    long long int ll_num = 9000000000000000000LL; // Very long integer (LL suffix)

    printf("Short int: %hd\\n", s_num);
    printf("Long int: %ld\\n", l_num);
    printf("Unsigned int: %u\\n", u_num);
    printf("Long long int: %lld\\n", ll_num); // %lld for long long int
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-gray-200 leading-relaxed">
        Understanding and correctly choosing data types is fundamental for efficient memory usage and correct program behavior in C. An appropriate choice can prevent errors and optimize performance.
    </div>
</div>
`;


export default function CDataTypesPage({ params }: { params: Promise<{ courseId: string; lessonId: string; }> }) {
  const [, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        
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

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [params]);

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
          prevLesson="c-variables"
          nextLesson="c-constants"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
