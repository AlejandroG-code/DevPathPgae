// src/app/_components/navbar/page.tsx

'use client';

import React, { useState, useEffect, JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// FIX: Changed 'href' to 'route' to match the data structure in layout.tsx
interface NavbarProps {
  modules: {
    id: string;
    name: string;
    icon: JSX.Element; // icon is JSX.Element as per layout.tsx
    route: string; // Changed from href to route
  }[];
}

const Navbar: React.FC<NavbarProps> = ({ modules }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Helper function to get shorter names for Navbar display
  const getDisplayModuleName = (module: { id: string; name: string; route: string }) => {
    switch (module.id) {
      case 'dashboard': return 'Dashboard'; // Or 'Mi Aprendizaje' if you prefer a shorter name
      case 'challenges': return 'Problemas';
      case 'roadmaps': return 'Roadmaps';
      case 'puzzles': return 'Juegos';
      case 'cost-calculator': return 'Calculadora';
      case 'password-generator': return 'Contraseñas';
      case 'pomodoro-app': return 'Pomodoro';
      default: return module.name; // Fallback to full name if no short name is defined
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e2e]/90 backdrop-blur-md shadow-lg p-4 flex justify-between items-center border-b border-[#00FFC6]/10">
      <div className="flex items-center">
        {/* Logo/Brand (Always links to the landing page) */}
        <Link
          href="/"
          className="flex items-center text-vibrant-teal transition-all duration-200 hover:scale-105 hover:text-[#00FFC6]/80"
          aria-label="Ir a la página de inicio de DevPath"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256" fill="currentColor">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM136,80v48a8,8,0,0,1-8,8h-32a8,8,0,0,1,0-16h24V80a8,8,0,0,1,16,0Z"></path>
          </svg>
          <span className="ml-3 text-3xl font-extrabold text-gray-50">DevPath</span>
        </Link>
      </div>

      {/* Mobile menu button (Hamburger) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-vibrant-teal rounded-md p-2"
        aria-label="Toggle navigation"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          )}
        </svg>
      </button>

      {/* Desktop navigation links */}
      <ul className="hidden lg:flex items-center space-x-6">
        {modules.map((module) => (
          <li key={module.id}>
            <Link
              href={module.route} // Now correctly uses 'route'
              className={`flex items-center text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200
                ${pathname === module.route
                  ? 'bg-[#00FFC6]/20 text-vibrant-teal shadow-md' // Active state
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}` // Inactive state
              }
              aria-label={`Ir a ${module.name}`}
            >
              <span className="text-xl">{module.icon}</span> {/* Display icon */}
              <span className="ml-2">{getDisplayModuleName(module)}</span> {/* Display short name */}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu overlay (conditionally rendered) */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#1e1e2e]/90 backdrop-blur-md shadow-lg py-4 border-t border-[#00FFC6]/10">
          <ul className="flex flex-col items-center space-y-4">
            {modules.map((module) => (
              <li key={module.id} className="w-full text-center">
                <Link
                  href={module.route} // Correctly uses 'route'
                  className={`block text-lg font-medium px-4 py-3 rounded-md transition-colors duration-200
                    ${pathname === module.route
                      ? 'bg-[#00FFC6]/20 text-vibrant-teal shadow-md'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`
                  }
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span className="text-xl">{module.icon}</span>
                    <span>{module.name}</span> {/* Full name for mobile menu for clarity */}
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