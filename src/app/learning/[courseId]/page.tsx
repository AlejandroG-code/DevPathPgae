    /* eslint-disable react/jsx-no-undef */
    // src/app/learning/[courseId]/page.tsx
    // ESTE ES UN SERVER COMPONENT - IMPORTANTE: NO TIENE 'use client'

    import { notFound } from 'next/navigation';
    // Importa interfaces necesarias. Mantén el alias si está configurado.
    import type { CourseMetadata, LearningCourse, LearningLesson } from '@/types/learning'; 

    // Importa el JSON principal de metadata de cursos
    // Usando rutas relativas a public/data/
    import coursesMetadata from '../../../../public/data/courses_meta.json'; 

    // Importa *TODOS* los JSON de lecciones directamente al principio del Server Component.
    // ¡ACCEDEMOS A 'as LearningLesson[]' PARA ASEGURAR QUE ES EL ARRAY!
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

    // Importa el Client Component que contiene la UI interactiva
    import CourseDetailClient from '@/app/_components/learning/CourseDetailClient'; 

    // Mapeo de IDs de curso a sus respectivos arrays de lecciones importados
    // Asegúrate de que las claves aquí ('python', 'c', etc.) coincidan exactamente con los 'id' de tus cursos en courses_meta.json
    const allLessonsData: { [key: string]: LearningLesson[] } = {
      'c': cBasicsLessons as LearningLesson[], 
      'cpp': cppBasicsLessons as LearningLesson[], 
      'python': pythonBasicsLessons as LearningLesson[], 
      'java': javaBasicsLessons as LearningLesson[], 
      'html-css-basics': htmlCssLessons as LearningLesson[],
      'javascript-fundamentals': javascriptFundamentalsLessons as LearningLesson[],
      'csharp-basics': csharpBasicsLessons as LearningLesson[],
      'data-structures-algorithms': dsaLessons as LearningLesson[],
      'sql-databases': sqlLessons as LearningLesson[],
      'git-github': gitGithubLessons as LearningLesson[],
      'web-basics': webBasicsLessons as LearningLesson[],
    };

    // generateStaticParams es crucial para que Next.js sepa qué rutas pre-renderizar
    export async function generateStaticParams() {
      return (coursesMetadata as CourseMetadata[]).map((course) => ({
        courseId: course.id,
      }));
    }

    // Interfaz para los props del Server Component de la página.
    // ¡params se define como una PROMESA!
    interface CourseDetailPageProps {
      params: Promise<{ 
        courseId: string;
      }>;
    }

    export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
      // Hacemos 'await' de 'params' para obtener el objeto resuelto con 'courseId'.
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

      // 4. Pasar el curso completo al Client Component para que renderice la UI interactiva
      return <CourseDetailClient course={fullCourse} />;
    }
    