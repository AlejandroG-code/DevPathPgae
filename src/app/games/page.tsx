// src/app/games/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface GameInfo {
  id: string;
  name: string;
  description: string;
  route: string;
  language: string; // Para agrupar
}

const allGames: GameInfo[] = [
  // Juegos Existentes (Guess the Output, Fill in the Blanks)
  {
    id: 'guess-the-output',
    name: 'Guess the Output',
    description: 'Predict the output of short JavaScript code snippets.',
    route: '/games/games/javascript/guess-the-output',
    language: 'JavaScript',
  },
  {
    id: 'fill-in-the-blanks',
    name: 'Fill in the Blanks',
    description: 'Complete missing parts of code snippets.',
    route: '/games/games/javascript/fill-in-the-blanks',
    language: 'JavaScript',
  },
  // Juegos de Python
  {
    id: 'python-list-dict-wrangler',
    name: 'List/Dictionary Wrangler',
    description: 'Practice manipulating lists and dictionaries in Python.',
    route: '/games/games/python/list-dict-wrangler',
    language: 'Python',
  },
  {
    id: 'python-function-flow',
    name: 'Function Flow Fun',
    description: 'Trace function execution and predict outputs in Python.',
    route: '/games/games/python/function-flow-fun',
    language: 'Python',
  },
  {
    id: 'python-file-io',
    name: 'File I/O Frontier',
    description: 'Learn to read and write files in Python.',
    route: '/games/games/python/file-io-frontier',
    language: 'Python',
  },

  // Juegos de C++
  {
    id: 'cpp-pointer-path-puzzle',
    name: 'Pointer Path Puzzle',
    description: 'Navigate memory and pointers in C++.',
    route: '/games/games/cpp/pointer-path-puzzle',
    language: 'C++',
  },
  {
    id: 'cpp-memory-manager',
    name: 'Memory Manager Maze',
    description: 'Identify and fix memory errors in C++.',
    route: '/games/games/cpp/memory-manager-maze',
    language: 'C++',
  },
  {
    id: 'cpp-template-type-trooper',
    name: 'Template Type Trooper',
    description: 'Understand C++ templates and generic programming.',
    route: '/games/games/cpp/template-type-trooper',
    language: 'C++',
  },

  // Juegos de JavaScript
  {
    id: 'js-event-listener',
    name: 'Event Listener Labyrinth',
    description: 'Master DOM events and event propagation in JavaScript.',
    route: '/games/games/javascript/event-listener-labyrinth',
    language: 'JavaScript',
  },
  {
    id: 'js-callback-conundrum',
    name: 'Callback Conundrum',
    description: 'Untangle asynchronous JavaScript with callbacks.',
    route: '/games/games/javascript/callback-conundrum',
    language: 'JavaScript',
  },
  {
    id: 'js-modern-makeover',
    name: 'Modern JS Makeover',
    description: 'Refactor old JavaScript code to modern standards.',
    route: '/games/games/javascript/modern-js-makeover',
    language: 'JavaScript',
  },

  // Juegos de Arduino
  {
    id: 'arduino-pin-power-up',
    name: 'Pin Power-Up',
    description: 'Learn to control Arduino pins for LEDs and basic I/O.',
    route: '/games/games/arduino/pin-power-up',
    language: 'Arduino',
  },
  {
    id: 'arduino-serial-communication',
    name: 'Serial Communication Saga',
    description: 'Practice serial communication between Arduino and PC.',
    route: '/games/games/arduino/serial-communication-saga',
    language: 'Arduino',
  },
  {
    id: 'arduino-sensor-scavenger',
    name: 'Sensor Scavenger Hunt',
    description: 'Interact with various sensors using Arduino code.',
    route: '/games/games/arduino/sensor-scavenger-hunt',
    language: 'Arduino',
  },
];

const GamesPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();

  const gamesByLanguage: { [key: string]: GameInfo[] } = allGames.reduce((acc, game) => {
    if (!acc[game.language]) {
      acc[game.language] = [];
    }
    acc[game.language].push(game);
    return acc;
  }, {} as { [key: string]: GameInfo[] });

  const sortedLanguages = Object.keys(gamesByLanguage).sort();

  return (
    // Este div ahora solo contiene el contenido de la página,
    // el fondo es manejado por el layout.
    // Mantenemos el 'p-8' y el 'text-white' y el 'bg-gray-900/50' para la tarjeta.
    <div className="flex flex-col items-center p-8 min-h-[calc(100vh-64px)] text-white"> {/* Adjusted min-h for typical header/footer */}
      <h1 className="text-4xl font-extrabold mb-4 text-vibrant-teal text-center drop-shadow-md">
        DevPath Arcade
      </h1>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-3xl mx-auto">
        Select a game to test and improve your coding skills!
      </p>

      <div className="w-full max-w-5xl">
        {sortedLanguages.map((lang) => (
          <div key={lang} className="mb-10">
            <h2 className="text-3xl font-bold text-gray-100 mb-6 border-b-2 border-vibrant-teal pb-2">
              {lang} Games
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gamesByLanguage[lang].map((game) => (
                <Link key={game.id} href={game.route} passHref>
                  <div className="group bg-gray-800/70 p-6 rounded-lg shadow-xl border border-[#00FFC6]/20 hover:border-vibrant-teal hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-semibold text-vibrant-teal group-hover:text-[#00FFC6] mb-3">
                        {game.name}
                      </h3>
                        <p className="text-gray-300 text-base mb-4">
                        {game.description}
                      </p>
                    </div>
                    <button className="self-end mt-4 px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200 shadow-md group-hover:shadow-lg">
                      Play Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;