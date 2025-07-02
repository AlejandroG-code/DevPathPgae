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
# Java Exceptions

In Java, an **exception** is an event that disrupts the normal flow of a program. It is an object that is thrown at runtime when an error occurs. Exception handling is a powerful mechanism to manage these runtime errors gracefully, preventing your program from crashing and allowing it to continue execution.

## What is an Exception?

An exception is an abnormal event that occurs during the execution of a program. When an exception occurs, the program's normal flow is interrupted.

### Why Handle Exceptions?

-   **Prevent Program Termination:** Without exception handling, a program might terminate unexpectedly when an error occurs.
-   **Maintain Normal Flow:** Allows the program to recover from errors and continue its execution.
-   **Separate Error Handling Code:** Separates the normal code from the error-handling code, making the program more readable and maintainable.

## Exception Hierarchy

All exceptions in Java are objects that are direct or indirect subclasses of the 'java.lang.Throwable' class. 'Throwable' has two main subclasses:

1.  **'Error'**: Represents serious problems that a reasonable application should not try to catch. These are typically external to the application and indicate unrecoverable conditions (e.g., 'OutOfMemoryError', 'StackOverflowError').
2.  **'Exception'**: Represents conditions that an application might want to catch.

The 'Exception' class is further divided into:

-   **Checked Exceptions:**
    -   Exceptions that are checked at compile-time.
    -   The compiler forces you to handle these exceptions (either by catching them or declaring them using 'throws').
    -   Examples: 'IOException', 'SQLException', 'FileNotFoundException'.
-   **Unchecked Exceptions (Runtime Exceptions):**
    -   Exceptions that are not checked at compile-time.
    -   The compiler does not force you to handle them. They typically occur due to programming errors.
    -   Examples: 'NullPointerException', 'ArithmeticException', 'ArrayIndexOutOfBoundsException'.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Checked at</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Must Handle?</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Examples</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Checked Exception</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Compile-time</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Yes (compiler enforces)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'IOException', 'SQLException'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Unchecked Exception (RuntimeException)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Runtime</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No (optional)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'NullPointerException', 'ArithmeticException'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Error</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Runtime</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No (should not catch)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'OutOfMemoryError', 'StackOverflowError'</td>
        </tr>
    </tbody>
</table>

---

## The 'try-catch' Block

The 'try-catch' block is used to handle exceptions.
-   The 'try' block contains the code that might throw an exception.
-   The 'catch' block contains the code that handles the exception if it occurs.

**Syntax:**

\`\`\`java
try {
  // Code that might throw an exception
} catch (ExceptionType e) {
  // Code to handle the exception
}
\`\`\`

**Example:**

\`\`\`java
public class TryCatchExample {
  public static void main(String[] args) {
    try {
      int result = 10 / 0; // This will throw an ArithmeticException
      System.out.println("Result: " + result); // This line will not be executed
    } catch (ArithmeticException e) {
      // Catch block handles the ArithmeticException
      System.out.println("Error: Cannot divide by zero.");
      System.out.println("Exception message: " + e.getMessage());
      e.printStackTrace(); // Prints the stack trace for debugging
    }

    System.out.println("Program continues after exception handling.");
    // Output:
    // Error: Cannot divide by zero.
    // Exception message: / by zero
    // (Stack trace will also be printed here)
    // Program continues after exception handling.
  }
}
\`\`\`

### Multiple Catch Blocks

You can have multiple 'catch' blocks to handle different types of exceptions. The 'catch' blocks are evaluated from top to bottom. It's important to place more specific exception types before more general ones.

\`\`\`java
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class MultipleCatchExample {
  public static void main(String[] args) {
    try {
      String data = null;
      System.out.println(data.length()); // May throw NullPointerException

      FileReader file = new FileReader("nonexistent.txt"); // May throw FileNotFoundException
      file.read(); // May throw IOException
    } catch (FileNotFoundException e) {
      System.out.println("Error: The specified file was not found.");
    } catch (IOException e) {
      System.out.println("Error: An I/O error occurred.");
    } catch (NullPointerException e) {
      System.out.println("Error: Attempted to access a null object.");
    } catch (Exception e) { // Generic catch-all, should be last
      System.out.println("An unexpected error occurred: " + e.getMessage());
    }
    System.out.println("Program continues.");
  }
}
\`\`\`

---

## The 'finally' Block

The 'finally' block is an optional block that is always executed, regardless of whether an exception occurred in the 'try' block or not. It's commonly used for cleanup operations, such as closing files, database connections, or releasing resources.

**Syntax:**

\`\`\`java
try {
  // Code that might throw an exception
} catch (ExceptionType e) {
  // Code to handle the exception
} finally {
  // Code that always executes
}
\`\`\`

**Example:**

\`\`\`java
import java.io.FileWriter;
import java.io.IOException;

public class FinallyBlockExample {
  public static void main(String[] args) {
    FileWriter writer = null;
    try {
      writer = new FileWriter("output.txt");
      writer.write("Hello, World!");
      int result = 10 / 0; // This will cause an exception
      System.out.println("This line won't execute.");
    } catch (IOException e) {
      System.out.println("An I/O error occurred: " + e.getMessage());
    } catch (ArithmeticException e) {
      System.out.println("Arithmetic error: " + e.getMessage());
    } finally {
      // This block always executes, useful for cleanup
      System.out.println("Finally block executed.");
      if (writer != null) {
        try {
          writer.close(); // Ensure the writer is closed
          System.out.println("Writer closed.");
        } catch (IOException e) {
          System.out.println("Error closing writer: " + e.getMessage());
        }
      }
    }
    System.out.println("End of program.");
    // Output:
    // Arithmetic error: / by zero
    // Finally block executed.
    // Writer closed.
    // End of program.
  }
}
\`\`\`

---

## The 'throw' Keyword

The 'throw' keyword is used to explicitly throw an exception from a method or any block of code. You create an instance of an exception class and then 'throw' it.

**Syntax:**

\`\`\`java
throw new ExceptionClassName("Error message");
\`\`\`

**Example:**

\`\`\`java
public class ThrowKeywordExample {
  public static void validateAge(int age) {
    if (age < 18) {
      // Throw an ArithmeticException if age is less than 18
      throw new ArithmeticException("Age is not valid for voting.");
    } else {
      System.out.println("Welcome to vote!");
    }
  }

  public static void main(String[] args) {
    try {
      validateAge(15); // This will throw an exception
    } catch (ArithmeticException e) {
      System.out.println("Caught an exception: " + e.getMessage());
      // Output: Caught an exception: Age is not valid for voting.
    }
    validateAge(20); // This will execute normally
    // Output: Welcome to vote!
  }
}
\`\`\`

---

## The 'throws' Keyword

The 'throws' keyword is used in a method signature to declare that a method might throw one or more checked exceptions. This tells the calling code that it must handle these potential exceptions.

**Syntax:**

\`\`\`java
public void methodName() throws ExceptionType1, ExceptionType2 {
  // Method body
}
\`\`\`

**Example:**

\`\`\`java
import java.io.IOException;
import java.io.FileReader;

public class ThrowsKeywordExample {

  // Declares that this method might throw an IOException
  public static void readFile(String fileName) throws IOException {
    FileReader reader = new FileReader(fileName);
    System.out.println("File '" + fileName + "' opened successfully.");
    // Simulate reading
    reader.read(); 
    reader.close();
    System.out.println("File '" + fileName + "' closed.");
  }

  public static void main(String[] args) {
    try {
      readFile("mydata.txt"); // This call must be in a try-catch or main must declare throws
    } catch (IOException e) {
      System.out.println("Error reading file: " + e.getMessage());
      // Output: Error reading file: mydata.txt (The system cannot find the file specified)
    }

    try {
      readFile("existing_file.txt"); // Assuming this file exists
    } catch (IOException e) {
      System.out.println("Error reading existing file: " + e.getMessage());
    }
  }
}
\`\`\`

---

## Custom Exceptions

You can create your own custom exception classes by extending the 'Exception' class (for checked exceptions) or 'RuntimeException' class (for unchecked exceptions). This allows you to define specific error types for your application's logic.

**Example:**

\`\`\`java
// Custom Checked Exception
class InsufficientFundsException extends Exception {
  public InsufficientFundsException(String message) {
    super(message);
  }
}

class BankAccount {
  private double balance;

  public BankAccount(double initialBalance) {
    this.balance = initialBalance;
  }

  public void withdraw(double amount) throws InsufficientFundsException {
    if (amount > balance) {
      throw new InsufficientFundsException("Withdrawal amount of $" + amount + 
                                           " exceeds current balance of $" + balance);
    }
    balance -= amount;
    System.out.println("Successfully withdrew $" + amount + ". New balance: $" + balance);
  }

  public double getBalance() {
    return balance;
  }
}

public class CustomExceptionExample {
  public static void main(String[] args) {
    BankAccount account = new BankAccount(500.0);

    try {
      account.withdraw(200.0); // Successful withdrawal
      account.withdraw(400.0); // Throws InsufficientFundsException
    } catch (InsufficientFundsException e) {
      System.out.println("Transaction failed: " + e.getMessage());
    }
    System.out.println("Final balance: $" + account.getBalance());
    // Output:
    // Successfully withdrew $200.0. New balance: $300.0
    // Transaction failed: Withdrawal amount of $400.0 exceeds current balance of $300.0
    // Final balance: $300.0
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use Specific Exceptions</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always catch the most specific exception type possible. Catching a general 'Exception' can hide other, unrelated issues. Multiple catch blocks (or a multi-catch block in Java 7+) allow you to handle different exception types with specific logic.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Don't Suppress Exceptions</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        A common anti-pattern is to catch an exception and then do nothing with it (an empty catch block). This 'swallows' the exception, making it very difficult to diagnose problems in your application. Always log the exception, display a user-friendly message, or take appropriate recovery action.
    </div>
</div>
`;

export default function JavaExceptionsPage() {
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
          prevLesson="java-debugging"
          nextLesson="java-files" // Next lesson in Part 6
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
