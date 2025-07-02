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
# Java Break and Continue

The 'break' and 'continue' statements are control flow statements used within loops to alter their normal execution flow. They provide powerful ways to manage loop behavior based on specific conditions.

## The 'break' Statement

The 'break' statement is used to **terminate** the loop immediately. When 'break' is encountered inside a loop (for, while, do-while), the loop is exited, and program control resumes at the statement immediately following the loop.

**When to use 'break':**
-   When a specific condition is met, and there's no need to continue iterating.
-   To exit an infinite loop based on user input or a calculated condition.

**Example in a 'for' loop:**

\`\`\`java
public class BreakForLoop {
  public static void main(String[] args) {
    for (int i = 0; i < 10; i++) {
      if (i == 4) {
        System.out.println("Breaking loop at i = 4");
        break; // Exit the loop when i is 4
      }
      System.out.println(i);
    }
    // Output:
    // 0
    // 1
    // 2
    // 3
    // Breaking loop at i = 4
  }
}
\`\`\`

**Example in a 'while' loop:**

\`\`\`java
public class BreakWhileLoop {
  public static void main(String[] args) {
    int i = 0;
    while (i < 10) {
      System.out.println(i);
      i++;
      if (i == 4) {
        System.out.println("Breaking loop at i = 4");
        break; // Exit the loop when i becomes 4
      }
    }
    // Output:
    // 0
    // 1
    // 2
    // 3
    // Breaking loop at i = 4
  }
}
\`\`\`

---

## The 'continue' Statement

The 'continue' statement is used to **skip the current iteration** of a loop and immediately proceed to the next iteration. When 'continue' is encountered, the rest of the loop body for the current iteration is skipped, and the loop's condition is re-evaluated (for 'while' and 'do-while') or the increment/decrement part is executed (for 'for' loops), followed by the next iteration.

**When to use 'continue':**
-   When you want to skip certain elements or conditions within a loop without exiting the entire loop.
-   To handle specific cases that don't require further processing in the current iteration.

**Example in a 'for' loop:**

\`\`\`java
public class ContinueForLoop {
  public static void main(String[] args) {
    for (int i = 0; i < 10; i++) {
      if (i == 4) {
        System.out.println("Skipping iteration for i = 4");
        continue; // Skip the rest of this iteration when i is 4
      }
      System.out.println(i);
    }
    // Output:
    // 0
    // 1
    // 2
    // 3
    // Skipping iteration for i = 4
    // 5
    // 6
    // 7
    // 8
    // 9
  }
}
\`\`\`

**Example in a 'while' loop:**

\`\`\`java
public class ContinueWhileLoop {
  public static void main(String[] args) {
    int i = 0;
    while (i < 10) {
      if (i == 4) {
        System.out.println("Skipping iteration for i = 4");
        i++; // Important: Increment 'i' before 'continue' to avoid infinite loop
        continue; // Skip the rest of this iteration
      }
      System.out.println(i);
      i++;
    }
    // Output:
    // 0
    // 1
    // 2
    // 3
    // Skipping iteration for i = 4
    // 5
    // 6
    // 7
    // 8
    // 9
  }
}
\`\`\`
**Important Note for 'while' and 'do-while' loops with 'continue':**
If you use 'continue' in a 'while' or 'do-while' loop, make sure that the loop's control variable (e.g., 'i' in the example above) is updated *before* the 'continue' statement. Otherwise, if the condition for 'continue' remains true, you could end up with an infinite loop.

---

## Difference between 'break' and 'continue'

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'break'</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">'continue'</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Action</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Terminates the entire loop.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Skips the current iteration and proceeds to the next.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Loop Execution</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">The loop stops completely.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">The loop continues with the next iteration.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Control Flow</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Transfers control to the statement immediately after the loop.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Transfers control to the loop's condition evaluation (or increment for 'for' loop).</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use Sparingly for Clarity</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While 'break' and 'continue' are powerful, overuse can make your code harder to read and debug. Often, loop conditions can be refactored to achieve the same result without needing these statements, leading to clearer code. Use them when they genuinely simplify the logic.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Infinite Loops with 'continue' in 'while'/'do-while'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        As mentioned, if the loop control variable is not updated before a 'continue' statement in a 'while' or 'do-while' loop, and the 'continue' condition remains true, it will result in an infinite loop. Always ensure the variable is modified to allow the loop to eventually terminate.
    </div>
</div>
`;

export default function JavaBreakContinuePage() {
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
          prevLesson="java-for-loop"
          nextLesson="java-arrays"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
