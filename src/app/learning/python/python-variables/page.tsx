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
# Python Variables

Variables are containers for storing data values. Unlike many other programming languages (like C, C++, Java), Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.

## Creating Variables

Python is dynamically typed, meaning you don't need to explicitly declare the data type of a variable. The interpreter infers the type based on the value assigned.

\`\`\`python
# Creating variables and assigning values
name = "Alice"     # A string variable
age = 30           # An integer variable
height = 1.75      # A float variable
is_student = True  # A boolean variable

print(name)
print(age)
print(height)
print(is_student)
\`\`\`

## Variable Naming Rules

-   **Must start with a letter or the underscore character ('_').**
-   **Cannot start with a number.**
-   **Can only contain alpha-numeric characters and underscores (A-z, 0-9, and _).**
-   **Variable names are case-sensitive** ('age', 'Age', and 'AGE' are three different variables).
-   **Cannot be any of the Python keywords.**

**Valid variable names:**

\`\`\`python
myvar = "John"
my_var = "John"
_my_var = "John"
myVar = "John"
MYVAR = "John"
myvar2 = "John"
\`\`\`

**Invalid variable names (will cause SyntaxError):**

\`\`\`python
# 2myvar = "John"  # Cannot start with a number
# my-var = "John"  # Hyphens are not allowed
# my var = "John"  # Spaces are not allowed
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Avoid using Python's built-in function names or keywords (like 'print', 'list', 'str', 'if', 'for') as variable names. While Python might allow it, it will overwrite the original functionality, leading to confusion and potential bugs.
    </div>
</div>

## Assigning Multiple Values

Python allows you to assign values to multiple variables in one line.

### Many Values to Many Variables:

\`\`\`python
x, y, z = "Orange", "Banana", "Cherry"
print(x)
print(y)
print(z)
\`\`\`

### One Value to Many Variables:

\`\`\`python
a = b = c = "Apple"
print(a)
print(b)
print(c)
\`\`\`

## Output Variables

The 'print()' function is often used to output variables.

\`\`\`python
name = "Alice"
age = 25

print("My name is", name, "and I am", age, "years old.")
# Output: My name is Alice and I am 25 years old.

# Using f-strings (formatted string literals - Python 3.6+)
print(f"My name is {name} and I am {age} years old.")
# Output: My name is Alice and I am 25 years old.
\`\`\`

## Global Variables

Variables created outside of a function are known as global variables. Global variables can be used by everyone, both inside of functions and outside.

\`\`\`python
global_message = "I am a global variable"

def my_function():
    print("Inside function:", global_message)

my_function()
print("Outside function:", global_message)
\`\`\`

### The 'global' Keyword

If you need to modify a global variable from within a function, you must use the 'global' keyword.

\`\`\`python
counter = 0 # Global variable

def increment_counter():
    global counter # Declare that we intend to modify the global 'counter'
    counter += 1
    print("Counter inside function:", counter)

print("Counter before call:", counter) # Output: 0
increment_counter()                  # Output: Counter inside function: 1
print("Counter after call:", counter)  # Output: 1
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use meaningful variable names that clearly describe their purpose. While Python is flexible, good naming conventions (like 'snake_case' for variables and functions, 'PascalCase' for classes) improve code readability and maintainability.
    </div>
</div>
`;

export default function PythonVariablesPage() {
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

    // Cleanup function
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
          prevLesson="python-comments"
          nextLesson="python-datatypes"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
