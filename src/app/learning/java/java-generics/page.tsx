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
# Java Generics

**Generics** are a powerful feature introduced in Java 5 that allow you to write classes, interfaces, and methods that operate on objects of various types while providing compile-time type safety. They enable you to define classes and methods with placeholder types (type parameters) that are specified when the class or method is used.

## Why Use Generics?

Before generics, collections stored objects of type 'Object', requiring explicit casting and leading to runtime errors if types were mismatched. Generics solve this by:

1.  **Type Safety:** Generics enforce type checking at compile-time, catching type-mismatch errors before the program runs. This prevents 'ClassCastException' at runtime.
2.  **Eliminating Type Casting:** With generics, you don't need to explicitly cast objects retrieved from collections, making the code cleaner and more readable.
3.  **Code Reusability:** You can write a single generic class or method that works with different types, reducing code duplication.

## Basic Syntax of Generics

Type parameters are typically single uppercase letters, by convention:
-   'E' for Element (used in Collections)
-   'K' for Key (used in Maps)
-   'V' for Value (used in Maps)
-   'T' for Type
-   'N' for Number
-   'S', 'U', 'V' for other types

---

## 1. Generic Classes

You can define a class with one or more type parameters.

**Syntax:**

\`\`\`java
class MyGenericClass<T> {
  // T can be used as a type inside the class
}
\`\`\`

**Example:**

\`\`\`java
// A generic class to hold a single item of any type
class Box<T> {
  private T item;

  public Box(T item) {
    this.item = item;
  }

  public T getItem() {
    return item;
  }

  public void setItem(T item) {
    this.item = item;
  }

  public void showType() {
    System.out.println("Type of item: " + item.getClass().getName());
  }
}

public class GenericClassExample {
  public static void main(String[] args) {
    // Creating a Box for Integer
    Box<Integer> integerBox = new Box<>(10);
    System.out.println("Integer Box value: " + integerBox.getItem()); // No cast needed
    integerBox.showType(); // Output: Type of item: java.lang.Integer

    // Creating a Box for String
    Box<String> stringBox = new Box<>("Hello Generics");
    System.out.println("String Box value: " + stringBox.getItem()); // No cast needed
    stringBox.showType(); // Output: Type of item: java.lang.String

    // Compile-time type safety:
    // integerBox.setItem("World"); // COMPILE-TIME ERROR: Incompatible types!
  }
}
\`\`\`

---

## 2. Generic Methods

You can also define methods that are generic, meaning they can operate on different types. The type parameter is declared before the return type of the method.

**Syntax:**

\`\`\`java
public <T> T genericMethod(T arg) {
  // method body
}
\`\`\`

**Example:**

\`\`\`java
public class GenericMethodExample {

  // A generic method that prints an array of any type
  public static <E> void printArray(E[] inputArray) {
    for (E element : inputArray) {
      System.out.printf("%s ", element);
    }
    System.out.println();
  }

  // A generic method that returns the first element of an array
  public static <T> T getFirstElement(T[] array) {
    if (array != null && array.length > 0) {
      return array[0];
    }
    return null; // Or throw an exception
  }

  public static void main(String[] args) {
    Integer[] intArray = {1, 2, 3, 4, 5};
    Double[] doubleArray = {1.1, 2.2, 3.3};
    Character[] charArray = {'H', 'E', 'L', 'L', 'O'};

    System.out.print("Integer Array: ");
    printArray(intArray); // Inferred type: Integer

    System.out.print("Double Array: ");
    printArray(doubleArray); // Inferred type: Double

    System.out.print("Character Array: ");
    printArray(charArray); // Inferred type: Character

    System.out.println("First Integer: " + getFirstElement(intArray)); // Inferred type: Integer
    System.out.println("First Character: " + getFirstElement(charArray)); // Inferred type: Character
  }
}
\`\`\`

---

## 3. Bounded Type Parameters

Sometimes you want to restrict the types that can be used as type arguments for a generic class or method. This is done using **bounded type parameters**.

### Upper Bounded Wildcards ('<? extends T>')

Restricts the type parameter to be a subtype of a given type 'T'. Used when you want to read values from a generic collection. ("Producer Extends")

**Syntax:**

\`\`\`java
<T extends SuperClass> // T must be SuperClass or a subclass of SuperClass
\`\`\`

**Example:**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class UpperBoundExample {

  // Method to sum numbers in a list. Accepts List of Number or its subtypes (Integer, Double, etc.)
  public static double sumOfList(List<? extends Number> list) {
    double sum = 0.0;
    for (Number num : list) {
      sum += num.doubleValue();
    }
    // list.add(new Integer(10)); // COMPILE-TIME ERROR! Cannot add to a <? extends T> list.
                               // You can only read from it.
    return sum;
  }

  public static void main(String[] args) {
    List<Integer> integers = new ArrayList<>();
    integers.add(1);
    integers.add(2);
    System.out.println("Sum of integers: " + sumOfList(integers)); // Output: 3.0

    List<Double> doubles = new ArrayList<>();
    doubles.add(1.5);
    doubles.add(2.5);
    System.out.println("Sum of doubles: " + sumOfList(doubles));   // Output: 4.0

    // List<String> strings = new ArrayList<>();
    // strings.add("hello");
    // sumOfList(strings); // COMPILE-TIME ERROR! String is not a subtype of Number.
  }
}
\`\`\`

### Lower Bounded Wildcards ('<? super T>')

Restricts the type parameter to be a supertype of a given type 'T'. Used when you want to write values into a generic collection. ("Consumer Super")

**Syntax:**

\`\`\`java
<T super SubClass> // T must be SubClass or a superclass of SubClass
\`\`\`

**Example:**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class LowerBoundExample {

  // Method to add integers to a list. Accepts List of Integer or its supertypes (Number, Object).
  public static void addIntegers(List<? super Integer> list) {
    list.add(10); // Can add Integer
    list.add(20); // Can add Integer
    // Integer i = list.get(0); // COMPILE-TIME ERROR! Cannot read as Integer, only as Object.
                               // You can only write to it.
  }

  public static void main(String[] args) {
    List<Integer> integers = new ArrayList<>();
    addIntegers(integers);
    System.out.println("List of Integers: " + integers); // Output: [10, 20]

    List<Number> numbers = new ArrayList<>();
    addIntegers(numbers);
    System.out.println("List of Numbers: " + numbers);   // Output: [10, 20]

    List<Object> objects = new ArrayList<>();
    addIntegers(objects);
    System.out.println("List of Objects: " + objects);   // Output: [10, 20]

    // List<Double> doubles = new ArrayList<>();
    // addIntegers(doubles); // COMPILE-TIME ERROR! Double is not a supertype of Integer.
  }
}
\`\`\`

---

## 4. Wildcards ('?')

The unbounded wildcard '?' means "any type". It's useful when you don't care about the specific type, but you still want to leverage generics for type safety.

**Example:**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class UnboundedWildcardExample {

  // Method that can print elements of any type of List
  public static void printList(List<?> list) {
    for (Object elem : list) { // Elements are treated as Object
      System.out.print(elem + " ");
    }
    System.out.println();
    // list.add("something"); // COMPILE-TIME ERROR! Cannot add anything except null.
                               // You can only read elements as Object.
  }

  public static void main(String[] args) {
    List<Integer> integers = new ArrayList<>();
    integers.add(1);
    integers.add(2);
    printList(integers); // Output: 1 2

    List<String> strings = new ArrayList<>();
    strings.add("Hello");
    strings.add("World");
    printList(strings);   // Output: Hello World
  }
}
\`\`\`

---

## 5. Type Erasure

Generics in Java are implemented using **type erasure**. This means that type information (like 'T', 'E', 'K', 'V') is only present at compile-time and is removed during compilation (at runtime, all generic types are replaced with their bounds or 'Object').

**Implications of Type Erasure:**
-   **No Runtime Type Information:** You cannot use 'instanceof' with generic types (e.g., 'obj instanceof List<String>' is not allowed).
-   **No Generic Array Creation:** You cannot create arrays of generic types (e.g., 'new T[10]' is not allowed).
-   **Bridge Methods:** The compiler generates "bridge methods" to ensure type safety and compatibility with legacy code.

**Example:**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class TypeErasureExample {
  public static void main(String[] args) {
    List<String> stringList = new ArrayList<>();
    List<Integer> integerList = new ArrayList<>();

    // At runtime, both stringList and integerList are just List<Object>
    // Their generic type information is erased.
    System.out.println(stringList.getClass() == integerList.getClass()); // Output: true

    // This is not allowed:
    // if (stringList instanceof List<String>) { // Compile-time error
    //   System.out.println("It's a list of strings!");
    // }

    // This is allowed:
    if (stringList instanceof List) { // Checks against raw type List
      System.out.println("It's a List!");
    }
  }
}
\`\`\`

---

## Benefits of Generics Summarized

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Benefit</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Type Safety</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Detects type-mismatch errors at compile time, reducing runtime exceptions.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Eliminates Casts</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Removes the need for explicit type casting, making code cleaner and more readable.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Code Reusability</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Allows writing a single class/method that works with various types.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Improved Performance (Minor)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Can sometimes lead to minor performance improvements by avoiding runtime type checks and casts.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Follow PECS (Producer Extends, Consumer Super)</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        A useful mnemonic for deciding when to use 'extends' or 'super' with wildcards is **PECS**:
        <ul class="list-disc list-inside ml-4 mt-2 space-y-1">
            <li>If you are only **P**roducing (reading) elements from a generic collection, use '<? **E**xtends T>'.</li>
            <li>If you are only **C**onsuming (writing) elements into a generic collection, use '<? **S**uper T>'.</li>
        </ul>
        If you need to both read and write, you typically won't use a wildcard, or you'll use an exact type.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Raw Types</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Using **raw types** (e.g., 'List myList = new ArrayList();' instead of 'List<String> myList = new ArrayList<>();') defeats the purpose of generics. While it might compile (with warnings), it sacrifices type safety and can lead to 'ClassCastException' at runtime. Always use parameterized types unless you are dealing with legacy code that cannot be updated.
    </div>
</div>
`;

export default function JavaGenericsPage() {
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
          prevLesson="java-wrapper-classes"
          nextLesson="java-annotations"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
