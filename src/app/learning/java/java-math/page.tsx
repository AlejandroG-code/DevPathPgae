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
# Java Math

Java provides a built-in 'Math' class that has many methods for performing mathematical tasks on numbers. You don't need to import anything to use the 'Math' class, as it's part of the 'java.lang' package, which is automatically imported.

## Common Math Methods

Here are some of the most commonly used methods from the 'Math' class:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.max(x, y)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the highest value of 'x' and 'y'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.max(5, 10)' returns 10</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.min(x, y)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the lowest value of 'x' and 'y'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.min(5, 10)' returns 5</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.sqrt(x)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the square root of 'x'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.sqrt(64)' returns 8.0</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.abs(x)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the absolute (positive) value of 'x'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.abs(-4.7)' returns 4.7</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.random()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a random number between 0.0 (inclusive) and 1.0 (exclusive).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.random()' returns e.g., 0.82345</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.round(x)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Rounds a floating-point number to the nearest integer.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.round(4.7)' returns 5, 'Math.round(4.3)' returns 4</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.ceil(x)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the smallest integer greater than or equal to 'x'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.ceil(4.3)' returns 5.0</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.floor(x)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the largest integer less than or equal to 'x'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.floor(4.7)' returns 4.0</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.pow(base, exponent)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the value of the first argument raised to the power of the second argument.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Math.pow(2, 3)' returns 8.0</td>
        </tr>
    </tbody>
</table>

## Examples

\`\`\`java
public class JavaMathExamples {
  public static void main(String[] args) {
    // Math.max and Math.min
    int x = 5;
    int y = 10;
    System.out.println("Maximum value: " + Math.max(x, y)); // Output: 10
    System.out.println("Minimum value: " + Math.min(x, y)); // Output: 5

    // Math.sqrt
    System.out.println("Square root of 81: " + Math.sqrt(81)); // Output: 9.0

    // Math.abs
    System.out.println("Absolute value of -17.5: " + Math.abs(-17.5)); // Output: 17.5

    // Math.random
    System.out.println("Random number: " + Math.random()); // Output: A random double between 0.0 and 1.0

    // Generating a random integer between 0 and 100
    int randomInt = (int)(Math.random() * 101); // (0 to 100 inclusive)
    System.out.println("Random integer (0-100): " + randomInt);

    // Math.round, Math.ceil, Math.floor
    double num1 = 4.7;
    double num2 = 4.3;
    System.out.println("Round 4.7: " + Math.round(num1));   // Output: 5
    System.out.println("Round 4.3: " + Math.round(num2));   // Output: 4
    System.out.println("Ceil 4.3: " + Math.ceil(num2));     // Output: 5.0
    System.out.println("Floor 4.7: " + Math.floor(num1));   // Output: 4.0

    // Math.pow
    System.out.println("2 raised to the power of 4: " + Math.pow(2, 4)); // Output: 16.0
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: 'Math.random()' for Integers</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        'Math.random()' returns a 'double' between 0.0 (inclusive) and 1.0 (exclusive). To get a random integer within a specific range, you can scale and cast it. For example, to get a random integer between 0 and 'max' (inclusive): '(int)(Math.random() * (max + 1))'.
    </div>
</div>
`;

export default function JavaMathPage() {
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
          prevLesson="java-strings"
          nextLesson="java-booleans"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
