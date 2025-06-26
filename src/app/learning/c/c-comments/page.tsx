/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-comments/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LessonSidebar from '@/app/_components/LessonSidebar';

// Extend the Window interface to include the Prism property
declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

interface LessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

const LESSON_CONTENT = `
## C Comments

Comments are non-executable statements within your code that are ignored by the compiler. Their primary purpose is to make your code more readable and understandable for humans (including your future self!). They are crucial for explaining complex logic, documenting functions, or temporarily disabling parts of your code.

In C, there are two main types of comments:

### 1. Single-line Comments

Single-line comments start with two forward slashes (//). Anything from // to the end of the line is considered a comment.

\`\`\`c
// This is a single-line comment
int x = 10; // This comment explains the purpose of variable x
printf("Value of x: %d\\n", x); // Output the value of x
\`\`\`

### 2. Multi-line Comments

Multi-line comments start with /* and end with */. All text between these delimiters is treated as a comment, spanning multiple lines.

\`\`\`c
/*
This is a multi-line comment.
It can span across several lines
and is often used for block-level explanations
or for temporarily commenting out large sections of code.
*/

int main() {
    /* Declare a variable and initialize it */
    int y = 20;

    /*
     * Print the value of y.
     * The output will be "Value of y: 20".
     */
    printf("Value of y: %d\\n", y); 
    return 0;
}
\`\`\`

### Why Use Comments?

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Code Explanation:</p>
    <p class="text-gray-300">Explain the "why" behind your code, especially for complex algorithms or tricky logic. What does a specific function do? Why did you choose a particular approach?</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Documentation:</p>
    <p class="text-gray-300">Provide high-level overviews of modules, files, or functions, including parameters, return values, and typical usage examples.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Debugging (Temporary):</p>
    <p class="text-gray-300">You can temporarily "comment out" lines or blocks of code to isolate issues without deleting the code. This is very useful during development.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Planning/To-Do:</p>
    <p class="text-gray-300">Leave notes for yourself or other developers about pending tasks, future improvements, or areas that need refactoring.</p>
  </div>
</div>

**Best Practices for Comments:**
* **Don't state the obvious:** Comments should add value, not just repeat what the code already clearly says.
* **Keep them updated:** Outdated comments can be misleading. If you change the code, update the comments.
* **Focus on "why" not "what":** The code itself should explain "what" it does. Comments should explain "why" it does it that way.
* **Be concise and clear:** Write comments that are easy to understand and to the point.
`;

export default function CCommentsPage({ params }: LessonPageProps) {
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
    };
  }, []);

  return (
    <div className="flex"> {/* Contenedor flex para la barra lateral y el contenido */}
          <LessonSidebar/>
          <div className="ml-0 md:ml-64 flex-1"> {/* Margen para dejar espacio a la barra lateral */}
            <div className="lesson-content p-4 md:p-8 bg-gray-900 text-white rounded-lg shadow-xl min-h-screen">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ inline, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
            const match = /language-(\w+)/.exec(className || '');
            const lang = match ? match[1] : 'markup'; 

            return !inline ? (
              <pre className="my-4 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-4 text-sm">
                <code className={`language-${lang}`} {...props}>
                  {String(children).replace(/\n$/, '')}
                </code>
              </pre>
            ) : (
              <code className="bg-gray-700 text-vibrant-teal px-1 py-0.5 rounded-md text-xs" {...props}>
                {children}
              </code>
            );
          },
          h1: ({ node, ...props }) => <h1 className="text-4xl md:text-5xl font-extrabold text-vibrant-teal mb-4 mt-8 drop-shadow-md" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-white mb-3 mt-6 border-b border-gray-700 pb-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold text-vibrant-teal mb-2 mt-5" {...props} />,
          p: ({ node, ...props }) => <p className="text-lg text-gray-300 mb-4 leading-relaxed" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold text-vibrant-teal" {...props} />,
          a: ({ node, ...props }) => <a className="text-accent-purple hover:underline" {...props} />,
          table: ({ node, ...props }) => <table className="w-full text-left border-collapse my-6" {...props} />,
          th: ({ node, ...props }) => <th className="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700" {...props} />,
          td: ({ node, ...props }) => <td className="p-3 border-b border-gray-700 text-gray-300" {...props} />,
        }}
      >
        {LESSON_CONTENT}
      </ReactMarkdown>
    </div>
            </div>
            </div>
  );
}
