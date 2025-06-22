/* eslint-disable react/jsx-no-comment-textnodes */
// components/DailyChallenges.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Define the Challenge interface, matching JSON structure
interface Challenge {
  id: string; // Ensure your JSON has an 'id' field for each challenge
  title: string;
  description: string;
  examples: { input: string; output: string }[];
  hints: string[];
  solutionJs: string;
  solutionPython: string;
  solutionJava: string;
  solutionCpp: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  score: number;
}

const DailyChallenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [errorChallenges, setErrorChallenges] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'solutionJs' | 'solutionPython' | 'solutionJava' | 'solutionCpp'>('solutionJs');
  const [filterDifficulty, setFilterDifficulty] = useState<'Todos' | 'Fácil' | 'Medio' | 'Difícil'>('Todos');

  // --- IMPORTANT: Replace this with your actual public JSON URL ---
  // You will need to host the JSON content provided below somewhere publicly accessible.
  // Example for GitHub Gist raw URL: 'https://gist.githubusercontent.com/YOUR_USERNAME/YOUR_GIST_ID/raw/challenges.json'
  const jsonUrl = '/data/programming_challenges.json'; // Example: if hosted in /public/data/ on your Next.js app

  // Fetch challenges from JSON URL
  useEffect(() => {
    const fetchChallenges = async () => {
      setLoadingChallenges(true);
      setErrorChallenges(null);
      try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Challenge[] = await response.json();
        
        // Ensure each challenge has an 'id'. If not, generate one or use a fallback.
        // For simplicity here, assuming the JSON provides unique IDs, or we can use array index if needed.
        const processedData = data.map((challenge, index) => ({
            ...challenge,
            id: challenge.id || `challenge-${index}` // Fallback ID if not provided in JSON
        }));

        // Sort challenges in memory after fetching
        const sortedChallenges = processedData.sort((a, b) => {
            const difficulties = {'Fácil': 1, 'Medio': 2, 'Difícil': 3};
            // First, sort by difficulty
            const diffA = difficulties[a.difficulty];
            const diffB = difficulties[b.difficulty];
            if (diffA !== diffB) {
                return diffA - diffB;
            }
            // Then, sort by ID for stable order within the same difficulty
            return a.id.localeCompare(b.id);
        });
        setChallenges(sortedChallenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        setErrorChallenges("Error al cargar los problemas. Asegúrate de que el archivo JSON exista y sea accesible.");
      } finally {
        setLoadingChallenges(false);
      }
    };

    fetchChallenges();
  }, [jsonUrl]); // Re-run effect if jsonUrl changes

  // Filter challenges based on selected difficulty
  const filteredChallenges = challenges.filter(challenge =>
    filterDifficulty === 'Todos' || challenge.difficulty === filterDifficulty
  );

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setRevealedHints([]);
    setShowSolution(false);
    setSelectedLanguage('solutionJs'); // Reset language when a new challenge is selected
  };

  const handleRevealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints(prev => [...prev, index]);
    }
  };

  const handleRevealSolution = () => {
    // Custom confirmation logic (replace with a real modal for production)
    // IMPORTANT: window.confirm is used here as a placeholder.
    // In a production environment, you should use a custom modal UI.
    const confirmed = window.confirm('¿Estás seguro de que quieres ver la solución? Esto no te otorgará puntos.');
    if (confirmed) {
      setShowSolution(true);
    }
  };

  const getSolutionCode = (challenge: Challenge, lang: typeof selectedLanguage) => {
    switch (lang) {
      case 'solutionJs': return challenge.solutionJs;
      case 'solutionPython': return challenge.solutionPython;
      case 'solutionJava': return challenge.solutionJava;
      case 'solutionCpp': return challenge.solutionCpp;
      default: return 'Solución no disponible para este lenguaje.';
    }
  };

  return (
    <div className="p-8 bg-[#24243a]/70 rounded-xl shadow-2xl border border-[#00FFC6]/20 text-white min-h-[calc(100vh-160px)] flex flex-col">
      <h3 className="text-4xl font-extrabold mb-8 text-vibrant-teal text-center drop-shadow-md">
        Problemas de Programación
      </h3>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-2xl mx-auto">
        Pon a prueba tus habilidades de programación y lógica con nuestra colección de desafíos.
      </p>

      {loadingChallenges ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-300">Cargando problemas...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vibrant-teal mx-auto mt-5"></div>
        </div>
      ) : errorChallenges ? (
        <div className="text-center py-20 text-red-400 text-xl">
          <p>{errorChallenges}</p>
          <p className="text-sm text-gray-500 mt-2">Verifica la URL del archivo JSON y su contenido.</p>
        </div>
      ) : !selectedChallenge ? (
        // Challenge List View
        <div className="flex-1">
          {/* Difficulty Filter */}
          <div className="mb-6 flex justify-center space-x-4 flex-wrap gap-2">
            {['Todos', 'Fácil', 'Medio', 'Difícil'].map(difficulty => (
              <button
                key={difficulty}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setFilterDifficulty(difficulty as any)}
                className={`py-2 px-5 rounded-full text-lg font-medium transition-all duration-200 shadow-md
                  ${filterDifficulty === difficulty
                    ? 'bg-vibrant-teal text-white transform scale-[1.02]'
                    : 'bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-[1.01]'}`
                }
              >
                {difficulty}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.length > 0 ? (
                filteredChallenges.map(challenge => (
                <div
                    key={challenge.id}
                    onClick={() => handleSelectChallenge(challenge)}
                    className="bg-[#1a1b26] p-6 rounded-lg shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-200 border border-gray-700 hover:border-vibrant-teal text-white"
                >
                    <h4 className="text-2xl font-semibold mb-2 text-white">{challenge.title}</h4>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-3">{challenge.description}</p>
                    <div className="flex justify-between items-center text-sm">
                    <span
                        className={`px-3 py-1 rounded-full font-bold
                            ${challenge.difficulty === 'Fácil' ? 'bg-green-600/30 text-green-300' : ''}
                            ${challenge.difficulty === 'Medio' ? 'bg-yellow-600/30 text-yellow-300' : ''}
                            ${challenge.difficulty === 'Difícil' ? 'bg-red-600/30 text-red-300' : ''}`
                        }
                    >
                        {challenge.difficulty}
                    </span>
                    <span className="text-gray-400">{challenge.score} Puntos</span>
                    </div>
                </div>
                ))
            ) : (
                <p className="text-center text-gray-400 text-lg col-span-full mt-10">No hay problemas disponibles para esta dificultad.</p>
            )}
          </div>
        </div>
      ) : (
        // Challenge Detail View
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel: Instructions, Examples, Hints */}
          <div className="bg-[#1a1b26] p-6 rounded-lg shadow-md border border-gray-700 flex flex-col">
            <button
              onClick={() => setSelectedChallenge(null)}
              className="mb-4 text-vibrant-teal hover:text-[#00FFC6]/80 transition-colors duration-200 flex items-center text-lg font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                <path d="M165.66,200.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
              <span className="ml-2">Volver a los Problemas</span>
            </button>
            <h4 className="text-3xl font-bold mb-4 text-white">{selectedChallenge.title}</h4>
            <span
              className={`px-4 py-1 rounded-full font-bold text-sm mb-4 inline-block
                ${selectedChallenge.difficulty === 'Fácil' ? 'bg-green-600/30 text-green-300' : ''}
                ${selectedChallenge.difficulty === 'Medio' ? 'bg-yellow-600/30 text-yellow-300' : ''}
                ${selectedChallenge.difficulty === 'Difícil' ? 'bg-red-600/30 text-red-300' : ''}`
              }
            >
              {selectedChallenge.difficulty} ({selectedChallenge.score} Puntos)
            </span>

            <div className="overflow-y-auto pr-2 flex-1">
                <h5 className="text-xl font-semibold mt-6 mb-2 text-vibrant-teal">Descripción del Problema:</h5>
                <p className="text-gray-300 mb-4 text-base">{selectedChallenge.description}</p>

                <h5 className="text-xl font-semibold mt-6 mb-2 text-vibrant-teal">Ejemplos:</h5>
                {selectedChallenge.examples.map((example, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg mb-3 text-sm border border-gray-600">
                    <p className="font-mono text-gray-300"><span className="text-gray-400">Input:</span> <code className="text-white bg-gray-900 px-1 rounded">{example.input}</code></p>
                    <p className="font-mono text-gray-300"><span className="text-gray-400">Output:</span> <code className="text-white bg-gray-900 px-1 rounded">{example.output}</code></p>
                </div>
                ))}

                <h5 className="text-xl font-semibold mt-6 mb-2 text-vibrant-teal">Pistas:</h5>
                {selectedChallenge.hints.map((hint, index) => (
                <div key={index} className="mb-3">
                    {!revealedHints.includes(index) ? (
                    <button
                        onClick={() => handleRevealHint(index)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200 shadow-md"
                    >
                        Revelar Pista {index + 1}
                    </button>
                    ) : (
                    <p className="text-gray-300 text-base border-l-4 border-blue-500 pl-3 py-1">{hint}</p>
                    )}
                </div>
                ))}
            </div>
          </div>

          {/* Right Panel: Code Area & Solution */}
          <div className="bg-[#1a1b26] p-6 rounded-lg shadow-md border border-gray-700 flex flex-col">
            <h5 className="text-xl font-semibold mb-4 text-vibrant-teal">Tu Área de Código:</h5>
            <div className="flex-1 bg-gray-800 rounded-lg p-4 text-gray-300 font-mono text-sm overflow-auto mb-4 border border-gray-600">
              <p className="text-gray-400">// Escribe tu código aquí</p>
              <p className="text-gray-400">// Por ahora, esto es un placeholder.</p>
              <p className="text-gray-400">// En el futuro, aquí habrá un editor de código funcional.</p>
            </div>

            {/* Language Selector for Solution */}
            <div className="mb-4 flex justify-center space-x-2 flex-wrap gap-2">
                <button
                    onClick={() => setSelectedLanguage('solutionJs')}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200
                        ${selectedLanguage === 'solutionJs' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    JavaScript
                </button>
                <button
                    onClick={() => setSelectedLanguage('solutionPython')}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200
                        ${selectedLanguage === 'solutionPython' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    Python
                </button>
                <button
                    onClick={() => setSelectedLanguage('solutionJava')}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200
                        ${selectedLanguage === 'solutionJava' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    Java
                </button>
                <button
                    onClick={() => setSelectedLanguage('solutionCpp')}
                    className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200
                        ${selectedLanguage === 'solutionCpp' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    C++
                </button>
            </div>


            <button
              onClick={handleRevealSolution}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 shadow-md"
            >
              Revelar Solución Oficial (No Otorga Puntos)
            </button>
            {showSolution && selectedChallenge && (
              <div className="mt-4 bg-gray-900 p-4 rounded-lg overflow-auto text-sm border border-gray-700">
                <h6 className="text-lg font-semibold text-vibrant-teal mb-2">Solución Oficial ({selectedLanguage.replace('solution', '')}):</h6>
                <pre className="text-green-300 whitespace-pre-wrap p-2 bg-black rounded-md">{getSolutionCode(selectedChallenge, selectedLanguage)}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyChallenges;
