// src/app/components/LessonSidebar.tsx
'use client'; 

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname to get the current URL
import Link from 'next/link'; // Import Link for client-side navigation (crucial for Back to Courses)

/**
 * Define the global Window interface to include the Prism property.
 * This is necessary because PrismJS is loaded via script tags and attached to window.
 */
declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

/**
 * Defines the interface for an individual lesson in the course structure.
 */
interface Lesson {
  id: string;    // Unique ID for the lesson (e.g., 'c-home', 'c-variables')
  title: string; // Display title of the lesson (e.g., 'C Home', 'C Variables')
}

/**
 * LessonSidebar Component: Displays a navigation sidebar for course lessons.
 * It loads the course structure from a JSON file and allows navigation between lessons.
 * This version focuses on desktop sticky layout with scrollbar and a "Back to Courses" link.
 */
export default function LessonSidebar() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  // Mantengo isMobileMenuOpen, toggleMobileMenu y el botón/backdrop de hamburguesa
  // por si acaso en el futuro quieres activarlos completamente.
  // Actualmente, el 'md:hidden' en el botón y la ausencia de clases de desplazamiento
  // en móvil en el <aside> harán que se comporten como "desactivados" visualmente en móvil.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const pathname = usePathname(); // Get the current URL path from the browser
  const pathSegments = pathname.split('/');
  const courseId = pathSegments[2]; // 'c' (e.g., from /learning/c/c-home)
  const currentLessonId = pathSegments[3]; // 'c-home' (e.g., from /learning/c/c-home)

  useEffect(() => {
    if (!courseId) {
      console.warn("Course ID is undefined in pathname. Cannot load lessons.");
      return;
    }

    const lessonDataUrl = `/data/courses/${courseId}-course-structure.json`;

    fetch(lessonDataUrl) 
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} for ${lessonDataUrl}`);
        }
        return response.json(); 
      })
      .then(data => {
        if (Array.isArray(data)) {
          setLessons(data); 
        } else {
          console.error("Error: Fetched data is not an array. Check your JSON format.", data);
          setLessons([]); 
        }
      })
      .catch(error => {
        console.error("Error loading lesson data:", error);
        setLessons([]); 
      });
  }, [courseId, pathname]); 

  // Aunque no lo usemos directamente ahora, lo mantengo por si la lógica de hamburguesa se reactiva.
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button (hidden on desktop) */}
      {/* Se mantiene por su función md:hidden, pero no tiene efecto en desktop */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-purple"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        )}
      </button>

      {/* Mobile Backdrop Overlay (hidden on desktop) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Sidebar Content */}
      <aside
        // CLASES CLAVE PARA DESKTOP:
        // md:fixed md:top-0 md:left-0 md:h-screen md:overflow-y-auto:
        // Hace que sea fijo en desktop, ocupe toda la altura y tenga scroll.
        // w-64 bg-gray-800 text-white p-4 rounded-r-lg shadow-lg: Estilos base.
        // TRANSICIONES Y POSICIÓN EN MÓVIL:
        // fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        // ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        // NOTA: Para que el menú de hamburguesa funcione en móvil, deberías quitar el 'md:hidden'
        // del <aside> y confiar en translate-x-full/0 para esconderlo/mostrarlo.
        // Pero como me has dicho "fuck mobile por ahora", esta configuración lo esconde en móvil por defecto.
        className={`w-64 bg-gray-800 text-white p-4 rounded-r-lg shadow-lg
          fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:block md:fixed md:top-0 md:left-0 md:h-screen md:overflow-y-auto`} 
      >
        <h2 className="text-2xl font-bold mb-6 text-vibrant-teal border-b border-gray-700 pb-3">
          {courseId ? courseId.toUpperCase() + " Course Lessons" : "Loading Lessons..."}
        </h2>
        <nav className="h-full"> {/* Asegura que el nav ocupe el espacio para el scroll */}
          <ul>
            {/* Botón para regresar a los cursos (visible siempre) */}
            <li className="mb-4">
              <Link
                href="/learning" // Asume que /learning es tu página de inicio de cursos
                className="block py-2 px-3 rounded-md transition-colors duration-200 bg-gray-700 text-accent-purple font-semibold hover:bg-gray-600 hover:text-white"
                // No es necesario onClick={() => setIsMobileMenuOpen(false)} aquí ya que en desktop no hay menú móvil activo
                // y en móvil este botón te lleva a otra página.
              >
                ← Back to Courses
              </Link>
            </li>

            {Array.isArray(lessons) && lessons.map((lesson) => ( 
              <li key={lesson.id} className="mb-2">
                <Link
                  href={`/learning/${courseId}/${lesson.id}`}
                  className={`block py-2 px-3 rounded-md transition-colors duration-200 ${
                    currentLessonId === lesson.id
                      ? 'bg-accent-purple text-white font-semibold shadow-md'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  // Quitar onClick para no afectar la navegación si lo necesitas en móvil
                  // onClick={() => setIsMobileMenuOpen(false)} 
                >
                  {lesson.title} 
                </Link>
              </li>
            ))}
            {lessons.length === 0 && (
              <li className="text-gray-400 text-sm italic">
                No lessons found or error loading lessons.
              </li>
            )}
          </ul>
        </nav>
      </aside>
    </>
  );
}
