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
# Java TreeSet

The 'TreeSet' class is an implementation of the 'Set' interface that stores its elements in a **sorted order**. It uses a **Red-Black Tree** data structure internally, which ensures that elements are always kept in a sorted sequence.

## Key Characteristics of 'TreeSet':

-   **Sorted Order:** Elements are stored and retrieved in ascending order (natural ordering) or according to a custom 'Comparator'.
-   **No Duplicates:** Like all 'Set' implementations, 'TreeSet' does not allow duplicate elements.
-   **No Null Elements:** 'TreeSet' does not allow 'null' elements (unlike 'HashSet'). Attempting to add a 'null' will result in a 'NullPointerException'.
-   **Non-Synchronized:** 'TreeSet' is not thread-safe. External synchronization is required for concurrent access in multi-threaded environments.
-   **Performance:** Offers guaranteed log(n) time complexity for basic operations ('add', 'remove', 'contains', 'size'). This is generally slower than 'HashSet' (O(1) average) but provides the benefit of sorted elements.

## How 'TreeSet' Maintains Order

'TreeSet' relies on elements being comparable to each other. There are two ways to define this comparability:

1.  **Natural Ordering (using 'Comparable')**: If the elements you want to store in the 'TreeSet' implement the 'java.lang.Comparable' interface, 'TreeSet' will use their natural ordering. Many built-in Java classes (like 'String', 'Integer') already implement 'Comparable'.
2.  **Custom Ordering (using 'Comparator')**: If your custom objects do not have a natural ordering, or if you want to sort them based on a different criterion, you can provide a 'java.util.Comparator' instance to the 'TreeSet' constructor.

## When to Use 'TreeSet'?

'TreeSet' is the best choice when:
-   You need to store a collection of unique elements.
-   You need the elements to be stored and retrieved in a sorted order.
-   You need efficient operations for finding elements within a range (e.g., 'subSet', 'headSet', 'tailSet').

## Common Methods of 'TreeSet'

'TreeSet' implements all methods from the 'Set' interface and also provides additional methods from the 'SortedSet' and 'NavigableSet' interfaces for dealing with ordered elements.

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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Adds the specified element to this set if it is not already present.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'remove(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the specified element from this set if it is present.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'contains(Object o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'true' if this set contains the specified element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'first()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the first (lowest) element currently in this set.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'last()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the last (highest) element currently in this set.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'headSet(E toElement)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a view of the portion of this set whose elements are strictly less than 'toElement'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n) + O(k) for k elements in view</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'tailSet(E fromElement)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a view of the portion of this set whose elements are greater than or equal to 'fromElement'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n) + O(k) for k elements in view</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'subSet(E fromElement, E toElement)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a view of the portion of this set whose elements range from 'fromElement' (inclusive) to 'toElement' (exclusive).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">O(log n) + O(k) for k elements in view</td>
        </tr>
    </tbody>
</table>

## Example: Using 'TreeSet' with Natural Ordering

\`\`\`java
import java.util.TreeSet;
import java.util.Set; // Good practice to program to the interface

public class TreeSetNaturalOrderExample {
  public static void main(String[] args) {
    // Creating a TreeSet of Strings (String has natural alphabetical order)
    Set<String> uniqueWords = new TreeSet<>();

    uniqueWords.add("Banana");
    uniqueWords.add("Apple");
    uniqueWords.add("Cherry");
    uniqueWords.add("Apple"); // Duplicate, will not be added
    uniqueWords.add("Date");

    System.out.println("TreeSet (Natural Order): " + uniqueWords); 
    // Output: [Apple, Banana, Cherry, Date] (always sorted)

    // Attempt to add null (will throw NullPointerException)
    try {
      uniqueWords.add(null);
    } catch (NullPointerException e) {
      System.out.println("Caught expected exception: Cannot add null to TreeSet.");
    }

    System.out.println("First element: " + ((TreeSet<String>) uniqueWords).first()); // Output: Apple
    System.out.println("Last element: " + ((TreeSet<String>) uniqueWords).last());   // Output: Date

    // Using range views
    Set<String> subSet = ((TreeSet<String>) uniqueWords).subSet("B", "D"); // Elements from B (inclusive) to D (exclusive)
    System.out.println("SubSet (B to D): " + subSet); // Output: [Banana, Cherry]
  }
}
\`\`\`

---

## Example: Using 'TreeSet' with Custom Objects and 'Comparable'

For 'TreeSet' to sort custom objects naturally, the custom class must implement the 'Comparable' interface and override its 'compareTo()' method.

\`\`\`java
import java.util.TreeSet;
import java.util.Set;

// Person class implementing Comparable for natural ordering by age
class Person implements Comparable<Person> {
  String name;
  int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  public String getName() { return name; }
  public int getAge() { return age; }

  @Override
  public String toString() {
    return name + " (" + age + ")";
  }

  // Define natural ordering based on age (ascending)
  @Override
  public int compareTo(Person other) {
    // For ascending order: this.age - other.age
    // For descending order: other.age - this.age
    return Integer.compare(this.age, other.age); 
  }

  // It's good practice to also override equals and hashCode for consistency,
  // although TreeSet uses compareTo for uniqueness and sorting.
  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Person person = (Person) o;
    return age == person.age && name.equals(person.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, age);
  }
}

public class TreeSetComparableExample {
  public static void main(String[] args) {
    Set<Person> people = new TreeSet<>();

    people.add(new Person("Alice", 30));
    people.add(new Person("Bob", 25));
    people.add(new Person("Charlie", 35));
    people.add(new Person("David", 25)); // Same age as Bob, but different name

    System.out.println("People in TreeSet (sorted by age): " + people);
    // Output: [Bob (25), David (25), Alice (30), Charlie (35)]
    // Note: For elements with the same 'compareTo' result (like Bob and David by age),
    // their relative order is not guaranteed by the 'Comparable' contract alone.
    // If you need stable ordering for equal elements, you might need a secondary sort key in compareTo.

    // If we add another person with the exact same name and age as an existing one, it won't be added
    boolean addedDuplicate = people.add(new Person("Bob", 25));
    System.out.println("Was duplicate Bob (25) added? " + addedDuplicate); // Output: false
    System.out.println("People after attempting duplicate add: " + people);
  }
}
\`\`\`

---

## Example: Using 'TreeSet' with Custom 'Comparator'

If you want to sort objects based on criteria other than their natural order, or if the class does not implement 'Comparable', you can provide a 'Comparator' to the 'TreeSet' constructor.

\`\`\`java
import java.util.Comparator;
import java.util.Set;
import java.util.TreeSet;

// Reusing the Person class from the previous example (without Comparable)
// Or assume Person does not implement Comparable
// class Person { ... }

public class TreeSetComparatorExample {
  public static void main(String[] args) {
    // Create a Comparator to sort Person objects by name (alphabetical)
    Comparator<Person> nameComparator = new Comparator<Person>() {
      @Override
      public int compare(Person p1, Person p2) {
        return p1.getName().compareTo(p2.getName());
      }
    };

    // Create a TreeSet using the custom Comparator
    Set<Person> peopleByName = new TreeSet<>(nameComparator);

    peopleByName.add(new Person("Alice", 30));
    peopleByName.add(new Person("Bob", 25));
    peopleByName.add(new Person("Charlie", 35));
    peopleByName.add(new Person("David", 25));

    System.out.println("People in TreeSet (sorted by name): " + peopleByName);
    // Output: [Alice (30), Bob (25), Charlie (35), David (25)]

    // Create a Comparator to sort Person objects by age descending
    Comparator<Person> ageDescendingComparator = (p1, p2) -> Integer.compare(p2.getAge(), p1.getAge());

    Set<Person> peopleByAgeDesc = new TreeSet<>(ageDescendingComparator);
    peopleByAgeDesc.add(new Person("Alice", 30));
    peopleByAgeDesc.add(new Person("Bob", 25));
    peopleByAgeDesc.add(new Person("Charlie", 35));
    peopleByAgeDesc.add(new Person("David", 25));

    System.out.println("People in TreeSet (sorted by age desc): " + peopleByAgeDesc);
    // Output: [Charlie (35), Alice (30), Bob (25), David (25)] (relative order of 25-year-olds may vary)
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: 'TreeSet' vs. 'HashSet'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Choose 'TreeSet' when you need elements to be sorted and uniqueness is a requirement. If the order of elements is not important and you prioritize average-case constant-time performance, 'HashSet' is generally a better choice. The 'log(n)' performance of 'TreeSet' is a trade-off for maintaining sorted order.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Consistency of 'equals()' and 'compareTo()'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When using custom objects in a 'TreeSet' (especially if they implement 'Comparable'), it is crucial that the 'compareTo()' method (or the 'Comparator') is **consistent with 'equals()'**. This means that if 'a.equals(b)' is true, then 'a.compareTo(b)' (or 'comparator.compare(a, b)') must return 0. If this contract is violated, the set will behave erratically, potentially storing duplicate elements that are 'equal' but not 'compareTo'-equal, or failing to find elements.
    </div>
</div>
`;

export default function JavaTreeSetPage() {
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
          prevLesson="java-hashset"
          nextLesson="java-linkedhashset"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
