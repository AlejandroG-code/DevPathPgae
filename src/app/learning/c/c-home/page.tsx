/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-home/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LessonSidebar from '@/app/_components/LessonSidebar'; // Asegúrate que la ruta de importación sea correcta
import { useParams } from 'next/navigation';

// Extiende la interfaz Window para incluir la propiedad Prism.
// Esto es necesario porque PrismJS se carga a través de etiquetas script y se adjunta a window.
declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

// Define las props que este componente de página espera recibir de Next.js.
interface LessonPageProps {
  params: {
    courseId: string; // Por ejemplo, 'c'
    lessonId: string; // Por ejemplo, 'c-home'
  };
}

// Contenido de la lección en formato Markdown.
// Incluye HTML personalizado para el estilo de "cajas" y bloques de código.
const LESSON_CONTENT = `
## C Home

Welcome to the C Programming tutorial! This comprehensive guide will take you through the fundamentals of the C language, from basic syntax to advanced concepts like pointers and file handling. C is a foundational language that influenced many modern programming languages and is crucial for system programming, embedded systems, and game development.

### What You'll Learn:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Fundamentals:</p>
    <p class="text-gray-300">Variables, data types, operators, and basic input/output.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Control Flow:</p>
    <p class="text-gray-300">Conditional statements (\`if\`, \`else\`, \`switch\`) and loops (\`for\`, \`while\`, \`do-while\`).</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Data Structures:</p>
    <p class="text-gray-300">Arrays, strings, and an introduction to pointers.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Functions:</p>
    <p class="text-gray-300">Modularizing your code and understanding function parameters.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Memory Management:</p>
    <p class="text-gray-300">Dynamic memory allocation using \`malloc\`, \`calloc\`, \`realloc\`, and \`free\`.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Advanced Topics:</p>
    <p class="text-gray-300">Structures, unions, enums, file I/O, and more.</p>
  </div>
</div>

### Why C is Important:

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">1.</span>
    <div>
    <p class="text-vibrant-teal font-semibold mb-1">Performance:</p>
    <p class="text-gray-300">C offers direct memory manipulation, leading to highly optimized and fast applications.</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">2.</span>
    <div>
      <p class="text-vibrant-teal font-semibold mb-1">System Programming:</p>
      <p class="text-gray-300">It is the language of choice for operating systems (like Linux), embedded systems, and device drivers.</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">3.</span>
    <div>
      <p class="text-gray-300">Foundation for Other Languages:</p>
      <p class="text-gray-300">Many popular languages (C++, Java, Python, JavaScript) are built upon C or borrow heavily from its syntax and concepts.</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">4.</span>
    <div>
      <p class="text-gray-300">C programs can be compiled and run on various hardware platforms with minimal changes.</p>
    </div>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md flex items-start">
    <span class="text-vibrant-teal text-xl font-bold mr-3">5.</span>
    <div>
      <p class="text-gray-300">Understanding Computer Architecture:</p>
      <p class="text-gray-300">Learning C helps in understanding how computer hardware and software interact at a low level.</p>
    </div>
  </div>
</div>

Let's embark on this journey to master the powerful C programming language!

\`\`\`c
#include <stdio.h> // Include the standard input-output library

int main() { // Main function: where program execution begins
    printf("Hello, C!\\n"); // Print text to the console
    return 0; // Indicate successful program execution
}
\`\`\`

This basic 'Hello World' program demonstrates the fundamental structure of a C program.
`;

// Componente principal de la página de la lección C Home.
export default function CHomePage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();

  // useEffect para cargar dinámicamente los estilos y scripts de PrismJS.
  // Esto asegura que el resaltado de sintaxis funcione correctamente.
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

    // 3. Cuando el script core se cargue, cargar el componente de lenguaje C.
    scriptCore.onload = () => {
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true;

      // Esperar a que el script de C se cargue antes de highlightAll
      scriptCLang.onload = () => {
        // Asegurarse de que Prism esté disponible globalmente antes de intentar resaltado.
        if (window.Prism) {
          window.Prism.highlightAll(); // Resalta todos los bloques de código en la página
        }
      };
      document.body.appendChild(scriptCLang);
    };
    document.body.appendChild(scriptCore);

    // Función de limpieza para eliminar el enlace CSS cuando el componente se desmonte.
    // Los scripts se dejan, ya que no causan problemas una vez cargados y ejecutados.
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente.

  return (
    // Contenedor principal de la página, usando flexbox para el layout de la barra lateral y el contenido.
    // min-h-screen asegura que el contenedor principal ocupe al menos toda la altura de la ventana.
    <div className="flex min-h-screen"> 
      {/* Componente de la barra lateral de navegación. */}
      {/* La barra lateral ahora se renderiza y toma su espacio. */}
      {/* La prop 'courseId' se pasa explícitamente si se requiere, pero LessonSidebar lo obtiene internamente ahora. */}
      <LessonSidebar /> 
      
      {/* Contenedor del contenido principal de la lección.
          flex-1: Hace que ocupe todo el espacio horizontal restante.
          ml-0: Sin margen izquierdo por defecto (para móvil).
          md:ml-64: Añade un margen izquierdo de 64 unidades (16rem, ancho de la sidebar) en pantallas medianas y grandes.
                    Esto empuja el contenido para que no quede debajo de la sidebar fija.
      */}
      <main className="flex-1 ml-0 md:ml-64"> 
        {/* Contenedor del contenido de la lección con estilos de fondo, padding, bordes y texto. */}
        <div className="lesson-content p-4 md:p-8 bg-gray-900 text-white rounded-lg shadow-xl">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]} // Necesario para que ReactMarkdown procese el HTML personalizado dentro del Markdown.
            components={{
              // Renderizado personalizado para bloques de código.
              // Aplica clases de Tailwind para el contenedor <pre> y la clase 'language-XYZ' para PrismJS en <code>.
              code: ({ inline, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
                const match = /language-(\w+)/.exec(className || '');
                const lang = match ? match[1] : 'markup'; // Extrae el lenguaje (e.g., 'c', 'bash') o usa 'markup' por defecto.

                return !inline ? (
                  <pre className="my-4 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-4 text-sm">
                    <code className={`language-${lang}`} {...props}>
                      {String(children).replace(/\n$/, '')}
                    </code>
                  </pre>
                ) : (
                  // Estilo para fragmentos de código en línea (e.g., `printf()`).
                  <code className="bg-gray-700 text-vibrant-teal px-1 py-0.5 rounded-md text-xs" {...props}>
                    {children}
                  </code>
                );
              },
              // Personaliza otros elementos de Markdown con clases de Tailwind CSS para mantener la estética.
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
