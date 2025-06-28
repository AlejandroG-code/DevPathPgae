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
# Python PIP

PIP (stands for 'Pip Installs Packages') is the standard package manager for Python. It allows you to install and manage additional libraries and dependencies that are not part of the Python standard library. These external libraries significantly extend Python's capabilities, enabling tasks like web development, data analysis, machine learning, and more.

## What is a Package?

A package in Python contains all the files you need for a module. Modules are Python code libraries you can include in your project.

## Check if PIP is Installed

PIP is included with Python installations 3.4 and later. To check if PIP is installed, open your command line interface and type:

\`\`\`bash
pip --version
# or
pip3 --version
\`\`\`
**Expected Output:**
<pre>
<code class="language-text">
pip 24.0 from ... (python 3.x)
</code>
</pre>
If you see a version number, PIP is installed. If not, you might need to install it manually (though this is rare with modern Python versions).

## Installing PIP

If for some reason you don't have PIP, you can download 'get-pip.py' from 'https://pip.pypa.io/en/stable/installation/' and run it:

\`\`\`bash
python get-pip.py
# or
python3 get-pip.py
\`\`\`

## Installing Packages

Use the 'pip install' command to install packages.

**Example: Install the 'camelcase' package**
(This package converts text into camelCase)

\`\`\`bash
pip install camelcase
\`\`\`

Once installed, you can use the package in your Python code:

\`\`\`python
# my_app.py
import camelcase

c = camelcase.CamelCase()
txt = "hello world"
print(c.hump(txt)) # Output: HelloWorld
\`\`\`

## Listing Installed Packages

To see all the packages installed on your system, use the 'pip list' command.

\`\`\`bash
pip list
\`\`\`
**Partial Output (will vary based on your system):**
<pre>
<code class="language-text">
Package       Version
------------- --------
camelcase     0.2
pip           24.0
setuptools    65.5.0
...
</code>
</pre>

## Uninstalling Packages

Use the 'pip uninstall' command to remove a package.

\`\`\`bash
pip uninstall camelcase
\`\`\`
PIP will ask you to confirm:
<pre>
<code class="language-text">
Found existing installation: camelcase 0.2
Uninstalling camelcase-0.2:
  Would remove:
    /path/to/your/python/Lib/site-packages/camelcase
    /path/to/your/python/Lib/site-packages/camelcase-0.2.dist-info
Proceed (Y/n)? Y
  Successfully uninstalled camelcase-0.2
</code>
</pre>

## Upgrading PIP

It's a good practice to keep your PIP version updated.

\`\`\`bash
python -m pip install --upgrade pip
\`\`\`
**Note:** Using 'python -m pip' is the recommended way to run pip, as it ensures you are using the pip associated with your current Python interpreter.

## Using a 'requirements.txt' File

For larger projects, it's common to manage dependencies using a 'requirements.txt' file. This file lists all the packages and their versions that your project depends on.

**Example 'requirements.txt':**
<pre>
<code class="language-text">
camelcase==0.2
requests>=2.28.1,<3.0.0
numpy
</code>
</pre>

To install all packages listed in 'requirements.txt':

\`\`\`bash
pip install -r requirements.txt
\`\`\`

To generate a 'requirements.txt' file from your currently installed packages (useful for sharing your project's dependencies):

\`\`\`bash
pip freeze > requirements.txt
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        PIP is your gateway to Python's vast ecosystem of libraries. Always use virtual environments (like 'venv' or 'conda') for your projects to manage dependencies in an isolated manner, preventing conflicts between different projects.
    </div>
</div>
`;

export default function PythonPipPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptPythonLang = document.createElement('script');
      scriptPythonLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js';
      scriptPythonLang.async = true;

      scriptPythonLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptPythonLang);
    };
    document.body.appendChild(scriptCore);

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
          prevLesson="python-regex"
          nextLesson="python-try-except"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
