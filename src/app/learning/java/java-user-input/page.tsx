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
# Java User Input

In Java, programs often need to interact with the user by taking input from the console. The most common way to read user input in Java is by using the 'Scanner' class, which is part of the 'java.util' package.

## The 'Scanner' Class

The 'Scanner' class is used to get user input, and it can parse primitive types (like 'int', 'double', 'boolean') and strings.

### Steps to Use 'Scanner':

1.  **Import the 'Scanner' class:** Add 'import java.util.Scanner;' at the top of your Java file.
2.  **Create a 'Scanner' object:** Use 'Scanner myObj = new Scanner(System.in);' to create an object that reads input from the standard input stream (the console).
3.  **Read input:** Use various 'next()' methods of the 'Scanner' object to read different data types.
4.  **Close the 'Scanner':** It's good practice to close the 'Scanner' object using 'myObj.close();' when you are done with it to release system resources.

### Example: Reading String Input

\`\`\`java
import java.util.Scanner; // Import the Scanner class

public class ReadStringInput {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in); // Create a Scanner object

    System.out.print("Enter your name: ");
    String userName = scanner.nextLine(); // Read user input (a whole line)

    System.out.println("Hello, " + userName + "!");

    scanner.close(); // Close the scanner
  }
}
\`\`\`

## Reading Different Data Types

The 'Scanner' class provides various methods to read different types of input:

-   'nextLine()': Reads an entire line of text (including spaces) until a newline character is encountered.
-   'next()': Reads a single word (token) until a space or newline is encountered.
-   'nextInt()': Reads an integer.
-   'nextDouble()': Reads a double (floating-point number).
-   'nextBoolean()': Reads a boolean value ('true' or 'false').

### Example: Reading Various Data Types

\`\`\`java
import java.util.Scanner;

public class ReadVariousInputs {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    System.out.print("Enter your age (integer): ");
    int age = scanner.nextInt();

    System.out.print("Enter your height (double, e.g., 5.9): ");
    double height = scanner.nextDouble();

    System.out.print("Are you a student (true/false)? ");
    boolean isStudent = scanner.nextBoolean();

    // Consume the remaining newline character after reading a number/boolean
    // This is crucial before calling nextLine() again.
    scanner.nextLine(); 

    System.out.print("Enter your favorite color (single word): ");
    String color = scanner.next();

    // Consume the remaining newline character after reading a word
    scanner.nextLine(); 

    System.out.print("Tell me something interesting (a sentence): ");
    String interestingFact = scanner.nextLine();


    System.out.println("\\n--- Your Information ---");
    System.out.println("Age: " + age);
    System.out.println("Height: " + height);
    System.out.println("Student: " + isStudent);
    System.out.println("Favorite Color: " + color);
    System.out.println("Interesting Fact: " + interestingFact);

    scanner.close();
  }
}
\`\`\`

## Handling Newline Characters (Important!)

When you use 'nextInt()', 'nextDouble()', 'nextBoolean()', or 'next()' to read input, they only read the value you entered, but they **do not consume the newline character** (the 'Enter' key press) that follows your input. If you then immediately call 'nextLine()' to read a string, it will consume that leftover newline character and appear as if it skipped your input.

**Solution:** After reading a number or a single word with methods other than 'nextLine()', always add an extra 'scanner.nextLine();' call to consume the leftover newline character before reading a full line of text.

## 'Scanner' Methods Summary

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Consumes Newline?</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'nextLine()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads the entire line of input, including spaces, until the end of the line.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Yes</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'next()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads the next token (word) from the input. Stops at whitespace.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'nextInt()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads the next integer from the input.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'nextDouble()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads the next double from the input.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'nextBoolean()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads the next boolean from the input.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'hasNextInt()', etc.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Checks if the next token is of a specific type without consuming it. Useful for input validation.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Input Validation</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always consider validating user input to prevent errors. For example, if you expect an integer, use 'scanner.hasNextInt()' before calling 'scanner.nextInt()' and provide an error message if the input is not valid.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Resource Leak</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Forgetting to close the 'Scanner' object ('scanner.close();') can lead to a resource leak, especially in long-running applications. While not critical for small programs, it's a good habit to always close resources once they are no longer needed, typically in a 'finally' block or using try-with-resources.
    </div>
</div>
`;

export default function JavaUserInputPage() {
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
          prevLesson="java-enums"
          nextLesson="java-date" // Assuming this is the next logical step
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
