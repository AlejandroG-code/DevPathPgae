// src/app/dashboard/page.tsx

'use client';

import React, { useState, useEffect, useCallback, JSX } from 'react';
import Navbar from '../_components/navbar/page';
import CostCalculator from '../_components/CostCalculator';
import PasswordGenerator from '../_components/PasswordGenerator';
import DailyChallenges from '../_components/DailyChallenges'; // Ahora "Problemas de Programación"
import PomodoroApp from '../_components/PomodoroApp';


// Define the structure for modules, now all at top-level
interface Module {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  component: JSX.Element; // All modules now directly have a component
}

const DashboardPage: React.FC = () => {
  // State to manage the active module (e.g., 'challenges', 'cost-calculator', etc.)
  const [activeModule, setActiveModule] = useState('challenges');

  // State for hydration fix
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define all modules here as a flat list.
  const modules: Module[] = [
    {
      id: 'challenges',
      name: 'Problemas de Programación',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
          <path d="M64,224a8,8,0,0,1-8-8V40a8,8,0,0,1,16,0V216A8,8,0,0,1,64,224ZM192,224a8,8,0,0,1-8-8V40a8,8,0,0,1,16,0V216A8,8,0,0,1,192,224ZM160,112H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Z"></path>
        </svg>
      ),
      description: 'Una extensa biblioteca de desafíos para principiantes e intermedios.',
      component: <DailyChallenges />, // No longer passes db/appId
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
      component: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-4 text-vibrant-teal">Roadmaps de Aprendizaje</h2>
          <p className="text-gray-300 text-lg">
            Sigue caminos estructurados para dominar nuevas tecnologías y estar listo para roles específicos de desarrollador.
            Cada roadmap desglosa el viaje en etapas, temas clave y recursos recomendados, incluyendo enlaces directos
            a los Problemas de Programación relevantes dentro de DevPath. También se pueden integrar recursos externos como documentación oficial y cursos gratuitos.
          </p>
          <div className="mt-8 p-6 bg-[#24243a]/70 rounded-lg border border-[#00FFC6]/20">
            <p className="text-gray-200">¡Aquí se mostrarán los roadmaps de aprendizaje!</p>
          </div>
        </div>
      ),
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
      component: (
        <div className="text-white">
          <h2 className="text-4xl font-bold mb-4 text-vibrant-teal">Mini-Juego de Lógica o Puzzles</h2>
          <p className="text-gray-300 text-lg">
            Ejercita tu mente con un juego simple, adictivo y basado en la lógica (por ejemplo, un juego de memoria,
            un puzzle de números tipo Sudoku o un desafío de palabras). El juego se desarrollará internamente,
            sin depender de APIs externas, ofreciendo una actividad divertida que simultáneamente fortalece las habilidades cognitivas y lógicas.
          </p>
          <div className="mt-8 p-6 bg-[#24243a]/70 rounded-lg border border-[#00FFC6]/20">
            <p className="text-gray-200">¡Aquí irá el mini-juego de lógica o puzzle!</p>
          </div>
        </div>
      ),
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
      component: <CostCalculator />,
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
      component: <PasswordGenerator />,
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
      component: <PomodoroApp />,
    },
  ];

  // Function to handle module selection from Navbar
  const handleModuleSelect = useCallback((moduleId: string) => {
    setActiveModule(moduleId);
  }, []);

  // Determine the content to display based on active module
  const renderModuleContent = () => {
    const currentModule = modules.find(m => m.id === activeModule);
    return currentModule ? currentModule.component : null;
  };

  return (
    // Outer container: Full screen height, hides any global overflow.
    <div className="h-screen relative text-gray-100 font-sans antialiased bg-[#161622] overflow-hidden">

      {/* --- Navbar component - now passed module data and state setters --- */}
      <Navbar
        modules={modules}
        activeModule={activeModule}
        onModuleSelect={handleModuleSelect}
      />

      {/* --- CSS BACKGROUND LAYERS (identical to Landing Page for consistency) --- */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient-to-tr from-violet-700/50 via-transparent to-transparent blur-[250px] opacity-70 animate-pulse-light transform -translate-x-1/2"></div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient-to-tl from-teal-500/50 via-transparent to-transparent blur-[250px] opacity-70 animate-pulse-light transform translate-x-1/2"></div>
        {isClient && [...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-dot-pulse"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: `${0.1 + Math.random() * 0.4}`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      </div>

      {/* --- MAIN CONTENT AREA - Takes up remaining height below navbar, handles its own scroll --- */}
      {/* 'pt-[64px]' to offset content below the fixed Navbar */}
      <main className="relative z-10 pt-[64px] h-full overflow-y-auto">
        <div className="p-8"> {/* Padding for the content inside main */}
          <div className="bg-[#1e1e2e]/70 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-[#00FFC6]/20 min-h-[calc(100vh-144px)]"> {/* min-h for consistent background */}
            {renderModuleContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
