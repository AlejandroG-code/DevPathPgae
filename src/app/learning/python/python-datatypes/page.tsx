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
# Python Data Types

Data types classify which type of value a variable holds. Python has built-in data types to categorize data, but unlike C, you don't explicitly declare the type when creating a variable. Python's interpreter automatically infers the type.

You can get the data type of any object by using the 'type()' function.

## Built-in Data Types

In Python, the common built-in data types are:

1.  **Text Type:** 'str'
2.  **Numeric Types:** 'int', 'float', 'complex'
3.  **Sequence Types:** 'list', 'tuple', 'range'
4.  **Mapping Type:** 'dict'
5.  **Set Types:** 'set', 'frozenset'
6.  **Boolean Type:** 'bool'
7.  **Binary Types:** 'bytes', 'bytearray', 'memoryview'
8.  **None Type:** 'NoneType'

Let's explore the most commonly used ones:

### 1. Text Type: 'str' (Strings)

Strings in Python are sequences of characters, enclosed in single quotes ('''), double quotes ('"'), or triple quotes (''' or """).

\`\`\`python
name = "Alice"        # Double quotes
message = 'Hello'     # Single quotes
multiline = """This is a
multi-line string""" # Triple quotes

print(type(name))      # Output: <class 'str'>
print(type(multiline)) # Output: <class 'str'>
\`\`\`

### 2. Numeric Types: 'int', 'float', 'complex'

-   **'int' (Integer):** Whole numbers, positive or negative, without decimals, and of unlimited length.
-   **'float' (Floating Point Number):** Numbers, positive or negative, containing one or more decimals.
-   **'complex' (Complex Number):** Numbers with a "j" as the imaginary part.

\`\`\`python
integer_num = 100
float_num = 10.5
complex_num = 3 + 4j

print(type(integer_num)) # Output: <class 'int'>
print(type(float_num))   # Output: <class 'float'>
print(type(complex_num)) # Output: <class 'complex'>
\`\`\`

### 3. Sequence Types: 'list', 'tuple', 'range'

-   **'list':** Ordered, changeable (mutable), and allows duplicate members. Defined with square brackets '[]'.
-   **'tuple':** Ordered, unchangeable (immutable), and allows duplicate members. Defined with round brackets '()'.
-   **'range':** Represents an immutable sequence of numbers. Often used in 'for' loops.

\`\`\`python
my_list = ["apple", "banana", "cherry"]
my_tuple = ("red", "green", "blue")
my_range = range(5) # Represents numbers 0, 1, 2, 3, 4

print(type(my_list))  # Output: <class 'list'>
print(type(my_tuple)) # Output: <class 'tuple'>
print(type(my_range)) # Output: <class 'range'>
\`\`\`

### 4. Mapping Type: 'dict' (Dictionaries)

Dictionaries are unordered (in Python 3.7+ they maintain insertion order), changeable, and indexed. They store data in **key-value pairs**. Defined with curly brackets '{}'.

\`\`\`python
my_dict = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

print(type(my_dict)) # Output: <class 'dict'>
print(my_dict["name"]) # Access value by key
\`\`\`

### 5. Set Types: 'set', 'frozenset'

-   **'set':** Unordered, unchangeable (but you can add/remove items), and **no duplicate members**. Defined with curly brackets '{}' (or 'set()' for empty set).
-   **'frozenset':** Immutable version of a set.

\`\`\`python
my_set = {"apple", "banana", "cherry"}
my_frozenset = frozenset(["red", "green", "blue"])

print(type(my_set))       # Output: <class 'set'>
print(type(my_frozenset)) # Output: <class 'frozenset'>
\`\`\`

### 6. Boolean Type: 'bool'

Booleans represent one of two values: 'True' or 'False'. Used for logical operations.

\`\`\`python
is_active = True
is_empty = False

print(type(is_active)) # Output: <class 'bool'>
\`\`\`

### 7. None Type: 'NoneType'

The 'None' keyword is used to define a null value, or no value at all. It is a data type of its own ('NoneType').

\`\`\`python
result = None
print(type(result)) # Output: <class 'NoneType'>
\`\`\`

## Type Conversion (Type Casting)

You can convert between certain data types using casting functions:

-   'int()'
-   'float()'
-   'str()'
-   'list()'
-   'tuple()'
-   'set()'
-   'dict()' (requires specific format)

\`\`\`python
x = 10        # int
y = 3.14      # float
z = "25"      # str

# Convert int to float
new_float = float(x) # 10.0
print(f"int to float: {new_float} ({type(new_float)})")

# Convert float to int (truncates decimal part)
new_int = int(y) # 3
print(f"float to int: {new_int} ({type(new_int)})")

# Convert string to int
new_str_int = int(z) # 25
print(f"str to int: {new_str_int} ({type(new_str_int)})")

# Convert int to string
new_str = str(x) # "10"
print(f"int to str: {new_str} ({type(new_str)})")
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be careful when converting between types. For example, converting a float to an integer will truncate the decimal part, not round it. Converting a string to a number will fail if the string does not represent a valid number.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Understanding Python's data types is fundamental. While Python handles type inference automatically, knowing the capabilities and limitations of each type is crucial for writing efficient and bug-free code.
    </div>
</div>
`;

export default function PythonDatatypesPage() {
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
          prevLesson="python-variables"
          nextLesson="python-numbers" // Last lesson in this sequence for now
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
