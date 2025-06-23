// src/app/games/python/file-io-frontier/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { allFileIOGameQuestions, FileIOGameQuestion } from './data';

const QUESTIONS_PER_GAME = 5;

const FileIOFrontierPage: React.FC = () => {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<FileIOGameQuestion[]>([]);

  const selectRandomQuestions = useCallback(() => {
    if (allFileIOGameQuestions.length <= QUESTIONS_PER_GAME) {
      return [...allFileIOGameQuestions].sort(() => 0.5 - Math.random());
    }
    const shuffled = [...allFileIOGameQuestions].sort(() => 0.5 - Math.random());
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
    // Compara ignorando espacios iniciales/finales y nuevas líneas extras
    const normalizedUserAnswer = userAnswer.trim().replace(/\s+/g, ' ');
    const normalizedCorrectAnswer = currentQuestion.correctAnswerSnippet.trim().replace(/\s+/g, ' ');

    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      setFeedback('Correct!');
      setScore(prev => prev + 1);
    } else {
      setFeedback(`Incorrect. Expected: '${currentQuestion.correctAnswerSnippet}'`);
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

  // Función para renderizar el código con el input insertado
  const renderCodeWithInput = (code: string, answer: string) => {
    // Divide el código por la primera aparición de la línea en blanco o un patrón de placeholder
    // Para este juego, el `correctAnswerSnippet` a menudo contiene código con nuevas líneas
    // Simplificamos asumiendo que el `initialCode` ya tiene la parte inicial y el input es el resto.
    // Opcional: Podrías definir un placeholder como '___INPUT___' en initialCode y reemplazarlo
    return (
      <>
        {code}
        <input
          type="text"
          className="inline-block w-48 bg-gray-700 text-white border-b-2 border-vibrant-teal focus:outline-none px-1 py-0.5 text-center font-mono"
          value={answer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && answer.trim() !== '' && feedback === null) {
              handleSubmitAnswer();
            }
          }}
          disabled={feedback !== null}
          placeholder="_____"
        />
        {/* Si tu correctAnswerSnippet tiene múltiples líneas, el input es solo para la primera parte de la respuesta.
            Para un juego de llenar huecos de varias líneas, se necesitaría un diseño diferente
            o un `textarea` en lugar de `input type="text"`.
            Aquí asumimos que la respuesta del usuario es un fragmento que completa la línea inicial. */}
      </>
    );
  };


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
        Python: File I/O Frontier
      </h1>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-3xl mx-auto">
        Complete the Python code to interact with files.
      </p>

      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-3xl">
        {!gameOver ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Question {currentQuestionIndex + 1} / {sessionQuestions.length}
            </h3>
            <p className="text-gray-300 mb-4">{currentQuestion?.task}</p>

            {currentQuestion?.simulatedFileContent && (
              <div className="bg-gray-800/70 p-3 rounded-md mb-4 text-sm text-gray-400 border border-gray-700">
                <h4 className="font-semibold text-vibrant-teal mb-1">Simulated File Content:</h4>
                <pre className="whitespace-pre-wrap">{currentQuestion.simulatedFileContent}</pre>
              </div>
            )}

            {/* Code Snippet Display with Input */}
            <div className="bg-gray-900/50 p-4 rounded-md mb-6 border border-gray-700">
              <pre className="text-green-300 whitespace-pre-wrap font-mono text-sm">
                {renderCodeWithInput(currentQuestion.initialCode, userAnswer)}
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
                    {feedback.includes('Incorrect') && currentQuestion.expectedOutputOrFileContent && (
                      <div className="mt-2 text-gray-300 text-sm">
                        <h5 className="font-semibold text-vibrant-teal mt-2">Expected Outcome:</h5>
                        <pre className="whitespace-pre-wrap bg-gray-700/50 p-2 rounded-md border border-gray-600">
                          {currentQuestion.expectedOutputOrFileContent}
                        </pre>
                      </div>
                    )}
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

export default FileIOFrontierPage;