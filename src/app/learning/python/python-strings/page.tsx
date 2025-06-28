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
# Python Strings

Strings in Python are sequences of characters. They are immutable, meaning once created, their content cannot be changed. However, you can create new strings based on existing ones. Strings are enclosed in single quotes (''), double quotes (""), or triple quotes (''' or """).

## Creating Strings

\`\`\`python
single_quote_str = 'Hello, Python!'
double_quote_str = "Python is fun."
triple_single_quote_str = '''This is a
multi-line string
using triple single quotes.'''
triple_double_quote_str = """Another
multi-line string
using triple double quotes."""

print(single_quote_str)
print(double_quote_str)
print(triple_single_quote_str)
print(triple_double_quote_str)
\`\`\`

## String Length

Use the 'len()' function to get the length of a string.

\`\`\`python
text = "Python"
length = len(text)
print(f"The length of '{text}' is {length}") # Output: The length of 'Python' is 6
\`\`\`

## Accessing Characters (Indexing)

Individual characters in a string can be accessed using indexing, similar to arrays. Python strings are zero-indexed.

\`\`\`python
my_string = "Developer"
print(my_string[0])  # Output: D (first character)
print(my_string[4])  # Output: l (fifth character)
print(my_string[-1]) # Output: r (last character, negative indexing)
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Strings are immutable. You cannot change a character at a specific index like 'my_string[0] = 'X''. Trying to do so will result in a 'TypeError'. You must create a new string if you want to modify it.
    </div>
</div>

## Slicing Strings

Slicing allows you to get a substring from a string.
-   'string[start:end]' (end index is exclusive)
-   'string[start:]' (from start to the end)
-   'string[:end]' (from beginning to end-1)
-   'string[::step]' (with a step value)

\`\`\`python
greeting = "Hello, World!"
print(greeting[0:5])   # Output: Hello
print(greeting[7:12])  # Output: World
print(greeting[7:])    # Output: World!
print(greeting[:5])    # Output: Hello
print(greeting[::2])   # Output: Hlo ol! (every second character)
print(greeting[::-1])  # Output: !dlroW ,olleH (reversed string)
\`\`\`

## String Concatenation

You can combine two or more strings using the '+' operator.

\`\`\`python
str1 = "Hello"
str2 = "Python"
combined_str = str1 + ", " + str2 + "!"
print(combined_str) # Output: Hello, Python!
\`\`\`

## String Formatting (f-strings)

f-strings (formatted string literals) provide a concise and readable way to embed expressions inside string literals. Available in Python 3.6+.

\`\`\`python
name = "Alice"
age = 30
message = f"My name is {name} and I am {age} years old."
print(message) # Output: My name is Alice and I am 30 years old.

# Expressions inside f-strings
x, y = 10, 3
print(f"The sum of {x} and {y} is {x + y}") # Output: The sum of 10 and 3 is 13
\`\`\`

## Common String Methods

Python has a rich set of built-in string methods.

-   'upper()': Converts string to uppercase.
-   'lower()': Converts string to lowercase.
-   'strip()': Removes leading/trailing whitespace.
-   'replace(old, new)': Replaces occurrences of a substring.
-   'split(delimiter)': Splits the string into a list of substrings.
-   'find(substring)': Returns the lowest index of the substring if found, -1 otherwise.
-   'count(substring)': Returns the number of occurrences of a substring.

\`\`\`python
example_str = "   Hello Python!   "

print(example_str.upper())     # Output:    HELLO PYTHON!   
print(example_str.lower())     # Output:    hello python!   
print(example_str.strip())     # Output: Hello Python!
print(example_str.replace("Python", "World")) # Output:    Hello World!   
print(example_str.strip().split(" ")) # Output: ['Hello', 'Python!']
print("apple,banana,cherry".split(',')) # Output: ['apple', 'banana', 'cherry']
print(example_str.find("Python")) # Output: 8
print("banana".count("a")) # Output: 3
\`\`\`

## Escape Characters

To insert characters that are illegal in a string, use an escape character (a backslash '&#92;').

-   '&#92;'': Single Quote
-   '&#92;"': Double Quote
-   '&#92;n': New Line
-   '&#92;t': Tab
-   '&#92;&#92;': Backslash

\`\`\`python
quote = "He said, \\"Hello, Python!\\""
print(quote) # Output: He said, "Hello, Python!"

new_line_str = "Line 1\\nLine 2"
print(new_line_str)
# Output:
# Line 1
# Line 2
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Strings are incredibly versatile in Python. Master indexing, slicing, and common string methods, as you'll use them constantly for text manipulation. f-strings are the modern and preferred way for string formatting.
    </div>
</div>
`;

export default function PythonStringsPage() {
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
          prevLesson="python-casting"
          nextLesson="python-booleans"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
