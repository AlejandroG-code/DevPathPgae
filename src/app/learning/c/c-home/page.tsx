// src/app/learning/c/c-home/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LessonNavigationButtons from '@/app/_components/LessonNavigationButtons';

// Extends the Window interface to include the Prism property.
declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}


// Lesson content in Markdown format with embedded HTML.
const LESSON_CONTENT = `
# C Home

Welcome to the C Programming tutorial! This comprehensive guide will take you through the fundamentals of the C language, from basic syntax to advanced concepts like pointers and file handling. C is a foundational language that influenced many modern programming languages and is crucial for system programming, embedded systems, and game development.

## What You'll Learn:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Fundamentals:</p>
    <p class="text-gray-300">Variables, data types, operators, and basic input/output.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Control Flow:</p>
    <p class="text-gray-300">Conditional statements (\`if\`, \`else\`, \`switch\`) and loops (\`for\`, \`while\`, \`do-while\`).</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Data Structures:</p>
    <p class="text-gray-300">Arrays, strings, and an introduction to pointers.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Functions:</p>
    <p class="text-gray-300">Modularizing your code and understanding function parameters.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Memory Management:</p>
    <p class="text-gray-300">Dynamic memory allocation using \`malloc\`, \`calloc\`, \`realloc\`, and \`free\`.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Advanced Topics:</p>
    <p class="text-gray-300">Structures, unions, enums, file I/O, and more.</p>
  </div>
</div>

## Why C is Important:

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">1.</span>
    <div>
    <p class="text-vibrant-teal font-semibold mb-1">Performance:</p>
    <p class="text-gray-300">C offers direct memory manipulation, leading to highly optimized and fast applications.</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">2.</span>
    <div>
      <p class="text-gray-300">System Programming:</p>
      <p class="text-gray-300">It is the language of choice for operating systems (like Linux), embedded systems, and device drivers.</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">3.</span>
    <div>
      <p class="text-gray-300">Foundation for Other Languages:</p>
      <p class="text-gray-300">Many popular languages (C++, Java, Python, JavaScript) are built upon C or borrow heavily from its syntax and concepts.</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">4.</span>
    <div>
      <p class="text-gray-300">Portable:</p>
      <p class="text-gray-300">C programs can be compiled and run on various hardware platforms with minimal changes.</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">5.</span>
    <div>
      <p class="text-gray-300">Understanding Computer Architecture:</p>
      <p class="text-gray-300">Learning C helps in understanding how computer hardware and software interact at a low level.</p>
    </div>
  </div>
</div>

Let's embark on this journey to master the powerful C programming language!

\`\`\`c
#include <stdio.h> // Include the standard input-output library

int main() { // Main function: where program execution begins
    printf("Hello, C!\\n"); // Print text to the console
    return 0; // Indicate successful program execution
}
\`\`\`

This basic 'Hello World' program demonstrates the fundamental structure of a C program.
`;


export default function CHomePage() {

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
  }, [LESSON_CONTENT]); // dependency on LESSON_CONTENT (which is static) means it runs once.

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
          currentCourseId="c" // Hardcoded course ID, e.g., "c"
          prevLesson="" // Hardcoded previous lesson ID
          nextLesson="c-intro" // Hardcoded next lesson ID
          backToContentPath="/learning/c" // Hardcoded path to course content
        />
      </main>
    </div>
  );
}
