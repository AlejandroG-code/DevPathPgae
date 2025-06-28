// src/app/learning/c/c-function-declaration/page.tsx
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
# C Function Declaration (Prototypes)

A function in C must be **declared** before it is called. This declaration, also known as a **function prototype**, provides the compiler with essential information about the function, allowing it to perform type checking and generate correct code even if the function's full definition appears later in the file or in a separate file.

## Why are Function Prototypes Necessary?

In C, the compiler processes code sequentially from top to bottom. If a function is called before its definition, the compiler wouldn't know:
-   What values it expects (parameters' types).
-   What type of value it returns.
-   If it even exists.

A function prototype solves this "chicken-and-egg" problem by providing a forward declaration.

## Syntax of a Function Prototype

\`\`\`c
returnType functionName(parameterType1, parameterType2, ...);
\`\`\`

-   'returnType': The data type of the value the function returns.
-   'functionName': The name of the function.
-   'parameterType1, ...': A comma-separated list of the data types of the parameters. The parameter names themselves are optional in the prototype, but including them can improve readability.
-   ';': A semicolon at the end is crucial to denote it as a declaration, not a definition.

**Example Prototypes:**

\`\`\`c
int add(int a, int b);       // Parameter names included (good practice)
void printMessage(char *);   // Parameter name omitted for char pointer
float calculate_average(float, int); // Parameter names omitted
\`\`\`

## Placement of Function Prototypes

Function prototypes are typically placed in one of two locations:

### 1. At the Top of the Source File

If all functions are used only within a single '.c' file, their prototypes can be placed at the beginning of that file, before 'main()' and before any function definitions.

**Example:**

\`\`\`c
#include <stdio.h>

// Function Prototypes
void sayHello();
int add(int x, int y);
double getPI();

int main() {
    sayHello();
    int sum = add(5, 3);
    printf("Sum: %d\\n", sum);
    printf("PI: %lf\\n", getPI());
    return 0;
}

// Function Definitions (can be anywhere after their prototypes)
void sayHello() {
    printf("Hello!\\n");
}

int add(int x, int y) {
    return x + y;
}

double getPI() {
    return 3.14159;
}
\`\`\`

### 2. In Header Files ('.h' files)

For larger projects and multi-file compilation, it's common practice to place function prototypes in separate **header files** (with a '.h' extension). Source files then include these header files using '#include'.

**Example Structure:**

-   **'my_functions.h'**:
    \`\`\`c
    #ifndef MY_FUNCTIONS_H
    #define MY_FUNCTIONS_H

    // Function Prototypes
    void sayHello();
    int add(int x, int y);

    #endif
    \`\`\`

-   **'my_functions.c'**:
    \`\`\`c
    #include "my_functions.h" // Include its own header first
    #include <stdio.h>

    // Function Definitions
    void sayHello() {
        printf("Hello from my_functions!\\n");
    }

    int add(int x, int y) {
        return x + y;
    }
    \`\`\`

-   **'main.c'**:
    \`\`\`c
    #include <stdio.h>
    #include "my_functions.h" // Include the custom header file

    int main() {
        sayHello();
        int result = add(10, 20);
        printf("Result: %d\\n", result);
        return 0;
    }
\`\`\`

When compiling 'main.c' and 'my_functions.c' together (e.g., 'gcc main.c my_functions.c -o my_program'), the compiler processes the prototypes in 'my_functions.h' first, ensuring it knows about 'sayHello' and 'add' before they are called in 'main.c'.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Function prototypes are vital for informing the compiler about functions defined later or in separate files. They enable proper type checking and modular program design. In larger projects, organizing prototypes in header files is standard practice.
    </div>
</div>
`;


export default function CFunctionDeclarationPage({ }: { params: { courseId: string; lessonId: string } }) {

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
          prevLesson="c-scope"
          nextLesson="c-recursion"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
