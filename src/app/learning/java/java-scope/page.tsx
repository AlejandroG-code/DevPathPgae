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
# Java Scope

Scope refers to the accessibility of variables, methods, and classes within a program. In Java, scope is primarily determined by where a variable is declared. Understanding scope is crucial for preventing naming conflicts and ensuring that your code behaves as expected.

## Block Scope

A block in Java is a section of code enclosed within curly braces '{}'. Variables declared inside a block are only accessible within that block and its nested blocks. They are created when the block is entered and destroyed when the block is exited.

\`\`\`java
public class BlockScopeExample {
  public static void main(String[] args) { // Start of main method block
    int x = 10; // 'x' is accessible within main method

    if (x > 5) { // Start of if block
      int y = 20; // 'y' is accessible only within this if block
      System.out.println("Inside if block: x = " + x + ", y = " + y);
    } // End of if block

    // System.out.println(y); // ERROR: 'y' cannot be resolved to a variable (out of scope)
    System.out.println("Outside if block: x = " + x);
  } // End of main method block
}
\`\`\`

## Method Scope

Variables declared directly inside a method are accessible anywhere within that method, from the point of their declaration to the end of the method's block. These are also known as **local variables**.

\`\`\`java
public class MethodScopeExample {
  static void myMethod() { // Start of myMethod block
    String message = "Hello from myMethod!"; // 'message' is a local variable
    System.out.println(message);
    // 'anotherVariable' is not accessible here
  } // End of myMethod block

  public static void main(String[] args) { // Start of main method block
    int anotherVariable = 100; // 'anotherVariable' is a local variable to main
    System.out.println("From main: " + anotherVariable);
    myMethod();
    // System.out.println(message); // ERROR: 'message' is out of scope here
  } // End of main method block
}
\`\`\`

## Class Scope (Fields/Instance Variables)

Variables declared directly inside a class, but outside any method, constructor, or block, are called **fields** or **instance variables**. They are accessible by any method within the same class.

\`\`\`java
public class ClassScopeExample {
  int instanceVariable = 50; // This is a field/instance variable

  static String classVariable = "Static Value"; // This is a static field/class variable

  void displayInstanceVariable() { // Method within the class
    System.out.println("Instance variable: " + instanceVariable); // Accessible
  }

  public static void main(String[] args) {
    // To access instanceVariable, you need an object of the class
    ClassScopeExample obj = new ClassScopeExample();
    System.out.println("Accessed via object: " + obj.instanceVariable); // Accessible

    // Static variables can be accessed directly using the class name
    System.out.println("Static variable: " + ClassScopeExample.classVariable); // Accessible
    
    obj.displayInstanceVariable();
  }
}
\`\`\`
-   **Instance variables** (non-static fields) belong to an object and are accessible via an object reference. Each object has its own copy.
-   **Class variables** (static fields) belong to the class itself and are shared among all instances of that class. They can be accessed directly using the class name.

## Parameter Scope

Parameters of a method are accessible only within that method. They are essentially local variables to the method.

\`\`\`java
public class ParameterScopeExample {
  static void calculateSum(int num1, int num2) { // 'num1' and 'num2' are parameters
    int sum = num1 + num2; // 'num1' and 'num2' are accessible here
    System.out.println("Sum: " + sum);
  }

  public static void main(String[] args) {
    // System.out.println(num1); // ERROR: 'num1' is out of scope here
    calculateSum(10, 20);
  }
}
\`\`\`

## Shadowing

Shadowing occurs when a variable declared in an inner scope (e.g., a method or block) has the same name as a variable in an outer scope (e.g., a class field). The inner variable "shadows" or hides the outer variable, meaning the inner variable is accessed when referenced within its scope.

\`\`\`java
public class ShadowingExample {
  int x = 10; // Class scope variable

  void printX() {
    int x = 20; // Method scope variable, shadows the class variable 'x'
    System.out.println("Local x: " + x); // Refers to the local 'x' (20)
    System.out.println("Class x: " + this.x); // Refers to the class 'x' (10) using 'this'
  }

  public static void main(String[] args) {
    ShadowingExample obj = new ShadowingExample();
    obj.printX();
    System.out.println("From main, class x: " + obj.x); // Refers to the class 'x' (10)
  }
}
\`\`\`
The 'this' keyword is used to explicitly refer to the instance variable when it is shadowed by a local variable or parameter with the same name.

## Summary of Scopes

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Scope Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Declaration Location</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Accessibility</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Lifetime</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Block Scope</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inside any block ('{}')</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Only within that block and its nested blocks.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Created when block entered, destroyed when block exited.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Method Scope (Local Variables)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inside a method (including parameters)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Only within that method.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Created when method called, destroyed when method returns.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Class Scope (Instance Variables)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Directly inside a class, outside any method (non-static)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Accessible by all methods within the class, via an object.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Created when object is instantiated, destroyed when object is garbage collected.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Class Scope (Static/Class Variables)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Directly inside a class, outside any method (static)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Accessible by all methods within the class, via class name or object.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Created when class is loaded, destroyed when program ends.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Minimize Scope</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        It's a good practice to declare variables in the innermost scope possible. This limits their visibility, reduces the chance of naming conflicts, and makes your code easier to reason about and debug.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Uninitialized Local Variables</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Unlike class-level variables which get default values, local variables (method or block scope) are NOT automatically initialized by Java. If you try to use a local variable before assigning a value to it, you will get a compile-time error. Always initialize your local variables before their first use.
    </div>
</div>
`;

export default function JavaScopePage() {
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
          prevLesson="java-method-overloading"
          nextLesson="java-recursion"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
