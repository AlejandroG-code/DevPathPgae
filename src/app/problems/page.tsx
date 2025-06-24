/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/problems/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Aunque no se usará para la navegación entre problemas, se mantiene por si hay otros enlaces.

// Importa los tres archivos JSON de desafíos
import easyChallenges from '../../../public/data/easy_challenges.json';
import mediumChallenges from '../../../public/data/medium_challenges.json';
import hardChallenges from '../../../public/data/hard_challenges.json';

// Combina todos los desafíos en un solo array una vez
const allProblems = [...easyChallenges, ...mediumChallenges, ...hardChallenges];

const ProblemsPage: React.FC = () => {
  // Estado para el problema actualmente seleccionado
  // Si es null, muestra la cuadrícula; si es un objeto de problema, muestra el detalle.
  const [selectedProblem, setSelectedProblem] = useState<any>(null);

  // Estados para el detalle del problema (anteriormente en [id]/page.tsx)
  const [revealedHint, setRevealedHint] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [selectedSolutionLanguage, setSelectedSolutionLanguage] = useState<string>('javascript');

  // Define los mapeos de lenguaje para las soluciones
  const languageMapping: { [key: string]: string } = {
    solutionJs: 'JavaScript',
    solutionPython: 'Python',
    solutionJava: 'Java',
    solutionCpp: 'C++',
  };

  // Efecto para restablecer estados al cambiar de problema o volver a la lista
  useEffect(() => {
    if (selectedProblem) {
      // Al seleccionar un nuevo problema, reinicia los estados de pistas y solución
      setRevealedHint(null);
      setShowSolution(false);

      // Asegúrate de que el lenguaje por defecto exista para el nuevo problema
      const defaultLangKey = `solution${selectedSolutionLanguage.charAt(0).toUpperCase() + selectedSolutionLanguage.slice(1)}`;
      if (!selectedProblem[defaultLangKey]) {
        const availableSolutionKeys = Object.keys(languageMapping).filter(key => selectedProblem[key]);
        if (availableSolutionKeys.length > 0) {
          const firstLang = availableSolutionKeys[0].replace('solution', '').toLowerCase();
          setSelectedSolutionLanguage(firstLang);
        } else {
          setSelectedSolutionLanguage(''); // Ningún lenguaje disponible
        }
      }
    }
  }, [selectedProblem, selectedSolutionLanguage]);

  // Función para manejar la selección de un problema de la cuadrícula
  const handleProblemSelect = (problemId: string) => {
    const problem = allProblems.find(p => p.id === problemId);
    if (problem) {
      setSelectedProblem(problem);
    }
  };

  // Función para volver a la cuadrícula de problemas
  const handleBackToProblems = () => {
    setSelectedProblem(null);
  };

  // Renderizar la lista de problemas si no hay ninguno seleccionado
  if (!selectedProblem) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-64px)] text-white">
        <div className="bg-transparent backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-vibrant-teal text-center drop-shadow-md">
            Programming Problems
          </h1>
          <p className="text-gray-200 text-base md:text-lg mb-10 text-center max-w-2xl mx-auto">
            Test your programming and logic skills with our collection of challenges. Click on a problem to view its details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProblems.map((problem) => (
              // Usamos un div clickeable en lugar de Link, y el onClick llama a handleProblemSelect
              <div
                key={problem.id}
                onClick={() => handleProblemSelect(problem.id)}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 flex flex-col justify-between h-full
                           hover:bg-gray-700/50 hover:border-vibrant-teal transition-all duration-300 transform hover:scale-[1.02] cursor-pointer shadow-lg"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2 text-white">{problem.title}</h2>
                  <p className={`text-sm font-semibold mb-4 ${
                    problem.difficulty === 'Easy' ? 'text-green-400' :
                    problem.difficulty === 'Medium' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {problem.difficulty} - {problem.score} Score
                  </p>
                  <p className="text-gray-300 text-base line-clamp-3">{problem.description}</p>
                </div>
                <div className="mt-6 text-right">
                  <button className="inline-flex items-center px-6 py-2 rounded-full text-lg font-bold text-white
                                     bg-accent-purple/80 hover:bg-accent-purple transition-all duration-300 shadow-md">
                    Solve Problem
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Si hay un problema seleccionado, renderizar los detalles del problema
  const problem = selectedProblem; // Usamos 'problem' para mantener la coherencia con el código anterior

  const handleRevealHint = (hintIndex: number) => {
    setRevealedHint(hintIndex);
  };

  const handleRevealSolution = () => {
    setShowSolution(true);
  };

  const solutionLanguageOptions = Object.keys(languageMapping)
    .filter(key => problem[key]) // Solo si el problema tiene una solución para ese lenguaje
    .map(key => ({
      value: key.replace('solution', '').toLowerCase(), // 'solutionJs' -> 'js'
      label: languageMapping[key] // 'JavaScript'
    }));

  const currentSolutionKey = `solution${selectedSolutionLanguage.charAt(0).toUpperCase() + selectedSolutionLanguage.slice(1)}`;
  const currentSolution = problem[currentSolutionKey];

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 min-h-[calc(100vh-64px)] text-white">
      <div className="bg-transparent backdrop-blur-md p-6 md:p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          {/* Botón para volver a la lista de problemas */}
          <button
            onClick={handleBackToProblems}
            className="flex items-center text-gray-400 hover:text-vibrant-teal transition-colors duration-200 mb-6"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to Problems
          </button>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
            {problem.title}
          </h1>
          <p className={`text-lg font-semibold mb-6 ${
            problem.difficulty === 'Easy' ? 'text-green-400' :
            problem.difficulty === 'Medium' ? 'text-yellow-400' :
            'text-red-400'
          }`}>
            {problem.difficulty} ({problem.score} Score)
          </p>
        </div>

        {/* Main Content Area (Problem Description & Examples) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Problem Details */}
          <div className="order-2 md:order-1">
            <div className="mb-6 p-5 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
              <h2 className="text-2xl font-bold mb-3 text-gray-100 border-b border-gray-600 pb-2">
                Instructions:
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">{problem.description}</p>
            </div>

            <div className="mb-6 p-5 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
              <h2 className="text-2xl font-bold mb-3 text-gray-100 border-b border-gray-600 pb-2">
                Examples:
              </h2>
              {problem.examples.map((example: any, index: number) => (
                <div key={index} className="mb-3 last:mb-0">
                  <p className="text-gray-300 font-mono text-sm">{example.input}</p>
                  <p className="text-gray-300 font-mono text-sm text-vibrant-teal">{example.output}</p>
                </div>
              ))}
            </div>

            {/* Hints Section */}
            <div className="p-5 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
              <h2 className="text-2xl font-bold mb-3 text-gray-100 border-b border-gray-600 pb-2">
                Hints:
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {problem.hints.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleRevealHint(index)}
                    className="relative px-5 py-2.5 rounded-lg text-lg font-bold text-white overflow-hidden group transition-all duration-300 ease-out
                               bg-gray-800/60 border border-gray-700 hover:border-vibrant-teal
                               shadow-lg hover:shadow-vibrant-teal/30"
                  >
                    <span className="absolute inset-0 bg-vibrant-teal opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                    <span className="relative">Reveal Hint {index + 1}</span>
                  </button>
                ))}
              </div>
              {revealedHint !== null && (
                <div className="mt-4 p-4 rounded-lg bg-gray-800 border border-gray-600 text-gray-300">
                  <p>{problem.hints[revealedHint]}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Placeholder for Code Area / Solution */}
          <div className="order-1 md:order-2">
            <div className="p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700 h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-gray-100 border-b border-gray-600 pb-2">
                Your Approach (Placeholder)
              </h2>
              <div className="flex-grow flex items-center justify-center text-center text-gray-500 italic mb-6">
                For now, this is a placeholder. In the future, there will be a functional code editor here.
              </div>

              {/* Language Selector for Solution */}
              {solutionLanguageOptions.length > 0 && (
                <div className="mb-4">
                  <label htmlFor="solution-language" className="block text-gray-300 text-lg font-semibold mb-2">
                    Select Solution Language:
                  </label>
                  <select
                    id="solution-language"
                    value={selectedSolutionLanguage}
                    onChange={(e) => {
                      setSelectedSolutionLanguage(e.target.value);
                      setShowSolution(false); // Ocultar la solución si se cambia de lenguaje
                    }}
                    className="w-full p-3 rounded-lg bg-[#1a1b26] text-white border border-gray-700 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none"
                  >
                    {solutionLanguageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Reveal Solution Button */}
              <button
                onClick={handleRevealSolution}
                className="relative w-full px-5 py-3 rounded-lg text-xl font-bold text-white overflow-hidden group transition-all duration-300 ease-out
                           bg-accent-purple/60 border border-accent-purple hover:border-accent-purple/80
                           shadow-lg hover:shadow-accent-purple/30 focus:outline-none focus:ring-2 focus:ring-accent-purple/50
                           transform hover:scale-[1.01]"
              >
                <span className="absolute inset-0 bg-accent-purple opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                <span className="relative">Reveal Solution</span>
              </button>

              {/* Solution Display Area */}
              {showSolution && currentSolution && (
                <div className="mt-6 p-4 rounded-lg bg-[#1a1b26] border border-gray-600 text-gray-300 overflow-auto max-h-[40vh]">
                  <h3 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2 text-white">
                    Official Solution ({languageMapping[`solution${selectedSolutionLanguage.charAt(0).toUpperCase() + selectedSolutionLanguage.slice(1)}`]}):
                  </h3>
                  <pre className="text-sm leading-relaxed whitespace-pre-wrap">{currentSolution}</pre>
                </div>
              )}
               {showSolution && !currentSolution && (
                <div className="mt-6 p-4 rounded-lg bg-[#1a1b26] border border-gray-600 text-red-400">
                  <p>Solution not available for {languageMapping[`solution${selectedSolutionLanguage.charAt(0).toUpperCase() + selectedSolutionLanguage.slice(1)}`]} for this problem.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsPage;