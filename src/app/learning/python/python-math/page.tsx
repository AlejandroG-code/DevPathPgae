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
# Python Math Module

Python has a built-in module that you can use for mathematical tasks. The 'math' module provides access to mathematical functions and constants. It is distinct from Python's built-in mathematical operators ('+', '-', '*', '/', etc.) and the 'numbers' data types.

To use the 'math' module, you need to import it.

\`\`\`python
import math

# Get the value of PI
print(math.pi) # Output: 3.141592653589793

# Get the value of Euler's number (e)
print(math.e)  # Output: 2.718281828459045
\`\`\`

## Common Mathematical Functions

The 'math' module offers a wide range of functions for various mathematical operations.

### Rounding and Truncation

-   'math.ceil(x)': Returns the smallest integer greater than or equal to x (rounds up).
-   'math.floor(x)': Returns the largest integer less than or equal to x (rounds down).
-   'math.trunc(x)': Returns the integer part of x.

\`\`\`python
import math

x = 10.3
y = 10.7
z = -5.4

print(f"ceil(10.3): {math.ceil(x)}")  # Output: 11
print(f"floor(10.7): {math.floor(y)}") # Output: 10
print(f"trunc(10.7): {math.trunc(y)}") # Output: 10
print(f"trunc(-5.4): {math.trunc(z)}") # Output: -5
\`\`\`

### Power and Logarithmic Functions

-   'math.pow(x, y)': Returns x raised to the power of y (as a float).
-   'math.sqrt(x)': Returns the square root of x.
-   'math.log(x[, base])': Returns the logarithm of x to the given base. If base is not specified, returns the natural logarithm (base e).
-   'math.log10(x)': Returns the base-10 logarithm of x.
-   'math.exp(x)': Returns e raised to the power of x.

\`\`\`python
import math

print(f"2 to the power of 3: {math.pow(2, 3)}")   # Output: 8.0
print(f"Square root of 64: {math.sqrt(64)}")     # Output: 8.0
print(f"Natural log of 10: {math.log(10)}")      # Output: 2.3025...
print(f"Log base 10 of 100: {math.log10(100)}")  # Output: 2.0
print(f"e to the power of 2: {math.exp(2)}")     # Output: 7.389...
\`\`\`

### Trigonometric Functions

-   'math.sin(x)': Returns the sine of x (x in radians).
-   'math.cos(x)': Returns the cosine of x (x in radians).
-   'math.tan(x)': Returns the tangent of x (x in radians).
-   'math.degrees(x)': Converts angle x from radians to degrees.
-   'math.radians(x)': Converts angle x from degrees to radians.

\`\`\`python
import math

# Convert 90 degrees to radians
rad = math.radians(90)
print(f"90 degrees in radians: {rad}") # Output: 1.5707... (PI/2)

print(f"Sine of 90 degrees (radians): {math.sin(rad)}") # Output: 1.0 (approx.)
print(f"Cosine of 0 degrees (radians): {math.cos(math.radians(0))}") # Output: 1.0
\`\`\`

### Factorial and GCD

-   'math.factorial(x)': Returns the factorial of x.
-   'math.gcd(a, b)': Returns the greatest common divisor of the integers a and b.

\`\`\`python
import math

print(f"Factorial of 5: {math.factorial(5)}") # Output: 120 (5*4*3*2*1)
print(f"GCD of 48 and 18: {math.gcd(48, 18)}") # Output: 6
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">InfoCard: Floating Point Precision</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Many mathematical functions in the 'math' module return floating-point numbers. Be aware of floating-point precision issues, which are inherent to how computers represent real numbers. For exact decimal arithmetic, consider using the 'decimal' module.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The 'math' module is your toolkit for standard mathematical operations beyond basic arithmetic. Utilize it for scientific, engineering, or statistical calculations. For more advanced numerical computing, especially with arrays, consider specialized libraries like NumPy.
    </div>
</div>
`;

export default function PythonMathPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptPythonLang = document.createElement('script');
      scriptPythonLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js';
      scriptPythonLang.async = true;

      scriptPythonLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptPythonLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const pythonLangScript = document.querySelector('script[src*="prism-python.min.js"]');
      if (pythonLangScript && document.body.contains(pythonLangScript)) {
        document.body.removeChild(pythonLangScript);
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
          currentCourseId="python"
          prevLesson="python-datetime"
          nextLesson="python-json"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
