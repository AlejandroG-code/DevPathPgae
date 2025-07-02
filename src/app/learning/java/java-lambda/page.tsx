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
# Java Lambda Expressions

**Lambda expressions** were introduced in Java 8 and provide a concise way to represent an instance of a functional interface (an interface with a single abstract method). They are often used to write inline implementations of functional interfaces, making code more readable and compact, especially for event handling, callbacks, and working with the Streams API.

## Why Use Lambda Expressions?

-   **Conciseness:** Reduces boilerplate code compared to anonymous inner classes.
-   **Readability:** Makes code easier to understand, especially for simple functional interfaces.
-   **Functional Programming:** Enables a more functional programming style in Java.
-   **API Enhancements:** Powers new features like the Streams API and improvements to the Collections API.

## Syntax of Lambda Expressions

A lambda expression consists of three main parts:

1.  **Parameters:** A comma-separated list of formal parameters enclosed in parentheses.
    -   If there are no parameters, use empty parentheses '()'.
    -   If there is a single parameter and its type can be inferred, the parentheses can be omitted.
2.  **Arrow Token:** The '->' symbol, which separates the parameters from the body.
3.  **Body:** The body can be a single expression or a block of statements.
    -   If it's a single expression, the result of the expression is implicitly returned.
    -   If it's a block of statements, it must be enclosed in curly braces '{}', and a 'return' statement is required if a value needs to be returned.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Syntax Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No parameters</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'() -> System.out.println("Hello");'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A lambda that takes no arguments and performs an action.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Single parameter, no type</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'s -> s.length()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A lambda that takes one argument (type inferred) and returns its length.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Single parameter, with type</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(String s) -> s.toUpperCase()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A lambda that takes one 'String' argument and returns its uppercase version.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Multiple parameters</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(a, b) -> a + b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A lambda that takes two arguments (types inferred) and returns their sum.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Block body</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(x, y) -> { int sum = x + y; return sum; }'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A lambda with a multi-statement body, requiring explicit 'return'.</td>
        </tr>
    </tbody>
</table>

---

## Functional Interfaces

Lambda expressions are intrinsically linked to **functional interfaces**. A functional interface is an interface that contains **exactly one abstract method**. They can have any number of default or static methods.

The '@FunctionalInterface' annotation (introduced in Java 8) is optional but recommended. It tells the compiler to enforce the "single abstract method" rule, preventing accidental additions of new abstract methods.

**Examples of Built-in Functional Interfaces:**

-   **'Runnable'**: 'void run()' (no parameters, no return)
-   **'Comparator<T>'**: 'int compare(T o1, T o2)' (two parameters, int return)
-   **'ActionListener'**: 'void actionPerformed(ActionEvent e)' (one parameter, no return)
-   **'Consumer<T>'**: 'void accept(T t)' (one parameter, no return)
-   **'Supplier<T>'**: 'T get()' (no parameters, T return)
-   **'Function<T, R>'**: 'R apply(T t)' (one parameter, R return)
-   **'Predicate<T>'**: 'boolean test(T t)' (one parameter, boolean return)

---

## 1. Using Lambda with Built-in Functional Interfaces

### Example: 'Runnable'

\`\`\`java
public class LambdaRunnableExample {
  public static void main(String[] args) {
    // Old way: Anonymous inner class
    Runnable oldRunnable = new Runnable() {
      @Override
      public void run() {
        System.out.println("Running from anonymous inner class.");
      }
    };
    new Thread(oldRunnable).start();

    // New way: Lambda expression
    Runnable lambdaRunnable = () -> System.out.println("Running from lambda expression.");
    new Thread(lambdaRunnable).start();

    // Even more concise: directly in Thread constructor
    new Thread(() -> System.out.println("Running from direct lambda in Thread.")).start();
  }
}
\`\`\`

### Example: 'Comparator' (for sorting)

\`\`\`java
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class LambdaComparatorExample {
  public static void main(String[] args) {
    List<String> names = new ArrayList<>();
    names.add("Charlie");
    names.add("Alice");
    names.add("Bob");

    System.out.println("Original names: " + names); // Output: [Charlie, Alice, Bob]

    // Old way: Anonymous inner class for sorting by length
    Collections.sort(names, new Comparator<String>() {
      @Override
      public int compare(String s1, String s2) {
        return Integer.compare(s1.length(), s2.length());
      }
    });
    System.out.println("Sorted by length (old way): " + names); // Output: [Bob, Alice, Charlie]

    // New way: Lambda expression for sorting by length (descending)
    Collections.sort(names, (s1, s2) -> Integer.compare(s2.length(), s1.length()));
    System.out.println("Sorted by length (lambda desc): " + names); // Output: [Charlie, Alice, Bob]

    // Even more concise with Comparator.comparing (Java 8+)
    names.sort(Comparator.comparing(String::length)); // Sort by length ascending using method reference
    System.out.println("Sorted by length (method ref): " + names); // Output: [Bob, Alice, Charlie]
  }
}
\`\`\`

---

## 2. Creating Your Own Functional Interfaces

You can define your own functional interfaces to use with lambda expressions.

**Example:**

\`\`\`java
// Define a custom functional interface
@FunctionalInterface
interface MathOperation {
  int operate(int a, int b); // Single abstract method
  
  // Can have default methods
  default void printResult(int result) {
    System.out.println("Operation result: " + result);
  }
}

@FunctionalInterface
interface GreetingService {
  void sayMessage(String message);
}

public class CustomFunctionalInterfaceExample {
  public static void main(String[] args) {
    // Implement MathOperation using lambda for addition
    MathOperation addition = (a, b) -> a + b;
    System.out.println("10 + 5 = " + addition.operate(10, 5)); // Output: 15
    addition.printResult(addition.operate(10, 5)); // Using default method

    // Implement MathOperation using lambda for subtraction
    MathOperation subtraction = (a, b) -> a - b;
    System.out.println("10 - 5 = " + subtraction.operate(10, 5)); // Output: 5

    // Implement GreetingService using lambda
    GreetingService greet1 = message -> System.out.println("Hello " + message);
    greet1.sayMessage("World"); // Output: Hello World

    GreetingService greet2 = (message) -> {
      System.out.println("Greetings, " + message + "!");
      System.out.println("Hope you have a great day.");
    };
    greet2.sayMessage("Java Developer");
  }
}
\`\`\`

---

## Lambda Scope and Variable Capture

Lambda expressions can access variables from their enclosing scope. However, there are rules:

-   **Effectively Final Variables:** Local variables accessed by a lambda expression must be 'final' or effectively final (meaning their value is not changed after initialization).
-   **Instance Variables:** Lambdas can access and modify instance variables (non-static fields) of the enclosing class.
-   **Static Variables:** Lambdas can access and modify static variables.

**Example:**

\`\`\`java
public class LambdaScopeExample {
  private int instanceVar = 10; // Instance variable
  private static int staticVar = 20; // Static variable

  public void demonstrateScope() {
    int localVar = 30; // Effectively final local variable
    // localVar = 31; // Uncommenting this would make localVar NOT effectively final,
                       // causing a compile-time error if used in lambda below.

    // Lambda accessing local, instance, and static variables
    Runnable myTask = () -> {
      System.out.println("Local variable: " + localVar); // Accesses effectively final local var
      System.out.println("Instance variable: " + instanceVar); // Accesses instance var
      System.out.println("Static variable: " + staticVar);   // Accesses static var

      instanceVar++; // Can modify instance variable
      staticVar++;   // Can modify static variable
      // localVar++; // COMPILE-TIME ERROR: Local variables accessed from a lambda must be final or effectively final
    };

    new Thread(myTask).start();

    // You can also modify instance/static vars outside the lambda
    instanceVar = 100;
    staticVar = 200;

    try {
      Thread.sleep(100); // Give thread a chance to run
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
    System.out.println("Instance variable after lambda creation: " + instanceVar);
    System.out.println("Static variable after lambda creation: " + staticVar);
  }

  public static void main(String[] args) {
    new LambdaScopeExample().demonstrateScope();
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use Lambda for Concise Code</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Lambda expressions are best used for short, simple implementations of functional interfaces. They significantly reduce the verbosity of anonymous inner classes, making your code cleaner and more focused on the logic rather than the boilerplate.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: 'this' Keyword in Lambdas</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Unlike anonymous inner classes, which have their own 'this' context, a lambda expression does **not** create a new scope. The 'this' keyword inside a lambda refers to the 'this' of the enclosing instance. This can be a source of confusion if you're used to anonymous inner class behavior.
    </div>
    </pre>
</div>
`;

export default function JavaLambdaPage() {
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
    // Changed 'p' to 'div' to allow <pre> as a child
    p: ({ ...props }) => <div className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed" {...props} />,
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
          prevLesson="java-threads"
          nextLesson="java-advanced-sorting"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
