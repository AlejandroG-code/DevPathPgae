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
# Python Syntax

Python's syntax is designed to be highly readable, often resembling natural language more than other programming languages. One of its most distinctive features is the use of **indentation** to define code blocks, rather than curly braces or keywords.

## Indentation

In Python, indentation is not just for readability; it's syntactically significant. The number of spaces in the indentation is up to you (but commonly 4 spaces), but it must be consistent within a block of code.

\`\`\`python
# Correct indentation
if 5 > 2:
    print("Five is greater than two!") # This line is part of the 'if' block
    print("This also runs.")      # This line is also part of the 'if' block

# Incorrect indentation (will cause an IndentationError)
# if 5 > 2:
# print("Five is greater than two!") # This will cause an error
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Mixing tabs and spaces for indentation is a common source of 'IndentationError'. It's highly recommended to stick to **4 spaces** for indentation. Most modern code editors are configured to automatically convert tabs to spaces, or allow you to set the default to spaces.
    </div>
</div>

## Comments

Comments are used to explain code and make it more readable. Python ignores anything after a hash '#' symbol on a line.

\`\`\`python
# This is a single-line comment

print("Hello, Python!") # This is an inline comment

# You can also use comments to temporarily disable code
# print("This line is commented out")
\`\`\`

### Multi-line Comments / Docstrings

Python does not have a specific syntax for multi-line comments like '/* ... */' in C. However, you can use multi-line strings (triple quotes) as comments, especially as **docstrings** for functions, classes, and modules.

\`\`\`python
"""
This is a multi-line string.
It can serve as a multi-line comment
if not assigned to a variable.
"""

def my_function():
    """
    This is a docstring for my_function.
    It explains what the function does.
    Docstrings are accessed via __doc__ attribute.
    """
    print("Inside my_function")

print(my_function.__doc__)
\`\`\`

## Variables

Variables are used to store data values. Python has no command for declaring a variable. A variable is created the moment you first assign a value to it.

\`\`\`python
x = 5          # x is an integer
name = "John"  # name is a string
price = 19.99  # price is a float

print(x)
print(name)
print(price)
\`\`\`

## Case-Sensitivity

Python is case-sensitive. 'myVariable' is different from 'myvariable'.

\`\`\`python
myVariable = 10
MyVariable = 20 # This is a different variable

print(myVariable) # Output: 10
print(MyVariable) # Output: 20
\`\`\`

## Statements

A statement is an instruction that the Python interpreter can execute. Each line of code in Python is typically a statement. Unlike C, Python statements generally **do not end with a semicolon**.

\`\`\`python
# These are individual statements
print("Hello")
x = 10
if x > 5:
    print("x is greater than 5")
\`\`\`

You can put multiple statements on one line using a semicolon, but it's generally discouraged for readability.

\`\`\`python
# Discouraged for readability
a = 10; b = 20; print(a + b) 
\`\`\`

## Whitespace

Beyond indentation, extra whitespace (spaces, tabs, newlines) generally doesn't affect Python code execution, but it's crucial for readability. PEP 8 (Python Enhancement Proposal) provides style guidelines for Python code, including whitespace usage.

\`\`\`python
# Whitespace does not affect execution, but consistency is key
result = 10 + 5
result = 10    +      5 # Same result, but harder to read
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Embrace Python's unique syntax, especially indentation. Consistent styling improves collaboration and reduces errors. Familiarize yourself with <a href="https://peps.python.org/pep-0008/" target="_blank" rel="noopener noreferrer" class="text-accent-purple hover:underline">PEP 8</a>, Python's official style guide, for writing clean and idiomatic Python code.
    </div>
</div>
`;

export default function PythonSyntaxPage() {
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
          prevLesson="python-getstarted"
          nextLesson="python-comments"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
