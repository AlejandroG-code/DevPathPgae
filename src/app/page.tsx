// src/app/page.tsx

'use client';

import React from 'react'; // Ya no necesitamos useEffect ni useRef para el canvas

import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleStartJourney = () => {
    router.push('/dashboard');
  };

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    // Contenedor principal con el nuevo color de fondo ligeramente más claro
    <div className="min-h-screen relative text-gray-100 font-sans antialiased bg-[#161622] overflow-hidden">

      {/* --- CAPAS DE FONDO CSS --- */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* Textura de grano sutil */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>

        {/* Luces que vienen de ambos lados */}
        {/* Luz izquierda (Violeta) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient-to-tr from-violet-700/50 via-transparent to-transparent blur-[250px] opacity-70 animate-pulse-light transform -translate-x-1/2"></div>
        {/* Luz derecha (Teal) */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-radial-gradient-to-tl from-teal-500/50 via-transparent to-transparent blur-[250px] opacity-70 animate-pulse-light transform translate-x-1/2"></div>

        {/* Partículas de puntitos que aparecen (estrellas dinámicas) */}
        {[...Array(150)].map((_, i) => ( // Mayor cantidad de puntos
          <div
            key={i}
            className="absolute rounded-full bg-white animate-dot-pulse"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`, // Tamaño pequeño
              height: `${Math.random() * 1.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: `${0.1 + Math.random() * 0.4}`, // Opacidad variable
              animationDelay: `${Math.random() * 8}s`, // Retraso aleatorio
              animationDuration: `${4 + Math.random() * 6}s`, // Duración aleatoria
            }}
          />
        ))}

        {/* Estrellas estáticas (como la versión anterior) */}
        <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] opacity-10"></div>
      </div>


      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-[0_2px_10px_#00ffc6aa]">
            Unlock Your <span className="text-[#00FFC6]">Dev Potential</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your personal hub for coding challenges, learning roadmaps, and powerful development tools.
          </p>
          <button
            onClick={handleStartJourney}
            className="bg-[#FF6B00] hover:bg-[#ff832f] text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 px-6 z-10 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-100">What DevPath Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              ['🧠', 'Daily Code Challenges', 'Sharpen your problem-solving skills with a wide array of coding exercises.'],
              ['🗺️', 'Guided Learning Roadmaps', 'Follow structured paths to master technologies and become job-ready.'],
              ['⏱️', 'Gamified Pomodoro Timer', 'Boost focus with an interactive timer that makes study fun.'],
              ['🧩', 'Logic & Puzzle Games', 'Engaging puzzles to enhance critical thinking.'],
              ['🛠️', 'Developer Utility Tools', 'Access handy dev tools like cost estimators and password generators.']
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-[#24243a]/70 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-transparent hover:border-[#00FFC6]">
                <div className="text-[#00FFC6] text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-100">{title}</h3>
                <p className="text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION SECTION --- */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#00FFC6] to-[#FF6B00] text-center text-black z-10 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Skills?</h2>
          <p className="text-lg mb-8">Join DevPath today and start building the future you envision.</p>
          <button
            onClick={handleGetStarted}
            className="bg-black hover:bg-[#1e1e2e] text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="py-8 px-4 bg-[#1a1a27] text-gray-400 text-center text-sm z-10 relative">
        <div className="max-w-6xl mx-auto">
          <p>&copy; {new Date().getFullYear()} DevPath. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-[#00FFC6] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#00FFC6] transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
