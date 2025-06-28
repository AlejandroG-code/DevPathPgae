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
# Python Sets

Sets are another of Python's built-in data types used to store collections of data. A set is an unordered, unchangeable*, and unindexed collection. However, you can add or remove items from a set. Sets do **not allow duplicate members**. Sets are created using curly brackets '{}' or the 'set()' constructor.

*Unchangeable: Items themselves cannot be changed after creation, but you can add new items or remove existing items.

## Creating a Set

\`\`\`python
my_set = {"apple", "banana", "cherry"}
numbers_set = {1, 5, 7, 9, 3}
mixed_set = {"abc", True, 40.5, "male"}

print(my_set) # Output order might vary due to unordered nature
print(type(my_set))
\`\`\`
**Output (order may vary):**
<pre>
<code class="language-text">
{'cherry', 'banana', 'apple'}
<class 'set'>
</code>
</pre>

### Sets do not allow duplicates

If you try to add duplicate items, they will be ignored.

\`\`\`python
thisset = {"apple", "banana", "cherry", "apple"}
print(thisset) # Output: {'cherry', 'banana', 'apple'} (only one 'apple')
\`\`\`

### Creating an Empty Set

To create an empty set, you must use the 'set()' constructor, as '{}' creates an empty dictionary.

\`\`\`python
empty_set = set()
empty_dict = {}

print(type(empty_set)) # Output: <class 'set'>
print(type(empty_dict)) # Output: <class 'dict'>
\`\`\`

## Set Items

-   **Unordered:** Set items do not have a defined order. Items can appear in a different order every time you use them.
-   **Unchangeable (Elements):** Set items cannot be changed once created. However, you can remove items and add new items.
-   **Unindexed:** You cannot access items by referring to an index or a key.
-   **No Duplicate Members:** Sets do not allow two items with the same value.

## Accessing Set Items

Since sets are unordered and unindexed, you cannot access them using indexing (e.g., 'my_set[0]'). You can loop through the set items using a 'for' loop, or ask if a specified value is present in a set using the 'in' keyword.

\`\`\`python
thisset = {"apple", "banana", "cherry"}

# Looping
print("Looping through set:")
for x in thisset:
  print(x)

# Check if item exists
print("banana" in thisset) # Output: True
print("grape" in thisset)  # Output: False
\`\`\`

## Adding Set Items

-   'add()': Adds a single item to the set.
-   'update(iterable)': Adds elements from another iterable (list, tuple, other set, etc.) to the current set.

\`\`\`python
thisset = {"apple", "banana", "cherry"}
thisset.add("orange")
print(f"After add: {thisset}") # Output (order may vary): {'orange', 'cherry', 'banana', 'apple'}

tropical = {"pineapple", "mango", "papaya"}
thisset.update(tropical)
print(f"After update: {thisset}") # Output (order may vary): {'cherry', 'orange', 'pineapple', 'mango', 'banana', 'papaya', 'apple'}
\`\`\`

## Removing Set Items

-   'remove(item)': Removes the specified item. Will raise a 'KeyError' if the item does not exist.
-   'discard(item)': Removes the specified item. Will NOT raise an error if the item does not exist.
-   'pop()': Removes a random item (since sets are unordered). Returns the removed item.
-   'clear()': Empties the set.
-   'del keyword': Deletes the entire set object.

\`\`\`python
thisset = {"apple", "banana", "cherry"}
thisset.remove("banana")
print(f"After remove: {thisset}") # Output: {'cherry', 'apple'}

thisset.discard("orange") # 'orange' not in set, no error
print(f"After discard: {thisset}") # Output: {'cherry', 'apple'}

x = thisset.pop() # Removes a random item and returns it
print(f"Removed item with pop: {x}")
print(f"Set after pop: {thisset}") # Set will have 1 less item

thisset.clear() # Empties the set
print(f"After clear: {thisset}") # Output: set()

# del thisset # Deletes the entire set object
# print(thisset) # This would cause a NameError
\`\`\`

## Set Operations (Mathematical Set Operations)

Sets support common mathematical set operations.

-   'union()': Returns a new set containing all items from both sets. Can also use '|' operator.
-   'intersection()': Returns a new set containing only the items present in both sets. Can also use '&' operator.
-   'difference()': Returns a new set containing items only in the first set, not in both. Can also use '-' operator.
-   'symmetric_difference()': Returns a new set containing all items except the ones present in both sets. Can also use '^' operator.
-   'issubset()', 'issuperset()', 'isdisjoint()': For checking relationships between sets.

\`\`\`python
set1 = {"a", "b", "c"}
set2 = {"c", "d", "e"}
set3 = {"f", "g"}

# Union
union_set = set1.union(set2)
print(f"Union (set1 | set2): {union_set}") # Output: {'e', 'a', 'b', 'd', 'c'}

# Intersection
intersection_set = set1.intersection(set2)
print(f"Intersection (set1 & set2): {intersection_set}") # Output: {'c'}

# Difference
difference_set = set1.difference(set2)
print(f"Difference (set1 - set2): {difference_set}") # Output: {'a', 'b'}

# Symmetric Difference
symmetric_diff_set = set1.symmetric_difference(set2)
print(f"Symmetric Difference (set1 ^ set2): {symmetric_diff_set}") # Output: {'e', 'a', 'b', 'd'}

# isdisjoint: Returns True if no items in the sets are present in both
print(f"Is set1 disjoint from set2? {set1.isdisjoint(set2)}") # Output: False (because 'c' is common)
print(f"Is set1 disjoint from set3? {set1.isdisjoint(set3)}") # Output: True
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Sets are ideal for operations where uniqueness of elements is paramount, or when you need to perform mathematical set operations like union, intersection, and difference efficiently. They are particularly fast for checking membership ('in' keyword).
    </div>
</div>
`;

export default function PythonSetsPage() {
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
          prevLesson="python-tuples"
          nextLesson="python-dictionaries"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
