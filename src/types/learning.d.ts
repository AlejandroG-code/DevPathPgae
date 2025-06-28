// src/types/learning.ts

// Interfaz para la metadata básica de cada lección (ID y Título)
// Esta metadata la obtendremos de los archivos *-course-structure.json
export interface LessonMetadata {
  id: string;
  title: string;
  // Puedes añadir más propiedades aquí si tus lecciones las tienen (ej. 'description', 'duration')
}

// CourseMetadata ahora es más flexible
export interface CourseMetadata {
  id: string;
  title: string;
  description: string;
  icon: string; 
  homePagePath?: string; 
  lessonsPath: string; // Ruta al archivo JSON con la lista de lecciones (ej. "courses/c-course-structure.json")
  mdxContentDir?: string; // Opcional: Ruta al directorio que contiene los archivos .mdx si el curso usa MDX (ej. "python")
}

// Interfaz para un curso completo, después de que se hayan cargado sus lecciones detalladas
export interface LearningCourse extends CourseMetadata {
  lessons: LessonMetadata[]; // Aquí 'lessons' es OBLIGATORIO, ya que se habrá cargado desde el lessonsPath
}
