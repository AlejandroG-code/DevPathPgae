/* eslint-disable react/jsx-no-comment-textnodes */
// src/app/problems/page.tsx

'use client';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useCallback, useEffect } from 'react';

// Import JSON files directly
import easyChallengesData from '../../../public/data/easy_challenges.json'; //
import mediumChallengesData from '../../../public/data/medium_challenges.json'; //
import hardChallengesData from '../../../public/data/hard_challenges.json'; //

interface Challenge {
  id: string;
  title: string;
  description: string;
  examples: { input: string; output: string }[];
  hints: string[];
  solutionJs: string;
  solutionPython: string;
  solutionJava: string;
  solutionCpp: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  score: number;
}

const ProblemsPage: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [errorChallenges, setErrorChallenges] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'solutionJs' | 'solutionPython' | 'solutionJava' | 'solutionCpp'>('solutionJs');
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  useEffect(() => {
    const loadChallenges = () => {
      setLoadingChallenges(true);
      setErrorChallenges(null);
      try {
        // Combine all challenge data from the imported JSONs
        const allChallenges: Challenge[] = [
          ...(easyChallengesData as Challenge[]), //
          ...(mediumChallengesData as Challenge[]), //
          ...(hardChallengesData as Challenge[]), //
        ];
        
        const processedData = allChallenges.map((challenge, index) => ({
            ...challenge,
            id: challenge.id || `challenge-${index}`
        }));

        const sortedChallenges = processedData.sort((a, b) => {
            const difficulties = {'Easy': 1, 'Medium': 2, 'Hard': 3};
            const diffA = difficulties[a.difficulty];
            const diffB = difficulties[b.difficulty];
            if (diffA !== diffB) {
                return diffA - diffB;
            }
            return a.id.localeCompare(b.id);
        });
        setChallenges(sortedChallenges);
      } catch (error) {
        console.error("Error loading challenges:", error);
        setErrorChallenges("Error loading problems. Ensure the JSON files exist and are accessible in the public/data directory.");
      } finally {
        setLoadingChallenges(false);
      }
    };

    loadChallenges();
  }, []); // Empty dependency array means this effect runs once on mount

  const filteredChallenges = challenges.filter(challenge =>
    filterDifficulty === 'All' || challenge.difficulty === filterDifficulty
  );

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setRevealedHints([]);
    setShowSolution(false);
    setSelectedLanguage('solutionJs');
  };

  const handleRevealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints(prev => [...prev, index]);
    }
  };

  const handleRevealSolution = () => {
    const confirmed = window.confirm('Are you sure you want to view the solution? This will not grant you points.');
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
      default: return 'Solution not available for this language.';
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-[calc(100vh-64px)] text-white">
      {/* Title and description moved outside the main container */}
      <h1 className="text-5xl font-extrabold mb-4 text-vibrant-teal text-center drop-shadow-md">
        Programming Problems
      </h1>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-3xl mx-auto">
        Test your programming and logic skills with our collection of challenges.
      </p>

      {/* Main problems container: wider and with blurred background */}
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl">
        {loadingChallenges ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-300">Loading problems...</p>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vibrant-teal mx-auto mt-5"></div>
          </div>
        ) : errorChallenges ? (
          <div className="text-center py-20 text-red-400 text-xl">
            <p>{errorChallenges}</p>
            <p className="text-sm text-gray-500 mt-2">Check the JSON files in the public/data directory and their content.</p>
          </div>
        ) : !selectedChallenge ? (
          // Challenge List View
          <div className="flex-1">
            {/* Difficulty Filter */}
            <div className="mb-6 flex justify-center space-x-4 flex-wrap gap-2">
              {['All', 'Easy', 'Medium', 'Hard'].map(difficulty => (
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
                      className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-200 border border-gray-700 hover:border-vibrant-teal text-white"
                  >
                      <h4 className="text-2xl font-semibold mb-2 text-white">{challenge.title}</h4>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-3">{challenge.description}</p>
                      <div className="flex justify-between items-center text-sm">
                      <span
                          className={`px-3 py-1 rounded-full font-bold
                              ${challenge.difficulty === 'Easy' ? 'bg-green-600/30 text-green-300' : ''}
                              ${challenge.difficulty === 'Medium' ? 'bg-yellow-600/30 text-yellow-300' : ''}
                              ${challenge.difficulty === 'Hard' ? 'bg-red-600/30 text-red-300' : ''}`
                          }
                      >
                          {challenge.difficulty}
                      </span>
                      <span className="text-gray-400">{challenge.score} Points</span>
                      </div>
                  </div>
                  ))
              ) : (
                  <p className="text-center text-gray-400 text-lg col-span-full mt-10">No problems available for this difficulty.</p>
              )}
            </div>
          </div>
        ) : (
          // Challenge Detail View
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel: Instructions, Examples, Hints */}
            <div className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700 flex flex-col">
              <button
                onClick={() => setSelectedChallenge(null)}
                className="mb-4 text-vibrant-teal hover:text-[#00FFC6]/80 transition-colors duration-200 flex items-center text-lg font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M165.66,200.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                </svg>
                <span className="ml-2">Back to Problems</span>
              </button>
              <h4 className="text-3xl font-bold mb-4 text-white">{selectedChallenge.title}</h4>
              <span
                className={`px-4 py-1 rounded-full font-bold text-sm mb-4 inline-block
                  ${selectedChallenge.difficulty === 'Easy' ? 'bg-green-600/30 text-green-300' : ''}
                  ${selectedChallenge.difficulty === 'Medium' ? 'bg-yellow-600/30 text-yellow-300' : ''}
                  ${selectedChallenge.difficulty === 'Hard' ? 'bg-red-600/30 text-red-300' : ''}`
                }
              >
                {selectedChallenge.difficulty} ({selectedChallenge.score} Points)
              </span>

              <div className="overflow-y-auto pr-2 flex-1">
                  <h5 className="text-xl font-semibold mt-6 mb-2 text-vibrant-teal">Problem Description:</h5>
                  <p className="text-gray-300 mb-4 text-base">{selectedChallenge.description}</p>

                  <h5 className="text-xl font-semibold mt-6 mb-2 text-vibrant-teal">Examples:</h5>
                  {selectedChallenge.examples.map((example, index) => (
                  <div key={index} className="bg-gray-800/50 p-4 rounded-lg mb-3 text-sm border border-gray-600">
                      <p className="font-mono text-gray-300"><span className="text-gray-400">Input:</span> <code className="text-white bg-gray-900/50 px-1 rounded">{example.input}</code></p>
                      <p className="font-mono text-gray-300"><span className="text-gray-400">Output:</span> <code className="text-white bg-gray-900/50 px-1 rounded">{example.output}</code></p>
                  </div>
                  ))}

                  <h5 className="text-xl font-semibold mt-6 mb-2 text-vibrant-teal">Hints:</h5>
                  {selectedChallenge.hints.map((hint, index) => (
                  <div key={index} className="mb-3">
                      {!revealedHints.includes(index) ? (
                      <button
                          onClick={() => handleRevealHint(index)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200 shadow-md"
                      >
                          Reveal Hint {index + 1}
                      </button>
                      ) : (
                      <p className="text-gray-300 text-base border-l-4 border-blue-500 pl-3 py-1">{hint}</p>
                      )}
                  </div>
                  ))}
              </div>
            </div>

            {/* Right Panel: Code Area & Solution */}
            <div className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700 flex flex-col">
              <h5 className="text-xl font-semibold mb-4 text-vibrant-teal">Your Code Area:</h5>
              <div className="flex-1 bg-gray-800/50 rounded-lg p-4 text-gray-300 font-mono text-sm overflow-auto mb-4 border border-gray-600">
                <p className="text-gray-400">// Write your code here</p>
                <p className="text-gray-400">// For now, this is a placeholder.</p>
                <p className="text-gray-400">// In the future, there will be a functional code editor here.</p>
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
                Reveal Official Solution (No Points Granted)
              </button>
              {showSolution && selectedChallenge && (
                <div className="mt-4 bg-gray-900/50 p-4 rounded-lg overflow-auto text-sm border border-gray-700">
                  <h6 className="text-lg font-semibold text-vibrant-teal mb-2">Official Solution ({selectedLanguage.replace('solution', '')}):</h6>
                  <pre className="text-green-300 whitespace-pre-wrap p-2 bg-black/50 rounded-md">{getSolutionCode(selectedChallenge, selectedLanguage)}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemsPage;