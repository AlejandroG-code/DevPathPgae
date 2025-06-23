// src/components/ui/background.tsx
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

// Ya no necesita 'children' en sus props
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BackgroundNeumorphicProps {
  // Aquí puedes agregar props si quisieras controlar algo del fondo desde fuera,
  // pero para un fondo estático global, no se necesitan.
}

const BackgroundNeumorphic: React.FC<BackgroundNeumorphicProps> = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const generatedStars: Star[] = Array.from({ length: 150 }).map(() => ({
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
    // Este div ahora contiene solo el fondo.
    // 'fixed inset-0' asegura que ocupe toda la pantalla.
    // '-z-20' lo coloca muy atrás.
    // 'pointer-events-none' es crucial para que no capture clics.
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Textura y cuadrícula */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e2e] to-[#121212] opacity-90" />

      {/* Luces difusas */}
      <div className="absolute w-[600px] h-[600px] bg-[#00FFC6]/20 rounded-full blur-[250px] animate-pulse-slow top-[20%] left-[15%]" />
      <div className="absolute w-[500px] h-[500px] bg-[#FF6B00]/20 rounded-full blur-[200px] animate-float-fast bottom-[15%] right-[10%]" />
      <div className="absolute w-[400px] h-[400px] bg-[#6A5ACD]/25 rounded-full blur-[200px] animate-float-medium top-[40%] right-[30%]" />
      <div className="absolute w-[300px] h-[300px] bg-[#FF1493]/20 rounded-full blur-[200px] animate-pulse-medium bottom-[25%] left-[20%]" />
      <div className="absolute w-[250px] h-[250px] bg-[#8A2BE2]/20 rounded-full blur-[200px] animate-float-medium top-[50%] left-[25%]" />
      <div className="absolute w-[450px] h-[450px] bg-[#32CD32]/20 rounded-full blur-[250px] animate-float-fast bottom-[20%] right-[15%]" />

      {/* Fondos espaciales en capas */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-[url('/animated-stars.gif')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-[url('/twinkling-stars.gif')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-[url('/shining-stars.png')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-[url('/flashing-stars.gif')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-[url('/nebula-stars.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-[url('/galaxy-stars.png')] bg-cover bg-center opacity-25" />
        <div className="absolute inset-0 bg-[url('/aurora-stars.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-[url('/comet-stars.png')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-[url('/constellation-stars.png')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-[url('/meteor-stars.png')] bg-cover bg-center opacity-25" />
      </div>

      {/* Estrellas individuales solo si está montado (cliente) */}
      {hasMounted &&
        stars.map((star, i) => (
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
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      {/* ¡El contenido (children) ya NO se renderiza aquí! */}
    </div>
  );
};

export default BackgroundNeumorphic;