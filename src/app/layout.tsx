// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Your global CSS with Tailwind directives

import Navbar from './_components/navbar/page'; // Import the Navbar component
import BackgroundNeumorphic from './_components/Background'; // Import the Background component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevPath - Your Learning Hub',
  description: 'Unlock your dev potential with coding challenges, roadmaps, and powerful tools.',
};

// Define the modules here once, to be passed to the Navbar and Dashboard
const modules = [
  {
    id: 'dashboard', // Added dashboard as a module for the Navbar (link back to hub)
    name: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
        <path d="M220,136a4,4,0,0,1-4,4H204V208a4,4,0,0,1-4,4H152a4,4,0,0,1-4-4V160a4,4,0,0,0-4-4H108a4,4,0,0,0-4,4v48a4,4,0,0,1-4,4H56a4,4,0,0,1-4-4V140H36a4,4,0,0,1-4-4,4,4,0,0,1,1.52-3.12l88-75.43a4,4,0,0,1,5,0l88,75.43A4,4,0,0,1,220,136Z"></path>
      </svg>
    ),
    href: '/dashboard', // Link to the dashboard page
    description: 'Your central hub for all DevPath tools and features.',
  },
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Background is rendered once for the entire app */}
        <BackgroundNeumorphic />

        {/* Navbar is rendered once and passed the modules data */}
        <Navbar modules={modules} />

        {/* This div applies global styling for the main content area, pushing it below the Navbar */}
        <div className="relative z-10 pt-[64px] h-full min-h-screen overflow-y-auto">
          {children} {/* This is where your individual page content will be rendered */}
        </div>
      </body>
    </html>
  );
}