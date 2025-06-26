/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-arrays/page.tsx
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
## C Arrays

An array is a data structure that stores a fixed-size sequential collection of elements of the same data type. It is used to store multiple values in a single variable, instead of declaring separate variables for each value.

### Declaring and Initializing Arrays

To declare an array, define the variable type, specify the name of the array followed by square brackets '[]', and specify the number of elements it will store:

\`\`\`c
type arrayName[arraySize];
\`\`\`

**Example:**

\`\`\`c
int myNumbers[5]; // Declares an integer array named myNumbers that can hold 5 elements
\`\`\`

You can also initialize an array when you declare it, by listing the values inside curly braces '{}':

\`\`\`c
int myNumbers[] = {10, 20, 30, 40, 50}; // Compiler determines size based on elements (5 elements)
char myLetters[3] = {'A', 'B', 'C'}; // Explicit size, initialized with values
\`\`\`

### Accessing Array Elements

Array elements are accessed using an index number. Array indexing starts from **0**.

\`\`\`c
#include <stdio.h>

int main() {
    int myNumbers[] = {10, 20, 30, 40, 50};
    printf("%d\\n", myNumbers[0]); // Access the first element (index 0), Output: 10
    printf("%d\\n", myNumbers[2]); // Access the third element (index 2), Output: 30
    return 0;
}
\`\`\`

### Changing Array Elements

You can change the value of a specific element by referring to its index number:

\`\`\`c
#include <stdio.h>

int main() {
    int myNumbers[] = {10, 20, 30, 40, 50};
    myNumbers[0] = 5; // Change the value of the first element to 5
    printf("%d\\n", myNumbers[0]); // Output: 5
    return 0;
}
\`\`\`

### Looping Through an Array

You can loop through array elements with the 'for' loop, and use the 'sizeof' operator to find the size of the array.

\`\`\`c
#include <stdio.h>

int main() {
    int myNumbers[] = {10, 20, 30, 40, 50};
    int i;

    // Calculate the number of elements: (size of array in bytes) / (size of one element in bytes)
    int arraySize = sizeof(myNumbers) / sizeof(myNumbers[0]); 

    for (i = 0; i < arraySize; i++) {
        printf("%d\\n", myNumbers[i]);
    }
    // Output:
    // 10
    // 20
    // 30
    // 40
    // 50
    return 0;
}
\`\`\`

### Multidimensional Arrays

A multidimensional array is an array of arrays. They are commonly used to store data in a table-like format (rows and columns).

\`\`\`c
type arrayName[rows][columns];
\`\`\`

**Example: 2D Array (Matrix)**

\`\`\`c
#include <stdio.h>

int main() {
    // Declares a 2x3 integer array (2 rows, 3 columns)
    int matrix[2][3] = { {1, 2, 3}, {4, 5, 6} };

    // Accessing elements: matrix[row_index][column_index]
    printf("%d\\n", matrix[0][0]); // Output: 1
    printf("%d\\n", matrix[1][2]); // Output: 6

    // Loop through a 2D array
    for (int i = 0; i < 2; i++) { // Loop through rows
        for (int j = 0; j < 3; j++) { // Loop through columns
            printf("%d ", matrix[i][j]);
        }
        printf("\\n"); // New line after each row
    }
    // Output:
    // 1 2 3
    // 4 5 6

    return 0;
}
\`\`\`

Arrays are fundamental for storing and manipulating collections of data of the same type, and multidimensional arrays extend this capability for more complex data structures.
`;

export default function CArraysPage({ params }: LessonPageProps) {
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

    // 3. Cuando el script core se cargue, cargar el componente de lenguaje C.
    scriptCore.onload = () => {
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true;

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
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [LESSON_CONTENT, courseId, lessonId]); // Dependencias para re-ejecutar si el contenido o la ruta cambian

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
