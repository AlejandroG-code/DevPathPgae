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
# Java Advanced Sorting

While the 'Collections.sort()' and 'List.sort()' methods provide basic sorting capabilities, Java offers powerful features for more complex and flexible sorting scenarios, especially when dealing with custom objects or multiple sorting criteria. This lesson delves into these advanced sorting techniques, primarily leveraging Java 8's enhancements to the 'Comparator' interface.

## Recap: 'Comparable' vs. 'Comparator'

Before diving into advanced sorting, let's quickly recap the two core interfaces for defining order in Java:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'Comparable'</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'Comparator'</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Purpose</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Defines the **natural ordering** of objects.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Defines an **external, custom ordering** for objects.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Interface</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'java.lang.Comparable<T>'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'java.util.Comparator<T>'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Method</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'int compareTo(T o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'int compare(T o1, T o2)'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Implementation</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Implemented by the class whose objects are being sorted.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Implemented by a separate class or as a lambda/anonymous class.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Usage</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Collections.sort(List<T>)' or 'Arrays.sort(T[])'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Collections.sort(List<T>, Comparator<T>)', 'List.sort(Comparator<T>)', 'Arrays.sort(T[], Comparator<T>)'</td>
        </tr>
    </tbody>
</table>

---

## 1. Comparator Chaining (Java 8+)

Java 8 introduced default and static methods to the 'Comparator' interface, making it incredibly powerful for building complex sorting logic concisely using method chaining and lambda expressions.

### 'Comparator.comparing()'

This static method takes a 'Function' that extracts a 'Comparable' key from an object and returns a 'Comparator' that sorts by that key.

**Syntax:**
\`\`\`java
Comparator.comparing(Function<T, ? extends Comparable> keyExtractor)
\`\`\`
Or for primitive types to avoid autoboxing overhead:
\`\`\`java
Comparator.comparingInt(ToIntFunction<T> keyExtractor)
Comparator.comparingLong(ToLongFunction<T> keyExtractor)
Comparator.comparingDouble(ToDoubleFunction<T> keyExtractor)
\`\`\`

**Example:** Sorting a list of 'Product' objects by their 'price'.

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class Product {
  String name;
  double price;
  int stock;

  public Product(String name, double price, int stock) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

  public String getName() { return name; }
  public double getPrice() { return price; }
  public int getStock() { return stock; }

  @Override
  public String toString() {
    return "Product{name='" + name + "', price=" + price + ", stock=" + stock + '}';
  }
}

public class ComparatorComparingExample {
  public static void main(String[] args) {
    List<Product> products = new ArrayList<>();
    products.add(new Product("Laptop", 1200.00, 5));
    products.add(new Product("Mouse", 25.00, 20));
    products.add(new Product("Keyboard", 75.00, 10));
    products.add(new Product("Monitor", 300.00, 8));

    System.out.println("Original Products:");
    products.forEach(System.out::println);

    // Sort by price (ascending) using Comparator.comparingDouble
    products.sort(Comparator.comparingDouble(Product::getPrice));
    System.out.println("\nSorted by Price (Ascending):");
    products.forEach(System.out::println);
    // Output:
    // Product{name='Mouse', price=25.0, stock=20}
    // Product{name='Keyboard', price=75.0, stock=10}
    // Product{name='Monitor', price=300.0, stock=8}
    // Product{name='Laptop', price=1200.0, stock=5}
  }
}
\`\`\`

### 'thenComparing()'

This method allows you to define secondary (and tertiary, etc.) sorting criteria. If two objects are "equal" according to the primary comparator, the 'thenComparing()' comparator is used to break the tie.

**Syntax:**
\`\`\`java
Comparator<T> primaryComparator.thenComparing(Comparator<T> secondaryComparator)
Comparator<T> primaryComparator.thenComparing(Function<T, ? extends Comparable> secondaryKeyExtractor)
\`\`\`

**Example:** Sort products by 'price' first, then by 'name' for products with the same price.

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

// Product class as defined previously

public class ComparatorThenComparingExample {
  public static void main(String[] args) {
    List<Product> products = new ArrayList<>();
    products.add(new Product("Laptop", 1200.00, 5));
    products.add(new Product("Mouse", 25.00, 20));
    products.add(new Product("Keyboard", 75.00, 10));
    products.add(new Product("Monitor", 300.00, 8));
    products.add(new Product("Gaming Mouse", 25.00, 15)); // Same price as "Mouse"

    System.out.println("Original Products:");
    products.forEach(System.out::println);

    // Sort by price (ascending), then by name (alphabetical) for ties
    products.sort(Comparator.comparingDouble(Product::getPrice)
                            .thenComparing(Product::getName)); // Secondary sort by name
    System.out.println("\nSorted by Price then Name:");
    products.forEach(System.out::println);
    // Output (notice "Gaming Mouse" now comes before "Mouse" due to alphabetical order):
    // Product{name='Gaming Mouse', price=25.0, stock=15}
    // Product{name='Mouse', price=25.0, stock=20}
    // Product{name='Keyboard', price=75.0, stock=10}
    // Product{name='Monitor', price=300.0, stock=8}
    // Product{name='Laptop', price=1200.0, stock=5}
  }
}
\`\`\`

### 'reversed()'

This method reverses the order of a comparator.

**Syntax:**
\`\`\`java
Comparator<T> originalComparator.reversed()
\`\`\`

**Example:** Sort products by 'price' in descending order.

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

// Product class as defined previously

public class ComparatorReversedExample {
  public static void main(String[] args) {
    List<Product> products = new ArrayList<>();
    products.add(new Product("Laptop", 1200.00, 5));
    products.add(new Product("Mouse", 25.00, 20));
    products.add(new Product("Keyboard", 75.00, 10));

    System.out.println("Original Products:");
    products.forEach(System.out::println);

    // Sort by price (descending)
    products.sort(Comparator.comparingDouble(Product::getPrice).reversed());
    System.out.println("\nSorted by Price (Descending):");
    products.forEach(System.out::println);
    // Output:
    // Product{name='Laptop', price=1200.0, stock=5}
    // Product{name='Keyboard', price=75.0, stock=10}
    // Product{name='Mouse', price=25.0, stock=20}
  }
}
\`\`\`

---

## 2. Sorting Arrays

While the examples above focus on 'List' sorting, similar methods exist for arrays using the 'java.util.Arrays' class.

-   **'Arrays.sort(primitiveArray)'**: Sorts primitive arrays (e.g., 'int[]', 'double[]') in ascending order.
-   **'Arrays.sort(Object[] a)'**: Sorts an array of objects according to their natural ordering (elements must implement 'Comparable').
-   **'Arrays.sort(T[] a, Comparator<? super T> c)'**: Sorts an array of objects according to the order induced by the specified 'Comparator'.

**Example: Sorting Arrays**

\`\`\`java
import java.util.Arrays;
import java.util.Comparator;

// Product class as defined previously

public class ArraySortingExample {
  public static void main(String[] args) {
    int[] numbers = {5, 2, 8, 1, 9};
    Arrays.sort(numbers); // Sorts primitive array
    System.out.println("Sorted int array: " + Arrays.toString(numbers)); // Output: [1, 2, 5, 8, 9]

    String[] names = {"Charlie", "Alice", "Bob"};
    Arrays.sort(names); // Sorts String array by natural order
    System.out.println("Sorted String array: " + Arrays.toString(names)); // Output: [Alice, Bob, Charlie]

    Product[] products = {
      new Product("Laptop", 1200.00, 5),
      new Product("Mouse", 25.00, 20),
      new Product("Keyboard", 75.00, 10)
    };

    // Sort Product array by stock (ascending) using a Comparator
    Arrays.sort(products, Comparator.comparingInt(Product::getStock));
    System.out.println("\nSorted Product array by Stock:");
    for (Product p : products) {
      System.out.println(p);
    }
    // Output:
    // Product{name='Laptop', price=1200.0, stock=5}
    // Product{name='Keyboard', price=75.0, stock=10}
    // Product{name='Mouse', price=25.0, stock=20}
  }
}
\`\`\`

---

## 3. Custom Sorting with Multiple Criteria

Combining 'comparing()' and 'thenComparing()' allows for highly flexible and readable multi-level sorting.

**Example: Sort 'Student' objects by 'grade' (descending), then by 'name' (alphabetical), then by 'age' (ascending).**

\`\`\`java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
  String name;
  int age;
  double grade;

  public Student(String name, int age, double grade) {
    this.name = name;
    this.age = age;
    this.grade = grade;
  }

  public String getName() { return name; }
  public int getAge() { return age; }
  public double getGrade() { return grade; }

  @Override
  public String toString() {
    return "Student{name='" + name + "', age=" + age + ", grade=" + grade + '}';
  }
}

public class MultiCriteriaSortingExample {
  public static void main(String[] args) {
    List<Student> students = new ArrayList<>();
    students.add(new Student("Alice", 20, 90.5));
    students.add(new Student("Bob", 22, 88.0));
    students.add(new Student("Charlie", 21, 90.5)); // Same grade as Alice
    students.add(new Student("David", 20, 88.0));   // Same grade as Bob
    students.add(new Student("Eve", 19, 95.0));

    System.out.println("Original Students:");
    students.forEach(System.out::println);

    // Define a complex comparator:
    // 1. Sort by grade (descending)
    // 2. Then by name (alphabetical ascending)
    // 3. Then by age (ascending)
    Comparator<Student> studentComparator = Comparator
        .comparingDouble(Student::getGrade).reversed() // Primary: Grade Descending
        .thenComparing(Student::getName)               // Secondary: Name Ascending
        .thenComparingInt(Student::getAge);            // Tertiary: Age Ascending

    students.sort(studentComparator);

    System.out.println("\nSorted Students (Grade Desc, Name Asc, Age Asc):");
    students.forEach(System.out::println);
    // Expected Output:
    // Student{name='Eve', age=19, grade=95.0}
    // Student{name='Alice', age=20, grade=90.5}
    // Student{name='Charlie', age=21, grade=90.5}
    // Student{name='Bob', age=22, grade=88.0}
    // Student{name='David', age=20, grade=88.0}
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use Method References for Readability</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When using 'Comparator.comparing()', 'comparingInt()', etc., method references (e.g., 'Product::getPrice', 'Student::getName') make the code extremely concise and readable. They are a shorthand for lambda expressions that simply call an existing method.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Performance Considerations</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While Java's sorting algorithms (typically Timsort for objects) are highly optimized, sorting large collections can still be computationally expensive (O(n log n)). For very large datasets or performance-critical applications, consider:
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>**Pre-sorting:** If data is frequently accessed in sorted order, sort it once and maintain the order.</li>
            <li>**Specialized Data Structures:** If you need constant sorted access, a 'TreeSet' or 'TreeMap' might be more appropriate than repeatedly sorting a 'List'.</li>
            <li>**Parallel Sorting (Java 8+):** For large arrays, 'Arrays.parallelSort()' can utilize multiple cores to speed up sorting.</li>
        </ul>
    </div>
</div>
`;

export default function JavaAdvancedSortingPage() {
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
          prevLesson="java-lambda"
          nextLesson="" // This is the last lesson in Part 8
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
