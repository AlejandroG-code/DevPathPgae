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
# Java LinkedHashMap

The 'LinkedHashMap' class is an implementation of the 'Map' interface that combines the features of 'HashMap' and 'LinkedList'. It stores key-value pairs like a 'HashMap' but also maintains the **insertion order** of entries, similar to how 'LinkedHashSet' maintains element order.

## Key Characteristics of 'LinkedHashMap':

-   **Key-Value Pairs:** Stores data as pairs of a unique key and its associated value.
-   **No Duplicate Keys:** Each key in a 'LinkedHashMap' must be unique. If you 'put' a new value with an existing key, the old value associated with that key is replaced.
-   **Maintains Insertion Order:** This is its primary distinction from 'HashMap'. When you iterate over a 'LinkedHashMap', the entries will be returned in the order in which they were inserted. If a key is re-inserted (i.e., its value is updated), its insertion order is generally preserved unless explicitly re-added after removal.
-   **Null Keys and Values:** 'LinkedHashMap' allows one 'null' key and multiple 'null' values.
-   **Non-Synchronized:** 'LinkedHashMap' is not thread-safe. External synchronization is required for concurrent access in multi-threaded environments.
-   **Performance:** Offers constant-time performance (O(1)) for basic operations ('put', 'get', 'remove', 'containsKey', 'size') on average, similar to 'HashMap'. The overhead of maintaining the linked list for order is minimal.

## How 'LinkedHashMap' Works

Internally, 'LinkedHashMap' uses a hash table (like 'HashMap') for fast lookups and a doubly-linked list to maintain the insertion order of entries. When an entry is added, it is placed into the hash table (for O(1) access) and also linked into the end of the list. This dual structure allows it to provide both fast lookups and ordered iteration.

## When to Use 'LinkedHashMap'?

'LinkedHashMap' is the best choice when:
-   You need to store key-value pairs.
-   You need the fast average-case performance of a hash map for lookups and modifications.
-   You need the map to maintain the order in which entries were inserted (or accessed, if configured as an access-ordered map).

## Common Methods of 'LinkedHashMap'

'LinkedHashMap' implements all methods from the 'Map' interface and shares most of its method signatures and average-case time complexities with 'HashMap'. The key difference lies in the iteration order.

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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'put(K key, V value)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Associates the specified value with the specified key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'get(Object key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the value to which the specified key is mapped, or 'null' if not found.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(Object key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the mapping for a key from this map if present.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'containsKey(Object key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this map contains a mapping for the specified key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'size()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the number of key-value mappings in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'clear()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes all of the mappings from this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'entrySet()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a 'Set' view of the mappings contained in this map, in insertion order.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) for view, O(n) for iteration</td>
        </tr>
    </tbody>
</table>

## Example: Using 'LinkedHashMap' (Insertion Order)

\`\`\`java
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapExample {
  public static void main(String[] args) {
    // Creating a LinkedHashMap with String keys and Integer values
    Map<String, Integer> studentScores = new LinkedHashMap<>();

    // 1. Adding elements (key-value pairs)
    studentScores.put("Alice", 90);
    studentScores.put("Bob", 85);
    studentScores.put("Charlie", 92);
    studentScores.put("David", 78);

    System.out.println("Initial LinkedHashMap (insertion order): " + studentScores); 
    // Output: {Alice=90, Bob=85, Charlie=92, David=78} (order is guaranteed)

    // 2. Updating an existing key
    studentScores.put("Alice", 95); // Updates Alice's score
    System.out.println("After updating Alice's score: " + studentScores); 
    // Output: {Alice=95, Bob=85, Charlie=92, David=78} (order remains insertion order)

    // 3. Getting a value by key
    Integer bobScore = studentScores.get("Bob");
    System.out.println("Bob's score: " + bobScore); // Output: 85

    // 4. Removing an entry
    studentScores.remove("Charlie");
    System.out.println("Map after removing Charlie: " + studentScores); 
    // Output: {Alice=95, Bob=85, David=78} (order remains insertion order)

    // 5. Iterating through the LinkedHashMap (insertion order is guaranteed)
    System.out.println("\nIterating through Map entries (insertion order):");
    for (Map.Entry<String, Integer> entry : studentScores.entrySet()) {
      System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
    }
    // Output:
    // Key: Alice, Value: 95
    // Key: Bob, Value: 85
    // Key: David, Value: 78

    // 6. Clearing the LinkedHashMap
    studentScores.clear();
    System.out.println("\nLinkedHashMap after clearing: " + studentScores); // Output: {}
    System.out.println("Is LinkedHashMap empty? " + studentScores.isEmpty()); // Output: true
  }
}
\`\`\`

## 'LinkedHashMap' as an Access-Ordered Cache (Least Recently Used - LRU)

'LinkedHashMap' has a special constructor that allows it to maintain order based on access (last-accessed element moves to the end of the list), rather than insertion order. This makes it very useful for implementing **Least Recently Used (LRU) caches**.

The constructor is: 'LinkedHashMap(int initialCapacity, float loadFactor, boolean accessOrder)'.
-   'accessOrder = true' for access-order.
-   'accessOrder = false' (default) for insertion-order.

\`\`\`java
import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCacheExample {
  public static void main(String[] args) {
    // Create a LinkedHashMap with accessOrder = true for LRU behavior
    // Capacity 3, so when a 4th element is added, the least recently accessed is removed.
    Map<String, String> lruCache = new LinkedHashMap<>(3, 0.75f, true) {
      @Override
      protected boolean removeEldestEntry(Map.Entry<String, String> eldest) {
        // This method is called by put and putAll after inserting a new entry.
        // Return true to remove the eldest entry (LRU behavior).
        return size() > 3; // Keep only 3 entries
      }
    };

    lruCache.put("key1", "value1");
    lruCache.put("key2", "value2");
    lruCache.put("key3", "value3");
    System.out.println("Initial Cache: " + lruCache); // Output: {key1=value1, key2=value2, key3=value3}

    // Access key1 - it should move to the end of the access order
    lruCache.get("key1"); 
    System.out.println("After accessing key1: " + lruCache); // Output: {key2=value2, key3=value3, key1=value1}

    // Add a new entry - key2 (eldest) should be removed
    lruCache.put("key4", "value4");
    System.out.println("After adding key4: " + lruCache); // Output: {key3=value3, key1=value1, key4=value4} (key2 removed)

    // Access key3 - it should move to the end
    lruCache.get("key3");
    System.out.println("After accessing key3: " + lruCache); // Output: {key1=value1, key4=value4, key3=value3}
  }
}
\`\`\`

## Important: 'hashCode()' and 'equals()' for Custom Keys

As with 'HashMap', when using custom objects as **keys** in a 'LinkedHashMap', it is absolutely critical that you correctly override both the 'hashCode()' and 'equals()' methods in your key class. The same rules and consequences apply.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: When Order Matters for Maps</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        If you need a 'Map' (key-value pairs) and the order in which entries are added (or accessed, for LRU) is important for iteration or display purposes, 'LinkedHashMap' is the ideal choice. It provides the fast lookup of a hash map while preserving the desired order.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Performance for Iteration vs. Lookup</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While 'LinkedHashMap' provides O(1) average time for 'put', 'get', and 'remove', its iteration performance is proportional to the number of entries, not the capacity (like 'HashMap'). This means iterating over a 'LinkedHashMap' is generally faster than iterating over a 'HashMap' if the 'HashMap' has a much larger capacity than its actual size. However, for individual lookups, both are O(1) on average.
    </div>
</div>
`;

export default function JavaLinkedHashMapPage() {
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
          prevLesson="java-treemap"
          nextLesson="java-iterator" // Moving to Part 8 as per the order
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
