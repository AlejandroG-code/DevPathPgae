// src/app/learning/page.tsx
'use client'; 

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CourseMetadata } from '@/types/learning'; 

import coursesMetadata from '../../../public/data/courses_meta.json';

const LearningHomePage: React.FC = () => {
  const courses = coursesMetadata as CourseMetadata[]; 

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-[calc(100vh-64px)] text-white">
      <div className="bg-transparent backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold mb-8 text-vibrant-teal text-center drop-shadow-md"
        >
          Explore Our Courses
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-200 text-base md:text-lg mb-10 text-center max-w-2xl mx-auto"
        >
          Deepen your understanding of programming concepts with our comprehensive courses and tutorials.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-3 xl:gap-3 2xl:gap-4">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * courses.indexOf(course) }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(0,255,255,0.2)" }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col justify-between h-full
                          hover:bg-gray-700/50 hover:border-vibrant-teal transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-lg"
            >
              {/* ¡EL CAMBIO AQUÍ! Ahora el enlace va a la página de contenido del curso */}
              <Link href={`/learning/${course.id}`} className="block h-full">
                <div>
                  <div className="text-5xl mb-4 text-center text-vibrant-teal">{course.icon || '📚'}</div>
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningHomePage;
