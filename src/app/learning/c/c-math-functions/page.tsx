/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-math-functions/page.tsx
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
## C Math Functions

C provides a rich set of mathematical functions available through the standard library. To use most of these functions, you need to include the '<math.h>' header file. When compiling, you might also need to link the math library using the '-lm' flag (e.g., 'gcc your_program.c -o your_program -lm').

### Common Math Functions

Here are some of the most commonly used math functions in C:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>sqrt()</code> (Square Root):</p>
    <p class="text-gray-300">Returns the square root of a non-negative number.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <math.h>
double result = sqrt(25.0); // result is 5.0</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>pow()</code> (Power):</p>
    <p class="text-gray-300">Returns the value of a base raised to a given power (base^exponent).</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <math.h>
double result = pow(2.0, 3.0); // 2^3, result is 8.0</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>ceil()</code> (Ceiling):</p>
    <p class="text-gray-300">Returns the smallest integer value greater than or equal to x.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <math.h>
double result = ceil(4.3); // result is 5.0</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>floor()</code> (Floor):</p>
    <p class="text-gray-300">Returns the largest integer value less than or equal to x.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <math.h>
double result = floor(4.7); // result is 4.0</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>round()</code> (Round):</p>
    <p class="text-gray-300">Rounds a floating-point number to the nearest integer.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <math.h>
double result1 = round(4.5); // result1 is 5.0
double result2 = round(4.3); // result2 is 4.0</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>fabs()</code> (Absolute Value for float/double):</p>
    <p class="text-gray-300">Returns the absolute value of a floating-point number. Use abs() for int, labs() for long int.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <math.h>
double result = fabs(-10.5); // result is 10.5</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>sin(), cos(), tan()</code> (Trigonometric):</p>
    <p class="text-gray-300">Calculate sine, cosine, and tangent respectively. Angles are in radians.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <math.h>
double pi = 3.14159;
double s = sin(pi / 2); // s is approx 1.0</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1"><code>log()</code> (Natural Logarithm):</p>
    <p class="text-gray-300">Returns the natural logarithm (base e) of a number. Use log10() for base 10.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">#include <math.h>
double result = log(2.718); // result is approx 1.0</code></pre>
  </div>
</div>

### Example Program Using Math Functions

\`\`\`c
#include <stdio.h>
#include <math.h> // Don't forget this!

int main() {
    double num = 9.0;
    double power_base = 3.0;
    double power_exp = 2.0;
    double angle_rad = 0.785398; // approx pi/4

    printf("Square root of %.1f: %.2f\\n", num, sqrt(num));
    printf("%.1f to the power of %.1f: %.2f\\n", power_base, power_exp, pow(power_base, power_exp));
    printf("Ceiling of 5.1: %.0f\\n", ceil(5.1));
    printf("Floor of 5.9: %.0f\\n", floor(5.9));
    printf("Absolute value of -7.8: %.1f\\n", fabs(-7.8));
    printf("Sine of %.2f radians: %.2f\\n", angle_rad, sin(angle_rad));

    return 0;
}
\`\`\`

**Compilation Note:** When compiling C programs that use functions from 'math.h' on Linux/macOS, you usually need to explicitly link the math library with the '-lm' flag:
\`\`\`bash
gcc your_program.c -o your_program -lm
\`\`\`
On some systems (like Windows with MinGW/GCC), it might be linked automatically.

The math functions in C are indispensable for scientific, engineering, and graphical applications, allowing you to perform complex calculations efficiently.
`;

export default function CMathFunctionsPage() {
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
      
      const scriptBashLang = document.createElement('script'); // Need to load bash for compilation example
      scriptBashLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js';
      scriptBashLang.async = true;

      scriptCLang.onload = () => { // Load bash after C is loaded
        document.body.appendChild(scriptBashLang);
        scriptBashLang.onload = () => {
          if (window.Prism) {
            window.Prism.highlightAll();
          }
        };
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
