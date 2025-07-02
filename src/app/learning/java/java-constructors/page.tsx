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
# Java Constructors

In Java, a **constructor** is a special type of method that is used to initialize objects. It is called automatically when an object of a class is created using the 'new' keyword. Constructors play a crucial role in ensuring that objects are in a valid and usable state from the moment they are created.

## Characteristics of Constructors

1.  **Same Name as Class:** A constructor must have the same name as its class.
2.  **No Return Type:** Constructors do not have a return type, not even 'void'.
3.  **Automatic Call:** They are invoked automatically when an object is created.
4.  **Purpose:** To initialize the instance variables (attributes) of the object.

## Default Constructor (No-arg Constructor)

If you do not define any constructor in your class, Java automatically provides a **default constructor** (also known as a no-argument constructor). This default constructor initializes instance variables to their default values (0 for numeric types, 'false' for booleans, 'null' for object references).

\`\`\`java
public class DefaultConstructorExample {
  int id;       // Defaulted to 0
  String name;  // Defaulted to null

  // If no constructor is explicitly defined, Java provides:
  // public DefaultConstructorExample() { }

  public static void main(String[] args) {
    DefaultConstructorExample obj = new DefaultConstructorExample(); // Calls the default constructor
    System.out.println("ID: " + obj.id);     // Output: ID: 0
    System.out.println("Name: " + obj.name); // Output: Name: null
  }
}
\`\`\`

## Parameterized Constructor

A parameterized constructor is a constructor that takes one or more arguments (parameters). These parameters are used to initialize the instance variables of the new object with specific values provided during object creation.

**Important:** If you define *any* parameterized constructor, Java will **not** automatically provide the default no-arg constructor. If you still want a no-arg constructor, you must explicitly define it.

\`\`\`java
public class ParameterizedConstructorExample {
  String model;
  int year;

  // Parameterized Constructor
  public ParameterizedConstructorExample(String carModel, int carYear) {
    model = carModel; // Initialize instance variable 'model'
    year = carYear;   // Initialize instance variable 'year'
    System.out.println("Car object created: " + model + " (" + year + ")");
  }

  public void displayCarInfo() {
    System.out.println("Model: " + model + ", Year: " + year);
  }

  public static void main(String[] args) {
    // Creating objects using the parameterized constructor
    ParameterizedConstructorExample car1 = new ParameterizedConstructorExample("Toyota Camry", 2022);
    car1.displayCarInfo(); // Output: Model: Toyota Camry, Year: 2022

    ParameterizedConstructorExample car2 = new ParameterizedConstructorExample("Honda Civic", 2020);
    car2.displayCarInfo(); // Output: Model: Honda Civic, Year: 2020

    // The following line would cause a compile-time error if no explicit no-arg constructor is defined:
    // ParameterizedConstructorExample car3 = new ParameterizedConstructorExample();
  }
}
\`\`\`

## The 'this' Keyword in Constructors

The 'this' keyword is often used within constructors to refer to the current object. Its primary use in constructors is to:

1.  **Distinguish between instance variables and parameters** when they have the same name (a common practice to make code more readable).
2.  **Call another constructor** from the same class (constructor chaining).

### Example: Using 'this' for Ambiguity

\`\`\`java
public class Book {
  String title;
  String author;

  // Constructor using 'this' to refer to instance variables
  public Book(String title, String author) {
    this.title = title;   // 'this.title' refers to the instance variable
    this.author = author; // 'this.author' refers to the instance variable
  }

  public void displayBookInfo() {
    System.out.println("Title: " + title + ", Author: " + author);
  }

  public static void main(String[] args) {
    Book myBook = new Book("The Great Gatsby", "F. Scott Fitzgerald");
    myBook.displayBookInfo();
    // Output: Title: The Great Gatsby, Author: F. Scott Fitzgerald
  }
}
\`\`\`

## Constructor Overloading

Just like methods, constructors can also be overloaded. This means a class can have multiple constructors, as long as each has a different parameter list (different number of parameters, different types of parameters, or different order of parameters).

\`\`\`java
public class Student {
  String name;
  int id;
  String major;

  // Constructor 1: name and id
  public Student(String name, int id) {
    this.name = name;
    this.id = id;
    this.major = "Undeclared"; // Default value
    System.out.println("Student created with name and ID.");
  }

  // Constructor 2: name, id, and major (overloaded)
  public Student(String name, int id, String major) {
    this(name, id); // Calls Constructor 1 (constructor chaining)
    this.major = major;
    System.out.println("Student created with name, ID, and major.");
  }

  // Constructor 3: name only (overloaded)
  public Student(String name) {
    this(name, 0); // Calls Constructor 1 (constructor chaining), default ID 0
    System.out.println("Student created with name only.");
  }

  public void displayStudentInfo() {
    System.out.println("Name: " + name + ", ID: " + id + ", Major: " + major);
  }

  public static void main(String[] args) {
    Student s1 = new Student("Alice", 101);
    s1.displayStudentInfo();
    // Output:
    // Student created with name and ID.
    // Name: Alice, ID: 101, Major: Undeclared

    Student s2 = new Student("Bob", 102, "Computer Science");
    s2.displayStudentInfo();
    // Output:
    // Student created with name and ID.
    // Student created with name, ID, and major.
    // Name: Bob, ID: 102, Major: Computer Science

    Student s3 = new Student("Charlie");
    s3.displayStudentInfo();
    // Output:
    // Student created with name and ID.
    // Student created with name only.
    // Name: Charlie, ID: 0, Major: Undeclared
  }
}
\`\`\`

## When to Use Constructors

-   **Initialization:** To ensure that a newly created object starts with a valid and consistent state.
-   **Mandatory Values:** To enforce that certain attributes are set when an object is created.
-   **Flexibility:** Overloaded constructors provide multiple ways to create objects, catering to different initialization needs.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Initialize All Fields</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        It's good practice to initialize all instance variables within your constructors (or provide reasonable default values). This prevents unexpected 'NullPointerException's or other issues when an object is used.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: No Return Type</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        A common mistake is to add a 'void' return type to a constructor. While the code might compile, it will no longer be treated as a constructor but as a regular method, and it will not be automatically called when you create an object. This can lead to uninitialized objects and unexpected behavior.
    </div>
</div>
`;

export default function JavaConstructorsPage() {
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
          prevLesson="java-classes-objects"
          nextLesson="java-this-keyword"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
