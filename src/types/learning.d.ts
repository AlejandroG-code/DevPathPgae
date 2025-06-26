// src/types/learning.ts

// Interfaz para la metadata de una lección individual
export interface LessonMetadata {
  id: string;
  title: string;
  // Puedes añadir más propiedades aquí si tus lecciones las tienen,
  // como 'description' o 'filePath'
}

// Interfaz para la metadata de un curso completo
export interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  icon: string; // Por ejemplo, un emoji o una ruta a un ícono
  homePagePath?: string; // Ruta a la página de inicio específica del curso (opcional)
  lessons?: LessonMetadata[]; // Array de lecciones, ahora es OPCIONAL
}
