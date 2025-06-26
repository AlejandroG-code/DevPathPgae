/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-constants/page.tsx
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
## C Constants

Constants are like variables, but their values cannot be changed once they are defined. They are fixed values that are used in your program. In C, you can define constants in two main ways: using the const keyword or using the #define preprocessor directive.

### 1. Using the const Keyword

The const keyword is a type qualifier that tells the compiler that the value of a variable cannot be modified after its initialization. It's often preferred for defining "true" constants within the scope of a function or block.

\`\`\`c
#include <stdio.h>

int main() {
    // Declaring a constant integer
    const int MY_FAVORITE_NUMBER = 7; 
    printf("My favorite number is: %d\\n", MY_FAVORITE_NUMBER);

    // Attempting to change a const variable will result in a compile-time error
    // MY_FAVORITE_NUMBER = 10; // This line would cause an error!

    const float PI = 3.14159f; // Constants for floating-point numbers
    printf("Value of PI: %.4f\\n", PI);

    const char NEWLINE = '\\n'; // Constant for a character
    printf("This is a new line character: %c", NEWLINE);
    printf("End of message.\\n");
    
    return 0;
}
\`\`\`

**Key points about const:**
* You must initialize a const variable when you declare it.
* The compiler enforces the immutability, providing an error if you try to modify it.
* It respects block scope, meaning a const variable defined inside a function is only visible within that function.

### 2. Using the #define Preprocessor Directive

The #define directive is a preprocessor command. This means that the value is substituted *before* the program is compiled. When the preprocessor encounters a '#define', it globally replaces all occurrences of the macro name with the defined value throughout the code.

\`\`\`c
#include <stdio.h>

// Defining constants using #define (no semicolon at the end!)
#define MAX_ATTEMPTS 3
#define PROGRAM_NAME "My Awesome App"
#define GRAVITY 9.81

int main() {
    printf("Maximum login attempts: %d\\n", MAX_ATTEMPTS);
    printf("Welcome to %s!\\n", PROGRAM_NAME);
    printf("Acceleration due to gravity: %.2f m/s^2\\n", GRAVITY);
    
    // MAX_ATTEMPTS = 5; // This would result in a preprocessor error/warning if attempted
    return 0;
}
\`\`\`

**Key points about #define:**
* There is no semicolon at the end of a '#define' line.
* It performs a simple text substitution. The constant doesn't actually exist as a variable in memory.
* It's typically used for global constants or short, frequently used values.
* It does not respect block scope; once defined, it's available from that point onward in the file.

### When to Use Which?

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Use \`const\` when:</p>
    <ul class="list-disc list-inside text-gray-300">
      <li>You need type safety (the compiler checks the type).</li>
      <li>You want the constant to respect scope (e.g., local to a function).</li>
      <li>You want to store complex data types as constants (e.g., arrays, structs - though this can be advanced).</li>
      <li>It's generally considered the modern and safer approach for defining constants.</li>
    </ul>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Use \`#define\` when:</p>
    <ul class="list-disc list-inside text-gray-300">
      <li>You need simple symbolic constants that will be replaced everywhere they appear.</li>
      <li>You are defining simple values like numbers or short strings that don't require type checking.</li>
      <li>You need to create macros (code snippets that are replaced, which is a more advanced topic).</li>
    </ul>
  </div>
</div>

In general, for defining numeric or string constants, const is often preferred due to its type safety and adherence to scope rules, making code easier to debug and maintain. However, #define remains a powerful tool, especially for global configuration values or when creating macros.
`;

export default function CConstantsPage({ params }: LessonPageProps) {
  // Obtenemos courseId y lessonId de params aquí para usarlos en useEffect si es necesario
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
  }, [LESSON_CONTENT, courseId, lessonId]); // Se añadió Lesson_CONTENT y los params como dependencias para consistencia.

  return (
    <div className="flex min-h-screen"> 
      {/* Componente de la barra lateral de navegación. */}
      <LessonSidebar /> 
      
      {/* Contenedor del contenido principal de la lección.
          flex-1: Hace que ocupe todo el espacio horizontal restante.
          ml-0: Sin margen izquierdo por defecto (para móvil).
          md:ml-64: Añade un margen izquierdo de 64 unidades (16rem, ancho de la sidebar) en pantallas medianas y grandes.
                    Esto empuja el contenido para que no quede debajo de la sidebar fija.
      */}
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
