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
# Java Collections Framework

The **Java Collections Framework (JCF)** is a set of interfaces and classes that provide a unified architecture for representing and manipulating collections of objects. It offers a rich set of data structures and algorithms that are highly optimized and widely used in Java applications.

## Why Use the Collections Framework?

-   **Reduced Programming Effort:** Provides ready-to-use data structures, so you don't have to implement them from scratch.
-   **Increased Performance:** Implementations are highly optimized for common operations.
-   **Interoperability:** Establishes a common API for collections, allowing different types of collections to be used interchangeably when appropriate.
-   **Code Reusability:** Promotes reusable code across different applications.

## Core Interfaces of the Collections Framework

The JCF is built around several core interfaces, which define the fundamental types of collections. These interfaces are then implemented by various concrete classes.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Interface</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Key Characteristics</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Common Implementations</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Collection'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">The root interface for all collection types. Represents a group of objects.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Basic operations like 'add', 'remove', 'size', 'isEmpty'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Implemented by 'List', 'Set', 'Queue'.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'List'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">An ordered collection (sequence) that allows duplicate elements. Elements can be accessed by their integer index.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Maintains insertion order, allows duplicates, index-based access.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'ArrayList', 'LinkedList', 'Vector'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Set'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A collection that contains no duplicate elements.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No duplicates, order generally not guaranteed (except for 'LinkedHashSet' and 'TreeSet').</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'HashSet', 'LinkedHashSet', 'TreeSet'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Queue'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A collection designed for holding elements prior to processing. Typically, elements are added at one end (the 'tail') and removed from the other end (the 'head') (FIFO - First-In, First-Out).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">FIFO behavior, supports 'offer', 'poll', 'peek' operations.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'LinkedList', 'ArrayDeque', 'PriorityQueue'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Map'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">An object that maps keys to values. A 'Map' cannot contain duplicate keys; each key can map to at most one value.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Stores key-value pairs, unique keys, no inherent order (except for 'LinkedHashMap' and 'TreeMap').</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'HashMap', 'LinkedHashMap', 'TreeMap', 'Hashtable'</td>
        </tr>
    </tbody>
</table>

---

## 1. The 'Collection' Interface (Root)

The 'Collection' interface is the root of the collection hierarchy. It defines the common behavior for all collections that store a group of objects. You rarely implement 'Collection' directly; instead, you work with its sub-interfaces ('List', 'Set', 'Queue').

**Common Methods:**
-   'add(E e)': Adds an element.
-   'remove(Object o)': Removes an element.
-   'contains(Object o)': Checks if an element exists.
-   'size()': Returns the number of elements.
-   'isEmpty()': Checks if the collection is empty.
-   'clear()': Removes all elements.

**Example (using 'ArrayList' which implements 'List' which extends 'Collection'):**

\`\`\`java
import java.util.ArrayList;
import java.util.Collection;

public class CollectionExample {
  public static void main(String[] args) {
    Collection<String> fruits = new ArrayList<>(); // Using Collection interface

    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Cherry");

    System.out.println("Fruits collection: " + fruits); // Output: [Apple, Banana, Cherry]
    System.out.println("Size: " + fruits.size());     // Output: 3
    System.out.println("Contains 'Banana'? " + fruits.contains("Banana")); // Output: true

    fruits.remove("Banana");
    System.out.println("After removing Banana: " + fruits); // Output: [Apple, Cherry]
    System.out.println("Is empty? " + fruits.isEmpty());   // Output: false

    fruits.clear();
    System.out.println("After clearing: " + fruits);     // Output: []
    System.out.println("Is empty? " + fruits.isEmpty()); // Output: true
  }
}
\`\`\`

---

## 2. The 'List' Interface

The 'List' interface extends 'Collection' and represents an ordered collection (also known as a sequence). It allows duplicate elements and provides index-based access.

**Key characteristics:**
-   **Ordered:** Elements maintain their insertion order.
-   **Allows Duplicates:** You can store the same element multiple times.
-   **Index-based access:** Elements can be accessed by their integer index (0 to size-1).

**Common Implementations:**
-   **'ArrayList'**: Resizable array implementation. Good for random access.
-   **'LinkedList'**: Doubly-linked list implementation. Good for insertions/deletions in the middle.
-   **'Vector'**: Legacy class, similar to 'ArrayList' but synchronized (thread-safe, but slower).

We will cover 'ArrayList' and 'LinkedList' in detail in upcoming lessons.

---

## 3. The 'Set' Interface

The 'Set' interface extends 'Collection' and represents a collection that contains no duplicate elements. The mathematical set abstraction.

**Key characteristics:**
-   **No Duplicates:** Each element in a 'Set' must be unique.
-   **No Order Guarantee (generally):** Elements are typically not stored in any specific order (except for 'LinkedHashSet' and 'TreeSet').

**Common Implementations:**
-   **'HashSet'**: Uses a hash table for storage. Offers constant-time performance for basic operations (add, remove, contains) on average. No guaranteed order.
-   **'LinkedHashSet'**: Extends 'HashSet' but maintains insertion order.
-   **'TreeSet'**: Stores elements in a sorted order (natural order or custom comparator). Provides guaranteed log(n) time performance for basic operations.

We will cover 'HashSet', 'TreeSet', and 'LinkedHashSet' in detail in upcoming lessons.

---

## 4. The 'Queue' Interface

The 'Queue' interface extends 'Collection' and represents a collection designed for holding elements prior to processing. It typically operates in a FIFO (First-In, First-Out) manner.

**Key characteristics:**
-   **FIFO (First-In, First-Out):** Elements are added to the rear and removed from the front.
-   **Head and Tail:** Operations typically involve the head (front) and tail (end) of the queue.

**Common Implementations:**
-   **'LinkedList'**: Can be used as a 'Queue'.
-   **'ArrayDeque'**: More efficient than 'LinkedList' for implementing queues (and stacks).
-   **'PriorityQueue'**: Elements are ordered according to their natural ordering, or by a 'Comparator' provided at queue construction time.

---

## 5. The 'Map' Interface

The 'Map' interface is **not** a sub-interface of 'Collection'. It represents an object that maps keys to values. A 'Map' cannot contain duplicate keys; each key can map to at most one value.

**Key characteristics:**
-   **Key-Value Pairs:** Stores data as pairs of keys and values.
-   **Unique Keys:** Each key must be unique.
-   **No Order Guarantee (generally):** Elements are typically not stored in any specific order (except for 'LinkedHashMap' and 'TreeMap').

**Common Implementations:**
-   **'HashMap'**: Uses a hash table. Offers constant-time performance for basic operations on average. No guaranteed order.
-   **'LinkedHashMap'**: Extends 'HashMap' but maintains insertion order.
-   **'TreeMap'**: Stores key-value pairs in a sorted order based on keys (natural order or custom comparator). Provides guaranteed log(n) time performance.
-   **'Hashtable'**: Legacy class, similar to 'HashMap' but synchronized and does not allow null keys or values.

We will cover 'HashMap', 'TreeMap', and 'LinkedHashMap' in detail in upcoming lessons.

---

## The 'Collections' Class (Utility Class)

Distinct from the 'Collection' interface, 'java.util.Collections' is a utility class that consists exclusively of static methods that operate on or return collections. It provides various algorithms like sorting, searching, shuffling, and methods to return thread-safe (synchronized) collections.

**Example:**

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CollectionsUtilityExample {
  public static void main(String[] args) {
    List<Integer> numbers = new ArrayList<>();
    numbers.add(5);
    numbers.add(2);
    numbers.add(8);
    numbers.add(1);

    System.out.println("Original List: " + numbers); // Output: [5, 2, 8, 1]

    // Sort the list
    Collections.sort(numbers);
    System.out.println("Sorted List: " + numbers);   // Output: [1, 2, 5, 8]

    // Find maximum element
    System.out.println("Max element: " + Collections.max(numbers)); // Output: 8

    // Reverse the list
    Collections.reverse(numbers);
    System.out.println("Reversed List: " + numbers); // Output: [8, 5, 2, 1]

    // Create an unmodifiable list
    List<String> unmodifiableList = Collections.unmodifiableList(List.of("A", "B", "C"));
    // unmodifiableList.add("D"); // This would throw UnsupportedOperationException
    System.out.println("Unmodifiable List: " + unmodifiableList); // Output: [A, B, C]
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Interface vs. Implementation</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When declaring collection variables, it's a best practice to program to the interface, not the implementation. For example, use 'List<String> myList = new ArrayList<>();' instead of 'ArrayList<String> myList = new ArrayList<>();'. This makes your code more flexible and easier to change the underlying implementation later without affecting the rest of your code.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Thread Safety</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Most of the core collection implementations ('ArrayList', 'HashMap', 'HashSet', 'LinkedList') are **not thread-safe**. If you are working in a multi-threaded environment and multiple threads might access and modify a collection concurrently, you must either:
        <ol class="list-decimal list-inside ml-4 mt-2 space-y-1">
            <li>Use synchronized wrappers provided by the 'Collections' utility class (e.g., 'Collections.synchronizedList(new ArrayList<>())').</li>
            <li>Use concurrent collections from the 'java.util.concurrent' package (e.g., 'ConcurrentHashMap', 'CopyOnWriteArrayList'), which offer better performance for concurrent access.</li>
        </ol>
    </div>
</div>
`;

export default function JavaCollectionsPage() {
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
          prevLesson="java-data-structures"
          nextLesson="java-list"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
