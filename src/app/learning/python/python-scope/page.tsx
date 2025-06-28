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
# Python Scope

A variable is only available from inside the region it is created. This is called scope. Python follows the LEGB rule for name resolution: Local, Enclosed, Global, Built-in.

## Local Scope

A variable created inside a function belongs to the local scope of that function, and can only be used inside that function.

\`\`\`python
def my_function():
  x = 10 # x is local to my_function
  print(x)

my_function() # Output: 10

# print(x) # This would raise a NameError because x is not defined in global scope
\`\`\`

## Enclosed (Nonlocal) Scope

When you have nested functions (a function defined inside another function), variables in the outer (enclosing) function's scope are considered 'enclosed' scope for the inner function.

\`\`\`python
def outer_function():
  x = 20 # x is in the enclosed scope for inner_function

  def inner_function():
    print(x) # inner_function can access x from outer_function's scope
  
  inner_function()

outer_function() # Output: 20
\`\`\`

### The 'nonlocal' keyword

If you want to modify a variable from the enclosed scope inside a nested function, you must use the 'nonlocal' keyword.

\`\`\`python
def outer_function():
  x = 20 # x is in the enclosed scope

  def inner_function():
    nonlocal x # Declare x as nonlocal
    x = 25     # Modify x in the enclosed scope
    print(f"Inner: {x}")
  
  inner_function()
  print(f"Outer: {x}") # x is now 25

outer_function()
# Output:
# Inner: 25
# Outer: 25
\`\`\`

## Global Scope

A variable created in the main body of a Python script is a global variable and belongs to the global scope. Global variables can be used by anyone, both inside of functions and outside.

\`\`\`python
global_var = "I am global"

def my_function():
  print(global_var) # Accessing global_var from inside a function

my_function() # Output: I am global
print(global_var) # Output: I am global
\`\`\`

### The 'global' keyword

If you need to create a global variable inside a function, or modify a global variable from inside a function, you must use the 'global' keyword.

\`\`\`python
x = 300 # Initial global x

def my_function():
  global x # Declare intent to modify global x
  x = 200  # This now modifies the global x, not creates a new local x

my_function()
print(x) # Output: 200 (global x has been modified)
\`\`\`

If you do not use the 'global' keyword inside the function, it will create a local variable with the same name, leaving the global variable unchanged.

\`\`\`python
x = 300 # Initial global x

def my_function_no_global():
  x = 200 # This creates a NEW LOCAL variable x, does not affect global x
  print(f"Inside function: {x}")

my_function_no_global() # Output: Inside function: 200
print(f"Outside function: {x}") # Output: Outside function: 300 (global x is unchanged)
\`\`\`

## Built-in Scope

This is the widest scope. It contains all the built-in names in Python that are always available (e.g., 'print()', 'len()', 'str()', 'int()', 'True', 'False', 'None').

\`\`\`python
print(len([1, 2, 3])) # 'len' is from the built-in scope
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">InfoCard: The LEGB Rule</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When Python tries to resolve a name (variable, function, etc.), it searches for it in this specific order:
        <ol class="list-decimal list-inside ml-4 mt-2">
            <li><strong>L</strong>ocal: Inside the current function.</li>
            <li><strong>E</strong>nclosed: In the scopes of any enclosing functions, from inner to outer.</li>
            <li><strong>G</strong>lobal: In the module's global scope.</li>
            <li><strong>B</strong>uilt-in: In the predefined built-in names of Python.</li>
        </ol>
        It stops at the first place it finds the name.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Modifying Global Variables</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While the 'global' keyword allows you to modify global variables from within functions, overuse can lead to "spaghetti code" that is hard to read, debug, and maintain. It's generally better practice to pass data to functions as arguments and return results, rather than relying heavily on global state modifications.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Understanding variable scope is crucial for avoiding unexpected behavior in your programs. Always be aware of where your variables are defined and how they can be accessed or modified. Favor local variables where possible, as they make code more encapsulated and easier to reason about.
    </div>
</div>
`;

export default function PythonScopePage() {
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
          prevLesson="python-iterators"
          nextLesson="python-modules"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
