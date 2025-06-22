// app/info/features/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-5xl text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">
          Features
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          DevPath is packed with powerful features designed to accelerate your coding journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ['🧠', 'Daily Challenges', 'Engage with new coding problems daily to keep your skills sharp and adaptable.'],
            ['🗺️', 'Structured Roadmaps', 'Follow expert-designed learning paths for various technologies, from fundamental concepts to advanced topics.'],
            ['⏱️', 'Gamified Focus Timer', 'Boost your productivity with a unique focus timer that integrates gamification elements to keep you motivated.'],
            ['🧩', 'Logic & Algorithmic Games', 'Improve your problem-solving and algorithmic thinking through interactive and fun logic games.'],
            ['🛠️', 'Integrated Dev Tools', 'Access essential development utilities directly within the platform, including code formatters, API testers, and more.'],
            ['📊', 'Comprehensive Progress Tracking', 'Monitor your growth with detailed analytics, performance reports, and visual progress indicators.'],
            ['🤝', 'Community & Collaboration', 'Connect with other developers, share insights, and collaborate on projects (coming soon).'],
            ['💡', 'AI-Powered Learning Assistant', 'Get personalized feedback and hints to overcome coding obstacles (coming soon).'],
          ].map(([icon, title, description]) => (
            <div key={title} className="bg-transparent backdrop-blur-sm p-8 rounded-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="text-5xl mb-6 w-16 h-16 flex items-center justify-center bg-surface rounded-xl border border-[#2a2a3a]">
                {icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-100">{title}</h3>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href="/" className="inline-block bg-surface text-white font-bold py-3 px-8 rounded-neumorphic text-lg shadow-neumorphic hover:shadow-lg transition-all duration-300 hover:scale-[1.03]">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;