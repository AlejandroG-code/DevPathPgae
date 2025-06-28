// src/app/learning/c/c-get-started/page.tsx
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
## Getting Started with C

To start programming in C, you'll need a few essential tools. Don't worry, they are generally free and easy to install!

### What You'll Need:

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">1. Text Editor:</p>
    <p class="text-gray-300">To write your C source code. Popular choices include Visual Studio Code, Sublime Text, Atom, or even a simple notepad.</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">2. C Compiler:</p>
    <p class="text-gray-300">To translate your C code into an executable program. The most common compiler is GCC (GNU Compiler Collection).</p>
  </div>
  <div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-md">
    <p class="text-vibrant-teal font-semibold mb-1">3. Integrated Development Environment (IDE) - Optional but Recommended:</p>
    <p class="text-gray-300">An IDE combines a text editor, compiler, and debugger into a single application. Examples: Code::Blocks, Dev-C++, Visual Studio (with C++ development tools).</p>
  </div>
</div>

### Installing GCC (GNU Compiler Collection)

GCC is the standard compiler for C and C++ on many operating systems.

#### On Linux:

GCC is often pre-installed or can be easily installed via your distribution's package manager.

\`\`\`bash
# Update package list
sudo apt update

# Install build-essential package (includes gcc, g++, and make)
sudo apt install build-essential
\`\`\`

#### On macOS:

You can install GCC by installing Xcode Command Line Tools.

\`\`\`bash
xcode-select --install
\`\`\`

#### On Windows:

For Windows, a popular option is MinGW-w64, which provides a GCC environment.

1.  **Download MinGW-w64:** Go to the <a href="https://mingw-w64.org/doku.php/download" target="_blank" rel="noopener noreferrer">MinGW-w64 website</a> and download the installer. Look for a build that includes 'posix' threads and 'seh' or 'sjlj' exceptions. A common choice is 'x86_64-posix-seh'.
2.  **Installation:** Run the installer. Ensure you choose to install the 'gcc' compiler.
3.  **Add to PATH:** This is crucial. You need to add the 'bin' directory of your MinGW-w64 installation to your system's PATH environment variable.
    * Typically, the path will look something like: \`C:\\Program Files\\mingw-w64\\x86_64-8.1.0-posix-seh-rt_v6-rev0\\mingw64\\bin\` (the exact path may vary based on version and installation location).
    * **Steps to add to PATH:**
        1.  Search for "Environment Variables" in the Windows search bar and open "Edit the system environment variables".
        2.  Click "Environment Variables..."
        3.  Under "System variables", find and select the "Path" variable, then click "Edit...".
        4.  Click "New" and paste the path to your MinGW-w64 \`bin\` directory.
        5.  Click "OK" on all windows to save the changes.
4.  **Verify Installation:** Open a new Command Prompt or PowerShell window and type:

\`\`\`bash
gcc --version
\`\`\`

You should see output similar to this:

\`\`\`
gcc (MinGW-W64 x86_64-posix-seh, built by Brecht Sanders) 8.1.0
Copyright (C) 2018 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
\`\`\`

If you see a version number, GCC is successfully installed!

### Your First C Program (Revisited)

Let's write and compile a simple "Hello, C!" program.

1.  **Create a file** named \`hello.c\` in your preferred directory.
2.  **Add the following code** to \`hello.c\`:

\`\`\`c
#include <stdio.h> // Standard Input-Output library

int main() {
    printf("Hello, C!\\n"); // Print message
    return 0; // Indicate success
}
\`\`\`

3.  **Open your terminal or command prompt**, navigate to the directory where you saved \`hello.c\`.
4.  **Compile the program:**

\`\`\`bash
gcc hello.c -o hello
\`\`\`

    * \`gcc\`: Invokes the GCC compiler.
    * \`hello.c\`: Your source code file.
    * \`-o hello\`: Specifies the output executable file name (e.g., \`hello\` on Linux/macOS, \`hello.exe\` on Windows).

5.  **Run the program:**

\`\`\`bash
./hello
\`\`\`

    * On Windows, you might just type \`hello\` (or \`hello.exe\`).

You should see:

\`\`\`
Hello, C!
\`\`\`

Congratulations! You've set up your development environment and successfully compiled and run your first C program. You are now ready to dive deeper into the language.
`;


export default function CGetStartedPage() {

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
        // Load C language component after core is loaded
        const scriptCLang = document.createElement('script');
        scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
        scriptCLang.async = true;
  
        scriptCLang.onload = () => {
          // Highlight all code blocks after C language component is loaded
          if (window.Prism) {
            window.Prism.highlightAll();
          }
        };
        document.body.appendChild(scriptCLang);
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
        const cLangScript = document.querySelector('script[src*="prism-c.min.js"]');
        if (cLangScript && document.body.contains(cLangScript)) {
          document.body.removeChild(cLangScript);
        }
      };
    }, [LESSON_CONTENT]); // Re-run effect if lesson content changes

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
          currentCourseId="c"
          prevLesson="c-intro"
          nextLesson="c-syntax"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
