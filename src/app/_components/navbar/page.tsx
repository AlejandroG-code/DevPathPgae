// src/app/_components/navbar/page.tsx

'use client'; // Esta directiva es CRUCIAL para que los hooks de React funcionen en el cliente

import React, { useState, useEffect, JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Definición de la interfaz para cada módulo de navegación
interface Module {
  id: string;      // Identificador único del módulo (ej. 'challenges')
  name: string;    // Nombre completo del módulo (ej. 'Challenges')
  icon: JSX.Element; // Icono del módulo (componente React)
  route: string;   // Ruta del módulo (ej. '/problems')
}

// Props que recibe el Navbar (un array de módulos)
interface NavbarProps {
  modules: Module[];
}

const Navbar: React.FC<NavbarProps> = ({ modules }) => {
  const pathname = usePathname(); // Hook de Next.js para obtener la ruta actual del cliente
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar el menú móvil (hamburguesa)

  // Efecto para cerrar el menú móvil automáticamente cuando la ruta cambia
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]); // Se ejecuta cada vez que 'pathname' cambia

  // Función auxiliar para obtener nombres de visualización más cortos o específicos
  // para los enlaces del escritorio.
  // Aquí es donde puedes definir nombres cortos diferentes a los 'module.name' si lo deseas.
  const getDisplayModuleName = (module: Module) => {
    switch (module.id) {
      // Importante: Hemos eliminado el 'case "dashboard": return "Home";'
      // Ahora, si necesitas un nombre corto, lo defines para el ID de cada módulo.
      case 'learning': return 'Learning '; // Renombra a 'Learning Resources'
      case 'challenges': return 'Problems'; // Renombra 'Challenges' a 'Problems' en la UI
      case 'roadmaps': return 'Roadmaps';    // Mantiene 'Roadmaps'
      case 'games': return 'Games';       // Renombra 'Puzzles' a 'Games'
      case 'calculator': return 'Calculator'; // Renombra a 'Calculator'
      case 'password': return 'Passwords'; // Renombra a 'Passwords'
      case 'pomodoro': return 'Pomodoro';    // Renombra a 'Pomodoro'
      default: return module.name; // Para cualquier otro módulo, usa su nombre completo
    }
  };

  // Filtramos los módulos. En este punto, 'dashboard' ya no debería venir en 'modules' desde layout.tsx.
  // Sin embargo, este filtro actúa como una doble capa de seguridad.
  const filteredModules = modules.filter(module => module.id !== 'dashboard');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e2e]/90 backdrop-blur-md shadow-lg p-4 flex justify-between items-center border-b border-[#00FFC6]/10">
      <div className="flex items-center">
        {/* Logo/Brand: Siempre enlaza a la página raíz ('/') de la aplicación */}
        <Link
          href="/"
          className="flex items-center text-vibrant-teal transition-all duration-200 hover:scale-105 hover:text-[#00FFC6]/80"
          aria-label="Go to DevPath home page" // Etiqueta accesible para el lector de pantalla
        >
          {/* Icono del logo (SVG) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM136,80v48a8,8,0,0,1-8,8h-32a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0Z"></path>
          </svg>
          {/* Texto del logo */}
          <span className="ml-3 text-3xl font-extrabold text-gray-50">DevPath</span>
        </Link>
      </div>

      {/* Botón para el menú móvil (hamburguesa) - visible solo en pantallas pequeñas */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Alterna el estado del menú
        className="lg:hidden text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-vibrant-teal rounded-md p-2"
        aria-label="Toggle navigation"
      >
        {/* Icono de hamburguesa o cruz, según el estado del menú */}
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          )}
        </svg>
      </button>

      {/* Enlaces de navegación para escritorio - ocultos en pantallas pequeñas */}
      <ul className="hidden lg:flex items-center space-x-6">
        {/* Mapea sobre los módulos filtrados */}
        {filteredModules.map((module) => (
          <li key={module.id}>
            <Link
              href={module.route}
              className={`flex items-center text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200
                ${pathname === module.route // Clase condicional para el estado "activo"
                  ? 'bg-[#00FFC6]/20 text-vibrant-teal shadow-md'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`
              }
              aria-label={`Go to ${getDisplayModuleName(module)}`} // Etiqueta accesible basada en el nombre de visualización
            >
              <span className="text-xl">{module.icon}</span> {/* Muestra el icono */}
              <span className="ml-2">{getDisplayModuleName(module)}</span> {/* Muestra el nombre corto/específico */}
            </Link>
          </li>
        ))}
      </ul>

      {/* Overlay del menú móvil (se muestra condicionalmente) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#1e1e2e]/90 backdrop-blur-md shadow-lg py-4 border-t border-[#00FFC6]/10">
          <ul className="flex flex-col items-center space-y-4">
            {/* Mapea sobre los módulos filtrados también para el menú móvil */}
            {filteredModules.map((module) => (
              <li key={module.id} className="w-full text-center">
                <Link
                  href={module.route}
                  className={`block text-lg font-medium px-4 py-3 rounded-md transition-colors duration-200
                    ${pathname === module.route
                      ? 'bg-[#00FFC6]/20 text-vibrant-teal shadow-md'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`
                  }
                  aria-label={`Go to ${module.name}`} // Para móvil, se usa el nombre completo del módulo para mayor claridad
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span className="text-xl">{module.icon}</span>
                    <span>{module.name}</span> {/* Nombre completo para el menú móvil */}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;