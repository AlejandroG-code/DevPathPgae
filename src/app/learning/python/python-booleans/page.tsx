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
# Python Booleans

Booleans represent one of two values: 'True' or 'False'. In programming, you often need to know if an expression is true or false. You can evaluate any expression in Python and get a Boolean answer.

## Boolean Values

\`\`\`python
print(10 > 9)  # Output: True
print(10 == 9) # Output: False
print(10 < 9)  # Output: False
\`\`\`

When you run a condition in an 'if' statement, Python returns 'True' or 'False'.

\`\`\`python
a = 200
b = 33

if b > a:
  print("b is greater than a")
else:
  print("b is not greater than a")
# Output: b is not greater than a
\`\`\`

## The 'bool()' Function

The 'bool()' function allows you to evaluate any value and get 'True' or 'False' in return.

### Most values are True

Almost any value is evaluated to 'True' if it has some content.
-   Any string is 'True', except empty strings.
-   Any number is 'True', except 0.
-   Any list, tuple, set, and dictionary are 'True', except empty ones.

\`\`\`python
print(bool("Hello"))  # Output: True
print(bool(15))       # Output: True
print(bool(["apple", "cherry", "banana"])) # Output: True
print(bool({"name": "John"})) # Output: True
\`\`\`

### Some values are False

The following values evaluate to 'False':
-   'False' (the boolean value itself)
-   'None'
-   Zero of any numeric type (0, 0.0, 0j)
-   Empty sequences: '', (), [], {}
-   Empty sets: 'set()'
-   Empty range: 'range(0)'

\`\`\`python
print(bool(False))    # Output: False
print(bool(None))     # Output: False
print(bool(0))        # Output: False
print(bool(""))       # Output: False
print(bool(()))       # Output: False (empty tuple)
print(bool([]))       # Output: False (empty list)
print(bool({}))       # Output: False (empty dictionary)
\`\`\`

You can also create functions that return a Boolean value.

\`\`\`python
def my_function():
  return True

if my_function():
  print("YES!")
else:
  print("NO!")
# Output: YES!
\`\`\`

## Operators that Return Booleans (Comparison Operators)

Booleans are heavily used with comparison operators, which compare two values and return either 'True' or 'False'.

-   '==': Equal to
-   '!=': Not equal to
-   '>': Greater than
-   '<': Less than
-   '>=': Greater than or equal to
-   '<=': Less than or equal to

\`\`\`python
x = 10
y = 12

print(x == y) # Output: False
print(x != y) # Output: True
print(x > y)  # Output: False
print(x < y)  # Output: True
print(x >= 10) # Output: True
print(y <= 10) # Output: False
\`\`\`

## Logical Operators

Logical operators combine conditional statements:

-   'and': Returns 'True' if both statements are true.
-   'or': Returns 'True' if one of the statements is true.
-   'not': Reverses the result, returns 'False' if the result is true.

\`\`\`python
a = 15
b = 5
c = 10

# 'and' example
print(a > b and a > c)  # True and True -> True
print(a > b and a < c)  # True and False -> False

# 'or' example
print(a > b or a < c)   # True or False -> True
print(b > a or c > a)   # False or False -> False

# 'not' example
print(not(a > b and a > c)) # not(True) -> False
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Booleans are fundamental for controlling the flow of your programs through conditional statements ('if', 'elif', 'else') and loops. Master their use with comparison and logical operators to create powerful and flexible logic.
    </div>
</div>
`;

export default function PythonBooleansPage() {
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
          prevLesson="python-strings"
          nextLesson="python-operators"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
