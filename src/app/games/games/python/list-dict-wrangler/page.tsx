// src/app/games/python/list-dict-wrangler/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { allListDictWranglerQuestions, ListDictWranglerQuestion } from './data';

const QUESTIONS_PER_GAME = 5; // Limitar a un número pequeño para demostración

const ListDictWranglerPage: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<ListDictWranglerQuestion[]>([]);

  const selectRandomQuestions = useCallback(() => {
    if (allListDictWranglerQuestions.length <= QUESTIONS_PER_GAME) {
      return [...allListDictWranglerQuestions].sort(() => 0.5 - Math.random());
    }
    const shuffled = [...allListDictWranglerQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, QUESTIONS_PER_GAME);
  }, []);

  const initializeGame = useCallback(() => {
    const selected = selectRandomQuestions();
    setSessionQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setFeedback(null);
    setShowExplanation(false);
    setScore(0);
    setGameOver(false);
  }, [selectRandomQuestions]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleSubmitAnswer = () => {
    if (gameOver || feedback || sessionQuestions.length === 0) return;

    const currentQuestion = sessionQuestions[currentQuestionIndex];
    if (userAnswer.trim() === currentQuestion.correctAnswer.trim()) {
      setFeedback('Correct!');
      setScore(prev => prev + 1);
    } else {
      setFeedback(`Incorrect. The correct answer was: '${currentQuestion.correctAnswer}'`);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setShowExplanation(false);
    setUserAnswer('');
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
        onClick={() => router.push('/games')} // Volver a la página principal de juegos
        className="mb-6 text-vibrant-teal hover:text-[#00FFC6]/80 transition-colors duration-200 flex items-center text-lg font-medium self-start"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
          <path d="M165.66,200.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
        </svg>
        <span className="ml-2">Back to Games</span>
      </button>

      <h1 className="text-4xl font-extrabold mb-4 text-vibrant-teal text-center drop-shadow-md">
        Python: List/Dictionary Wrangler
      </h1>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-3xl mx-auto">
        Complete the Python code snippets to manipulate lists and dictionaries.
      </p>

      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-3xl">
        {!gameOver ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Question {currentQuestionIndex + 1} / {sessionQuestions.length}
            </h3>
            <p className="text-gray-300 mb-4">{currentQuestion?.task}</p>

            {/* Code Snippet Display with Input */}
            <div className="bg-gray-900/50 p-4 rounded-md mb-6 border border-gray-700">
              <pre className="text-green-300 whitespace-pre-wrap font-mono text-sm">
                {currentQuestion?.codeSnippet}
                <input
                  type="text"
                  className="inline-block w-48 bg-gray-700 text-white border-b-2 border-vibrant-teal focus:outline-none px-1 py-0.5 text-center font-mono"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && userAnswer.trim() !== '' && feedback === null) {
                      handleSubmitAnswer();
                    }
                  }}
                  disabled={feedback !== null}
                  placeholder="_____"
                />
                {/* Asumimos que no hay 'codeAfter' explícito en este formato, si lo hubiera, se añadiría aquí */}
              </pre>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <button
                onClick={handleSubmitAnswer}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200 shadow-md"
                disabled={feedback !== null || userAnswer.trim() === ''}
              >
                Submit Answer
              </button>
            </div>

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

export default ListDictWranglerPage;