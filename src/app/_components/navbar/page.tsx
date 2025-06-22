// src/app/_components/navbar/page.tsx

'use client';

import React, { useState, useEffect, JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Module {
  id: string;
  name: string;
  icon: JSX.Element;
  route: string;
}

interface NavbarProps {
  modules: Module[];
}

const Navbar: React.FC<NavbarProps> = ({ modules }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Close the mobile menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Helper function to get shorter display names for desktop navigation
  const getDisplayModuleName = (module: Module) => {
    switch (module.id) {
      case 'dashboard': return 'Home'; // Short name for the new Home/Dashboard
      case 'challenges': return 'Problems';
      case 'roadmaps': return 'Roadmaps';
      case 'puzzles': return 'Games';
      case 'cost-calculator': return 'Calculator';
      case 'password-generator': return 'Passwords';
      case 'pomodoro-app': return 'Pomodoro';
      default: return module.name; // Fallback to full name if no short name is defined
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e2e]/90 backdrop-blur-md shadow-lg p-4 flex justify-between items-center border-b border-[#00FFC6]/10">
      <div className="flex items-center">
        {/* Logo/Brand (Always links to the home page, now the Landing Page) */}
        <Link
          href="/"
          className="flex items-center text-vibrant-teal transition-all duration-200 hover:scale-105 hover:text-[#00FFC6]/80"
          aria-label="Go to DevPath home page" // Corrected aria-label
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
        aria-label="Toggle navigation" // Corrected aria-label
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
              href={module.route}
              className={`flex items-center text-lg font-medium py-2 px-4 rounded-md transition-colors duration-200
                ${pathname === module.route
                  ? 'bg-[#00FFC6]/20 text-vibrant-teal shadow-md' // Active state
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}` // Inactive state
              }
              // Dynamically set aria-label using the English display name
              aria-label={`Go to ${getDisplayModuleName(module)}`}
            >
              <span className="text-xl">{module.icon}</span> {/* Display the icon */}
              <span className="ml-2">{getDisplayModuleName(module)}</span> {/* Display the short name */}
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
                  href={module.route}
                  className={`block text-lg font-medium px-4 py-3 rounded-md transition-colors duration-200
                    ${pathname === module.route
                      ? 'bg-[#00FFC6]/20 text-vibrant-teal shadow-md'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'}`
                  }
                  aria-label={`Go to ${module.name}`} // Use full module name for mobile aria-label
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