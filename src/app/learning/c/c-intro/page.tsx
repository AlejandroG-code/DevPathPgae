/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-intro/page.tsx
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
## Introduction to C

C is a general-purpose programming language, developed by Dennis Ritchie at Bell Labs between 1969 and 1973. It was primarily designed to implement the UNIX operating system.

### Key Characteristics of C:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Mid-level Language:</p>
    <p class="text-gray-300">C combines features of high-level languages (easy for humans to understand) and low-level languages (direct access to memory and hardware).</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Compiled Language:</p>
    <p class="text-gray-300">C code must be compiled before it can be executed. A compiler translates the C source code into machine code.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Modularity:</p>
    <p class="text-gray-300">Allows the division of programs into functions and modules, making code management and reuse easier.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Rich Library Set:</p>
    <p class="text-gray-300">C comes with a set of standard libraries that provide predefined functions for common tasks.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Case-sensitive:</p>
    <p class="text-gray-300">C distinguishes between uppercase and lowercase (e.g., \`variable\` and \`Variable\` are different).</p>
  </div>
</div>

### How a C Program Works:

The typical process for running a C program involves the following steps:

<div class="grid grid-cols-1 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">1.</span>
    <div>
      <p class="text-vibrant-teal font-semibold mb-1">Editing:</p>
      <p class="text-gray-300">You write your source code in a text editor and save it with a \`.c\` extension (e.g., \`my_program.c\`).</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">2.</span>
    <div>
      <p class="text-vibrant-teal font-semibold mb-1">Compilation:</p>
      <p class="text-gray-300">You use a C compiler (like GCC) to translate your code into an executable file. This process includes:
        <ul class="list-disc list-outside ml-6 space-y-1 mt-2 text-gray-300 marker:text-gray-400">
          <li class="pl-2"><strong>Preprocessing:</strong> Expands preprocessor directives (like \`#include\` and \`#define\`).</li>
          <li class="pl-2"><strong>Compiling:</strong> Translates the preprocessed code into assembly code.</li>
          <li class="pl-2"><strong>Assembling:</strong> Converts assembly code into machine code (object file \`.o\` or \`.obj\`).</li>
          <li class="pl-2"><strong>Linking:</strong> Combines the object file with necessary libraries to create the final executable program.</li>
        </ul>
      </p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">3.</span>
    <div>
      <p class="text-vibrant-teal font-semibold mb-1">Execution:</p>
      <p class="text-gray-300">You run the executable file.</p>
    </div>
  </div>
</div>

\`\`\`bash
# Example of compilation and execution with GCC
# 1. Compile:
gcc my_program.c -o my_program

# 2. Execute:
./my_program
\`\`\`

### The First Program: "Hello World"

\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, world!\\n"); // Prints "Hello, world!" followed by a newline
    return 0; // Indicates that the program finished successfully
}
\`\`\`

This program demonstrates the basic structure of any C program: the inclusion of a header (stdio.h), the main() function as the entry point, and a standard library function (printf()) to produce output.

In the following lessons, we will explore each of these components in detail.
`;

export default function CIntroPage({ params }: LessonPageProps) {
  // Obtenemos courseId y lessonId de params aquí para usarlos en useEffect si es necesario
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();

  useEffect(() => {
    // 1. Cargar el archivo CSS del tema de PrismJS (Okaidia).
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Cargar el script core de PrismJS.
    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    // 3. Cuando el script core se cargue, cargar los componentes de lenguaje C y Bash.
    scriptCore.onload = () => {
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true;

      scriptCLang.onload = () => {
        const scriptBashLang = document.createElement('script'); // New: Load Bash language component
        scriptBashLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js';
        scriptBashLang.async = true;

        scriptBashLang.onload = () => {
          if (window.Prism) {
            window.Prism.highlightAll(); // Resalta todos los bloques de código en la página
          }
        };
        document.body.appendChild(scriptBashLang);
      };
      document.body.appendChild(scriptCLang);
    };
    document.body.appendChild(scriptCore);

    // Función de limpieza para eliminar el enlace CSS cuando el componente se desmonte.
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
              // For standard Markdown lists, we keep the styling as needed.
              ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 space-y-2 mb-4 text-gray-300 marker:text-vibrant-teal" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 space-y-2 mb-4 text-gray-300 marker:text-vibrant-teal" {...props} />,
              li: ({ node, ...props }) => <li className="pl-2" {...props} />,
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
