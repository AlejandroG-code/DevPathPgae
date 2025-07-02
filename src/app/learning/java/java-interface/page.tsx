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
# Java Interfaces

An **interface** in Java is a blueprint of a class. It defines a set of abstract methods that a class must implement. Interfaces are a crucial mechanism for achieving **abstraction** and **multiple inheritance of type** in Java.

## Why Use Interfaces?

-   **Achieve Abstraction:** Like abstract classes, interfaces hide implementation details from the user.
-   **Support Multiple Inheritance of Type:** A class can implement multiple interfaces, allowing it to inherit behaviors from multiple sources (Java does not support multiple inheritance of implementation with classes).
-   **Define a Contract:** Interfaces define a contract for behavior. Any class that implements an interface guarantees that it will provide implementations for all the methods declared in that interface.
-   **Loose Coupling:** Promotes loose coupling between components, as classes interact through interfaces rather than concrete implementations.

## Declaring an Interface

Interfaces are declared using the 'interface' keyword.

**Syntax:**

\`\`\`java
interface InterfaceName {
  // Constant fields (implicitly public static final)
  // Abstract methods (implicitly public abstract before Java 8)
  // Default methods (Java 8+)
  // Static methods (Java 8+)
  // Private methods (Java 9+)
}
\`\`\`

## Key Characteristics of Interfaces:

-   **Methods:**
    -   Before Java 8: All methods were implicitly 'public abstract'.
    -   From Java 8: Can have 'default' methods (with implementation) and 'static' methods (with implementation).
    -   From Java 9: Can have 'private' methods (with implementation).
-   **Fields:** All fields declared in an interface are implicitly 'public static final' (constants).
-   **Instantiation:** Interfaces cannot be instantiated directly using the 'new' keyword.
-   **Constructors:** Interfaces cannot have constructors.
-   **Implementation:** A class uses the 'implements' keyword to implement an interface.
-   **Multiple Implementation:** A class can implement multiple interfaces.
-   **Inheritance:** An interface can 'extend' another interface.

---

## Implementing an Interface

When a class implements an interface, it must provide concrete implementations for all the abstract methods declared in that interface. If it fails to do so, the class itself must be declared 'abstract'.

**Syntax:**

\`\`\`java
class ClassName implements InterfaceName {
  // Implement all abstract methods from InterfaceName
}
\`\`\`

**Example:**

\`\`\`java
// Define an interface
interface Animal {
  void eat(); // Implicitly public abstract
  void sleep(); // Implicitly public abstract
}

// Implement the Animal interface in a Dog class
class Dog implements Animal {
  @Override
  public void eat() {
    System.out.println("Dog eats kibble.");
  }

  @Override
  public void sleep() {
    System.out.println("Dog sleeps in a dog bed.");
  }

  public void bark() {
    System.out.println("Woof woof!");
  }
}

public class SimpleInterfaceExample {
  public static void main(String[] args) {
    Dog myDog = new Dog();
    myDog.eat();   // Output: Dog eats kibble.
    myDog.sleep(); // Output: Dog sleeps in a dog bed.
    myDog.bark();  // Output: Woof woof!

    // Polymorphic usage: Animal reference to Dog object
    Animal anotherAnimal = new Dog();
    anotherAnimal.eat();   // Output: Dog eats kibble.
    anotherAnimal.sleep(); // Output: Dog sleeps in a dog bed.
    // anotherAnimal.bark(); // Compile-time error: bark() is not in Animal interface
  }
}
\`\`\`

---

## Default Methods (Java 8+)

Before Java 8, adding a new method to an interface would break all classes that implemented it, as they would suddenly be required to implement the new method. **Default methods** allow you to add new methods to interfaces without breaking existing implementations. They provide a default implementation that can be used by classes that don't override it.

\`\`\`java
interface Vehicle {
  void drive(); // Abstract method

  // Default method
  default void startEngine() {
    System.out.println("Engine started with default method.");
  }
}

class Car implements Vehicle {
  @Override
  public void drive() {
    System.out.println("Car is driving.");
  }
  // No need to implement startEngine() if default is sufficient
}

class Truck implements Vehicle {
  @Override
  public void drive() {
    System.out.println("Truck is driving heavily.");
  }

  @Override
  public void startEngine() { // Can override default method
    System.out.println("Truck's powerful engine roars to life!");
  }
}

public class DefaultMethodExample {
  public static void main(String[] args) {
    Car myCar = new Car();
    myCar.drive();       // Output: Car is driving.
    myCar.startEngine(); // Output: Engine started with default method.

    Truck myTruck = new Truck();
    myTruck.drive();       // Output: Truck is driving heavily.
    myTruck.startEngine(); // Output: Truck's powerful engine roars to life!
  }
}
\`\`\`

---

## Static Methods (Java 8+)

**Static methods** in interfaces are utility methods that belong to the interface itself, not to any implementing object. They can be called directly using the interface name.

\`\`\`java
interface MathOperations {
  int add(int a, int b); // Abstract method

  // Static method
  static int multiply(int a, int b) {
    return a * b;
  }
}

class SimpleMath implements MathOperations {
  @Override
  public int add(int a, int b) {
    return a + b;
  }
}

public class StaticMethodInterfaceExample {
  public static void main(String[] args) {
    SimpleMath sm = new SimpleMath();
    System.out.println("Sum: " + sm.add(5, 3)); // Output: Sum: 8

    // Call static method directly on the interface
    System.out.println("Product: " + MathOperations.multiply(5, 3)); // Output: Product: 15
  }
}
\`\`\`

---

## Private Methods (Java 9+)

**Private methods** in interfaces allow you to encapsulate common code used by default or static methods within the interface itself, without exposing that helper logic to implementing classes.

\`\`\`java
interface Logger {
  void log(String message); // Abstract method

  default void logInfo(String message) {
    logWithPrefix("INFO", message);
  }

  default void logError(String message) {
    logWithPrefix("ERROR", message);
  }

  // Private helper method (Java 9+)
  private void logWithPrefix(String prefix, String message) {
    System.out.println("[" + prefix + "] " + message);
  }
}

class ConsoleLogger implements Logger {
  @Override
  public void log(String message) {
    System.out.println("LOG: " + message);
  }
}

public class PrivateMethodInterfaceExample {
  public static void main(String[] args) {
    ConsoleLogger logger = new ConsoleLogger();
    logger.logInfo("User logged in.");  // Output: [INFO] User logged in.
    logger.logError("Failed to connect to database."); // Output: [ERROR] Failed to connect to database.
  }
}
\`\`\`

---

## Abstract Class vs. Interface (Revisited)

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Abstract Class</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Interface</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Type of Members</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Can have abstract and concrete methods. Can have instance and static variables.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Can have abstract, default, static, and private methods (Java 8/9+). All fields are public, static, final.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inheritance/Implementation</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A class 'extends' only one abstract class.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A class 'implements' multiple interfaces.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Constructors</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Can have constructors (used by subclasses via 'super()').</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Cannot have constructors.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Access Modifiers</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Can have any access modifier (public, protected, default, private) for members.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">All methods are implicitly 'public abstract' (before Java 8). Fields are implicitly 'public static final'.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Purpose</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Defines a common base for a group of related classes that share some common implementation and some specialized behavior. Represents an "is-a" relationship.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Defines a contract for behavior that unrelated classes can agree to. Represents a "can-do" or "has-a-capability" relationship.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Interface Naming Convention</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        It's a common convention in Java to name interfaces as adjectives ending in "-able" or "-ible" (e.g., 'Runnable', 'Serializable', 'Comparable', 'Drivable') to indicate a capability or behavior that classes can implement.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: All Abstract Methods Must Be Implemented</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When a concrete class implements an interface, it *must* provide an implementation for all the abstract methods declared in that interface. Failing to do so will result in a compile-time error, stating that the class is not abstract and does not override an abstract method.
    </div>
</div>
`;

export default function JavaInterfacesPage() {
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
          prevLesson="java-abstraction"
          nextLesson="java-enums" // Assuming enums come after interfaces
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
