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
# Python Arrays (The 'array' Module)

While Python does not have a built-in 'array' data type in the same way C or Java do, it has 'lists' which serve most of the purposes of arrays. However, Python does provide an 'array' module for creating arrays that can only hold a single data type, similar to arrays in other languages, often used for memory efficiency when dealing with large sequences of numbers.

If you need to work with collections of numerical data and require more memory-efficient storage and faster operations than standard Python lists, especially for large datasets, you might use the 'array' module or libraries like NumPy.

## Python Lists vs. 'array' Module

It's important to understand the distinction:

-   **Python Lists:**
    -   Can store items of *different* data types.
    -   Are dynamic (can grow or shrink in size).
    -   More flexible, but can be less memory-efficient for large homogeneous (same type) numerical data.
    -   The most commonly used sequence type in Python.

-   **'array' Module Arrays ('array.array'):**
    -   Can only store items of the *same* data type (homogeneous).
    -   Are dynamic (can grow or shrink).
    -   More memory-efficient than lists for numerical data.
    -   Require specifying a "type code" upon creation.

## Creating an Array using the 'array' Module

To use arrays from the 'array' module, you must first import it.

\`\`\`python
import array as arr

# Create an array of integers (type code 'i' for signed int)
my_array = arr.array('i', [1, 2, 3, 4, 5])
print(my_array)
print(type(my_array))

# Create an array of floats (type code 'f' for float)
float_array = arr.array('f', [1.1, 2.2, 3.3])
print(float_array)
\`\`\`
**Output:**
<pre>
<code class="language-text">
array('i', [1, 2, 3, 4, 5])
<class 'array.array'>
array('f', [1.100000023841858, 2.200000047683716, 3.299999952316284])
</code>
</pre>
Notice the float values might have precision issues due to binary representation.

### Common Type Codes:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
<thead class="bg-gray-700">
<tr>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Type Code</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">C Type</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Python Type</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Minimum Bytes</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'b'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">signed char</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">1</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'B'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">unsigned char</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">1</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'h'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">signed short</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">2</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'H'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">unsigned short</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">2</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'i'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">signed int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">2</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'I'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">unsigned int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">2</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'l'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">signed long</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">4</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'L'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">unsigned long</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">4</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'f'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">float</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">float</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">4</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'d'</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">double</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">float</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">8</td>
</tr>
</tbody>
</table>

## Accessing and Modifying Elements

Elements in an 'array.array' are accessed and modified using indexing, just like lists.

\`\`\`python
import array as arr

my_array = arr.array('i', [10, 20, 30, 40, 50])

print(my_array[0])  # Output: 10
my_array[1] = 25    # Modify element
print(my_array)     # Output: array('i', [10, 25, 30, 40, 50])
\`\`\`

## Common Array Operations

Arrays from the 'array' module support many of the same operations as lists:

-   **'append(x)':** Appends item 'x' to the end.
-   **'insert(i, x)':** Inserts item 'x' at index 'i'.
-   **'pop(i)':** Removes item at index 'i' (or last if 'i' is omitted).
-   **'remove(x)':** Removes the first occurrence of value 'x'.
-   **'extend(iterable)':** Appends elements from an iterable.
-   **'fromlist(list)':** Appends items from a list.
-   **'tolist()':** Converts the array to a Python list.

\`\`\`python
import array as arr

my_array = arr.array('i', [1, 2, 3])
my_array.append(4)
print(f"After append: {my_array}") # Output: array('i', [1, 2, 3, 4])

my_array.insert(1, 99)
print(f"After insert: {my_array}") # Output: array('i', [1, 99, 2, 3, 4])

my_array.pop(0)
print(f"After pop(0): {my_array}") # Output: array('i', [99, 2, 3, 4])

# Convert to list
my_list = my_array.tolist()
print(f"Converted to list: {my_list}, Type: {type(my_list)}")
# Output: Converted to list: [99, 2, 3, 4], Type: <class 'list'>
\`\`\`

## When to use 'array' Module vs. Lists

-   **Use lists** for general-purpose collections of items, especially when items can be of mixed data types or when memory efficiency for homogeneous numerical data is not a critical concern. Lists are more flexible and common.
-   **Use 'array.array'** when you need to store a large sequence of numbers of the same type and want to save memory and potentially gain some performance benefits for numerical operations. This is less common in everyday Python scripting unless you're dealing with very large datasets or specific hardware interactions.

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Important!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For most general programming tasks in Python, **lists are the preferred and more idiomatic choice** for dynamic sequences. The 'array' module is a specialized tool. For serious numerical computing, libraries like **NumPy** are far more powerful and optimized than 'array.array' for working with large arrays of numbers.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While Python doesn't have native "arrays" like C, its 'list' data type is highly versatile. If you specifically need memory-efficient fixed-type numeric arrays, the 'array' module offers that. For data science and advanced numerical work, explore NumPy arrays.
    </div>
</div>
`;

export default function PythonArraysPage() {
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
          prevLesson="python-lambda"
          nextLesson="python-classes"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
