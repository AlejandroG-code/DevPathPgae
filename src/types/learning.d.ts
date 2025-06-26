/* eslint-disable @typescript-eslint/no-empty-object-type */
// src/types/learning.ts

export interface LessonMetadata {
  id: string;
  title: string;
  // Añade cualquier otra propiedad que tus JSON de lecciones puedan tener aquí
  // Por ejemplo: path: string; content?: string; etc.
  path?: string; // Si tienes una ruta específica para el contenido de la lección
}

// LearningLesson es idéntica a LessonMetadata para este propósito,
// pero se exporta explícitamente para coincidir con tus importaciones.
export interface LearningLesson extends LessonMetadata {}


export interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  icon: string; 
  homePagePath?: string; 
  lessons?: LessonMetadata[]; // lessons es opcional en la metadata inicial
}

// Interfaz completa para un curso una vez que las lecciones se han cargado
export interface LearningCourse extends CourseMetadata {
  lessons: LearningLesson[]; // Aquí lessons es OBLIGATORIO porque ya se han cargado y asignado
}
