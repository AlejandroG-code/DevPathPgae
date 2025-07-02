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
# Java Comments

Comments are explanatory notes in your code that the Java compiler ignores. They are essential for making your code more readable and understandable for yourself and other developers.

## Single-Line Comments

Single-line comments in Java start with two forward slashes ('//'). Any text from '//' to the end of the line is treated as a comment.

\`\`\`java
public class JavaComments {
  public static void main(String[] args) {
    // This is a single-line comment
    System.out.println("Hello World"); // This is an inline comment
  }
}
\`\`\`

**When to use single-line comments:**
-   To explain a single line of code.
-   To temporarily disable a line of code during debugging.
-   To add short notes or reminders.

## Multi-Line Comments

Multi-line comments in Java start with '/*' and end with '*/'. Any text between these two markers is considered a comment, even if it spans multiple lines.

\`\`\`java
public class JavaMultiLineComments {
  public static void main(String[] args) {
    /*
     * This is a multi-line comment.
     * It can span across several lines.
     * This type of comment is useful for longer explanations.
     */
    System.out.println("Multi-line comments example.");
  }
}
\`\`\`

## Documentation Comments (Javadoc)

Java also supports a special type of multi-line comment known as a documentation comment, or Javadoc comment. These comments start with '/**' and end with '*/'. They are used to generate API documentation in HTML format using the 'javadoc' tool.

Javadoc comments are placed before classes, interfaces, methods, or fields to describe their purpose, parameters, return values, etc.

\`\`\`java
/**
 * This is the MyClass class.
 * It demonstrates the use of Javadoc comments.
 */
public class MyClass {

  /**
   * This is a field that stores a message.
   */
  private String message;

  /**
   * Constructor for MyClass.
   * @param msg The message to be stored.
   */
  public MyClass(String msg) {
    this.message = msg;
  }

  /**
   * This method prints the stored message to the console.
   * @return void
   */
  public void printMessage() {
    System.out.println(message);
  }

  public static void main(String[] args) {
    MyClass obj = new MyClass("Hello from Javadoc!");
    obj.printMessage();
  }
}
\`\`\`

**Common Javadoc Tags:**
-   '@param': Describes a method parameter.
-   '@return': Describes the return value of a method.
-   '@throws': Documents an exception that a method might throw.
-   '@see': Refers to another part of the documentation.
-   '@author': Specifies the author of the code.
-   '@version': Specifies the version of the code.

## Best Practices for Comments

-   **Explain "Why," Not "What":** Good code should explain *what* it does. Comments should explain *why* it does it, or *why* a particular approach was chosen.
-   **Keep them Up-to-Date:** Outdated comments are worse than no comments, as they can be misleading. Always update comments when you change the code.
-   **Avoid Redundancy:** Don't comment on obvious code. For example, 'int x = 10; // Declares an integer x and initializes it to 10' is unnecessary.
-   **Use Javadoc for Public APIs:** For classes, methods, and fields that are part of your public API (intended for use by other developers), always use Javadoc comments to provide comprehensive documentation.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Self-Documenting Code</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Strive to write self-documenting code by using clear, descriptive variable and method names. This reduces the need for excessive comments and makes your code inherently more readable. Comments should supplement, not replace, clear code.
    </div>
</div>
`;

export default function JavaCommentsPage() {
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
          prevLesson="java-output"
          nextLesson="java-variables"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
