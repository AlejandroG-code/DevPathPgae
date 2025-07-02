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
# Java TreeMap

The 'TreeMap' class is an implementation of the 'Map' interface that stores its entries (key-value pairs) in a **sorted order** based on the keys. It uses a **Red-Black Tree** data structure internally, which guarantees that the map's elements are always kept in a sorted sequence.

## Key Characteristics of 'TreeMap':

-   **Sorted by Keys:** Entries are stored and retrieved in ascending order of their keys (natural ordering) or according to a custom 'Comparator' provided at map creation time.
-   **No Duplicate Keys:** Like all 'Map' implementations, 'TreeMap' does not allow duplicate keys. If you 'put' a new value with an existing key, the old value is replaced.
-   **No Null Keys:** 'TreeMap' does not allow 'null' keys (unlike 'HashMap' and 'LinkedHashMap'). Attempting to add a 'null' key will result in a 'NullPointerException'.
-   **Allows Null Values:** 'TreeMap' allows multiple 'null' values.
-   **Non-Synchronized:** 'TreeMap' is not thread-safe. External synchronization is required for concurrent access in multi-threaded environments.
-   **Performance:** Offers guaranteed log(n) time complexity for basic operations ('put', 'get', 'remove', 'containsKey'). This is generally slower than 'HashMap' (O(1) average) but provides the benefit of sorted keys and ordered iteration.

## How 'TreeMap' Maintains Order

'TreeMap' relies on its keys being comparable to each other. There are two ways to define this comparability:

1.  **Natural Ordering (using 'Comparable')**: If the keys you want to store in the 'TreeMap' implement the 'java.lang.Comparable' interface, 'TreeMap' will use their natural ordering. Many built-in Java classes (like 'String', 'Integer') already implement 'Comparable'.
2.  **Custom Ordering (using 'Comparator')**: If your custom objects do not have a natural ordering, or if you want to sort them based on a different criterion, you can provide a 'java.util.Comparator' instance to the 'TreeMap' constructor.

## When to Use 'TreeMap'?

'TreeMap' is the best choice when:
-   You need to store key-value pairs.
-   You need the keys to be stored and retrieved in a sorted order.
-   You need efficient operations for finding entries within a range of keys (e.g., 'subMap', 'headMap', 'tailMap').
-   You need to find the smallest or largest key, or the entry associated with them.

## Common Methods of 'TreeMap'

'TreeMap' implements all methods from the 'Map' interface and also provides additional methods from the 'SortedMap' and 'NavigableMap' interfaces for dealing with ordered keys.

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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'put(K key, V value)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Associates the specified value with the specified key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'get(Object key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the value to which the specified key is mapped.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(Object key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the mapping for a key from this map if it is present.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'firstKey()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the first (lowest) key currently in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'lastKey()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the last (highest) key currently in this map.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'headMap(K toKey)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a view of the portion of this map whose keys are strictly less than 'toKey'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n) + O(k) for k elements in view</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'tailMap(K fromKey)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a view of the portion of this map whose keys are greater than or equal to 'fromKey'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n) + O(k) for k elements in view</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'subMap(K fromKey, K toKey)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a view of the portion of this map whose keys range from 'fromKey' (inclusive) to 'toKey' (exclusive).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n) + O(k) for k elements in view</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'ceilingKey(K key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the least key greater than or equal to the given key, or 'null' if there is no such key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'floorKey(K key)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the greatest key less than or equal to the given key, or 'null' if there is no such key.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
    </tbody>
</table>

## Example: Using 'TreeMap' with Natural Ordering

\`\`\`java
import java.util.Map;
import java.util.TreeMap;

public class TreeMapNaturalOrderExample {
  public static void main(String[] args) {
    // Creating a TreeMap with String keys (String has natural alphabetical order)
    Map<String, Integer> studentScores = new TreeMap<>();

    studentScores.put("Charlie", 92);
    studentScores.put("Alice", 95);
    studentScores.put("Bob", 88);
    studentScores.put("Alice", 97); // Updates Alice's score

    System.out.println("TreeMap (Natural Order of Keys): " + studentScores); 
    // Output: {Alice=97, Bob=88, Charlie=92} (always sorted by key)

    // Attempt to add null key (will throw NullPointerException)
    try {
      studentScores.put(null, 100);
    } catch (NullPointerException e) {
      System.out.println("Caught expected exception: Cannot add null key to TreeMap.");
    }

    System.out.println("First key: " + ((TreeMap<String, Integer>) studentScores).firstKey()); // Output: Alice
    System.out.println("Last key: " + ((TreeMap<String, Integer>) studentScores).lastKey());   // Output: Charlie

    // Using range views
    Map<String, Integer> subMap = ((TreeMap<String, Integer>) studentScores).subMap("B", "C"); 
    // Keys from B (inclusive) to C (exclusive)
    System.out.println("SubMap (B to C): " + subMap); // Output: {Bob=88}

    Map<String, Integer> headMap = ((TreeMap<String, Integer>) studentScores).headMap("C"); // Keys strictly less than C
    System.out.println("HeadMap (keys < C): " + headMap); // Output: {Alice=97, Bob=88}

    Map<String, Integer> tailMap = ((TreeMap<String, Integer>) studentScores).tailMap("B"); // Keys >= B
    System.out.println("TailMap (keys >= B): " + tailMap); // Output: {Bob=88, Charlie=92}
  }
}
\`\`\`

---

## Example: Using 'TreeMap' with Custom Keys and 'Comparable'

For 'TreeMap' to sort custom key objects naturally, the custom key class must implement the 'Comparable' interface and override its 'compareTo()' method.

\`\`\`java
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

// Product class implementing Comparable for natural ordering by product ID
class Product implements Comparable<Product> {
  private String id;
  private String name;
  private double price;

  public Product(String id, String name, double price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public String getId() { return id; }
  public String getName() { return name; }
  public double getPrice() { return price; }

  @Override
  public String toString() {
    return "Product[id='" + id + "', name='" + name + "', price=" + price + "]";
  }

  // Define natural ordering based on product ID (ascending)
  @Override
  public int compareTo(Product other) {
    return this.id.compareTo(other.id); 
  }

  // It's good practice to also override equals and hashCode for consistency,
  // although TreeMap uses compareTo for uniqueness and sorting.
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Product product = (Product) o;
    return Objects.equals(id, product.id); 
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}

public class TreeMapComparableKeyExample {
  public static void main(String[] args) {
    Map<Product, Integer> productInventory = new TreeMap<>();

    Product p1 = new Product("P003", "Laptop", 1200.00);
    Product p2 = new Product("P001", "Mouse", 25.00);
    Product p3 = new Product("P002", "Keyboard", 75.00);
    Product p4 = new Product("P001", "Gaming Mouse", 50.00); // Same ID as p2, different name/price

    productInventory.put(p1, 10);
    productInventory.put(p2, 50);
    productInventory.put(p3, 20);
    productInventory.put(p4, 30); // This will UPDATE the value for P001

    System.out.println("Product Inventory (sorted by Product ID):");
    for (Map.Entry<Product, Integer> entry : productInventory.entrySet()) {
      System.out.println(entry.getKey() + " -> Quantity: " + entry.getValue());
    }
    // Output:
    // Product[id='P001', name='Mouse', price=25.0] -> Quantity: 30 (updated)
    // Product[id='P002', name='Keyboard', price=75.0] -> Quantity: 20
    // Product[id='P003', name='Laptop', price=1200.0] -> Quantity: 10

    System.out.println("Size of inventory: " + productInventory.size()); // Output: 3

    Product searchProduct = new Product("P001", "Any Name", 0.0); // Only ID matters for equality
    System.out.println("Quantity for P001: " + productInventory.get(searchProduct)); // Output: 30
  }
}
\`\`\`

---

## Example: Using 'TreeMap' with Custom 'Comparator'

If you want to sort keys based on criteria other than their natural order, or if the key class does not implement 'Comparable', you can provide a 'Comparator' to the 'TreeMap' constructor.

\`\`\`java
import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

// Reusing the Product class from the previous example (or assume it doesn't implement Comparable)
// class Product { ... }

public class TreeMapComparatorKeyExample {
  public static void main(String[] args) {
    // Create a Comparator to sort Product objects by price (ascending)
    Comparator<Product> priceComparator = new Comparator<Product>() {
      @Override
      public int compare(Product p1, Product p2) {
        return Double.compare(p1.getPrice(), p2.getPrice());
      }
    };

    // Create a TreeMap using the custom Comparator
    Map<Product, Integer> productPrices = new TreeMap<>(priceComparator);

    productPrices.put(new Product("P003", "Laptop", 1200.00), 1);
    productPrices.put(new Product("P001", "Mouse", 25.00), 1);
    productPrices.put(new Product("P002", "Keyboard", 75.00), 1);
    productPrices.put(new Product("P004", "Monitor", 300.00), 1);

    System.out.println("Product Prices (sorted by Price):");
    for (Map.Entry<Product, Integer> entry : productPrices.entrySet()) {
      System.out.println(entry.getKey().getName() + " (Price: $" + entry.getKey().getPrice() + ")");
    }
    // Output:
    // Mouse (Price: $25.0)
    // Keyboard (Price: $75.0)
    // Monitor (Price: $300.0)
    // Laptop (Price: $1200.0)

    // Using a lambda for a different sorting (e.g., by name descending)
    Map<Product, Integer> productNamesDesc = new TreeMap<>((p1, p2) -> p2.getName().compareTo(p1.getName()));
    productNamesDesc.put(new Product("P003", "Laptop", 1200.00), 1);
    productNamesDesc.put(new Product("P001", "Mouse", 25.00), 1);
    productNamesDesc.put(new Product("P002", "Keyboard", 75.00), 1);

    System.out.println("\nProduct Names (sorted by Name Descending):");
    for (Map.Entry<Product, Integer> entry : productNamesDesc.entrySet()) {
      System.out.println(entry.getKey().getName());
    }
    // Output:
    // Mouse
    // Laptop
    // Keyboard
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: When to Prefer 'TreeMap'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Choose 'TreeMap' when you need the keys of your map to be automatically sorted, or when you need to perform operations that rely on the order of keys (like finding the first/last entry, or getting sub-maps within a key range). If order is not a concern and raw performance is paramount, 'HashMap' is usually a better choice.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Consistency of 'equals()' and 'compareTo()' for Keys</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When using custom objects as keys in a 'TreeMap' (especially if they implement 'Comparable'), it is crucial that the 'compareTo()' method (or the 'Comparator') is **consistent with 'equals()'**. This means that if 'a.equals(b)' is true, then 'a.compareTo(b)' (or 'comparator.compare(a, b)') must return 0. If this contract is violated, the map will behave erratically, potentially storing duplicate entries for keys that are 'equal' but not 'compareTo'-equal, or failing to find entries.
    </div>
</div>
`;

export default function JavaTreeMapPage() {
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
          prevLesson="java-hashmap"
          nextLesson="java-linkedhashmap"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
