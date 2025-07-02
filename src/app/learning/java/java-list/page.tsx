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
# Java List Interface

The 'List' interface is a fundamental part of the Java Collections Framework, extending the 'Collection' interface. It represents an **ordered collection** (also known as a sequence) that allows **duplicate elements**. Elements in a 'List' can be accessed by their integer index (position), starting from zero.

## Key Characteristics of 'List':

-   **Ordered:** Elements are stored and retrieved in the order they were inserted.
-   **Allows Duplicates:** You can add the same element multiple times to a 'List'.
-   **Index-based Access:** Elements can be accessed, inserted, or removed based on their numerical index.

## Common 'List' Implementations

The 'List' interface is implemented by several concrete classes, each with different performance characteristics:

-   **'ArrayList'**: (Most commonly used) Implements 'List' using a dynamic array. It's excellent for random access (getting elements by index) but can be slow for insertions or deletions in the middle of the list, as it requires shifting elements.
-   **'LinkedList'**: Implements 'List' using a doubly-linked list. It's efficient for insertions and deletions anywhere in the list but slower for random access (getting an element by index requires traversing from the beginning or end).
-   **'Vector'**: A legacy class that is similar to 'ArrayList' but is synchronized (thread-safe). Due to its synchronized nature, it is generally slower than 'ArrayList' and is rarely used in modern single-threaded applications. 'ArrayList' is preferred, with external synchronization if needed.
-   **'Stack'**: A legacy class that extends 'Vector' and implements a LIFO (Last-In, First-Out) stack. It's generally recommended to use 'ArrayDeque' as a stack instead.

We will delve into 'ArrayList' and 'LinkedList' in more detail in subsequent lessons.

## Common Methods of the 'List' Interface

The 'List' interface provides methods for manipulating elements based on their position, in addition to the methods inherited from 'Collection'.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Time Complexity (ArrayList / LinkedList)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'add(E e)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Appends the specified element to the end of this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) amortized / O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'add(int index, E element)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inserts the specified element at the specified position in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) / O(1) (if index is near ends) or O(n) (if index is in middle)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'get(int index)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the element at the specified position in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) / O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'set(int index, E element)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Replaces the element at the specified position in this list with the specified element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) / O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(int index)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the element at the specified position in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) / O(1) (if index is near ends) or O(n) (if index is in middle)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'indexOf(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the index of the first occurrence of the specified element in this list, or -1 if this list does not contain the element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) / O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'lastIndexOf(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the index of the last occurrence of the specified element in this list, or -1 if this list does not contain the element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) / O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'subList(int fromIndex, int toIndex)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a view of the portion of this list between the specified 'fromIndex', inclusive, and 'toIndex', exclusive.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) / O(1)</td>
        </tr>
    </tbody>
</table>

## Example: Basic 'List' Operations (using 'ArrayList')

Since 'ArrayList' is the most common implementation, we'll use it to demonstrate 'List' operations.

\`\`\`java
import java.util.List;
import java.util.ArrayList; // We'll use ArrayList as a concrete implementation

public class ListExample {
  public static void main(String[] args) {
    // Declare a List of Strings (programming to the interface)
    List<String> fruits = new ArrayList<>();

    // 1. Add elements
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Cherry");
    fruits.add("Apple"); // List allows duplicates

    System.out.println("Initial List: " + fruits); // Output: [Apple, Banana, Cherry, Apple]

    // 2. Get element by index
    System.out.println("Element at index 1: " + fruits.get(1)); // Output: Banana

    // 3. Insert element at a specific index
    fruits.add(1, "Orange"); // Insert Orange at index 1
    System.out.println("List after adding Orange at index 1: " + fruits); // Output: [Apple, Orange, Banana, Cherry, Apple]

    // 4. Set (replace) element at a specific index
    fruits.set(0, "Grape"); // Replace element at index 0 with Grape
    System.out.println("List after setting index 0 to Grape: " + fruits); // Output: [Grape, Orange, Banana, Cherry, Apple]

    // 5. Remove element by index
    fruits.remove(2); // Remove element at index 2 (which is Banana)
    System.out.println("List after removing element at index 2: " + fruits); // Output: [Grape, Orange, Cherry, Apple]

    // 6. Remove element by object (first occurrence)
    fruits.remove("Apple");
    System.out.println("List after removing first Apple: " + fruits); // Output: [Grape, Orange, Cherry]

    // 7. Check size
    System.out.println("Current size of list: " + fruits.size()); // Output: 3

    // 8. Check if contains
    System.out.println("Does list contain Cherry? " + fruits.contains("Cherry")); // Output: true

    // 9. Find index of an element
    System.out.println("Index of Orange: " + fruits.indexOf("Orange")); // Output: 1
    System.out.println("Index of non-existent: " + fruits.indexOf("Mango")); // Output: -1

    // 10. Iterate through the list
    System.out.println("Elements in list:");
    for (String fruit : fruits) {
      System.out.println("- " + fruit);
    }
    // Output:
    // - Grape
    // - Orange
    // - Cherry

    // 11. Clear the list
    fruits.clear();
    System.out.println("List after clearing: " + fruits); // Output: []
    System.out.println("Is list empty? " + fruits.isEmpty()); // Output: true
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Program to the Interface</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always declare your variables using the 'List' interface type (e.g., 'List<String> myList;'), rather than the concrete implementation type ('ArrayList<String> myList;'). This makes your code more flexible. If you later decide to switch from 'ArrayList' to 'LinkedList' (or vice-versa), you only need to change the constructor call, not every place where 'myList' is used.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'IndexOutOfBoundsException'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When accessing or modifying elements by index using methods like 'get()', 'set()', or 'remove(int index)', always ensure that the provided index is within the valid range (0 to 'size() - 1'). Accessing an invalid index will result in an 'IndexOutOfBoundsException' at runtime.
    </div>
</div>
`;

export default function JavaListPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptJavaLang = document.createElement('script');
      scriptJavaLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js';
      scriptJavaLang.async = true;

      scriptJavaLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptJavaLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const javaLangScript = document.querySelector('script[src*="prism-java.min.js"]');
      if (javaLangScript && document.body.contains(javaLangScript)) {
        document.body.removeChild(javaLangScript);
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
          currentCourseId="java"
          prevLesson="java-collections"
          nextLesson="java-arraylist"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
