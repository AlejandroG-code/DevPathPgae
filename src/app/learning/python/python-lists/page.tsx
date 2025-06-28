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
# Python Lists

Lists are one of the four built-in data types in Python used to store collections of data. A list is an ordered, changeable (mutable), and allows duplicate members. Lists are created using square brackets '[ ]'.

## Creating a List

\`\`\`python
my_list = ["apple", "banana", "cherry"]
numbers = [1, 5, 7, 9, 3]
mixed_list = ["abc", 34, True, 40.5, "male"]

print(my_list)
print(type(my_list))
\`\`\`
**Output:**
<pre>
<code class="language-text">
['apple', 'banana', 'cherry']
<class 'list'>
</code>
</pre>

## List Items

-   **Ordered:** The items have a defined order, and that order will not change. New items are placed at the end.
-   **Changeable (Mutable):** You can change, add, and remove items after the list has been created.
-   **Allow Duplicates:** Lists can have items with the same value.
-   **Indexed:** List items are indexed, the first item has index [0], the second item has index [1], etc.

## Accessing List Items (Indexing)

You can access list items by referring to the index number.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # Output: apple (first item)
print(fruits[1])  # Output: banana
print(fruits[-1]) # Output: cherry (last item, using negative indexing)
\`\`\`

## Slicing Lists

You can specify a range of indexes by specifying where to start and where to end the range. The item at the 'end' index is *not* included.

\`\`\`python
thislist = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
print(thislist[2:5]) # Output: ['cherry', 'orange', 'kiwi'] (from index 2 to 4)
print(thislist[:4])  # Output: ['apple', 'banana', 'cherry', 'orange'] (from beginning to index 3)
print(thislist[4:])  # Output: ['kiwi', 'melon', 'mango'] (from index 4 to end)
print(thislist[-4:-1]) # Output: ['orange', 'kiwi', 'melon'] (from 4th last to 2nd last)
\`\`\`

## Changing List Items

To change the value of a specific item, refer to the index number.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits[1] = "blackcurrant" # Change 'banana' to 'blackcurrant'
print(fruits) # Output: ['apple', 'blackcurrant', 'cherry']
\`\`\`

You can also change a range of item values.

\`\`\`python
thislist = ["apple", "banana", "cherry", "orange", "kiwi", "mango"]
thislist[1:3] = ["blackcurrant", "watermelon"] # Replace 'banana', 'cherry'
print(thislist) # Output: ['apple', 'blackcurrant', 'watermelon', 'orange', 'kiwi', 'mango']
\`\`\`

## Adding List Items

-   'append()': Adds an item to the end of the list.
-   'insert(index, item)': Adds an item at a specified index.
-   'extend(iterable)': Appends elements from another iterable (list, tuple, set, etc.) to the current list.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")      # Add to end
print(f"After append: {fruits}") # Output: ['apple', 'banana', 'cherry', 'orange']

fruits.insert(1, "grape")    # Insert at index 1
print(f"After insert: {fruits}") # Output: ['apple', 'grape', 'banana', 'cherry', 'orange']

tropical = ["mango", "pineapple"]
fruits.extend(tropical)
print(f"After extend: {fruits}") # Output: ['apple', 'grape', 'banana', 'cherry', 'orange', 'mango', 'pineapple']
\`\`\`

## Removing List Items

-   'remove(item)': Removes the specified item.
-   'pop(index)': Removes the item at the specified index. If no index is specified, removes the last item.
-   'del keyword': Removes the item at the specified index or deletes the entire list.
-   'clear()': Empties the list.

\`\`\`python
thislist = ["apple", "banana", "cherry", "orange"]
thislist.remove("banana")    # Remove 'banana'
print(f"After remove: {thislist}") # Output: ['apple', 'cherry', 'orange']

thislist.pop(0)              # Remove item at index 0 ('apple')
print(f"After pop(0): {thislist}") # Output: ['cherry', 'orange']

thislist.pop()               # Remove last item ('orange')
print(f"After pop(): {thislist}") # Output: ['cherry']

del thislist[0]              # Delete 'cherry'
print(f"After del [0]: {thislist}") # Output: []

# del thislist             # Deletes the entire list object
# print(thislist)          # This would cause a NameError

new_list = [1, 2, 3, 4]
new_list.clear()             # Empties the list
print(f"After clear: {new_list}") # Output: []
\`\`\`

## Looping Through a List

You can loop through the list items by using a 'for' loop.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
# Output:
# apple
# banana
# cherry
\`\`\`

You can also loop through the index numbers.

\`\`\`python
for i in range(len(fruits)):
  print(f"At index {i}: {fruits[i]}")
# Output:
# At index 0: apple
# At index 1: banana
# At index 2: cherry
\`\`\`

## List Comprehension

A concise way to create lists based on existing lists or other iterables.

\`\`\`python
# Create a new list containing only fruits with 'a' in the name
fruits = ["apple", "banana", "cherry", "kiwi", "mango"]
new_fruits = [x for x in fruits if "a" in x]
print(new_fruits) # Output: ['apple', 'banana', 'mango']

# Create a list of squares
squares = [x**2 for x in range(1, 6)]
print(squares) # Output: [1, 4, 9, 16, 25]
\`\`\`

## Sorting Lists

-   'sort()': Sorts the list in-place (modifies the original list).
-   'sorted()': Returns a new sorted list, leaving the original list unchanged.

\`\`\`python
numbers = [50, 10, 30, 20, 40]
numbers.sort() # Sorts in ascending order by default
print(f"Sorted in-place: {numbers}") # Output: [10, 20, 30, 40, 50]

desc_numbers = [50, 10, 30]
desc_numbers.sort(reverse=True) # Sort in descending order
print(f"Sorted descending: {desc_numbers}") # Output: [50, 30, 10]

original_list = [7, 1, 5, 2]
new_sorted_list = sorted(original_list)
print(f"Original: {original_list}, New Sorted: {new_sorted_list}")
# Output: Original: [7, 1, 5, 2], New Sorted: [1, 2, 5, 7]
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Lists are incredibly versatile and are one of the most used data structures in Python. Master their mutability, various methods for modification, and efficient iteration techniques like list comprehensions.
    </div>
</div>
`;

export default function PythonListsPage() {
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
          prevLesson="python-operators"
          nextLesson="python-tuples"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
