"use client";

import React from 'react';
import Link from 'next/link';

interface LessonNavigationButtonsProps {
  currentCourseId: string; // The hardcoded course ID, e.g., "c"
  prevLesson: string | null; // Previous lesson ID
  nextLesson: string | null; // Next lesson ID
  backToContentPath: string; // Path to course content, e.g., "/learning/c"
}

export default function LessonNavigationButtons({
  currentCourseId,
  prevLesson,
  nextLesson,
  backToContentPath,
}: LessonNavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center mt-8 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
      {/* Previous Lesson Button */}
      {prevLesson ? (
        <Link 
          href={`/learning/${currentCourseId}/${prevLesson}`} 
          className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purple/80 transition-colors duration-200 text-sm md:text-base whitespace-nowrap"
        >
          ← Previous Lesson
        </Link>
      ) : (
        <span className="px-4 py-2 text-gray-100 cursor-not-allowed text-sm md:text-base whitespace-nowrap">← Previous</span>
      )}

      {/* Back to Content Button */}
      <Link 
        href={backToContentPath} 
        className="px-4 py-2 bg-vibrant-teal text-gray-100 rounded-md hover:bg-vibrant-teal/80 transition-colors duration-200 text-sm md:text-base whitespace-nowrap mx-2"
      >
        Back to {currentCourseId.toUpperCase()} Lessons
      </Link>

      {/* Next Lesson Button */}
      {nextLesson ? (
        <Link 
          href={`/learning/${currentCourseId}/${nextLesson}`} 
          className="px-4 py-2 bg-accent-purple text-white rounded-md hover:bg-accent-purple/80 transition-colors duration-200 text-sm md:text-base whitespace-nowrap"
        >
          Next Lesson →
        </Link>
      ) : (
        <span className="px-4 py-2 text-gray-100 cursor-not-allowed text-sm md:text-base whitespace-nowrap">Next →</span>
      )}
    </div>
  );
}
