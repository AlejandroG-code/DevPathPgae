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
# Java Classes and Objects

In Object-Oriented Programming (OOP), a **class** is a blueprint for creating **objects**. An **object** is an instance of a class. This fundamental concept allows you to model real-world entities and their behaviors in your programs.

## What is a Class?

A class is a user-defined blueprint or prototype from which objects are created. It represents the set of properties or methods that are common to all objects of one type.

-   A class is a **logical entity**. It does not consume any memory until an object is created from it.
-   It defines the attributes (data) and methods (behavior) that objects of that class will have.

**Syntax for defining a class:**

\`\`\`java
public class ClassName {
  // Attributes (fields/variables)
  dataType attribute1;
  dataType attribute2;

  // Constructor(s)
  public ClassName() {
    // Constructor body
  }

  // Methods
  public void methodName() {
    // Method body
  }
}
\`\`\`

## What is an Object?

An object is a real-world entity and an instance of a class. When a class is defined, no memory is allocated. Memory is allocated only when an object is created.

-   An object is a **physical entity**.
-   It has a state (values of its attributes) and behavior (actions performed by its methods).

**Syntax for creating an object:**

\`\`\`java
ClassName objectName = new ClassName();
\`\`\`
The 'new' keyword is used to create an instance (object) of a class.

## Example: Creating a 'Car' Class and Objects

Let's define a 'Car' class with some attributes and methods, and then create objects from it.

\`\`\`java
// Define the Car class
public class Car {
  // Attributes (fields)
  String brand;
  String model;
  int year;

  // Constructor to initialize the object
  public Car(String brandName, String modelName, int manufacturedYear) {
    brand = brandName;
    model = modelName;
    year = manufacturedYear;
    System.out.println("A new car object created: " + brand + " " + model);
  }

  // Method to display car information
  public void displayInfo() {
    System.out.println("Brand: " + brand + ", Model: " + model + ", Year: " + year);
  }

  // Method to simulate driving
  public void drive() {
    System.out.println("The " + model + " is driving!");
  }

  public static void main(String[] args) {
    // Create objects (instances) of the Car class
    Car myCar = new Car("Toyota", "Camry", 2022); // Calls the constructor
    Car anotherCar = new Car("Honda", "Civic", 2020); // Calls the constructor

    // Access attributes and call methods using the objects
    System.out.println("\\n--- My Car ---");
    myCar.displayInfo();
    myCar.drive();

    System.out.println("\\n--- Another Car ---");
    anotherCar.displayInfo();
    anotherCar.drive();
    
    // Output:
    // A new car object created: Toyota Camry
    // A new car object created: Honda Civic
    //
    // --- My Car ---
    // Brand: Toyota, Model: Camry, Year: 2022
    // The Camry is driving!
    //
    // --- Another Car ---
    // Brand: Honda, Model: Civic, Year: 2020
    // The Civic is driving!
  }
}
\`\`\`

## Accessing Class Members (Attributes and Methods)

Once an object is created, you can access its attributes and call its methods using the **dot operator ('.')**.

-   **Accessing an attribute:** 'objectName.attributeName'
-   **Calling a method:** 'objectName.methodName()'

\`\`\`java
public class AccessMembers {
  String name = "Alice"; // Attribute
  
  public void sayHello() { // Method
    System.out.println("Hello from " + name);
  }

  public static void main(String[] args) {
    AccessMembers myObject = new AccessMembers(); // Create object

    // Access attribute
    System.out.println(myObject.name); // Output: Alice

    // Call method
    myObject.sayHello(); // Output: Hello from Alice

    // Modify attribute
    myObject.name = "Bob";
    System.out.println(myObject.name); // Output: Bob
    myObject.sayHello(); // Output: Hello from Bob
  }
}
\`\`\`

## Constructors Revisited

As seen in the 'Car' example, a constructor is a special method used to initialize new objects.

-   It has the same name as the class.
-   It does not have a return type (not even 'void').
-   It is automatically called when an object is created using 'new'.

### Types of Constructors:

1.  **Default Constructor (No-arg Constructor):** If you don't define any constructor, Java provides a public default constructor that takes no arguments. It initializes instance variables with default values (0 for numbers, 'false' for boolean, 'null' for objects).
    \`\`\`java
    public class DefaultConstructorExample {
      int value; // Defaulted to 0
      String text; // Defaulted to null

      // Java provides a public DefaultConstructorExample() { } if you don't define one.

      public static void main(String[] args) {
        DefaultConstructorExample obj = new DefaultConstructorExample();
        System.out.println("Default value of int: " + obj.value); // Output: 0
        System.out.println("Default value of String: " + obj.text); // Output: null
      }
    }
    \`\`\`

2.  **Parameterized Constructor:** A constructor that takes one or more parameters. If you define a parameterized constructor, Java will *not* provide the default no-arg constructor. You would need to explicitly define a no-arg constructor if you still want one.
    \`\`\`java
    public class ParameterizedConstructorExample {
      String message;

      public ParameterizedConstructorExample(String msg) { // Parameterized constructor
        this.message = msg;
      }

      // If you uncomment the following, you can also use a no-arg constructor
      // public ParameterizedConstructorExample() {
      //   this.message = "Default Message";
      // }

      public static void main(String[] args) {
        ParameterizedConstructorExample obj1 = new ParameterizedConstructorExample("Custom Message");
        System.out.println(obj1.message); // Output: Custom Message

        // ParameterizedConstructorExample obj2 = new ParameterizedConstructorExample(); // ERROR if no default constructor is defined
      }
    }
    \`\`\`

## The 'this' Keyword

The 'this' keyword refers to the current object. It is primarily used for:

-   **Distinguishing instance variables from parameters/local variables:** When a parameter or local variable has the same name as an instance variable, 'this.variableName' refers to the instance variable.
-   **Calling another constructor from within a constructor:** 'this()' can be used to call another constructor in the same class (constructor chaining).

\`\`\`java
public class Student {
  String name;
  int id;

  // Constructor using 'this' to resolve ambiguity
  public Student(String name, int id) {
    this.name = name; // 'this.name' refers to the instance variable
    this.id = id;     // 'this.id' refers to the instance variable
  }

  // Constructor chaining using 'this()'
  public Student(String name) {
    this(name, 0); // Calls the other constructor: public Student(String name, int id)
    System.out.println("Student created with name only.");
  }

  public void displayStudentInfo() {
    System.out.println("Student Name: " + name + ", ID: " + id);
  }

  public static void main(String[] args) {
    Student s1 = new Student("Alice", 101);
    s1.displayStudentInfo(); // Output: Student Name: Alice, ID: 101

    Student s2 = new Student("Bob"); // Calls the chained constructor
    s2.displayStudentInfo(); // Output: Student Name: Bob, ID: 0
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Start with Simple Classes</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When learning OOP, start by creating simple classes that model straightforward real-world objects (e.g., 'Book', 'Animal', 'Product'). Focus on defining their essential attributes and behaviors. This hands-on practice will solidify your understanding.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: NullPointerException</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        If you declare an object reference but don't initialize it with 'new' (e.g., 'Car myCar;'), it will have a value of 'null'. Attempting to call a method or access an attribute on a 'null' object (e.g., 'myCar.drive()') will result in a 'NullPointerException' at runtime. Always ensure your objects are properly initialized before use.
    </div>
</div>
`;

export default function JavaClassesObjectsPage() {
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
          prevLesson="java-oop"
          nextLesson="java-class-attributes" // Assuming this is the next logical step if not covered fully in OOP intro
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
