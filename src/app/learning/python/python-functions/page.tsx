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
# Python Functions

A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function. A function can return data as a result.

## Defining a Function

In Python, a function is defined using the 'def' keyword, followed by the function name, parentheses '()', and a colon ':'. The function body is indented.

\`\`\`python
def greet():
  print("Hello from a function!")

# Calling the function
greet() # Output: Hello from a function!
\`\`\`

## Parameters

Information can be passed into functions as arguments (or parameters). Parameters are specified inside the parentheses, after the function name. You can add as many parameters as you want, just separate them with a comma.

\`\`\`python
def greet_name(name):
  print(f"Hello, {name}!")

greet_name("Alice")  # Output: Hello, Alice!
greet_name("Bob")    # Output: Hello, Bob!
\`\`\`

### Arbitrary Arguments, '*args'

If you do not know how many arguments that will be passed into your function, add a '*' before the parameter name in the function definition. This way the function will receive a 'tuple' of arguments, and can access the items accordingly.

\`\`\`python
def my_function(*kids):
  print(f"The youngest child is {kids[2]}")

my_function("Emil", "Tobias", "Linus") # Output: The youngest child is Linus
\`\`\`

### Keyword Arguments, '**kwargs'

You can also send arguments with the 'key = value' syntax. This way the order of the arguments does not matter. If you do not know how many keyword arguments that will be passed into your function, add two asterisks '**' before the parameter name in the function definition. This way the function will receive a 'dictionary' of arguments, and can access the items accordingly.

\`\`\`python
def my_function(child3, child2, child1):
  print(f"The youngest child is {child3}")

my_function(child1="Emil", child2="Tobias", child3="Linus") # Output: The youngest child is Linus

# With **kwargs
def my_function(**kid):
  print(f"His last name is {kid['lname']}")

my_function(fname="Tobias", lname="Refsnes") # Output: His last name is Refsnes
\`\`\`

## Default Parameter Value

If we call the function without argument, it uses the default value.

\`\`\`python
def my_function(country = "Norway"):
  print(f"I am from {country}")

my_function("Sweden")   # Output: I am from Sweden
my_function()           # Output: I am from Norway
\`\`\`

## Return Values

To let a function return a value, use the 'return' statement.

\`\`\`python
def multiply(x, y):
  return x * y

result = multiply(5, 3)
print(result) # Output: 15

print(multiply(10, 2)) # Output: 20
\`\`\`

## The 'pass' Statement

Function definitions cannot be empty, but if you for some reason have a function definition with no content, put in the 'pass' statement to avoid getting an error.

\`\`\`python
def empty_function():
  pass # This does nothing, but makes the function valid
\`\`\`

## Recursion

Python also accepts function recursion, which means a defined function can call itself. Recursion is a common mathematical and programming concept. It means that a function calls itself. This has the benefit of meaning that you can loop through data to reach a result.

\`\`\`python
def factorial(n):
  if n == 1:
    return 1
  else:
    return n * factorial(n-1)

# Calculate factorial of 5 (5 * 4 * 3 * 2 * 1)
print(factorial(5)) # Output: 120
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Recursion Depth</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While powerful, recursive functions must have a clear base case to stop the recursion. Without it, they will lead to an infinite loop and eventually a 'RecursionError' (stack overflow) as Python has a default recursion depth limit.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Functions are fundamental for organizing your code into reusable and manageable blocks. Use clear function names, document them with docstrings (using triple quotes), and design them to perform a single, well-defined task for better code quality.
    </div>
</div>
`;

export default function PythonFunctionsPage() {
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
          prevLesson="python-for-loops"
          nextLesson="python-lambda"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
