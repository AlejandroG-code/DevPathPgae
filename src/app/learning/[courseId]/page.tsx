'use client';

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessonsPath: string;
  homePagePath: string;
}

interface LessonMetadata {
  id: string;
  title: string;
  description: string;
}

interface CourseIndexPageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default function CourseIndexPage({ params }: CourseIndexPageProps) {
  const [courseMeta, setCourseMeta] = useState<CourseMetadata | null>(null);
  const [lessons, setLessons] = useState<LessonMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { courseId } = await params;
        
        // Load course metadata
        const coursesResponse = await fetch('/data/courses_meta.json');
        const coursesData: CourseMetadata[] = await coursesResponse.json();
        const course = coursesData.find(c => c.id === courseId);
        
        if (!course) {
          notFound();
          return;
        }
        
        setCourseMeta(course);
        
        // Load lessons
        try {
          const lessonsResponse = await fetch(`/data/${course.lessonsPath}`);
          const lessonsData: LessonMetadata[] = await lessonsResponse.json();
          setLessons(lessonsData);
        } catch (error) {
          console.error(`Error loading lessons for course ${courseId}:`, error);
          setLessons([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!courseMeta) {
    notFound();
    return null;
  }

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-[calc(100vh-64px)] text-white">
      <div className="bg-transparent backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-8xl mb-6 text-vibrant-teal"
          >
            {courseMeta.icon}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-vibrant-teal text-center drop-shadow-md"
          >
            {courseMeta.title} Lessons
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-200 text-base md:text-lg mb-8 text-center max-w-2xl mx-auto"
          >
            {courseMeta.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/learning" className="inline-flex items-center px-6 py-3 rounded-full text-lg font-bold text-white bg-accent-purple/80 hover:bg-accent-purple transition-all duration-300 shadow-md hover:scale-105">
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Courses
            </Link>
          </motion.div>
        </div>

        {/* Lessons Section */}
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Available Lessons
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="h-1 bg-gradient-to-r from-vibrant-teal to-blue-400 mx-auto rounded-full"
          ></motion.div>
        </div>

        {lessons.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-12 text-center shadow-lg max-w-2xl mx-auto"
          >
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-200 text-xl font-semibold mb-2">No lessons available yet</p>
            <p className="text-gray-400 text-lg">Check back soon for exciting new content!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.2 + 0.1 * index }}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(0,255,255,0.2)" }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col justify-between h-full
                          hover:bg-gray-700/50 hover:border-vibrant-teal transition-all duration-300 cursor-pointer shadow-lg"
              >
                <Link href={`/learning/${courseMeta.id}/${lesson.id}`} className="block h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-3 text-white text-center">{lesson.title}</h3>
                      <p className="text-gray-300 text-sm line-clamp-4 text-center mb-4">{lesson.description}</p>
                    </div>
                    <div className="mt-auto text-center">
                      <button className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold text-white
                                         bg-accent-purple/80 hover:bg-accent-purple transition-all duration-300 shadow-md w-full justify-center">
                        Start Lesson
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
