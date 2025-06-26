    // src/types/learning.ts

    export interface LessonMetadata {
      id: string;
      title: string;
    }

    export interface CourseMetadata {
      id: string;
      title: string;
      description: string;
      icon: string; 
      homePagePath?: string; 
      lessons?: LessonMetadata[]; // Crucial: 'lessons' es opcional
    }