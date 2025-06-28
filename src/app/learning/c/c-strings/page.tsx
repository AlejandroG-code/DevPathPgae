// src/app/learning/c/c-strings/page.tsx
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
# C Strings

In C, a string is a sequence of characters terminated by a **null character** ('\0'). C does not have a built-in 'string' data type. Instead, strings are typically handled as arrays of characters.

## Declaring and Initializing Strings

You can declare and initialize strings in several ways:

### 1. Using a character array with explicit size

\`\`\`c
#include \<stdio.h\>;

int main() {
    char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\\0'}; // Needs space for null terminator
    printf("%s\\n", greeting); // Output: Hello
    return 0;
}
\`\`\`

### 2. Using a string literal (most common)

When you initialize a character array with a string literal, the compiler automatically adds the null terminator for you.

\`\`\`c
#include \<stdio.h\>

int main() {
    char greeting[] = "Hello"; // Size automatically determined as 6 (5 chars + '\0')
    printf("%s\\n", greeting); // Output: Hello

    char message[10] = "Hi"; // Size 10, 'Hi' + '\0' + 7 more null characters
    printf("%s\\n", message); // Output: Hi
    return 0;
}
\`\`\`

## Accessing and Modifying String Elements

Strings are character arrays, so you can access individual characters using array indexing.

\`\`\`c
#include \<stdio.h\>

int main() {
    char myString[] = "World";

    printf("Original string: %s\\n", myString); // Output: World
    printf("First character: %c\\n", myString[0]); // Output: W

    myString[0] = 'w'; // Modify the first character
    printf("Modified string: %s\\n", myString); // Output: world

    // The null terminator is important
    myString[3] = '\\0'; // Terminate the string early
    printf("Truncated string: %s\\n", myString); // Output: wor
    return 0;
}
\`\`\`

## String Manipulation Functions \<string.h\>

The C standard library provides a rich set of functions in the '&ltstring.h&gt' header for common string operations.

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Function</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Description</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Example</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strlen(str)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the length of a string (excluding null terminator)</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strlen("Hello")' returns 5</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strcpy(dest, src)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Copies the 'src' string to 'dest'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strcpy(s1, "Test")'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strcat(dest, src)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Concatenates (appends) 'src' to 'dest'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strcat(s1, s2)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strcmp(str1, str2)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Compares two strings lexicographically</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strcmp("abc", "abd")' returns < 0</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strncpy(dest, src, n)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Copies at most 'n' characters from 'src' to 'dest'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strncpy(s1, "Test", 3)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strncat(dest, src, n)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Appends at most 'n' characters from 'src' to 'dest'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strncat(s1, s2, 2)'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strncmp(str1, str2, n)'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Compares at most 'n' characters of two strings</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'strncmp("ab", "ac", 1)' returns 0</td></tr>
        </tbody>
    </table>
</div>

**Example: Using string functions**

\`\`\`c
#include \<stdio.h\>
#include &ltstring.h&gt // Required for string functions

int main() {
    char str1[50] = "Hello";
    char str2[] = "World";
    char str3[50];
    int len;

    // strlen() - Get length
    len = strlen(str1);
    printf("Length of str1: %d\\n", len); // Output: 5

    // strcpy() - Copy string
    strcpy(str3, str1);
    printf("Copied string (str3): %s\\n", str3); // Output: Hello

    // strcat() - Concatenate strings
    strcat(str1, " "); // Add a space first
    strcat(str1, str2); // Appends str2 to str1
    printf("Concatenated string (str1): %s\\n", str1); // Output: Hello World

    // strcmp() - Compare strings
    char s_a[] = "apple";
    char s_b[] = "banana";
    char s_c[] = "apple";

    printf("Compare s_a and s_b: %d\\n", strcmp(s_a, s_b)); // Output: < 0 (e.g., -1)
    printf("Compare s_a and s_c: %d\\n", strcmp(s_a, s_c)); // Output: 0
    printf("Compare s_b and s_a: %d\\n", strcmp(s_b, s_a)); // Output: > 0 (e.g., 1)
    
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When using 'strcpy()' and 'strcat()', ensure the destination array ('dest') is large enough to hold the combined string, including the null terminator. Failure to do so can lead to a **buffer overflow**, which is a common security vulnerability. Safer versions like 'strncpy()' and 'strncat()' exist, which allow you to specify the maximum number of characters to copy/append, helping to prevent overflows.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Strings in C are character arrays, terminated by a null character. Understanding this concept and the functions in '&ltstring.h&gt' is fundamental for handling text data effectively in C.
    </div>
</div>
`;


export default function CStringsPage({ }: { params: { courseId: string; lessonId: string } }) {

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true;

      scriptCLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptCLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
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
          currentCourseId="c"
          prevLesson="c-arrays"
          nextLesson="c-user-input"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
