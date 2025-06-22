// _componentes/navbar/page.tsx

'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';

// Define props interface for Navbar
interface NavbarProps {
  modules: {
    id: string;
    name: string;
    icon: JSX.Element;
    // subModules is no longer used directly by Navbar for rendering,
    // but the type definition can remain if DashboardPage still uses it internally
    subModules?: {
      id: string;
      name: string;
      icon: JSX.Element;
    }[];
  }[];
  activeModule: string;
  // activeSubModule is no longer needed in NavbarProps as all modules are top-level
  // activeSubModule: string;
  onModuleSelect: (moduleId: string) => void; // Simplified, no subModuleId needed
}

const Navbar: React.FC<NavbarProps> = ({ modules, activeModule, onModuleSelect }) => {
  const router = useRouter();
  // showToolsSubMenu state is no longer needed as there's no submenu
  // const [showToolsSubMenu, setShowToolsSubMenu] = useState(false);

  // All modules are now treated as main modules for direct rendering
  const allMainModules = modules; // No filtering needed anymore

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e2e]/90 backdrop-blur-md shadow-lg p-4 flex justify-between items-center border-b border-[#00FFC6]/10">
      <div className="flex items-center">
        {/* Logo o Título de la Aplicación */}
        <button
          onClick={() => router.push('/')} // Keep home link for DevPath
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
        {allMainModules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleSelect(module.id)}
            className={`flex items-center text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200
              ${activeModule === module.id ? 'bg-[#00FFC6]/20 text-vibrant-teal' : 'text-gray-300 hover:bg-gray-700/50'}`
            }
            aria-label={`Ir a ${module.name}`}
          >
            {module.icon}
            <span className="ml-2 hidden md:inline">{module.name}</span> {/* Hide text on small screens */}
          </button>
        ))}
        {/* Removed "Herramientas Útiles" with Submenu - now all tools are direct buttons */}
      </div>
    </nav>
  );
};

export default Navbar;
