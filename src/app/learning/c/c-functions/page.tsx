/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-functions/page.tsx
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
## C Functions

Functions are blocks of code that perform a specific task. They are designed to promote modularity, reusability, and readability in your programs. Instead of writing all the logic in one large 'main()' function, you can break down your program into smaller, manageable functions.

### Why Use Functions?

* **Modularity:** Break down complex problems into smaller, easier-to-manage pieces.
* **Reusability:** Write a function once and use it multiple times in your program or even in different programs.
* **Readability:** Make your code easier to understand and debug by organizing related code into functions with clear names.
* **Maintainability:** Changes in one part of the program are less likely to affect other parts if code is modularized.

### Creating a Function

In C, a function typically has the following structure:

\`\`\`c
returnType functionName(parameter1Type parameter1Name, parameter2Type parameter2Name, ...) {
    // code to be executed
    return value; // Optional, if returnType is not void
}
\`\`\`

* **returnType:** Specifies the data type of the value that the function will return (e.g., 'int', 'float', 'char', or 'void' if it doesn't return anything).
* **functionName:** The name of the function. It should be descriptive of the task the function performs.
* **parameters:** A comma-separated list of inputs that the function accepts. Each parameter must have a type and a name. (Optional)
* **Function Body:** The code inside the curly braces '{}' that performs the function's task.
* **return statement:** (Optional) Used to send a value back to the caller.

### Example: A Simple Function

Let's create a simple function named 'sayHello' that prints a greeting. This function doesn't take any parameters and doesn't return any value, so its 'returnType' is 'void'.

\`\`\`c
#include <stdio.h>

// Function definition: sayHello
void sayHello() { // void means the function does not return a value
    printf("Hello from a function!\\n");
}

int main() {
    // Call the function
    sayHello(); // This executes the code inside sayHello()

    return 0;
}
\`\`\`

**Output:**

\`\`\`
Hello from a function!
\`\`\`

### Function Declaration (Prototype)

In C, if you define a function *after* the 'main()' function or any other function that calls it, you must first **declare** the function (provide its prototype) at the beginning of the program (usually before 'main()'). This tells the compiler about the function's existence, its return type, and its parameters, allowing the compiler to validate calls to that function before it sees its full definition.

\`\`\`c
#include <stdio.h>

// Function Declaration (Prototype)
// Tells the compiler that sayGoodbye exists, returns void, and takes no parameters.
void sayGoodbye(); 

int main() {
    sayGoodbye(); // Function call
    return 0;
}

// Function Definition (the actual implementation)
void sayGoodbye() {
    printf("Goodbye from a function!\\n");
}
\`\`\`

If 'sayGoodbye()' was defined *before* 'main()', the declaration would not be strictly necessary, but it's good practice for clarity and for larger projects.

Functions are the building blocks of modular C programs, enabling you to write organized, reusable, and maintainable code.
`;

export default function CFunctionsPage() {
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
