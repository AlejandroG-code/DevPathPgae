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
# Python Comments

Comments are an essential part of writing understandable and maintainable code. They are explanatory notes within your program that the Python interpreter ignores. Their purpose is to make the code easier for humans to understand.

## Single-Line Comments

In Python, single-line comments start with a hash symbol ("#"). Anything from the "#" to the end of the line is considered a comment and is ignored by the interpreter.

\`\`\`python
# This is a comment
print("Hello, World!") # This is another comment, inline with code

# Comments can be used to explain complex logic:
# Calculate the sum of two numbers
num1 = 10
num2 = 20
sum_result = num1 + num2
print(sum_result)

# Or to temporarily disable a line of code:
# print("This line will not be executed")
\`\`\`

### Best Practices for Single-Line Comments:

-   **Explain "why":** Comments are best used to explain the *reason* behind a piece of code, rather than just restating what the code does.
-   **Keep them concise:** Long, rambling comments can be harder to read than the code itself.
-   **Update them:** Outdated comments are worse than no comments, as they can mislead. Keep them synchronized with your code.
-   **Avoid obvious comments:** 'x = 5 # Assigns 5 to x' is redundant.

## Multi-Line Comments (Using Triple Quotes)

Unlike some other languages, Python does not have a dedicated syntax for multi-line comments (e.g., /* ... */ in C++ or Java). However, you can achieve multi-line comments by using **triple quotes** (''' or """).

If a multi-line string is not assigned to a variable, it acts as a comment.

\`\`\`python
"""
This is a multi-line comment.
It can span multiple lines.
The Python interpreter will ignore this block.
"""

'''
This is also a multi-line comment,
using single quotes.
'''

print("Python ignores unassigned triple-quoted strings.")
\`\`\`

### Docstrings (Documentation Strings)

While triple-quoted strings can act as multi-line comments, their primary and most effective use in Python is as **docstrings**. Docstrings are multi-line strings used to document modules, classes, functions, or methods. They are placed as the first statement within the definition of the object.

Docstrings are not ignored by the interpreter; they are stored as part of the object's metadata (accessible via the '__doc__' attribute) and can be accessed by tools and IDEs for documentation and introspection.

\`\`\`python
def greet(name):
    """
    This function greets the user by name.

    Args:
        name (str): The name of the person to greet.

    Returns:
        str: A greeting message.
    """
    return f"Hello, {name}!"

class MyClass:
    """
    This is a docstring for MyClass.
    It represents a simple example class.
    """
    def __init__(self, value):
        """
        Initializes MyClass with a value.
        """
        self.value = value

# Accessing docstrings
print(greet.__doc__)
print(MyClass.__doc__)
print(MyClass.__init__.__doc__)
\`\`\`

**Output of docstring access:**

\`\`\`
    This function greets the user by name.

    Args:
        name (str): The name of the person to greet.

    Returns:
        str: A greeting message.

This is a docstring for MyClass.
It represents a simple example class.

        Initializes MyClass with a value.
\`\`\`

## When to Use Comments

-   **Complex Algorithms:** To explain the steps of a complicated algorithm.
-   **Non-Obvious Code:** When the code's intent isn't immediately clear from its structure.
-   **Business Logic:** To describe specific business rules implemented in the code.
-   **Temporarily Disabling Code:** During debugging or development.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Prioritize writing clean, self-documenting code over excessive commenting. Use comments to explain *why* the code does something, rather than *what* it does. For functions and classes, always use docstrings to provide formal documentation.
    </div>
</div>
`;

export default function PythonCommentsPage() {
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
          prevLesson="python-syntax"
          nextLesson="python-variables"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
