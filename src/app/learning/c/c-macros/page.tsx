/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-macros/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams } from 'next/navigation';

import LessonNavigationButtons from '@/app/_components/LessonNavigationButtons';

declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

interface LessonMetadata {
  id: string;
  title: string;
  description: string;
}

const LESSON_CONTENT = `
# C Macros

Macros are symbolic names or fragments of code that are replaced by their definitions before compilation, during a phase called **preprocessing**. They are defined using the '#define' preprocessor directive. Macros are primarily used for defining constants, creating simple "function-like" replacements, and conditional compilation.

## Types of Macros

There are two main types of macros:

1.  **Object-like Macros:** Simple text replacements.
2.  **Function-like Macros:** Text replacements that can take arguments.

## 1. Object-like Macros

These are used to define symbolic constants, similar to 'const' variables, but processed by the preprocessor.

**Syntax:**

\`\`\`c
#define MACRO_NAME replacement_text
\`\`\`

-   'MACRO_NAME': The name of the macro (conventionally in uppercase).
-   'replacement_text': The text that will replace 'MACRO_NAME' wherever it appears in the code.

**Example:**

\`\`\`c
#include <stdio.h>

#define PI 3.14159
#define MAX_ATTEMPTS 3
#define GREETING "Hello, C Programmer!"

int main() {
    double radius = 5.0;
    double area = PI * radius * radius;
    printf("Area of circle: %.2lf\\n", area);

    for (int i = 0; i < MAX_ATTEMPTS; i++) {
        printf("Attempt %d of %d\\n", i + 1, MAX_ATTEMPTS);
    }
    
    printf("%s\\n", GREETING);

    return 0;
}
\`\`\`

**Note:** Macros do not end with a semicolon in their definition, as they are text substitutions. If you add one, it becomes part of the replacement text, which can lead to unexpected behavior.

## 2. Function-like Macros

These macros behave like functions but are also handled by the preprocessor. They take arguments, and these arguments are directly substituted into the macro's replacement text.

**Syntax:**

\`\`\`c
#define MACRO_NAME(parameter1, parameter2, ...) replacement_text_using_parameters
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

// Macro to find the maximum of two numbers
#define MAX(a, b) ((a) > (b) ? (a) : (b))

// Macro to calculate the square of a number
#define SQUARE(x) ((x) * (x))

int main() {
    int num1 = 10, num2 = 20;
    printf("Max of %d and %d is %d\\n", num1, num2, MAX(num1, num2)); // MAX(10, 20) expands to ((10) > (20) ? (10) : (20))

    int val = 5;
    printf("Square of %d is %d\\n", val, SQUARE(val)); // SQUARE(5) expands to ((5) * (5))

    // Beware of side effects without proper parentheses!
    // Example: SQUARE(val + 1) might expand to ((val + 1) * (val + 1)) which is correct.
    // Without parentheses: #define BAD_SQUARE(x) x * x
    // BAD_SQUARE(val + 1) expands to val + 1 * val + 1 which evaluates to val + (1 * val) + 1. Incorrect!
    printf("Square of (val + 1) = %d\\n", SQUARE(val + 1));

    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Pitfalls of Function-like Macros</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While convenient, function-like macros can be tricky and lead to subtle bugs:
        <ul class="list-disc list-inside ml-4 mt-2">
            <li><strong>Side Effects:</strong> If arguments have side effects (e.g., 'i++'), they might be evaluated multiple times. <br/> Example: 'MAX(i++, j)' could increment 'i' twice.</li>
            <li><strong>Parentheses:</strong> Always enclose macro arguments and the entire macro definition in parentheses to avoid issues with operator precedence. See the 'SQUARE' example above.</li>
            <li><strong>Debugging:</strong> Macros are expanded by the preprocessor, so debuggers often cannot step into them directly, making debugging difficult.</li>
            <li><strong>Type Safety:</strong> Macros are not type-checked. They perform simple text substitution. Functions, on the other hand, enforce type safety.</li>
        </ul>
        For complex operations, or where type safety and debugging are crucial, prefer using inline functions (C99 and later) or regular functions over macros.
    </div>
</div>

## Predefined Macros

C provides several predefined macros that give information about the compilation process:

-   '__FILE__': The current source filename (string literal).
-   '__LINE__': The current line number (integer constant).
-   '__DATE__': The date of compilation (string literal in "Mmm dd yyyy" format).
-   '__TIME__': The time of compilation (string literal in "hh:mm:ss" format).
-   '__STDC__': Defined as 1 if the compiler conforms to the C standard.

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    printf("This file: %s\\n", __FILE__);
    printf("Current line: %d\\n", __LINE__);
    printf("Compiled on: %s at %s\\n", __DATE__, __TIME__);

    #ifdef __STDC__
        printf("Compiler conforms to C standard.\\n");
    #endif

    return 0;
}
\`\`\`

## Conditional Compilation

Macros are extensively used for conditional compilation, allowing parts of the code to be included or excluded based on conditions. This is done using '#ifdef', '#ifndef', '#if', '#elif', '#else', and '#endif'.

**Example:**

\`\`\`c
#include <stdio.h>

#define DEBUG // Define DEBUG to include debug code

int main() {
    printf("Program started.\\n");

    #ifdef DEBUG // If DEBUG is defined
        printf("DEBUG: Debug mode is active.\\n");
    #else        // Otherwise
        printf("DEBUG: Debug mode is inactive.\\n");
    #endif

    printf("Program finished.\\n");
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Macros are a powerful preprocessor feature for defining constants, creating lightweight "functions", and enabling conditional compilation. Use them judiciously, especially function-like macros, being mindful of their text-substitution nature and potential pitfalls.
    </div>
</div>
`;

interface CMacrosPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function CMacrosPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { courseId, lessonId } = params;

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
          prevLesson="c-input-validation"
          nextLesson="c-projects"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
