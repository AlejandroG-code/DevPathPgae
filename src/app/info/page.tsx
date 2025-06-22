// src/app/info/page.tsx

import React from 'react';
import Link from 'next/link';

const InfoIndexPage: React.FC = () => {
  const infoSections = [
    { title: 'Características', href: '/info/features', description: 'Descubre todas las funcionalidades de DevPath.' },
    { title: 'Precios', href: '/info/pricing', description: 'Planes y modelos de suscripción.' },
    { title: 'Roadmap', href: '/info/roadmap', description: 'Mira lo que viene en el futuro de DevPath.' },
    { title: 'Blog', href: '/info/blog', description: 'Artículos y noticias sobre desarrollo y aprendizaje.' },
    { title: 'Documentación', href: '/info/documentation', description: 'Guías detalladas para usar DevPath.' },
    { title: 'Comunidad', href: '/info/community', description: 'Conéctate con otros desarrolladores.' },
    { title: 'Acerca de', href: '/info/about', description: 'Conoce la historia y misión de DevPath.' },
    { title: 'Carreras', href: '/info/careers', description: 'Oportunidades para unirte a nuestro equipo.' },
    { title: 'Contacto', href: '/info/contact', description: 'Ponte en contacto con nosotros.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)] text-white text-center">
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-vibrant-teal drop-shadow-lg">
          Más Información sobre DevPath
        </h1>
        <p className="text-gray-200 text-lg mb-12 max-w-prose mx-auto">
          Aquí puedes encontrar todo lo que necesitas saber sobre nuestra plataforma, desde sus funcionalidades hasta cómo puedes unirte a nuestro equipo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoSections.map(section => (
            <Link key={section.href} href={section.href} className="block group">
              <div className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700 hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2">
                <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-vibrant-teal transition-colors">{section.title}</h2>
                <p className="text-gray-400 text-sm">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoIndexPage;