'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import LessonNavigationButtons from '@/app/_components/LessonNavigationButtons';

declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

const LESSON_CONTENT = `
# Python Home

This section serves as the home base for your Python learning journey, providing quick access to essential information and a starting point for exploring the language's vast capabilities.

## What You'll Learn Here

The Python course is structured to take you from absolute beginner to a confident Python programmer. Here's a glimpse of topics we'll cover:

-   **Fundamentals:** Variables, data types, operators, control flow (if/else, loops).
-   **Data Structures:** Lists, tuples, dictionaries, sets.
-   **Functions:** Defining, calling, parameters, scope.
-   **Modules & Packages:** Organizing your code and using external libraries.
-   **File Handling:** Reading from and writing to files.
-   **Object-Oriented Programming (OOP):** Classes, objects, inheritance, polymorphism.
-   **Error Handling:** Managing exceptions to create robust applications.
-   **Advanced Topics:** Generators, decorators, working with APIs.

## Why Python is a Top Choice

Python's rise to prominence is due to several key factors:

1.  **Readability:** Its syntax is designed for clarity, resembling natural language more than other programming languages. This reduces the cost of program maintenance and makes collaboration easier.
2.  **Extensive Libraries:** The Python Package Index (PyPI) hosts over 400,000 packages, covering almost every conceivable programming task. From web development (Django, Flask) to scientific computing (NumPy, SciPy, Pandas) and machine learning (TensorFlow, PyTorch), there's usually a library for it.
3.  **Community Support:** A massive and active global community means abundant resources, forums, and tutorials are readily available to help you when you get stuck.
4.  **Integration Capabilities:** Python can easily integrate with C, C++, Java, and other languages, making it suitable for hybrid environments and leveraging existing codebases.

## Where Python Shines

Python is the go-to language for:

-   **Web Development (Backend):** Powering many popular websites and web applications with frameworks like Django and Flask.
-   **Data Science & Analytics:** Essential for data cleaning, analysis, visualization, and machine learning.
-   **Artificial Intelligence & Machine Learning:** Dominant in AI research and development due to its rich libraries (TensorFlow, Keras, PyTorch, Scikit-learn).
-   **Automation & Scripting:** Automating repetitive tasks, system administration, and network programming.
-   **DevOps:** Used for infrastructure automation, configuration management, and continuous integration.
-   **Game Development:** Though less common than C++ for high-performance games, Python is used for scripting in engines like Unity (via IronPython) and for indie game development (Pygame).

## Get Started!

The best way to learn Python is by doing. We encourage you to follow along with the examples, experiment with the code, and try solving the exercises (if provided). Each lesson is designed to build upon the previous one, so try to go through them in order.

Click the "Next Lesson" button to begin your journey with Python basics!

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Don't try to memorize everything. Focus on understanding the core concepts and practice consistently. The ability to find and understand documentation is more valuable than rote memorization.
    </div>
</div>
`;

export default function PythonHomePage() {
  useEffect(() => {
    // Load Prism CSS
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Prism core JS
    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      // Load Python language component after core is loaded
      const scriptPythonLang = document.createElement('script');
      scriptPythonLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js';
      scriptPythonLang.async = true;

      scriptPythonLang.onload = () => {
        // Highlight all code blocks after Python language component is loaded
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptPythonLang);
    };
    document.body.appendChild(scriptCore);

    // Cleanup function
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const pythonLangScript = document.querySelector('script[src*="prism-python.min.js"]');
      if (pythonLangScript && document.body.contains(pythonLangScript)) {
        document.body.removeChild(pythonLangScript);
      }
    };
  }, [LESSON_CONTENT]);

  const components: Components = {
    code: ({ className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const lang = match ? match[1] : 'markup'; 
      return (
        <pre className="my-4 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-4 text-sm">
          <code className={`language-${lang}`} {...props}>
            {String(children).replace(/\n$/, '')}
          </code>
        </pre>
      );
    },
    h1: ({ ...props }) => <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-vibrant-teal mb-4 mt-8 drop-shadow-md" {...props} />,
    h2: ({ ...props }) => <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 mt-6 border-b border-gray-700 pb-2" {...props} />,
    h3: ({ ...props }) => <h3 className="text-2xl md:text-3xl font-semibold text-vibrant-teal mb-2 mt-5" {...props} />,
    p: ({ ...props }) => <p className="text-base md:text-lg text-gray-300 mb-4 leading-relaxed" {...props} />,
    strong: ({ ...props }) => <strong className="font-bold text-vibrant-teal" {...props} />,
    a: ({ ...props }) => <a className="text-accent-purple hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc list-inside ml-4 text-gray-300 mb-4 space-y-1" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal list-inside ml-4 text-gray-300 mb-4 space-y-1" {...props} />,
    li: ({ ...props }) => <li className="mb-2" {...props} />,
    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-accent-purple pl-4 italic text-gray-400 my-4" {...props} />,
    table: ({ ...props }) => <table className="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden" {...props} />,
    thead: ({ ...props }) => <thead className="bg-gray-700" {...props} />,
    th: ({ ...props }) => <th className="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm" {...props} />,
    tbody: ({ ...props }) => <tbody {...props} />,
    td: ({ ...props }) => <td className="p-3 border-b border-gray-700 text-gray-300 text-sm" {...props} />,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 w-full max-w-full px-4 md:px-8 mx-auto">
        <div className="lesson-content p-4 md:p-8 bg-gray-900 text-white rounded-lg shadow-xl w-full">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {LESSON_CONTENT}
          </ReactMarkdown>
        </div>
        <LessonNavigationButtons
          currentCourseId="python"
          prevLesson="python-tutorial"
          nextLesson="python-intro"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
