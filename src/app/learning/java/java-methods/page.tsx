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
# Java Methods

A method is a block of code that performs a specific task. Methods are used to break down large programs into smaller, manageable, and reusable units. This makes the code more organized, readable, and easier to maintain.

## Why Use Methods?

-   **Reusability:** Write a method once and use it multiple times.
-   **Modularity:** Break down complex problems into smaller, simpler pieces.
-   **Readability:** Make the code easier to understand and debug.

## Declaring a Method

The general syntax for declaring a method in Java is:

\`\`\`java
modifier returnType methodName(parameter1Type parameter1Name, parameter2Type parameter2Name, ...) {
  // Method body - code to be executed
  // return value; // Optional: if returnType is not void
}
\`\`\`

### Explanation of Components:

-   **'modifier'**: Specifies the access type of the method (e.g., 'public', 'private', 'protected', 'static', 'abstract', 'final').
    -   'public': The method is accessible from any other class.
    -   'static': The method belongs to the class, not an object of the class. This means you can call it without creating an object.
-   **'returnType'**: The data type of the value returned by the method. If the method does not return a value, use 'void'.
-   **'methodName'**: The name of the method. By convention, method names start with a lowercase letter and use camelCase (e.g., 'calculateSum', 'printMessage').
-   **'parameters'**: A comma-separated list of input values that the method accepts. Each parameter must have a data type and a name. If a method does not take any parameters, the parentheses '()' are left empty.
-   **'method body'**: Contains the statements that define what the method does.

## Calling a Method

To call a method, you write the method's name followed by parentheses '()' and a semicolon ';'.

\`\`\`java
public class MyMethods {
  // A simple method named 'myMethod'
  static void myMethod() {
    System.out.println("I just executed myMethod!");
  }

  public static void main(String[] args) {
    myMethod(); // Calling the 'myMethod'
    myMethod(); // Calling it again
    // Output:
    // I just executed myMethod!
    // I just executed myMethod!
  }
}
\`\`\`
In the example above, 'myMethod()' is a 'static' method, which means it belongs to the 'MyMethods' class and can be called directly without creating an object of 'MyMethods'.

## Methods with Parameters

Information can be passed to methods as parameters. Parameters act as variables inside the method.

\`\`\`java
public class MethodParameters {
  // Method with one parameter
  static void greet(String name) {
    System.out.println("Hello, " + name + "!");
  }

  // Method with multiple parameters
  static void displayAge(String name, int age) {
    System.out.println(name + " is " + age + " years old.");
  }

  public static void main(String[] args) {
    greet("Alice"); // Calling greet with "Alice"
    greet("Bob");   // Calling greet with "Bob"
    // Output:
    // Hello, Alice!
    // Hello, Bob!

    displayAge("Charlie", 30);
    displayAge("Diana", 25);
    // Output:
    // Charlie is 30 years old.
    // Diana is 25 years old.
  }
}
\`\`\`

## Methods with Return Values

The 'void' keyword, used in the examples above, indicates that the method does not return a value. If you want the method to return a value, you must specify the data type of the return value instead of 'void', and use the 'return' keyword inside the method.

\`\`\`java
public class MethodReturnValues {
  // Method that returns an integer
  static int sum(int x, int y) {
    return x + y;
  }

  // Method that returns a String
  static String createFullName(String firstName, String lastName) {
    return firstName + " " + lastName;
  }

  public static void main(String[] args) {
    int result = sum(5, 3); // Call sum and store the returned value
    System.out.println("Sum: " + result); // Output: Sum: 8

    System.out.println("Sum directly: " + sum(10, 20)); // Output: Sum directly: 30

    String fullName = createFullName("Jane", "Smith");
    System.out.println("Full Name: " + fullName); // Output: Full Name: Jane Smith
  }
}
\`\`\`

## Overloading Methods

Method overloading allows a class to have multiple methods with the same name but different parameter lists. The compiler distinguishes between overloaded methods by the number, type, or order of their parameters.

\`\`\`java
public class MethodOverloading {
  // Method to add two integers
  static int add(int a, int b) {
    return a + b;
  }

  // Overloaded method to add three integers
  static int add(int a, int b, int c) {
    return a + b + c;
  }

  // Overloaded method to add two doubles
  static double add(double a, double b) {
    return a + b;
  }

  public static void main(String[] args) {
    System.out.println("Sum of two integers: " + add(5, 10));      // Calls add(int, int)
    System.out.println("Sum of three integers: " + add(1, 2, 3));   // Calls add(int, int, int)
    System.out.println("Sum of two doubles: " + add(2.5, 3.5));    // Calls add(double, double)
    // Output:
    // Sum of two integers: 15
    // Sum of three integers: 6
    // Sum of two doubles: 6.0
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Keep Methods Focused</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        A good practice is to make your methods perform a single, well-defined task. This promotes reusability and makes your code easier to understand, test, and debug. If a method is doing too much, consider breaking it down into smaller, more focused methods.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Return Type Not Enough for Overloading</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Methods cannot be overloaded based on their return type alone. The parameter list (number, type, or order of parameters) must be different for method overloading to work.
    </div>
</div>
`;

export default function JavaMethodsPage() {
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
          prevLesson="java-arrays"
          nextLesson="java-method-parameters"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
