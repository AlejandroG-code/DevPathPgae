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
# C Conditions: if, else if, else

In C programming, decision-making is achieved using conditional statements. These statements allow you to execute different code blocks based on certain conditions.

## The 'if' Statement

The 'if' statement is used to test a condition. If the condition is true, the code block inside the 'if' statement is executed.

**Syntax:**

\`\`\`c
if (condition) {
    // Code to execute if condition is true
}
\`\`\`

## The 'else' Statement

The 'else' statement is used to execute a code block if the condition in the 'if' statement is false.

**Syntax:**

\`\`\`c
if (condition) {
    // Code to execute if condition is true
} else {
    // Code to execute if condition is false
}
\`\`\`

## The 'else if' Statement

The 'else if' statement is used to test multiple conditions. If the first condition is false, the 'else if' condition is tested. If the 'else if' condition is true, the code block inside the 'else if' statement is executed.

**Syntax:**

\`\`\`c
if (condition1) {
    // Code to execute if condition1 is true
} else if (condition2) {
    // Code to execute if condition2 is true
} else {
    // Code to execute if both condition1 and condition2 are false
}
\`\`\`

## Example: Using 'if', 'else if', and 'else'

This program will demonstrate the use of 'if', 'else if', and 'else' statements.

\`\`\`c
#include <stdio.h>

int main() {
    int number;

    printf("Enter a number: ");
    scanf("%d", &number);

    if (number > 0) {
        printf("The number is positive.\\n");
    } else if (number < 0) {
        printf("The number is negative.\\n");
    } else {
        printf("The number is zero.\\n");
    }

    return 0;
}
\`\`\`

In this example, the program will prompt the user to enter a number. It will then check if the number is positive, negative, or zero and print the appropriate message.

## Nested 'if' Statements

You can also nest 'if' statements inside other 'if' statements to create more complex conditions.

**Syntax:**

\`\`\`c
if (condition1) {
    // Code to execute if condition1 is true
    if (condition2) {
        // Code to execute if condition2 is true
    }
}
\`\`\`

## Example: Nested 'if' Statements

This program will demonstrate the use of nested 'if' statements.

\`\`\`c
#include <stdio.h>

int main() {
    int number;

    printf("Enter a number: ");
    scanf("%d", &number);

    if (number >= 0) {
        if (number == 0) {
            printf("The number is zero.\\n");
        } else {
            printf("The number is positive.\\n");
        }
    } else {
        printf("The number is negative.\\n");
    }

    return 0;
}
\`\`\`

In this example, the program will prompt the user to enter a number. It will then check if the number is positive, negative, or zero using nested 'if' statements.

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Important!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always use proper indentation to make your code more readable, especially when using nested 'if' statements.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use 'else if' statements to test multiple conditions and avoid deeply nested 'if' statements.
    </div>
</div>
`;


export default function CConditionsPage({ params }: { params: Promise<{ courseId: string; lessonId: string; }> }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        
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
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [params]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-vibrant-teal mx-auto mb-4"></div>
          <p className="text-vibrant-teal text-xl font-semibold">Loading lesson...</p>
        </div>
      </div>
    );
  }

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
          prevLesson="c-variables"
          nextLesson="c-loops"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}