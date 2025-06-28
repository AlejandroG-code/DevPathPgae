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
# Python Tutorial

Welcome to the Python Tutorial! Python is a popular, high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, artificial intelligence, automation, and more.

This tutorial will guide you through the fundamentals of Python programming, from basic syntax to more advanced concepts.

## What is Python?

-   **Interpreted:** Python code is executed line by line, rather than being compiled directly into machine code. This makes development faster.
-   **High-level:** You don't need to manage memory manually, as Python handles it automatically.
-   **General-purpose:** Can be used for a wide range of applications.
-   **Dynamically Typed:** You don't need to declare the type of variables when you declare them; the type is determined at runtime.
-   **Object-Oriented:** Supports object-oriented programming paradigms.
-   **Extensible:** Can be integrated with other languages like C, C++, and Java.

## Why Learn Python?

1.  **Simplicity:** Python's syntax is clean and readable, making it an excellent language for beginners.
2.  **Versatility:** Used in diverse fields like web development (Django, Flask), data analysis (Pandas, NumPy), machine learning (TensorFlow, PyTorch), automation, scripting, and more.
3.  **Large Community & Libraries:** A vast ecosystem of libraries and frameworks, saving you time and effort.
4.  **High Demand:** Python developers are highly sought after in the job market.
5.  **Cross-platform:** Runs on Windows, macOS, Linux, and other operating systems.

## Setting Up Your Environment

Before you start coding in Python, you'll need to install the Python interpreter.

### 1. Download Python

Visit the official Python website: [python.org/downloads/](https://www.python.org/downloads/)
Download the latest stable version for your operating system.

### 2. Install Python

-   **Windows:** Run the installer. Make sure to check "Add Python X.Y to PATH" during installation.
-   **macOS:** Python might be pre-installed, but it's recommended to install the latest version via Homebrew ('brew install python3').
-   **Linux:** Python is usually pre-installed. You can install specific versions using your distribution's package manager (e.g., 'sudo apt install python3' on Ubuntu).

### 3. Verify Installation

Open your terminal or command prompt and type:

\`\`\`bash
python3 --version
# or simply
python --version
\`\`\`

You should see the installed Python version (e.g., 'Python 3.9.7').

## Your First Python Program

Let's write the classic "Hello, World!" program.

1.  Open a text editor (like VS Code, Sublime Text, or Notepad).
2.  Type the following code:

    \`\`\`python
    print("Hello, World!")
    \`\`\`

3.  Save the file as 'hello.py' (the '.py' extension is crucial).
4.  Open your terminal or command prompt, navigate to the directory where you saved 'hello.py'.
5.  Run the program:

    \`\`\`bash
    python3 hello.py
    # or
    python hello.py
    \`\`\`

You should see:

\`\`\`
Hello, World!
\`\`\`

Congratulations! You've just run your first Python program.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Python's official documentation is an invaluable resource. Whenever you encounter a new concept or function, refer to the documentation for comprehensive information. The Python Package Index (PyPI) is also where you'll find thousands of third-party libraries.
    </div>
</div>
`;

export default function PythonTutorialPage() {
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
          prevLesson={null} // First lesson in this sequence
          nextLesson="python-home"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
