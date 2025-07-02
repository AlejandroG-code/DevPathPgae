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
# Java Syntax

Java syntax refers to the set of rules that define how Java programs are constructed. Understanding these rules is crucial for writing valid and executable Java code.

## Basic Structure of a Java Program

Every Java program must have at least one class, and that class should contain the 'main' method, which is the entry point for the program.

\`\`\`java
public class MyClass { // Class declaration
  public static void main(String[] args) { // Main method
    System.out.println("Hello World"); // Statement
  } // End of main method
} // End of class
\`\`\`

### Explanation of Components:

-   'public class MyClass':
    -   'public': An **access modifier** that specifies the visibility of the class. 'public' means it can be accessed from any other class.
    -   'class': A keyword used to declare a class.
    -   'MyClass': The name of the class. By convention, class names start with an uppercase letter. The class name should match the filename (e.g., 'MyClass.java').

-   'public static void main(String[] args)':
    -   This is the **main method**, where the Java Virtual Machine (JVM) starts executing your program.
    -   'public': Access modifier.
    -   'static': Means the method belongs to the 'MyClass' class itself, rather than to an instance (object) of 'MyClass'. You can call 'main' without creating an object of 'MyClass'.
    -   'void': Indicates that the method does not return any value.
    -   'main': The name of the method. This specific name is required for the entry point.
    -   'String[] args': This is an array of 'String' objects to hold command-line arguments.

-   'System.out.println("Hello World");':
    -   This is a **statement** that prints text to the console.
    -   'System': A built-in Java class that contains useful members for system operations.
    -   'out': A static member of 'System' that is an instance of 'PrintStream', representing the standard output stream.
    -   'println()': A method of 'PrintStream' that prints the given argument to the console and then moves the cursor to the next line.

## Curly Braces '{}'

Curly braces are used to define blocks of code.
-   The class body is enclosed in curly braces.
-   The method body is enclosed in curly braces.

## Semicolons ';'

Every statement in Java must end with a semicolon. This tells the compiler that the statement has ended.

\`\`\`java
int x = 10; // Statement 1
System.out.println(x); // Statement 2
\`\`\`

## Comments '//' and '/* ... */'

Comments are used to explain code and are ignored by the compiler.
-   Single-line comments start with '//'.
-   Multi-line comments start with '/*' and end with '*/'.

\`\`\`java
// This is a single-line comment

/*
This is a multi-line comment.
It can span across several lines.
*/
\`\`\`

## Case Sensitivity

Java is **case-sensitive**. This means:
-   'MyClass' is different from 'myclass'.
-   'myVariable' is different from 'myvariable'.
-   Keywords like 'class', 'public', 'static', 'void', 'int' must be written in lowercase.

\`\`\`java
// This will work
int myNumber = 5;

// This will cause a compile-time error because 'MyNumber' is not declared
// System.out.println(MyNumber);
\`\`\`

## Keywords

Java has a set of reserved words (keywords) that have special meanings and cannot be used as identifiers (like variable names, class names, or method names).
Examples: 'public', 'class', 'static', 'void', 'int', 'if', 'else', 'for', 'while', 'new', 'this', 'super', 'return', etc.

## Whitespace

Java ignores whitespace (spaces, tabs, newlines) outside of string literals. You can use whitespace to make your code more readable, but it doesn't affect the program's execution.

\`\`\`java
// All these are valid and equivalent
int number = 10;
int    anotherNumber    =    20   ;
System.out.println(number + anotherNumber);
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Code Readability</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While Java syntax can be strict, good formatting, consistent naming conventions (camelCase for variables/methods, PascalCase for classes), and meaningful comments are crucial for writing readable and maintainable code. IDEs often help with automatic formatting.
    </div>
</div>
`;

export default function JavaSyntaxPage() {
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
          prevLesson="java-get-started"
          nextLesson="java-output"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
