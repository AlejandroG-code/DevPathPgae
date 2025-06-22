// components/PomodoroApp.tsx
'use client';

import React, { useState, useEffect } from 'react';

const PomodoroApp: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus'); // focus, shortBreak, longBreak
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  // Configuración de tiempos (en minutos)
  const timerSettings = {
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished
            clearInterval(interval!);
            setIsActive(false);
            handleTimerEnd(); // Handle what happens when timer ends
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
  }, [isActive, minutes, seconds, mode]); // Added mode as dependency

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    setMinutes(timerSettings[mode]); // Reset to current mode's time
  };

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsActive(false);
    setMinutes(timerSettings[newMode]);
    setSeconds(0);
  };

  const handleTimerEnd = () => {
    // Aquí podrías añadir lógica para sonidos, notificaciones de navegador,
    // o un modal personalizado en lugar de `alert()`.
    // Por ejemplo: showCustomNotification(`¡${mode === 'focus' ? 'Tiempo de descanso!' : '¡Tiempo de enfoque!'}`, 'Suena el timbre');

    if (mode === 'focus') {
      setPomodorosCompleted(prev => prev + 1);
      // Decide next break type
      if ((pomodorosCompleted + 1) % 4 === 0) { // After 4 focus sessions (4th completed)
        switchMode('longBreak');
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('focus'); // After break, go back to focus
    }
  };

  const formatTime = (num: number) => num < 10 ? `0${num}` : num;

  return (
    <div className="p-8 bg-[#24243a]/70 rounded-xl shadow-2xl border border-[#00FFC6]/20 text-white text-center">
      <h3 className="text-4xl font-extrabold mb-8 text-vibrant-teal drop-shadow-md">
        Aplicación de Estudio con Técnica Pomodoro Gamificada
      </h3>
      <p className="text-gray-200 mb-8 text-lg max-w-2xl mx-auto">
        Mejora tu concentración y productividad con este temporizador Pomodoro. Acumula Pomodoros completados para tus metas.
      </p>

      {/* Timer Display */}
      <div className="my-10 p-6 bg-[#1a1b26] rounded-lg shadow-inner border border-gray-700">
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
              ? 'bg-red-600 hover:bg-red-700 text-white' // Texto blanco cuando está activo (pausar)
              : 'bg-vibrant-teal hover:bg-[#00FFC6]/90 text-white'}` // Texto blanco cuando está inactivo (iniciar)
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
      <div className="flex justify-center space-x-3 text-lg mb-4 p-4 bg-[#1a1b26] rounded-lg border border-gray-700 shadow-inner">
        <button
          onClick={() => switchMode('focus')}
          className={`py-2 px-5 rounded-full transition-colors duration-200 font-medium hover:scale-[1.05]
            ${mode === 'focus' ? 'bg-vibrant-teal text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}` // Mantener texto negro aquí si el fondo es claro
          }
        >
          Enfoque ({timerSettings.focus}min)
        </button>
        <button
          onClick={() => switchMode('shortBreak')}
          className={`py-2 px-5 rounded-full transition-colors duration-200 font-medium hover:scale-[1.05]
            ${mode === 'shortBreak' ? 'bg-bright-orange text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}` // Mantener texto negro aquí si el fondo es claro
          }
        >
          Descanso Corto ({timerSettings.shortBreak}min)
        </button>
        <button
          onClick={() => switchMode('longBreak')}
          className={`py-2 px-5 rounded-full transition-colors duration-200 font-medium hover:scale-[1.05]
            ${mode === 'longBreak' ? 'bg-accent-purple text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}` // Texto blanco para fondo púrpura
          }
        >
          Descanso Largo ({timerSettings.longBreak}min)
        </button>
      </div>
      <p className="text-gray-500 text-sm mt-6">
        *Este temporizador es una herramienta básica. Para sonidos y notificaciones, considera el uso de APIs de navegador.
      </p>
    </div>
  );
};

export default PomodoroApp;
