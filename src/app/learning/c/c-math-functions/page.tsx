// src/app/learning/c/c-math-functions/page.tsx
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
# C Math Functions

C provides a rich set of mathematical functions through the standard math library, which is typically included using the '<math.h>' header. These functions allow you to perform common mathematical operations like square roots, powers, trigonometric calculations, and more.

## Including the Math Library

To use math functions, you must include the '<math.h>' header file. When compiling, you often need to explicitly link the math library using the '-lm' flag.

**Example Compilation:**

\`\`\`bash
gcc your_program.c -o your_program -lm
\`\`\`

## Common Math Functions

Here's a table of some commonly used math functions in C:

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Function</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Description</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Return Type / Parameter Types</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'sqrt(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the square root of 'x'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double sqrt(double x)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'pow(base, exp)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'base' raised to the power of 'exp'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double pow(double base, double exp)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'fabs(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the absolute value of 'x' (for float/double)</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double fabs(double x)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'ceil(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the smallest integer value greater than or equal to 'x'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double ceil(double x)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'floor(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the largest integer value less than or equal to 'x'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double floor(double x)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'round(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the nearest integer value to 'x'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double round(double x)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'sin(x)', 'cos(x)', 'tan(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Trigonometric sine, cosine, tangent (x in radians)</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double sin(double x)' etc.</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'log(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the natural logarithm (base e) of 'x'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double log(double x)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'log10(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the base-10 logarithm of 'x'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double log10(double x)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'exp(x)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns e (Euler's number) raised to the power of 'x'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double exp(double x)'</td></tr>
        </tbody>
    </table>
</div>

**Note on Data Types:** Most math functions in '<math.h>' operate on 'double' arguments and return 'double' values. If you are working with 'float' or 'long double', there are often 'f' or 'l' suffixes for the function names (e.g., 'sqrtf()' for float, 'sqrtl()' for long double).

## Examples of Math Functions

\`\`\`c
#include <stdio.h>
#include <math.h> // Include for mathematical functions

int main() {
    double num = 25.0;
    double result;

    // Square Root
    result = sqrt(num);
    printf("Square root of %.2lf is %.2lf\\n", num, result); // Output: 5.00

    // Power (2 raised to the power of 3)
    result = pow(2.0, 3.0);
    printf("2 to the power of 3 is %.2lf\\n", result); // Output: 8.00

    // Absolute Value (for double/float)
    double neg_num = -15.7;
    result = fabs(neg_num);
    printf("Absolute value of %.2lf is %.2lf\\n", neg_num, result); // Output: 15.70

    // Ceil (Ceiling)
    result = ceil(4.3);
    printf("Ceil of 4.3 is %.2lf\\n", result); // Output: 5.00

    // Floor
    result = floor(4.7);
    printf("Floor of 4.7 is %.2lf\\n", result); // Output: 4.00

    // Round (C99 and later)
    result = round(4.5);
    printf("Round of 4.5 is %.2lf\\n", result); // Output: 5.00
    result = round(4.4);
    printf("Round of 4.4 is %.2lf\\n", result); // Output: 4.00

    // Trigonometric functions (angles in radians)
    double angle_degrees = 90.0;
    double angle_radians = angle_degrees * (M_PI / 180.0); // M_PI is often defined in <math.h>

    printf("Sin of 90 degrees (%.2lf rad) is %.2lf\\n", angle_radians, sin(angle_radians)); // Output: 1.00 (approx)

    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The '&ltmath.h&gt ' library provides essential functions for numerical computations. Remember to include the header and link the math library ('-lm') during compilation when using these functions.
    </div>
</div>
`;


export default function CMathFunctionsPage() {

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
          prevLesson="c-recursion"
          nextLesson="c-create-files"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
