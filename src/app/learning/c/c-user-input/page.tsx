/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-user-input/page.tsx
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
## C User Input

In C, you can get user input using the scanf() function. The scanf() function reads formatted input from the standard input (usually the keyboard).

### How "scanf()" Works

The basic syntax for scanf() is:

\`\`\`c
scanf("formatSpecifier", &variableName);
\`\`\`

Where:
* \`"formatSpecifier"\` is a string that specifies the type of data to be read (e.g., "%d" for integer, "%f" for float, "%c" for character).
* \`&variableName\` is the address of the variable where the input data will be stored. The ampersand (&) is the "address-of" operator, indicating the memory location of the variable.

**Example: Reading an Integer**

\`\`\`c
#include <stdio.h> // Required for printf() and scanf()

int main() {
    int myAge; // Declare an integer variable

    printf("Enter your age: "); // Prompt the user for input
    scanf("%d", &myAge);       // Read an integer from the user and store it in myAge

    printf("You are %d years old.\\n", myAge); // Display the input
    return 0;
}
\`\`\`

When you run this code, it will first print "Enter your age: ". Then, it will wait for you to type a number and press Enter. Once you do, that number will be stored in myAge, and the program will print "You are [your age] years old.".

### Reading Different Data Types

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Float:</p>
    <p class="text-gray-300">Use "%f" for floating-point numbers.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">float temperature;
printf("Enter temperature: ");
scanf("%f", &temperature);
printf("Temperature: %.2f\\n", temperature); // .2f for 2 decimal places</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">Character:</p>
    <p class="text-gray-300">Use "%c" for a single character.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">char grade;
printf("Enter your grade (A-F): ");
scanf("%c", &grade);
printf("Your grade is: %c\\n", grade);</code></pre>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">String:</p>
    <p class="text-gray-300">Use "%s" for a string (sequence of characters). When reading strings, you *do not* use the "&" (address-of) operator with the array name, as the array name itself represents the address of the first element.</p>
    <pre class="my-2 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-3 text-sm"><code class="language-c">char firstName[20]; // Declare a character array (string)
printf("Enter your first name: ");
scanf("%s", firstName); // No & operator for strings!
printf("Hello, %s!\\n", firstName);</code></pre>
    <p class="text-red-300 text-sm mt-2"><strong>Important Note on \`%s\` and Spaces:</strong> scanf("%s", ...) reads characters until it encounters a whitespace (space, tab, newline). This means it can only read a single word. For reading strings with spaces, you'll often use "fgets()".</p>
  </div>
</div>

### Multiple Inputs

You can read multiple inputs with a single scanf() call:

\`\`\`c
#include <stdio.h>

int main() {
    char initial;
    int age;

    printf("Enter your initial and age (e.g., J 25): ");
    scanf("%c %d", &initial, &age); // Read a character, then a space, then an integer

    printf("Your initial is %c and you are %d years old.\\n", initial, age);
    return 0;
}
\`\`\`

When taking multiple inputs, ensure that the format specifiers in scanf() match the types of variables you are trying to read, and also consider how whitespace (like spaces or newlines) might affect the input process.

User input is a fundamental concept that allows your programs to be interactive and adapt to runtime data provided by the user.
`;

export default function CUserInputPage() {
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
