// src/app/pomodoro/page.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';

const PomodoroAppPage: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  // Audio ref for the timer end sound
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Configuración de tiempos (en minutos)
  const timerSettings = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  useEffect(() => {
    // Initialize audio element when component mounts
    audioRef.current = new Audio('/sounds/bell.mp3'); // Ensure this path is correct

    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            clearInterval(interval!);
            setIsActive(false);
            handleTimerEnd();
          } else {
            setMinutes(minutes => minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds => seconds - 1);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, mode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(timerSettings[mode]);
  };

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsActive(false);
    setMinutes(timerSettings[newMode]);
    setSeconds(0);
  };

  const handleTimerEnd = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Play sound when timer ends
    }

    if (mode === 'focus') {
      setPomodorosCompleted(prev => prev + 1);
      if ((pomodorosCompleted + 1) % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('focus');
    }
  };

  const formatTime = (num: number) => num < 10 ? `0${num}` : num;

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)] text-white">
      {/* Main container with transparent/blurred background and wider max-width */}
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 text-white text-center w-full max-w-7xl"> {/* Wider: max-w-7xl, transparent/blurred background */}
        <h3 className="text-4xl font-extrabold mb-8 text-vibrant-teal drop-shadow-md">
          Aplicación de Estudio con Técnica Pomodoro Gamificada
        </h3>
        <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
          Mejora tu concentración y productividad con este temporizador Pomodoro. Acumula Pomodoros completados para tus metas.
        </p>

        {/* Timer Display */}
        <div className="my-10 p-6 bg-transparent backdrop-blur-sm rounded-lg shadow-inner border border-gray-700"> {/* Transparent/blurred inner background */}
          <div className="text-9xl font-mono font-bold text-white drop-shadow-lg mb-4 leading-none">
            {formatTime(minutes)}:{formatTime(seconds)}
          </div>
          <p className="text-gray-400 text-2xl mb-2">Modo actual: <span className="font-semibold text-vibrant-teal">{mode === 'focus' ? 'Enfoque' : mode === 'shortBreak' ? 'Descanso Corto' : 'Descanso Largo'}</span></p>
          <p className="text-gray-400 text-2xl">Pomodoros Completados: <span className="font-semibold text-bright-orange">{pomodorosCompleted}</span></p>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={toggleTimer}
            className={`py-4 px-10 rounded-full text-2xl font-bold transition-all duration-300 shadow-lg hover:scale-[1.03]
              ${isActive
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-vibrant-teal hover:bg-[#00FFC6]/90 text-white'}`
            }
          >
            {isActive ? 'Pausar' : 'Iniciar'}
          </button>
          <button
            onClick={resetTimer}
            className="py-4 px-10 rounded-full text-2xl font-bold bg-gray-600 hover:bg-gray-700 text-white transition-all duration-300 shadow-lg hover:scale-[1.03]"
          >
            Reiniciar
          </button>
        </div>

        {/* Mode Switch Buttons */}
        <div className="flex justify-center space-x-3 text-lg mb-4 p-4 bg-transparent backdrop-blur-sm rounded-lg border border-gray-700 shadow-inner"> {/* Transparent/blurred inner background */}
          <button
            onClick={() => switchMode('focus')}
            className={`py-2 px-5 rounded-full transition-colors duration-200 font-medium hover:scale-[1.05]
              ${mode === 'focus' ? 'bg-vibrant-teal text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
            }
          >
            Enfoque ({timerSettings.focus}min)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            className={`py-2 px-5 rounded-full transition-colors duration-200 font-medium hover:scale-[1.05]
              ${mode === 'shortBreak' ? 'bg-bright-orange text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
            }
          >
            Descanso Corto ({timerSettings.shortBreak}min)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            className={`py-2 px-5 rounded-full transition-colors duration-200 font-medium hover:scale-[1.05]
              ${mode === 'longBreak' ? 'bg-accent-purple text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`
            }
          >
            Descanso Largo ({timerSettings.longBreak}min)
          </button>
        </div>
        {/* Removed the footnote text as requested */}
      </div>
    </div>
  );
};

export default PomodoroAppPage;