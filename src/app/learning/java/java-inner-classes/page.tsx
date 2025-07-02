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
# Java Inner Classes

In Java, an **inner class** (or nested class) is a class defined within another class. They allow you to logically group classes that are only used in one place, increase encapsulation, and create more readable and maintainable code.

## Why Use Inner Classes?

-   **Increased Encapsulation:** Inner classes can access the private members of the outer class, providing a way to keep related functionality tightly coupled while still maintaining encapsulation.
-   **More Readable and Maintainable Code:** Grouping classes that are logically related and used only within the context of the outer class makes the code more organized.
-   **Code Optimization:** Inner classes can reduce the amount of code by allowing classes to be defined closer to where they are used.

## Types of Inner Classes

There are four types of inner classes in Java:

1.  **Nested Inner Class (Non-static Inner Class)**
2.  **Method-Local Inner Class**
3.  **Anonymous Inner Class**
4.  **Static Nested Class**

---

## 1. Nested Inner Class (Non-static Inner Class)

A non-static inner class is the most common type of inner class. It is an ordinary class defined within another class, but not declared with the 'static' modifier.

**Characteristics:**
-   It can access all members (including private) of its outer class.
-   It requires an instance of the outer class to be created.
-   It cannot declare static members itself.

**Example:**

\`\`\`java
class OuterClass {
  int outerX = 10;
  private int privateOuterY = 20;

  // Non-static Inner Class
  class InnerClass {
    int innerZ = 30;

    public void displayOuterMembers() {
      System.out.println("OuterX from Inner: " + outerX);
      System.out.println("PrivateOuterY from Inner: " + privateOuterY);
    }
  }

  public static void main(String[] args) {
    OuterClass outer = new OuterClass();
    OuterClass.InnerClass inner = outer.new InnerClass(); // Creating inner class object
    
    inner.displayOuterMembers();
    System.out.println("InnerZ: " + inner.innerZ);
    // Output:
    // OuterX from Inner: 10
    // PrivateOuterY from Inner: 20
    // InnerZ: 30
  }
}
\`\`\`

---

## 2. Method-Local Inner Class

A method-local inner class is a class defined inside a method. Its scope is restricted to that method.

**Characteristics:**
-   It can only be instantiated within the method where it is defined.
-   It can access the final (or effectively final) local variables of the method where it is defined.
-   It cannot be declared 'public', 'private', 'protected', or 'static'.

**Example:**

\`\`\`java
public class LocalInnerClassExample {
  public void displayMessage() {
    final String message = "Hello from local method!"; // Must be final or effectively final

    // Method-Local Inner Class
    class LocalPrinter {
      public void print() {
        System.out.println(message); // Accessing local variable 'message'
      }
    }

    LocalPrinter printer = new LocalPrinter(); // Instantiate within the method
    printer.print();
  }

  public static void main(String[] args) {
    LocalInnerClassExample obj = new LocalInnerClassExample();
    obj.displayMessage(); // Output: Hello from local method!
  }
}
\`\`\`

---

## 3. Anonymous Inner Class

An anonymous inner class is an inner class without a name. It is declared and instantiated in a single statement. They are typically used when you need to create an object of a class or interface with a single method implementation.

**Characteristics:**
-   Has no name.
-   Can implement an interface or extend a class.
-   Cannot have constructors.
-   Can access final (or effectively final) local variables.

**Example (implementing an interface):**

\`\`\`java
interface Greeting {
  void greet();
}

public class AnonymousInnerClassExample {
  public static void main(String[] args) {
    // Anonymous inner class implementing the Greeting interface
    Greeting englishGreeting = new Greeting() {
      @Override
      public void greet() {
        System.out.println("Hello!");
      }
    };

    Greeting spanishGreeting = new Greeting() {
      @Override
      public void greet() {
        System.out.println("Hola!");
      }
    };

    englishGreeting.greet(); // Output: Hello!
    spanishGreeting.greet(); // Output: Hola!
  }
}
\`\`\`

**Example (extending a class):**

\`\`\`java
class Animal {
  public void makeSound() {
    System.out.println("Generic animal sound.");
  }
}

public class AnonymousClassExtension {
  public static void main(String[] args) {
    // Anonymous inner class extending Animal
    Animal dog = new Animal() {
      @Override
      public void makeSound() {
        System.out.println("Woof woof!");
      }
    };

    Animal cat = new Animal() {
      @Override
      public void makeSound() {
        System.out.println("Meow meow!");
      }
    };

    dog.makeSound(); // Output: Woof woof!
    cat.makeSound(); // Output: Meow meow!
  }
}
\`\`\`

---

## 4. Static Nested Class

A static nested class is a class defined inside another class and declared with the 'static' modifier. Unlike non-static inner classes, it does not require an instance of the outer class to be created.

**Characteristics:**
-   Can only access static members of the outer class directly.
-   Does not have access to the non-static (instance) members of the outer class.
-   Can declare static members itself.
-   Can be instantiated without an object of the outer class.

**Example:**

\`\`\`java
class OuterStaticClass {
  static int staticOuterX = 100;
  int instanceOuterY = 200; // Non-static member

  // Static Nested Class
  static class StaticNestedClass {
    int nestedZ = 300; // Can have its own instance members
    static int staticNestedW = 400; // Can have its own static members

    public void displayOuterStaticMember() {
      System.out.println("Outer static X from StaticNested: " + staticOuterX);
      // System.out.println(instanceOuterY); // ERROR: Cannot access non-static member directly
    }
  }

  public static void main(String[] args) {
    // Create static nested class object directly
    OuterStaticClass.StaticNestedClass nested = new OuterStaticClass.StaticNestedClass();
    
    nested.displayOuterStaticMember();
    System.out.println("Nested Z: " + nested.nestedZ);
    System.out.println("Static Nested W: " + StaticNestedClass.staticNestedW);
    // Output:
    // Outer static X from StaticNested: 100
    // Nested Z: 300
    // Static Nested W: 400
  }
}
\`\`\`

---

## Summary of Inner Class Types

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Declaration</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Access to Outer Members</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Instantiation</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Common Use Case</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Nested Inner (Non-static)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inside outer class, no 'static' modifier.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">All outer members (static and non-static).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'outerObj.new InnerClass()'. Requires outer instance.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">When inner class needs to directly interact with outer object's state.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Method-Local</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inside a method.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Outer class members, and 'final' (or effectively final) local variables of the method.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'new LocalClass()'. Only within the method.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">When a class is needed only once within a specific method.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Anonymous</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No name, declared and instantiated simultaneously.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Outer class members, and 'final' (or effectively final) local variables.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'new Interface/Class() { ... }'. Single instance.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">For implementing an interface or extending a class for a single, one-time use.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Static Nested</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inside outer class, with 'static' modifier.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Only static members of the outer class.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'new OuterClass.StaticNestedClass()'. No outer instance needed.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">When inner class is logically grouped but doesn't need access to outer object's non-static members.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Choose the Right Inner Class</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The choice of inner class type depends on your specific needs. If the inner class needs access to the outer class's instance members, use a non-static inner class. If it doesn't need such access and can stand alone, a static nested class is better. For one-time, simple implementations, anonymous classes are convenient. For very localized functionality, method-local classes can be appropriate.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Serialization of Inner Classes</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be cautious when serializing non-static inner classes. They implicitly hold a reference to their outer class instance. If the outer class is not serializable, or if you don't intend to serialize the outer instance along with the inner, this can lead to 'NotSerializableException' or unexpected behavior. Static nested classes do not have this issue as they don't hold an implicit reference to an outer instance.
    </div>
</div>
`;

export default function JavaInnerClassesPage() {
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
          nextLesson="java-interface" // Assuming this is the next logical step
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
