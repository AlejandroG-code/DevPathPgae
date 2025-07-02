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
# Java ArrayList

The 'ArrayList' class is one of the most commonly used implementations of the 'List' interface in the Java Collections Framework. It provides a resizable array implementation, meaning it can dynamically grow or shrink in size as elements are added or removed.

## Key Characteristics of 'ArrayList':

-   **Resizable Array:** Internally, 'ArrayList' uses a dynamic array to store elements. When the array becomes full, it automatically resizes itself (typically by doubling its capacity).
-   **Ordered:** Elements maintain their insertion order.
-   **Allows Duplicates:** You can store the same element multiple times.
-   **Index-based Access:** Elements can be accessed, inserted, or removed based on their numerical index (0 to size-1).
-   **Non-Synchronized:** 'ArrayList' is not thread-safe. If multiple threads access an 'ArrayList' concurrently and at least one of them modifies the list, it must be synchronized externally.

## When to Use 'ArrayList'?

'ArrayList' is generally a good choice when:
-   You need fast random access to elements (retrieving an element by its index).
-   You frequently iterate over the elements in the list.
-   The number of insertions/deletions in the middle of the list is relatively low.

## Common Methods of 'ArrayList'

'ArrayList' inherits and implements all methods from the 'List' interface. Here are some of the most frequently used ones, along with their typical time complexities:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Time Complexity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'add(E e)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Appends the specified element to the end of this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) amortized (O(n) in worst case when resizing)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'add(int index, E element)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inserts the specified element at the specified position in this list. Shifts subsequent elements.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'get(int index)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the element at the specified position in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'set(int index, E element)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Replaces the element at the specified position in this list with the specified element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(int index)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the element at the specified position in this list. Shifts subsequent elements.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the first occurrence of the specified element from this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'size()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the number of elements in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'contains(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this list contains the specified element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'clear()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes all of the elements from this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
    </tbody>
</table>

## Example: Using 'ArrayList'

\`\`\`java
import java.util.ArrayList;
import java.util.List; // Good practice to program to the interface

public class ArrayListExample {
  public static void main(String[] args) {
    // Creating an ArrayList of Strings
    List<String> cars = new ArrayList<>();

    // 1. Adding elements
    cars.add("Volvo");
    cars.add("BMW");
    cars.add("Ford");
    cars.add("Mazda");
    cars.add("Volvo"); // ArrayList allows duplicates

    System.out.println("Initial ArrayList: " + cars); // Output: [Volvo, BMW, Ford, Mazda, Volvo]

    // 2. Accessing an element (get)
    String firstCar = cars.get(0);
    System.out.println("First car: " + firstCar); // Output: Volvo

    // 3. Modifying an element (set)
    cars.set(1, "Mercedes"); // Replace BMW with Mercedes
    System.out.println("ArrayList after setting index 1: " + cars); // Output: [Volvo, Mercedes, Ford, Mazda, Volvo]

    // 4. Removing an element by index
    cars.remove(3); // Remove element at index 3 (Mazda)
    System.out.println("ArrayList after removing index 3: " + cars); // Output: [Volvo, Mercedes, Ford, Volvo]

    // 5. Removing an element by value (first occurrence)
    cars.remove("Volvo"); // Removes the first "Volvo"
    System.out.println("ArrayList after removing first 'Volvo': " + cars); // Output: [Mercedes, Ford, Volvo]

    // 6. Getting the size of the ArrayList
    System.out.println("Size of ArrayList: " + cars.size()); // Output: 3

    // 7. Checking if an element exists
    System.out.println("Contains 'Ford'? " + cars.contains("Ford")); // Output: true
    System.out.println("Contains 'Audi'? " + cars.contains("Audi")); // Output: false

    // 8. Iterating through the ArrayList
    System.out.println("\nCars in the list:");
    for (String car : cars) {
      System.out.println("- " + car);
    }
    // Using a traditional for loop
    System.out.println("\nCars in the list (traditional for loop):");
    for (int i = 0; i < cars.size(); i++) {
      System.out.println("Index " + i + ": " + cars.get(i));
    }

    // 9. Clearing the ArrayList
    cars.clear();
    System.out.println("\nArrayList after clearing: " + cars); // Output: []
    System.out.println("Is ArrayList empty? " + cars.isEmpty()); // Output: true
  }
}
\`\`\`

## Initial Capacity

When you create an 'ArrayList', you can optionally specify an initial capacity. If you know approximately how many elements you'll store, setting an initial capacity can reduce the number of reallocations (resizing operations), which can improve performance.

\`\`\`java
import java.util.ArrayList;

public class ArrayListCapacityExample {
  public static void main(String[] args) {
    // Create an ArrayList with an initial capacity of 20
    ArrayList<String> largeList = new ArrayList<>(20); 

    largeList.add("Item 1");
    largeList.add("Item 2");
    // ... add many more items without immediate resizing
    System.out.println("Size of largeList: " + largeList.size()); // Output: 2
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: When to Prefer 'ArrayList'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        'ArrayList' is generally the default choice for a 'List' implementation due to its excellent performance for random access ('get(index)') and iteration. If your application primarily involves fetching elements by index or looping through the collection, 'ArrayList' is usually the most efficient option.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Performance for Middle Insertions/Deletions</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be cautious when performing frequent insertions or deletions in the middle of an 'ArrayList'. Since elements are stored contiguously, these operations require shifting all subsequent elements, leading to O(n) time complexity. If your application frequently modifies the middle of the list, 'LinkedList' might be a more suitable choice.
    </div>
</div>
`;

export default function JavaArrayListPage() {
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
          prevLesson="java-list"
          nextLesson="java-linkedlist"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
