/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-syntax/page.tsx
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
## C Syntax

C syntax refers to the set of rules that define how a well-formed C program is written. Understanding the syntax is fundamental to writing code that the C compiler can understand and translate.

### Basic Structure of a C Program:

Every C program has a fundamental structure:

\`\`\`c
#include <stdio.h> // Preprocessor directive: includes standard input/output library

// Function declarations (prototypes) or global variables can go here

int main() { // Main function: program's entry point
    // Local variable declaration
    int age = 30; // Statement ends with a semicolon

    // Statements (instructions)
    printf("Hello, the age is: %d.\\n", age); // Prints formatted output
    
    // Single-line comment

    /*
     * Multi-line
     * comment block
     */

    return 0; // Return statement: indicates successful execution
}

// Definitions of other functions can go here
void greet(char* name) { // Example of another function
    printf("Hello, %s!\\n", name);
}
\`\`\`

### Key Syntax Elements:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">1. Preprocessor Directives:</p>
    <p class="text-gray-300">Lines starting with # (e.g., #include, #define). They are processed before actual compilation.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">2. main() Function:</p>
    <p class="text-gray-300">The entry point of every C program. Execution always begins here. It must return an int (0 for success).</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">3. Statements & Semicolons:</p>
    <p class="text-gray-300">Every C statement (instruction) must end with a <strong>semicolon (;)</strong>. This tells the compiler where one statement ends and the next begins.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">4. Code Blocks ({ }):</p>
    <p class="text-gray-300">Curly braces define a block of code. Used for function bodies, loops, conditional statements, etc.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">5. Comments:</p>
    <p class="text-gray-300">Ignored by the compiler, used to explain code for human readers. Single-line (//) or multi-line (/* ... */).</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">6. Case-Sensitivity:</p>
    <p class="text-gray-300">C is case-sensitive. 'myVar' and 'myvar' are treated as different names.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">7. Whitespace:</p>
    <p class="text-gray-300">Spaces, tabs, and newlines are generally ignored by the compiler and used for formatting code for readability.</p>
  </div>
</div>

Mastering C syntax is the first step towards writing functional and error-free C programs. Always pay close attention to semicolons, curly braces, and case-sensitivity.
`;

export default function CSyntaxPage({ params }: LessonPageProps) {
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
        // No bash examples in this lesson, but keep for consistency or remove if not needed elsewhere.
        // const scriptBashLang = document.createElement('script'); 
        // scriptBashLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js';
        // scriptBashLang.async = true;
        // scriptBashLang.onload = () => { /* ... */ };
        // document.body.appendChild(scriptBashLang);

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
