// src/app/learning/c/c-scope/page.tsx
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
# C Scope

The 'scope' of a variable or function in C determines the region of the program where it can be accessed or referenced. Understanding scope is crucial for avoiding naming conflicts and ensuring that variables are used correctly.

C primarily defines three types of scope:

1.  **Block Scope (Local Scope)**
2.  **Function Scope** (specific to 'goto' labels, less common for variables)
3.  **File Scope (Global Scope)**

## 1. Block Scope (Local Scope)

Variables declared inside a block (a pair of curly braces '{ }') have block scope. They are accessible only within that block, and their lifetime extends only until the end of that block. Once the block is exited, the variable is destroyed, and its memory is reclaimed.

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    int x = 10; // 'x' has block scope (within main)

    if (x > 5) {
        int y = 20; // 'y' has block scope (within this if block)
        printf("Inside if block: x = %d, y = %d\\n", x, y);
    }

    // printf("Outside if block: y = %d\\n", y); // ERROR: 'y' is out of scope here
    printf("Outside if block: x = %d\\n", x); // 'x' is still in scope

    for (int i = 0; i < 3; i++) {
        // 'i' has block scope (within the for loop) (C99 standard and later)
        printf("Inside for loop: i = %d\\n", i);
    }
    // printf("Outside for loop: i = %d\\n", i); // ERROR: 'i' is out of scope here

    return 0;
}
\`\`\`

## 2. File Scope (Global Scope)

Variables and functions declared outside of any function, at the top level of a source file, have file scope (or global scope). They are accessible from any function within that same file, from the point of their declaration to the end of the file.

Global variables are initialized to zero by default if not explicitly initialized.

**Example:**

\`\`\`c
#include <stdio.h>

int globalVar = 100; // 'globalVar' has file scope (global)

void myFunction() {
    printf("Inside myFunction: globalVar = %d\\n", globalVar); // Accessible here
    globalVar = 200; // Can be modified here
}

int main() {
    printf("Inside main: globalVar = %d\\n", globalVar); // Accessible here (Output: 100)
    myFunction();
    printf("Inside main after myFunction: globalVar = %d\\n", globalVar); // Output: 200
    return 0;
}
\`\`\`

### Dangers of Global Variables:

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While convenient, excessive use of global variables is generally discouraged in larger programs. They can lead to:
        <ul class="list-disc list-inside ml-4 mt-2">
            <li><strong>Reduced Readability:</strong> It's hard to tell which function modified a global variable.</li>
            <li><strong>Debugging Difficulty:</strong> Bugs involving global variables can be hard to trace.</li>
            <li><strong>Tight Coupling:</strong> Functions become dependent on global state, reducing modularity and reusability.</li>
            <li><strong>Security Issues:</strong> Global data is less protected from unintended modification.</li>
        </ul>
        Prefer passing data via function parameters or returning values where possible.
    </div>
</div>

## Variable Hiding (Shadowing)

If a local variable has the same name as a global variable, the local variable takes precedence within its scope. This is called variable hiding or shadowing.

\`\`\`c
#include <stdio.h>

int myNum = 100; // Global variable

void anotherFunction() {
    printf("Inside anotherFunction: global myNum = %d\\n", myNum); // Accesses global myNum
}

int main() {
    int myNum = 50; // Local variable 'myNum' hides the global 'myNum' in main's scope

    printf("Inside main: local myNum = %d\\n", myNum);   // Output: 50
    anotherFunction();                               // Output: 100 (anotherFunction sees global)
    printf("Inside main: local myNum = %d\\n", myNum);   // Output: 50 (local is still 50)
    return 0;
}
\`\`\`

## Static Variables (within functions)

When the 'static' keyword is used with a local variable (inside a function), it gives that variable **static storage duration**, meaning it retains its value between function calls. However, it still has **block scope**, meaning it's only accessible within that function.

\`\`\`c
#include <stdio.h>

void counter() {
    static int count = 0; // 'count' is initialized only once
    count++;
    printf("Count: %d\\n", count);
}

int main() {
    counter(); // Output: Count: 1
    counter(); // Output: Count: 2
    counter(); // Output: Count: 3
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Mastering variable scope is crucial for writing robust and predictable C programs. Use local variables whenever possible to limit their accessibility and reduce potential side effects.
    </div>
</div>
`;


export default function CScopePage({ }: { params: { courseId: string; lessonId: string } }) {

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
    // Custom renderers for markdown elements to apply Tailwind CSS
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
          prevLesson="c-function-parameters"
          nextLesson="c-function-declaration"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
