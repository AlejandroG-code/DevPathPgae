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
# Welcome to the Java Course!

Java is one of the most popular programming languages in the world. It is used to develop mobile apps, web apps, desktop apps, games, and much more.

## What is Java?

-   Java is a **high-level, class-based, object-oriented programming language** that is designed to have as few implementation dependencies as possible.
-   It is a **general-purpose programming language** intended to let application developers *write once, run anywhere* (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.
-   Java is **platform-independent**, meaning you can write Java code on one operating system (e.g., Windows) and run it on another (e.g., macOS, Linux) without modification.

## Why Learn Java?

-   **Versatility:** Used in a vast array of applications, from enterprise-level systems to Android mobile apps.
-   **Large Community & Ecosystem:** A massive global community, extensive libraries, and frameworks.
-   **High Demand:** Java developers are consistently in high demand across various industries.
-   **Scalability:** Well-suited for building large, complex, and scalable applications.
-   **Robust and Secure:** Built with security features and strong memory management.

## What You Will Learn in This Course

This course will cover essential Java concepts, including:

-   **Fundamentals:** Syntax, data types, variables, operators.
-   **Control Flow:** Conditionals (if/else, switch), loops (for, while).
-   **Data Structures:** Arrays, Collections (List, Set, Map).
-   **Object-Oriented Programming (OOP):** Classes, Objects, Inheritance, Polymorphism, Encapsulation, Abstraction.
-   **Advanced Topics:** Exception Handling, File I/O, Generics, Threads, Lambda Expressions.

## Getting Started

To follow along with this course, you will need:

1.  **JDK (Java Development Kit):** This includes the Java Runtime Environment (JRE) and development tools like the Java compiler (javac).
2.  **An IDE (Integrated Development Environment):** While you can use a simple text editor, an IDE like IntelliJ IDEA, Eclipse, or VS Code with Java extensions will greatly enhance your development experience.

Let's start your journey into Java programming!

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Practice Regularly</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The best way to learn Java (or any programming language) is through consistent practice. Try to write code for every concept you learn, and don't be afraid to experiment and make mistakes.
    </div>
</div>
`;

export default function JavaHomePage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = '[https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css](https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css)';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = '[https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js](https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js)';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptJavaLang = document.createElement('script');
      scriptJavaLang.src = '[https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js](https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js)';
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
          prevLesson={null} // This is the first lesson of the Java course
          nextLesson="java-intro"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
