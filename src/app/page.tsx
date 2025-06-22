'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BackgroundNeumorphic from '../app/_components/Background';

const LandingPage: React.FC = () => {
  const router = useRouter();
  const handleNavigation = () => router.push('/dashboard');

  return (
    <div className="min-h-screen relative text-gray-100 font-sans antialiased bg-surface overflow-hidden shadow-insetNeumorphic">
      <BackgroundNeumorphic />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-[#00FFC6]/10 text-[#00FFC6] rounded-full text-sm font-medium mb-4 border border-[#00FFC6]/30 shadow-neumorphic">
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
              className="bg-surface text-white font-bold py-4 px-10 rounded-neumorphic text-lg shadow-neumorphic hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:shadow-insetNeumorphic"
            >
              Start Learning
            </button>
            <button
              onClick={handleNavigation}
              className="bg-surface text-[#00FFC6] font-bold py-4 px-8 rounded-neumorphic text-lg border border-[#00FFC6]/40 shadow-neumorphic hover:ring-2 hover:ring-[#00FFC6]/40 hover:scale-[1.03] transition-all duration-300"
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                className="bg-surface shadow-neumorphic p-8 rounded-neumorphic border border-[#1a1a27] hover:shadow-lg transition-all duration-500 hover:-translate-y-2"
              >
                <div className="text-5xl mb-6 w-16 h-16 flex items-center justify-center bg-surface rounded-xl border border-[#2a2a3a]">
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-100">{title}</h3>
                <p className="text-gray-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            className="bg-surface text-white font-bold py-5 px-12 rounded-neumorphic text-xl shadow-neumorphic hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:shadow-insetNeumorphic"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
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
              {[
                ['Product', ['Features', 'Pricing', 'Roadmap']],
                ['Resources', ['Blog', 'Documentation', 'Community']],
                ['Company', ['About', 'Careers', 'Contact']]
              ].map(([section, links]) => (
                <div key={section as string}>
                  <h4 className="text-gray-200 font-medium mb-3">{section}</h4>
                  <ul className="space-y-2">
                    {(links as string[]).map(link => (
                      <li key={link}>
                        <a href="#" className="text-gray-400 hover:text-[#00FFC6] transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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