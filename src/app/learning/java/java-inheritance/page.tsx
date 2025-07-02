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
# Java Inheritance

**Inheritance** is one of the four fundamental principles of Object-Oriented Programming (OOP). It allows a class to inherit attributes and methods from another class. This mechanism promotes code reusability and establishes an "is-a" relationship between classes (e.g., a 'Car' is a 'Vehicle').

## Why Inheritance?

-   **Code Reusability:** You can reuse fields and methods of the existing class without rewriting them.
-   **Method Overriding:** Allows you to define a specific implementation for a method that is already defined in the superclass.
-   **Polymorphism:** A key concept enabled by inheritance, allowing objects of different classes to be treated as objects of a common type.

## Terminology

-   **Superclass (Parent Class):** The class whose features are inherited.
-   **Subclass (Child Class / Derived Class):** The class that inherits features from another class.

## The 'extends' Keyword

In Java, the 'extends' keyword is used to establish an inheritance relationship between two classes. A subclass 'extends' a superclass.

**Syntax:**

\`\`\`java
class Subclass extends Superclass {
  // new fields and methods
}
\`\`\`

## Example: Single Inheritance

Let's create a 'Vehicle' superclass and a 'Car' subclass.

\`\`\`java
// Superclass (Parent Class)
class Vehicle {
  protected String brand = "Ford"; // Vehicle attribute
  public void honk() {             // Vehicle method
    System.out.println("Tuut, tuut!");
  }
}

// Subclass (Child Class)
class Car extends Vehicle {
  private String modelName = "Mustang"; // Car attribute

  public static void main(String[] args) {
    Car myCar = new Car(); // Create a Car object

    // Call the honk() method from the Vehicle superclass
    myCar.honk(); // Output: Tuut, tuut!

    // Access the brand attribute from the Vehicle superclass
    System.out.println(myCar.brand + " " + myCar.modelName); // Output: Ford Mustang
  }
}
\`\`\`

### Explanation:
-   The 'Car' class 'extends' the 'Vehicle' class, meaning 'Car' inherits all 'public' and 'protected' members of 'Vehicle'.
-   'myCar' object can directly call 'honk()' and access 'brand' even though they are defined in 'Vehicle'.

## 'protected' Access Modifier and Inheritance

The 'protected' access modifier is particularly relevant in inheritance. A 'protected' member is accessible within its own package and by subclasses in any package. This allows subclasses to access members that are not 'public' but are still part of the inheritance hierarchy.

## Method Overriding

Method overriding occurs when a subclass provides its own specific implementation for a method that is already defined in its superclass. The method signature (name, number and type of parameters) must be the same in both the superclass and subclass.

\`\`\`java
// Superclass
class Animal {
  public void makeSound() {
    System.out.println("Animal makes a sound");
  }
}

// Subclass overriding makeSound()
class Dog extends Animal {
  @Override // Annotation indicating method override (good practice)
  public void makeSound() {
    System.out.println("Dog barks: Woof woof!");
  }
}

// Another subclass overriding makeSound()
class Cat extends Animal {
  @Override
  public void makeSound() {
    System.out.println("Cat meows: Meow!");
  }
}

public class MethodOverridingExample {
  public static void main(String[] args) {
    Animal myAnimal = new Animal();
    Dog myDog = new Dog();
    Cat myCat = new Cat();

    myAnimal.makeSound(); // Output: Animal makes a sound
    myDog.makeSound();    // Output: Dog barks: Woof woof!
    myCat.makeSound();    // Output: Cat meows: Meow!
  }
}
\`\`\`

## The 'final' Keyword and Inheritance

-   **'final' class:** If a class is declared as 'final', it cannot be inherited by any other class. This is used to prevent extension, often for security or design reasons (e.g., 'String' class is final).
    \`\`\`java
    // public final class MyFinalClass { }
    // class MySubClass extends MyFinalClass { } // Compile-time error!
    \`\`\`
-   **'final' method:** If a method is declared as 'final', it cannot be overridden by any subclass.
    \`\`\`java
    class Parent {
      public final void display() {
        System.out.println("This is a final method.");
      }
    }
    class Child extends Parent {
      // public void display() { } // Compile-time error! Cannot override final method
    }
    \`\`\`

## Types of Inheritance (in Java)

Java supports the following types of inheritance:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Single Inheritance</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A class inherits from only one superclass.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Class B extends A'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Multilevel Inheritance</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A class inherits from a class, which in turn inherits from another class.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Class C extends B', 'Class B extends A'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hierarchical Inheritance</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Multiple subclasses inherit from a single superclass.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Class B extends A', 'Class C extends A'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hybrid Inheritance</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A combination of two or more types of inheritance.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Combination of above types</td>
        </tr>
    </tbody>
</table>

**Note:** Java does **not** support **Multiple Inheritance** (a class inheriting directly from multiple classes) to avoid the "diamond problem." However, it achieves similar functionality through **Interfaces**.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: "Is-A" Relationship</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always think of inheritance in terms of an "is-a" relationship. For example, a 'Dog' *is an* 'Animal'. If the relationship doesn't fit this pattern (e.g., a 'Car' *has an* 'Engine' - this is composition, not inheritance), then inheritance might not be the right design choice.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Private Members Not Inherited</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Subclasses do not inherit 'private' members of their superclass. While 'private' members exist in the superclass object, they are not directly accessible by the subclass. This is a core aspect of encapsulation. Subclasses can only access 'private' members through 'public' or 'protected' getter/setter methods provided by the superclass.
    </div>
</div>
`;

export default function JavaInheritancePage() {
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
          prevLesson="java-packages-api"
          nextLesson="java-polymorphism"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
