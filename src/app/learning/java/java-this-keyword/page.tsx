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
# Java 'this' Keyword

The 'this' keyword in Java is a reference variable that refers to the current object. It is a non-static (instance) keyword, meaning it can only be used within an instance method or a constructor. It cannot be used in a static context (e.g., a static method).

## Common Uses of 'this' Keyword

The 'this' keyword has several important uses in Java:

1.  **To refer to the current class's instance variables (fields):** This is the most common use, especially when instance variables are shadowed by local variables or method parameters with the same name.
2.  **To invoke current class method (implicitly):** You can call other methods of the same class using 'this.methodName()', though it's often implicit.
3.  **To invoke current class constructor (constructor chaining):** Using 'this()' to call another constructor from the same class.
4.  **To pass the current object as an argument in the method call:** When a method needs a reference to the current object.
5.  **To return the current class instance from the method:** For method chaining.

---

## 1. Referring to Current Class Instance Variables

This is the most frequent use of 'this'. It resolves the ambiguity between instance variables and local variables/parameters that have the same name.

\`\`\`java
public class Person {
  String name; // Instance variable
  int age;     // Instance variable

  // Constructor with parameters having the same names as instance variables
  public Person(String name, int age) {
    this.name = name; // 'this.name' refers to the instance variable 'name'
    this.age = age;   // 'this.age' refers to the instance variable 'age'
    System.out.println("Person object created: " + this.name);
  }

  public void displayDetails() {
    System.out.println("Name: " + name + ", Age: " + age);
  }

  public static void main(String[] args) {
    Person p1 = new Person("Alice", 30);
    p1.displayDetails(); // Output: Name: Alice, Age: 30

    Person p2 = new Person("Bob", 25);
    p2.displayDetails(); // Output: Name: Bob, Age: 25
  }
}
\`\`\`
Without 'this.name = name;', the constructor would assign the parameter 'name' to itself, leaving the instance variable 'name' uninitialized (or with its default 'null' value).

---

## 2. Invoking Current Class Method (Implicitly)

You can use 'this' to explicitly call a method of the current object. While often implicit (you can just call 'methodName()'), using 'this.methodName()' can sometimes improve clarity, especially when dealing with inheritance or complex method calls.

\`\`\`java
public class Calculator {
  int result;

  public void add(int a, int b) {
    this.result = a + b;
    System.out.println("Sum calculated: " + this.result);
  }

  public void performCalculation(int x, int y) {
    System.out.println("Performing calculation...");
    this.add(x, y); // Explicitly calling 'add' method of the current object
    // add(x, y); // This would also work implicitly
    System.out.println("Calculation performed.");
  }

  public static void main(String[] args) {
    Calculator calc = new Calculator();
    calc.performCalculation(10, 20);
    // Output:
    // Performing calculation...
    // Sum calculated: 30
    // Calculation performed.
  }
}
\`\`\`

---

## 3. Invoking Current Class Constructor (Constructor Chaining)

You can use 'this()' (with appropriate arguments) from within one constructor to call another constructor in the same class. This is known as **constructor chaining** and helps in reusing initialization logic. The 'this()' call must be the first statement in the constructor.

\`\`\`java
public class Product {
  String productId;
  String productName;
  double price;

  // Constructor 1: Initializes productId and productName, sets default price
  public Product(String productId, String productName) {
    this.productId = productId;
    this.productName = productName;
    this.price = 0.0; // Default price
    System.out.println("Product created with ID and Name.");
  }

  // Constructor 2: Initializes all fields, chains to Constructor 1
  public Product(String productId, String productName, double price) {
    this(productId, productName); // Calls Constructor 1
    this.price = price; // Then sets the specific price
    System.out.println("Product created with ID, Name, and Price.");
  }

  public void displayProduct() {
    System.out.println("ID: " + productId + ", Name: " + productName + ", Price: $" + price);
  }

  public static void main(String[] args) {
    Product p1 = new Product("P001", "Laptop");
    p1.displayProduct();
    // Output:
    // Product created with ID and Name.
    // ID: P001, Name: Laptop, Price: $0.0

    Product p2 = new Product("P002", "Mouse", 25.99);
    p2.displayProduct();
    // Output:
    // Product created with ID and Name.
    // Product created with ID, Name, and Price.
    // ID: P002, Name: Mouse, Price: $25.99
  }
}
\`\`\`

---

## 4. Passing Current Object as Argument

You can pass the 'this' reference as an argument to a method. This is useful when a method needs to operate on the current object itself.

\`\`\`java
class DataProcessor {
  public void process(MyObject obj) {
    System.out.println("Processing object with value: " + obj.value);
    obj.value += 10; // Modifying the object passed
  }
}

public class MyObject {
  int value;

  public MyObject(int val) {
    this.value = val;
  }

  public void sendToProcessor() {
    DataProcessor processor = new DataProcessor();
    processor.process(this); // Pass the current object ('this')
  }

  public static void main(String[] args) {
    MyObject obj = new MyObject(5);
    System.out.println("Initial value: " + obj.value); // Output: 5
    obj.sendToProcessor();
    System.out.println("Value after processing: " + obj.value); // Output: 15
  }
}
\`\`\`

---

## 5. Returning Current Class Instance

You can return 'this' from a method to allow for method chaining (fluent interface), where multiple method calls can be chained together on the same object.

\`\`\`java
public class CoffeeMachine {
  String coffeeType;
  int waterLevel;

  public CoffeeMachine setCoffeeType(String type) {
    this.coffeeType = type;
    System.out.println("Coffee type set to: " + type);
    return this; // Return the current object
  }

  public CoffeeMachine addWater(int amount) {
    this.waterLevel += amount;
    System.out.println("Water added. Current level: " + waterLevel);
    return this; // Return the current object
  }

  public void brew() {
    System.out.println("Brewing " + coffeeType + " coffee with " + waterLevel + "ml water.");
  }

  public static void main(String[] args) {
    new CoffeeMachine()
      .setCoffeeType("Espresso")
      .addWater(100)
      .brew();
    // Output:
    // Coffee type set to: Espresso
    // Water added. Current level: 100
    // Brewing Espresso coffee with 100ml water.
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Readability vs. Redundancy</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While 'this' can always be used to refer to instance members, it's generally only necessary when there's ambiguity (like parameter shadowing). Overusing 'this' when not needed can make code slightly more verbose without adding clarity.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'this' in Static Context</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        You cannot use the 'this' keyword in a static method or a static block. This is because 'static' members belong to the class, not to any specific object, and 'this' refers to an instance of an object. Attempting to use 'this' in a static context will result in a compile-time error.
    </div>
</div>
`;

export default function JavaThisKeywordPage() {
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
          prevLesson="java-constructors"
          nextLesson="java-modifiers"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
