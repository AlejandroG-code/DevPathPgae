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
# Java Data Types

Data types are classifications that tell the compiler how the programmer intends to use the data. In Java, all variables must be declared with a data type. Java is a **statically-typed** language, meaning variable types are checked at compile-time.

## Primitive Data Types

Primitive data types are the most basic data types available in Java. They are not objects and do not have methods. Java has 8 primitive data types:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Data Type</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Size (bytes)</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Range</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Default Value</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Examples</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">byte</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">1</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">-128 to 127</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">0</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>byte b = 10;</code></td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">short</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">2</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">-32,768 to 32,767</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">0</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>short s = 1000;</code></td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">int</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">4</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">-2,147,483,648 to 2,147,483,647</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">0</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>int i = 100000;</code></td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">long</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">8</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">0L</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>long l = 15000000000L;</code> (note 'L' suffix)</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">float</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">4</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Stores fractional numbers. Sufficient for storing 6 to 7 decimal digits.</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">0.0f</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>float f = 23.45f;</code> (note 'f' suffix)</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">double</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">8</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Stores fractional numbers. Sufficient for storing 15 decimal digits.</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">0.0d</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>double d = 123.456789d;</code> (note 'd' suffix, optional)</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">boolean</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">1 bit</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>true</code> or <code>false</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">false</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>boolean isJavaFun = true;</code></td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">char</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">2</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Stores a single character/letter or ASCII values.</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\u0000'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>char grade = 'A';</code></td>
    </tr>
  </tbody>
</table>

**Example Usage of Primitive Data Types:**

\`\`\`java
public class PrimitiveDataTypes {
  public static void main(String[] args) {
    byte myByte = 120;
    short myShort = 30000;
    int myInt = 1000000;
    long myLong = 15000000000L; // L suffix for long literal

    float myFloat = 5.75f; // f suffix for float literal
    double myDouble = 19.99d; // d suffix for double literal (optional)

    boolean isJavaCool = true;
    char myChar = 'D';

    System.out.println("byte: " + myByte);
    System.out.println("short: " + myShort);
    System.out.println("int: " + myInt);
    System.out.println("long: " + myLong);
    System.out.println("float: " + myFloat);
    System.out.println("double: " + myDouble);
    System.out.println("boolean: " + isJavaCool);
    System.out.println("char: " + myChar);
  }
}
\`\`\`

## Non-Primitive Data Types (Reference Types)

Non-primitive data types are not predefined by Java but are created by the programmer. They are also called "reference types" because they refer to objects.

-   **'String'**: Used to store a sequence of characters (text). Strings are objects in Java.
-   **Arrays**: Used to store multiple values of the same type in a single variable.
-   **Classes**: Custom types defined by the programmer.
-   **Interfaces**: Blueprints of a class.

**Key Differences between Primitive and Non-Primitive Data Types:**

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Primitive Data Types</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Non-Primitive Data Types</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-semibold">Storage</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Store actual values directly.</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Store references (memory addresses) to objects.</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-semibold">Default Value</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Have default values (0, false, '\\u0000').</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Default value is <code>null</code>.</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-semibold">Size</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fixed size.</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Size varies.</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-semibold">Methods</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No methods.</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Have methods (e.g., <code>String.length()</code>).</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-semibold">Creation</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Defined by Java.</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Created by the programmer (except <code>String</code>).</td>
    </tr>
  </tbody>
</table>

**Example Usage of Non-Primitive Data Types:**

\`\`\`java
public class NonPrimitiveDataTypes {
  public static void main(String[] args) {
    String greeting = "Hello Java!"; // String is a class, not a primitive
    System.out.println("String: " + greeting);

    String[] cars = {"Volvo", "BMW", "Ford"}; // Array of Strings
    System.out.println("Array element: " + cars[0]);

    // Creating an object of a custom class (assuming MyClass is defined elsewhere)
    // MyClass myObject = new MyClass();
    // System.out.println("Object: " + myObject);
  }
}
\`\`\`

## Data Type Choice

Choosing the correct data type is important for:
-   **Memory Efficiency:** Using the smallest data type that can hold the value saves memory.
-   **Performance:** Operations on smaller data types can sometimes be faster.
-   **Accuracy:** Using 'double' for precise floating-point calculations is generally better than 'float'.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: String is Special</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While 'String' is a non-primitive (reference) type, it's often treated somewhat like a primitive due to its frequent use and special literal syntax (e.g., "hello"). However, remember it's an object, meaning it has methods (like '.length()', '.toUpperCase()') and its variables store references, not the actual string data directly.
    </div>
</div>
`;

export default function JavaDataTypesPage() {
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
  }, []);

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
          prevLesson="java-variables"
          nextLesson="java-type-casting"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
