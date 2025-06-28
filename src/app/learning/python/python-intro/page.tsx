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
# Python Introduction

Python is a versatile, high-level programming language released in 1991 by Guido van Rossum. Its design philosophy emphasizes code readability with its notable use of significant indentation. Python is dynamically typed and garbage-collected, supporting multiple programming paradigms, including structured (particularly procedural), object-oriented, and functional programming.

## What Makes Python Unique?

1.  **Readability:** Python's syntax is often compared to plain English, making it easy to learn and understand. It uses indentation to define code blocks, which enforces good coding style.
2.  **Versatile Applications:** From web development (backend), data analysis, artificial intelligence, machine learning, scientific computing, automation, and scripting, Python is a go-to language.
3.  **Extensive Standard Library:** Python comes with a "batteries-included" philosophy, offering a large standard library that provides tools for many common programming tasks.
4.  **Third-Party Ecosystem:** Beyond the standard library, the Python Package Index (PyPI) hosts hundreds of thousands of third-party modules and packages, enabling rapid development and access to specialized functionalities.
5.  **Community Support:** A huge and active community contributes to its growth, provides support, and creates a wealth of resources for learners and developers.

## Key Features

-   **Simple and Easy to Learn:** Its simple syntax and emphasis on natural language make it an excellent choice for beginners.
-   **Free and Open Source:** Python is freely available and can be used and distributed without licensing restrictions.
-   **High-level Language:** You don't need to deal with low-level memory management.
-   **Interpreted Language:** Python code is executed line by line, which facilitates quick prototyping and testing.
-   **Object-Oriented Language:** Supports concepts like classes, objects, inheritance, and polymorphism.
-   **Portable:** Python programs can run on various platforms (Windows, macOS, Linux, etc.) without modification.
-   **Embeddable and Extensible:** Python code can be embedded into other languages, and other languages' code can be extended into Python, allowing for hybrid solutions.

## Python's Impact

Python's impact on various industries has been profound.

-   **Web Industry:** Many popular services like Instagram, Spotify, and Dropbox use Python on their backend.
-   **Data Science:** It's the most used language for data analysis, visualization, and building machine learning models, thanks to libraries like Pandas, NumPy, Matplotlib, Scikit-learn, TensorFlow, and PyTorch.
-   **Automation:** Widely used for scripting system administration tasks, network automation, and repetitive data processing.
-   **Education:** Its simplicity makes it a popular choice for teaching programming concepts in schools and universities.

## Python Versions

Python has two major versions currently in use: Python 2 and Python 3.
**Python 3 is the present and future of Python.** Python 2 is officially deprecated, and its support ended in 2020. All new development should use Python 3. This course will focus entirely on Python 3.

## Integrated Development Environments (IDEs)

While you can write Python code in any text editor, using an IDE or a robust code editor can significantly enhance your development experience. Popular choices include:

-   **VS Code:** Lightweight, highly customizable, with excellent Python extensions.
-   **PyCharm:** A dedicated Python IDE with powerful features for professional development.
-   **Jupyter Notebooks:** Ideal for data science, allowing you to create and share documents that contain live code, equations, visualizations, and narrative text.

## Interactive Python Shell

You can run Python code interactively in your terminal. This is great for quick tests and learning.

\`\`\`bash
python3
# or python (depending on your installation)
\`\`\`

You will see a '>>>' prompt, where you can type Python commands:

\`\`\`python
>>> print("Hello from interactive shell!")
Hello from interactive shell!
>>> 5 + 3
8
>>> name = "Alice"
>>> print(f"My name is {name}")
My name is Alice
\`\`\`

Type 'exit()' or press 'Ctrl+D' (Linux/macOS) / 'Ctrl+Z' then Enter (Windows) to exit the shell.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Start by experimenting with Python's interactive shell. It's an excellent way to immediately see the results of small code snippets and build your understanding of the language.
    </div>
</div>
`;

export default function PythonIntroPage() {
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
          prevLesson="python-home"
          nextLesson="python-getstarted"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
