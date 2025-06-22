// src/app/dashboard/page.tsx

import React from 'react';
import Link from 'next/link';

const LearningPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)] text-white text-center">
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-vibrant-teal drop-shadow-lg">
          Mi Aprendizaje en AstroLearn
        </h1>
        <p className="text-gray-200 text-lg mb-8 max-w-prose mx-auto">
          Bienvenido a tu espacio personal de aprendizaje. Aquí encontrarás un resumen de tu progreso, desafíos pendientes y herramientas recomendadas para mejorar tus habilidades en programación.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-3xl font-bold text-bright-orange mb-3">Progreso General</h2>
            <p className="text-gray-300 text-base">
              Aún no tienes datos de progreso, ¡es hora de empezar!
            </p>
            <p className="text-gray-400 text-sm mt-2">
              (Aquí se mostrarán tus puntos totales, desafíos completados, etc.)
            </p>
            <Link href="/problems" className="mt-4 inline-block bg-vibrant-teal text-white py-2 px-5 rounded-full font-semibold transition-colors duration-200 hover:bg-[#00FFC6]/90">
              Ir a Problemas
            </Link>
          </div>

          <div className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-3xl font-bold text-accent-purple mb-3">Herramientas</h2>
            <p className="text-gray-300 text-base">
              Explora nuestras herramientas útiles para el desarrollo.
            </p>
            <ul className="text-gray-400 text-sm mt-2 list-disc list-inside">
              <li>Generador de Contraseñas</li>
              <li>Calculadora de Precios</li>
              <li>Temporizador Pomodoro</li>
            </ul>
            <Link href="/passwords" className="mt-4 inline-block bg-bright-orange text-white py-2 px-5 rounded-full font-semibold transition-colors duration-200 hover:bg-[#ff9900]/90">
              Explorar Herramientas
            </Link>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-10">
          Este es un prototipo de tu página de aprendizaje. Las funcionalidades completas se añadirán en el futuro.
        </p>
      </div>
    </div>
  );
};

export default LearningPage;