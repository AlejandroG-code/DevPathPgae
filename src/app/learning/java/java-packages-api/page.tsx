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
# Java Packages and API

Java's extensive ecosystem is built upon the concepts of **packages** and the **Java API (Application Programming Interface)**. These concepts are crucial for organizing code, preventing naming conflicts, and leveraging the vast functionality provided by the Java platform and third-party libraries.

## Java Packages

A **package** in Java is a mechanism to organize classes, interfaces, and sub-packages. It's similar to folders in a file system.

### Why use Packages?

-   **Organization:** Helps to categorize and group related classes and interfaces.
-   **Naming Collisions:** Prevents naming conflicts between classes with the same name (e.g., two different companies might have a 'Date' class).
-   **Access Control:** Packages influence access control (the 'default' and 'protected' access modifiers are package-level).

### Declaring a Package

To declare a package, you use the 'package' keyword as the very first statement in a Java source file (before any 'import' statements or class declarations).

\`\`\`java
// File: com/example/myapp/MyClass.java
package com.example.myapp; // Package declaration

public class MyClass {
  public void displayMessage() {
    System.out.println("Hello from MyClass in com.example.myapp!");
  }
}
\`\`\`

### Using Classes from Other Packages

To use a class from another package, you have two main options:

1.  **Fully Qualified Name:** Use the full package path along with the class name.
    \`\`\`java
    // File: com/example/anotherapp/Main.java
    package com.example.anotherapp;

    public class Main {
      public static void main(String[] args) {
        // Using fully qualified name
        com.example.myapp.MyClass obj = new com.example.myapp.MyClass();
        obj.displayMessage();
      }
    }
    \`\`\`

2.  **'import' Statement:** Use the 'import' keyword to bring classes or entire packages into your current file, making them directly accessible by their simple name. 'import' statements come after the 'package' declaration and before class declarations.

    \`\`\`java
    // File: com/example/anotherapp/Main.java
    package com.example.anotherapp;

    import com.example.myapp.MyClass; // Import a specific class
    // import com.example.myapp.*;      // Import all classes from com.example.myapp

    public class Main {
      public static void main(String[] args) {
        MyClass obj = new MyClass(); // Now can use simple name
        obj.displayMessage();
        // Output: Hello from MyClass in com.example.myapp!
      }
    }
    \`\`\`

### Built-in Java Packages

Java provides a vast collection of built-in packages (part of the Java API) that contain thousands of classes for common tasks. Some commonly used ones include:

-   'java.lang': Contains fundamental classes (e.g., 'String', 'Math', 'System'). **Automatically imported** into every Java program.
-   'java.util': Utility classes (e.g., 'ArrayList', 'HashMap', 'Scanner', 'Date').
-   'java.io': Input/Output operations (e.g., 'File', 'BufferedReader').
-   'java.net': Networking operations.
-   'java.time': Date and Time API (modern replacement for 'java.util.Date').

## Java API (Application Programming Interface)

The **Java API** is a collection of pre-written classes and interfaces that come with the Java Development Kit (JDK). It's a library of ready-to-use components that developers can incorporate into their own applications.

### Key Aspects of Java API:

-   **Standard Library:** It provides a standard way to perform common operations like string manipulation, file I/O, networking, data structures, and more.
-   **Documentation:** The Java API is extensively documented (Javadoc), making it easy for developers to understand how to use its classes and methods.
-   **Consistency:** It promotes consistent programming practices across different Java applications.

### Example: Using 'Scanner' from 'java.util'

The 'Scanner' class is used to get user input. It resides in the 'java.util' package.

\`\`\`java
import java.util.Scanner; // Import the Scanner class

public class UserInputExample {
  public static void main(String[] args) {
    Scanner myObj = new Scanner(System.in); // Create a Scanner object

    System.out.println("Enter username:");
    String userName = myObj.nextLine(); // Read user input

    System.out.println("Username is: " + userName); // Output user input

    myObj.close(); // Close the scanner to release resources
  }
}
\`\`\`

### Example: Using 'ArrayList' from 'java.util'

The 'ArrayList' class is a resizable array implementation.

\`\`\`java
import java.util.ArrayList; // Import the ArrayList class

public class ArrayListExample {
  public static void main(String[] args) {
    ArrayList<String> cars = new ArrayList<String>(); // Create an ArrayList object
    cars.add("Volvo");
    cars.add("BMW");
    cars.add("Ford");
    System.out.println(cars); // Output: [Volvo, BMW, Ford]
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Organize Your Packages</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When creating your own projects, adopt a clear package naming convention (e.g., 'com.yourcompany.yourproject.module'). This helps keep your codebase organized and avoids potential conflicts if your code is used alongside other libraries.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Over-importing with '*'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While 'import com.example.myapp.*;' is convenient for importing all classes in a package, it's generally better practice to import specific classes (e.g., 'import com.example.myapp.MyClass;'). This makes your code clearer about its dependencies and can slightly reduce compile times in very large projects.
    </div>
</div>
`;

export default function JavaPackagesApiPage() {
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
          prevLesson="java-encapsulation"
          nextLesson="java-inheritance"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
