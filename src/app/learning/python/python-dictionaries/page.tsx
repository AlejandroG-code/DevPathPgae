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
# Python Dictionaries

Dictionaries are one of Python's most powerful and versatile built-in data types. They are used to store data values in 'key:value' pairs. A dictionary is a collection which is ordered* (as of Python 3.7), changeable, and does not allow duplicate keys.

*Ordered: As of Python version 3.7, dictionaries are ordered. In Python 3.6 and earlier, dictionaries were unordered.

## Creating a Dictionary

Dictionaries are written with curly brackets '{}', and have keys and values.

\`\`\`python
my_dict = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}
print(my_dict)
print(type(my_dict))
\`\`\`
**Output:**
<pre>
<code class="language-text">
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964}
<class 'dict'>
</code>
</pre>

## Dictionary Items

-   **Ordered:** Items have a defined order, and that order will not change.
-   **Changeable (Mutable):** You can change, add, or remove items after the dictionary has been created.
-   **No Duplicate Keys:** Keys must be unique. If you specify the same key multiple times, the last assignment will overwrite previous ones.
-   **Key-Value Pairs:** Each item consists of a key and a corresponding value. Keys must be immutable (e.g., strings, numbers, tuples); values can be of any data type.

## Accessing Dictionary Items

You can access the items of a dictionary by referring to its key name, inside square brackets '[]' or by using the 'get()' method.

\`\`\`python
car = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}

print(car["model"])       # Output: Mustang
print(car.get("brand"))   # Output: Ford

# Accessing a non-existent key using [] will raise a KeyError
# print(car["color"]) # This would raise an error

# Using .get() for non-existent keys returns None or a default value
print(car.get("color"))      # Output: None
print(car.get("color", "Not Available")) # Output: Not Available
\`\`\`

## Changing Dictionary Items

You can change the value of a specific item by referring to its key name.

\`\`\`python
car = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}
car["year"] = 2020 # Change 'year'
print(car) # Output: {'brand': 'Ford', 'model': 'Mustang', 'year': 2020}
\`\`\`

## Adding Dictionary Items

Adding a new item to the dictionary is done by using a new index key and assigning a value to it.

\`\`\`python
car = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
}
car["color"] = "Red" # Add a new key-value pair
print(car) # Output: {'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'Red'}
\`\`\`

## Removing Dictionary Items

-   'pop(key)': Removes the item with the specified key.
-   'popitem()': Removes the last inserted item (before Python 3.7, it removed a random item).
-   'del keyword': Removes the item with the specified key or deletes the dictionary entirely.
-   'clear()': Empties the dictionary.

\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

person.pop("age") # Remove item with key 'age'
print(f"After pop('age'): {person}") # Output: {'name': 'Alice', 'city': 'New York'}

person["occupation"] = "Engineer" # Add an item back
person.popitem() # Remove the last inserted item ('occupation')
print(f"After popitem(): {person}") # Output: {'name': 'Alice', 'city': 'New York'}

del person["city"] # Delete item with key 'city'
print(f"After del ['city']: {person}") # Output: {'name': 'Alice'}

# del person # Deletes the entire dictionary object
# print(person) # This would cause a NameError

another_dict = {"a": 1, "b": 2}
another_dict.clear() # Empties the dictionary
print(f"After clear(): {another_dict}") # Output: {}
\`\`\`

## Looping Through a Dictionary

You can loop through a dictionary to access its keys, values, or both.

\`\`\`python
student = {
    "name": "Bob",
    "id": "S123",
    "grade": "A"
}

# Loop through keys (default)
print("Looping through keys:")
for x in student:
  print(x)
# Output:
# name
# id
# grade

# Loop through values
print("Looping through values:")
for x in student.values():
  print(x)
# Output:
# Bob
# S123
# A

# Loop through both keys and values (items)
print("Looping through items:")
for key, value in student.items():
  print(f"{key}: {value}")
# Output:
# name: Bob
# id: S123
# grade: A
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Dictionaries are essential for representing structured data where each piece of information has a unique identifier (key). They are extremely efficient for lookups, insertions, and deletions based on keys.
    </div>
</div>
`;

export default function PythonDictionariesPage() {
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
          prevLesson="python-sets"
          nextLesson="python-ifelse"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
