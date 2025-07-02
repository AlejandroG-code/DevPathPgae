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
# Java List Sorting

Sorting elements within a 'List' is a very common operation in Java programming. The Java Collections Framework provides powerful and flexible ways to sort lists, allowing you to sort elements based on their natural order or define custom sorting criteria.

## Why Sort Lists?

-   **Presentation:** Display data in a user-friendly, ordered manner.
-   **Searching:** Sorted lists enable efficient searching algorithms (e.g., binary search).
-   **Algorithm Requirements:** Many algorithms require input data to be sorted.
-   **Data Analysis:** Easier to analyze and process ordered data.

## Sorting Methods

Java offers several ways to sort a 'List':

1.  **'Collections.sort(List\<T\> list)'**: Sorts the elements of the specified list into ascending order, according to the elements' natural ordering.
2.  **'Collections.sort(List\<T\> list, Comparator<? super T> c)'**: Sorts the elements of the specified list according to the order induced by the specified 'Comparator'.
3.  **'List.sort(Comparator<? super E> c)' (Java 8+)**: Sorts this list according to the order induced by the specified 'Comparator'. This is a default method on the 'List' interface.

---

## 1. Sorting by Natural Order ('Collections.sort()')

The 'Collections.sort(List\<T\> list)' method sorts a list whose elements implement the 'Comparable' interface. 'Comparable' defines a natural ordering for objects. Many built-in Java classes like 'String', 'Integer', 'Double', 'Date', etc., already implement 'Comparable'.

**Requirements:** The elements in the list must implement the 'Comparable' interface.

**Example:**

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class NaturalOrderSortingExample {
  public static void main(String[] args) {
    List<String> fruits = new ArrayList<>();
    fruits.add("Banana");
    fruits.add("Apple");
    fruits.add("Cherry");
    fruits.add("Date");

    System.out.println("Original fruits: " + fruits); // Output: [Banana, Apple, Cherry, Date]

    // Sort the list using natural ordering (alphabetical for Strings)
    Collections.sort(fruits);

    System.out.println("Sorted fruits: " + fruits);   // Output: [Apple, Banana, Cherry, Date]

    List<Integer> numbers = new ArrayList<>();
    numbers.add(5);
    numbers.add(2);
    numbers.add(8);
    numbers.add(1);

    System.out.println("Original numbers: " + numbers); // Output: [5, 2, 8, 1]

    // Sort the list using natural ordering (numerical for Integers)
    Collections.sort(numbers);

    System.out.println("Sorted numbers: " + numbers);   // Output: [1, 2, 5, 8]
  }
}
\`\`\`

---

## 2. Custom Sorting with 'Comparator' ('Collections.sort()')

When you need to sort objects that do not have a natural order, or you want to sort them in a different order than their natural one, you use a 'Comparator'. A 'Comparator' is a functional interface that defines an alternative comparison logic.

**Requirements:** You need to provide an implementation of the 'Comparator' interface.

**Example: Sorting Custom Objects by a Field**

Let's say we have a 'Person' class and we want to sort a list of 'Person' objects by their age.

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class Person {
  String name;
  int age;

  public Person(String name, int age) {
    this.name = name;
    this.age = age;
  }

  @Override
  public String toString() {
    return name + " (" + age + ")";
  }

  public String getName() {
    return name;
  }

  public int getAge() {
    return age;
  }
}

public class CustomSortingExample {
  public static void main(String[] args) {
    List<Person> people = new ArrayList<>();
    people.add(new Person("Alice", 30));
    people.add(new Person("Bob", 25));
    people.add(new Person("Charlie", 35));
    people.add(new Person("David", 25)); // Another person with age 25

    System.out.println("Original people: " + people); 
    // Output: [Alice (30), Bob (25), Charlie (35), David (25)]

    // Sort by age using an anonymous inner class Comparator (pre-Java 8 style)
    Collections.sort(people, new Comparator<Person>() {
      @Override
      public int compare(Person p1, Person p2) {
        return Integer.compare(p1.getAge(), p2.getAge()); // Sort by age ascending
      }
    });
    System.out.println("Sorted by age (asc): " + people);
    // Output: [Bob (25), David (25), Alice (30), Charlie (35)]

    // Sort by name using a Lambda Expression (Java 8+)
    // Lambda expressions are a concise way to implement functional interfaces
    Collections.sort(people, (p1, p2) -> p1.getName().compareTo(p2.getName()));
    System.out.println("Sorted by name (asc): " + people);
    // Output: [Alice (30), Bob (25), Charlie (35), David (25)] (order might vary for same age)

    // Sort by age descending using a Lambda Expression
    Collections.sort(people, (p1, p2) -> Integer.compare(p2.getAge(), p1.getAge())); // p2 vs p1 for descending
    System.out.println("Sorted by age (desc): " + people);
    // Output: [Charlie (35), Alice (30), Bob (25), David (25)] (order might vary for same age)
  }
}
\`\`\`

---

## 3. Sorting with 'List.sort()' (Java 8+)

From Java 8 onwards, the 'List' interface itself has a 'sort()' default method. This method takes a 'Comparator' as an argument and sorts the list in place. It's often preferred over 'Collections.sort()' when you're working directly with a 'List' instance.

**Requirements:** Requires a 'Comparator' (can be a lambda expression).

**Example:**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class ListSortExample {
  public static void main(String[] args) {
    List<String> colors = new ArrayList<>();
    colors.add("Red");
    colors.add("Green");
    colors.add("Blue");
    colors.add("Yellow");

    System.out.println("Original colors: " + colors); // Output: [Red, Green, Blue, Yellow]

    // Sort by natural order (alphabetical) using List.sort() with a Comparator
    // Comparator.naturalOrder() is a static method in Comparator interface (Java 8+)
    colors.sort(Comparator.naturalOrder()); 
    System.out.println("Sorted colors (natural): " + colors); // Output: [Blue, Green, Red, Yellow]

    // Sort by length (ascending) using a lambda expression
    colors.sort((s1, s2) -> Integer.compare(s1.length(), s2.length()));
    System.out.println("Sorted colors (by length): " + colors); // Output: [Red, Blue, Green, Yellow]

    // Sort by length (descending) then by natural order for tie-breaking
    colors.sort(Comparator.comparingInt(String::length).reversed().thenComparing(Comparator.naturalOrder()));
    System.out.println("Sorted colors (length desc, then natural): " + colors); 
    // Output: [Yellow, Green, Blue, Red] (assuming Yellow and Green are same length, then alphabetical)
  }
}
\`\`\`
**Note:** 'Comparator.comparingInt(String::length)' and 'thenComparing(Comparator.naturalOrder())' are powerful features introduced in Java 8 that allow for chained comparisons. 'String::length' is a method reference.

---

## Summary of List Sorting Methods

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Usage</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Java Version</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Collections.sort(List)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Sorts list by elements' natural order.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Elements must implement 'Comparable'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">All Java versions</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Collections.sort(List, Comparator)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Sorts list using a custom 'Comparator'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Provide a 'Comparator' implementation (lambda recommended for Java 8+).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">All Java versions</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'List.sort(Comparator)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Sorts the list in place using a 'Comparator'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Provide a 'Comparator' implementation (lambda recommended).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Java 8+</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use 'Comparator.comparing()' for Conciseness</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For sorting custom objects based on one or more of their fields, Java 8's 'Comparator.comparing()' (and its variants like 'comparingInt', 'comparingDouble') combined with method references or lambda expressions provides a very concise and readable way to define comparators. You can also chain 'thenComparing()' for multi-level sorting.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Modifying During Iteration</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be extremely careful when modifying a list (adding or removing elements) while iterating over it using a traditional 'for-each' loop. This can lead to a 'ConcurrentModificationException'. If you need to modify a list during iteration, use an 'Iterator' and its 'remove()' method, or iterate using a traditional 'for' loop and adjust the index carefully. Sorting itself modifies the list in place, so it's not an iteration problem, but it's a general list manipulation caution.
    </div>
</div>
`;

export default function JavaListSortingPage() {
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
          prevLesson="java-linkedlist"
          nextLesson="java-set"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
