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
# Java Debugging

Debugging is the process of finding and fixing errors or bugs in your code. While syntax errors are caught by the compiler, logical errors and runtime errors (exceptions) can be much harder to pinpoint. Debugging tools and techniques help you understand what your program is doing step-by-step, inspect variable values, and identify the root cause of issues.

## Why Debug?

-   **Identify Logic Errors:** Find mistakes in your program's logic that don't cause compile-time errors but lead to incorrect output or behavior.
-   **Understand Program Flow:** See the exact path of execution your program takes.
-   **Inspect State:** View the values of variables at any point during execution.
-   **Diagnose Exceptions:** Pinpoint where and why an exception is being thrown.

## Common Debugging Tools and Techniques

### 1. 'System.out.println()' (Print Statements)

This is the simplest and most common debugging technique. You insert print statements at various points in your code to display messages or variable values, helping you trace the program's execution and state.

**Pros:** Easy to use, no special tools needed.
**Cons:** Can clutter code, requires recompilation for changes, not ideal for complex issues.

**Example:**

\`\`\`java
public class PrintDebugging {
  public static void main(String[] args) {
    int a = 10;
    int b = 5;
    System.out.println("Before calculation: a=" + a + ", b=" + b); // Debug print

    int sum = a + b;
    System.out.println("Sum calculated: " + sum); // Debug print

    int product = a * b;
    System.out.println("Product calculated: " + product); // Debug print

    // Imagine a bug here, e.g., product should be sum * a
    // int product = sum * a;

    System.out.println("Final product: " + product);
  }
}
\`\`\`

### 2. Using an IDE Debugger (Recommended)

Modern Integrated Development Environments (IDEs) like IntelliJ IDEA, Eclipse, and VS Code provide powerful built-in debuggers. This is the most effective way to debug Java applications.

**Key Debugger Features:**

-   **Breakpoints:** A breakpoint is a marker you set in your code where you want the program execution to pause.
-   **Step Over:** Executes the current line of code and moves to the next line. If the current line contains a method call, it executes the method entirely without stepping into it.
-   **Step Into:** Executes the current line. If the current line contains a method call, it steps *into* that method, allowing you to trace its execution.
-   **Step Out:** If you've stepped into a method, 'Step Out' executes the rest of the current method and returns to the calling method.
-   **Resume Program:** Continues program execution until the next breakpoint or until the program finishes.
-   **Variables/Watch Window:** Displays the current values of variables in the current scope. You can often add "watches" to specific variables to monitor their values.
-   **Call Stack:** Shows the sequence of method calls that led to the current point of execution.
-   **Conditional Breakpoints:** Breakpoints that only pause execution if a certain condition is met (e.g., 'i == 5').
-   **Exception Breakpoints:** Breakpoints that pause execution when a specific exception is thrown.

### How to Use a Debugger (General Steps):

1.  **Set Breakpoints:** Click in the left margin next to the line numbers in your IDE to set a breakpoint.
2.  **Start Debugging:** Run your application in debug mode (usually a "bug" icon or "Debug" option).
3.  **Navigate Code:** Use 'Step Over', 'Step Into', 'Step Out' to move through your code line by line.
4.  **Inspect Variables:** Observe the 'Variables' or 'Watch' window to see how variable values change.
5.  **Examine Call Stack:** Use the 'Call Stack' window to understand the sequence of method calls.
6.  **Evaluate Expressions:** Most debuggers allow you to evaluate arbitrary expressions at a breakpoint to test assumptions.

**Example Scenario for Debugging:**

Imagine you have a method that calculates a discount, but the result is sometimes incorrect.

\`\`\`java
public class DiscountCalculator {

  public double calculateDiscountedPrice(double originalPrice, int discountPercentage) {
    if (discountPercentage < 0 || discountPercentage > 100) {
      System.err.println("Invalid discount percentage."); // A simple print for error
      return originalPrice; // Or throw an exception
    }

    double discountAmount = originalPrice * (discountPercentage / 100); // Potential bug: integer division
    // Should be: double discountAmount = originalPrice * (discountPercentage / 100.0);

    double finalPrice = originalPrice - discountAmount;
    return finalPrice;
  }

  public static void main(String[] args) {
    DiscountCalculator calculator = new DiscountCalculator();
    double price1 = 100.0;
    int discount1 = 10; // Expect 90.0
    double finalPrice1 = calculator.calculateDiscountedPrice(price1, discount1);
    System.out.println("Price 1: $" + price1 + ", Discount: " + discount1 + "%, Final: $" + finalPrice1);
    // Output will be: Price 1: $100.0, Discount: 10%, Final: $100.0 (Incorrect!)

    double price2 = 200.0;
    int discount2 = 25; // Expect 150.0
    double finalPrice2 = calculator.calculateDiscountedPrice(price2, discount2);
    System.out.println("Price 2: $" + price2 + ", Discount: " + discount2 + "%, Final: $" + finalPrice2);
    // Output will be: Price 2: $200.0, Discount: 25%, Final: $200.0 (Incorrect!)
  }
}
\`\`\`

**Debugging Steps for the above example:**

1.  Set a breakpoint on the line: 'double discountAmount = originalPrice * (discountPercentage / 100);'
2.  Run the program in debug mode.
3.  When execution pauses at the breakpoint, observe the 'Variables' window:
    -   'originalPrice' will be '100.0'
    -   'discountPercentage' will be '10'
4.  Step Over (F8 in IntelliJ/Eclipse, F10 in VS Code).
5.  Observe the value of 'discountAmount'. It will be '0.0' because 'discountPercentage / 100' performs integer division (10 / 100 = 0).
6.  This immediately highlights the bug. You can then correct the line to 'double discountAmount = originalPrice * (discountPercentage / 100.0);' and re-run.

## Debugging Best Practices

-   **Start Simple:** When a bug occurs, try to isolate the problem to the smallest possible piece of code.
-   **Reproduce the Bug:** Ensure you can reliably reproduce the bug before attempting to fix it.
-   **Use Breakpoints Strategically:** Don't set too many breakpoints initially. Start at the beginning of the problematic section and step through.
-   **Inspect Variables:** Pay close attention to variable values, especially before and after operations.
-   **Check Assumptions:** Debugging often reveals that your assumptions about how the code works are incorrect.
-   **One Change at a Time:** If you're trying different fixes, make one change, test it, and then revert if it doesn't work.
-   **Rubber Duck Debugging:** Explain your code line by line to an inanimate object (like a rubber duck). The act of explaining often helps you spot the error yourself.
-   **Version Control:** Commit working code frequently so you can easily revert to a stable state if a debugging attempt goes wrong.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Learn Your IDE's Debugger</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Investing time in learning the debugging features of your chosen IDE will significantly boost your productivity and problem-solving skills. Watch tutorials, read documentation, and practice regularly.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Debugging is Not a Crutch</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While debugging is essential, it should not replace good coding practices. Write clear, modular code, use meaningful variable names, and implement unit tests. These practices can prevent many bugs from occurring in the first place and make the debugging process much easier when they do.
    </div>
</div>
`;

export default function JavaDebuggingPage() {
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
          prevLesson="java-errors"
          nextLesson="java-exceptions"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
