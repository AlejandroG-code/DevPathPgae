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
# Java LinkedList

The 'LinkedList' class is another important implementation of the 'List' interface in the Java Collections Framework. Unlike 'ArrayList' which uses a dynamic array, 'LinkedList' uses a **doubly-linked list** data structure. This means each element (node) in the list stores not only the data but also references to the previous and next nodes in the sequence.

## Key Characteristics of 'LinkedList':

-   **Doubly-Linked List:** Elements are linked together using pointers. Each node has a reference to its predecessor and successor.
-   **Ordered:** Elements maintain their insertion order.
-   **Allows Duplicates:** You can store the same element multiple times.
-   **Index-based Access:** Elements can be accessed by their numerical index, but this is less efficient than in 'ArrayList'.
-   **Non-Synchronized:** 'LinkedList' is not thread-safe. If multiple threads access a 'LinkedList' concurrently and at least one of them modifies the list, it must be synchronized externally.
-   **Implements 'Deque'**: 'LinkedList' also implements the 'Deque' (Double Ended Queue) interface, meaning it can be used as both a Queue (FIFO) and a Stack (LIFO).

## When to Use 'LinkedList'?

'LinkedList' is generally a good choice when:
-   You need frequent insertions or deletions in the middle of the list.
-   You need to use the list as a Queue or a Stack.
-   You don't need frequent random access to elements by index.

## Common Methods of 'LinkedList'

'LinkedList' inherits and implements all methods from the 'List' interface, and also provides additional methods from the 'Deque' interface for operations at both ends. Here are some of the most frequently used ones, along with their typical time complexities:

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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'add(int index, E element)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inserts the specified element at the specified position in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) (to find index), O(1) (for insertion)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'addFirst(E e)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inserts the specified element at the beginning of this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'addLast(E e)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Appends the specified element to the end of this list. Identical to 'add(E e)'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'get(int index)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the element at the specified position in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'getFirst()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the first element in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'getLast()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the last element in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(int index)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the element at the specified position in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) (to find index), O(1) (for removal)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'removeFirst()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes and returns the first element from this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'removeLast()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes and returns the last element from this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'size()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the number of elements in this list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
    </tbody>
</table>

## Example: Using 'LinkedList'

\`\`\`java
import java.util.LinkedList;
import java.util.List; // Good practice to program to the interface
import java.util.Queue; // For demonstrating Queue functionality
import java.util.Deque; // For demonstrating Deque/Stack functionality

public class LinkedListExample {
  public static void main(String[] args) {
    // Creating a LinkedList of Strings
    List<String> cities = new LinkedList<>();

    // 1. Adding elements (List methods)
    cities.add("New York");
    cities.add("London");
    cities.add("Paris");
    cities.add("Tokyo");

    System.out.println("Initial LinkedList: " + cities); // Output: [New York, London, Paris, Tokyo]

    // 2. Adding elements at specific positions (LinkedList/Deque methods)
    ((LinkedList<String>) cities).addFirst("Berlin"); // Casting to LinkedList to access specific methods
    ((LinkedList<String>) cities).addLast("Rome");
    cities.add(2, "Sydney"); // Add at index 2

    System.out.println("LinkedList after various additions: " + cities); 
    // Output: [Berlin, New York, Sydney, London, Paris, Tokyo, Rome]

    // 3. Accessing elements
    System.out.println("First city: " + ((LinkedList<String>) cities).getFirst()); // Output: Berlin
    System.out.println("Last city: " + ((LinkedList<String>) cities).getLast());   // Output: Rome
    System.out.println("City at index 3: " + cities.get(3)); // Output: London (O(n) operation)

    // 4. Removing elements
    ((LinkedList<String>) cities).removeFirst(); // Remove Berlin
    System.out.println("After removing first: " + cities); // Output: [New York, Sydney, London, Paris, Tokyo, Rome]

    cities.remove("Tokyo"); // Remove by object
    System.out.println("After removing Tokyo: " + cities); // Output: [New York, Sydney, London, Paris, Rome]

    cities.remove(1); // Remove element at index 1 (Sydney)
    System.out.println("After removing index 1: " + cities); // Output: [New York, London, Paris, Rome]

    // 5. Using LinkedList as a Queue (FIFO)
    System.out.println("\n--- Using LinkedList as a Queue ---");
    Queue<String> queueOfCities = new LinkedList<>();
    queueOfCities.offer("Customer 1"); // Add to end (tail)
    queueOfCities.offer("Customer 2");
    queueOfCities.offer("Customer 3");
    System.out.println("Queue: " + queueOfCities); // Output: [Customer 1, Customer 2, Customer 3]
    System.out.println("Served: " + queueOfCities.poll()); // Remove from front (head) -> Customer 1
    System.out.println("Queue after poll: " + queueOfCities); // Output: [Customer 2, Customer 3]

    // 6. Using LinkedList as a Stack (LIFO)
    System.out.println("\n--- Using LinkedList as a Stack ---");
    Deque<String> stackOfTasks = new LinkedList<>();
    stackOfTasks.push("Task A"); // Add to front (top of stack)
    stackOfTasks.push("Task B");
    stackOfTasks.push("Task C");
    System.out.println("Stack: " + stackOfTasks); // Output: [Task C, Task B, Task A]
    System.out.println("Completed: " + stackOfTasks.pop()); // Remove from front (top) -> Task C
    System.out.println("Stack after pop: " + stackOfTasks); // Output: [Task B, Task A]
  }
}
\`\`\`

## 'ArrayList' vs. 'LinkedList' - A Comparison

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'ArrayList'</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'LinkedList'</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Internal Structure</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Dynamic array (contiguous memory)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Doubly-linked list (nodes with pointers)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Random Access ('get(index)')</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fast (O(1))</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Slow (O(n))</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Insertion/Deletion (Middle)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Slow (O(n) - requires shifting)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fast (O(1) - just pointer manipulation, after finding node)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Insertion/Deletion (Ends)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fast (O(1) amortized)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fast (O(1))</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Memory Overhead</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less (only data)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">More (data + two pointers per node)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Use as Queue/Stack</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Not ideal (use 'ArrayDeque')</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Excellent ('implements Deque')</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Choose Based on Operations</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The choice between 'ArrayList' and 'LinkedList' depends heavily on the most frequent operations your application will perform.
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>If you primarily need to access elements by index or iterate over the list, choose 'ArrayList'.</li>
            <li>If you frequently add or remove elements from the beginning, end, or middle of the list, choose 'LinkedList'.</li>
        </ul>
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'get(index)' Performance</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While 'LinkedList' supports 'get(int index)', this operation requires traversing the list from the beginning or end until the specified index is reached. This makes it an O(n) operation, which can be very slow for large lists and frequent random access. Avoid using 'LinkedList' if your primary use case involves random access.
    </div>
</div>
`;

export default function JavaLinkedListPage() {
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
          prevLesson="java-arraylist"
          nextLesson="java-list-sorting" // Moving to Part 7 as per the order
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
