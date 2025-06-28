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

interface LessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function LessonPage({ params }: LessonPageProps) {
  const [courseMeta, setCourseMeta] = useState<CourseMetadata | null>(null);
  const [lesson, setLesson] = useState<LessonMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { courseId, lessonId } = await Promise.resolve(params);
        
        // Load course metadata
        const coursesResponse = await fetch('/data/courses_meta.json');
        const coursesData: CourseMetadata[] = await coursesResponse.json();
        const course = coursesData.find(c => c.id === courseId);
        
        if (!course) {
          notFound();
          return;
        }
        
        setCourseMeta(course);
        
        // Load lessons and find specific lesson
        try {
          const lessonsResponse = await fetch(`/data/${course.lessonsPath}`);
          const lessonsData: LessonMetadata[] = await lessonsResponse.json();
          const foundLesson = lessonsData.find(l => l.id === lessonId);
          
          if (!foundLesson) {
            notFound();
            return;
          }
          
          setLesson(foundLesson);
        } catch (error) {
          console.error(`Error loading lesson ${lessonId}:`, error);
          notFound();
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-vibrant-teal mx-auto mb-4"></div>
          <p className="text-vibrant-teal text-xl font-semibold">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!courseMeta || !lesson) {
    notFound();
    return null;
  }

  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-[calc(100vh-64px)] text-white">
      <div className="bg-transparent backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/learning/${courseMeta.id}`} className="inline-flex items-center text-vibrant-teal hover:text-white transition-colors duration-300">
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to {courseMeta.title} Lessons
            </Link>
          </motion.div>
        </div>

        {/* Lesson Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-6xl mb-6 text-vibrant-teal"
          >
            {courseMeta.icon}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-vibrant-teal text-center drop-shadow-md"
          >
            {lesson.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-200 text-base md:text-lg mb-8 text-center max-w-2xl mx-auto"
          >
            {lesson.description}
          </motion.p>
        </div>

        {/* Lesson Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center shadow-lg"
        >
          <div className="text-6xl mb-6">📖</div>
          <h2 className="text-2xl font-bold text-white mb-4">Lesson Content</h2>
          <p className="text-gray-300 text-lg mb-6">
            This lesson content will be implemented based on the specific lesson requirements.
          </p>
          <p className="text-gray-400">
            Content for: <span className="text-vibrant-teal font-semibold">{lesson.title}</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
