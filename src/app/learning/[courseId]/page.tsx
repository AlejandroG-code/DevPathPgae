// src/app/learning/[courseId]/page.tsx
// ESTE ES UN SERVER COMPONENT - IMPORTANTE: NO TIENE 'use client'

import { notFound } from 'next/navigation';
// Importa interfaces necesarias. Mantén el alias si está configurado.
import { CourseMetadata, LearningCourse, LearningLesson } from '@/types/learning'; 

// Importa el JSON principal de metadata de cursos
// Usando rutas relativas a public/data/
import coursesMetadata from '../../../../public/data/courses_meta.json'; 

// Importa *TODOS* los JSON de lecciones directamente al principio del Server Component.
// ¡ACCEDEMOS A '' PARA ASEGURAR QUE ES EL ARRAY! (Según la petición del usuario)
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
// USAMOS `` AL REFERENCIAR EL MÓDULO IMPORTADO (Según la petición del usuario)
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
import CourseDetailClient from '../../_components/learning/CourseDetailClient'; // Usando alias si está configurado

// *******************************************************************
// CORRECCIÓN CLAVE: IMPLEMENTACIÓN DE generateStaticParams
// Esto le indica a Next.js qué 'courseId's se pueden generar en tiempo de compilación.
// *******************************************************************
export async function generateStaticParams() {
  // Retorna un array de objetos, donde cada objeto tiene los parámetros de la ruta dinámica.
  // En este caso, por cada curso en la metadata, generamos un { courseId: '...' }.
  return (coursesMetadata as CourseMetadata[]).map((course) => ({
    courseId: course.id,
  }));
}

// Interfaz para los props del Server Component de la página.
// Usando la definición de tipo proporcionada por el usuario.
type CoursePageProps = {
    params: {
      courseId: string;
    };
  };

export default async function CourseDetailPage(props: CoursePageProps) {
    const { courseId } = props.params; // Acceso a params.courseId a través de props.params

  // 1. Buscar la metadata del curso
  const courseMeta = (coursesMetadata as CourseMetadata[]).find(
    (c) => c.id === courseId
  );

  if (!courseMeta) {
    // Si no se encuentra la metadata, indica que la ruta no existe (aunque generateStaticParams ya debería cubrir esto)
    notFound(); 
  }

  // 2. Obtener las lecciones del mapeo pre-cargado
  const lessons: LearningLesson[] | undefined = allLessonsData[courseId];

  if (!lessons) {
    console.error(`Lessons data not found for course ID: ${courseId}. Check allLessonsData mapping.`);
    notFound(); // Si las lecciones no se encuentran, también indica que la ruta no existe
  }

  // 3. Ensamblar el objeto de curso completo
  const fullCourse: LearningCourse = {
    ...courseMeta,
    lessons: lessons,
  };

  return <CourseDetailClient course={fullCourse} />;
}
