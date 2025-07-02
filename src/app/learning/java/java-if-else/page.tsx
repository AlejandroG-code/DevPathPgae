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
# Java Conditional Statements: 'if...else' and 'if...else if...else'

Conditional statements are used to perform different actions based on different conditions. In Java, the most common conditional statements are 'if', 'else', and 'else if'.

## The 'if' Statement

The 'if' statement executes a block of code if a specified condition is 'true'.

**Syntax:**

\`\`\`java
if (condition) {
  // Code to be executed if the condition is true
}
\`\`\`

**Example:**

\`\`\`java
public class IfStatement {
  public static void main(String[] args) {
    int time = 20;
    if (time < 22) {
      System.out.println("Good day!"); // This will be executed
    }
    // Output: Good day!
  }
}
\`\`\`

## The 'else' Statement

The 'else' statement is used to execute a block of code if the same condition in the 'if' statement is 'false'.

**Syntax:**

\`\`\`java
if (condition) {
  // Code to be executed if the condition is true
} else {
  // Code to be executed if the condition is false
}
\`\`\`

**Example:**

\`\`\`java
public class IfElseStatement {
  public static void main(String[] args) {
    int time = 20;
    if (time < 18) {
      System.out.println("Good day.");
    } else {
      System.out.println("Good evening."); // This will be executed
    }
    // Output: Good evening.
  }
}
\`\`\`

## The 'else if' Statement

The 'else if' statement is used to specify a new condition if the first condition is 'false'. You can chain multiple 'else if' statements.

**Syntax:**

\`\`\`java
if (condition1) {
  // Code to be executed if condition1 is true
} else if (condition2) {
  // Code to be executed if condition1 is false and condition2 is true
} else {
  // Code to be executed if condition1 is false and condition2 is false
}
\`\`\`

**Example:**

\`\`\`java
public class ElseIfStatement {
  public static void main(String[] args) {
    int time = 22;
    if (time < 10) {
      System.out.println("Good morning.");
    } else if (time < 20) {
      System.out.println("Good day.");
    } else {
      System.out.println("Good evening."); // This will be executed
    }
    // Output: Good evening.
  }
}
\`\`\`

## Short Hand If...Else (Ternary Operator)

There is also a short-hand 'if else', which is known as the ternary operator. It's a concise way to write a simple 'if-else' statement.

**Syntax:**
'variable = (condition) ? expressionTrue : expressionFalse;'

**Example:**

\`\`\`java
public class TernaryOperatorExample {
  public static void main(String[] args) {
    int time = 20;
    String result = (time < 18) ? "Good day." : "Good evening.";
    System.out.println(result); // Output: Good evening.
  }
}
\`\`\`

## Nested 'if' Statements

You can also place 'if' or 'if-else' statements inside other 'if' or 'else' blocks. This is called nesting.

\`\`\`java
public class NestedIf {
  public static void main(String[] args) {
    int age = 25;
    boolean hasLicense = true;

    if (age >= 18) {
      System.out.println("You are old enough to drive.");
      if (hasLicense) {
        System.out.println("You also have a license!");
      } else {
        System.out.println("But you don't have a license yet.");
      }
    } else {
      System.out.println("You are not old enough to drive.");
    }
    // Output:
    // You are old enough to drive.
    // You also have a license!
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Readability with Braces</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Even for single-line 'if' or 'else' blocks, it's good practice to always use curly braces '{}'. This improves readability and prevents potential bugs if you later add more statements to the block.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Dangling Else Problem</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Without proper bracing, nested 'if-else' statements can lead to the "dangling else" problem, where an 'else' clause might associate with an unintended 'if' statement. Always use curly braces to explicitly define code blocks.
    </div>
</div>
`;

export default function JavaIfElsePage() {
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
          prevLesson="java-booleans"
          nextLesson="java-switch"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
