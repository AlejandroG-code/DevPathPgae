/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-output/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LessonSidebar from '@/app/_components/LessonSidebar'; // Asegúrate que la ruta de importación sea correcta
import { useParams } from 'next/navigation'; // Necesario para obtener courseId/lessonId para useEffect y PrismJS

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
## C Output

In C, the primary function for outputting data to the console (standard output) is printf(). This function is part of the Standard Input-Output library (<stdio.h>), which is why you always include it at the beginning of your C programs.

### The printf() Function:

printf() is a powerful function used to print formatted output. It can display text, numbers, and other values.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Basic Usage:</p>
    <p class="text-gray-300">To print a simple text string, enclose it in double quotes inside printf().</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">printf("Hello World!");</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Newline Character (\\n):</p>
    <p class="text-gray-300">By default, printf() does not add a newline at the end. Use \\n to move the cursor to the next line.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">printf("Hello World!\\n");
printf("I am learning C.");</code></pre>
  </div>
</div>

### Outputting Variables:

To output the value of variables, you use **format specifiers** inside the printf() string. A format specifier is a placeholder that is replaced by the value of a variable.

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Integer (\`%d\` or \`%i\`):</p>
    <p class="text-gray-300">Used for int (integer) variables.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int myNum = 15;
printf("My favorite number is %d.\\n", myNum);</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Floating Point (\`%f\`):</p>
    <p class="text-gray-300">Used for float or double variables.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">float myFloat = 3.14;
printf("The value of Pi is %f.\\n", myFloat);</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Character (\`%c\`):</p>
    <p class="text-gray-300">Used for char (character) variables.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">char myLetter = 'A';
printf("My initial is %c.\\n", myLetter);</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">String (\`%s\`):</p>
    <p class="text-gray-300">Used for character arrays (strings).</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">char greeting[] = "Hello";
printf("%s, World!\\n", greeting);</code></pre>
  </div>
</div>

### Combining Text and Variables:

You can combine text and multiple variables in a single printf() statement. The order of the variables after the format string must match the order of their respective format specifiers.

\`\`\`c
#include <stdio.h>

int main() {
    int myAge = 25;
    float myHeight = 1.75;
    char firstInitial = 'J';

    printf("My age is %d, my height is %f meters, and my initial is %c.\\n", myAge, myHeight, firstInitial);
    return 0;
}
\`\`\`

**Output:**

\`\`\`
My age is 25, my height is 1.750000 meters, and my initial is J.
\`\`\`

Notice that the float ;1.75; is printed as ;1.750000;. C's ;printf()' by default shows a certain precision for floating-point numbers. We'll learn how to control this later.
`;

export default function COutputPage() {
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
  }, [LESSON_CONTENT, courseId, lessonId]); // Añadido LESSON_CONTENT y params como dependencias

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
