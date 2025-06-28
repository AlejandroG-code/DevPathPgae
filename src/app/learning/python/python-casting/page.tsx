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
# Python Casting

Casting in Python is a way to explicitly convert a variable from one data type to another. While Python is dynamically typed and usually handles type conversions automatically, there are times when you need to force a conversion (e.g., converting user input, ensuring a specific calculation type).

Python provides specific functions for casting:

-   'int()': constructs an integer number from an integer literal, a float literal (by removing decimals), or a string literal (providing the string represents a whole number).
-   'float()': constructs a float number from an integer literal, a float literal, or a string literal (providing the string represents a float or an integer).
-   'str()': constructs a string from a wide variety of data types, including strings, integer literals, and float literals.

## Casting to Integer ('int')

\`\`\`python
x = int(1)     # x will be 1
y = int(2.8)   # y will be 2 (decimals are truncated)
z = int("3")   # z will be 3

print(x, type(x))
print(y, type(y))
print(z, type(z))
\`\`\`
**Output:**
<pre>
<code class="language-text">
1 <class 'int'>
2 <class 'int'>
3 <class 'int'>
</code>
</pre>

## Casting to Float ('float')

\`\`\`python
x = float(1)     # x will be 1.0
y = float(2.8)   # y will be 2.8
z = float("3")   # z will be 3.0
w = float("4.2") # w will be 4.2

print(x, type(x))
print(y, type(y))
print(z, type(z))
print(w, type(w))
\`\`\`
**Output:**
<pre>
<code class="language-text">
1.0 <class 'float'>
2.8 <class 'float'>
3.0 <class 'float'>
4.2 <class 'float'>
</code>
</pre>

## Casting to String ('str')

\`\`\`python
x = str("s1")    # x will be 's1'
y = str(2)       # y will be '2'
z = str(3.0)     # z will be '3.0'

print(x, type(x))
print(y, type(y))
print(z, type(z))
\`\`\`
**Output:**
<pre>
<code class="language-text">
s1 <class 'str'>
2 <class 'str'>
3.0 <class 'str'>
</code>
</pre>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be cautious when casting strings to numbers. If the string does not contain a valid representation of a number, a 'ValueError' will be raised. Always use 'try-except' blocks when converting user input from string to numeric types to handle potential errors gracefully.
    </div>
</div>

\`\`\`python
# Example of potential error when casting string to int/float
invalid_str = "hello"

try:
    num = int(invalid_str)
    print(num)
except ValueError as e:
    print(f"Error: Cannot convert '{invalid_str}' to int. {e}")

# Output: Error: Cannot convert 'hello' to int. invalid literal for int() with base 10: 'hello'
\`\`\`

## Common Use Cases for Casting

-   **User Input:** Input from functions like 'input()' is always a string. If you need to perform calculations, you'll need to cast it to an 'int' or 'float'.
    \`\`\`python
    # user_input = input("Enter a number: ") # In a real script, this gets user input
    user_input_str = "123" # Simulating user input for example
    num = int(user_input_str)
    print(f"You entered: {num}, which is of type {type(num)}")
    \`\`\`

-   **Calculations:** Ensuring that numbers are of the correct type for arithmetic operations, especially to avoid integer division issues.
    \`\`\`python
    int_a = 10
    int_b = 3
    
    # Integer division (result is an integer)
    result_int = int_a // int_b
    print(f"Integer division: {result_int}") # Output: 3

    # Force float division
    result_float = float(int_a) / int_b
    print(f"Float division: {result_float}") # Output: 3.3333333333333335
    \`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Explicit casting gives you control over how Python interprets data. Use it when you need to guarantee a specific data type for an operation, but always anticipate potential errors, especially when converting strings.
    </div>
</div>
`;

export default function PythonCastingPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Prism core JS
    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      // Load Python language component after core is loaded
      const scriptPythonLang = document.createElement('script');
      scriptPythonLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js';
      scriptPythonLang.async = true;

      scriptPythonLang.onload = () => {
        // Highlight all code blocks after Python language component is loaded
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
          prevLesson="python-numbers"
          nextLesson="python-strings"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
