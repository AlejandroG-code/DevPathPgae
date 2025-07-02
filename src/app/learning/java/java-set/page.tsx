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
# Java Set Interface

The 'Set' interface is a fundamental part of the Java Collections Framework, extending the 'Collection' interface. It represents a collection that contains **no duplicate elements**. It models the mathematical set abstraction.

## Key Characteristics of 'Set':

-   **No Duplicates:** The most defining characteristic is that a 'Set' cannot contain duplicate elements. If you try to add an element that already exists in the set, the 'add()' method will return 'false', and the set will remain unchanged.
-   **No Inherent Order (generally):** Unlike 'List', a 'Set' generally does not maintain the insertion order of elements. The order of elements when iterating over a 'Set' is usually not guaranteed (except for specific implementations like 'LinkedHashSet' and 'TreeSet').
-   **Unindexed:** Elements cannot be accessed by their numerical index, as there is no concept of position in a mathematical set.

## When to Use 'Set'?

'Set' is ideal when:
-   You need to store a collection of unique items.
-   You want to quickly check for the presence of an item.
-   The order of elements is not important (or you need a specific sorted order, which 'TreeSet' provides).

## Common 'Set' Implementations

The 'Set' interface is implemented by several concrete classes, each with different performance characteristics and ordering guarantees:

-   **'HashSet'**: (Most commonly used) Uses a hash table for storage. It offers constant-time performance (O(1)) for basic operations (add, remove, contains, size) on average, assuming a good hash function. It does not guarantee any specific order of elements.
-   **'LinkedHashSet'**: Extends 'HashSet' and maintains a doubly-linked list running through its elements. This preserves the insertion order of elements. It has slightly higher overhead than 'HashSet' but provides predictable iteration order.
-   **'TreeSet'**: Stores elements in a sorted order. It uses a Red-Black Tree data structure internally. Elements are sorted either according to their natural ordering (if they implement 'Comparable') or by a 'Comparator' provided at set creation time. It offers guaranteed log(n) time performance for basic operations.

We will delve into 'HashSet', 'LinkedHashSet', and 'TreeSet' in more detail in subsequent lessons.

## Common Methods of the 'Set' Interface

The 'Set' interface provides methods for manipulating elements, primarily focusing on uniqueness and membership testing. It inherits many methods from the 'Collection' interface.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Time Complexity (HashSet / TreeSet)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'add(E e)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Adds the specified element to this set if it is not already present. Returns 'true' if the set did not already contain the specified element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average / O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the specified element from this set if it is present. Returns 'true' if the set contained the specified element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average / O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'contains(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this set contains the specified element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average / O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'size()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the number of elements in this set.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) / O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'isEmpty()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this set contains no elements.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) / O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'clear()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes all of the elements from this set.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) / O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'iterator()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns an iterator over the elements in this set.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) / O(1)</td>
        </tr>
    </tbody>
</table>

## Example: Basic 'Set' Operations (using 'HashSet')

Since 'HashSet' is the most common implementation due to its performance, we'll use it to demonstrate 'Set' operations.

\`\`\`java
import java.util.HashSet;
import java.util.Set; // Good practice to program to the interface

public class SetExample {
  public static void main(String[] args) {
    // Declare a Set of Strings (programming to the interface)
    Set<String> uniqueColors = new HashSet<>();

    // 1. Add elements
    uniqueColors.add("Red");
    uniqueColors.add("Green");
    uniqueColors.add("Blue");
    uniqueColors.add("Red"); // Attempt to add duplicate - will be ignored

    System.out.println("Initial Set: " + uniqueColors); // Output: [Red, Green, Blue] (order not guaranteed)

    // 2. Check if adding a duplicate was successful
    boolean addedDuplicate = uniqueColors.add("Red");
    System.out.println("Was 'Red' added again? " + addedDuplicate); // Output: false

    boolean addedNew = uniqueColors.add("Yellow");
    System.out.println("Was 'Yellow' added? " + addedNew); // Output: true
    System.out.println("Set after adding Yellow: " + uniqueColors); // Output: [Red, Green, Blue, Yellow] (order not guaranteed)

    // 3. Check size
    System.out.println("Current size of set: " + uniqueColors.size()); // Output: 4

    // 4. Check if contains
    System.out.println("Does set contain 'Blue'? " + uniqueColors.contains("Blue")); // Output: true
    System.out.println("Does set contain 'Purple'? " + uniqueColors.contains("Purple")); // Output: false

    // 5. Remove an element
    boolean removedGreen = uniqueColors.remove("Green");
    System.out.println("Was 'Green' removed? " + removedGreen); // Output: true
    System.out.println("Set after removing Green: " + uniqueColors); // Output: [Red, Blue, Yellow] (order not guaranteed)

    boolean removedNonExistent = uniqueColors.remove("Orange");
    System.out.println("Was 'Orange' removed? " + removedNonExistent); // Output: false

    // 6. Iterate through the Set (order not guaranteed for HashSet)
    System.out.println("Colors in the set:");
    for (String color : uniqueColors) {
      System.out.println("- " + color);
    }
    // Example Output:
    // - Red
    // - Blue
    // - Yellow

    // 7. Clear the set
    uniqueColors.clear();
    System.out.println("Set after clearing: " + uniqueColors); // Output: []
    System.out.println("Is set empty? " + uniqueColors.isEmpty()); // Output: true
  }
}
\`\`\`

## 'Set' for Mathematical Operations

The 'Set' interface also supports bulk operations that correspond to common mathematical set operations:

-   'addAll(Collection<?> c)': Union (adds all elements from another collection).
-   'retainAll(Collection<?> c)': Intersection (retains only elements that are common to both sets).
-   'removeAll(Collection<?> c)': Difference (removes all elements from this set that are contained in another collection).

**Example: Set Operations**

\`\`\`java
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class SetOperationsExample {
  public static void main(String[] args) {
    Set<Integer> set1 = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
    Set<Integer> set2 = new HashSet<>(Arrays.asList(4, 5, 6, 7, 8));

    System.out.println("Set 1: " + set1); // Output: [1, 2, 3, 4, 5] (order may vary)
    System.out.println("Set 2: " + set2); // Output: [4, 5, 6, 7, 8] (order may vary)

    // Union (elements in set1 OR set2)
    Set<Integer> union = new HashSet<>(set1);
    union.addAll(set2);
    System.out.println("Union (set1 U set2): " + union); // Output: [1, 2, 3, 4, 5, 6, 7, 8]

    // Intersection (elements in set1 AND set2)
    Set<Integer> intersection = new HashSet<>(set1);
    intersection.retainAll(set2);
    System.out.println("Intersection (set1 \\u2229 set2): " + intersection); // Output: [4, 5]

    // Difference (elements in set1 BUT NOT in set2)
    Set<Integer> difference = new HashSet<>(set1);
    difference.removeAll(set2);
    System.out.println("Difference (set1 - set2): " + difference); // Output: [1, 2, 3]

    // Symmetric Difference (elements in set1 OR set2, but NOT in both)
    Set<Integer> symmetricDifference = new HashSet<>(union);
    symmetricDifference.removeAll(intersection);
    System.out.println("Symmetric Difference: " + symmetricDifference); // Output: [1, 2, 3, 6, 7, 8]
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use 'Set' for Uniqueness</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Whenever your requirement is to store a collection of unique items and you need fast lookups (checking if an item exists), a 'Set' is the ideal data structure. This is a common use case for tasks like tracking visited items, unique identifiers, or filtering duplicates from a list.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Element Equality for 'Set'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For 'HashSet' and 'LinkedHashSet', the uniqueness of elements is determined by the 'equals()' and 'hashCode()' methods of the objects you store. If you store custom objects in a 'Set', you *must* properly override both 'equals()' and 'hashCode()' methods in your custom class. Failing to do so can lead to duplicate elements being stored or 'contains()' returning incorrect results. For 'TreeSet', uniqueness and order are determined by 'compareTo()' (if 'Comparable') or 'compare()' (if 'Comparator').
    </div>
</div>
`;

export default function JavaSetPage() {
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
          prevLesson="java-list-sorting"
          nextLesson="java-hashset"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
