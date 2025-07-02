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
# Java Iterator

The 'Iterator' interface ('java.util.Iterator') is a fundamental part of the Java Collections Framework. It provides a standard way to traverse (iterate over) elements in a collection, regardless of the collection's underlying implementation (e.g., 'ArrayList', 'HashSet', 'LinkedList'). It allows you to access elements sequentially and, importantly, to safely remove elements from the underlying collection during iteration.

## Why Use Iterator?

-   **Standardization:** Provides a universal way to access elements in any collection that implements the 'Iterable' interface.
-   **Safety for Removal:** It's the only safe way to remove elements from a collection during iteration without encountering a 'ConcurrentModificationException'.
-   **Abstraction:** Decouples the iteration logic from the specific collection type.

## Key Methods of the 'Iterator' Interface

The 'Iterator' interface defines three core methods:

1.  **'hasNext()'**: Returns 'true' if the iteration has more elements. (Equivalent to checking if there's a next element to read).
2.  **'next()'**: Returns the next element in the iteration. Throws 'NoSuchElementException' if there are no more elements.
3.  **'remove()'**: Removes the last element returned by 'next()' from the underlying collection. This method can be called only once per call to 'next()'. Throws 'IllegalStateException' if 'next()' has not yet been called, or if 'remove()' has already been called after the last call to 'next()'.

## Iterating with 'Iterator'

While the enhanced 'for-each' loop (introduced in Java 5) is often more convenient for simple iteration, the 'Iterator' is essential for specific scenarios, particularly when you need to remove elements during iteration.

### Example: Iterating and Removing from a 'List'

\`\`\`java
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ListIteratorExample {
  public static void main(String[] args) {
    List<String> fruits = new ArrayList<>();
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Cherry");
    fruits.add("Apple"); // Duplicate
    fruits.add("Date");

    System.out.println("Original List: " + fruits); // Output: [Apple, Banana, Cherry, Apple, Date]

    // Get an Iterator for the list
    Iterator<String> iterator = fruits.iterator();

    System.out.println("\nIterating and conditionally removing 'Apple':");
    while (iterator.hasNext()) {
      String fruit = iterator.next();
      System.out.println("Processing: " + fruit);
      if ("Apple".equals(fruit)) {
        iterator.remove(); // Safely remove the current element
        System.out.println("  --> Removed 'Apple'");
      }
    }

    System.out.println("List after removal: " + fruits); // Output: [Banana, Cherry, Date]

    // Attempting to remove after iteration or without next()
    try {
      iterator.remove(); // This will throw IllegalStateException
    } catch (IllegalStateException e) {
      System.out.println("Caught expected exception: " + e.getMessage());
    }

    // Demonstrating ConcurrentModificationException if not using Iterator.remove()
    List<Integer> numbers = new ArrayList<>();
    numbers.add(1);
    numbers.add(2);
    numbers.add(3);
    numbers.add(4);

    System.out.println("\nDemonstrating ConcurrentModificationException:");
    try {
      for (Integer num : numbers) { // Using for-each loop
        if (num == 2) {
          numbers.remove(num); // This modifies the list while iterating with for-each
        }
      }
    } catch (Exception e) {
      System.out.println("Caught: " + e.getClass().getSimpleName() + " - " + e.getMessage());
      // Output: Caught: ConcurrentModificationException - null
    }
    System.out.println("Numbers after problematic removal attempt: " + numbers);
  }
}
\`\`\`

### Example: Iterating a 'Set'

Sets do not have an inherent order, but 'Iterator' still provides a way to traverse all unique elements.

\`\`\`java
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class SetIteratorExample {
  public static void main(String[] args) {
    Set<String> uniqueColors = new HashSet<>();
    uniqueColors.add("Red");
    uniqueColors.add("Green");
    uniqueColors.add("Blue");
    uniqueColors.add("Red"); // Duplicate, ignored

    System.out.println("Original Set: " + uniqueColors); // Order not guaranteed

    Iterator<String> iterator = uniqueColors.iterator();

    System.out.println("\nIterating through Set elements:");
    while (iterator.hasNext()) {
      String color = iterator.next();
      System.out.println("Color: " + color);
      if ("Green".equals(color)) {
        iterator.remove(); // Safely remove "Green"
        System.out.println("  --> Removed 'Green'");
      }
    }
    System.out.println("Set after removal: " + uniqueColors); // Order not guaranteed, "Green" is gone
  }
}
\`\`\`

### Example: Iterating a 'Map'

To iterate over a 'Map', you typically obtain an 'Iterator' for its key set, value collection, or entry set. The 'entrySet()' method, which returns a 'Set' of 'Map.Entry' objects, is often the most versatile for iterating over both keys and values.

\`\`\`java
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class MapIteratorExample {
  public static void main(String[] args) {
    Map<String, Integer> studentGrades = new HashMap<>();
    studentGrades.put("Alice", 90);
    studentGrades.put("Bob", 85);
    studentGrades.put("Charlie", 92);
    studentGrades.put("David", 78);

    System.out.println("Original Map: " + studentGrades); // Order not guaranteed

    // Get an Iterator for the entry set (key-value pairs)
    Iterator<Map.Entry<String, Integer>> entryIterator = studentGrades.entrySet().iterator();

    System.out.println("\nIterating through Map entries:");
    while (entryIterator.hasNext()) {
      Map.Entry<String, Integer> entry = entryIterator.next();
      System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
      
      // Safely remove entries with a grade less than 80
      if (entry.getValue() < 80) {
        entryIterator.remove();
        System.out.println("  --> Removed entry for " + entry.getKey());
      }
    }
    System.out.println("Map after conditional removal: " + studentGrades); 
    // Output: {Alice=90, Bob=85, Charlie=92} (David=78 removed)

    // Iterating over keys only
    System.out.println("\nIterating through Map keys:");
    Iterator<String> keyIterator = studentGrades.keySet().iterator();
    while (keyIterator.hasNext()) {
      String key = keyIterator.next();
      System.out.println("Key: " + key);
    }

    // Iterating over values only
    System.out.println("\nIterating through Map values:");
    Iterator<Integer> valueIterator = studentGrades.values().iterator();
    while (valueIterator.hasNext()) {
      Integer value = valueIterator.next();
      System.out.println("Value: " + value);
    }
  }
}
\`\`\`

## 'Iterator' vs. Enhanced 'for-each' Loop

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'Iterator'</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Enhanced 'for-each' Loop</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removal during iteration</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Yes, safely using 'iterator.remove()'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No, throws 'ConcurrentModificationException' if collection is modified.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Read-only access</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Yes, can be used for read-only traversal.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Yes, designed for simple read-only traversal.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Syntax</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">More verbose ('hasNext()', 'next()').</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">More concise and readable.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Underlying mechanism</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Directly interacts with the collection's iterator.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Internally uses an 'Iterator'.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Index access</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No direct index access.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No direct index access.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Prefer 'for-each' for Simple Traversal</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For most simple iteration tasks where you just need to read elements from a collection, the enhanced 'for-each' loop is more concise and readable. It's the preferred way to iterate unless you specifically need to remove elements during iteration or perform more complex operations that require the 'Iterator' interface's explicit control.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'ConcurrentModificationException'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Modifying a collection directly (e.g., using 'list.remove()' or 'list.add()') while it is being iterated over by an 'Iterator' (including the hidden iterator used by a 'for-each' loop) will almost always result in a 'ConcurrentModificationException'. The only safe way to modify a collection during iteration is by using the 'iterator.remove()' method. If you need to add elements during iteration, you typically need to collect elements to add in a separate list and then add them after the iteration is complete.
    </div>
</div>
`;

export default function JavaIteratorPage() {
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
          prevLesson="java-linkedhashmap"
          nextLesson="java-wrapper-classes"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
