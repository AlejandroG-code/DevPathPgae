// src/app/learning/c/c-intro/page.tsx
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
# Introduction to C

The C programming language is a powerful, general-purpose programming language developed in the early 1970s by Dennis Ritchie at Bell Labs. It was primarily designed to write the Unix operating system.

## Key Characteristics of C

<div class="bg-gradient-to-r from-gray-800 to-gray-700 border border-vibrant-teal/50 rounded-lg shadow-xl p-6 mb-6">
    <h3 class="text-2xl font-bold text-vibrant-teal mb-3">Key Characteristics of C</h3>
    <ul class="list-disc list-inside ml-4 text-gray-300 space-y-1">
        <li><strong>Procedural Language:</strong> C is a procedural language, meaning it defines a series of well-defined steps and functions to perform a task.</li>
        <li><strong>Mid-Level Language:</strong> C is often called a "mid-level" language because it combines features of both high-level languages (like readability) and low-level languages (like direct memory manipulation).</li>
        <li><strong>Statically Typed:</strong> Variables must be declared with a specific data type before use, and their type cannot change during runtime.</li>
        <li><strong>Memory Management:</strong> C provides direct memory access using pointers, giving the programmer fine-grained control over memory. This requires careful handling but allows for highly optimized code.</li>
        <li><strong>Fast and Efficient:</strong> C programs compile directly to machine code, resulting in very fast execution speeds and efficient use of system resources.</li>
        <li><strong>Portable:</strong> C code written on one system can often be compiled and run on different systems with minimal or no changes.</li>
    </ul>
</div>

## Why C Remains Relevant

Despite being developed decades ago, C remains incredibly important and widely used today:

<div class="my-6 space-y-4">
    <div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <details>
            <summary class="w-full text-left p-4 flex justify-between items-center text-white font-semibold text-lg focus:outline-none cursor-pointer">
                <span>Operating Systems and Embedded Systems</span>
                <span class="transform transition-transform duration-300 details-toggle-icon">+</span>
            </summary>
            <div class="p-4 pt-0 text-gray-300 leading-relaxed border-t border-gray-700">
                <p class="text-lg text-gray-300 leading-relaxed">
                    Kernels of popular operating systems like Linux, Windows, and macOS are largely written in C (or C++). Additionally, microcontrollers, IoT devices, and firmware often rely on C due to its efficiency and low-level control.
                </p>
            </div>
        </details>
    </div>
    <div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <details>
            <summary class="w-full text-left p-4 flex justify-between items-center text-white font-semibold text-lg focus:outline-none cursor-pointer">
                <span>Game Development and Databases</span>
                <span class="transform transition-transform duration-300 details-toggle-icon">+</span>
            </summary>
            <div class="p-4 pt-0 text-gray-300 leading-relaxed border-t border-gray-700">
                <p class="text-lg text-gray-300 leading-relaxed">
                    Game engines and performance-critical parts of games often use C/C++. Database systems like MySQL and PostgreSQL are also implemented in C.
                </p>
            </div>
        </details>
    </div>
    <div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <details>
            <summary class="w-full text-left p-4 flex justify-between items-center text-white font-semibold text-lg focus:outline-none cursor-pointer">
                <span>Compilers, Interpreters, and HPC</span>
                <span class="transform transition-transform duration-300 details-toggle-icon">+</span>
            </summary>
            <div class="p-4 pt-0 text-gray-300 leading-relaxed border-t border-gray-700">
                <p class="text-lg text-gray-300 leading-relaxed">
                    The compilers and interpreters for many other languages (e.g., Python, Ruby, JavaScript engines) are written in C. It is also vital in High-Performance Computing (HPC) for scientific simulations and numerical analysis.
                </p>
            </div>
        </details>
    </div>
    <div class="bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <details>
            <summary class="w-full text-left p-4 flex justify-between items-center text-white font-semibold text-lg focus:outline-none cursor-pointer">
                <span>Foundation for Learning</span>
                <span class="transform transition-transform duration-300 details-toggle-icon">+</span>
            </summary>
            <div class="p-4 pt-0 text-gray-300 leading-relaxed border-t border-gray-700">
                <p class="text-lg text-gray-300 leading-relaxed">
                    Understanding C provides a fundamental grasp of computer architecture and how programs interact with hardware, which is invaluable for learning other programming languages.
                </p>
            </div>
        </details>
    </div>
</div>

## C Standard Library

C comes with a rich standard library that provides functions for common tasks, such as:

<ul class="list-disc list-inside ml-4 text-gray-300 mb-4 space-y-1">
    <li><strong>Input/Output:</strong> \`printf()\`, \`scanf()\`, \`fopen()\`, \`fclose()\` (from \`&ltstdio.h&gt\`)</li>
    <li><strong>String Manipulation:</strong> \`strlen()\`, \`strcpy()\`, \`strcat()\` (from \`&ltstring.h&gt\`)</li>
    <li><strong>Memory Management:</strong> \`malloc()\`, \`calloc()\`, \`realloc()\`, \`free()\` (from \`&lttdlib.h&gt\`)</li>
    <li><strong>Mathematical Operations:</strong> \`sqrt()\`, \`pow()\`, \`sin()\`, \`cos()\` (from \`&ltmath.h&gt\`)</li>
</ul>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-gray-200 leading-relaxed">
        C is a foundational language that empowers programmers with significant control over system resources, leading to highly efficient applications. Its principles form the basis for many modern programming paradigms.
    </div>
</div>
`;


export default function CIntroPage() {

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
          prevLesson="c-home"
          nextLesson="c-get-started"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
