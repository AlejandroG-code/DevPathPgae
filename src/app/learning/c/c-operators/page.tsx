/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-operators/page.tsx
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


const LESSON_CONTENT = `
# C Operators

Operators are special symbols that perform operations on one or more operands (variables or values). They are the backbone of any programming language, enabling calculations, comparisons, and logical evaluations.

## Types of Operators

### 1. Arithmetic Operators

Used to perform common mathematical operations.

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Operator</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Description</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Example</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'+'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Addition</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A + B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'-'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Subtraction</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A - B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'*'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Multiplication</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A * B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'/'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Division</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A / B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Modulo (remainder of division)</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A % B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'++'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Increment</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A++' (A = A + 1)</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'--'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Decrement</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A--' (A = A - 1)</td></tr>
        </tbody>
    </table>
</div>

\`\`\`c
#include <stdio.h>

int main() {
    int a = 10, b = 3;
    printf("a + b = %d\\n", a + b); // 13
    printf("a - b = %d\\n", a - b); // 7
    printf("a * b = %d\\n", a * b); // 30
    printf("a / b = %d\\n", a / b); // 3 (integer division)
    printf("a %% b = %d\\n", a % b); // 1

    a++; // a becomes 11
    printf("a after increment = %d\\n", a); // 11

    b--; // b becomes 2
    printf("b after decrement = %d\\n", b); // 2
    return 0;
}
\`\`\`

### 2. Relational Operators

Used to compare two operands and return a boolean result (true or false, represented as 1 or 0 in C).

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Operator</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Description</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Example</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'=='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Equal to</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A == B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'!='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Not equal to</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A != B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'>'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Greater than</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A > B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'<'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less than</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A < B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'>='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Greater than or equal to</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A >= B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'<='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less than or equal to</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A <= B'</td></tr>
        </tbody>
    </table>
</div>

\`\`\`c
#include <stdio.h>
#include <stdbool.h> // For bool type

int main() {
    bool sunny = true;
    bool warm = false;

    printf("Sunny AND Warm: %d\\n", sunny && warm); // 0 (false)
    printf("Sunny OR Warm: %d\\n", sunny || warm);   // 1 (true)
    printf("NOT Sunny: %d\\n", !sunny);             // 0 (false)
    return 0;
}
\`\`\`

### 3. Logical Operators

Used to combine or modify conditional expressions.

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Operator</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Description</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Example</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&&'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Logical AND</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(A && B)' (True if both A and B are true)</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'||'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Logical OR</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(A || B)' (True if either A or B is true)</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'!'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Logical NOT</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'!(A)' (True if A is false)</td></tr>
        </tbody>
    </table>
</div>

\`\`\`c
#include <stdio.h>
#include <stdbool.h> // For bool type

int main() {
    bool sunny = true;
    bool warm = false;

    printf("Sunny AND Warm: %d\\n", sunny && warm); // 0 (false)
    printf("Sunny OR Warm: %d\\n", sunny || warm);   // 1 (true)
    printf("NOT Sunny: %d\\n", !sunny);             // 0 (false)
    return 0;
}
\`\`\`

### 4. Assignment Operators

Used to assign values to variables.

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Operator</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Example</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Equivalent To</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A = 5'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A = 5'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'+='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A += B'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A = A + B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'-='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A -= B'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A = A - B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'*='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A *= B'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A = A * B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'/='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A /= B'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A = A / B'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%='</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A %= B'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A = A % B'</td></tr>
        </tbody>
    </table>
</div>

\`\`\`c
#include <stdio.h>

int main() {
    int value = 10;
    value += 5; // value is now 15 (value = 10 + 5)
    printf("Value: %d\\n", value);

    value -= 3; // value is now 12 (value = 15 - 3)
    printf("Value: %d\\n", value);
    return 0;
}
\`\`\`

## Operator Precedence

Operator precedence determines the order in which operators are evaluated in an expression. Operators with higher precedence are evaluated before operators with lower precedence. Parentheses '()' can be used to override precedence.

**Example:**

\`\`\`c
int result = 10 + 5 * 2; // result will be 20 (5 * 2 is evaluated first)
int result_with_paren = (10 + 5) * 2; // result_with_paren will be 30
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Understanding C operators and their precedence is crucial for writing correct and efficient programs that perform the intended calculations and logical evaluations.
    </div>
</div>
`;


export default function COperatorsPage() {

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
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
    };
  }, [LESSON_CONTENT]);

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
          prevLesson="c-constants"
          nextLesson="c-booleans" // Corrected next lesson
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
