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
# Java Wrapper Classes

In Java, there are two main categories of data types: **primitive types** (like 'int', 'char', 'boolean', 'double') and **reference types** (objects). While primitive types are fundamental and efficient for simple data, they cannot be used directly with the Java Collections Framework (which stores objects) or with generics. This is where **Wrapper Classes** come into play.

A **Wrapper Class** is a class that "wraps" (or encapsulates) a primitive type into an object. For every primitive data type in Java, there is a corresponding wrapper class.

## Why Do We Need Wrapper Classes?

1.  **Java Collections Framework:** Collections (like 'ArrayList', 'HashSet', 'HashMap') can only store objects. You cannot directly store primitive types in them. Wrapper classes allow you to store primitive values as objects in collections.
2.  **Generics:** Generics in Java work only with objects, not primitive types.
3.  **Null Values:** Primitive types cannot be 'null'. Wrapper classes, being objects, can hold a 'null' value, which can be useful in certain scenarios (e.g., representing the absence of a value).
4.  **Utility Methods:** Wrapper classes provide useful utility methods for converting between types, parsing strings, and other operations (e.g., 'Integer.parseInt()', 'Double.toString()').
5.  **Synchronization:** In multi-threading, objects can be synchronized, but primitive types cannot.

## Primitive Types and Their Wrapper Classes

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Primitive Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Wrapper Class</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'byte'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Byte'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'short'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Short'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'int'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Integer'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'long'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Long'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'float'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Float'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'double'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Double'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'char'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Character'</td>
        </tr>
    </tbody>
</table>

All wrapper classes (except 'Character' and 'Boolean') extend the abstract class 'Number', which provides methods for converting the numeric value of an object into different primitive types (e.g., 'intValue()', 'doubleValue()').

## Autoboxing and Unboxing (Automatic Conversions)

Before Java 5, converting between primitive types and their wrapper objects required manual conversion. This was tedious. Java introduced **autoboxing** and **unboxing** to automate these conversions.

### 1. Autoboxing

**Autoboxing** is the automatic conversion that the Java compiler makes between a primitive type and its corresponding wrapper class object.

**Example:**

\`\`\`java
public class AutoboxingExample {
  public static void main(String[] args) {
    int primitiveInt = 100;
    
    // Autoboxing: primitive int is automatically converted to an Integer object
    Integer wrapperInt = primitiveInt; 
    System.out.println("Primitive int: " + primitiveInt); // Output: 100
    System.out.println("Wrapper Integer (autoboxed): " + wrapperInt); // Output: 100

    char primitiveChar = 'A';
    // Autoboxing: primitive char is automatically converted to a Character object
    Character wrapperChar = primitiveChar;
    System.out.println("Primitive char: " + primitiveChar); // Output: A
    System.out.println("Wrapper Character (autoboxed): " + wrapperChar); // Output: A

    // Autoboxing in method calls or collections
    List<Integer> numbers = new ArrayList<>();
    numbers.add(5); // Autoboxes int 5 to Integer object
    numbers.add(10);
    System.out.println("List of Integers: " + numbers); // Output: [5, 10]

    // You can directly assign primitive literal to wrapper
    Boolean myBoolean = true; // Autoboxes boolean true to Boolean object
    System.out.println("Boolean wrapper: " + myBoolean); // Output: true
  }
}
\`\`\`

### 2. Unboxing

**Unboxing** is the automatic conversion that the Java compiler makes from a wrapper class object to its corresponding primitive type.

**Example:**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class UnboxingExample {
  public static void main(String[] args) {
    Integer wrapperInt = 200;
    
    // Unboxing: Integer object is automatically converted to a primitive int
    int primitiveInt = wrapperInt; 
    System.out.println("Wrapper Integer: " + wrapperInt); // Output: 200
    System.out.println("Primitive int (unboxed): " + primitiveInt); // Output: 200

    Double wrapperDouble = 3.14;
    // Unboxing: Double object is automatically converted to a primitive double
    double primitiveDouble = wrapperDouble;
    System.out.println("Wrapper Double: " + wrapperDouble); // Output: 3.14
    System.out.println("Primitive double (unboxed): " + primitiveDouble); // Output: 3.14

    // Unboxing in arithmetic operations
    Integer a = 50;
    Integer b = 20;
    int sum = a + b; // a and b are unboxed to int, then added
    System.out.println("Sum of wrapper Integers: " + sum); // Output: 70

    // Unboxing in collections
    List<Integer> numbers = new ArrayList<>();
    numbers.add(10); // Autoboxed
    numbers.add(20); // Autoboxed

    int firstNum = numbers.get(0); // Unboxes Integer object to int
    System.out.println("First number from list (unboxed): " + firstNum); // Output: 10
  }
}
\`\`\`

## Manual Boxing and Unboxing (Before Java 5)

While autoboxing/unboxing makes life easier, it's good to know how it was done manually (and sometimes still needed for specific conversions or older codebases).

-   **Boxing (Primitive to Wrapper):** Use the wrapper class constructor (though deprecated for performance in newer Java versions) or static 'valueOf()' method. The 'valueOf()' method is generally preferred as it can cache frequently used values (e.g., 'Integer' values from -128 to 127).
-   **Unboxing (Wrapper to Primitive):** Use the 'xxxValue()' method provided by the wrapper class (e.g., 'intValue()', 'doubleValue()').

\`\`\`java
public class ManualBoxingUnboxingExample {
  public static void main(String[] args) {
    // Manual Boxing
    int primitiveInt = 123;
    Integer wrapperInt1 = new Integer(primitiveInt); // Constructor (deprecated in Java 9+)
    Integer wrapperInt2 = Integer.valueOf(primitiveInt); // Preferred method

    System.out.println("Manually boxed Integer (constructor): " + wrapperInt1);
    System.out.println("Manually boxed Integer (valueOf): " + wrapperInt2);

    // Manual Unboxing
    Integer anotherWrapperInt = 456;
    int anotherPrimitiveInt1 = anotherWrapperInt.intValue(); // Preferred method

    System.out.println("Manually unboxed int: " + anotherPrimitiveInt1);

    Double wrapperDouble = Double.valueOf(99.99);
    double primitiveDouble = wrapperDouble.doubleValue();
    System.out.println("Manually unboxed double: " + primitiveDouble);

    // String to primitive conversion (common utility method)
    String strNum = "789";
    int parsedInt = Integer.parseInt(strNum); // Parses string to primitive int
    System.out.println("Parsed int from string: " + parsedInt);

    String strDouble = "123.45";
    double parsedDouble = Double.parseDouble(strDouble); // Parses string to primitive double
    System.out.println("Parsed double from string: " + parsedDouble);

    // Primitive to String conversion
    int numToString = 1234;
    String convertedString = String.valueOf(numToString); // Converts primitive to String
    System.out.println("Converted int to string: " + convertedString);
  }
}
\`\`\`

## Immutability of Wrapper Classes

All wrapper classes are **immutable**. Once a wrapper object is created, its value cannot be changed. Any operation that appears to modify a wrapper object (e.g., arithmetic operations) actually creates a new wrapper object.

\`\`\`java
public class WrapperImmutability {
  public static void main(String[] args) {
    Integer num1 = 10; // Autoboxed
    Integer num2 = num1; // num2 points to the same object as num1

    num1 = num1 + 5; // Unboxes num1, adds 5, autoboxes result into a NEW Integer object
                     // num1 now points to a new object (15)

    System.out.println("num1: " + num1); // Output: 15
    System.out.println("num2: " + num2); // Output: 10 (num2 still points to the original 10 object)

    // Demonstrating object identity for small Integer values (due to caching)
    Integer i1 = 100;
    Integer i2 = 100;
    System.out.println("i1 == i2 (for 100): " + (i1 == i2)); // Output: true (cached)

    Integer i3 = 200;
    Integer i4 = 200;
    System.out.println("i3 == i4 (for 200): " + (i3 == i4)); // Output: false (not cached, new objects)

    // Always use .equals() for comparing wrapper objects' values
    System.out.println("i3.equals(i4): " + i3.equals(i4)); // Output: true
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use 'valueOf()' over Constructors</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When you explicitly need to create a wrapper object from a primitive (though autoboxing usually handles this), prefer the static 'valueOf()' method (e.g., 'Integer.valueOf(10)') over the 'new' constructor (e.g., 'new Integer(10)'). The 'valueOf()' method can utilize caching for common primitive values, leading to better memory usage and performance. Constructors are deprecated in newer Java versions.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'NullPointerException' with Unboxing</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        A common pitfall with unboxing is a 'NullPointerException'. If a wrapper object variable holds a 'null' reference and you attempt to unbox it (e.g., assign it to a primitive variable or use it in an arithmetic operation), a 'NullPointerException' will occur at runtime. Always check for 'null' before unboxing if there's a possibility of a 'null' value.
        <br/><br/>
        Example:
        <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-2 text-sm">
            <code class="language-java">
Integer nullableInt = null;
try {
    int primitive = nullableInt; // This line will throw NullPointerException
} catch (NullPointerException e) {
    System.out.println("Caught NullPointerException: " + e.getMessage());
}
            </code>
        </pre>
    </div>
</div>
`;

export default function JavaWrapperClassesPage() {
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
          prevLesson="java-iterator"
          nextLesson="java-generics"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
