// src/app/page.tsx

'use client'; // This directive is necessary for using client-side hooks like useRouter

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Make sure Link is imported for client-side navigation

const LandingPage: React.FC = () => {
  const router = useRouter();

  // Function to navigate to the "Mi Aprendizaje" page (formerly Dashboard)
  const handleStartLearning = () => router.push('/learning'); // Now goes to /dashboard

  // Function to navigate to the new "Information" index page
  const handleExploreInfo = () => router.push('/info'); // New route for information

  return (
    // min-h-screen ensures the landing page always takes full viewport height
    // relative and z-10 are for content positioning, as the background is fixed
    <div className="min-h-screen relative text-gray-100 font-sans antialiased bg-surface overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            {/* Increased text size for "Welcome to DevPath" - using text-2xl */}
            <span className="inline-block px-5 py-3 bg-[#00FFC6]/10 text-[#00FFC6] rounded-full text-2xl font-bold mb-4 border border-[#00FFC6]/30 shadow-neumorphic">
              Welcome to DevPath
            </span>
          </div>
          {/* Main Title - Increased text size */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">
              Build. Code. Grow.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Your all-in-one platform to master coding skills through interactive challenges, structured roadmaps, and powerful development tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartLearning}
              className="bg-surface text-white font-bold py-4 px-10 rounded-neumorphic text-lg shadow-neumorphic hover:shadow-lg transition-all duration-300 hover:scale-[1.03] active:shadow-insetNeumorphic"
            >
              Start Learning
            </button>
            <button
              onClick={handleExploreInfo} // New button to go to the information index page
              className="bg-surface text-[#00FFC6] font-bold py-4 px-8 rounded-neumorphic text-lg border border-[#00FFC6]/40 shadow-neumorphic hover:ring-2 hover:ring-[#00FFC6]/40 hover:scale-[1.03] transition-all duration-300"
            >
              Explore DevPath
            </button>
          </div>
        </div>
      </section>

      {/* Features Section (Developer Superpowers) */}
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
              ['🧠', 'Daily Challenges', 'Curated problems to sharpen your skills with various difficulty levels.'],
              ['🗺️', 'Learning Roadmaps', 'Structured paths to master technologies from beginner to advanced.'],
              ['⏱️', 'Focus Timer', 'Productivity timer with gamification elements.'],
              ['🧩', 'Logic Games', 'Fun puzzles to enhance problem-solving skills.'],
              ['🛠️', 'Dev Tools', 'Utilities like cost calculators, API testers, and more.'],
              ['📊', 'Progress Tracking', 'Visualize your improvement with detailed analytics.']
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                // Updated card style: semi-transparent, blurred background, no border, with a strong shadow
                className="bg-transparent backdrop-blur-sm p-8 rounded-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
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
            onClick={handleStartLearning} // This button also leads to /dashboard
            className="bg-surface text-white font-bold py-5 px-12 rounded-neumorphic text-xl shadow-neumorphic hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:shadow-insetNeumorphic"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer (Resources section removed) */}
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
                  {/* Changed "Features" to "Information" and kept the link to /info/features */}
                  <li><Link href="/info/features" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Information</Link></li>
                  <li><Link href="/info/pricing" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Pricing</Link></li>
                  <li><Link href="/info/roadmap" className="text-gray-400 hover:text-[#00FFC6] transition-colors">Roadmap</Link></li>
                </ul>
              </div>
              {/* Resources section removed entirely */}
              <div>
                <h4 className="text-gray-200 font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/info/about" className="text-gray-400 hover:text-[#00FFC6] transition-colors">About</Link></li>
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