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
# Java Map Interface

The 'Map' interface is a crucial part of the Java Collections Framework, but it's important to note that it **does not extend the 'Collection' interface**. Instead, 'Map' represents an object that maps **keys to values**. It's essentially a dictionary or associative array, where each unique key is associated with a single value.

## Key Characteristics of 'Map':

-   **Key-Value Pairs:** Stores data as pairs, where each pair consists of a unique key and its corresponding value.
-   **Unique Keys:** A 'Map' cannot contain duplicate keys. If you try to insert a key-value pair with a key that already exists, the old value associated with that key is replaced by the new value.
-   **One-to-One Mapping:** Each key can map to at most one value.
-   **No Inherent Order (generally):** The order of elements (key-value pairs) when iterating over a 'Map' is generally not guaranteed (except for specific implementations like 'LinkedHashMap' and 'TreeMap').
-   **Null Keys/Values:** 'HashMap' and 'LinkedHashMap' allow one 'null' key and multiple 'null' values. 'TreeMap' does not allow 'null' keys.

## When to Use 'Map'?

'Map' is ideal when:
-   You need to store data as key-value pairs.
-   You need to retrieve values quickly based on their associated keys.
-   You need to ensure that each key is unique.

## Common 'Map' Implementations

The 'Map' interface is implemented by several concrete classes, each with different performance characteristics and ordering guarantees:

-   **'HashMap'**: (Most commonly used) Uses a hash table for storage. It offers constant-time performance (O(1)) for basic operations (put, get, remove, containsKey) on average, assuming a good hash function. It does not guarantee any specific order of key-value pairs.
-   **'LinkedHashMap'**: Extends 'HashMap' and maintains a doubly-linked list running through its entries. This preserves the insertion order of key-value pairs. It has slightly higher overhead than 'HashMap' but provides predictable iteration order.
-   **'TreeMap'**: Stores key-value pairs in a sorted order based on their keys. It uses a Red-Black Tree data structure internally. Keys are sorted either according to their natural ordering (if they implement 'Comparable') or by a 'Comparator' provided at map creation time. It offers guaranteed log(n) time performance for basic operations.
-   **'Hashtable'**: A legacy class that is similar to 'HashMap' but is synchronized (thread-safe) and does not allow 'null' keys or values. It's generally recommended to use 'ConcurrentHashMap' for thread-safe map operations in modern Java.

We will delve into 'HashMap', 'LinkedHashMap', and 'TreeMap' in more detail in subsequent lessons.

## Common Methods of the 'Map' Interface

The 'Map' interface provides methods for manipulating key-value pairs.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Time Complexity (HashMap / TreeMap)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'put(K key, V value)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Associates the specified value with the specified key in this map. If the map previously contained a mapping for the key, the old value is replaced. Returns the previous value associated with 'key', or 'null' if there was no mapping.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average / O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'get(Object key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the value to which the specified key is mapped, or 'null' if this map contains no mapping for the key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average / O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(Object key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the mapping for a key from this map if it is present. Returns the value to which this map previously associated the key, or 'null' if the map contained no mapping for the key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average / O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'containsKey(Object key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this map contains a mapping for the specified key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average / O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'containsValue(Object value)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this map maps one or more keys to the specified value.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) / O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'size()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the number of key-value mappings in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) / O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'isEmpty()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this map contains no key-value mappings.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) / O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'clear()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes all of the mappings from this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n) / O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'keySet()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a 'Set' view of the keys contained in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'values()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a 'Collection' view of the values contained in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'entrySet()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a 'Set' view of the mappings contained in this map. Each element in this set is a 'Map.Entry'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
    </tbody>
</table>

## Example: Basic 'Map' Operations (using 'HashMap')

Since 'HashMap' is the most common implementation due to its performance, we'll use it to demonstrate 'Map' operations.

\`\`\`java
import java.util.HashMap;
import java.util.Map; // Good practice to program to the interface

public class MapExample {
  public static void main(String[] args) {
    // Declare a Map with String keys and Integer values
    Map<String, Integer> studentScores = new HashMap<>();

    // 1. Put (add) key-value pairs
    studentScores.put("Alice", 95);
    studentScores.put("Bob", 88);
    studentScores.put("Charlie", 92);
    studentScores.put("Alice", 97); // Key "Alice" already exists, value will be updated

    System.out.println("Initial Map: " + studentScores); 
    // Output: {Alice=97, Bob=88, Charlie=92} (order not guaranteed)

    // 2. Get value by key
    Integer bobScore = studentScores.get("Bob");
    System.out.println("Bob's score: " + bobScore); // Output: 88

    Integer davidScore = studentScores.get("David");
    System.out.println("David's score: " + davidScore); // Output: null (key not found)

    // 3. Check if a key exists
    System.out.println("Does map contain key 'Charlie'? " + studentScores.containsKey("Charlie")); // Output: true
    System.out.println("Does map contain key 'Eve'? " + studentScores.containsKey("Eve"));         // Output: false

    // 4. Check if a value exists
    System.out.println("Does map contain value 97? " + studentScores.containsValue(97)); // Output: true
    System.out.println("Does map contain value 100? " + studentScores.containsValue(100)); // Output: false

    // 5. Remove a key-value pair
    Integer removedScore = studentScores.remove("Bob");
    System.out.println("Removed Bob's score: " + removedScore); // Output: 88
    System.out.println("Map after removing Bob: " + studentScores); 
    // Output: {Alice=97, Charlie=92} (order not guaranteed)

    // 6. Get the size of the map
    System.out.println("Size of map: " + studentScores.size()); // Output: 2

    // 7. Iterate through the map
    System.out.println("\nIterating through Map entries (using entrySet()):");
    for (Map.Entry<String, Integer> entry : studentScores.entrySet()) {
      System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
    }
    // Output (order not guaranteed):
    // Key: Alice, Value: 97
    // Key: Charlie, Value: 92

    System.out.println("\nIterating through Map keys (using keySet()):");
    for (String name : studentScores.keySet()) {
      System.out.println("Key: " + name + ", Value: " + studentScores.get(name));
    }

    System.out.println("\nIterating through Map values (using values()):");
    for (Integer score : studentScores.values()) {
      System.out.println("Value: " + score);
    }

    // 8. Clear the map
    studentScores.clear();
    System.out.println("\nMap after clearing: " + studentScores); // Output: {}
    System.out.println("Is map empty? " + studentScores.isEmpty()); // Output: true
  }
}
\`\`\`

## Important: 'hashCode()' and 'equals()' for Custom Keys

When using custom objects (instances of your own classes) as **keys** in a 'HashMap' or 'LinkedHashMap', it is absolutely critical that you correctly override both the 'hashCode()' and 'equals()' methods in your key class.

-   **'hashCode()'**: Used by the 'Map' to determine the bucket where a key-value pair should be stored or looked up. If two objects are considered equal, their 'hashCode()' must return the same integer.
-   **'equals()'**: Used by the 'Map' (after 'hashCode()' has narrowed down the bucket) to determine if two keys are truly equal. If two objects are equal according to 'equals()', their 'hashCode()' must also be equal.

**Consequences of Not Overriding Correctly:**
-   **Lost Entries:** If 'hashCode()' is not overridden or is implemented poorly, 'get()' or 'remove()' might not find an entry even if the key exists, because it looks in the wrong bucket.
-   **Duplicate Keys:** If 'equals()' is not overridden, the 'Map' might store multiple entries for logically "same" keys (based on memory address, not content).

**Example with Custom Key Object (Correctly Overridden 'hashCode()' and 'equals()'):**

\`\`\`java
import java.util.HashMap;
import java.util.Map;
import java.util.Objects; // Utility for Objects.hash() and Objects.equals()

class EmployeeId {
  private String id;
  private String department; // Part of the key's identity

  public EmployeeId(String id, String department) {
    this.id = id;
    this.department = department;
  }

  public String getId() { return id; }
  public String getDepartment() { return department; }

  @Override
  public String toString() {
    return "EmpID[id='" + id + "', dept='" + department + "']";
  }

  // IMPORTANT: Override both hashCode() and equals() for use as a Map key
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    EmployeeId that = (EmployeeId) o;
    // Two EmployeeId objects are equal if their 'id' AND 'department' are the same
    return Objects.equals(id, that.id) &&
           Objects.equals(department, that.department);
  }

  @Override
  public int hashCode() {
    // Hash code based on 'id' and 'department' as they determine equality
    return Objects.hash(id, department);
  }
}

class Employee {
  String name;
  double salary;

  public Employee(String name, double salary) {
    this.name = name;
    this.salary = salary;
  }

  @Override
  public String toString() {
    return "Employee[name='" + name + "', salary=" + salary + "]";
  }
}

public class HashMapCustomKeyExample {
  public static void main(String[] args) {
    Map<EmployeeId, Employee> employeeMap = new HashMap<>();

    EmployeeId empId1 = new EmployeeId("E001", "HR");
    Employee emp1 = new Employee("John Doe", 60000.00);
    employeeMap.put(empId1, emp1);

    EmployeeId empId2 = new EmployeeId("E002", "IT");
    Employee emp2 = new Employee("Jane Smith", 75000.00);
    employeeMap.put(empId2, emp2);

    // This key is logically the same as empId1
    EmployeeId empId1Duplicate = new EmployeeId("E001", "HR"); 
    Employee emp1Updated = new Employee("John Doe Jr.", 62000.00);
    employeeMap.put(empId1Duplicate, emp1Updated); // This will UPDATE the value for empId1

    System.out.println("Employee Map:");
    for (Map.Entry<EmployeeId, Employee> entry : employeeMap.entrySet()) {
      System.out.println(entry.getKey() + " -> " + entry.getValue());
    }
    // Output (order may vary):
    // EmpID[id='E001', dept='HR'] -> Employee[name='John Doe Jr.', salary=62000.0]
    // EmpID[id='E002', dept='IT'] -> Employee[name='Jane Smith', salary=75000.0]

    System.out.println("Size of employee map: " + employeeMap.size()); // Output: 2

    // Retrieve using a new key object that is 'equals' to an existing key
    Employee retrievedEmp = employeeMap.get(new EmployeeId("E001", "HR"));
    System.out.println("Retrieved Employee for E001/HR: " + retrievedEmp); 
    // Output: Employee[name='John Doe Jr.', salary=62000.0]
  }
}
\`\`\`

---

## 'HashMap' vs. 'LinkedHashMap' vs. 'TreeMap'

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'HashMap'</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'LinkedHashMap'</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'TreeMap'</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Order</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No guaranteed order.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Maintains insertion order.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Sorted by keys (natural or custom comparator).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Null Keys</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Allows one null key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Allows one null key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Does NOT allow null keys.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Null Values</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Allows multiple null values.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Allows multiple null values.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Allows multiple null values.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Internal Structure</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hash table</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hash table + Doubly-linked list</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Red-Black Tree</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Performance (put/get/remove)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) average</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n) guaranteed</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Choose the Right Map Implementation</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The choice of 'Map' implementation depends on your specific needs:
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>Use 'HashMap' when you need the fastest average-case performance for lookups, insertions, and deletions, and the order of elements doesn't matter.</li>
            <li>Use 'LinkedHashMap' when you need the fast performance of a hash map but also require iteration in insertion order.</li>
            <li>Use 'TreeMap' when you need the keys to be sorted (either naturally or by a custom 'Comparator'), or when you need operations like finding the smallest/largest key, or sub-map views.</li>
        </ul>
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Mutable Keys in Map</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Similar to 'HashSet', avoid using mutable objects as keys in 'HashMap' or 'LinkedHashMap' if their 'hashCode()' or 'equals()' methods depend on the mutable state. If a key object's state changes after it has been added to a map in a way that affects its 'hashCode()', the entry might become "lost" in the map. You might not be able to retrieve or remove the entry, as the map will look for it in the wrong bucket based on its new hash code.
    </div>
</div>
`;

export default function JavaMapPage() {
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
          prevLesson="java-linkedhashset"
          nextLesson="java-hashmap"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
