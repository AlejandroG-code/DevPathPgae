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
# Java Encapsulation

**Encapsulation** is one of the four fundamental principles of Object-Oriented Programming (OOP). It refers to the bundling of data (attributes) and the methods that operate on that data into a single unit (a class), and restricting direct access to some of an object's components. This restriction is often achieved by making attributes 'private' and providing 'public' methods (getters and setters) to access and modify them.

## Why Encapsulation?

-   **Data Hiding (Information Hiding):** Protects the internal state of an object from unauthorized access or modification from outside the class.
-   **Control over Data:** Allows you to control how data is accessed and modified. You can add validation logic within setters to ensure data integrity.
-   **Flexibility and Maintainability:** Changes to the internal implementation of a class do not affect other parts of the code that use the class, as long as the public interface (getters and setters) remains consistent. This makes the code easier to maintain and modify.
-   **Loose Coupling:** Reduces dependencies between different parts of your code.

## Implementing Encapsulation

To achieve encapsulation in Java:

1.  **Declare class attributes (fields) as 'private'.** This makes them inaccessible directly from outside the class.
2.  **Provide 'public' getter methods** to read the value of private attributes.
3.  **Provide 'public' setter methods** to modify the value of private attributes.

### Example: Encapsulated 'Person' Class

\`\`\`java
public class Person {
  // 1. Private attributes (data hiding)
  private String name;
  private int age;

  // Constructor
  public Person(String name, int age) {
    this.name = name;
    // Use setter to apply validation during construction
    setAge(age); 
  }

  // 2. Public Getter method for 'name'
  public String getName() {
    return name;
  }

  // 3. Public Setter method for 'name' (optional, if name is immutable)
  public void setName(String name) {
    this.name = name;
  }

  // 2. Public Getter method for 'age'
  public int getAge() {
    return age;
  }

  // 3. Public Setter method for 'age' with validation
  public void setAge(int age) {
    if (age > 0 && age < 150) { // Add validation logic
      this.age = age;
    } else {
      System.out.println("Invalid age provided: " + age + ". Age must be between 1 and 149.");
      this.age = 0; // Set to a default invalid age or throw an exception
    }
  }

  public static void main(String[] args) {
    Person myPerson = new Person("Alice", 30);

    // Accessing data using getter methods
    System.out.println("Person's Name: " + myPerson.getName()); // Output: Alice
    System.out.println("Person's Age: " + myPerson.getAge());   // Output: 30

    // Modifying data using setter methods
    myPerson.setAge(31);
    System.out.println("New Age: " + myPerson.getAge()); // Output: 31

    myPerson.setAge(200); // Attempt to set invalid age
    System.out.println("Age after invalid attempt: " + myPerson.getAge()); // Output: 0 (due to validation)

    // myPerson.name = "Bob"; // Compile-time error: 'name' has private access
  }
}
\`\`\`

## Getters and Setters (Accessor and Mutator Methods)

**Getter (Accessor) Methods:**

*   Used to retrieve (get) the value of a private attribute.
*   Conventionally named 'get' followed by the attribute name (e.g., 'getName()', 'getAge()').
*   They typically have the same return type as the attribute they are getting and take no parameters.


**Setter (Mutator) Methods:**

*   Used to modify (set) the value of a private attribute.
*   Conventionally named 'set' followed by the attribute name (e.g., 'setName()', 'setAge()').
*   They typically have a 'void' return type and take one parameter of the same type as the attribute they are setting.

## Read-Only and Write-Only Attributes

With encapsulation, you have fine-grained control over attribute access:

*   **Read-Only Attribute:** If you only provide a getter method for a private attribute, it becomes read-only from outside the class. Its value can be set only internally (e.g., in the constructor).
    \`\`\`java
    public class ReadOnlyExample {
      private final String id; // 'final' makes it set once

      public ReadOnlyExample(String id) {
        this.id = id;
      }

      public String getId() { // Only a getter, so 'id' is read-only
        return id;
      }
      // No setId() method
    }
    \`\`\`

-   **Write-Only Attribute:** If you only provide a setter method for a private attribute, it becomes write-only from outside the class. This is less common but possible.

## Encapsulation and Immutability

Encapsulation is a key step towards creating **immutable objects**. An immutable object is one whose state cannot be changed after it is created. To make a class immutable:
1.  Declare all fields as 'private' and 'final'.
2.  Do not provide any setter methods.
3.  Initialize all fields through the constructor.
4.  If a field is a mutable object (e.g., an 'ArrayList'), do not return the direct reference to it from a getter; instead, return a copy.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: POJOs and JavaBeans</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Classes that primarily serve to hold data and follow the getter/setter convention are often called Plain Old Java Objects (POJOs) or JavaBeans. They are widely used in frameworks and enterprise applications for data transfer and persistence.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Direct Access vs. Methods</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Never access or modify private attributes directly from outside the class. Always use the provided public getter and setter methods. Bypassing these methods defeats the purpose of encapsulation and can lead to broken data integrity and unmanageable code.
    </div>
</div>
`;

export default function JavaEncapsulationPage() {
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
          prevLesson="java-modifiers"
          nextLesson="java-packages-api"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
