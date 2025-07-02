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
# Java LinkedHashSet

The 'LinkedHashSet' class is an implementation of the 'Set' interface that combines the features of 'HashSet' and 'LinkedList'. It stores unique elements like a 'HashSet' but also maintains the **insertion order** of elements, like a 'LinkedList'.

## Key Characteristics of 'LinkedHashSet':

-   **No Duplicates:** Like all 'Set' implementations, 'LinkedHashSet' does not allow duplicate elements.
-   **Maintains Insertion Order:** This is its primary distinction from 'HashSet'. When you iterate over a 'LinkedHashSet', the elements will be returned in the order in which they were inserted.
-   **Null Elements:** 'LinkedHashSet' allows one 'null' element.
-   **Non-Synchronized:** 'LinkedHashSet' is not thread-safe. External synchronization is required for concurrent access in multi-threaded environments.
-   **Performance:** Offers constant-time performance (O(1)) for basic operations ('add', 'remove', 'contains', 'size') on average, similar to 'HashSet'. The overhead of maintaining the linked list for order is minimal.

## How 'LinkedHashSet' Works

Internally, 'LinkedHashSet' uses a hash table (like 'HashMap') for fast lookups and a doubly-linked list to maintain the insertion order of elements. When an element is added, it is placed into the hash table (for O(1) access) and also linked into the end of the list.

## When to Use 'LinkedHashSet'?

'LinkedHashSet' is the best choice when:
-   You need to store a collection of unique elements.
-   You need to maintain the order in which elements were inserted.
-   You prioritize fast average-case performance for adding, removing, and checking for the presence of elements.

## Common Methods of 'LinkedHashSet'

'LinkedHashSet' implements all methods from the 'Set' interface. Its performance characteristics for basic operations are similar to 'HashSet'.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Time Complexity (Average)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'add(E e)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Adds the specified element to this set if it is not already present.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the specified element from this set if it is present.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'contains(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this set contains the specified element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'size()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the number of elements in this set.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'isEmpty()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this set contains no elements.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'clear()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes all of the elements from this set.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'iterator()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns an iterator over the elements in this set, in insertion order.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) for creation, O(n) for full traversal</td>
        </tr>
    </tbody>
</table>

## Example: Using 'LinkedHashSet'

\`\`\`java
import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetExample {
  public static void main(String[] args) {
    // Creating a LinkedHashSet of Strings
    Set<String> orderedFruits = new LinkedHashSet<>();

    // 1. Adding elements
    orderedFruits.add("Apple");
    orderedFruits.add("Banana");
    orderedFruits.add("Cherry");
    orderedFruits.add("Apple"); // Attempt to add duplicate - will be ignored
    orderedFruits.add("Date");

    System.out.println("Initial LinkedHashSet (insertion order maintained): " + orderedFruits); 
    // Output: [Apple, Banana, Cherry, Date] (order is guaranteed)

    // 2. Check if adding a duplicate was successful
    boolean addedDuplicate = orderedFruits.add("Banana");
    System.out.println("Was 'Banana' added again? " + addedDuplicate); // Output: false

    boolean addedNew = orderedFruits.add("Grape");
    System.out.println("Was 'Grape' added? " + addedNew); // Output: true
    System.out.println("Set after adding Grape: " + orderedFruits); 
    // Output: [Apple, Banana, Cherry, Date, Grape] (insertion order still maintained)

    // 3. Check size
    System.out.println("Current size of set: " + orderedFruits.size()); // Output: 5

    // 4. Check if contains
    System.out.println("Does set contain 'Cherry'? " + orderedFruits.contains("Cherry")); // Output: true

    // 5. Remove an element
    boolean removedDate = orderedFruits.remove("Date");
    System.out.println("Was 'Date' removed? " + removedDate); // Output: true
    System.out.println("Set after removing Date: " + orderedFruits); 
    // Output: [Apple, Banana, Cherry, Grape] (order still maintained)

    // 6. Iterating through the LinkedHashSet (order is guaranteed to be insertion order)
    System.out.println("\nFruits in the LinkedHashSet (iterating in insertion order):");
    for (String fruit : orderedFruits) {
      System.out.println("- " + fruit);
    }
    // Output:
    // - Apple
    // - Banana
    // - Cherry
    // - Grape

    // 7. Clearing the LinkedHashSet
    orderedFruits.clear();
    System.out.println("\nLinkedHashSet after clearing: " + orderedFruits); // Output: []
    System.out.println("Is LinkedHashSet empty? " + orderedFruits.isEmpty()); // Output: true
  }
}
\`\`\`

## 'LinkedHashSet' vs. 'HashSet' vs. 'TreeSet'

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'HashSet'</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'LinkedHashSet'</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'TreeSet'</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Order</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No guaranteed order.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Maintains insertion order.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Sorted (natural or custom comparator).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Duplicates</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Null Elements</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Allows one null.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Allows one null.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Does NOT allow null.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Internal Structure</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hash table</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hash table + Doubly-linked list</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Red-Black Tree</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Performance (add/remove/contains)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n) guaranteed</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: When Order Matters for Sets</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        If you need a 'Set' (unique elements) and the order in which elements are added is important for iteration or display purposes, 'LinkedHashSet' is the perfect choice. It provides the fast lookup of a hash table while preserving insertion order.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'hashCode()' and 'equals()' Still Critical</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Just like 'HashSet', 'LinkedHashSet' relies on the correct implementation of 'hashCode()' and 'equals()' methods for custom objects to ensure uniqueness and proper behavior. If these methods are not overridden correctly, 'LinkedHashSet' might store duplicate elements or fail to find existing ones.
    </div>
</div>
`;

export default function JavaLinkedHashSetPage() {
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
          prevLesson="java-treeset"
          nextLesson="java-map"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
