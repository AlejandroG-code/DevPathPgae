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
# Java HashMap

The 'HashMap' class is the most widely used implementation of the 'Map' interface in the Java Collections Framework. It stores data in **key-value pairs** and uses a **hash table** for its underlying data structure, which provides extremely fast average-case performance for basic operations.

## Key Characteristics of 'HashMap':

-   **Key-Value Pairs:** Stores data as pairs of a unique key and its associated value.
-   **No Duplicates Keys:** Each key in a 'HashMap' must be unique. If you try to 'put' a new value with an existing key, the old value associated with that key is replaced.
-   **No Guaranteed Order:** Elements (key-value pairs) in a 'HashMap' are not stored in any particular order. The order of elements when iterating over a 'HashMap' is not guaranteed and can even change over time due to rehashing.
-   **Null Keys and Values:** 'HashMap' allows one 'null' key and multiple 'null' values.
-   **Non-Synchronized:** 'HashMap' is not thread-safe. If multiple threads access a 'HashMap' concurrently and at least one of them modifies the map, it must be synchronized externally. For concurrent scenarios, 'java.util.concurrent.ConcurrentHashMap' is often preferred.
-   **Performance:** Offers constant-time performance (O(1)) for basic operations ('put', 'get', 'remove', 'containsKey', 'size') on average, assuming a good hash function. In the worst-case scenario (poor hash function leading to many collisions), performance can degrade to O(n).

## How 'HashMap' Works (Briefly)

'HashMap' works by using the 'hashCode()' method of the key object to determine which "bucket" (an array index) the key-value pair should be stored in. When a key-value pair needs to be retrieved, the 'hashCode()' is used again to quickly locate the bucket. Then, the 'equals()' method is used to find the exact key within that bucket (as multiple keys might hash to the same bucket due to collisions).

## When to Use 'HashMap'?

'HashMap' is the best choice when:
-   You need to store data as key-value pairs.
-   You prioritize fast average-case performance for storing, retrieving, and deleting entries based on their keys.
-   The order of elements is not important to your application.

## Common Methods of 'HashMap'

'HashMap' implements all methods from the 'Map' interface. Here are some of the most frequently used ones, along with their typical average-case time complexities:

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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Associates the specified value with the specified key. Replaces old value if key exists.</td>
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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'containsValue(Object value)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this map maps one or more keys to the specified value.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'size()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the number of key-value mappings in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'isEmpty()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this map contains no key-value mappings.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'clear()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes all of the mappings from this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'keySet()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a 'Set' view of the keys contained in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) for view, O(n) for iteration</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'values()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a 'Collection' view of the values contained in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) for view, O(n) for iteration</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'entrySet()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a 'Set' view of the mappings contained in this map. Each element is a 'Map.Entry'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) for view, O(n) for iteration</td>
        </tr>
    </tbody>
</table>

## Example: Using 'HashMap'

\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class HashMapExample {
  public static void main(String[] args) {
    // Creating a HashMap with String keys and Integer values
    Map<String, Integer> studentGrades = new HashMap<>();

    // 1. Adding elements (key-value pairs)
    studentGrades.put("Alice", 90);
    studentGrades.put("Bob", 85);
    studentGrades.put("Charlie", 92);
    studentGrades.put("Alice", 95); // Updates Alice's grade from 90 to 95

    System.out.println("Initial HashMap: " + studentGrades); 
    // Output: {Alice=95, Bob=85, Charlie=92} (order is not guaranteed)

    // 2. Getting a value by key
    Integer bobGrade = studentGrades.get("Bob");
    System.out.println("Bob's grade: " + bobGrade); // Output: 85

    Integer davidGrade = studentGrades.get("David");
    System.out.println("David's grade: " + davidGrade); // Output: null (key not found)

    // 3. Checking if a key exists
    System.out.println("Does map contain key 'Charlie'? " + studentGrades.containsKey("Charlie")); // Output: true
    System.out.println("Does map contain key 'Eve'? " + studentGrades.containsKey("Eve"));         // Output: false

    // 4. Checking if a value exists
    System.out.println("Does map contain value 95? " + studentGrades.containsValue(95)); // Output: true
    System.out.println("Does map contain value 100? " + studentGrades.containsValue(100)); // Output: false

    // 5. Removing an entry by key
    Integer removedGrade = studentGrades.remove("Bob");
    System.out.println("Removed Bob's grade: " + removedGrade); // Output: 85
    System.out.println("Map after removing Bob: " + studentGrades); 
    // Output: {Alice=95, Charlie=92} (order not guaranteed)

    // 6. Getting the size of the map
    System.out.println("Size of HashMap: " + studentGrades.size()); // Output: 2

    // 7. Iterating through the HashMap
    System.out.println("\nIterating through Map entries (using entrySet()):");
    for (Map.Entry<String, Integer> entry : studentGrades.entrySet()) {
      System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
    }
    // Example Output (order not guaranteed):
    // Key: Alice, Value: 95
    // Key: Charlie, Value: 92

    System.out.println("\nIterating through Map keys (using keySet()):");
    for (String name : studentGrades.keySet()) {
      System.out.println("Key: " + name + ", Value: " + studentGrades.get(name));
    }

    System.out.println("\nIterating through Map values (using values()):");
    for (Integer grade : studentGrades.values()) {
      System.out.println("Value: " + grade);
    }

    // 8. Clearing the HashMap
    studentGrades.clear();
    System.out.println("\nHashMap after clearing: " + studentGrades); // Output: {}
    System.out.println("Is HashMap empty? " + studentGrades.isEmpty()); // Output: true
  }
}
\`\`\`

## Important: 'hashCode()' and 'equals()' for Custom Keys

When using custom objects (instances of your own classes) as **keys** in a 'HashMap', it is absolutely critical that you correctly override both the 'hashCode()' and 'equals()' methods in your key class.

-   **'hashCode()'**: Used by 'HashMap' to determine the bucket where a key-value pair should be stored or looked up. If two objects are considered equal, their 'hashCode()' must return the same integer.
-   **'equals()'**: Used by 'HashMap' (after 'hashCode()' has narrowed down the bucket) to determine if two keys are truly equal. If two objects are equal according to 'equals()', their 'hashCode()' must also be equal.

**Consequences of Not Overriding Correctly:**
-   **Lost Entries:** If 'hashCode()' is not overridden or is implemented poorly, 'get()' or 'remove()' might not find an entry even if the key exists, because it looks in the wrong bucket.
-   **Duplicate Keys:** If 'equals()' is not overridden, the 'Map' might store multiple entries for logically "same" keys (based on memory address, not content).

**Example with Custom Key Object (Correctly Overridden 'hashCode()' and 'equals()'):**

\`\`\`java
import java.util.HashMap;
import java.util.Map;
import java.util.Objects; // Utility for Objects.hash() and Objects.equals()

class Book {
  private String isbn;
  private String title;

  public Book(String isbn, String title) {
    this.isbn = isbn;
    this.title = title;
  }

  public String getIsbn() { return isbn; }
  public String getTitle() { return title; }

  @Override
  public String toString() {
    return "Book[isbn='" + isbn + "', title='" + title + "']";
  }

  // IMPORTANT: Override both hashCode() and equals() for use as a Map key
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Book book = (Book) o;
    // Two books are equal if their ISBNs are the same
    return Objects.equals(isbn, book.isbn); 
  }

  @Override
  public int hashCode() {
    // Hash code based on the 'isbn' field, as it determines equality
    return Objects.hash(isbn);
  }
}

class BookDetails {
  String author;
  int pages;

  public BookDetails(String author, int pages) {
    this.author = author;
    this.pages = pages;
  }

  @Override
  public String toString() {
    return "BookDetails[author='" + author + "', pages=" + pages + "]";
  }
}

public class HashMapCustomKeyExample {
  public static void main(String[] args) {
    Map<Book, BookDetails> library = new HashMap<>();

    Book book1 = new Book("978-0321765723", "Effective Java");
    BookDetails details1 = new BookDetails("Joshua Bloch", 412);
    library.put(book1, details1);

    Book book2 = new Book("978-0596009205", "Head First Java");
    BookDetails details2 = new BookDetails("Kathy Sierra", 688);
    library.put(book2, details2);

    // This key is logically the same as book1 (same ISBN)
    Book book1Duplicate = new Book("978-0321765723", "Effective Java 2nd Ed."); 
    BookDetails details1Updated = new BookDetails("Joshua Bloch", 450);
    library.put(book1Duplicate, details1Updated); // This will UPDATE the value for book1

    System.out.println("Library Contents:");
    for (Map.Entry<Book, BookDetails> entry : library.entrySet()) {
      System.out.println(entry.getKey() + " -> " + entry.getValue());
    }
    // Output (order may vary):
    // Book[isbn='978-0596009205', title='Head First Java'] -> BookDetails[author='Kathy Sierra', pages=688]
    // Book[isbn='978-0321765723', title='Effective Java'] -> BookDetails[author='Joshua Bloch', pages=450] (updated)

    System.out.println("Size of library: " + library.size()); // Output: 2

    // Retrieve using a new key object that is 'equals' to an existing key
    Book searchBook = new Book("978-0321765723", "Any Title"); // Only ISBN matters for equality
    BookDetails retrievedDetails = library.get(searchBook);
    System.out.println("Details for Effective Java: " + retrievedDetails); 
    // Output: BookDetails[author='Joshua Bloch', pages=450]
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Default Choice for Key-Value Pairs</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        'HashMap' is typically the default choice when you need to store data as key-value pairs and the order of elements is not important. Its average-case constant-time performance makes it very efficient for most common map operations.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Load Factor and Initial Capacity</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The performance of 'HashMap' can be affected by its 'initial capacity' and 'load factor'.
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>**Initial Capacity:** The number of buckets in the hash table. If too small, frequent rehashing (resizing the internal array) occurs, which is an expensive O(n) operation.</li>
            <li>**Load Factor:** A threshold (default 0.75) that determines when the 'HashMap' should resize. When the number of entries exceeds (capacity * load factor), the map is rehashed.</li>
        </ul>
        For optimal performance, especially with large datasets, it's good practice to provide an appropriate initial capacity if you have an estimate of the number of entries.
    </div>
</div>
`;

export default function JavaHashMapPage() {
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
          nextLesson="java-treemap"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
