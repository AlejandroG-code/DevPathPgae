/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/learning/[courseId]/[lessonId]/page.tsx
// ESTE ES UN COMPONENTE DE SERVIDOR PURO. NO USA 'use client' NI HOOKS DE REACT.

import { notFound } from 'next/navigation';
import path from 'path';
import { promises as fs } from 'fs';
import dynamic from 'next/dynamic';

// Metadata types
interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessonsPath: string; // e.g., "courses/c-lessons.json"
  homePagePath: string;
}

interface LessonMetadata {
  id: string;
  title: string;
  description: string;
}

// FIX: LessonPageProps should ONLY contain 'params' for a Server Component Page.
// Custom props like 'lessonsData' are passed to dynamically imported Client Components.

// generateStaticParams para pre-generar rutas de lecciones
export async function generateStaticParams() {
  const coursesMetadataPath = path.join(process.cwd(), 'public', 'data', 'courses_meta.json');
  const coursesMetadataRaw = await fs.readFile(coursesMetadataPath, 'utf-8');
  const coursesMetadata: CourseMetadata[] = JSON.parse(coursesMetadataRaw);

  const params: { courseId: string; lessonId: string }[] = [];

  for (const course of coursesMetadata) {
    if (course.lessonsPath) {
      const lessonsFilePath = path.join(process.cwd(), 'public', 'data', course.lessonsPath);
      
      try {
        const lessonsRaw = await fs.readFile(lessonsFilePath, 'utf-8');
        const lessons: LessonMetadata[] = JSON.parse(lessonsRaw);
        
        for (const lesson of lessons) {
          params.push({ courseId: course.id, lessonId: lesson.id });
        }
      } catch (err: any) {
        console.error(`[generateStaticParams] ERROR: Failed to read lessons file for course ${course.id} at ${lessonsFilePath}. Error: ${err.message}`);
      }
    }
  }
  return params;
}

export default async function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { courseId, lessonId } = params;

  // 1. Load course metadata to get the specific lessons JSON path
  const coursesMetadataPath = path.join(process.cwd(), 'public', 'data', 'courses_meta.json');
  const coursesMetadataRaw = await fs.readFile(coursesMetadataPath, 'utf-8');
  const coursesMetadataData: CourseMetadata[] = JSON.parse(coursesMetadataRaw);
  const courseMeta = coursesMetadataData.find(c => c.id === courseId);

  if (!courseMeta) {
    notFound();
  }

  // 2. Load the specific lessons JSON file (e.g., c-lessons.json)
  const lessonsFilePath = path.join(process.cwd(), 'public', 'data', courseMeta.lessonsPath);
  let lessonsData: LessonMetadata[] = [];
  try {
    const lessonsRaw = await fs.readFile(lessonsFilePath, 'utf-8');
    lessonsData = JSON.parse(lessonsRaw) as LessonMetadata[];
  } catch (error: any) {
    console.error(`ERROR: Failed to load lessons data for ${courseId}:`, error.message);
    notFound(); // If lesson data cannot be loaded, treat as not found
  }

  // Define the props interface for LessonComponent (the client component)
  // This interface correctly includes both params and lessonsData
  interface LessonComponentProps {
    params: { courseId: string; lessonId: string };
    lessonsData: LessonMetadata[];
  }

  // Dynamically import the specific lesson's client component
  // We explicitly pass `lessonsData` here
  const LessonComponent = dynamic<LessonComponentProps>(
    () => import(`@/app/learning/${courseId}/${lessonId}/page`), 
    {
      loading: () => (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-vibrant-teal"></div>
          <p className="text-vibrant-teal text-xl mt-4 font-semibold animate-pulse">Cargando lección...</p>
          <p className="text-gray-400 text-sm mt-2">Preparando el contenido para usted.</p>
        </div>
      ),
      ssr: true, // Allow SSR for client components that receive data from server
    }
  );

  return (
    // Pass the received params AND the loaded lessonsData to the client component
    // The main container for the page, which will hold the loaded lesson content
    <div className="flex flex-col min-h-screen bg-gray-950">
      <main className="flex-1 w-full max-w-full mx-auto p-4 md:p-8">
        <LessonComponent params={params} lessonsData={lessonsData} />
      </main>
    </div>
  );
}
