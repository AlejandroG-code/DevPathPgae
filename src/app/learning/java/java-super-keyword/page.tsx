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
# Java 'super' Keyword

The 'super' keyword in Java is a reference variable that is used to refer to the immediate parent class (superclass) object. It is primarily used within subclasses to access members (attributes and methods) of the superclass that might be hidden or overridden by members in the subclass.

## Common Uses of 'super' Keyword

The 'super' keyword has three main uses:

1.  **To refer to immediate parent class instance variables:** When a subclass has an instance variable with the same name as an instance variable in its superclass, 'super.variableName' can be used to explicitly refer to the superclass's variable.
2.  **To invoke immediate parent class method:** When a subclass overrides a method of its superclass, 'super.methodName()' can be used to call the overridden method from the superclass.
3.  **To invoke immediate parent class constructor:** 'super()' (with appropriate arguments) can be used to call a constructor of the immediate superclass. This must be the first statement in the subclass constructor.

---

## 1. Referring to Immediate Parent Class Instance Variables

If a subclass has a field with the same name as a field in its superclass, the superclass's field is hidden (shadowed). To access the superclass's field, you use 'super.fieldName'.

\`\`\`java
class Animal {
  String type = "Mammal"; // Superclass instance variable
}

class Dog extends Animal {
  String type = "Canine"; // Subclass instance variable (shadows superclass 'type')

  public void displayType() {
    System.out.println("Subclass type: " + type);       // Refers to Dog's 'type'
    System.out.println("Superclass type: " + super.type); // Refers to Animal's 'type'
  }

  public static void main(String[] args) {
    Dog myDog = new Dog();
    myDog.displayType();
    // Output:
    // Subclass type: Canine
    // Superclass type: Mammal
  }
}
\`\`\`

---

## 2. Invoking Immediate Parent Class Method

When a subclass overrides a method that is defined in its superclass, you can still call the superclass's version of the method using 'super.methodName()'. This is useful if you want to extend the functionality of the superclass method rather than completely replacing it.

\`\`\`java
class Vehicle {
  public void start() {
    System.out.println("Vehicle started.");
  }

  public void stop() {
    System.out.println("Vehicle stopped.");
  }
}

class Car extends Vehicle {
  @Override
  public void start() {
    super.start(); // Call the start() method of the superclass
    System.out.println("Car engine ignited.");
  }

  @Override
  public void stop() {
    System.out.println("Car engine shut down.");
    super.stop(); // Call the stop() method of the superclass
  }

  public static void main(String[] args) {
    Car myCar = new Car();
    myCar.start();
    System.out.println("---");
    myCar.stop();
    // Output:
    // Vehicle started.
    // Car engine ignited.
    // ---
    // Car engine shut down.
    // Vehicle stopped.
  }
}
\`\`\`

---

## 3. Invoking Immediate Parent Class Constructor

The 'super()' keyword (with or without arguments) is used to call the constructor of the immediate superclass. This is crucial for ensuring that the superclass's initialization logic is executed when a subclass object is created.

**Important Rules for 'super()':**
-   It must be the **first statement** in the subclass's constructor.
-   If a superclass has a parameterized constructor, the subclass constructor must explicitly call 'super()' with the correct arguments. If it doesn't, and the superclass doesn't have a no-arg constructor, you'll get a compile-time error.
-   If the superclass has a no-arg constructor and the subclass constructor doesn't explicitly call 'super()', Java automatically inserts an implicit 'super()' call as the first statement.

### Example: Calling Superclass Constructor

\`\`\`java
class Person {
  String name;

  public Person(String name) {
    this.name = name;
    System.out.println("Person constructor called: " + name);
  }
}

class Employee extends Person {
  int employeeId;

  // Constructor for Employee, calling superclass constructor
  public Employee(String name, int employeeId) {
    super(name); // Calls Person's constructor (must be first statement)
    this.employeeId = employeeId;
    System.out.println("Employee constructor called: " + employeeId);
  }

  public void displayInfo() {
    System.out.println("Name: " + name + ", Employee ID: " + employeeId);
  }

  public static void main(String[] args) {
    Employee emp = new Employee("John Doe", 12345);
    emp.displayInfo();
    // Output:
    // Person constructor called: John Doe
    // Employee constructor called: 12345
    // Name: John Doe, Employee ID: 12345
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use 'super' for Clear Intent</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Using 'super' explicitly makes your code clearer about whether you are referring to the subclass's member or the superclass's member. This is especially important when dealing with method overriding and constructor chaining.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'super()' Must Be First</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The call to 'super()' in a constructor must always be the very first statement. If you place any other statement before it, you will get a compile-time error. This rule ensures that the superclass is fully initialized before the subclass begins its own initialization.
    </div>
</div>
`;

export default function JavaSuperKeywordPage() {
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
          prevLesson="java-polymorphism"
          nextLesson="java-inner-classes" // Assuming this is the next logical step after super keyword
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
