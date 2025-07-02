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
# Java Abstraction

**Abstraction** is one of the four fundamental principles of Object-Oriented Programming (OOP). It focuses on hiding the complex implementation details and showing only the essential features of an object. The goal of abstraction is to simplify the view of complex systems by providing a more generalized, abstract view.

## Why Use Abstraction?

-   **Reduces Complexity:** Hides unnecessary implementation details from the user.
-   **Increases Readability:** Makes the code easier to understand and manage.
-   **Enhances Maintainability:** Changes in implementation details do not affect the client code as long as the abstract view remains the same.
-   **Security:** Only necessary details are exposed to the outside world.

## Ways to Achieve Abstraction in Java

Java achieves abstraction primarily through two mechanisms:

1.  **Abstract Classes**
2.  **Interfaces**

---

## 1. Abstract Classes

An **abstract class** is a class that cannot be instantiated directly (you cannot create objects of an abstract class). It can contain both abstract methods (methods without a body) and concrete methods (methods with a body).

**Key characteristics of Abstract Classes:**
-   Declared using the 'abstract' keyword.
-   Cannot be instantiated (cannot create objects using 'new').
-   Can have abstract methods (methods without implementation) and non-abstract (concrete) methods.
-   If a class has at least one abstract method, the class itself must be declared 'abstract'.
-   Subclasses of an abstract class must either implement all its abstract methods or be declared 'abstract' themselves.

### Abstract Methods

An **abstract method** is a method that is declared without an implementation (without a body). It is marked with the 'abstract' keyword. Abstract methods must be implemented by concrete subclasses.

**Syntax:**

\`\`\`java
public abstract class ClassName {
  // Abstract method declaration
  public abstract void abstractMethod(); 

  // Concrete method
  public void concreteMethod() {
    System.out.println("This is a concrete method.");
  }
}
\`\`\`

**Example:**

\`\`\`java
// Abstract Superclass
abstract class Shape {
  String color;

  // Abstract method (no implementation)
  public abstract double getArea();

  // Concrete method
  public void displayColor() {
    System.out.println("Shape color: " + color);
  }

  // Constructor
  public Shape(String color) {
    this.color = color;
  }
}

// Concrete Subclass 1
class Circle extends Shape {
  private double radius;

  public Circle(String color, double radius) {
    super(color);
    this.radius = radius;
  }

  @Override
  public double getArea() { // Implementation of abstract method
    return Math.PI * radius * radius;
  }
}

// Concrete Subclass 2
class Rectangle extends Shape {
  private double length;
  private double width;

  public Rectangle(String color, double length, double width) {
    super(color);
    this.length = length;
    this.width = width;
  }

  @Override
  public double getArea() { // Implementation of abstract method
    return length * width;
  }
}

public class AbstractClassExample {
  public static void main(String[] args) {
    // Cannot instantiate abstract class directly
    // Shape myShape = new Shape("Green"); // Compile-time error!

    Circle myCircle = new Circle("Red", 5.0);
    Rectangle myRectangle = new Rectangle("Blue", 4.0, 6.0);

    System.out.println("Circle Area: " + myCircle.getArea());       // Output: Circle Area: 78.53981633974483
    myCircle.displayColor();                                        // Output: Shape color: Red

    System.out.println("Rectangle Area: " + myRectangle.getArea()); // Output: Rectangle Area: 24.0
    myRectangle.displayColor();                                     // Output: Shape color: Blue
  }
}
\`\`\`

---

## 2. Interfaces

An **interface** in Java is a blueprint of a class. It can contain only abstract methods (before Java 8) and constants. From Java 8 onwards, interfaces can also have default and static methods. From Java 9 onwards, private methods are also allowed. Interfaces are used to achieve **multiple inheritance of type** (a class can implement multiple interfaces) and to define a contract for behavior.

**Key characteristics of Interfaces:**
-   Declared using the 'interface' keyword.
-   All methods are implicitly 'public' and 'abstract' (before Java 8).
-   All fields are implicitly 'public', 'static', and 'final'.
-   A class 'implements' an interface.
-   A class can implement multiple interfaces.
-   Interfaces cannot have constructors.

### Example: Using an Interface

\`\`\`java
// Interface
interface Drivable {
  // Abstract method (implicitly public abstract)
  void drive();

  // Default method (Java 8+)
  default void startEngine() {
    System.out.println("Engine started.");
  }

  // Static method (Java 8+)
  static void displayVehicleType() {
    System.out.println("This is a Drivable vehicle.");
  }
}

// Class implementing the Drivable interface
class Car implements Drivable {
  @Override
  public void drive() { // Must implement the abstract method
    System.out.println("Car is driving.");
  }
}

// Another class implementing the Drivable interface
class Truck implements Drivable {
  @Override
  public void drive() {
    System.out.println("Truck is driving heavily.");
  }
}

public class InterfaceExample {
  public static void main(String[] args) {
    Car myCar = new Car();
    myCar.drive();       // Output: Car is driving.
    myCar.startEngine(); // Output: Engine started.

    Truck myTruck = new Truck();
    myTruck.drive();     // Output: Truck is driving heavily.

    Drivable.displayVehicleType(); // Call static method of interface
    // Output: This is a Drivable vehicle.
  }
}
\`\`\`

---

## Abstract Class vs. Interface

While both abstract classes and interfaces are used to achieve abstraction, they have significant differences.

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
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Choose Wisely</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use an **abstract class** when you have a strong "is-a" relationship, and you want to provide a common base implementation for some methods while forcing subclasses to implement others. Use an **interface** when you want to define a contract for behavior that multiple, potentially unrelated classes can adhere to, or when you need to achieve multiple inheritance of type.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Instantiation</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Remember that you cannot directly create an object of an abstract class or an interface using the 'new' keyword. You must create an object of a concrete subclass that implements all abstract methods of the abstract class/interface.
    </div>
</div>
`;

export default function JavaAbstractionPage() {
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
          prevLesson="java-super-keyword"
          nextLesson="java-interface" // Assuming this is the next logical step after abstraction
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
