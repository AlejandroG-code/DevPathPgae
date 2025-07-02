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
# Java Class Methods

In Java, methods are blocks of code that perform specific actions, and they are defined within a class. Just like attributes, methods can be either **instance methods** (belonging to an object) or **static methods** (belonging to the class itself). Understanding the difference is crucial for proper object-oriented design.

## Instance Methods (Non-Static Methods)

Instance methods operate on the instance (object) of a class. They can access and modify the instance's attributes. To call an instance method, you must first create an object of the class.

**Syntax:**

\`\`\`java
modifier returnType methodName(parameters) {
  // Code that operates on instance attributes
}
\`\`\`

**Example:**

\`\`\`java
public class Dog {
  String name; // Instance attribute

  // Instance method
  public void bark() {
    System.out.println(name + " says Woof!"); // Accesses instance attribute 'name'
  }

  public static void main(String[] args) {
    Dog myDog = new Dog(); // Create an object
    myDog.name = "Buddy";
    myDog.bark(); // Call instance method using the object

    Dog anotherDog = new Dog();
    anotherDog.name = "Lucy";
    anotherDog.bark();
    // Output:
    // Buddy says Woof!
    // Lucy says Woof!
  }
}
\`\`\`

## Static Methods (Class Methods)

Static methods belong to the class, not to any specific object of the class. This means you can call them directly using the class name, without needing to create an object. Static methods can only access static attributes and other static methods; they cannot directly access instance attributes or instance methods because they don't operate on a specific object.

**Syntax:**

\`\`\`java
static returnType methodName(parameters) {
  // Code that operates on static attributes or calls other static methods
}
\`\`\`

**Example:**

\`\`\`java
public class Calculator {
  static double PI = 3.14159; // Static attribute

  // Static method to add two numbers
  public static int add(int a, int b) {
    return a + b;
  }

  // Static method to calculate circle area using static attribute
  public static double calculateCircleArea(double radius) {
    return PI * radius * radius; // Accesses static attribute 'PI'
  }

  public static void main(String[] args) {
    // Call static methods directly using the class name
    int sum = Calculator.add(10, 5);
    System.out.println("Sum: " + sum); // Output: Sum: 15

    double area = Calculator.calculateCircleArea(5.0);
    System.out.println("Area of circle with radius 5: " + area); // Output: Area of circle with radius 5: 78.53975
  }
}
\`\`\`

## Accessing Methods

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">How to Access</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Can Access</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Cannot Directly Access</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Instance Method (non-static)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Through an object of the class (e.g., 'object.method()')</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Instance attributes, instance methods, static attributes, static methods</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">N/A (can access everything relevant to its object)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Static Method (class method)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Directly through the class name (e.g., 'ClassName.method()')</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Static attributes, other static methods</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Instance attributes, instance methods (without an object reference)</td>
        </tr>
    </tbody>
</table>

## Why the Distinction?

-   **Instance methods** are used for actions that depend on the specific state of an object. For example, a 'Person' object's 'walk()' method would make *that specific person* walk.
-   **Static methods** are used for utility functions that don't need access to object-specific data, or for operations that apply to the class as a whole. For example, a 'Math' class's 'max()' method doesn't need a 'Math' object to find the maximum of two numbers. The 'main' method in Java is always 'static' because the JVM needs to call it to start the program without creating an object of the class first.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: When to Use Static</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Consider making a method 'static' if it: <br/> 1. Does not use any instance variables of the class. <br/> 2. Does not call any instance methods of the class. <br/> 3. Only operates on its parameters or static data.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Calling Instance from Static</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        You cannot directly call an instance method or access an instance attribute from a static method without first creating an object of the class. This is a common compile-time error for beginners. The 'main' method is static, so if you have non-static methods you want to call from 'main', you must create an object of your class first.
    </div>
</div>
`;

export default function JavaClassMethodsPage() {
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
          prevLesson="java-class-attributes"
          nextLesson="java-constructors"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
