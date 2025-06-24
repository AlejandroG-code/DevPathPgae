/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/[courseId]/page.tsx
// ESTE ES UN SERVER COMPONENT - IMPORTANTE: NO TIENE 'use client'

import { notFound } from 'next/navigation';
import { CourseMetadata, LearningCourse, LearningLesson } from '../../../types/learning';

// Importa el JSON principal de metadata de cursos
import coursesMetadata from '../../../../public/data/courses_meta.json';

// Importa *TODOS* los JSON de lecciones directamente al principio del Server Component.
// Esto los hace disponibles para el bundler.
import pythonBasicsLessons from '../../../../public/data/lessons/python-basics-lessons.json';
import htmlCssLessons from '../../../../public/data/lessons/html-css-lessons.json';
import javascriptFundamentalsLessons from '../../../../public/data/lessons/javascript-fundamentals-lessons.json';
import javaBasicsLessons from '../../../../public/data/lessons/java-basics-lessons.json';
import cBasicsLessons from '../../../../public/data/lessons/c-basics-lessons.json';
import cppBasicsLessons from '../../../../public/data/lessons/cpp-basics-lessons.json';
import csharpBasicsLessons from '../../../../public/data/lessons/csharp-basics-lessons.json';
import dsaLessons from '../../../../public/data/lessons/dsa-lessons.json';
import sqlLessons from '../../../../public/data/lessons/sql-lessons.json';
import gitGithubLessons from '../../../../public/data/lessons/git-github-lessons.json';
import webBasicsLessons from '../../../../public/data/lessons/web-basics-lessons.json';


// Mapeo de IDs de curso a sus respectivos arrays de lecciones importados
const allLessonsData: { [key: string]: LearningLesson[] } = {
  'python-basics': pythonBasicsLessons,
  'html-css-basics': htmlCssLessons,
  'javascript-fundamentals': javascriptFundamentalsLessons,
  'java-basics': javaBasicsLessons,
  'c-basics': cBasicsLessons,
  'cpp-basics': cppBasicsLessons,
  'csharp-basics': csharpBasicsLessons,
  'data-structures-algorithms': dsaLessons,
  'sql-databases': sqlLessons,
  'git-github': gitGithubLessons,
  'web-basics': webBasicsLessons,
  // ¡Asegúrate de agregar todos tus cursos aquí!
};


// Importa el Client Component que contiene la UI interactiva
import CourseDetailClient from '../../_components/learning/CourseDetailClient';

// CORRECCIÓN CLAVE: Interfaz para los props del Server Component de la página.
// Incluimos 'searchParams' aunque no lo usemos, para satisfacer la interfaz interna de Next.js PageProps.
interface CoursePageProps {
    params: {
      courseId: string;
    };
    searchParams?: { [key: string]: string | string[] | undefined }; // Añadir esto para la compatibilidad con PageProps
  }
  
  export default async function CourseDetailPage({ params, searchParams }: CoursePageProps) {
    const courseId = params.courseId; 
  
    // 1. Buscar la metadata del curso
    const courseMeta = (coursesMetadata as CourseMetadata[]).find(
      (c) => c.id === courseId
    );
  
    if (!courseMeta) {
      notFound();
    }
  
    // 2. Obtener las lecciones del mapeo pre-cargado
    const lessons: LearningLesson[] | undefined = allLessonsData[courseId];
  
    if (!lessons) {
      console.error(`Lessons data not found for course ID: ${courseId}. Check allLessonsData mapping.`);
      notFound();
    }
  
    // 3. Ensamblar el objeto de curso completo
    const fullCourse: LearningCourse = {
      ...courseMeta,
      lessons: lessons,
    };
  
    return <CourseDetailClient course={fullCourse} />;
  }
  