// src/app/dashboard/page.tsx

import React from 'react';
import Link from 'next/link';

const LearningPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)] text-white text-center">
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-vibrant-teal drop-shadow-lg">
          My Learning in DevPath
        </h1>
        <p className="text-gray-200 text-lg mb-8 max-w-prose mx-auto">
          Welcome to your personal learning space. Here you&#39;ll find a summary of your progress, pending challenges, and recommended tools to improve your programming skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-3xl font-bold text-bright-orange mb-3">Overall Progress</h2>
            <p className="text-gray-300 text-base">
              You don&#39;t have any progress data yet, it&#39;s time to start!
            </p>
            <p className="text-gray-400 text-sm mt-2">
              (Your total points, completed challenges, etc., will be displayed here.)
            </p>
            <Link href="/problems" className="mt-4 inline-block bg-vibrant-teal text-white py-2 px-5 rounded-full font-semibold transition-colors duration-200 hover:bg-[#00FFC6]/90">
              Go to Problems
            </Link>
          </div>

          <div className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md border border-gray-700">
            <h2 className="text-3xl font-bold text-accent-purple mb-3">Tools</h2>
            <p className="text-gray-300 text-base">
              Explore our useful development tools.
            </p>
            <ul className="text-gray-400 text-sm mt-2 list-disc list-inside">
              <li>Password Generator</li>
              <li>Price Calculator</li>
              <li>Pomodoro Timer</li>
            </ul>
            <Link href="/passwords" className="mt-4 inline-block bg-bright-orange text-white py-2 px-5 rounded-full font-semibold transition-colors duration-200 hover:bg-[#ff9900]/90">
              Explore Tools
            </Link>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-10">
          This is a prototype of your learning page. Full functionalities will be added in the future.
        </p>
      </div>
    </div>
  );
};

export default LearningPage;