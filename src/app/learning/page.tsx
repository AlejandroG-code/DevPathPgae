// src/app/learning/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Interface for a single learning resource
interface LearningResource {
  name: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'playlist' | 'tool';
  level?: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
}

// Interface for a learning category (can be nested)
interface LearningCategory {
  id: string;
  title: string;
  description: string;
  resources: LearningResource[];
  subCategories?: LearningCategory[]; // For nesting topics, e.g., 'Frontend' -> 'HTML & CSS'
}

// Dummy Data for Learning Content
// You will populate this with actual free resources!
const learningContentData: LearningCategory[] = [
  {
    id: 'frontend-learning',
    title: 'Frontend Development Learning',
    description: 'Explore free resources to kickstart or advance your journey as a frontend developer. Covers core web technologies and frameworks.',
    resources: [
      { name: 'MDN Web Docs (Comprehensive)', url: 'https://developer.mozilla.org/en-US/docs/Web', type: 'course', level: 'beginner', description: 'The official documentation for all web technologies, a must-have reference.' },
      { name: 'freeCodeCamp (Responsive Web Design)', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', type: 'course', level: 'beginner', description: 'An interactive course covering modern responsive HTML and CSS techniques.' },
    ],
    subCategories: [
      {
        id: 'html-css-learning',
        title: 'HTML & CSS Fundamentals',
        description: 'Structured tutorials and guides for building and styling web pages.',
        resources: [
          { name: 'HTML Crash Course (Traversy Media)', url: 'https://www.youtube.com/watch?v=UB1O3HWMzC4', type: 'video', level: 'beginner', description: 'A quick and comprehensive video introduction to HTML.' },
          { name: 'CSS Grid Layout (CSS-Tricks)', url: 'https://css-tricks.com/snippets/css/a-guide-to-css-grid/', type: 'article', level: 'intermediate', description: 'A complete guide to CSS Grid with visual examples.' },
          { name: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/', type: 'tool', level: 'beginner', description: 'An interactive game to learn CSS Flexbox properties.' },
          { name: 'CSS Grid Garden', url: 'https://cssgridgarden.com/', type: 'tool', level: 'beginner', description: 'An interactive game to learn CSS Grid properties.' },
        ],
      },
      {
        id: 'javascript-learning',
        title: 'JavaScript Fundamentals',
        description: 'Resources for mastering the language of the web, from basics to advanced concepts.',
        resources: [
          { name: 'JavaScript.info (Modern JavaScript Tutorial)', url: 'https://javascript.info/', type: 'course', level: 'beginner', description: 'A comprehensive, modern JavaScript tutorial covering everything from basics to advanced topics.' },
          { name: 'Full Modern JavaScript Course (Net Ninja)', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcWxgbvmz_fJ7iZPGzL6C2zB7r', type: 'playlist', level: 'beginner', description: 'A complete video series on modern JavaScript, including ES6+.' },
        ],
      },
      {
        id: 'react-learning',
        title: 'React.js',
        description: 'Dive into React development, the most popular JavaScript library for building user interfaces.',
        resources: [
          { name: 'React Official Tutorial', url: 'https://react.dev/learn', type: 'course', level: 'beginner', description: 'The official interactive tutorial from the React team.' },
          { name: 'Build and Deploy a React Portfolio (JS Mastery)', url: 'https://www.youtube.com/watch?v=x_C9VdC88Kk', type: 'video', level: 'intermediate', description: 'Learn by building a real-world project.' },
        ],
      },
      {
        id: 'nextjs-learning',
        title: 'Next.js',
        description: 'Learn the React framework for production.',
        resources: [
          { name: 'Next.js Learn', url: 'https://nextjs.org/learn', type: 'course', level: 'beginner', description: 'The official interactive tutorial for Next.js.' },
        ],
      }
    ]
  },
  {
    id: 'backend-learning',
    title: 'Backend Development Learning',
    description: 'Free resources for server-side programming, databases, APIs, and deployment strategies.',
    resources: [
      { name: 'The Odin Project (Node.js/Express)', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', type: 'course', level: 'beginner', description: 'A comprehensive free curriculum for full-stack JavaScript, including Node.js and Express.' },
    ],
    subCategories: [
      {
        id: 'python-backend-learning',
        title: 'Python for Backend',
        description: 'Learning resources for popular Python backend frameworks like Django and Flask.',
        resources: [
          { name: 'Django Girls Tutorial', url: 'https://tutorial.djangogirls.org/en/', type: 'course', level: 'beginner', description: 'A friendly introduction to Django for beginners.' },
          { name: 'Flask Mega-Tutorial (Miguel Grinberg)', url: 'https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-i-hello-world', type: 'course', level: 'intermediate', description: 'A detailed series on building a complete web application with Flask.' },
        ],
      },
      {
        id: 'nodejs-backend-learning',
        title: 'Node.js & Express.js',
        description: 'Building robust APIs and web servers with JavaScript on the server-side.',
        resources: [
          { name: 'Node.js Express Course (Traversy Media)', url: 'https://www.youtube.com/watch?v=gT0Lh1eYqa8', type: 'video', level: 'beginner', description: 'A project-based video course on Node.js and Express.' },
        ],
      },
      {
        id: 'databases-sql-learning',
        title: 'Databases & SQL',
        description: 'Understanding relational and non-relational databases, and mastering SQL querying.',
        resources: [
          { name: 'SQLBolt (Interactive SQL tutorial)', url: 'https://sqlbolt.com/', type: 'course', level: 'beginner', description: 'Interactive lessons and exercises for SQL.' },
          { name: 'MongoDB Official Docs (Getting Started)', url: 'https://www.mongodb.com/docs/manual/tutorial/', type: 'article', level: 'beginner', description: 'Official guide to setting up and using MongoDB.' },
        ],
      },
    ],
  },
  {
    id: 'devops-learning',
    title: 'DevOps Learning Resources',
    description: 'Free content for mastering continuous delivery, automation, infrastructure as code, and cloud platforms.',
    resources: [
      { name: 'KodeKloud (Free Courses)', url: 'https://kodekloud.com/courses-landing/', type: 'course', level: 'beginner', description: 'Offers several free introductory courses on Docker, Kubernetes, and Linux for DevOps.' },
    ],
    subCategories: [
      {
        id: 'docker-learning',
        title: 'Docker & Containerization',
        description: 'Getting started with container technology for consistent environments.',
        resources: [
          { name: 'Docker Crash Course (Traversy Media)', url: 'https://www.youtube.com/watch?v=fqMOX6JJfo8', type: 'video', level: 'beginner', description: 'A fast-paced introduction to Docker concepts and commands.' },
        ],
      },
      {
        id: 'kubernetes-learning',
        title: 'Kubernetes Introduction',
        description: 'Basic understanding of container orchestration.',
        resources: [
          { name: 'Kubernetes Crash Course (TechWorld with Nana)', url: 'https://www.youtube.com/watch?v=X48VuDV0Ufw', type: 'video', level: 'beginner', description: 'An beginner-friendly explanation of Kubernetes core concepts.' },
        ],
      },
      {
        id: 'linux-cli-learning',
        title: 'Linux & Command Line',
        description: 'Essential command-line skills for managing servers and automating tasks.',
        resources: [
          { name: 'Linux Command Line Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=ajWv60-6D84', type: 'video', level: 'beginner', description: 'A comprehensive video course on Linux fundamentals and command-line usage.' },
        ],
      },
      {
        id: 'git-github-learning',
        title: 'Git & GitHub',
        description: 'Mastering version control for collaborative development.',
        resources: [
          { name: 'Git & GitHub Crash Course (Traversy Media)', url: 'https://www.youtube.com/watch?v=SWYPm6pYIqo', type: 'video', level: 'beginner', description: 'A practical introduction to Git and GitHub.' },
          { name: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2', type: 'book', level: 'intermediate', description: 'The official and free comprehensive book on Git.' },
        ],
      }
    ]
  },
  // Add more categories as needed for other roadmaps (AI Engineer, Data Analyst, Robotics, Cybersecurity, Mobile, Cloud)
  {
    id: 'general-programming-learning',
    title: 'General Programming & Computer Science',
    description: 'Fundamental concepts applicable to all areas of development, enhancing problem-solving skills.',
    resources: [
      { name: 'CS50\'s Introduction to Computer Science (Harvard)', url: 'https://cs50.harvard.edu/x/2024/', type: 'course', level: 'beginner', description: 'A renowned introductory course to computer science, covering algorithms, data structures, and more.' },
      { name: 'Data Structures & Algorithms in Python (Bro Code)', url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVunQDqasXLzZ5gGg3K1N-2Wjr', type: 'playlist', level: 'intermediate', description: 'A video playlist covering common data structures and algorithms using Python.' },
    ],
  },
  {
    id: 'ai-machine-learning-learning',
    title: 'AI & Machine Learning Learning',
    description: 'Resources for understanding artificial intelligence and machine learning principles.',
    resources: [
      { name: 'Machine Learning by Andrew Ng (Coursera/DeepLearning.AI)', url: 'https://www.coursera.org/learn/machine-learning', type: 'course', level: 'beginner', description: 'A highly acclaimed introductory course to machine learning from Stanford University.' },
      { name: 'Scikit-learn Official Documentation', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'article', level: 'intermediate', description: 'User guide for the most popular Python ML library.' },
    ],
  },
  {
    id: 'data-analysis-learning',
    title: 'Data Analysis Learning',
    description: 'Resources for collecting, cleaning, analyzing, and visualizing data.',
    resources: [
      { name: 'Python for Everybody (University of Michigan)', url: 'https://www.py4e.com/', type: 'course', level: 'beginner', description: 'A comprehensive course to learn Python, including data handling.' },
      { name: 'Pandas Documentation (Getting Started)', url: 'https://pandas.pydata.org/docs/getting_started/index.html', type: 'article', level: 'beginner', description: 'Official guide for the Pandas data manipulation library in Python.' },
      { name: 'Tableau Public (Free version)', url: 'https://public.tableau.com/en-us/s/', type: 'tool', level: 'beginner', description: 'Create and share interactive data visualizations.' },
    ],
  },
  {
    id: 'cybersecurity-learning',
    title: 'Cybersecurity Fundamentals Learning',
    description: 'An introduction to protecting systems, networks, and data from digital threats.',
    resources: [
      { name: 'CompTIA Security+ Study Guide (Free Resources)', url: 'https://www.comptia.org/training/books/security-sy0-601-study-guide', type: 'book', level: 'beginner', description: 'Look for free companion resources to this industry-standard certification guide.' },
      { name: 'TryHackMe (Free Rooms)', url: 'https://tryhackme.com/', type: 'tool', level: 'beginner', description: 'Hands-on platform for learning cybersecurity through practical exercises.' },
      { name: 'OWASP Top 10 (Official)', url: 'https://owasp.org/www-project-top-ten/', type: 'article', level: 'intermediate', description: 'A standard awareness document for web application security.' },
    ],
  },
  {
    id: 'mobile-dev-learning',
    title: 'Mobile Development Learning (iOS/Android)',
    description: 'Resources for building applications for smartphones and tablets.',
    resources: [
      { name: 'Android Developers (Official Guides)', url: 'https://developer.android.com/courses', type: 'course', level: 'beginner', description: 'Official training courses for Android app development with Kotlin.' },
      { name: 'Apple Developer Documentation (SwiftUI Tutorials)', url: 'https://developer.apple.com/tutorials/swiftui', type: 'course', level: 'beginner', description: 'Official tutorials for building iOS apps with SwiftUI.' },
    ],
  },
  {
    id: 'cloud-computing-learning',
    title: 'Cloud Computing Fundamentals Learning',
    description: 'An introduction to distributed computing concepts and cloud provider services.',
    resources: [
      { name: 'AWS Cloud Practitioner Essentials (Free Course)', url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/', type: 'course', level: 'beginner', description: 'Official free course from Amazon Web Services for cloud basics.' },
      { name: 'Google Cloud Skills Boost (Free Tier)', url: 'https://cloud.google.com/training/free-training', type: 'course', level: 'beginner', description: 'Offers free labs and courses on Google Cloud Platform.' },
      { name: 'Microsoft Azure Fundamentals (AZ-900 Learning Path)', url: 'https://learn.microsoft.com/en-us/training/paths/az-900-azure-fundamentals-describe-cloud-concepts/', type: 'course', level: 'beginner', description: 'Official free learning path for Azure cloud concepts.' },
    ],
  }
];

// Reusable component for displaying a learning category and its resources
const LearningCategoryComponent: React.FC<{ category: LearningCategory }> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-l-2 border-vibrant-teal pl-4 ml-4 my-4 relative">
      <div
        className="cursor-pointer bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-white">{category.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{category.description}</p>
        {/* Show expand/collapse icon if there are resources or sub-categories */}
        {(category.resources.length > 0 || (category.subCategories && category.subCategories.length > 0)) && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-vibrant-teal text-2xl">
            {isOpen ? '−' : '+'}
          </span>
        )}
      </div>

      {isOpen && category.resources.length > 0 && (
        <div className="mt-4 ml-4">
          <h4 className="text-md font-semibold text-vibrant-teal mb-2">Core Resources:</h4>
          <ul className="list-disc list-inside text-gray-400">
            {category.resources.map((res, idx) => (
              <li key={idx} className="mb-2">
                <Link href={res.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC6] transition-colors duration-200">
                  <span className="font-medium text-white">{res.name}</span> <span className="text-gray-500 text-xs">({res.type}{res.level ? ` - ${res.level}` : ''})</span>
                </Link>
                {res.description && <p className="text-gray-500 text-xs italic mt-0.5">{res.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && category.subCategories && category.subCategories.length > 0 && (
        <div className="ml-4 mt-4 border-l border-gray-700">
          <h4 className="text-md font-semibold text-vibrant-teal mb-2">Specific Topics:</h4>
          {category.subCategories.map(subCat => (
            <LearningCategoryComponent key={subCat.id} category={subCat} />
          ))}
        </div>
      )}
    </div>
  );
};

const LearningPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-8 min-h-[calc(100vh-64px)] text-white">
      <h1 className="text-5xl font-extrabold mb-4 text-vibrant-teal text-center drop-shadow-md">
        Free Learning Resources
      </h1>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-3xl mx-auto">
        Explore a curated collection of free courses, articles, videos, and tools to enhance your skills in various development areas.
      </p>

      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl">
        {learningContentData.map(category => (
          <LearningCategoryComponent key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default LearningPage;