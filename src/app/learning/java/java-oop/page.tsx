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
# Java Object-Oriented Programming (OOP)

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data (attributes/fields) and code (methods). Java is a fundamentally object-oriented language, and understanding OOP principles is crucial for writing robust, maintainable, and scalable Java applications.

## What is OOP?

OOP aims to model real-world entities as software objects. It focuses on binding data and the functions that operate on that data together into a single unit, which is an object.

## Core Concepts of OOP

There are four main pillars of Object-Oriented Programming:

1.  **Encapsulation**
2.  **Inheritance**
3.  **Polymorphism**
4.  **Abstraction**

We will explore each of these concepts in detail in subsequent lessons. For now, let's understand the basic building blocks: Classes and Objects.

---

## Classes and Objects

In Java, everything is associated with classes and objects, along with their attributes and methods.

-   **Class:** A class is a blueprint or a template for creating objects. It defines the structure and behavior that all objects of that class will have. A class is a logical entity.
    -   Think of a class as a blueprint for a house. The blueprint defines what the house will have (number of rooms, windows, doors), but it's not the actual house.
-   **Object:** An object is an instance of a class. It's a real-world entity that has a state (attributes) and behavior (methods). An object is a physical entity.
    -   Using the house analogy, an object is the actual house built from the blueprint. You can build many houses from one blueprint, and each house is an object.

### Example: Creating a Class and Objects

\`\`\`java
// Define a Class named 'Car'
public class Car {
  // Attributes (fields)
  String color;
  String brand;
  int year;

  // Method
  public void drive() {
    System.out.println("The " + color + " " + brand + " is driving!");
  }

  public static void main(String[] args) {
    // Create objects (instances) of the 'Car' class
    Car myCar = new Car(); // Object 1
    myCar.color = "Red";
    myCar.brand = "Toyota";
    myCar.year = 2020;

    Car anotherCar = new Car(); // Object 2
    anotherCar.color = "Blue";
    anotherCar.brand = "Honda";
    anotherCar.year = 2022;

    // Access attributes and call methods using objects
    System.out.println("My car: " + myCar.color + " " + myCar.brand + " (" + myCar.year + ")");
    myCar.drive();

    System.out.println("Another car: " + anotherCar.color + " " + anotherCar.brand + " (" + anotherCar.year + ")");
    anotherCar.drive();
    
    // Output:
    // My car: Red Toyota (2020)
    // The Red Toyota is driving!
    // Another car: Blue Honda (2022)
    // The Blue Honda is driving!
  }
}
\`\`\`

### Explanation:
-   We define a 'Car' class with attributes ('color', 'brand', 'year') and a method ('drive()').
-   In the 'main' method, we create two 'Car' objects: 'myCar' and 'anotherCar'.
-   Each object has its own set of attribute values.
-   We use the dot operator ('.') to access the attributes and methods of an object.

---

## Constructors

A constructor is a special method that is used to initialize objects. It is called when an object of a class is created.

-   A constructor has the **same name as the class**.
-   It does **not have a return type** (not even 'void').
-   It is automatically called when you create a new object using the 'new' keyword.

### Example: Using a Constructor

\`\`\`java
public class Dog {
  String name;
  String breed;

  // Constructor for the Dog class
  public Dog(String dogName, String dogBreed) {
    name = dogName;
    breed = dogBreed;
    System.out.println("A new dog object created: " + name + " (" + breed + ")");
  }

  public void bark() {
    System.out.println(name + " says Woof!");
  }

  public static void main(String[] args) {
    Dog myDog = new Dog("Buddy", "Golden Retriever"); // Calls the constructor
    myDog.bark(); // Output: Buddy says Woof!

    Dog anotherDog = new Dog("Lucy", "Labrador");
    anotherDog.bark(); // Output: Lucy says Woof!
  }
}
\`\`\`

### Default Constructor:
If you don't define any constructor in your class, Java automatically provides a default (no-argument) constructor. However, if you define even one constructor (e.g., with parameters), the default constructor is no longer automatically provided.

---

## The 'this' Keyword

The 'this' keyword refers to the current object in a method or constructor. It is used to:
-   Distinguish between instance variables and local variables (or parameters) if they have the same name (shadowing).
-   Call another constructor in the same class (constructor chaining).

### Example: Using 'this'

\`\`\`java
public class Person {
  String name;
  int age;

  // Constructor using 'this' to refer to instance variables
  public Person(String name, int age) {
    this.name = name; // 'this.name' refers to the instance variable 'name'
    this.age = age;   // 'this.age' refers to the instance variable 'age'
  }

  public void displayInfo() {
    System.out.println("Person Name: " + this.name + ", Age: " + this.age);
  }

  public static void main(String[] args) {
    Person p1 = new Person("Emily", 28);
    p1.displayInfo(); // Output: Person Name: Emily, Age: 28
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Objects as Real-World Entities</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When thinking about classes and objects, always relate them to real-world concepts. If you're building a system for a library, you might have 'Book' and 'Member' classes, each with their own attributes (title, author; name, ID) and behaviors (borrow(), return(); register(), renewMembership()).
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Static vs. Instance</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Remember that 'static' members (fields or methods) belong to the class itself, not to any specific object. You cannot access non-static (instance) members directly from a static method without creating an object of the class first. The 'main' method is static, which is why you need to create objects to call non-static methods or access non-static fields within it.
    </div>
</div>
`;

export default function JavaOopPage() {
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
          prevLesson="java-recursion"
          nextLesson="java-classes-objects"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
