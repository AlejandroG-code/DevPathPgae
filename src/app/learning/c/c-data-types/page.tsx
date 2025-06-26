/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-data-types/page.tsx
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
## C Data Types

Data types are essential in C because they determine the type of data a variable can store (e.g., integers, floating-point numbers, characters) and how much memory the variable occupies. Choosing the correct data type is crucial for efficient memory usage and accurate program behavior.

### Fundamental Data Types

C has several fundamental (or basic) data types:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">1. Integer Types:</p>
    <p class="text-gray-300">For storing whole numbers (without decimals). They can be positive, negative, or zero.</p>
    <table class="w-full text-left border-collapse my-2 text-gray-300">
      <thead>
        <tr>
          <th class="p-2 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Type</th>
          <th class="p-2 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Size (bytes)</th>
          <th class="p-2 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Range (Approx.)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border-b border-gray-700">char</td><td class="p-2 border-b border-gray-700">1</td><td class="p-2 border-b border-gray-700">-128 to 127</td></tr>
        <tr><td class="p-2 border-b border-gray-700">int</td><td class="p-2 border-b border-gray-700">2 or 4</td><td class="p-2 border-b border-gray-700">-32,768 to 32,767 (2-byte) or -2B to 2B (4-byte)</td></tr>
        <tr><td class="p-2 border-b border-gray-700">short</td><td class="p-2 border-b border-gray-700">2</td><td class="p-2 border-b border-gray-700">-32,768 to 32,767</td></tr>
        <tr><td class="p-2 border-b border-gray-700">long</td><td class="p-2 border-b border-gray-700">4 or 8</td><td class="p-2 border-b border-gray-700">Larger than int</td></tr>
        <tr><td class="p-2 border-b border-gray-700">long long</td><td class="p-2 border-b border-gray-700">8</td><td class="p-2 border-b border-gray-700">Even larger</td></tr>
      </tbody>
    </table>
    <p class="text-gray-300 text-sm mt-2"><strong>Modifiers:</strong> Use signed (default) or unsigned with integer types to change their range. E.g., unsigned int stores only non-negative values.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">2. Floating-Point Types:</p>
    <p class="text-gray-300">For storing numbers with decimal points (real numbers).</p>
    <table class="w-full text-left border-collapse my-2 text-gray-300">
      <thead>
        <tr>
          <th class="p-2 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Type</th>
          <th class="p-2 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Size (bytes)</th>
          <th class="p-2 border-b-2 border-gray-600 text-white font-semibold bg-gray-700">Precision (Approx. Digits)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border-b border-gray-700">float</td><td class="p-2 border-b border-gray-700">4</td><td class="p-2 border-b border-gray-700">6-7</td></tr>
        <tr><td class="p-2 border-b border-gray-700">double</td><td class="p-2 border-b border-gray-700">8</td><td class="p-2 border-b border-gray-700">15-17</td></tr>
        <tr><td class="p-2 border-b border-gray-700">long double</td><td class="p-2 border-b border-gray-700">10/12/16</td><td class="p-2 border-b border-gray-700">18-19 (system-dependent)</td></tr>
      </tbody>
    </table>
    <p class="text-gray-300 text-sm mt-2"><strong>Note:</strong> Always add f suffix for float literals (e.g., 3.14f).</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">3. Character Type (\`char\`):</p>
    <p class="text-gray-300">Stores a single character (letter, number, or symbol). Internally, it's an integer representing the ASCII value of the character.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">char grade = 'A'; // Single quotes for characters
printf("Grade: %c\\n", grade); // Use %c for char
printf("ASCII value: %d\\n", grade); // Can also print its integer value</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">4. Void Type (\`void\`):</p>
    <p class="text-gray-300">Indicates the absence of type. Used for functions that don't return a value, or for generic pointers (void*) that can point to any data type.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">void printMessage() { // Function returning no value
    printf("This function returns nothing.\\n");
}
// void *generic_ptr; // A pointer that can hold any type's address</code></pre>
  </div>
</div>

### The 'sizeof' Operator

You can use the 'sizeof' operator to find the size (in bytes) of a data type or a variable on your specific system. The sizes can vary between compilers and architectures.

\`\`\`c
#include <stdio.h>

int main() {
    int integerVar;
    float floatVar;
    char charVar;

    printf("Size of int: %zu bytes\\n", sizeof(integerVar));
    printf("Size of float: %zu bytes\\n", sizeof(floatVar));
    printf("Size of char: %zu bytes\\n", sizeof(charVar));
    printf("Size of double: %zu bytes\\n", sizeof(double)); // Can also use with types
    return 0;
}
\`\`\`

The '%zu' format specifier is used with 'printf()' for 'sizeof's' return value, which is typically of type 'size_t' (an unsigned integer type).

Understanding data types is fundamental as it directly impacts how memory is used and how operations are performed in your C programs.
`;

export default function CDataTypesPage({ params }: LessonPageProps) {
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
