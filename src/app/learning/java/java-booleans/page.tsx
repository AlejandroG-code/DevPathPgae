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
# Java Booleans

Booleans are a fundamental data type in Java, used to represent truth values. A 'boolean' variable can hold only two possible values: 'true' or 'false'. They are crucial for controlling program flow, especially in conditional statements and loops.

## Boolean Values

In Java, 'boolean' is a primitive data type.

\`\`\`java
public class JavaBooleans {
  public static void main(String[] args) {
    boolean isJavaFun = true;
    boolean isFishTasty = false;
    System.out.println(isJavaFun);    // Outputs true
    System.out.println(isFishTasty);  // Outputs false
  }
}
\`\`\`

## Boolean Expressions

A Boolean expression is a Java expression that returns a 'boolean' value: 'true' or 'false'. This is achieved by using comparison operators.

You will learn more about comparison operators in the 'Java Operators' lesson, but here are a few examples:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Result (if x=10, y=9)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">==</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Equal to</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>x == y</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">false</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">!=</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Not equal</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>x != y</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">true</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">></code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Greater than</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>x > y</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">true</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal"><</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less than</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>x < y</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">false</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal">>=</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Greater than or equal to</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>x >= y</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">true</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code class="text-vibrant-teal"><=</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less than or equal to</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><code>x <= y</code></td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">false</td>
    </tr>
  </tbody>
</table>

**Example:**

\`\`\`java
public class BooleanExpressions {
  public static void main(String[] args) {
    int x = 10;
    int y = 9;
    System.out.println(x > y); // Returns true, because 10 is greater than 9
  }
}
\`\`\`

You can also compare values directly:

\`\`\`java
public class DirectBooleanComparison {
  public static void main(String[] args) {
    System.out.println(10 > 9);  // Returns true
    System.out.println(10 == 10); // Returns true
    System.out.println(10 < 9);  // Returns false
  }
}
\`\`\`

## Booleans in Conditional Statements

Boolean expressions are most commonly used in conditional statements (like 'if-else') to determine which block of code should be executed.

\`\`\`java
public class BooleanIfElse {
  public static void main(String[] args) {
    int age = 20;

    if (age >= 18) {
      System.out.println("You are an adult.");
    } else {
      System.out.println("You are a minor.");
    }
    // Output: You are an adult.

    int temperature = 25;
    if (temperature > 30) {
      System.out.println("It's a hot day!");
    } else {
      System.out.println("It's not too hot today.");
    }
    // Output: It's not too hot today.
  }
}
\`\`\`

## Why are Booleans Important?

-   **Decision Making:** Booleans are the foundation for any decision-making logic in your programs.
-   **Control Flow:** They control the flow of execution in 'if', 'else if', 'else', 'switch', 'for', 'while' statements.
-   **Validation:** Used to check conditions, validate input, and ensure program correctness.
-   **Flags:** Often used as 'flags' to indicate a certain state (e.g., 'isLoggedIn', 'hasPermission').

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Boolean Naming Conventions</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        It's a common practice to name boolean variables with prefixes like 'is', 'has', or 'can' (e.g., 'isActive', 'hasPermission', 'canDrive'). This makes their purpose immediately clear when reading the code.
    </div>
</div>
`;

export default function JavaBooleansPage() {
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
  }, []);

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
          prevLesson="java-strings"
          nextLesson="java-if-else"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
