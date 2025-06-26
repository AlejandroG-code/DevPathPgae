/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-function-declaration/page.tsx
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
## C Function Declaration (Prototypes)

In C, a function must be declared before it is called. This declaration, also known as a **function prototype**, tells the compiler about the function's existence, its return type, its name, and the number and types of its parameters. This information allows the compiler to check for correct usage of the function when it's called.

### Why Function Prototypes are Necessary

The C compiler processes code sequentially from top to bottom. If 'main()' (or any other function) tries to call a function that is defined *after* 'main()', the compiler won't know anything about that function's signature yet, leading to a "function not declared" error or warning.

A prototype solves this by providing forward declaration.

### Syntax for Function Prototype

\`\`\`c
returnType functionName(parameter1Type, parameter2Type, ...); // Note the semicolon!
\`\`\`

* **'eturnType'**: The data type of the value the function returns.
* **'functionName'**: The name of the function.
* **'parameter1Type, parameter2Type, ...'**: The data types of the parameters, in order. The parameter names are optional in the prototype but are often included for readability.
* **'';'**: A semicolon at the end is crucial.

### Example: Function Defined After 'main()'

\`\`\`c
#include <stdio.h>

// Function Prototype (Declaration)
// Tells the compiler that 'add' exists, returns an int, and takes two ints.
int add(int a, int b); 

int main() {
    int result = add(10, 5); // Call the function
    printf("Sum: %d\\n", result);
    return 0;
}

// Function Definition (Implementation)
// This must match the prototype
int add(int a, int b) {
    return a + b;
}
\`\`\`

Without the prototype 'int add(int a, int b);' before 'main()'', the compiler would likely issue a warning about 'add' being implicitly declared or an error about it not being declared.

### Benefits of Function Prototypes

* **Compiler Type Checking:** Allows the compiler to check the types of arguments passed during a function call against the types defined in the prototype. This helps catch errors early.
* **Code Organization:** Promotes better code organization by allowing you to place function definitions after 'main()' or in separate files, making 'main()' cleaner and easier to read.
* **Header Files:** Prototypes are extensively used in header files ('.h' files). When you '#include' a header, you are typically including a set of function prototypes that make those functions available to your source file.

### Function Defined Before 'main()'

If a function's full definition appears *before* its first call (e.g., before 'main()'), then a separate function prototype is not strictly necessary, as the compiler already knows its signature.

\`\`\`c
#include <stdio.h>

// Function Definition (Implementation) is placed before main()
void sayHello() {
    printf("Hello there!\\n");
}

int main() {
    sayHello(); // Call the function
    return 0;
}
\`\`\`

Even in this case, many programmers still include prototypes for consistency and clarity, especially in larger projects.

Function prototypes are a fundamental aspect of C programming, ensuring proper function usage and enabling modular program design.
`;

export default function CFunctionDeclarationPage({ params }: LessonPageProps) {
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
