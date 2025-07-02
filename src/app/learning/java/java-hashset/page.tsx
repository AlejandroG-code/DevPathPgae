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
# Java HashSet

The 'HashSet' class is the most popular implementation of the 'Set' interface in the Java Collections Framework. It uses a **hash table** for storage, which allows for very fast operations.

## Key Characteristics of 'HashSet':

-   **No Duplicates:** Like all 'Set' implementations, 'HashSet' does not allow duplicate elements. If you try to add an element that already exists, the 'add()' method returns 'false', and the set remains unchanged.
-   **No Guaranteed Order:** Elements in a 'HashSet' are not stored in any particular order. The order of elements returned by an iterator is not guaranteed to be the same as the insertion order, nor is it sorted. It can even change over time due to rehashing.
-   **Null Elements:** 'HashSet' allows one 'null' element.
-   **Non-Synchronized:** 'HashSet' is not thread-safe. If multiple threads access a 'HashSet' concurrently and at least one of them modifies the set, it must be synchronized externally.
-   **Performance:** Offers constant-time performance (O(1)) for basic operations ('add', 'remove', 'contains', 'size') on average, assuming a good hash function. In the worst-case scenario (poor hash function leading to many collisions), performance can degrade to O(n).

## How 'HashSet' Works (Briefly)

'HashSet' uses a 'HashMap' internally to store its elements. When you add an element to a 'HashSet', it stores the element as a key in the internal 'HashMap' with a dummy value. The 'hashCode()' method of the element is used to determine where to store the element (its bucket), and the 'equals()' method is used to check for uniqueness and resolve collisions.

## When to Use 'HashSet'?

'HashSet' is the best choice when:
-   You need to store a collection of unique elements.
-   You prioritize fast average-case performance for adding, removing, and checking for the presence of elements.
-   The order of elements is not important to your application.

## Common Methods of 'HashSet'

'HashSet' implements all methods from the 'Set' interface. Here are some of the most frequently used ones, along with their typical average-case time complexities:

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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns an iterator over the elements in this set.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(1) for creation, O(n) for full traversal</td>
        </tr>
    </tbody>
</table>

## Example: Using 'HashSet'

\`\`\`java
import java.util.HashSet;
import java.util.Set;

public class HashSetExample {
  public static void main(String[] args) {
    // Creating a HashSet of Strings
    Set<String> fruits = new HashSet<>();

    // 1. Adding elements
    fruits.add("Apple");
    fruits.add("Banana");
    fruits.add("Cherry");
    fruits.add("Apple"); // Attempt to add duplicate - returns false

    System.out.println("Initial HashSet: " + fruits); 
    // Output: [Cherry, Apple, Banana] (order is not guaranteed and may vary)

    // 2. Check if adding a duplicate was successful
    boolean addedDuplicate = fruits.add("Apple");
    System.out.println("Was 'Apple' added again? " + addedDuplicate); // Output: false

    boolean addedNew = fruits.add("Grape");
    System.out.println("Was 'Grape' added? " + addedNew); // Output: true
    System.out.println("Set after adding Grape: " + fruits); 
    // Output: [Cherry, Grape, Apple, Banana] (order still not guaranteed)

    // 3. Check size
    System.out.println("Current size of set: " + fruits.size()); // Output: 4

    // 4. Check if contains
    System.out.println("Does set contain 'Banana'? " + fruits.contains("Banana")); // Output: true
    System.out.println("Does set contain 'Mango'? " + fruits.contains("Mango"));   // Output: false

    // 5. Remove an element
    boolean removedCherry = fruits.remove("Cherry");
    System.out.println("Was 'Cherry' removed? " + removedCherry); // Output: true
    System.out.println("Set after removing Cherry: " + fruits); 
    // Output: [Grape, Apple, Banana] (order not guaranteed)

    // 6. Iterating through the HashSet (order not guaranteed)
    System.out.println("\nFruits in the set:");
    for (String fruit : fruits) {
      System.out.println("- " + fruit);
    }

    // 7. Clearing the HashSet
    fruits.clear();
    System.out.println("\nHashSet after clearing: " + fruits); // Output: []
    System.out.println("Is HashSet empty? " + fruits.isEmpty()); // Output: true
  }
}
\`\`\`

## Important: 'hashCode()' and 'equals()' for Custom Objects

When storing custom objects (instances of your own classes) in a 'HashSet', it is absolutely critical that you correctly override both the 'hashCode()' and 'equals()' methods in your class.

-   **'hashCode()'**: Used by 'HashSet' to determine the bucket where an object should be stored. If two objects are considered equal, their 'hashCode()' must return the same integer.
-   **'equals()'**: Used by 'HashSet' (after 'hashCode()' has narrowed down the bucket) to determine if two objects are truly equal (i.e., if a duplicate is being added). If two objects are equal according to 'equals()', their 'hashCode()' must also be equal.

**Consequences of Not Overriding Correctly:**
-   **Duplicates:** If 'equals()' is not overridden, 'HashSet' might store duplicate objects (based on memory address, not content).
-   **Lost Elements:** If 'hashCode()' is not overridden or is implemented poorly, 'contains()' or 'remove()' might not find an element even if it exists, because it looks in the wrong bucket.

**Example with Custom Object (Correctly Overridden 'hashCode()' and 'equals()'):**

\`\`\`java
import java.util.HashSet;
import java.util.Objects; // Utility for Objects.hash() and Objects.equals()
import java.util.Set;

class Product {
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

  // IMPORTANT: Override both hashCode() and equals()
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Product product = (Product) o;
    // Two products are equal if their IDs are the same
    return Objects.equals(id, product.id); 
  }

  @Override
  public int hashCode() {
    // Hash code based on the 'id' field, as it determines equality
    return Objects.hash(id);
  }
}

public class HashSetCustomObjectExample {
  public static void main(String[] args) {
    Set<Product> products = new HashSet<>();

    Product p1 = new Product("A101", "Laptop", 1200.00);
    Product p2 = new Product("B202", "Mouse", 25.00);
    Product p3 = new Product("A101", "Laptop Pro", 1500.00); // Same ID as p1, different name/price

    products.add(p1);
    products.add(p2);
    products.add(p3); // This will NOT be added because its ID is "A101", which already exists

    System.out.println("Products in HashSet:");
    for (Product p : products) {
      System.out.println(p);
    }
    // Output (order may vary):
    // Product[id='B202', name='Mouse', price=25.0]
    // Product[id='A101', name='Laptop', price=1200.0] (p3 was not added)

    System.out.println("Size of products set: " + products.size()); // Output: 2

    Product searchProduct = new Product("A101", "Any Name", 0.0); // Only ID matters for equality
    System.out.println("Does set contain product with ID 'A101'? " + products.contains(searchProduct)); // Output: true
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Default Choice for Unique Elements</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        'HashSet' is typically the default choice when you need a collection of unique elements and the order of elements is not important. Its average-case constant-time performance makes it very efficient for most common set operations.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Mutable Objects in HashSet</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Avoid storing mutable objects in a 'HashSet' if their 'hashCode()' or 'equals()' methods depend on the mutable state. If an object's state changes after it has been added to a 'HashSet' in a way that affects its 'hashCode()', the object might become "lost" in the set. You might not be able to retrieve it or remove it, as the set will look for it in the wrong bucket based on its new hash code.
    </div>
</div>
`;

export default function JavaHashSetPage() {
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
          prevLesson="java-set"
          nextLesson="java-treeset"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
