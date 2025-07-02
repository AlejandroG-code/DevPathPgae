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
# Java Polymorphism

**Polymorphism** is one of the four fundamental pillars of Object-Oriented Programming (OOP), along with Encapsulation, Inheritance, and Abstraction. The term "polymorphism" means "many forms." In Java, polymorphism allows objects of different classes to be treated as objects of a common type. This is typically achieved through inheritance and interfaces.

## Why Polymorphism?

-   **Flexibility:** A single variable can refer to objects of different types at different times.
-   **Extensibility:** New classes can be added to the system without modifying existing code, as long as they adhere to the common interface or superclass.
-   **Code Reusability:** Write generic code that works with objects of various types.

## Types of Polymorphism in Java

Java primarily supports two types of polymorphism:

1.  **Compile-time Polymorphism (Static Polymorphism / Method Overloading)**
2.  **Runtime Polymorphism (Dynamic Polymorphism / Method Overriding)**

---

## 1. Compile-time Polymorphism (Method Overloading)

Compile-time polymorphism is achieved through **method overloading**. Method overloading allows a class to have multiple methods with the same name, but with different parameter lists (different number of parameters, different types of parameters, or different order of parameters). The compiler decides which method to call at compile time based on the method signature.

**Example:**

\`\`\`java
public class Calculator {
  // Method 1: Adds two integers
  public int add(int a, int b) {
    return a + b;
  }

  // Method 2: Adds three integers (overloaded)
  public int add(int a, int b, int c) {
    return a + b + c;
  }

  // Method 3: Adds two doubles (overloaded)
  public double add(double a, double b) {
    return a + b;
  }

  public static void main(String[] args) {
    Calculator calc = new Calculator();

    System.out.println("Sum of two integers: " + calc.add(10, 20));     // Calls Method 1
    System.out.println("Sum of three integers: " + calc.add(1, 2, 3));  // Calls Method 2
    System.out.println("Sum of two doubles: " + calc.add(2.5, 3.5));   // Calls Method 3
    // Output:
    // Sum of two integers: 30
    // Sum of three integers: 6
    // Sum of two doubles: 6.0
  }
}
\`\`\`

---

## 2. Runtime Polymorphism (Method Overriding)

Runtime polymorphism is achieved through **method overriding**. Method overriding occurs when a subclass provides a specific implementation for a method that is already defined in its superclass. The method to be called is determined at runtime based on the actual type of the object, not the type of the reference variable. This is also known as **dynamic method dispatch**.

**Conditions for Method Overriding:**
-   The method in the subclass must have the same name, same return type, and same parameter list as the method in the superclass.
-   The access modifier of the overriding method cannot be more restrictive than the overridden method (e.g., if superclass method is 'public', subclass method cannot be 'private').
-   'static' methods cannot be overridden (they are hidden).
-   'final' methods cannot be overridden.
-   Constructors cannot be overridden.

**Example:**

\`\`\`java
// Superclass
class Animal {
  public void makeSound() {
    System.out.println("Animal makes a generic sound.");
  }
}

// Subclass 1
class Dog extends Animal {
  @Override // Good practice to use @Override annotation
  public void makeSound() {
    System.out.println("Dog barks: Woof woof!");
  }
}

// Subclass 2
class Cat extends Animal {
  @Override
  public void makeSound() {
    System.out.println("Cat meows: Meow!");
  }
}

public class RuntimePolymorphismExample {
  public static void main(String[] args) {
    Animal myAnimal = new Animal(); // Animal object
    Animal myDog = new Dog();       // Animal reference, Dog object
    Animal myCat = new Cat();       // Animal reference, Cat object

    myAnimal.makeSound(); // Calls Animal's makeSound()
    myDog.makeSound();    // Calls Dog's makeSound() (runtime decision)
    myCat.makeSound();    // Calls Cat's makeSound() (runtime decision)
    // Output:
    // Animal makes a generic sound.
    // Dog barks: Woof woof!
    // Cat meows: Meow!
  }
}
\`\`\`

### Explanation of Runtime Polymorphism:
In the example above, 'myDog' and 'myCat' are declared as type 'Animal' (the superclass), but they hold objects of 'Dog' and 'Cat' (the subclasses) respectively. When 'makeSound()' is called on 'myDog' and 'myCat', the Java Virtual Machine (JVM) determines which version of 'makeSound()' to execute at runtime based on the actual object type, not the reference type. This is the essence of runtime polymorphism.

---

## Polymorphism with Interfaces

Polymorphism is also heavily used with interfaces. An interface defines a contract, and any class that implements the interface must provide an implementation for its methods. This allows objects of different, unrelated classes to be treated polymorphically if they implement the same interface.

**Example:**

\`\`\`java
// Interface
interface Drivable {
  void drive();
}

// Class 1 implementing Drivable
class Car implements Drivable {
  @Override
  public void drive() {
    System.out.println("Car is driving on the road.");
  }
}

// Class 2 implementing Drivable
class Bicycle implements Drivable {
  @Override
  public void drive() {
    System.out.println("Bicycle is pedaling on the path.");
  }
}

public class InterfacePolymorphismExample {
  public static void main(String[] args) {
    Drivable vehicle1 = new Car();      // Drivable reference, Car object
    Drivable vehicle2 = new Bicycle();  // Drivable reference, Bicycle object

    vehicle1.drive(); // Calls Car's drive()
    vehicle2.drive(); // Calls Bicycle's drive()
    // Output:
    // Car is driving on the road.
    // Bicycle is pedaling on the path.
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Polymorphism for Flexible Code</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Polymorphism allows you to write code that is more flexible and adaptable to change. Instead of writing specific code for each type, you can write generic code that operates on the common supertype or interface, and the correct method implementation will be invoked at runtime.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Not All Methods Overridden</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When using a superclass reference to a subclass object (e.g., 'Animal myDog = new Dog();'), you can only call methods that are defined in the superclass (or inherited from its ancestors). Even if the subclass has additional unique methods, you cannot call them directly using the superclass reference without type casting.
    </div>
</div>
`;

export default function JavaPolymorphismPage() {
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
          prevLesson="java-inheritance"
          nextLesson="java-super-keyword"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
