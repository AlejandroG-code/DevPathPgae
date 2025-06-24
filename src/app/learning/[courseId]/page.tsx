// src/app/learning/[courseId]/page.tsx
// ESTE ES UN SERVER COMPONENT - IMPORTANTE: NO TIENE 'use client'

import { notFound } from 'next/navigation';
// Importa interfaces necesarias. Mantén el alias si está configurado.
import { CourseMetadata, LearningCourse, LearningLesson } from '@/types/learning'; 

// Importa el JSON principal de metadata de cursos
// Asegúrate de que courses_meta.json esté en src/data/
import coursesMetadata from '../../../../public/data/courses_meta.json';

// Importa *TODOS* los JSON de lecciones directamente al principio del Server Component.
// ¡ACCEDEMOS A '' PARA ASEGURAR QUE ES EL ARRAY!
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
// USAMOS `` AL REFERENCIAR EL MÓDULO IMPORTADO
const allLessonsData: { [key: string]: LearningLesson[] } = {
  'python-basics': pythonBasicsLessons as LearningLesson[],
  'html-css-basics': htmlCssLessons as LearningLesson[],
  'javascript-fundamentals': javascriptFundamentalsLessons as LearningLesson[],
  'java-basics': javaBasicsLessons as LearningLesson[],
  'c-basics': cBasicsLessons as LearningLesson[],
  'cpp-basics': cppBasicsLessons as LearningLesson[],
  'csharp-basics': csharpBasicsLessons as LearningLesson[],
  'data-structures-algorithms': dsaLessons as LearningLesson[],
  'sql-databases': sqlLessons as LearningLesson[],
  'git-github': gitGithubLessons as LearningLesson[],
  'web-basics': webBasicsLessons as LearningLesson[],
};

// Importa el Client Component que contiene la UI interactiva
import CourseDetailClient from '../../_components/learning/CourseDetailClient';

// CORRECCIÓN CLAVE: Eliminamos la interfaz CoursePageProps y tipamos directamente en la función
export default async function CourseDetailPage({ params }: { params: { courseId: string } }) {
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
