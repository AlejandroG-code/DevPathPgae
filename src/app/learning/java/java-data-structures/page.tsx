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
# Java Data Structures

**Data structures** are ways of organizing, managing, and storing data efficiently. They are fundamental concepts in computer science and programming, as the choice of data structure can significantly impact the performance and efficiency of an algorithm or program. In Java, many common data structures are provided as part of the Java Collections Framework.

## Why are Data Structures Important?

-   **Efficiency:** Choosing the right data structure can make algorithms run faster and use less memory.
-   **Organization:** Helps in organizing data in a logical and manageable way.
-   **Problem Solving:** Understanding data structures is key to solving complex programming problems effectively.

## Common Data Structures

Let's explore some of the most common data structures and how they are typically represented or used in Java.

---

## 1. Arrays

An **array** is a fixed-size, contiguous block of memory used to store a collection of elements of the same data type. Elements are accessed using an index.

**Characteristics:**
-   Fixed size once created.
-   Elements are stored in contiguous memory locations.
-   Fast access to elements using their index (O(1) time complexity).
-   Insertion and deletion can be slow in the middle (O(n) time complexity).

**Example:**

\`\`\`java
public class ArrayExample {
  public static void main(String[] args) {
    // Declaring and initializing an array of integers
    int[] numbers = new int[5]; // Array of 5 integers, initialized to 0

    // Assigning values
    numbers[0] = 10;
    numbers[1] = 20;
    numbers[2] = 30;
    numbers[3] = 40;
    numbers[4] = 50;

    // Accessing values
    System.out.println("Element at index 0: " + numbers[0]); // Output: 10
    System.out.println("Element at index 3: " + numbers[3]); // Output: 40

    // Iterating through an array
    System.out.println("All elements:");
    for (int i = 0; i < numbers.length; i++) {
      System.out.println("numbers[" + i + "]: " + numbers[i]);
    }

    // Another way to initialize
    String[] fruits = {"Apple", "Banana", "Cherry"};
    System.out.println("First fruit: " + fruits[0]); // Output: Apple
  }
}
\`\`\`

---

## 2. Linked Lists

A **linked list** is a linear data structure where elements are not stored in contiguous memory locations. Instead, each element (node) contains data and a reference (or link) to the next node in the sequence.

**Characteristics:**
-   Dynamic size (can grow or shrink during runtime).
-   Efficient insertion and deletion at any position (O(1) if you have a reference to the node, O(n) to find the node).
-   Slower access to elements (O(n) as you have to traverse from the beginning).
-   Uses more memory than arrays due to storing pointers.

**Java Representation:** 'java.util.LinkedList' (part of the Collections Framework).

**Example:**

\`\`\`java
import java.util.LinkedList;

public class LinkedListExample {
  public static void main(String[] args) {
    LinkedList<String> names = new LinkedList<>();

    // Adding elements
    names.add("Alice");
    names.add("Bob");
    names.addFirst("Charlie"); // Add to the beginning
    names.addLast("David");    // Add to the end

    System.out.println("Linked List: " + names); // Output: [Charlie, Alice, Bob, David]

    // Accessing elements
    System.out.println("First element: " + names.getFirst()); // Output: Charlie
    System.out.println("Last element: " + names.getLast());   // Output: David

    // Removing elements
    names.remove("Bob");
    System.out.println("After removing Bob: " + names); // Output: [Charlie, Alice, David]

    // Iterating
    System.out.println("Elements in list:");
    for (String name : names) {
      System.out.println(name);
    }
  }
}
\`\`\`

---

## 3. Stacks

A **stack** is a linear data structure that follows the **LIFO (Last In, First Out)** principle. Think of a stack of plates: you can only add a plate to the top, and you can only remove the topmost plate.

**Common Operations:**
-   'push': Adds an element to the top of the stack.
-   'pop': Removes and returns the top element from the stack.
-   'peek': Returns the top element without removing it.
-   'isEmpty': Checks if the stack is empty.

**Java Representation:** 'java.util.Stack' (legacy, extends 'Vector') or 'java.util.Deque' (preferred, implemented by 'ArrayDeque').

**Example (using 'ArrayDeque' as a Stack):**

\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class StackExample {
  public static void main(String[] args) {
    Deque<String> stack = new ArrayDeque<>(); // Use Deque as a Stack

    // Push elements onto the stack
    stack.push("Book 1");
    stack.push("Book 2");
    stack.push("Book 3");

    System.out.println("Stack: " + stack); // Output: [Book 3, Book 2, Book 1] (order reflects push order for Deque)

    // Peek at the top element
    System.out.println("Top element (peek): " + stack.peek()); // Output: Book 3

    // Pop elements from the stack
    String poppedBook = stack.pop();
    System.out.println("Popped: " + poppedBook); // Output: Popped: Book 3
    System.out.println("Stack after pop: " + stack); // Output: [Book 2, Book 1]

    System.out.println("Is stack empty? " + stack.isEmpty()); // Output: false

    stack.pop();
    stack.pop();
    System.out.println("Stack after all pops: " + stack); // Output: []
    System.out.println("Is stack empty? " + stack.isEmpty()); // Output: true
  }
}
\`\`\`

---

## 4. Queues

A **queue** is a linear data structure that follows the **FIFO (First In, First Out)** principle. Think of a line at a ticket counter: the first person in line is the first to be served.

**Common Operations:**
-   'add'/'offer': Adds an element to the rear (end) of the queue.
-   'remove'/'poll': Removes and returns the front (beginning) element from the queue.
-   'element'/'peek': Returns the front element without removing it.
-   'isEmpty': Checks if the queue is empty.

**Java Representation:** 'java.util.Queue' interface, commonly implemented by 'java.util.LinkedList' or 'java.util.ArrayDeque'.

**Example (using 'LinkedList' as a Queue):**

\`\`\`java
import java.util.LinkedList;
import java.util.Queue;

public class QueueExample {
  public static void main(String[] args) {
    Queue<String> queue = new LinkedList<>(); // Use LinkedList as a Queue

    // Add elements to the queue
    queue.offer("Person A");
    queue.offer("Person B");
    queue.offer("Person C");

    System.out.println("Queue: " + queue); // Output: [Person A, Person B, Person C]

    // Peek at the front element
    System.out.println("Front element (peek): " + queue.peek()); // Output: Person A

    // Remove elements from the queue
    String servedPerson = queue.poll();
    System.out.println("Served: " + servedPerson); // Output: Served: Person A
    System.out.println("Queue after poll: " + queue); // Output: [Person B, Person C]

    System.out.println("Is queue empty? " + queue.isEmpty()); // Output: false

    queue.poll();
    queue.poll();
    System.out.println("Queue after all polls: " + queue); // Output: []
    System.out.println("Is queue empty? " + queue.isEmpty()); // Output: true
  }
}
\`\`\`

---

## 5. Trees

A **tree** is a non-linear data structure that simulates a hierarchical tree structure, with a root value and subtrees of children with a parent node, represented as a set of linked nodes.

**Characteristics:**
-   Hierarchical structure.
-   Nodes are connected by edges.
-   Common types: Binary Trees, Binary Search Trees (BSTs), AVL Trees, Red-Black Trees.
-   Efficient for searching, insertion, and deletion (especially BSTs).

**Java Representation:** While Java doesn't have a built-in 'Tree' class for general trees, 'java.util.TreeMap' and 'java.util.TreeSet' use tree structures (Red-Black Trees) internally for sorted storage. You often implement custom tree nodes for specific tree structures.

**Example (Conceptual Binary Search Tree Node):**

\`\`\`java
class TreeNode {
  int data;
  TreeNode left;
  TreeNode right;

  public TreeNode(int data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

public class TreeConcept {
  public static void main(String[] args) {
    // Building a simple binary tree manually
    TreeNode root = new TreeNode(10);
    root.left = new TreeNode(5);
    root.right = new TreeNode(15);
    root.left.left = new TreeNode(2);

    System.out.println("Root data: " + root.data);
    System.out.println("Left child of root: " + root.left.data);
    System.out.println("Right child of root: " + root.right.data);
    System.out.println("Left child of left child: " + root.left.left.data);
  }
}
\`\`\`

---

## 6. Graphs

A **graph** is a non-linear data structure consisting of a finite set of vertices (or nodes) and a set of edges connecting pairs of vertices. Graphs are used to model relationships between objects.

**Characteristics:**
-   Can represent networks, social connections, routes, etc.
-   Can be directed or undirected, weighted or unweighted.
-   Common representations: Adjacency Matrix, Adjacency List.

**Java Representation:** No direct built-in 'Graph' class. Graphs are typically implemented using collections like 'ArrayList' (for adjacency lists) or 2D arrays (for adjacency matrices).

**Example (Adjacency List Representation):**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class GraphExample {
  private int V; // Number of vertices
  private List<List<Integer>> adj; // Adjacency list

  public GraphExample(int V) {
    this.V = V;
    adj = new ArrayList<>(V);
    for (int i = 0; i < V; i++) {
      adj.add(new ArrayList<>());
    }
  }

  // Add an edge from u to v
  public void addEdge(int u, int v) {
    adj.get(u).add(v);
    // For an undirected graph, also add: adj.get(v).add(u);
  }

  public void printGraph() {
    for (int i = 0; i < V; i++) {
      System.out.print("Vertex " + i + " is connected to: ");
      for (Integer neighbor : adj.get(i)) {
        System.out.print(neighbor + " ");
      }
      System.out.println();
    }
  }

  public static void main(String[] args) {
    GraphExample graph = new GraphExample(5); // 5 vertices (0 to 4)

    graph.addEdge(0, 1);
    graph.addEdge(0, 4);
    graph.addEdge(1, 2);
    graph.addEdge(1, 3);
    graph.addEdge(1, 4);
    graph.addEdge(2, 3);
    graph.addEdge(3, 4);

    graph.printGraph();
    // Output:
    // Vertex 0 is connected to: 1 4
    // Vertex 1 is connected to: 2 3 4
    // Vertex 2 is connected to: 3
    // Vertex 3 is connected to: 4
    // Vertex 4 is connected to:
  }
}
\`\`\`

---

## 7. Hash Tables (Maps)

A **hash table** (or hash map) is a data structure that implements an associative array, allowing efficient storage and retrieval of data using a key-value pair. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.

**Characteristics:**
-   Fast average-case time complexity for insertion, deletion, and retrieval (O(1)).
-   Worst-case time complexity can be O(n) if many collisions occur.
-   Keys must be unique.
-   Order of elements is generally not guaranteed.

**Java Representation:** 'java.util.HashMap' (most common), 'java.util.LinkedHashMap', 'java.util.Hashtable'.

**Example (using 'HashMap'):**

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
  public static void main(String[] args) {
    Map<String, Integer> studentScores = new HashMap<>();

    // Adding key-value pairs
    studentScores.put("Alice", 95);
    studentScores.put("Bob", 88);
    studentScores.put("Charlie", 92);
    studentScores.put("Alice", 97); // Updates Alice's score

    System.out.println("Student Scores: " + studentScores); // Output: {Alice=97, Bob=88, Charlie=92}

    // Retrieving values
    System.out.println("Bob's score: " + studentScores.get("Bob")); // Output: 88
    System.out.println("David's score: " + studentScores.get("David")); // Output: null

    // Checking for existence
    System.out.println("Contains Charlie? " + studentScores.containsKey("Charlie")); // Output: true
    System.out.println("Contains score 92? " + studentScores.containsValue(92)); // Output: true

    // Removing an entry
    studentScores.remove("Bob");
    System.out.println("After removing Bob: " + studentScores); // Output: {Alice=97, Charlie=92}

    // Iterating through entries
    System.out.println("Iterating through scores:");
    for (Map.Entry<String, Integer> entry : studentScores.entrySet()) {
      System.out.println(entry.getKey() + " : " + entry.getValue());
    }
  }
}
\`\`\`

---

## Summary of Data Structures

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Data Structure</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Key Characteristics</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Java Representation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Array</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fixed-size collection of elements of the same type, stored contiguously.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fast access (O(1)), slow insertion/deletion in middle (O(n)).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Built-in array syntax 'int[] arr;'.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Linked List</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Linear collection of nodes, where each node points to the next.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Dynamic size, fast insertion/deletion (O(1) if node known), slow access (O(n)).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'java.util.LinkedList'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Stack</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">LIFO (Last In, First Out) data structure.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fast push/pop (O(1)).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'java.util.Deque' (e.g., 'ArrayDeque') or 'java.util.Stack' (legacy).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Queue</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">FIFO (First In, First Out) data structure.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fast add/remove (O(1)).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'java.util.Queue' (e.g., 'LinkedList', 'ArrayDeque').</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Tree</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hierarchical data structure with a root and child nodes.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Efficient search/insert/delete in balanced trees (O(log n)).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Custom implementations; 'TreeMap', 'TreeSet' use trees internally.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Graph</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Collection of vertices (nodes) and edges (connections).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Models relationships; traversal algorithms (BFS, DFS).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Custom implementations using 'ArrayList' (adjacency list) or 2D arrays (adjacency matrix).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hash Table (Map)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Stores key-value pairs using a hash function for quick access.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fast average-case access/insert/delete (O(1)).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'java.util.HashMap'</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Choose the Right Tool for the Job</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The most important aspect of data structures is understanding their strengths and weaknesses. There is no single 'best' data structure; the optimal choice always depends on the specific problem you are trying to solve, considering factors like access patterns, insertion/deletion frequency, and memory constraints.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Performance Considerations</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While Java's built-in data structures are highly optimized, be aware of their underlying performance characteristics. For example, frequently inserting or deleting elements in the middle of an 'ArrayList' can be very slow (O(n)) due to element shifting, whereas a 'LinkedList' excels at this (O(1)).
    </div>
</div>
`;

export default function JavaDataStructuresPage() {
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
          prevLesson="java-delete-files"
          nextLesson="java-collections"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
