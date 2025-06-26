/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-operators/page.tsx
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
## C Operators

Operators are special symbols that perform operations on one or more operands (values or variables). C provides a rich set of operators for various purposes, including arithmetic, assignment, comparison, logical, and bitwise operations.

### 1. Arithmetic Operators

Used to perform common mathematical operations.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">+ (Addition):</p>
    <p class="text-gray-300">Adds two operands.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5 + 3; // x is 8</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">- (Subtraction):</p>
    <p class="text-gray-300">Subtracts the second operand from the first.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 10 - 4; // x is 6</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">* (Multiplication):</p>
    <p class="text-gray-300">Multiplies two operands.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 6 * 2; // x is 12</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">/ (Division):</p>
    <p class="text-gray-300">Divides the first operand by the second. If both are integers, result is an integer (truncates decimal).</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 10 / 3; // x is 3
float y = 10.0 / 3.0; // y is 3.333...</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">% (Modulus):</p>
    <p class="text-gray-300">Returns the remainder of a division. Only for integers.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 10 % 3; // x is 1</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">++ (Increment):</p>
    <p class="text-gray-300">Increases the operand's value by 1 (a++ or ++a).</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5; x++; // x is now 6</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">-- (Decrement):</p>
    <p class="text-gray-300">Decreases the operand's value by 1 (a-- or --a).</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5; x--; // x is now 4</code></pre>
  </div>
</div>

### 2. Assignment Operators

Used to assign values to variables. The most common is the simple assignment '='. Compound assignment operators combine an arithmetic operation with assignment (e.g., '+=').

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">= (Assignment):</p>
    <p class="text-gray-300">Assigns the value on the right to the variable on the left.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 10;</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">+= (Add and Assign):</p>
    <p class="text-gray-300"><code>x += y;</code> is equivalent to <code>x = x + y;</code></p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5; x += 3; // x is 8</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">-= (Subtract and Assign):</p>
    <p class="text-gray-300"><code>x -= y;</code> is equivalent to <code>x = x - y;</code></p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 10; x -= 4; // x is 6</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">*= (Multiply and Assign):</p>
    <p class="text-gray-300"><code>x *= y;</code> is equivalent to <code>x = x * y;</code></p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 6; x *= 2; // x is 12</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">/= (Divide and Assign):</p>
    <p class="text-gray-300"><code>x /= y;</code> is equivalent to <code>x = x / y;</code></p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 10; x /= 3; // x is 3</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">%= (Modulus and Assign):</p>
    <p class="text-gray-300"><code>x %= y;</code> is equivalent to <code>x = x % y;</code></p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 10; x %= 3; // x is 1</code></pre>
  </div>
</div>

### 3. Comparison Operators

Used to compare two operands and evaluate to a Boolean (true or false) result.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">== (Equal to):</p>
    <p class="text-gray-300">Returns true if operands are equal.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5; int y = 5;
// (x == y) is true</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">!= (Not equal to):</p>
    <p class="text-gray-300">Returns true if operands are not equal.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5; int y = 3;
// (x != y) is true</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">> (Greater than):</p>
    <p class="text-gray-300">Returns true if the left operand is greater than the right.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5; int y = 3;
// (x > y) is true</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">< (Less than):</p>
    <p class="text-gray-300">Returns true if the left operand is less than the right.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5; int y = 3;
// (y < x) is true</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">>= (Greater than or equal to):</p>
    <p class="text-gray-300">Returns true if the left operand is greater than or equal to the right.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5; int y = 5;
// (x >= y) is true</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><= (Less than or equal to):</p>
    <p class="text-gray-300">Returns true if the left operand is less than or equal to the right.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 3; int y = 5;
// (x <= y) is true</code></pre>
  </div>
</div>

### 4. Logical Operators

Used to combine or negate conditional statements.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">&& (Logical AND):</p>
    <p class="text-gray-300">Returns true if both statements are true.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5, y = 10;
// (x > 0 && y > 0) is true</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">|| (Logical OR):</p>
    <p class="text-gray-300">Returns true if at least one of the statements is true.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5, y = 10;
// (x > 10 || y > 5) is true</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">! (Logical NOT):</p>
    <p class="text-gray-300">Reverses the result; returns false if the result is true and vice versa.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int x = 5;
// !(x > 10) is true</code></pre>
  </div>
</div>

Understanding C operators is fundamental for writing expressions and controlling program flow.
`;

export default function COperatorsPage() {
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
