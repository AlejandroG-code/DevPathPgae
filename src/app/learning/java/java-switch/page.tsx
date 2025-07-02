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
# Java Switch Statements

The 'switch' statement is a multi-way branch statement that provides an easy way to dispatch execution to different parts of code based on the value of an expression. It's an alternative to long 'if-else if-else' chains when you are checking a single variable against multiple possible values.

## Syntax

\`\`\`java
switch (expression) {
  case value1:
    // Code to be executed if expression matches value1
    break; // Optional
  case value2:
    // Code to be executed if expression matches value2
    break; // Optional
  case valueN:
    // Code to be executed if expression matches valueN
    break; // Optional
  default:
    // Code to be executed if expression doesn't match any case
}
\`\`\`

### Explanation:

-   **'expression'**: An expression whose value is compared with the values of each 'case'. The 'expression' can be of type 'byte', 'short', 'char', 'int', 'String', or an 'enum'.
-   **'case valueN'**: Each 'case' specifies a value to compare with the 'expression'. If a match is found, the code block associated with that 'case' is executed.
-   **'break'**: The 'break' keyword is optional. When Java reaches a 'break' keyword, it breaks out of the switch block. This will stop the execution of more code and case testing inside the block.
    -   If 'break' is omitted, execution will continue to the next 'case' (this is called "fall-through") until a 'break' is encountered or the end of the 'switch' block is reached.
-   **'default'**: The 'default' keyword is optional. It specifies some code to run if there is no case match. The 'default' case does not need a 'break' because it is typically the last statement in the switch block.

## Flowchart of 'switch' Statement

\`\`\`mermaid
flowchart TD;
    A[Start] --> B{Expression Value?};
    B -- Case 1 --> C[Execute Case 1 Code];
    B -- Case 2 --> D[Execute Case 2 Code];
    B -- ... --> E[Execute Case N Code];
    B -- Default --> F[Execute Default Code];
    C --> G[End Switch];
    D --> G;
    E --> G;
    F --> G;
\`\`\`

## Example

Let's use the 'switch' statement to determine the day of the week based on a number.

\`\`\`java
public class JavaSwitchExample {
  public static void main(String[] args) {
    int day = 4;
    switch (day) {
      case 1:
        System.out.println("Monday");
        break;
      case 2:
        System.out.println("Tuesday");
        break;
      case 3:
        System.out.println("Wednesday");
        break;
      case 4:
        System.out.println("Thursday"); // This will be executed
        break;
      case 5:
        System.out.println("Friday");
        break;
      case 6:
        System.out.println("Saturday");
        break;
      case 7:
        System.out.println("Sunday");
        break;
      default:
        System.out.println("Looking forward to the Weekend!");
    }
    // Outputs "Thursday" (because day is 4)
  }
}
\`\`\`

## The 'break' Keyword

The 'break' keyword is used to terminate the 'switch' statement. Without 'break', the code will "fall through" to the next 'case' even if a match is found.

\`\`\`java
public class SwitchFallThrough {
  public static void main(String[] args) {
    int day = 2;
    switch (day) {
      case 1:
        System.out.println("Monday");
      case 2:
        System.out.println("Tuesday"); // This will be executed
      case 3:
        System.out.println("Wednesday"); // This will also be executed due to fall-through
        break; // Stops here
      default:
        System.out.println("Another day");
    }
    // Output:
    // Tuesday
    // Wednesday
  }
}
\`\`\`
As you can see, omitting 'break' can lead to unexpected behavior if not intended.

## The 'default' Keyword

The 'default' keyword specifies code to run if there is no 'case' match. It's similar to the 'else' part of an 'if-else if-else' chain.

\`\`\`java
public class SwitchDefault {
  public static void main(String[] args) {
    int day = 9;
    switch (day) {
      case 1:
        System.out.println("Monday");
        break;
      case 2:
        System.out.println("Tuesday");
        break;
      default:
        System.out.println("Invalid day number"); // This will be executed
    }
    // Output: Invalid day number
  }
}
\`\`\`

## 'switch' Expressions (Java 14+)

Java 14 introduced 'switch' expressions, which allow 'switch' to return a value, making the code more concise and expressive. They use '->' instead of ':' and implicitly 'break'.

\`\`\`java
public class SwitchExpressionExample {
  public static void main(String[] args) {
    int day = 3;
    String dayType = switch (day) {
      case 1, 2, 3, 4, 5 -> "Weekday";
      case 6, 7 -> "Weekend";
      default -> "Invalid Day";
    };
    System.out.println(dayType); // Output: Weekday

    // Using 'yield' for more complex logic within a case
    String result = switch (day) {
      case 1: yield "Start of week";
      case 7: yield "End of week";
      default: yield "Mid-week";
    };
    System.out.println(result); // Output: Mid-week
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use 'switch' for Clarity</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use a 'switch' statement when you have a single variable that needs to be compared against many discrete values. It often makes the code cleaner and more readable than a long series of 'if-else if' statements.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Missing 'break'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For traditional 'switch' statements, always remember the 'break' keyword if you don't intend for fall-through behavior. Forgetting 'break' is a common source of logical errors. 'switch' expressions (Java 14+) implicitly handle this with '->'.
    </div>
</div>
`;

export default function JavaSwitchPage() {
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
          prevLesson="java-if-else"
          nextLesson="java-while-loop"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
