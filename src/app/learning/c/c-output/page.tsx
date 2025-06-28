// src/app/learning/c/c-output/page.tsx
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
# C Output

In C, output is primarily handled using functions available in the standard input/output library, '<stdio.h>'. The most common function for displaying output to the console is 'printf()'.

## The 'printf()' Function

The 'printf()' function is used to print formatted output to the standard output device (usually the console).

**Syntax:**

\`\`\`c
printf("format string", arg1, arg2, ...);
\`\`\`

-   'format string': A string containing text and optional format specifiers.
-   'arg1, arg2, ...': Optional arguments whose values are formatted and inserted into the format string.

## Common Format Specifiers

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Specifier</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Description</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Example</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%d' or '%i'</td><td class="p-3 border-b border-gray-700 text-gray-300">Prints an integer</td><td class="p-3 border-b border-gray-700 text-gray-300">'age = %d'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%f'</td><td class="p-3 border-b border-gray-700 text-gray-300">Prints a floating-point number (single precision)</td><td class="p-3 border-b border-gray-700 text-gray-300">'price = %f'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%c'</td><td class="p-3 border-b border-gray-700 text-gray-300">Prints a single character</td><td class="p-3 border-b border-gray-700 text-gray-300">'initial = %c'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%s'</td><td class="p-3 border-b border-gray-700 text-gray-300">Prints a string (character array)</td><td class="p-3 border-b border-gray-700 text-gray-300">'name = %s'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%p'</td><td class="p-3 border-b border-gray-700 text-gray-300">Prints a pointer address</td><td class="p-3 border-b border-gray-700 text-gray-300">'ptr = %p'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%u'</td><td class="p-3 border-b border-gray-700 text-gray-300">Prints an unsigned integer</td><td class="p-3 border-b border-gray-700 text-gray-300">'count = %u'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%ld'</td><td class="p-3 border-b border-gray-700 text-gray-300">Prints a long integer</td><td class="p-3 border-b border-gray-700 text-gray-300">'big_num = %ld'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%lf'</td><td class="p-3 border-b border-gray-700 text-gray-300">Used with 'scanf()' for 'double', but just '%f' for 'printf()'</td><td class="p-3 border-b border-gray-700 text-gray-300">'value = %lf'</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'%%'</td><td class="p-3 border-b border-gray-700 text-gray-300">Prints a literal percent sign (%)</td><td class="p-3 border-b border-gray-700 text-gray-300">'percentage = 100%%'</td></tr>
        </tbody>
    </table>
</div>

## Basic 'printf()' Examples

\`\`\`c
#include <stdio.h>

int main() {
    // Printing a simple string
    printf("Hello, C Programming!\\n"); // \\n is a newline character

    // Printing an integer
    int age = 25;
    printf("My age is: %d\\n", age);

    // Printing a float
    float price = 99.99f;
    printf("The price is: %.2f\\n", price); // .2f formats to 2 decimal places

    // Printing a character
    char initial = 'A';
    printf("My initial is: %c\\n", initial);

    // Printing a string (character array)
    char greeting[] = "Greetings!"; // A string in C is an array of characters
    printf("%s\\n", greeting);

    // Printing multiple variables
    int item_count = 5;
    double total_cost = 125.50;
    printf("You bought %d items for a total of $%.2f.\\n", item_count, total_cost);

    return 0;
}
\`\`\`

## Escape Sequences

Escape sequences are special character combinations that start with a backslash (') and are used to represent non-printable characters or characters that have special meaning within a string.

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Sequence</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Description</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'\\n'</td><td class="p-3 border-b border-gray-700 text-gray-300">Newline character</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'\\t'</td><td class="p-3 border-b border-gray-700 text-gray-300">Horizontal tab</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'\\b'</td><td class="p-3 border-b border-gray-700 text-gray-300">Backspace</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'\\r'</td><td class="p-3 border-b border-gray-700 text-gray-300">Carriage return</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'\\f'</td><td class="p-3 border-b border-gray-700 text-gray-300">Form feed</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'\\''</td><td class="p-3 border-b border-gray-700 text-gray-300">Single quote</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'\\"'</td><td class="p-3 border-b border-gray-700 text-gray-300">Double quote</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300">'\\\\\\'</td><td class="p-3 border-b border-gray-700 text-gray-300">Backslash</td></tr>
        </tbody>
    </table>
</div>

\`\`\`c
#include <stdio.h>

int main() {
    printf("This is line one.\\nThis is line two.\\n");
    printf("Tabbed text:\\tItem1\\tItem2\\n");
    printf("He said, \\\"Hello!\\\"\\n");
    printf("A backslash: \\\\\\n");
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-gray-200 leading-relaxed">
        The 'printf()' function is your primary tool for communicating information from your C program to the user through the console.
    </div>
</div>
`;


export default function COutputPage() {

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
          prevLesson="c-syntax"
          nextLesson="c-comments"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
