/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/[courseId]/layout.tsx
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Definir la estructura de las lecciones para el menú de navegación.
// Hemos eliminado 'sectionTitle' de aquí directamente y lo agruparemos en el mapeo.
interface NavLesson {
  id: string;
  title: string;
}

// Datos de las lecciones para el menú lateral.
// **IMPORTANTE**: Los `id` aquí deben coincidir exactamente con los nombres de las carpetas/rutas.
const cCourseSections = [
  {
    title: 'C Tutorial',
    lessons: [
      { id: 'c-tutorial', title: 'C Tutorial' },
      { id: 'c-home', title: 'C Home' },
      { id: 'c-intro', title: 'C Intro' },
      { id: 'c-get-started', title: 'C Get Started' },
      { id: 'c-syntax', title: 'C Syntax' },
      { id: 'c-output', title: 'C Output' },
      { id: 'c-comments', title: 'C Comments' },
      { id: 'c-variables', title: 'C Variables' },
      { id: 'c-data-types', title: 'C Data Types' },
      { id: 'c-constants', title: 'C Constants' },
      { id: 'c-operators', title: 'C Operators' },
      { id: 'c-booleans', title: 'C Booleans' },
      { id: 'c-if-else', title: 'C If...Else' },
      { id: 'c-switch', title: 'C Switch' },
      { id: 'c-while-loop', title: 'C While Loop' },
      { id: 'c-for-loop', title: 'C For Loop' },
      { id: 'c-break-continue', title: 'C Break/Continue' },
      { id: 'c-arrays', title: 'C Arrays' },
      { id: 'c-strings', title: 'C Strings' },
      { id: 'c-user-input', title: 'C User Input' },
      { id: 'c-memory-address', title: 'C Memory Address' },
      { id: 'c-pointers', title: 'C Pointers' }
    ]
  },
  {
    title: 'C Functions',
    lessons: [
      { id: 'c-functions', title: 'C Functions' },
      { id: 'c-function-parameters', title: 'C Function Parameters' },
      { id: 'c-scope', title: 'C Scope' },
      { id: 'c-function-declaration', title: 'C Function Declaration' },
      { id: 'c-recursion', title: 'C Recursion' },
      { id: 'c-math-functions', title: 'C Math Functions' }
    ]
  },
  {
    title: 'C Files',
    lessons: [
      { id: 'c-create-files', title: 'C Create Files' },
      { id: 'c-write-to-files', title: 'C Write To Files' },
      { id: 'c-read-files', title: 'C Read Files' }
    ]
  },
  {
    title: 'C Structures',
    lessons: [
      { id: 'c-structures', title: 'C Structures' },
      { id: 'c-unions', title: 'C Unions' },
      { id: 'c-enums', title: 'C Enums' }
    ]
  },
  {
    title: 'C Memory Management',
    lessons: [
      { id: 'c-memory-management', title: 'C Memory Management' }
    ]
  },
  {
    title: 'C Errors',
    lessons: [
      { id: 'c-errors', title: 'C Errors' },
      { id: 'c-debugging', title: 'C Debugging' },
      { id: 'c-input-validation', title: 'C Input Validation' }
    ]
  },
  {
    title: 'C Macros',
    lessons: [
      { id: 'c-macros', title: 'C Macros' }
    ]
  },
  {
    title: 'C Projects',
    lessons: [
      { id: 'c-projects', title: 'C Projects' }
    ]
  },
  {
    title: 'C Reference',
    lessons: [
      { id: 'c-reference-overview', title: 'C Reference' },
      { id: 'c-keywords', title: 'C Keywords' },
      { id: 'c-stdio', title: 'C <stdio.h>' },
      { id: 'c-stdlib', title: 'C <stdlib.h>' },
      { id: 'c-string', title: 'C <string.h>' },
      { id: 'c-math', title: 'C <math.h>' },
      { id: 'c-ctype', title: 'C <ctype.h>' }
    ]
  }
];


export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const { courseId } = params;

  // En una aplicación real, obtendrías esto de una fuente de datos
  // o de un archivo de configuración de cursos.
  let courseTitle = '';
  let navLessons: NavLesson[] = [];

  if (courseId === 'c') {
    courseTitle = 'C Tutorial';
    navLessons = cCourseSections.flatMap(section => section.lessons); // Aplanar para pasar todas las lecciones si es necesario
  } else {
    notFound(); // Redirige a 404 si el curso no se encuentra
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-900">
      {/* Sidebar de navegación */}
      <aside className="hidden md:block w-72 bg-gray-800/80 backdrop-blur-md p-4 overflow-y-auto border-r border-[#00FFC6]/20 shadow-lg">
        <h2 className="text-2xl font-bold text-vibrant-teal mb-6 border-b border-gray-700 pb-3">
          {courseTitle}
        </h2>
        <nav>
          {cCourseSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-300 mt-4 mb-2">
                {section.title}
              </h3>
              {section.lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  href={`/learning/${courseId}/${lesson.id}`}
                  className="block text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors duration-200 py-2 px-3 rounded-md text-sm"
                >
                  {lesson.title}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Contenido principal de la lección */}
      <main className="flex-1 overflow-y-auto bg-gray-900 text-white">
        {children} {/* Aquí se renderizará el contenido de [lessonId]/page.tsx */}
      </main>
    </div>
  );
}
