// src/app/info/page.tsx

import React from 'react';
import Link from 'next/link';

const InfoIndexPage: React.FC = () => {
  const infoSections = [
    { title: 'Features', href: '/info/features', description: 'Explore the powerful features that make DevPath unique.' },
    { title: 'Pricing', href: '/info/pricing', description: 'View our flexible plans and subscription options.' },
    { title: 'Roadmap', href: '/info/roadmap', description: 'See what\'s coming next for DevPath\'s future developments.' },
    { title: 'Documentation', href: '/info/documentation', description: 'Find detailed guides and how-tos for using DevPath.' },
    { title: 'Community', href: '/community', description: 'Connect with other developers and grow together.' },
    { title: 'About Us', href: '/info/about', description: 'Learn about DevPath\'s story, mission, and vision.' },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)] text-white text-center">
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-vibrant-teal drop-shadow-lg">
          Explore DevPath
        </h1>
        <p className="text-gray-200 text-lg mb-12 max-w-prose mx-auto">
          This hub provides comprehensive information about our platform, from its core features to opportunities to join our team.
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