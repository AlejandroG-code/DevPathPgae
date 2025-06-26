/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/[courseId]/page.tsx
'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Importa la metadata de todos los cursos
// La ruta es relativa desde 'src/app/learning/[courseId]/page.tsx'
import coursesMetadata from '../../../../public/data/courses_meta.json';
import { CourseMetadata } from '@/types/learning'; // Asegúrate de que esta ruta sea correcta para tus tipos

// Define LessonMetadata interface locally if not available in types
interface LessonMetadata {
  id: string;
  title: string;
  // Add other properties as needed based on your lesson structure
}

// Interfaz para las props de la página
interface CourseDetailPageProps {
  params: {
    courseId: string; // El ID del curso de la URL (e.g., 'c', 'cpp')
  };
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ params }) => {
  const { courseId } = params;

  // Busca la metadata del curso específico usando el courseId de la URL
  const course = coursesMetadata.find(
    (c) => c.id === courseId
  );

  // Si no se encuentra el curso, muestra la página 404
  if (!course) {
    console.error(`Course data not found for ID: ${courseId}.`);
    notFound(); // Redirige a la página 404 de Next.js
  }

  // Las lecciones para este curso están en la propiedad 'lessons' del objeto course
  // Aseguramos que 'lessons' siempre sea un array, incluso si es undefined en el JSON
  const lessons: LessonMetadata[] = course.lessons || [];

  // Si el curso existe pero no tiene lecciones definidas (array vacío)
  if (lessons.length === 0) {
    console.warn(`No lessons found for course ID: ${courseId}. Course object:`, course);
    // Podrías mostrar un mensaje o un fallback si un curso no tiene lecciones,
    // o redirigir a notFound() si se espera que todos los cursos tengan lecciones.
    // Por ahora, solo un aviso para desarrollo.
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 sm:p-8">
      <div className="bg-transparent backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold mb-4 text-vibrant-teal text-center drop-shadow-md"
        >
          {course.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-lg mb-8 text-center"
        >
          {course.description}
        </motion.p>

        {lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 16px rgba(0,255,255,0.1)" }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col justify-between h-full
                           hover:bg-gray-700/50 hover:border-accent-purple transition-all duration-300 transform cursor-pointer shadow-lg"
              >
                {/* Construye el enlace a la lección.
                    La ruta es /learning/{courseId}/{lessonId}
                    Ejemplo: /learning/c/c-introduction
                */}
                <Link href={`/learning/${courseId}/${lesson.id}`} className="block h-full">
                  <div>
                    <h2 className="text-xl font-bold mb-2 text-white text-center">{lesson.title}</h2>
                    {/* Puedes añadir una descripción o un fragmento de la lección aquí si LessonMetadata lo incluyera */}
                    {/* <p className="text-gray-300 text-sm">{lesson.description}</p> */}
                  </div>
                  <div className="mt-4 text-center">
                    <button className="inline-flex items-center px-4 py-2 rounded-full text-md font-semibold text-white
                                       bg-vibrant-teal/80 hover:bg-vibrant-teal transition-all duration-300 shadow-md">
                      Go to Lesson
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 text-lg mt-10">
            No lessons available for this course yet. Please check back later!
          </div>
        )}

        {/* Botón para volver a la página principal de cursos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link href="/learning" className="inline-flex items-center text-lg text-vibrant-teal hover:underline">
            <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to All Courses
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
