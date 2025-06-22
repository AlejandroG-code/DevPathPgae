// src/app/dashboard/page.tsx

// NO 'use client' needed if it only renders static content or uses Link (which is client-side by default)
// but for now, let's keep it 'use client' just in case for future interactivity.
'use client';

import React from 'react';
import Link from 'next/link'; // For navigation to tool pages

// We need the modules data here to render the cards.
// Since modules are defined in layout.tsx, we could pass them down via context or define them here again.
// For simplicity and avoiding a context provider for now, let's redefine them here as well.
// In a larger app, you'd put this data in a shared constant file.
const modules = [
  {
    id: 'challenges',
    name: 'Problemas de Programación',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
        <path d="M64,224a8,8,0,0,1-8-8V40a8,8,0,0,1,16,0V216A8,8,0,0,1,64,224ZM192,224a8,8,0,0,1-8-8V40a8,8,0,0,1,16,0V216A8,8,0,0,1,192,224ZM160,112H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z"></path>
      </svg>
    ),
    description: 'Una extensa biblioteca de desafíos para principiantes e intermedios.',
    href: '/problems',
  },
  {
    id: 'roadmaps',
    name: 'Roadmaps de Aprendizaje',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
        <path d="M213.66,42.34A8,8,0,0,0,208,40H56a8,8,0,0,0-5.66,13.66L144,144l-58.34,58.34A8,8,0,0,0,96,216h96a8,8,0,0,0,5.66-13.66L112,112Z"></path>
      </svg>
    ),
    description: 'Guías visuales y estructuradas para diversas rutas de desarrollo.',
    href: '/roadmaps',
  },
  {
    id: 'puzzles',
    name: 'Mini-Juego de Lógica/Puzzles',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
        <path d="M224,128a96,96,0,0,0-96-96,8,8,0,0,0-8,8v40a8,8,0,0,1-8,8,16,16,0,0,0-16,16v80a8,8,0,0,1-8,8,96,96,0,0,0,0,0,8,8,0,0,0,8,8v-40a8,8,0,0,1,8-8,16,16,0,0,0,16-16V64a8,8,0,0,1,8-8,96.11,96.11,0,0,0,96,96A96.11,96.11,0,0,0,224,128Z"></path>
      </svg>
    ),
    description: 'Componente interactivo para ejercitar el pensamiento crítico y la resolución de problemas.',
    href: '/puzzles',
  },
  {
    id: 'cost-calculator',
    name: 'Calculadora de Costo',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
        <path d="M208,48H48A16,16,0,0,0,32,64V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V64A16,16,0,0,0,208,48Zm0,16V80H48V64ZM48,208V96H208V208Zm16-104h32a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16Zm80,0h32a8,8,0,0,1,0,16H144a8,8,0,0,1,0-16Zm-80,48h32a8,8,0,0,1,0,16H64a8,8,0,0,1,0-16Zm80,0h32a8,8,0,0,1,0,16H144a8,8,0,0,1,0-16Z"></path>
      </svg>
    ),
    description: 'Herramienta interactiva para estimar costos de proyectos web.',
    href: '/calculator',
  },
  {
    id: 'password-generator',
    name: 'Generador de Contraseñas',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
        <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208Z"></path>
      </svg>
    ),
    description: 'Genera contraseñas aleatorias y robustas.',
    href: '/passwords',
  },
  {
    id: 'pomodoro-app',
    name: 'App Pomodoro',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM136,80v48a8,8,0,0,1-8,8h-32a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0Z"></path>
      </svg>
    ),
    description: 'Herramienta de productividad para optimizar el enfoque y la gestión del tiempo de estudio.',
    href: '/pomodoro',
  },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)]"> {/* Adjusted min-height for Navbar */}
      <div className="bg-highlight/80 backdrop-blur-md p-8 rounded-neumorphic shadow-neumorphic border border-[#00FFC6]/20 w-full max-w-6xl">
        <h2 className="text-4xl font-bold mb-8 text-center text-vibrant-teal">Your DevPath Hub</h2>
        <p className="text-xl text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Explore your personalized toolkit for coding challenges, learning paths, and productivity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link key={module.id} href={module.href} className="block">
              <div className="bg-dark-indigo p-6 rounded-lg shadow-neumorphic hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-[#00FFC6]/20 hover:border-[#00FFC6]">
                <div className="text-vibrant-teal text-5xl mb-4 flex justify-center">{module.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-light-gray text-center">{module.name}</h3>
                <p className="text-medium-gray text-center">{module.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;