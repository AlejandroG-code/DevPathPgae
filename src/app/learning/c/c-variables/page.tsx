/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-variables/page.tsx
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
## C Variables

Variables are containers for storing data values. In C, before you can use a variable, you must declare it, specifying its data type and giving it a name. This tells the compiler how much space to reserve in memory for the variable and what kind of values it will hold.

### Declaring Variables

To declare a variable, you specify the **type** and then the **name** of the variable:

\`\`\`c
type variableName;
\`\`\`

Where:
* "type" is one of C's data types (e.g., int, float, char).
* "variableName" is the name of the variable.

**Example:**

\`\`\`c
int myNumber;    // Declares an integer variable named myNumber
float myFloat;   // Declares a floating-point variable named myFloat
char myLetter;   // Declares a character variable named myLetter
\`\`\`

### Assigning Values to Variables

You can assign a value to a variable using the assignment operator (=).

\`\`\`c
// Declare and assign a value in separate steps
int score;
score = 100;

// Declare and assign a value in one step (initialization)
float price = 99.99;
\`\`\`

### C Data Types

C has several fundamental data types:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Integers (int):</p>
    <p class="text-gray-300">Stores whole numbers (positive or negative), without decimals. Ranges from -2,147,483,648 to 2,147,483,647 (on most systems).</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">int age = 30;
int year = -2023;</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Floating Point Numbers (\`float\`, \`double\`):</p>
    <p class="text-gray-300">Stores numbers with decimals.</p>
    <p class="text-gray-300">float: for single-precision (e.g., 3.14F)</p>
    <p class="text-gray-300">double: for double-precision (more accurate and common).</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">float pi = 3.14F; // Notice the 'F'
double gravity = 9.81;</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Characters (\`char\`):</p>
    <p class="text-gray-300">Stores single characters (letters, numbers, or symbols). Must be enclosed in single quotes.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">char grade = 'A';
char symbol = '$';</code></pre>
  </div>
</div>

### Multiple Variable Declaration

You can declare multiple variables of the same type in one line, separated by commas:

\`\`\`c
int x = 5, y = 10, z = 15;
printf("%d %d %d\\n", x, y, z); // Output: 5 10 15
\`\`\`

### Changing Variable Values

Once declared, you can change the value of a variable as many times as you like:

\`\`\`c
int myNum = 10;
printf("Initial value: %d\\n", myNum); // Output: Initial value: 10

myNum = 20; // Change the value
printf("New value: %d\\n", myNum);   // Output: New value: 20
\`\`\`

### Constants (Read-Only Variables)

If you want to prevent others (or yourself) from overwriting existing variable values, you can use the const


**Note:** It's a common practice to declare constant identifiers in uppercase.

Understanding variables and data types is fundamental to writing any meaningful C program, as they allow you to store and manipulate information.
`;

export default function CVariablesPage({ params }: LessonPageProps) {
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