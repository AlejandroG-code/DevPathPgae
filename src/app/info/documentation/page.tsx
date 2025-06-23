// src/app/info/documentation/page.tsx
import React from 'react';
import Link from 'next/link';

const DocumentationPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 min-h-[calc(100vh-64px)] text-white">
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-vibrant-teal text-center drop-shadow-lg">
          DevPath Documentation
        </h1>
        <p className="text-gray-200 text-lg mb-12 text-center max-w-prose mx-auto">
          Welcome to the DevPath Documentation! This guide will help you understand and make the most of our platform, designed to empower your journey in software development.
        </p>

        {/* Section: What is DevPath? */}
        <div className="mb-10 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-white border-b border-gray-600 pb-3">What is DevPath?</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            DevPath is a comprehensive platform dedicated to guiding aspiring and experienced developers through structured learning paths. We provide curated roadmaps, free learning resources, and essential tools to enhance your productivity and career planning. Our goal is to make your learning journey clear, engaging, and effective.
          </p>
        </div>

        {/* Section: Core Features */}
        <div className="mb-10 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-white border-b border-gray-600 pb-3">Core Features</h2>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-vibrant-teal">Roadmaps</h3>
            <p className="text-gray-300 text-base mb-2">
              Our interactive <Link href="/roadmaps" className="text-vibrant-teal hover:underline">Roadmaps</Link> provide clear, step-by-step guides for various development fields like Frontend, Backend, DevOps, and more.
            </p>
            <ul className="list-disc list-inside text-gray-400 pl-4">
              <li>Visual Learning Paths: Each roadmap is a visual representation of skills and technologies to learn.</li>
              <li>Node Navigation: Click on individual nodes to get a brief description of the topic.</li>
              <li>Progress Tracking (Future): Future updates will allow you to track your progress through each roadmap.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-vibrant-teal">Learning Resources</h3>
            <p className="text-gray-300 text-base mb-2">
              Dive deeper into any topic with our curated collection of <Link href="/learning" className="text-vibrant-teal hover:underline">Free Learning Resources</Link>.
            </p>
            <ul className="list-disc list-inside text-gray-400 pl-4">
              <li>Categorized Content: Resources are organized by development field and specific topics.</li>
              <li>Diverse Formats: Find links to free courses, articles, video tutorials, and interactive tools.</li>
              <li>Community Curated: Our resources are carefully selected to provide high-quality learning materials.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-vibrant-teal">Pomodoro Timer</h3>
            <p className="text-gray-300 text-base mb-2">
              Boost your productivity and focus using the built-in <Link href="/pomodoro" className="text-vibrant-teal hover:underline">Pomodoro Timer</Link>.
            </p>
            <ul className="list-disc list-inside text-gray-400 pl-4">
              <li>Structured Work Intervals: Work for focused periods (default 25 min) followed by short breaks (5 min).</li>
              <li>Long Breaks: After every four Pomodoros, take a longer break (15 min) to recharge.</li>
              <li>Sound Notifications: Get notified when a session ends with a gentle bell sound.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2 text-vibrant-teal">Project Cost Calculator</h3>
            <p className="text-gray-300 text-base mb-2">
              Planning a new project? Use our <Link href="/calculator" className="text-vibrant-teal hover:underline">Project Cost Calculator</Link> to get an approximate budget estimate.
            </p>
            <ul className="list-disc list-inside text-gray-400 pl-4">
              <li>Customizable Options: Select project type, desired functionalities, and design complexity.</li>
              <li>Multi-Currency Support: View estimates in various currencies (USD, EUR, MXN, etc.).</li>
              <li>Important Note: This tool provides a general estimate. For precise budgeting, always consult with a professional.</li>
            </ul>
          </div>
        </div>

        {/* Section: Getting Help */}
        <div className="p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <h2 className="text-3xl font-bold mb-4 text-white border-b border-gray-600 pb-3">Getting Help</h2>
          <p className="text-gray-300 text-base leading-relaxed">
            If you have questions, feedback, or need support, please don&#39;t hesitate to reach out to us.
          </p>
          <ul className="list-disc list-inside text-gray-400 pl-4 mt-2">
            <li>Contact Us: Visit our <Link href="/info/contact" className="text-vibrant-teal hover:underline">Contact Us</Link> page for various ways to get in touch.</li>
            <li>Community: Join our growing <Link href="/info/community" className="text-vibrant-teal hover:underline">Community</Link> (coming soon!) to connect with other users and get peer support.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DocumentationPage;