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
# Python Modules

A module is a file containing a set of functions or definitions that you want to include in your application. Think of it as a code library. Python modules allow you to logically organize your Python code. Related code is grouped into a module, making the code easier to understand and use.

## Creating a Module

To create a module, just save the code you want in a file with the file extension '.py'.

**Example:** Save this code in a file named 'my_module.py':

\`\`\`python
# my_module.py
def greet(name):
  return f"Hello, {name}!"

person = {
  "name": "Alice",
  "age": 30
}

PI = 3.14159
\`\`\`

## Importing a Module

Once you have created a module, you can import it into another Python file or directly into the Python interpreter. Use the 'import' statement.

\`\`\`python
# main_app.py
import my_module

message = my_module.greet("Bob")
print(message) # Output: Hello, Bob!

print(my_module.person["name"]) # Output: Alice
print(my_module.PI)         # Output: 3.14159
\`\`\`

## Naming a Module

You can name the module file whatever you like, but it must have the '.py' file extension.

## Renaming a Module ('as' keyword)

You can create an alias when you import a module, by using the 'as' keyword.

\`\`\`python
import my_module as mm

print(mm.greet("Charlie")) # Output: Hello, Charlie!
\`\`\`

## Importing From a Module ('from' keyword)

You can choose to import only parts from a module, by using the 'from' keyword.

\`\`\`python
from my_module import greet, PI

print(greet("David")) # Output: Hello, David!
print(PI)         # Output: 3.14159

# print(my_module.person) # This would raise a NameError as person was not imported
\`\`\`

### Importing All Names

You can import all names (functions, variables, classes) from a module using the wildcard '*' syntax:

\`\`\`python
from my_module import *

print(greet("Eve")) # Output: Hello, Eve!
print(person["age"]) # Output: 30
print(PI)         # Output: 3.14159
\`\`\`
<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Avoid 'from module import *'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While 'from module import *' might seem convenient, it is generally **discouraged** in production code. It pollutes the current namespace, making it harder to track where functions/variables come from and increasing the risk of name collisions if multiple modules define items with the same name. It's better to explicitly import what you need or import the module itself and use dot notation.
    </div>
</div>

## Built-in Modules

Python has many built-in modules that you can use. For example, the 'platform' module to access information about your operating system.

\`\`\`python
import platform

x = platform.system()
print(x) # Output: Your operating system (e.g., 'Windows', 'Linux', 'Darwin')

print(platform.python_version()) # Output: Python version
\`\`\`

## Using the 'dir()' Function

The 'dir()' function can be used to list all the names (functions, variables, classes, etc.) defined inside a module.

\`\`\`python
import my_module

# Get a list of names defined in my_module
names_in_module = dir(my_module)
print(names_in_module)
# Output:
# ['PI', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__',
# '__name__', '__package__', '__spec__', 'greet', 'person']
# Note: Underscore-prefixed names are typically internal or special attributes.

# Get a list of names in the current scope
# print(dir())
\`\`\`

## Module Search Path

When you 'import' a module, Python searches for it in the following order:

1.  The directory containing the input script (or the current directory if no script is specified).
2.  The list of directories in the 'PYTHONPATH' environment variable.
3.  The installation-dependent default directories (e.g., standard library paths).

You can see the paths Python searches by looking at 'sys.path':

\`\`\`python
import sys
print(sys.path)
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Modules are crucial for organizing larger Python projects. They allow you to break down your code into smaller, reusable, and manageable files, improving code readability, maintainability, and preventing name conflicts. Embrace modularity for cleaner and more robust applications.
    </div>
</div>
`;

export default function PythonModulesPage() {
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
          prevLesson="python-scope"
          nextLesson="python-datetime"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
