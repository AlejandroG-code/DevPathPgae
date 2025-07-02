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
# Java Output

In Java, the primary way to display output to the console is using the 'System.out' object, which provides various methods for printing text and values.

## The 'System.out.println()' Method

The 'println()' method prints a string or value to the console and then inserts a new line at the end of the output. This means that subsequent output will appear on the next line.

\`\`\`java
public class JavaOutput {
  public static void main(String[] args) {
    System.out.println("Hello World!");
    System.out.println("I am learning Java.");
    System.out.println("It is awesome!");
  }
}
\`\`\`

**Output:**
\`\`\`
Hello World!
I am learning Java.
It is awesome!
\`\`\`

You can also print numbers or the result of calculations:

\`\`\`java
public class JavaOutputNumbers {
  public static void main(String[] args) {
    System.out.println(123);
    System.out.println(10 + 5);
    System.out.println(5 * 20);
  }
}
\`\`\`

**Output:**
\`\`\`
123
15
100
\`\`\`

## The 'System.out.print()' Method

The 'print()' method is similar to 'println()', but it does **not** add a new line at the end of the output. This means that subsequent output will appear on the same line.

\`\`\`java
public class JavaOutputPrint {
  public static void main(String[] args) {
    System.out.print("Hello World! ");
    System.out.print("I will print on the same line.");
  }
}
\`\`\`

**Output:**
\`\`\`
Hello World! I will print on the same line.
\`\`\`

You can combine 'print()' and 'println()' to control line breaks:

\`\`\`java
public class JavaOutputCombined {
  public static void main(String[] args) {
    System.out.print("This is the first part. ");
    System.out.println("This is the second part, and then a new line.");
    System.out.print("This is on a new line now.");
  }
}
\`\`\`

**Output:**
\`\`\`
This is the first part. This is the second part, and then a new line.
This is on a new line now.
\`\`\`

## The 'System.out.printf()' Method (Formatted Output)

The 'printf()' method allows for formatted output, similar to the 'printf' function in C/C++. It uses format specifiers to control how different data types are displayed.

\`\`\`java
public class JavaOutputPrintf {
  public static void main(String[] args) {
    String name = "Alice";
    int age = 30;
    double price = 19.99;

    System.out.printf("Name: %s, Age: %d%n", name, age);
    System.out.printf("Product price: $%.2f%n", price);
    System.out.printf("Boolean value: %b%n", true);
  }
}
\`\`\`

**Output:**
\`\`\`
Name: Alice, Age: 30
Product price: $19.99
Boolean value: true
\`\`\`

### Common Format Specifiers:

-   '%s': String
-   '%d': Decimal integer
-   '%f': Floating-point number (decimal)
-   '%b': Boolean
-   '%c': Character
-   '%n': Newline character (platform-independent)

You can also specify width, precision, and alignment. For example, '%.2f' formats a float to two decimal places.

## Printing Variables

You can print the value of variables directly using 'println()' or 'print()'. When you combine text with variables, you use the '+' operator for concatenation.

\`\`\`java
public class JavaOutputVariables {
  public static void main(String[] args) {
    String greeting = "Hello";
    String name = "Bob";
    int year = 2024;

    System.out.println(greeting + " " + name + "!"); // Concatenating strings
    System.out.println("Current year: " + year); // Concatenating string with integer
    System.out.println("Sum: " + (10 + 20)); // Parentheses ensure addition before concatenation
  }
}
\`\`\`

**Output:**
\`\`\`
Hello Bob!
Current year: 2024
Sum: 30
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Choose the Right Method</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use 'println()' for simple output where each statement should appear on a new line. Use 'print()' when you want output to remain on the same line. For more complex and precise formatting, especially with numbers, 'printf()' is the most powerful option.
    </div>
</div>
`;

export default function JavaOutputPage() {
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
          prevLesson="java-syntax"
          nextLesson="java-comments"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
