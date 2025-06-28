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
# Python Tuples

Tuples are another of Python's built-in data types used to store collections of data. A tuple is an ordered, **unchangeable (immutable)**, and allows duplicate members. Tuples are created using round brackets '()'.

## Creating a Tuple

\`\`\`python
my_tuple = ("apple", "banana", "cherry")
numbers_tuple = (1, 5, 7, 9, 3)
mixed_tuple = ("abc", 34, True, 40.5, "male")

print(my_tuple)
print(type(my_tuple))
\`\`\`
**Output:**
<pre>
<code class="language-text">
('apple', 'banana', 'cherry')
<class 'tuple'>
</code>
</pre>

## Tuple Items

-   **Ordered:** The items have a defined order, and that order will not change.
-   **Unchangeable (Immutable):** You cannot change, add, or remove items after the tuple has been created. This is the main difference from lists.
-   **Allow Duplicates:** Tuples can have items with the same value.
-   **Indexed:** Tuple items are indexed, the first item has index [0], the second item has index [1], etc.

## Accessing Tuple Items (Indexing)

You can access tuple items by referring to the index number.

\`\`\`python
fruits_tuple = ("apple", "banana", "cherry")
print(fruits_tuple[0])  # Output: apple (first item)
print(fruits_tuple[1])  # Output: banana
print(fruits_tuple[-1]) # Output: cherry (last item, negative indexing)
\`\`\`

## Slicing Tuples

You can specify a range of indexes to get a slice of the tuple, similar to lists and strings.

\`\`\`python
thistuple = ("apple", "banana", "cherry", "orange", "kiwi", "melon", "mango")
print(thistuple[2:5]) # Output: ('cherry', 'orange', 'kiwi')
print(thistuple[:4])  # Output: ('apple', 'banana', 'cherry', 'orange')
print(thistuple[4:])  # Output: ('kiwi', 'melon', 'mango')
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Immutability</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Because tuples are immutable, you cannot change or add items directly. Trying to assign a new value to an index ('my_tuple[0] = "grape"') or append ('my_tuple.append("grape")') will result in a 'TypeError'. If you need to modify a tuple, you typically convert it to a list, modify the list, and then convert it back to a tuple.
    </div>
</div>

\`\`\`python
# Example of modifying a tuple (via list conversion)
x = ("apple", "banana", "cherry")
y = list(x) # Convert to list
y[1] = "kiwi" # Modify the list
x = tuple(y) # Convert back to tuple

print(x) # Output: ('apple', 'kiwi', 'cherry')
\`\`\`

## Looping Through a Tuple

You can loop through the tuple items using a 'for' loop.

\`\`\`python
fruits_tuple = ("apple", "banana", "cherry")
for x in fruits_tuple:
  print(x)
# Output:
# apple
# banana
# cherry
\`\`\`

## Tuple Packing and Unpacking

Tuple packing is when you assign multiple values to a single variable, and Python automatically packs them into a tuple. Unpacking is extracting the values back into individual variables.

\`\`\`python
# Packing
packed_data = "John", 30, "Engineer"
print(packed_data) # Output: ('John', 30, 'Engineer')

# Unpacking
name, age, profession = packed_data
print(f"Name: {name}, Age: {age}, Profession: {profession}")
# Output: Name: John, Age: 30, Profession: Engineer
\`\`\`

## Tuple Methods

Tuples have fewer built-in methods than lists due to their immutability.

-   'count(value)': Returns the number of times a specified value occurs in a tuple.
-   'index(value)': Searches the tuple for a specified value and returns the position of where it was found.

\`\`\`python
my_tuple = (1, 3, 7, 8, 7, 5, 4, 6, 8, 5)

x = my_tuple.count(5)
print(f"Count of 5: {x}") # Output: Count of 5: 2

y = my_tuple.index(8)
print(f"First index of 8: {y}") # Output: First index of 8: 3
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use tuples when you need an ordered collection of items that should not change. Their immutability makes them safer for data that should remain constant throughout your program, and they are often used for heterogeneous data where elements have a fixed position and meaning (e.g., coordinates, record data).
    </div>
</div>
`;

export default function PythonTuplesPage() {
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
          prevLesson="python-lists"
          nextLesson="python-sets"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
