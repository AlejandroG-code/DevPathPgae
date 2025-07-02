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
# Java Modifiers

In Java, **modifiers** are keywords that you add to definitions to change their meanings. They are used to control access to classes, attributes, methods, and constructors, and to change their behavior. Java has two main types of modifiers:

1.  **Access Modifiers:** Control the visibility (accessibility) of classes, attributes, methods, and constructors.
2.  **Non-Access Modifiers:** Provide additional functionality or restrictions to classes, attributes, and methods.

---

## 1. Access Modifiers

Access modifiers determine whether other classes can use a particular field or invoke a particular method.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Modifier</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Accessible From</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'public'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">The code is accessible for all classes, in all packages.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Anywhere</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'private'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">The code is only accessible within the declared class itself.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Only within the same class</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'protected'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">The code is accessible in the same package and subclasses.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Same package and subclasses (in any package)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(default)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No keyword is used. The code is only accessible in the same package.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Only within the same package</td>
        </tr>
    </tbody>
</table>

### Example of Access Modifiers:

\`\`\`java
// File: mypackage/MyClass.java
package mypackage;

public class MyClass {
  public int publicVar = 10;
  private int privateVar = 20;
  protected int protectedVar = 30;
  int defaultVar = 40; // Default (package-private)

  public void publicMethod() {
    System.out.println("Public method called.");
  }

  private void privateMethod() {
    System.out.println("Private method called.");
  }

  protected void protectedMethod() {
    System.out.println("Protected method called.");
  }

  void defaultMethod() {
    System.out.println("Default method called.");
  }

  public static void main(String[] args) {
    MyClass obj = new MyClass();
    System.out.println(obj.publicVar);    // Accessible
    System.out.println(obj.privateVar);   // Accessible within the same class
    System.out.println(obj.protectedVar); // Accessible within the same class
    System.out.println(obj.defaultVar);   // Accessible within the same class

    obj.publicMethod();
    obj.privateMethod(); // Accessible within the same class
    obj.protectedMethod();
    obj.defaultMethod();
  }
}
\`\`\`

\`\`\`java
// File: anotherpackage/AnotherClass.java
package anotherpackage;

import mypackage.MyClass;

public class AnotherClass extends MyClass { // AnotherClass is a subclass of MyClass
  public static void main(String[] args) {
    MyClass obj = new MyClass();
    System.out.println(obj.publicVar);    // Accessible
    // System.out.println(obj.privateVar);   // ERROR: private access
    // System.out.println(obj.defaultVar);   // ERROR: default access (different package)

    AnotherClass subObj = new AnotherClass();
    System.out.println(subObj.protectedVar); // Accessible (protected in subclass)
    System.out.println(subObj.publicVar);    // Accessible

    obj.publicMethod();
    // obj.privateMethod(); // ERROR
    subObj.protectedMethod(); // Accessible (protected in subclass)
    // obj.defaultMethod();   // ERROR
  }
}
\`\`\`

---

## 2. Non-Access Modifiers

Non-access modifiers provide information about the characteristics of a class, method, or attribute, but do not affect their access levels.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Modifier</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Applies To</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'static'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Attributes, Methods, Nested Classes</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Belongs to the class, not an object. Shared by all instances.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'final'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Classes, Attributes, Methods</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">
                <ul>
                    <li>Attribute: Value cannot be changed (constant).</li>
                    <li>Method: Cannot be overridden by subclasses.</li>
                    <li>Class: Cannot be subclassed (inherited from).</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'abstract'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Classes, Methods</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">
                <ul>
                    <li>Class: Cannot be instantiated directly; must be subclassed. May contain abstract methods.</li>
                    <li>Method: Has no implementation (body); must be implemented by concrete subclasses.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'transient'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Attributes</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Marks an attribute to be skipped when an object is serialized.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'volatile'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Attributes</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that an attribute's value may be modified by multiple threads, ensuring visibility of changes.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'synchronized'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Methods, Blocks</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Ensures that only one thread can execute a method or block at a time (for thread safety).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'native'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Methods</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that the method's implementation is provided by platform-specific code (e.g., C/C&#43;&#43;).</td>
        </tr>
    </tbody>
</table>

### Examples of Non-Access Modifiers:

\`\`\`java
public final class ImmutableClass { // final class cannot be subclassed
  private final int value; // final attribute (constant)

  public ImmutableClass(int value) {
    this.value = value;
  }

  public int getValue() {
    return value;
  }

  public final void displayValue() { // final method cannot be overridden
    System.out.println("Value: " + value);
  }

  public static void staticMethod() { // static method belongs to the class
    System.out.println("This is a static method.");
  }

  public static void main(String[] args) {
    ImmutableClass obj = new ImmutableClass(100);
    obj.displayValue();
    ImmutableClass.staticMethod(); // Call static method via class name
  }
}

abstract class Shape { // abstract class cannot be instantiated
  public abstract double getArea(); // abstract method (no body)

  public void display() {
    System.out.println("This is a shape.");
  }
}

class Circle extends Shape {
  private double radius;

  public Circle(double radius) {
    this.radius = radius;
  }

  @Override
  public double getArea() { // Must implement abstract method
    return Math.PI * radius * radius;
  }

  public static void main(String[] args) {
    // Shape s = new Shape(); // ERROR: Cannot instantiate abstract class
    Circle c = new Circle(5.0);
    System.out.println("Circle Area: " + c.getArea());
    c.display();
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Encapsulation with Access Modifiers</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        A common OOP practice is to use 'private' for attributes and 'public' for methods that access or modify those attributes (getters and setters). This enforces encapsulation, controlling how data is accessed and ensuring data integrity.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'abstract' and 'final' Conflicts</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        You cannot combine 'abstract' and 'final' modifiers for a method or a class. An 'abstract' method must be implemented by a subclass, but a 'final' method cannot be overridden. Similarly, an 'abstract' class must be subclassed, but a 'final' class cannot be subclassed. These combinations are logically contradictory and will result in compile-time errors.
    </div>
</div>
`;

export default function JavaModifiersPage() {
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
          prevLesson="java-this-keyword"
          nextLesson="java-encapsulation"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
