// src/app/roadmaps/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  resources?: { name: string; url: string }[];
  children?: RoadmapNode[];
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

// Dummy Data for Roadmaps (replace with actual data from JSON later if needed)
const roadmapsData: Roadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer Roadmap',
    description: 'A step-by-step guide to becoming a modern frontend developer.',
    nodes: [
      {
        id: 'html-css',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the building blocks of the web.',
        resources: [
          { name: 'MDN Web Docs (HTML)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
          { name: 'MDN Web Docs (CSS)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
        ],
      },
      {
        id: 'javascript',
        title: 'JavaScript Fundamentals',
        description: 'Master the language of the web.',
        resources: [
          { name: 'MDN Web Docs (JavaScript)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
          { name: 'JavaScript.info', url: 'https://javascript.info/' },
        ],
        children: [
          {
            id: 'dom-manipulation',
            title: 'DOM Manipulation',
            description: 'Learn how to interact with the web page structure.',
          },
          {
            id: 'async-js',
            title: 'Asynchronous JavaScript',
            description: 'Understand Promises, Async/Await.',
          },
        ],
      },
      {
        id: 'version-control',
        title: 'Version Control (Git)',
        description: 'Learn to manage your code with Git.',
        resources: [
          { name: 'Git Handbook', url: 'https://guides.github.com/introduction/git-handbook/' },
        ],
      },
      {
        id: 'package-managers',
        title: 'Package Managers',
        description: 'Understand npm/yarn.',
      },
      {
        id: 'frameworks',
        title: 'Choose a Framework',
        description: 'Dive into a popular frontend framework.',
        children: [
          {
            id: 'react',
            title: 'React.js',
            description: 'Learn the most popular JavaScript library for building user interfaces.',
            resources: [
                { name: 'React Official Docs', url: 'https://react.dev/' },
            ]
          },
          {
            id: 'angular',
            title: 'Angular',
            description: 'Master the comprehensive framework for building web applications.',
            resources: [
                { name: 'Angular Official Docs', url: 'https://angular.io/' },
            ]
          },
          {
            id: 'vue',
            title: 'Vue.js',
            description: 'Explore the progressive framework for building user interfaces.',
            resources: [
                { name: 'Vue.js Official Docs', url: 'https://vuejs.org/' },
            ]
          },
        ],
      },
      // ... more nodes
    ],
  },
  {
    id: 'backend',
    title: 'Backend Developer Roadmap',
    description: 'A comprehensive guide to backend development.',
    nodes: [
      {
        id: 'programming-lang',
        title: 'Pick a Language',
        description: 'Choose a primary backend language (e.g., Python, Node.js, Go, Java).',
        children: [
          {id: 'python', title: 'Python', description: 'Versatile and popular for web development (Django, Flask).'},
          {id: 'nodejs', title: 'Node.js', description: 'JavaScript on the server-side.'},
          {id: 'go', title: 'Go', description: 'Efficient and performant.'},
        ]
      },
      {
        id: 'databases',
        title: 'Databases',
        description: 'Learn about SQL and NoSQL databases.',
        children: [
          {id: 'sql', title: 'SQL Databases', description: 'PostgreSQL, MySQL, SQLite.'},
          {id: 'nosql', title: 'NoSQL Databases', description: 'MongoDB, Redis, Cassandra.'},
        ]
      },
      // ... more nodes
    ],
  },
];

const RoadmapNodeComponent: React.FC<{ node: RoadmapNode }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-l-2 border-vibrant-teal pl-4 ml-4 my-2 relative">
      <div
        className="cursor-pointer bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-white">{node.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{node.description}</p>
        {node.children && node.children.length > 0 && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-vibrant-teal text-2xl">
            {isOpen ? '−' : '+'}
          </span>
        )}
      </div>

      {isOpen && node.resources && node.resources.length > 0 && (
        <div className="mt-2 ml-4">
          <h4 className="text-md font-semibold text-vibrant-teal mb-1">Resources:</h4>
          <ul className="list-disc list-inside text-gray-400">
            {node.resources.map((res, idx) => (
              <li key={idx}>
                <Link href={res.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC6] transition-colors duration-200">
                  {res.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && node.children && (
        <div className="ml-4 mt-2 border-l border-gray-700">
          {node.children.map(childNode => (
            <RoadmapNodeComponent key={childNode.id} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};

const RoadmapsPage: React.FC = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  return (
    <div className="flex flex-col items-center p-8 min-h-[calc(100vh-64px)] text-white">
      <h1 className="text-5xl font-extrabold mb-4 text-vibrant-teal text-center drop-shadow-md">
        Developer Roadmaps
      </h1>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-3xl mx-auto">
        Navigate your learning path with our curated developer roadmaps.
      </p>

      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl">
        {!selectedRoadmap ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapsData.map(roadmap => (
              <div
                key={roadmap.id}
                onClick={() => setSelectedRoadmap(roadmap)}
                className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-200 border border-gray-700 hover:border-vibrant-teal text-white"
              >
                <h2 className="text-2xl font-semibold mb-2 text-white">{roadmap.title}</h2>
                <p className="text-gray-400 text-sm line-clamp-3">{roadmap.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedRoadmap(null)}
              className="mb-6 text-vibrant-teal hover:text-[#00FFC6]/80 transition-colors duration-200 flex items-center text-lg font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                <path d="M165.66,200.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
              <span className="ml-2">Back to Roadmaps</span>
            </button>
            <h2 className="text-4xl font-bold mb-4 text-white">{selectedRoadmap.title}</h2>
            <p className="text-gray-400 text-lg mb-6">{selectedRoadmap.description}</p>

            <div className="roadmap-flow">
              {selectedRoadmap.nodes.map(node => (
                <RoadmapNodeComponent key={node.id} node={node} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapsPage;