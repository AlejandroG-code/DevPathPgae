/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/[courseId]/layout.tsx

import React, { ReactNode } from 'react';

// Define la interfaz para las props que el layout recibirá
interface LayoutProps {
  children: ReactNode; // Contenido anidado de la ruta (la page.tsx, otros layouts, etc.)
  params: {
    courseId: string; // El segmento dinámico de la URL, por ejemplo, 'c' cuando la URL es /learning/c
  };
}

// Este es un Root Layout para la ruta /learning/[courseId]
// No es un Client Component a menos que se use 'use client'.
// Por defecto, los layouts del App Router son Server Components.
export default function CourseLayout({ children, params }: LayoutProps) {
  // 'params.courseId' contendrá el ID del curso (ej. 'c')
  // Puedes usarlo aquí para, por ejemplo, mostrar un encabezado específico del curso
  // o cargar datos del curso si fuera un Server Component.

  return (
    <section>
      {/* Esto renderizará el page.tsx o sub-layouts que estén dentro de /learning/[courseId] */}
      {children}
    </section>
  );
}
