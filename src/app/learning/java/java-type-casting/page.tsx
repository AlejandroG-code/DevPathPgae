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
# Java Type Casting

Type casting is when you assign a value of one primitive data type to another type. In Java, there are two types of casting: Widening Casting (automatically) and Narrowing Casting (manually).

## 1. Widening Casting (Automatic)

Widening casting (also called implicit casting) happens automatically when converting a smaller data type to a larger data type. This conversion is safe because there is no loss of data.

**Order of conversion:**
'byte' -> 'short' -> 'char' -> 'int' -> 'long' -> 'float' -> 'double'

\`\`\`java
public class WideningCasting {
  public static void main(String[] args) {
    int myInt = 9;
    double myDouble = myInt; // Automatic casting: int to double

    System.out.println(myInt);    // Output: 9
    System.out.println(myDouble); // Output: 9.0
  }
}
\`\`\`

**More examples of widening casting:**

\`\`\`java
public class WideningExamples {
  public static void main(String[] args) {
    byte b = 10;
    short s = b;       // byte to short
    int i = s;         // short to int
    long l = i;        // int to long
    float f = l;       // long to float (may lose precision for very large numbers)
    double d = f;      // float to double

    System.out.println("byte: " + b);
    System.out.println("short: " + s);
    System.out.println("int: " + i);
    System.out.println("long: " + l);
    System.out.println("float: " + f);
    System.out.println("double: " + d);
  }
}
\`\`\`

## 2. Narrowing Casting (Manual)

Narrowing casting (also called explicit casting) must be done manually by placing the type in parentheses in front of the value. This conversion is done when converting a larger data type to a smaller data type.

This type of casting can lead to **loss of data** or precision, as the larger type might contain values that cannot be fully represented by the smaller type.

**Order of conversion (reverse of widening):**
'double' -> 'float' -> 'long' -> 'int' -> 'char' -> 'short' -> 'byte'

\`\`\`java
public class NarrowingCasting {
  public static void main(String[] args) {
    double myDouble = 9.78d;
    int myInt = (int) myDouble; // Manual casting: double to int

    System.out.println(myDouble); // Output: 9.78
    System.out.println(myInt);    // Output: 9 (decimal part is truncated)
  }
}
\`\`\`

**More examples of narrowing casting:**

\`\`\`java
public class NarrowingExamples {
  public static void main(String[] args) {
    double d = 123.456;
    float f = (float) d;     // double to float (precision loss possible)
    long l = (long) f;       // float to long (decimal truncated)
    int i = (int) l;         // long to int (value overflow possible)
    short s = (short) i;     // int to short (value overflow possible)
    byte b = (byte) s;       // short to byte (value overflow possible)

    System.out.println("double: " + d);
    System.out.println("float: " + f);
    System.out.println("long: " + l);
    System.out.println("int: " + i);
    System.out.println("short: " + s);
    System.out.println("byte: " + b);

    // Example of data loss/overflow
    int bigInt = 300;
    byte smallByte = (byte) bigInt; // 300 is outside byte's range (-128 to 127)
    System.out.println("Casting 300 to byte: " + smallByte); // Output: 44 (due to overflow)
  }
}
\`\`\`
**Explanation of '300' to 'byte' overflow:**
A byte can hold values from -128 to 127. When 300 (binary '100101100') is cast to a byte (8 bits), only the least significant 8 bits are kept. This results in an overflow, and the value wraps around. '300 - 256 = 44'.

## When to Use Type Casting

-   **Widening Casting:** Use when you need to store a smaller numeric value into a larger numeric variable. It's safe and automatic.
-   **Narrowing Casting:** Use when you explicitly need to convert a larger numeric type to a smaller one, and you are aware of the potential for data loss or overflow. This is often done when working with specific APIs that require a certain type, or when you only need the integer part of a floating-point number.

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Data Loss in Narrowing</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always be cautious with narrowing casting. If the value of the larger type exceeds the range of the smaller type, you will experience data loss (overflow or underflow), and the resulting value will be incorrect.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use Appropriate Data Types</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        To minimize the need for explicit casting and potential data loss, always choose the most appropriate data type for your variables based on the range of values they are expected to hold.
    </div>
</div>
`;

export default function JavaTypeCastingPage() {
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
          prevLesson="java-data-types"
          nextLesson="java-operators" // First lesson of Part 2
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
