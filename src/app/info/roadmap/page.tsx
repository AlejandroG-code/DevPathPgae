// app/info/roadmap/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const RoadmapPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">
          Roadmap
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          Our vision for DevPath is constantly evolving. Here&#39;s a glimpse of what&#39;s planned for the future!
        </p>

        <div className="space-y-10">
          <div className="bg-gradient-to-br from-[#00FFC6]/10 to-[#FF6B00]/10 p-8 rounded-xl shadow-lg border border-[#2a2a3a] text-left">
            <h2 className="text-3xl font-semibold mb-4 text-[#00FFC6]">Phase 1: Core Platform (Current)</h2>
            <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
              <li>Interactive Daily Challenges & Problem Sets</li>
              <li>Initial Learning Roadmaps (e.g., Web Development Fundamentals)</li>
              <li>Basic Progress Tracking & Analytics</li>
              <li>Integrated Focus Timer</li>
            </ul>
          </div>

          <div className="bg-transparent backdrop-blur-sm p-8 rounded-xl shadow-2xl text-left">
            <h2 className="text-3xl font-semibold mb-4 text-gray-100">Phase 2: Expansion & Community</h2>
            <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
              <li>Advanced Roadmaps: Data Structures & Algorithms, Mobile Development, AI/ML basics.</li>
              <li>Multiplayer Challenges: Compete with friends or other users in real-time coding battles.</li>
              <li>Community Forums: Dedicated spaces for discussion, help, and project collaboration.</li>
              <li>Enhanced Dev Tools: More specialized tools and IDE integrations.</li>
            </ul>
          </div>

          <div className="bg-transparent backdrop-blur-sm p-8 rounded-xl shadow-2xl text-left">
            <h2 className="text-3xl font-semibold mb-4 text-gray-100">Phase 3: AI & Personalization</h2>
            <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
              <li>AI-Powered Learning Assistant: Personalized hints, code reviews, and explanations.</li>
              <li>Customizable Learning Paths: AI-driven recommendations based on your progress and goals.</li>
              <li>Project-Based Learning: Guided projects with real-world applications.</li>
              <li>Certification Program: Recognize your achievements with official DevPath certifications.</li>
            </ul>
          </div>
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

export default RoadmapPage;