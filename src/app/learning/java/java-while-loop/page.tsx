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
# Java Loops: 'while' and 'do-while'

Loops are used to execute a block of code repeatedly as long as a certain condition is met. They are essential for automating repetitive tasks and iterating over collections of data. Java provides several types of loops, and in this lesson, we'll focus on the 'while' and 'do-while' loops.

## The 'while' Loop

The 'while' loop executes a block of code as long as a specified condition is 'true'. The condition is evaluated *before* each execution of the loop body. If the condition is initially 'false', the loop body will never be executed.

**Syntax:**

\`\`\`java
while (condition) {
  // Code to be executed as long as the condition is true
}
\`\`\`

**Example:**

\`\`\`java
public class WhileLoopExample {
  public static void main(String[] args) {
    int i = 0;
    while (i < 5) {
      System.out.println(i);
      i++; // Increment 'i' to eventually make the condition false
    }
    // Output:
    // 0
    // 1
    // 2
    // 3
    // 4
  }
}
\`\`\`

### Explanation:
1.  The variable 'i' is initialized to 0.
2.  The 'while' loop checks if 'i' is less than 5.
3.  Since '0 < 5' is 'true', the code inside the loop executes: '0' is printed, and 'i' becomes 1.
4.  The condition is checked again ('1 < 5' is 'true'), '1' is printed, 'i' becomes 2.
5.  This continues until 'i' becomes 5. At this point, '5 < 5' is 'false', so the loop terminates.

---

## The 'do-while' Loop

The 'do-while' loop is similar to the 'while' loop, but with one key difference: the loop body is executed *at least once*, regardless of whether the condition is 'true' or 'false'. The condition is evaluated *after* each execution of the loop body.

**Syntax:**

\`\`\`java
do {
  // Code to be executed at least once
  // And then repeatedly as long as the condition is true
} while (condition); // Note the semicolon here!
\`\`\`

**Example:**

\`\`\`java
public class DoWhileLoopExample {
  public static void main(String[] args) {
    int i = 0;
    do {
      System.out.println(i);
      i++;
    } while (i < 5);
    // Output:
    // 0
    // 1
    // 2
    // 3
    // 4
  }
}
\`\`\`

### Example with condition initially 'false':

\`\`\`java
public class DoWhileFalseCondition {
  public static void main(String[] args) {
    int i = 5;
    do {
      System.out.println("This will print at least once: " + i);
      i++;
    } while (i < 5); // Condition is false from the start
    // Output:
    // This will print at least once: 5
  }
}
\`\`\`
In this example, even though 'i < 5' is initially 'false', the code inside the 'do' block executes once before the condition is checked.

---

## Key Differences between 'while' and 'do-while'

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'while' Loop</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'do-while' Loop</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Condition Check</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Evaluated at the beginning of each iteration.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Evaluated at the end of each iteration.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Execution Guarantee</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">May not execute at all if the condition is initially 'false'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Guaranteed to execute at least once.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Semicolon</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">No semicolon after the 'while (condition)' part.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Requires a semicolon after 'while (condition);'.</td>
        </tr>
    </tbody>
</table>

---

## Infinite Loops

A common mistake with loops is creating an **infinite loop**, where the condition never becomes 'false'. This causes the program to run indefinitely, consuming resources.

\`\`\`java
// WARNING: This is an infinite loop! Do not run in your IDE without caution.
// public class InfiniteLoop {
//   public static void main(String[] args) {
//     int i = 0;
//     while (i < 5) { // Condition 'i < 5' will always be true if 'i' is not incremented
//       System.out.println(i);
//       // Missing i++;
//     }
//   }
// }
\`\`\`
Always ensure that there is a mechanism within your loop (like an increment/decrement or a change in a boolean flag) that will eventually make the loop's condition 'false'.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: When to Use Which Loop</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use a 'while' loop when you want to repeat a block of code as long as a condition is true, and you're not sure if the loop needs to run at all (it might run zero times). Use a 'do-while' loop when you need to ensure the loop body executes at least once before checking the condition.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Avoid Infinite Loops</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Carefully design your loop conditions and ensure that your loop body modifies the variables involved in the condition in a way that will eventually lead to the condition becoming 'false'. Infinite loops can crash your program or consume all system resources.
    </div>
</div>
`;

export default function JavaWhileLoopPage() {
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
          prevLesson="java-switch"
          nextLesson="java-for-loop"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
