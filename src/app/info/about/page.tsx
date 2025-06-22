// app/info/about/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center">
        <h1 className="text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFC6] to-[#FF6B00]">
          About This Project
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          I&#39;m Alejandro, a systems engineering student passionate about creating modern, visually striking web experiences. This site is a personal project built to showcase my skills, explore creative ideas, and push the boundaries of what I can build as a solo developer.
        </p>

        <div className="bg-transparent backdrop-blur-sm p-8 rounded-xl shadow-2xl text-left mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-gray-100">My Journey</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            This project started as a way to bring together my love for design and programming. I&#39;ve always been fascinated by interactive interfaces and immersive UI/UX experiences, so I challenged myself to build something that reflects that passion.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Every detail here — from the background animations to the layout components — was hand-crafted by me using technologies like React, Next.js, and Tailwind CSS. It&39;s a solo effort that represents both my technical growth and personal style.
          </p>
        </div>

        <div className="bg-transparent backdrop-blur-sm p-8 rounded-xl shadow-2xl text-left">
          <h2 className="text-3xl font-semibold mb-4 text-gray-100">What I Believe In</h2>
          <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
            <li><strong>Learning by Building:</strong> Nothing beats creating real projects from scratch.</li>
            <li><strong>Creativity in Code:</strong> Code should be expressive and visually engaging.</li>
            <li><strong>Clarity and Structure:</strong> A clean and organized approach is essential for scalability.</li>
            <li><strong>Self-Reliance:</strong> Great things can be built alone with enough dedication and vision.</li>
            <li><strong>Iteration:</strong> I&#39;m always improving, testing, and refining my work.</li>
          </ul>
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

export default AboutPage;
