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
# Java Introduction

Java is a popular, high-level, object-oriented programming language developed by James Gosling at Sun Microsystems (now owned by Oracle). It was officially released in 1995.

## What is Java?

-   **Platform Independent:** One of Java's main selling points is "Write Once, Run Anywhere" (WORA). This means compiled Java code (bytecode) can run on any device that has a Java Virtual Machine (JVM), regardless of the underlying operating system.
-   **Object-Oriented:** Java is built around the concept of objects, which are instances of classes. This paradigm promotes modularity, reusability, and easier maintenance of code.
-   **Simple:** Java was designed to be easy to learn and use, especially for programmers familiar with C/C++.
-   **Secure:** Java has built-in security features, making it suitable for developing secure applications.
-   **Robust:** Java has strong memory management (garbage collection) and exception handling, which helps in building reliable applications.
-   **Multithreaded:** Java supports multithreading, allowing multiple parts of a program to execute concurrently, improving performance.

## Where is Java Used?

Java's versatility has led to its widespread adoption across various domains:

-   **Android App Development:** The primary language for native Android application development.
-   **Web Applications:** Used extensively for server-side development (backend) with frameworks like Spring, Hibernate, and Jakarta EE.
-   **Enterprise Applications:** Powering large-scale business applications, often in finance, healthcare, and e-commerce.
-   **Desktop Applications:** While less common now, Java can be used for desktop applications with frameworks like Swing and JavaFX.
-   **Big Data:** Technologies like Hadoop and Apache Spark, used for processing large datasets, are written in Java.
-   **Scientific Applications:** Used for scientific research, including natural language processing.
-   **Games:** While not as dominant as C++ for high-performance games, Java is used for game development, especially for mobile and indie games.

## Java Development Kit (JDK)

To write and run Java programs, you need the Java Development Kit (JDK). The JDK includes:
-   **JRE (Java Runtime Environment):** Contains the JVM and core libraries needed to run Java applications.
-   **Development Tools:** Includes the Java compiler (javac), debugger, and other utilities.

When you install Java, you typically install the JDK.

## Your First Java Program

Let's look at a simple "Hello World" program in Java:

\`\`\`java
public class MyFirstProgram {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}
\`\`\`

### Explanation of the Code:

-   'public class MyFirstProgram': Every Java program must have at least one class. The class name should match the filename (e.g., 'MyFirstProgram.java'). 'public' is an access modifier, meaning the class is accessible from anywhere.
-   'public static void main(String[] args)': This is the **main method**, the entry point for any Java application.
    -   'public': Access modifier.
    -   'static': Means the method belongs to the class, not an object of the class.
    -   'void': Indicates that the method does not return any value.
    -   'main': The name of the method. This specific name is required for the entry point.
    -   'String[] args': An array of 'String' objects to hold command-line arguments.
-   'System.out.println("Hello, World!");': This line prints the string "Hello, World!" to the console.
    -   'System': A built-in Java class that contains useful members.
    -   'out': A static member of the 'System' class, which is an instance of 'PrintStream'.
    -   'println()': A method of the 'PrintStream' class that prints a string to the console and then moves the cursor to the next line.

## How to Run a Java Program

1.  **Save:** Save the code in a file named 'MyFirstProgram.java'.
2.  **Compile:** Open a terminal or command prompt, navigate to the directory where you saved the file, and compile it using the Java compiler:
    \`\`\`bash
    javac MyFirstProgram.java
    \`\`\`
    This will create a 'MyFirstProgram.class' file (bytecode).
3.  **Run:** Execute the compiled code using the Java Virtual Machine:
    \`\`\`bash
    java MyFirstProgram
    \`\`\`
    You should see "Hello, World!" printed to your console.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: IDEs for Java</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While understanding the manual compile/run process is good, for real-world Java development, you'll almost always use an IDE (Integrated Development Environment). IDEs like IntelliJ IDEA, Eclipse, or Apache NetBeans automate compilation, provide code completion, debugging tools, and much more, significantly boosting productivity.
    </div>
</div>
`;

export default function JavaIntroPage() {
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
          prevLesson="java-home"
          nextLesson="java-get-started"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
