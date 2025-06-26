// src/types/learning.d.ts

// Interfaz para un bloque de código de ejemplo dentro de una lección
export interface CodeExample {
    lang: string; // Lenguaje del código (ej. "javascript", "python", "java", "html", "css", "bash")
    code: string; // El código en sí
    description?: string; // Descripción opcional del ejemplo de código
  }
  
  // Interfaz para una lección individual dentro de un curso
  export interface LearningLesson {
    id: string; // ID único de la lección (ej. "intro-to-python")
    title: string; // Título de la lección
    description: string; // Breve resumen de lo que trata la lección
    content: string; // El contenido principal de la lección en formato Markdown
    codeExamples?: CodeExample[]; // Array opcional de ejemplos de código para la lección
    relatedLessons?: string[]; // IDs opcionales de lecciones relacionadas
  }
  
  // Interfaz para la metadata general de un curso (sin las lecciones completas)
  export interface CourseMetadata {
    lessons: never[];
    homePagePath: string;
    id: string; // ID único del curso (ej. "python-basics")
    title: string; // Título del curso (ej. "Python Basics")
    description: string; // Breve descripción del curso
    icon?: string; // Icono opcional para el curso (ej. una emoji como "🐍")
    lessonsPath: string; // ¡Ruta al archivo JSON que contiene las lecciones de este curso!
  }
  
  // Interfaz para el objeto de curso COMPLETO, que incluye su metadata y todas sus lecciones cargadas
  export interface LearningCourse extends CourseMetadata {
    lessons: LearningLesson[]; // Array de todas las lecciones del curso
  }
  