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
# Python Try...Except (Error Handling)

Errors happen in programs, and if not handled gracefully, they can cause your program to crash. Python's 'try...except' block allows you to test a block of code for errors and handle them without stopping the entire program. This is crucial for creating robust and user-friendly applications.

## The 'try' and 'except' Block

The 'try' block lets you test a block of code for errors. The 'except' block lets you handle the error.

\`\`\`python
try:
  print(x) # This will cause an error because 'x' is not defined
except:
  print("An exception occurred")
# Output: An exception occurred
\`\`\`

## Handling Specific Exceptions

You can define as many 'except' blocks as you want, to handle different specific exceptions.

\`\`\`python
try:
  print(x)
except NameError:
  print("Variable x is not defined")
except TypeError:
  print("Type error occurred")
except:
  print("Something else went wrong")
# Output: Variable x is not defined (since x is a NameError)

try:
  result = 10 / 0 # This will cause a ZeroDivisionError
except ZeroDivisionError:
  print("Cannot divide by zero!")
except:
  print("An unexpected error occurred.")
# Output: Cannot divide by zero!
\`\`\`

## The 'else' Block

You can use the 'else' keyword to define a block of code to be executed if no errors were raised in the 'try' block.

\`\`\`python
try:
  print("Hello")
except:
  print("Something went wrong")
else:
  print("Nothing went wrong")
# Output:
# Hello
# Nothing went wrong
\`\`\`

## The 'finally' Block

The 'finally' block, if specified, will be executed regardless of whether the 'try' block raises an error or not. It's typically used for cleanup actions, like closing files or database connections.

\`\`\`python
try:
  f = open("demofile.txt", "w") # Open for writing, might create/overwrite
  f.write("Lorum ipsum")
except:
  print("Something went wrong when writing to the file")
finally:
  if 'f' in locals() and not f.closed: # Check if f was opened and not already closed
    f.close()
  print("The 'try...except' block is finished.")

# Example with an error
try:
  # This line will cause an error if 'f' is not writable or path is bad
  # f = open("nonexistent_folder/demofile.txt", "w") 
  print(y) # NameError
except NameError:
  print("NameError occurred!")
finally:
  print("The 'try...except' block is finished, regardless of error.")
\`\`\`
**Output for error example:**
<pre>
<code class="language-text">
NameError occurred!
The 'try...except' block is finished, regardless of error.
</code>
</pre>

## Raising Exceptions ('raise')

As a Python developer, you can choose to throw an exception if a condition occurs. To throw (or raise) an exception, use the 'raise' keyword.

\`\`\`python
x = -1

if x < 0:
  raise Exception("Sorry, no numbers below zero")
\`\`\`
**Output (will typically terminate program if not caught by another try/except):**
<pre>
<code class="language-text">
Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
Exception: Sorry, no numbers below zero
</code>
</pre>

You can also define what kind of error to raise.

\`\`\`python
x = "hello"

if not type(x) is int:
  raise TypeError("Only integers are allowed")
\`\`\`
**Output:**
<pre>
<code class="language-text">
Traceback (most recent call last):
  File "<stdin>", line 4, in <module>
TypeError: Only integers are allowed
</code>
</pre>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Effective error handling is paramount for building robust applications. Use 'try...except' to gracefully manage unexpected situations, 'else' for code that should run only on success, and 'finally' for cleanup. Use 'raise' when your code detects an invalid state that it cannot recover from.
    </div>
</div>
`;

export default function PythonTryExceptPage() {
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
          prevLesson="python-pip"
          nextLesson="python-user-input"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
