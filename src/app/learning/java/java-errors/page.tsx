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
# Java Errors

In Java, an **Error** is a subclass of 'java.lang.Throwable' that indicates serious problems that a reasonable application should not try to catch. Unlike exceptions, errors are typically unrecoverable conditions that occur outside the control of the program, such as resource exhaustion or environmental issues.

## What is an Error?

Errors represent severe problems that usually indicate a fundamental issue with the Java Virtual Machine (JVM) or the environment in which the application is running. They are not meant to be handled by application code because recovering from them is generally not possible.

### Key Characteristics of Errors:

-   **Unchecked:** Errors are unchecked, meaning the compiler does not force you to handle them using 'try-catch' blocks.
-   **Unrecoverable:** They typically indicate a fatal problem that the application cannot recover from.
-   **JVM-related:** Often caused by issues with the JVM itself, the underlying system, or critical resources.

## Common Types of Errors in Java

Here are some of the most common types of 'Error' subclasses you might encounter:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Error Type</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example Cause</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'OutOfMemoryError'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that the Java Virtual Machine cannot allocate an object because it is out of memory, and no more memory could be made available by the garbage collector.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Creating too many objects, memory leak, insufficient heap size.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'StackOverflowError'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that the application recursion is too deep, causing the stack to overflow.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Infinite recursion (a method calling itself without a proper base case).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'NoClassDefFoundError'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Occurs when the Java Virtual Machine tries to load the definition of a class and that class definition no longer exists. This usually happens when the class was present during compile time but not at runtime.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Missing JAR file, incorrect classpath, class removed after compilation.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'VirtualMachineError'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Base class for errors thrown by the Java Virtual Machine when it is broken or has insufficient resources to continue operating.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Includes 'OutOfMemoryError', 'StackOverflowError', etc.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'AssertionError'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Thrown to indicate that an assertion has failed. Assertions are used for debugging and should not be relied upon for normal program logic.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">An 'assert' statement evaluates to 'false'.</td>
        </tr>
    </tbody>
</table>

## Example: 'StackOverflowError'

This error typically occurs due to infinite recursion.

\`\`\`java
public class StackOverflowExample {

  public static void infiniteRecursion() {
    infiniteRecursion(); // This method calls itself indefinitely
  }

  public static void main(String[] args) {
    try {
      infiniteRecursion();
    } catch (StackOverflowError e) {
      System.out.println("Caught StackOverflowError: " + e.getMessage());
      // Although you *can* catch an Error, it's generally not recommended
      // as it signifies a severe, unrecoverable problem.
    }
    System.out.println("Program attempted to continue after StackOverflowError.");
  }
}
\`\`\`
When you run this code, it will eventually crash with a 'StackOverflowError' because each call to 'infiniteRecursion()' adds a new frame to the call stack, and eventually, the stack runs out of memory.

## Example: 'OutOfMemoryError'

This error occurs when the Java Virtual Machine cannot allocate an object because it is out of memory.

\`\`\`java
import java.util.ArrayList;
import java.util.List;

public class OutOfMemoryExample {
  public static void main(String[] args) {
    List<byte[]> list = new ArrayList<>();
    try {
      while (true) {
        // Continuously add large byte arrays to consume memory
        list.add(new byte[1024 * 1024]); // 1 MB byte array
      }
    } catch (OutOfMemoryError e) {
      System.out.println("Caught OutOfMemoryError: " + e.getMessage());
      System.out.println("Memory exhausted. Application cannot continue normally.");
    }
    System.out.println("Program attempted to continue after OutOfMemoryError.");
  }
}
\`\`\`
Running this program will likely result in an 'OutOfMemoryError' as it tries to allocate more and more memory without releasing it.

## Errors vs. Exceptions

It's crucial to understand the distinction between 'Error' and 'Exception':

-   **Errors:** Indicate serious, unrecoverable problems. They are typically not caught by application code. When an error occurs, it usually means the application or JVM is in a state where it cannot reliably continue.
-   **Exceptions:** Indicate conditions that an application might want to catch and handle. They represent problems that can often be recovered from (e.g., a file not found, invalid input).

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Feature</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Error</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Exception</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Recoverability</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Generally unrecoverable.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Often recoverable.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Handling</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Not recommended to catch (unchecked).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Should be caught and handled (checked and unchecked).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Cause</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">System-level issues, JVM problems, resource exhaustion.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Application-level problems, programming errors, external conditions.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hierarchy</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Direct subclass of 'Throwable'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Subclass of 'Throwable' (or 'RuntimeException').</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Focus on Exceptions</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        As an application developer, your primary focus should be on handling 'Exceptions' rather than 'Errors'. 'Errors' are typically outside the scope of normal application logic and are better addressed by fixing underlying system issues or increasing allocated resources.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Do Not Catch 'Throwable' or 'Error' Generically</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While it's syntactically possible to catch 'Throwable' or 'Error' (e.g., 'catch (Throwable t)'), it is almost always a bad practice. Catching these broad types can mask serious underlying problems that your application cannot gracefully handle, making debugging much harder and potentially leading to an unstable system. Only catch specific 'Exception' types that you know how to recover from.
    </div>
</div>
`;

export default function JavaErrorsPage() {
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
          prevLesson="java-date"
          nextLesson="java-debugging"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
