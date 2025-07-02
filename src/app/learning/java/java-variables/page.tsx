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
# Java Variables

Variables are containers for storing data values. In Java, every variable must be declared with a data type before it can be used.

## Declaring Variables

To declare a variable, you must specify its data type and then its name.

\`\`\`java
dataType variableName;
\`\`\`

**Example:**
\`\`\`java
String name; // Declares a variable named 'name' of type String
int age;     // Declares a variable named 'age' of type int
\`\`\`

## Assigning Values to Variables

You can assign a value to a variable using the assignment operator ('=').

\`\`\`java
// Declare and assign
String name = "John Doe";
int age = 30;
float price = 19.99f; // 'f' suffix for float literal
char initial = 'J';
boolean isActive = true;

// Declare first, then assign
String city;
city = "New York";
\`\`\`

## Rules for Naming Variables

-   Variable names must start with a letter, '$' (dollar sign), or '_' (underscore).
-   Variable names can contain letters, digits, underscores, and dollar signs.
-   Variable names are case-sensitive ('myVar' is different from 'myvar').
-   Reserved words (keywords like 'int', 'public', 'class') cannot be used as variable names.
-   By convention, Java variable names should start with a lowercase letter and use camelCase for multiple words (e.g., 'firstName', 'totalAmount').

\`\`\`java
// Valid variable names
int myAge = 25;
String userName = "Alice";
double _salary = 50000.0;
boolean $isValid = true;

// Invalid variable names (would cause compile errors)
// int 1stNumber = 10; // Starts with a digit
// String public = "Text"; // Reserved keyword
// float my-float = 1.0f; // Contains a hyphen
\`\`\`

## Displaying Variables

You can display the value of variables using 'System.out.println()' or 'System.out.print()'.

\`\`\`java
public class DisplayVariables {
  public static void main(String[] args) {
    String firstName = "John";
    String lastName = "Doe";
    int birthYear = 1990;

    System.out.println(firstName); // Prints "John"
    System.out.println(lastName);  // Prints "Doe"

    // Concatenating strings and variables
    System.out.println("Full Name: " + firstName + " " + lastName);
    System.out.println("Born in: " + birthYear);

    // Combining text and numbers
    String text = "Age: ";
    int age = 34;
    System.out.println(text + age); // Output: Age: 34
  }
}
\`\`\`

## Declaring Multiple Variables

To declare more than one variable of the same type, you can use a comma-separated list.

\`\`\`java
int x = 5, y = 10, z = 15;
System.out.println(x + y + z); // Output: 30

String car1 = "Volvo", car2 = "BMW", car3 = "Ford";
System.out.println(car1 + ", " + car2 + ", " + car3);
\`\`\`

## Final Variables (Constants)

If you want a variable to store a fixed value that cannot be changed, use the 'final' keyword. This is similar to declaring a constant. By convention, final variables are often named in all uppercase letters.

\`\`\`java
public class FinalVariables {
  public static void main(String[] args) {
    final int MY_NUMBER = 100;
    // MY_NUMBER = 50; // This would cause a compile-time error: cannot assign a value to a final variable

    System.out.println(MY_NUMBER); // Output: 100
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Initialize Variables</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        It's good practice to initialize variables when you declare them. If you don't initialize a local variable, the compiler will give you an error if you try to use it before assigning a value. Class-level variables (fields) get default values if not explicitly initialized.
    </div>
</div>
`;

export default function JavaVariablesPage() {
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
          prevLesson="java-comments"
          nextLesson="java-data-types"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
