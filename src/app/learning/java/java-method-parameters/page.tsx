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
# Java Method Parameters

Methods can accept input values, known as **parameters**, which allow them to perform tasks based on specific data provided when the method is called. Parameters make methods more flexible and reusable.

## What are Parameters?

Parameters are variables listed inside the parentheses '()' in the method declaration. They act as placeholders for the values that will be passed into the method when it is invoked.

\`\`\`java
modifier returnType methodName(parameter1Type parameter1Name, parameter2Type parameter2Name, ...) {
  // Method body
}
\`\`\`

-   **'parameter1Type parameter1Name'**: Defines a parameter. You specify its data type and a name.
-   When calling the method, you pass **arguments** (actual values) that correspond to the parameters.

## Single Parameter Example

Let's create a method that takes a 'String' parameter and prints a greeting.

\`\`\`java
public class SingleParameterMethod {
  static void greet(String name) { // 'name' is the parameter
    System.out.println("Hello, " + name + "!");
  }

  public static void main(String[] args) {
    greet("Alice"); // "Alice" is the argument
    greet("Bob");   // "Bob" is the argument
    // Output:
    // Hello, Alice!
    // Hello, Bob!
  }
}
\`\`\`

## Multiple Parameters Example

You can define as many parameters as you need, separated by commas. Each parameter must have its own type and name.

\`\`\`java
public class MultipleParametersMethod {
  static void displayUserInfo(String firstName, int age) { // Two parameters: String and int
    System.out.println("Name: " + firstName + ", Age: " + age);
  }

  public static void main(String[] args) {
    displayUserInfo("Charlie", 30); // Arguments for firstName and age
    displayUserInfo("Diana", 25);
    // Output:
    // Name: Charlie, Age: 30
    // Name: Diana, Age: 25
  }
}
\`\`\`

## Return Values with Parameters

Methods can also return values after performing operations using the parameters.

\`\`\`java
public class ReturnWithParameters {
  // Method that takes two integers and returns their sum
  static int addNumbers(int x, int y) {
    return x + y;
  }

  // Method that takes a String and an int, and returns a formatted String
  static String createDescription(String item, double price) {
    return "The " + item + " costs $" + String.format("%.2f", price) + ".";
  }

  public static void main(String[] args) {
    int sumResult = addNumbers(10, 5);
    System.out.println("Sum: " + sumResult); // Output: Sum: 15

    String description = createDescription("Laptop", 1200.50);
    System.out.println(description); // Output: The Laptop costs $1200.50.
  }
}
\`\`\`

## Parameter vs. Argument

It's important to understand the distinction:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Term</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Definition</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Where it appears</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Parameter</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A variable in the method declaration that defines the type and name of the input.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">In the method signature: <br/> 'static void myMethod(String name)'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Argument</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">The actual value that is passed to the method when it is called.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">When calling the method: <br/> 'myMethod("John")'</td>
        </tr>
    </tbody>
</table>

## Pass By Value

In Java, all primitive data types (int, char, boolean, etc.) are **passed by value**. This means that when you pass a primitive variable to a method, a copy of its value is sent. Any changes made to the parameter inside the method do not affect the original variable outside the method.

\`\`\`java
public class PassByValueExample {
  static void modifyNumber(int num) {
    num = num + 10; // 'num' inside this method is a copy
    System.out.println("Inside method, num: " + num);
  }

  public static void main(String[] args) {
    int originalNum = 5;
    System.out.println("Before method call, originalNum: " + originalNum); // Output: 5
    modifyNumber(originalNum);
    System.out.println("After method call, originalNum: " + originalNum);  // Output: 5 (original remains unchanged)
  }
}
\`\`\`

For non-primitive types (objects), Java is still technically "pass by value," but it's the *reference* to the object that is passed by value. This means the method gets a copy of the memory address of the object. If you modify the object's contents (e.g., change a field of an object passed), those changes will be visible outside the method because both the original variable and the parameter refer to the same object in memory. However, if you reassign the parameter itself to a *new* object, the original variable will still point to the *original* object. This concept is often called "pass by reference for objects" or "pass by value of the reference."

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Meaningful Parameter Names</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use descriptive and meaningful names for your parameters. This makes your method's purpose clearer and helps other developers (and your future self) understand what kind of data the method expects.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Type Mismatch</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When calling a method, ensure that the types and order of the arguments you pass match the types and order of the parameters defined in the method signature. A type mismatch will result in a compile-time error.
    </div>
</div>
`;

export default function JavaMethodParametersPage() {
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
          prevLesson="java-methods"
          nextLesson="java-method-overloading"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
