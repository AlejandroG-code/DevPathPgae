'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleNavigation = () => router.push('/dashboard');

  return (
    <div className="min-h-screen relative text-gray-100 font-sans antialiased bg-[#0e0e15] overflow-hidden">
      {/* --- Fondo mejorado --- */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {/* Textura de grano más sutil */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-3 pointer-events-none"></div>

        {/* Luces con animación más suave */}
        <div className="absolute top-1/3 -left-20 w-[800px] h-[800px] bg-radial-gradient from-violet-600/20 via-transparent to-transparent blur-[300px] opacity-60 animate-float-slow"></div>
        <div className="absolute bottom-1/3 -right-20 w-[800px] h-[800px] bg-radial-gradient from-teal-500/20 via-transparent to-transparent blur-[300px] opacity-60 animate-float-slow animation-delay-3000"></div>

        {/* Partículas mejoradas */}
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/80 animate-star-twinkle"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: `${0.2 + Math.random() * 0.5}`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}

        {/* Patrón de cuadrícula sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* --- Hero Section mejorada --- */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-[#00FFC6]/10 text-[#00FFC6] rounded-full text-sm font-medium mb-4 border border-[#00FFC6]/30">
              Welcome to DevPath
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">
              Build. Code. Grow.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your all-in-one platform to master coding skills through interactive challenges, structured roadmaps, and powerful developer tools.
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleNavigation}
              className="relative overflow-hidden bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
            >
              <span className="relative z-10">Start Learning</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
            
            <button
              onClick={handleNavigation}
              className="relative overflow-hidden bg-transparent text-white font-bold py-4 px-8 rounded-full text-lg border border-[#00FFC6] hover:bg-[#00FFC6]/10 transition-all duration-300 hover:scale-[1.02]"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* --- Features Section mejorada --- */}
      <section className="py-28 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">
              Developer Superpowers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to accelerate your coding journey in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              ['🧠', 'Daily Challenges', 'Curated problems to sharpen your skills with varying difficulty levels'],
              ['🗺️', 'Learning Roadmaps', 'Structured paths to master technologies from beginner to advanced'],
              ['⏱️', 'Focus Timer', 'Productivity timer with gamification elements'],
              ['🧩', 'Logic Games', 'Fun puzzles to enhance problem-solving skills'],
              ['🛠️', 'Dev Tools', 'Utilities like cost calculators, API testers, and more'],
              ['📊', 'Progress Tracking', 'Visualize your improvement with detailed analytics']
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ].map(([icon, title, desc], index) => (
              <div 
                key={title} 
                className="relative overflow-hidden bg-[#1a1a27]/70 backdrop-blur-md p-8 rounded-2xl border border-[#2a2a3a] hover:border-[#00FFC6]/50 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00FFC6]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-6 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#00FFC6]/20 to-[#FF6B00]/20 rounded-xl border border-[#2a2a3a] group-hover:border-[#00FFC6]/50 transition-all duration-300">
                    {icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-100">{title}</h3>
                  <p className="text-gray-300 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA Section mejorada --- */}
      <section className="relative py-32 px-6 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FFC6]/10 to-[#FF6B00]/10 rounded-3xl mx-6"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-10"></div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">transform</span> your skills?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Join thousands of developers who are accelerating their careers with DevPath
          </p>
          <button
            onClick={handleNavigation}
            className="relative overflow-hidden bg-gradient-to-r from-[#FF6B00] to-[#FF8C42] text-white font-bold py-5 px-12 rounded-full text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <span className="relative z-10">Get Started Now</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF8C42] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </section>

      {/* --- Footer mejorado --- */}
      <footer className="relative py-12 px-6 bg-[#0a0a12] border-t border-[#2a2a3a] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">
                DevPath
              </h3>
              <p className="text-gray-400 mt-2">Elevate your coding journey</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 text-center md:text-left">
              <div>
                <h4 className="text-gray-200 font-medium mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Roadmap</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-gray-200 font-medium mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Community</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-gray-200 font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Careers</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-[#2a2a3a] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DevPath. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;