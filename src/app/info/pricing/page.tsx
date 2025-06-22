// app/info/pricing/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">
          Pricing
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          DevPath is currently **completely free** while we are in active development!
          Enjoy all features without any cost.
        </p>

        <div className="bg-gradient-to-br from-[#00FFC6]/10 to-[#FF6B00]/10 p-8 rounded-xl shadow-lg border border-[#2a2a3a]">
          <h2 className="text-4xl font-semibold mb-4 text-[#00FFC6]">Free Tier</h2>
          <p className="text-lg text-gray-300 mb-6">
            Access to all current and upcoming features during our beta phase.
            No credit card required. No hidden fees.
          </p>
          <ul className="text-left text-gray-300 text-lg space-y-2 mb-8 inline-block">
            <li className="flex items-center"><span className="text-[#00FFC6] mr-2">✔</span> Daily Challenges</li>
            <li className="flex items-center"><span className="text-[#00FFC6] mr-2">✔</span> Learning Roadmaps</li>
            <li className="flex items-center"><span className="text-[#00FFC6] mr-2">✔</span> Focus Timer</li>
            <li className="flex items-center"><span className="text-[#00FFC6] mr-2">✔</span> Logic Games</li>
            <li className="flex items-center"><span className="text-[#00FFC6] mr-2">✔</span> Dev Tools</li>
            <li className="flex items-center"><span className="text-[#00FFC6] mr-2">✔</span> Progress Tracking</li>
            <li className="flex items-center"><span className="text-[#00FFC6] mr-2">✔</span> And much more!</li>
          </ul>
          <p className="text-gray-400 text-sm mt-8">
            We will inform our users well in advance if we introduce any paid plans in the future.
            Your early support helps us grow!
          </p>
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

export default PricingPage;