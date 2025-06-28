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
# Python Get Started

Getting started with Python involves installing the Python interpreter on your system and learning how to run Python code. This lesson will guide you through the process.

## 1. Install Python

If you haven't already, download and install Python from the official website. Always prefer Python 3.x.

Visit [python.org/downloads/](https://www.python.org/downloads/)

### Installation Tips:

-   **Windows:** During installation, make sure to check the box that says "Add Python X.Y to PATH". This makes it easier to run Python from your command prompt.
-   **macOS:** You can use Homebrew for a clean installation: \`brew install python3\`.
-   **Linux:** Python 3 is usually pre-installed. If not, use your distribution's package manager (e.g., \`sudo apt update && sudo apt install python3\` on Debian/Ubuntu).

## 2. Verify Installation

After installation, open your terminal or command prompt and run the following commands to confirm Python is installed and accessible:

\`\`\`bash
python3 --version
# Expected output: Python 3.x.x

# Or sometimes just 'python' works, depending on your system's PATH configuration
python --version
# Expected output: Python 3.x.x (or Python 2.x.x if you have both, always use python3)
\`\`\`

If you see the version number, you're good to go!

## 3. Choose a Code Editor / IDE

While a simple text editor works, an Integrated Development Environment (IDE) or a feature-rich code editor will greatly enhance your coding experience with features like syntax highlighting, code completion, and debugging.

Popular choices:
-   **VS Code (Visual Studio Code):** Free, lightweight, highly extensible with great Python support. Recommended for beginners.
-   **PyCharm Community Edition:** Free, dedicated Python IDE, powerful features.
-   **Jupyter Notebooks:** Web-based interactive environment, popular for data science.

## 4. Run Your First Python Program

Let's create a simple Python script and run it.

### Step 1: Write the Code

Open your chosen code editor and type the following:

\`\`\`python
# hello_world.py
print("Hello, Python world!")
print("This is my first Python program.")
\`\`\`

### Step 2: Save the File

Save the file with a '.py' extension, for example, 'hello_world.py'. Choose a location you can easily navigate to in your terminal.

### Step 3: Open Terminal and Navigate

Open your terminal or command prompt. Use the 'cd' (change directory) command to navigate to the folder where you saved your Python file.

\`\`\`bash
# Example for Windows
cd C:\\Users\\YourUser\\Documents\\PythonProjects

# Example for macOS/Linux
cd ~/Documents/PythonProjects
\`\`\`

### Step 4: Run the Program

Once in the correct directory, execute your Python script using the Python interpreter:

\`\`\`bash
python3 hello_world.py
# Or, if 'python' points to Python 3:
python hello_world.py
\`\`\`

You should see the output printed directly in your terminal:

\`\`\`
Hello, Python world!
This is my first Python program.
\`\`\`

## Interactive Python Shell (REPL)

Python also provides an interactive shell (Read-Eval-Print Loop) where you can type Python code line by line and see immediate results. This is excellent for quick tests and exploring syntax.

To open the interactive shell:

\`\`\`bash
python3
# or python
\`\`\`

You'll see a prompt like '>>>'. Type your code after it:

\`\`\`python
>>> print("Learning Python is fun!")
Learning Python is fun!
>>> 10 + 25
35
>>> name = "Alice"
>>> name
'Alice'
>>> exit() # Type exit() to leave the shell
\`\`\`

## Troubleshooting Common Issues

-   **'python' vs 'python3':** On some systems, 'python' might refer to Python 2.x. Always try 'python3' if 'python' doesn't work or gives you Python 2.
-   **'python not found' error:** This means Python is not in your system's PATH. Re-run the installer and ensure "Add Python to PATH" is checked (Windows), or manually add it.
-   **Incorrect file path:** Make sure your terminal is in the same directory as your '.py' file, or provide the full path to the file.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Practice running small scripts and using the interactive shell frequently. This hands-on approach will solidify your understanding of Python's behavior and syntax much faster than just reading.
    </div>
</div>
`;

export default function PythonGetStartedPage() {
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
          prevLesson="python-intro"
          nextLesson="python-syntax"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
