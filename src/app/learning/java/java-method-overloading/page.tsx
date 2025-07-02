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
# Java Method Overloading

**Method overloading** in Java is a feature that allows a class to have more than one method with the same name, as long as their **parameter lists are different**. This means the methods must have a different number of parameters, different types of parameters, or a different order of parameters. The return type of the methods does not play a role in method overloading.

Method overloading is a form of **compile-time polymorphism** (also known as static polymorphism). The compiler determines which overloaded method to call based on the arguments passed during the method call.

## Rules for Method Overloading

For methods to be overloaded, they must satisfy these conditions:

1.  **Same Method Name:** All overloaded methods must have the exact same name.
2.  **Different Parameter List:** The parameter list must differ in at least one of the following ways:
    * **Number of parameters:** The methods have a different count of parameters.
    * **Data type of parameters:** The methods have parameters of different data types (e.g., 'int' vs. 'double').
    * **Order of parameters:** If the data types are the same, their order must be different (e.g., '(int, String)' vs. '(String, int)').
3.  **Return Type (Irrelevant):** The return type of the methods does not matter for overloading. You can have overloaded methods with the same name and parameter list but different return types, but this is NOT considered method overloading and will result in a compile-time error. The compiler only looks at the method signature (name + parameter list).
4.  **Access Modifiers (Irrelevant):** Access modifiers (e.g., 'public', 'private') do not affect method overloading.

## Why Use Method Overloading?

-   **Readability and Consistency:** It makes your code more readable and consistent. If you have methods that perform similar operations but on different types of data or with different inputs, using the same method name makes the API intuitive.
-   **Flexibility:** It provides flexibility to the users of your class, allowing them to call the same method name with different argument types or counts without needing to remember different method names for similar functionalities.

## Examples of Method Overloading

### Example 1: Different Number of Parameters

\`\`\`java
public class Calculator {

  // Method to add two integers
  public int add(int a, int b) {
    System.out.println("Adding two integers: " + a + " + " + b);
    return a + b;
  }

  // Overloaded method to add three integers
  public int add(int a, int b, int c) {
    System.out.println("Adding three integers: " + a + " + " + b + " + " + c);
    return a + b + c;
  }

  public static void main(String[] args) {
    Calculator calc = new Calculator();

    int sum1 = calc.add(5, 10);
    System.out.println("Sum 1: " + sum1); // Output: Sum 1: 15

    int sum2 = calc.add(1, 2, 3);
    System.out.println("Sum 2: " + sum2); // Output: Sum 2: 6
  }
}
\`\`\`

### Example 2: Different Data Types of Parameters

\`\`\`java
public class Printer {

  // Method to print a String
  public void print(String message) {
    System.out.println("Printing String: " + message);
  }

  // Overloaded method to print an int
  public void print(int number) {
    System.out.println("Printing int: " + number);
  }

  // Overloaded method to print a double
  public void print(double value) {
    System.out.println("Printing double: " + value);
  }

  public static void main(String[] args) {
    Printer printer = new Printer();

    printer.print("Hello Java!");   // Calls print(String)
    printer.print(123);             // Calls print(int)
    printer.print(3.14159);         // Calls print(double)
  }
}
\`\`\`

### Example 3: Different Order of Parameters

\`\`\`java
public class DataProcessor {

  // Method to process data with a String followed by an int
  public void process(String name, int id) {
    System.out.println("Processing (String, int): Name=" + name + ", ID=" + id);
  }

  // Overloaded method to process data with an int followed by a String
  public void process(int id, String name) {
    System.out.println("Processing (int, String): ID=" + id + ", Name=" + name);
  }

  public static void main(String[] args) {
    DataProcessor processor = new DataProcessor();

    processor.process("Alice", 101); // Calls process(String, int)
    processor.process(202, "Bob");   // Calls process(int, String)
  }
}
\`\`\`

### Example 4: Overloading with Return Type Difference (Compile-time Error)

This example demonstrates that only changing the return type is NOT sufficient for overloading.

\`\`\`java
// This code will cause a compile-time error!
/*
public class InvalidOverload {

  public int getValue() {
    return 10;
  }

  // This is NOT method overloading because the parameter list is the same
  // Changing only the return type is not allowed for overloading.
  public double getValue() { // COMPILE-TIME ERROR: method getValue() is already defined
    return 10.5;
  }

  public static void main(String[] args) {
    // This main method won't even compile due to the error above.
  }
}
*/
\`\`\`

## Method Overloading vs. Method Overriding

It's important not to confuse method overloading with method overriding.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method Overloading</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method Overriding</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Concept</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Multiple methods with same name but different parameter lists within the **same class**.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Subclass provides a specific implementation for a method already defined in its **superclass**.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Relationship</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Within a single class.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Between a superclass and a subclass.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Method Signature</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Same name, **different** parameter list.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Same name, **same** parameter list.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Return Type</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Can be same or different (but not the sole differentiator).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Must be same or a covariant return type (subtype).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Polymorphism</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Compile-time (Static) Polymorphism.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Run-time (Dynamic) Polymorphism.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Constructor Overloading</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Constructors can also be overloaded! This allows you to provide multiple ways to initialize an object, depending on the parameters provided. The same rules for method overloading apply to constructor overloading.
        <br/><br/>
        Example:
        <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-2 text-sm">
            <code class="language-java">
class MyClass {
    int value;
    String name;

    public MyClass() { // No-arg constructor
        this(0, "Default");
    }

    public MyClass(int value) { // Constructor with one int arg
        this(value, "Default");
    }

    public MyClass(int value, String name) { // Constructor with int and String args
        this.value = value;
        this.name = name;
    }
}
            </code>
        </pre>
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Autoboxing and Overloading Resolution</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be careful when using method overloading with primitive types and their wrapper classes, especially with autoboxing. The Java compiler tries to find the most specific method. If there are multiple overloaded methods that could potentially match after autoboxing or widening conversions, it might lead to ambiguity or unexpected method calls.
        <br/><br/>
        Example:
        <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-2 text-sm">
            <code class="language-java">
public class OverloadAmbiguity {
    public void method(Integer i) {
        System.out.println("Integer method");
    }
    public void method(long l) { // long is a wider type than int
        System.out.println("long method");
    }

    public static void main(String[] args) {
        OverloadAmbiguity oa = new OverloadAmbiguity();
        int x = 5;
        oa.method(x); // Calls method(long l) because int can be widened to long.
                      // If method(int) existed, it would call that.
                      // If only method(Integer) existed, it would autobox.
    }
}
            </code>
        </pre>
    </div>
</div>
`;

export default function JavaMethodOverloadingPage() {
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
    p: ({ ...props }) => <div className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed" {...props} />, // Changed to div
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
          prevLesson="java-method-parameters" // Assuming this is the previous lesson
          nextLesson="java-scope"             // Assuming this is the next lesson
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
