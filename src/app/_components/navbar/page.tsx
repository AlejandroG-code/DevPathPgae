// src/app/_components/navbar/page.tsx

'use client';

import React, { JSX } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname for active link highlighting

// Define props interface for Navbar. Now it expects a list of modules with hrefs.
interface NavbarProps {
  modules: {
    id: string;
    name: string;
    icon: JSX.Element;
    href: string; // The Navbar now needs the href to navigate
  }[];
}

const Navbar: React.FC<NavbarProps> = ({ modules }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path to highlight the active module

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e2e]/90 backdrop-blur-md shadow-lg p-4 flex justify-between items-center border-b border-[#00FFC6]/10">
      <div className="flex items-center">
        {/* Logo o Título de la Aplicación (Link to Landing Page) */}
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-vibrant-teal transition-all duration-200 hover:scale-105 hover:text-[#00FFC6]/80"
          aria-label="Ir a la página de inicio de DevPath"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM136,80v48a8,8,0,0,1-8,8h-32a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0Z"></path>
          </svg>
          <span className="ml-3 text-3xl font-extrabold text-gray-50">DevPath</span>
        </button>
      </div>

      {/* Enlaces de Navegación de Módulos */}
      <div className="flex items-center space-x-6">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => router.push(module.href)} // Navigate directly to the module's page
            className={`flex items-center text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200
              ${pathname === module.href ? 'bg-[#00FFC6]/20 text-vibrant-teal' : 'text-gray-300 hover:bg-gray-700/50'}`
            }
            aria-label={`Ir a ${module.name}`}
          >
            {module.icon}
            <span className="ml-2 hidden md:inline">{module.name}</span> {/* Hide text on small screens */}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;