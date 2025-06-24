// src/components/learning/CourseDetailClient.tsx
'use client'; // ¡MUY IMPORTANTE! Esto lo marca como un Client Component

import React, { useState } from 'react';
import Link from 'next/link';
import { LearningCourse, LearningLesson, CodeExample } from '@/types/learning'; // Importa las interfaces

import ReactMarkdown from 'react-markdown'; // Para renderizar contenido Markdown
import rehypeRaw from 'rehype-raw'; // Para permitir HTML puro dentro del Markdown

// Componente auxiliar para renderizar bloques de código
const CodeBlock: React.FC<{ example: CodeExample }> = ({ example }) => {
  return (
    <div className="bg-[#1a1b26] p-4 rounded-lg my-4 text-sm overflow-x-auto border border-gray-700">
      {example.description && <p className="text-gray-400 mb-2 italic">{example.description}</p>}
      <pre className={`language-${example.lang} text-gray-200`}>
        <code>{example.code}</code>
      </pre>
    </div>
  );
};

// Componente para una lección individual, con funcionalidad de expandir/contraer
const LessonComponent: React.FC<{ lesson: LearningLesson }> = ({ lesson }) => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si la lección está abierta

  return (
    <div className="mb-4 bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 flex justify-between items-center text-white text-xl font-semibold hover:bg-gray-700/50 transition-colors duration-200"
      >
        <span>{lesson.title}</span>
        {/* Icono para indicar expandir/contraer */}
        <span className="text-vibrant-teal text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && ( // Solo renderiza el contenido si la lección está abierta
        <div className="p-5 border-t border-gray-700 text-gray-300">
          <p className="mb-4 leading-relaxed">{lesson.description}</p>
          {/* Contenedor para el contenido principal de la lección (Markdown) */}
          {/* Las clases 'prose' de Tailwind Typography dan estilos predeterminados al Markdown */}
          <div className="prose prose-invert max-w-none 
                        [&>h1]:text-white [&>h2]:text-vibrant-teal [&>h3]:text-white [&>h4]:text-gray-100 
                        [&>p]:text-gray-300 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:mb-1 
                        [&>ol]:list-decimal [&>ol]:pl-5">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {lesson.content}
            </ReactMarkdown>
          </div>

          {/* Renderiza los ejemplos de código si existen */}
          {lesson.codeExamples && lesson.codeExamples.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3 text-white">Code Examples:</h3>
              {lesson.codeExamples.map((example, idx) => (
                <CodeBlock key={idx} example={example} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente principal del cliente para el detalle del curso
interface CourseDetailClientProps {
  course: LearningCourse; // Este componente recibe el objeto 'course' completo como prop del Server Component
}

const CourseDetailClient: React.FC<CourseDetailClientProps> = ({ course }) => {
  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-[calc(100vh-64px)] text-white">
      <div className="bg-transparent backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-6xl mx-auto">
        {/* Botón para volver a la lista principal de cursos */}
        <Link href="/learning" className="flex items-center text-gray-400 hover:text-vibrant-teal transition-colors duration-200 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Courses
        </Link>

        {/* Sección de cabecera del curso */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">{course.icon || '📚'}</div> {/* Muestra el icono o un default */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
            {course.title}
          </h1>
          <p className="text-gray-300 text-lg">{course.description}</p>
        </div>

        {/* Título de la sección de lecciones */}
        <h2 className="text-3xl font-bold mb-6 text-vibrant-teal border-b border-gray-700 pb-3">
          Lessons
        </h2>

        {/* Lista de lecciones del curso */}
        <div>
          {course.lessons.map((lesson) => (
            <LessonComponent key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailClient;
