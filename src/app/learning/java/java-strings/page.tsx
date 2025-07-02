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
# Java Strings

Strings are used for storing text. A Java String is an object that represents a sequence of characters. In Java, strings are immutable, meaning once a string is created, its value cannot be changed.

## Creating Strings

Strings can be created in two main ways:

1.  **String Literal:** Using double quotes. This is the most common way.
    \`\`\`java
    String greeting = "Hello World";
    \`\`\`
    When you create a string literal, Java checks the "string pool" (a special memory area). If the string already exists, it returns a reference to the existing string; otherwise, it creates a new string in the pool.

2.  **Using the 'new' keyword:**
    \`\`\`java
    String message = new String("Hello Java");
    \`\`\`
    Using 'new' always creates a new String object in the heap memory, even if the same string literal already exists in the string pool.

## String Length

To find the length of a string, use the 'length()' method.

\`\`\`java
public class StringLength {
  public static void main(String[] args) {
    String txt = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    System.out.println("The length of the txt string is: " + txt.length()); 
    // Output: The length of the txt string is: 26
  }
}
\`\`\`

## String Methods

Java provides many useful methods for manipulating strings. Here are some common ones:

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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'charAt(index)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the character at the specified index.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Hello'.charAt(0) returns 'H'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'concat(string)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Appends the specified string to the end of this string.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Hello'.concat(' World') returns "Hello World"</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'contains(sequence)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Checks if the string contains the specified sequence of characters.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Java'.contains('av') returns true</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'equals(object)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Compares this string to the specified object. Returns true if they are equal.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Hello'.equals("Hello") returns true</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'equalsIgnoreCase(string)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Compares this string to another string, ignoring case considerations.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Hello'.equalsIgnoreCase("hello") returns true</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'indexOf(char/string)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the index within this string of the first occurrence of the specified character or substring.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'World'.indexOf('o') returns 1</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'isEmpty()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns true if the string is empty (length is 0).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">''.isEmpty() returns true</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'length()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the length of the string.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Java'.length() returns 4</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'replace(oldChar, newChar)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a new string resulting from replacing all occurrences of 'oldChar' with 'newChar'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Hello'.replace('l', 'p') returns "Heppo"</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'startsWith(prefix)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Tests if this string starts with the specified prefix.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Example'.startsWith("Ex") returns true</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'substring(startIndex)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a new string that is a substring of this string.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Substring'.substring(3) returns "string"</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'substring(startIndex, endIndex)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a new string that is a substring of this string. The substring begins at the specified 'startIndex' and extends to the character at 'endIndex - 1'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Example'.substring(1, 4) returns "xam"</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'toLowerCase()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Converts all of the characters in this String to lowercase.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'HELLO'.toLowerCase() returns "hello"</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'toUpperCase()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Converts all of the characters in this String to uppercase.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'hello'.toUpperCase() returns "HELLO"</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'trim()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a copy of the string, with leading and trailing whitespace omitted.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'  Hello World  '.trim() returns "Hello World"</td>
        </tr>
    </tbody>
</table>

## String Concatenation

You can combine two or more strings using the '+' operator or the 'concat()' method.

\`\`\`java
public class StringConcatenation {
  public static void main(String[] args) {
    String firstName = "John";
    String lastName = "Doe";
    String fullName = firstName + " " + lastName; // Using '+' operator
    System.out.println(fullName); // Output: John Doe

    String greeting = "Hello".concat(" World!"); // Using concat() method
    System.out.println(greeting); // Output: Hello World!
  }
}
\`\`\`

## Special Characters (Escape Sequences)

To include special characters (like double quotes, single quotes, or backslashes) within a string, you need to use escape sequences.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Escape Sequence</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Result</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\''</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Single Quote</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\"'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Double Quote</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\\\'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Backslash</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\n'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Newline (line break)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\r'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Carriage Return</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\t'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Tab</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Backspace</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\f'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Form Feed</td>
        </tr>
    </tbody>
</table>

**Example:**

\`\`\`java
public class SpecialCharacters {
  public static void main(String[] args) {
    System.out.println("He said, \\"Hello!\\""); // Output: He said, "Hello!"
    System.out.println("It's a beautiful day."); // Output: It's a beautiful day.
    System.out.println("The path is C:\\\\Users\\\\Documents"); // Output: The path is C:\Users\Documents
    System.out.println("Line 1\\nLine 2"); // Output: Line 1 (new line) Line 2
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Immutability of Strings</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Remember that Strings in Java are immutable. When you perform operations like 'concat()' or 'replace()', you are not modifying the original string. Instead, these methods return a *new* string with the modified content. The original string remains unchanged.
    </div>
</div>
`;

export default function JavaStringsPage() {
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
          prevLesson="java-operators"
          nextLesson="java-math"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
