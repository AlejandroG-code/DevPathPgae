/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/learning/[courseId]/[lessonId]/page.tsx
// ESTE ES UN COMPONENTE DE SERVIDOR PURO. NO USA 'use client' NI HOOKS DE REACT.

import { notFound } from 'next/navigation';
import path from 'path';
import { promises as fs } from 'fs';
import dynamic from 'next/dynamic'; // Para importar componentes de cliente dinámicamente

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

// Interfaz de props para este componente de SERVIDOR
// Un componente de página de servidor solo recibe 'params' y 'searchParams' directamente de Next.js.
interface LessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

// generateStaticParams para pre-generar rutas de lecciones en tiempo de construcción.
// Se ejecuta en el servidor/tiempo de construcción, por lo que puede usar 'fs'.
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

// Este es el componente de página principal que se renderiza en el SERVIDOR.
export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = params;

  // 1. Cargar metadatos del curso (desde el servidor con fs)
  const coursesMetadataPath = path.join(process.cwd(), 'public', 'data', 'courses_meta.json');
  const coursesMetadataRaw = await fs.readFile(coursesMetadataPath, 'utf-8');
  const coursesMetadataData: CourseMetadata[] = JSON.parse(coursesMetadataRaw);
  const courseMeta = coursesMetadataData.find(c => c.id === courseId);

  if (!courseMeta) {
    notFound(); // Si el curso no se encuentra, devuelve 404
  }

  // 2. Cargar la lista específica de lecciones para este curso (desde el servidor con fs)
  const lessonsFilePath = path.join(process.cwd(), 'public', 'data', courseMeta.lessonsPath);
  let lessonsData: LessonMetadata[] = [];
  try {
    const lessonsRaw = await fs.readFile(lessonsFilePath, 'utf-8');
    lessonsData = JSON.parse(lessonsRaw) as LessonMetadata[];
  } catch (error: any) {
    console.error(`ERROR: Failed to load lessons data for ${courseId}:`, error.message);
    notFound(); // Si los datos de la lección no se pueden cargar, devuelve 404
  }

  // Definir la interfaz de props que el COMPONENTE DE CLIENTE de la lección específica esperará.
  interface LessonComponentProps {
    params: { courseId: string; lessonId: string };
    lessonsData: LessonMetadata[]; // Este es el dato que pasamos al componente de cliente
  }

  // Importación dinámica del componente de cliente de la lección específica.
  // Next.js cargará el archivo `/app/learning/${courseId}/${lessonId}/page.tsx`
  // (que DEBE ser un componente de cliente con 'use client')
  const LessonContentClientComponent = dynamic<LessonComponentProps>(
    () => import(`@/app/learning/${courseId}/${lessonId}/page`), 
    {
      loading: () => (
        // UI de carga mejorada mientras el componente de cliente se está cargando
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-vibrant-teal"></div>
          <p className="text-vibrant-teal text-xl mt-4 font-semibold animate-pulse">Cargando lección...</p>
          <p className="text-gray-400 text-sm mt-2">Preparando el contenido para usted.</p>
        </div>
      ),
      ssr: true, // Permitir que este componente de cliente se renderice en el servidor inicialmente
    }
  );

  return (
    // Este es el contenedor principal del componente de SERVIDOR.
    // Pasamos los datos cargados del servidor al componente de cliente importado dinámicamente.
    <div className="flex flex-col min-h-screen bg-gray-950">
      <main className="flex-1 w-full max-w-full mx-auto p-4 md:p-8">
        <LessonContentClientComponent params={params} lessonsData={lessonsData} />
      </main>
    </div>
  );
}
