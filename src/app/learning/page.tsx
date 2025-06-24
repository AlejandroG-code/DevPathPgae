// src/app/learning/page.tsx
'use client'; // ¡MUY IMPORTANTE! Esto lo marca como un Client Component

import React from 'react';
import Link from 'next/link';
import { CourseMetadata } from '@/types/learning'; // Importa la interfaz para la metadata

// Importa el JSON de metadata de cursos
// ¡Asegúrate de que courses_meta.json esté en src/data/!
import coursesMetadata from '../../../public/data/courses_meta.json';

const LearningHomePage: React.FC = () => {
  const courses: CourseMetadata[] = coursesMetadata; // Usa la interfaz CourseMetadata

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-[calc(100vh-64px)] text-white">
      <div className="bg-transparent backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-vibrant-teal text-center drop-shadow-md">
          Learn Programming
        </h1>
        <p className="text-gray-200 text-base md:text-lg mb-10 text-center max-w-2xl mx-auto">
          Deepen your understanding of programming concepts with our comprehensive courses and tutorials.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/learning/${course.id}`}>
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col justify-between h-full
                          hover:bg-gray-700/50 hover:border-vibrant-teal transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-lg">
                <div>
                  <div className="text-5xl mb-4 text-center">{course.icon || '📚'}</div> {/* Muestra el icono o un default */}
                  <h2 className="text-2xl font-bold mb-2 text-white text-center">{course.title}</h2>
                  <p className="text-gray-300 text-base line-clamp-3 text-center">{course.description}</p>
                </div>
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center px-6 py-2 rounded-full text-lg font-bold text-white
                                     bg-accent-purple/80 hover:bg-accent-purple transition-all duration-300 shadow-md">
                    Start Learning
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHomePage;
