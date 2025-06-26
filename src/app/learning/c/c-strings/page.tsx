/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-strings/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LessonSidebar from '@/app/_components/LessonSidebar'; // Adjust path if _components is not used
import { useParams } from 'next/navigation'; // Needed for useEffect dependencies

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
## C Strings

In C, a string is a sequence of characters terminated with a null character (\\0). Strings are stored as arrays of characters.

### Declaring and Initializing Strings

You can declare a string in a few ways:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">1. Using a character array (Recommended):</p>
    <p class="text-gray-300">The size of the array should be one more than the number of characters in the string to accommodate the null terminator.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">char greeting[] = "Hello"; // Compiler determines size (6: 'H','e','l','l','o','\\0')
char name[20] = "John"; // Explicit size, remaining space is filled with \\0</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">2. Using a pointer (for string literals):</p>
    <p class="text-gray-300">Creates a pointer to a string literal (which is stored in read-only memory). You cannot modify the string's content if declared this way.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">char *message = "Welcome!"; // 'message' points to "Welcome!"</code></pre>
  </div>
</div>

### Accessing Characters in a String

Characters in a string are accessed using their index, similar to arrays. The first character is at index 0.

\`\`\`c
#include <stdio.h>

int main() {
    char greeting[] = "Hello";
    printf("%c\\n", greeting[0]); // Output: H
    printf("%c\\n", greeting[4]); // Output: o
    return 0;
}
\`\`\`

### Changing Characters in a String

You can change individual characters in a string (if it's a character array, not a string literal pointed to by a 'char*'').

\`\`\`c
#include <stdio.h>

int main() {
    char greeting[] = "Hello";
    greeting[0] = 'J'; // Change 'H' to 'J'
    printf("%s\\n", greeting); // Output: Jello
    return 0;
}
\`\`\`

### Input Strings

To get input from a user for a string, you can use 'scanf()' (for single words) or 'fgets()' (for multi-word strings, including spaces).

\`\`\`c
#include <stdio.h>

int main() {
    char fullName[50];

    printf("Enter your full name: ");
    // fgets(array_name, size, stdin)
    fgets(fullName, sizeof(fullName), stdin); 
    
    printf("Hello, %s", fullName); // Note: fgets includes the newline character

    return 0;
}
\`\`\`

**Note on 'fgets()':** 'fgets()' includes the newline character ('\\n') if the user presses Enter before the buffer is full. You often need to remove this newline manually.`;

export default function CStringsPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();

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
  }, [LESSON_CONTENT, courseId, lessonId]);

  return (
    <div className="flex min-h-screen"> 
      <LessonSidebar /> 
      
      <main className="flex-1 ml-0 md:ml-64"> 
        <div className="lesson-content p-4 md:p-8 bg-gray-900 text-white rounded-lg shadow-xl">
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
      </main>
    </div>
  );
}
