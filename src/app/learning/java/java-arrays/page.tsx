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
# Java Arrays

Arrays are used to store multiple values of the same type in a single variable, instead of declaring separate variables for each value. They provide a way to organize and manage collections of data efficiently.

## Declaring an Array

To declare an array, define the variable type with square brackets '[]':

\`\`\`java
dataType[] arrayName;
\`\`\`

## Creating and Initializing an Array

There are two main ways to create and initialize arrays:

1.  **Direct Initialization (Declaration, Instantiation, and Initialization):**
    When you already know the values you want to store.

    \`\`\`java
    String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
    int[] myNumbers = {10, 20, 30, 40};
    \`\`\`

2.  **Declaration and then Instantiation with Size:**
    When you know the number of elements but will assign values later.

    \`\`\`java
    String[] cars = new String[4]; // Declares an array of 4 Strings
    int[] myNumbers = new int[5];  // Declares an array of 5 integers
    \`\`\`
    By default, elements of numeric arrays are initialized to 0, booleans to 'false', and object arrays (like 'String') to 'null'.

## Accessing Array Elements

You access an array element by referring to its **index number**. Array indexes start with '0'.

\`\`\`java
public class AccessArrayElements {
  public static void main(String[] args) {
    String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
    System.out.println(cars[0]); // Output: Volvo (the first element)
  }
}
\`\`\`

## Changing an Array Element

To change the value of a specific element, refer to its index number:

\`\`\`java
public class ChangeArrayElement {
  public static void main(String[] args) {
    String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
    cars[0] = "Opel"; // Change the first element from "Volvo" to "Opel"
    System.out.println(cars[0]); // Output: Opel
  }
}
\`\`\`

## Array Length

To find out how many elements an array has, use the 'length' property:

\`\`\`java
public class ArrayLength {
  public static void main(String[] args) {
    String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
    System.out.println(cars.length); // Output: 4
  }
}
\`\`\`

## Looping Through an Array

You can loop through array elements with the 'for' loop, and with the 'for-each' loop.

### Using a 'for' loop:

\`\`\`java
public class LoopThroughArray {
  public static void main(String[] args) {
    String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
    for (int i = 0; i < cars.length; i++) {
      System.out.println(cars[i]);
    }
    // Output:
    // Volvo
    // BMW
    // Ford
    // Mazda
  }
}
\`\`\`

### Using a 'for-each' loop (Recommended for simple iteration):

\`\`\`java
public class ForEachLoopArray {
  public static void main(String[] args) {
    String[] cars = {"Volvo", "BMW", "Ford", "Mazda"};
    for (String i : cars) {
      System.out.println(i);
    }
    // Output:
    // Volvo
    // BMW
    // Ford
    // Mazda
  }
}
\`\`\`

## Multidimensional Arrays

A multidimensional array is an array of arrays. You can think of it as a table with rows and columns.

To create a two-dimensional array, add each array within its own set of curly braces:

\`\`\`java
public class MultiDimArray {
  public static void main(String[] args) {
    int[][] myNumbers = { {1, 2, 3, 4}, {5, 6, 7} };
    System.out.println(myNumbers[1][2]); // Accesses the 3rd element (index 2) in the 2nd array (index 1)
    // Output: 7
  }
}
\`\`\`

### Looping Through Multidimensional Arrays

To loop through a multidimensional array, you can use nested 'for' loops:

\`\`\`java
public class LoopMultiDimArray {
  public static void main(String[] args) {
    int[][] myNumbers = { {1, 2, 3, 4}, {5, 6, 7} };
    for (int i = 0; i < myNumbers.length; ++i) { // Outer loop for rows
      for (int j = 0; j < myNumbers[i].length; ++j) { // Inner loop for columns
        System.out.print(myNumbers[i][j] + " ");
      }
      System.out.println(); // New line after each row
    }
    // Output:
    // 1 2 3 4 
    // 5 6 7 
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Array Index Out of Bounds</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always remember that array indexing starts at 0. Trying to access an element at an index that does not exist (e.g., 'array[array.length]') will result in an 'ArrayIndexOutOfBoundsException' at runtime.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Fixed Size</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Once an array is created, its size is fixed. You cannot add or remove elements from it. If you need a dynamic collection that can change size, consider using Java Collections Framework classes like 'ArrayList'.
    </div>
</div>
`;

export default function JavaArraysPage() {
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
          prevLesson="java-break-continue"
          nextLesson="java-methods" // This is the start of the next set of lessons (Part 2)
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
