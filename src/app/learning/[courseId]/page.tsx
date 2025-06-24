/* eslint-disable react/jsx-no-undef */
// src/app/learning/[courseId]/page.tsx
// ESTE ES UN SERVER COMPONENT - IMPORTANTE: NO TIENE 'use client'

import { notFound } from 'next/navigation';
import { CourseMetadata, LearningCourse, LearningLesson } from '@/types/learning'; 

// Importa el JSON principal de metadata de cursos
import coursesMetadata from '../../../../public/data/courses_meta.json'; 

// Importa *TODOS* los JSON de lecciones directamente al principio del Server Component.
// Accedemos a '' para asegurar que es el array.
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
import CourseDetailClient from '@/app/_components/learning/CourseDetailClient';

// Mapeo de IDs de curso a sus respectivos arrays de lecciones importados
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

// *******************************************************************
// generateStaticParams sigue siendo importante para la pre-generación
// y para informar a Next.js de las rutas posibles.
// *******************************************************************
export async function generateStaticParams() {
  return (coursesMetadata as CourseMetadata[]).map((course) => ({
    courseId: course.id,
  }));
}

// Interfaz para los props del Server Component de la página.
// Nota: La definición directa en la firma de la función es la más efectiva para Next.js 15.
// Esta interfaz se usa solo para claridad, pero el tipo de 'params' en la función
// es lo que realmente importa al compilador.
interface CourseDetailPageProps {
  params: Promise<{ // <-- AHORA 'params' SE DEFINE COMO UNA PROMESA
    courseId: string;
  }>;
  // searchParams también se espera como una promesa si lo usas:
  // searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// *******************************************************************
// CORRECCIÓN CLAVE EN LA FIRMA DE LA FUNCIÓN Y EL MANEJO DE PARAMS
// Se espera 'params' como una promesa y se hace 'await' explícitamente.
// *******************************************************************
export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  // Hacemos 'await' de 'params' para obtener el objeto resuelto con 'courseId'.
  // Esto resuelve el "Type error" que dice que params no tiene propiedades de Promise.
  const resolvedParams = await params;
  const courseId = resolvedParams.courseId; 

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
