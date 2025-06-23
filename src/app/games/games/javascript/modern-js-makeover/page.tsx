// src/app/games/javascript/modern-js-makeover/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { allModernJsMakeoverQuestions, ModernJsMakeoverQuestion } from './data';

const QUESTIONS_PER_GAME = 5;

const ModernJsMakeoverPage: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<ModernJsMakeoverQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const selectRandomQuestions = useCallback(() => {
    if (allModernJsMakeoverQuestions.length <= QUESTIONS_PER_GAME) {
      return [...allModernJsMakeoverQuestions].sort(() => 0.5 - Math.random());
    }
    const shuffled = [...allModernJsMakeoverQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, QUESTIONS_PER_GAME);
  }, []);

  const initializeGame = useCallback(() => {
    const selected = selectRandomQuestions();
    setSessionQuestions(selected);
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setShowExplanation(false);
    setScore(0);
    setGameOver(false);
    setSelectedOption(null);
  }, [selectRandomQuestions]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleOptionClick = (option: string) => {
    if (gameOver || feedback || sessionQuestions.length === 0) return;

    setSelectedOption(option);
    const currentQuestion = sessionQuestions[currentQuestionIndex];
    // Normalizar para comparación (quitar espacios en blanco extra y saltos de línea)
    const normalizeCode = (code: string) => code.trim().replace(/\s+/g, ' ');

    if (normalizeCode(option) === normalizeCode(currentQuestion.correctAnswer)) {
      setFeedback('Correct! This is a modern and concise way.');
      setScore(prev => prev + 1);
    } else {
      setFeedback('Incorrect. Keep learning about modern JS features!');
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setShowExplanation(false);
    setSelectedOption(null);
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleRestartGame = () => {
    initializeGame();
  };

  const currentQuestion = sessionQuestions[currentQuestionIndex];

  if (sessionQuestions.length === 0 && !gameOver) {
    return (
      <div className="flex flex-col items-center p-8 min-h-[calc(100vh-64px)] text-white bg-gray-900">
        <p className="text-xl text-gray-300">Loading questions...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vibrant-teal mx-auto mt-5"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8 min-h-[calc(100vh-64px)] text-white bg-gray-900">
      <button
        onClick={() => router.push('/games')}
        className="mb-6 text-vibrant-teal hover:text-[#00FFC6]/80 transition-colors duration-200 flex items-center text-lg font-medium self-start"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
          <path d="M165.66,200.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
        </svg>
        <span className="ml-2">Back to Games</span>
      </button>

      <h1 className="text-4xl font-extrabold mb-4 text-vibrant-teal text-center drop-shadow-md">
        JavaScript: Modern JS Makeover
      </h1>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-3xl mx-auto">
        Refactor &#39;old school&#39; JavaScript code to modern ES6+ syntax and best practices.
      </p>

      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-3xl">
        {!gameOver ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Question {currentQuestionIndex + 1} / {sessionQuestions.length}
            </h3>
            <p className="text-gray-300 mb-4">{currentQuestion?.task}</p>

            {/* Old Code Snippet Display */}
            <div className="mb-6">
              <h4 className="text-md font-semibold text-vibrant-teal mb-2">Original Code:</h4>
              <div className="bg-gray-900/50 p-4 rounded-md border border-gray-700">
                <pre className="text-red-300 whitespace-pre-wrap font-mono text-sm">
                  {currentQuestion?.oldCode.trim()}
                </pre>
              </div>
            </div>

            {/* Multiple Choice Options for Refactored Code */}
            <h4 className="text-md font-semibold text-vibrant-teal mb-2">Choose the best refactored version:</h4>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {currentQuestion?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`p-3 rounded-md text-lg font-medium transition-colors duration-200 text-left
                    ${feedback ? 'cursor-not-allowed opacity-70' : 'hover:scale-[1.01]'}
                    ${feedback && option === currentQuestion.correctAnswer ? 'bg-green-700 text-white' : ''}
                    ${feedback && option !== currentQuestion.correctAnswer && option === selectedOption ? 'bg-red-700 text-white' : ''}
                    ${!feedback ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-700 text-gray-200'}
                  `}
                  disabled={feedback !== null}
                >
                  <pre className="whitespace-pre-wrap text-sm">{option}</pre>
                </button>
              ))}
            </div>

            {/* Feedback and Explanation */}
            {feedback && (
              <div className="mt-4 p-4 rounded-md bg-gray-800/70 border border-gray-600">
                <p className={`text-lg font-bold ${feedback.includes('Correct') ? 'text-green-400' : 'text-red-400'} mb-2`}>
                  {feedback}
                </p>
                {showExplanation && (
                  <>
                    <h4 className="text-md font-semibold text-vibrant-teal mt-3 mb-1">Explanation:</h4>
                    <p className="text-gray-300 text-sm">
                      {currentQuestion?.explanation}
                    </p>
                  </>
                )}
              </div>
            )}

            {feedback && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleNextQuestion}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 shadow-md"
                >
                  {currentQuestionIndex < sessionQuestions.length - 1 ? 'Next Question' : 'Finish Game'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-vibrant-teal mb-4">Game Over!</h2>
            <p className="text-xl text-gray-300 mb-6">
              You scored {score} out of {sessionQuestions.length} questions.
            </p>
            <button
              onClick={handleRestartGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 shadow-md"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernJsMakeoverPage;