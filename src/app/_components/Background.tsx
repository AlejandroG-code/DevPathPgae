'use client';

import React, { useEffect, useState } from 'react';

interface Star {
  top: string;
  left: string;
  width: string;
  height: string;
  opacity: string;
  animationDelay: string;
  animationDuration: string;
}

const BackgroundNeumorphic: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 200 }).map(() => ({
      width: `${Math.random() * 2 + 0.5}px`,
      height: `${Math.random() * 2 + 0.5}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: `${0.2 + Math.random() * 0.5}`,
      animationDelay: `${Math.random() * 10}s`,
      animationDuration: `${5 + Math.random() * 10}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {/* Textura sutil */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] pointer-events-none"></div>

      {/* Luces animadas */}
      <div className="fixed inset-0 z-0 overflow-hidden min-h-screen"> {/* Changed h-screen to min-h-screen if it was h-screen, or ensure it's fixed/absolute to cover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1b26] to-[#0a0a0a]"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vibrant-teal rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-bright-orange rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Estrellas animadas */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/80 animate-star-twinkle"
          style={{
            width: star.width,
            height: star.height,
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}

      {/* Cuadrícula sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
};

export default BackgroundNeumorphic;
