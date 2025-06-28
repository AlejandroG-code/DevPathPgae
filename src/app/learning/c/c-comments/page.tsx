// src/app/learning/c/c-variables/page.tsx
'use client'; 

import React, { useEffect, useState } from 'react';
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
# C Comments

Comments are used to explain code and make it more readable. They are entirely ignored by the C compiler during the compilation process and do not affect the size of the executable file or the program's speed.

## Types of Comments

### Single-Line Comments

Single-line comments in C start with two forward slashes ('//'). Any text from '//' to the end of the line is considered a comment. This style is common in C++ and was adopted into C with the C99 standard.

\`\`\`c
#include <stdio.h> // Include the standard input/output library

int main() {
    printf("Hello, World!"); // Print a message to the console
    return 0; // Indicate successful execution
}
\`\`\`

### Multi-Line Comments

Multi-line comments in C start with '/*' and end with '*/'. Any text between these delimiters is a comment, and it can span multiple lines. This is the original comment style in C.

\`\`\`c
#include <stdio.h>

/*
This is a multi-line comment.
It can explain complex parts of the code
or provide general information about a function.
It's useful for large blocks of text.
*/
int main() {
    printf("Hello, World!");
    return 0;
}
\`\`\`

## Why Use Comments?

<ul class="list-disc list-inside ml-4 text-gray-300 mb-4 space-y-1">
    <li><strong>Explaining Logic:</strong> To clarify complex or non-obvious code logic, especially algorithms or design decisions.</li>
    <li><strong>Improving Readability:</strong> To make your code easier to understand for other programmers (and for your future self!). Well-commented code is easier to maintain.</li>
    <li><strong>Temporary Debugging:</strong> To temporarily disable blocks of code without deleting them, which is useful during testing and debugging phases.</li>
    <li><strong>In-line Documentation:</strong> To provide a quick overview or details about the purpose of functions, important variables, or specific program sections.</li>
    <li><strong>Authorship and Dates:</strong> To include information about who wrote the code, when, and any modifications.</li>
</ul>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-gray-200 leading-relaxed">
        Good commenting practice is crucial for writing maintainable, collaborative, and easy-to-understand C code. Do not underestimate the power of a good comment!
    </div>
</div>
`;


export default function CCommentsPage() {
  const [] = useState(true);

  useEffect(() => {
        // Load Prism CSS
        const link = document.createElement('link');
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    
        // Load Prism core JS
        const scriptCore = document.createElement('script');
        scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
        scriptCore.async = true;
    
        scriptCore.onload = () => {
          // Load C language component after core is loaded
          const scriptCLang = document.createElement('script');
          scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
          scriptCLang.async = true;
    
          scriptCLang.onload = () => {
            // Highlight all code blocks after C language component is loaded
            if (window.Prism) {
              window.Prism.highlightAll();
            }
          };
          document.body.appendChild(scriptCLang);
        };
        document.body.appendChild(scriptCore);
    
        // Cleanup function
        return () => {
          if (document.head.contains(link)) {
            document.head.removeChild(link);
          }
          if (document.body.contains(scriptCore)) {
            document.body.removeChild(scriptCore);
          }
          const cLangScript = document.querySelector('script[src*="prism-c.min.js"]');
          if (cLangScript && document.body.contains(cLangScript)) {
            document.body.removeChild(cLangScript);
          }
        };
      }, [LESSON_CONTENT]); // Re-run effect if lesson content changes

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
          prevLesson="c-output"
          nextLesson="c-variables"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
