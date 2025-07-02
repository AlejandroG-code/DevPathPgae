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
# Java Loops: 'for' Loop and 'for-each' Loop

Loops are fundamental control structures that allow you to execute a block of code repeatedly. In Java, the 'for' loop is one of the most commonly used loops, especially when you know in advance how many times you want to iterate. The 'for-each' loop provides a simpler way to iterate over arrays and collections.

## The 'for' Loop

The 'for' loop is used when you know exactly how many times you want to loop through a block of code.

**Syntax:**

\`\`\`java
for (initialization; condition; increment/decrement) {
  // Code to be executed repeatedly
}
\`\`\`

### Explanation:

1.  **'initialization'**: Executed once when the loop starts. It's typically used to declare and initialize a loop counter variable (e.g., 'int i = 0;').
2.  **'condition'**: Evaluated before each iteration. If it evaluates to 'true', the loop body executes. If it evaluates to 'false', the loop terminates.
3.  **'increment/decrement'**: Executed after each iteration of the loop body. It's typically used to update the loop counter (e.g., 'i++', 'i--', 'i += 2').

**Example:**

\`\`\`java
public class ForLoopExample {
  public static void main(String[] args) {
    for (int i = 0; i < 5; i++) {
      System.out.println(i);
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

---

## The 'for-each' Loop (Enhanced for Loop)

The 'for-each' loop (also known as the enhanced 'for' loop) is used exclusively to iterate over elements in arrays and collections. It makes iterating over elements much simpler and more readable, as you don't need to manage an index.

**Syntax:**

\`\`\`java
for (dataType element : arrayOrCollection) {
  // Code to be executed for each element
}
\`\`\`

### Explanation:

-   **'dataType'**: The data type of the elements in the array or collection.
-   **'element'**: A variable that will hold the current element in each iteration.
-   **'arrayOrCollection'**: The array or collection you want to iterate over.

**Example with Array:**

\`\`\`java
public class ForEachLoopArray {
  public static void main(String[] args) {
    String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
    for (String car : cars) {
      System.out.println(car);
    }
    // Output:
    // Volvo
    // BMW
    // Ford
    // Mazda
  }
}
\`\`\`

**Example with Numbers:**

\`\`\`java
public class ForEachLoopNumbers {
  public static void main(String[] args) {
    int[] numbers = {10, 20, 30, 40, 50};
    int sum = 0;
    for (int num : numbers) {
      sum += num; // Add each number to sum
    }
    System.out.println("Sum of numbers: " + sum); // Output: Sum of numbers: 150
  }
}
\`\`\`

---

## Nested Loops

You can place a loop inside another loop. This is called a nested loop. The inner loop will execute completely for each iteration of the outer loop.

**Example:**

\`\`\`java
public class NestedForLoop {
  public static void main(String[] args) {
    // Outer loop
    for (int i = 1; i <= 2; i++) {
      System.out.println("Outer: " + i); // Executes 2 times

      // Inner loop
      for (int j = 1; j <= 3; j++) {
        System.out.println("  Inner: " + j); // Executes 3 times for each outer iteration
      }
    }
    // Output:
    // Outer: 1
    //   Inner: 1
    //   Inner: 2
    //   Inner: 3
    // Outer: 2
    //   Inner: 1
    //   Inner: 2
    //   Inner: 3
  }
}
\`\`\`

---

## When to Use Which Loop

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Loop Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">When to Use</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Considerations</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'for' loop</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">When you know the exact number of iterations. <br/> When you need to access the index of elements. <br/> When you need more complex initialization, condition, or increment logic.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Provides fine-grained control over the loop. <br/> Can be used for any looping scenario.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'for-each' loop</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">When iterating over all elements of an array or collection. <br/> When you don't need the index of the elements.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">More readable and less error-prone for simple iteration. <br/> Cannot modify the elements of the array/collection directly (only the copy of the element). <br/> Cannot iterate backwards.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'while' loop</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">When the number of iterations is unknown and depends on a condition. <br/> When you need to repeat code as long as a condition is true.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Condition checked at the beginning. <br/> Loop body might not execute at all.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'do-while' loop</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">When you need the loop body to execute at least once, then repeat based on a condition.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Condition checked at the end. <br/> Loop body guaranteed to execute at least once.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Choosing the Right Loop</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The choice of loop depends on your specific needs. For iterating a fixed number of times or when you need an index, 'for' is ideal. For simple iteration over collections, 'for-each' is cleaner. For indefinite loops based on a condition, 'while' or 'do-while' are appropriate, depending on whether you need at least one execution.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Off-by-One Errors</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When using 'for' and 'while' loops, be careful with your loop conditions and increment/decrement logic to avoid "off-by-one" errors (looping one too many or one too few times). Test your loop boundaries carefully.
    </div>
</div>
`;

export default function JavaForLoopPage() {
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
          prevLesson="java-while-loop"
          nextLesson="java-break-continue"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
