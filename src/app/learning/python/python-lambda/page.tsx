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
# Python Lambda Functions

A lambda function is a small anonymous function. An anonymous function is a function that is defined without a name. Lambda functions can take any number of arguments, but can only have one expression.

## Syntax

The syntax for a lambda function is:

'lambda arguments : expression'

The expression is executed and the result is returned.

\`\`\`python
# A lambda function that adds 10 to the number passed in as an argument
x = lambda a : a + 10
print(x(5)) # Output: 15

# A lambda function that multiplies argument a with argument b
y = lambda a, b : a * b
print(y(5, 6)) # Output: 30

# A lambda function that sums argument a, b, and c
z = lambda a, b, c : a + b + c
print(z(5, 6, 2)) # Output: 13
\`\`\`

## Why Use Lambda Functions?

The power of lambda is better shown when you use them as an anonymous function inside another function.

Imagine you have a function definition that takes one argument, and that argument will be multiplied with an unknown number:

\`\`\`python
def myfunc(n):
  return lambda a : a * n

mydoubler = myfunc(2) # mydoubler is now a lambda function: lambda a : a * 2
mytripler = myfunc(3) # mytripler is now a lambda function: lambda a : a * 3

print(mydoubler(11)) # Output: 22
print(mytripler(11)) # Output: 33
\`\`\`

This is useful when you need to define a simple function "on the fly" for a short period, especially as an argument to higher-order functions (functions that take other functions as arguments).

## Common Use Cases

Lambda functions are commonly used with built-in functions like 'map()', 'filter()', and 'sort()' (with 'key' argument).

### 'filter()'

The 'filter()' function constructs an iterator from elements of an iterable for which a function returns true.

\`\`\`python
ages = [5, 12, 17, 18, 24, 32]

# Filter out adults (age >= 18)
adults = list(filter(lambda age: age >= 18, ages))
print(adults) # Output: [18, 24, 32]
\`\`\`

### 'map()'

The 'map()' function applies a given function to each item of an iterable and returns a list of the results.

\`\`\`python
numbers = [1, 2, 3, 4]

# Square each number
squared_numbers = list(map(lambda x: x * x, numbers))
print(squared_numbers) # Output: [1, 4, 9, 16]
\`\`\`

### 'sort()' with 'key'

The 'sort()' method (for lists) or 'sorted()' function can take a 'key' argument, which is a function to be called on each list element prior to making comparisons. Lambda functions are perfect for this.

\`\`\`python
# Sort a list of tuples by the second element
data = [('apple', 3), ('banana', 1), ('cherry', 2)]
data.sort(key=lambda item: item[1])
print(data) # Output: [('banana', 1), ('cherry', 2), ('apple', 3)]

# Sort a list of dictionaries by a specific key
students = [
    {'name': 'Alice', 'grade': 'B'},
    {'name': 'Charlie', 'grade': 'A'},
    {'name': 'Bob', 'grade': 'C'}
]
students.sort(key=lambda student: student['grade'])
print(students)
# Output:
# [{'name': 'Charlie', 'grade': 'A'},
#  {'name': 'Alice', 'grade': 'B'},
#  {'name': 'Bob', 'grade': 'C'}]
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Readability vs. Conciseness</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While lambda functions are concise, they should not be used for complex logic. If your function requires multiple statements, or if its purpose is not immediately obvious from a single expression, a regular 'def' function will significantly improve readability and maintainability.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use lambda functions for short, single-expression operations, especially when you need to pass a small function as an argument to another function. They are common in functional programming paradigms and for data processing with built-in functions.
    </div>
</div>
`;

export default function PythonLambdaPage() {
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
          prevLesson="python-functions"
          nextLesson="python-arrays"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
