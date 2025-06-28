// src/app/_components/learning/CourseDetailClient.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LearningCourse, LessonMetadata } from '@/types/learning'; 

interface CourseDetailClientProps {
  course: LearningCourse; 
}

export default function CourseDetailClient({ course }: CourseDetailClientProps) {
  // lessons es siempre un array aquí debido a la definición de LearningCourse y el Server Component
  const lessons: LessonMetadata[] = course.lessons || []; 


  return (
    <div className="flex min-h-screen"> 
      <main className="flex-1 ml-0 md:ml-64"> 
        <div className="lesson-content p-4 md:p-8 bg-gray-900 text-white rounded-lg shadow-xl">
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
                  <Link href={`/learning/${course.id}/${lesson.id}`} className="block h-full">
                    <div>
                      <h2 className="text-xl font-bold mb-2 text-white text-center">{lesson.title}</h2>
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
      </main>
    </div>
  );
}
