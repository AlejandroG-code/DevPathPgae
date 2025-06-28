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
# Python File Handling

File handling is an important part of any web application. Python has several functions for creating, reading, updating, and deleting files.

## The 'open()' Function

The key function for working with files in Python is the 'open()' function.

\`\`\`python
# Example: Opening a file in read mode
# f = open("demofile.txt", "r")
# print(f.read())
# f.close() # Always close the file!
\`\`\`
**Note:** For the examples to work, you would need a 'demofile.txt' in the same directory as your Python script.

## File Modes

The 'open()' function takes two parameters: 'filename' and 'mode'.
There are four different methods (modes) for opening a file:

-   'r' (Read): Default value. Opens a file for reading. Returns an error if the file does not exist.
-   'a' (Append): Opens a file for appending. Creates the file if it does not exist.
-   'w' (Write): Opens a file for writing. Creates the file if it does not exist. **Overwrites the content of the file if it exists.**
-   'x' (Create): Creates the specified file. Returns an error if the file exists.

In addition you can specify if the file should be handled as binary or text mode:

-   't' (Text): Default value. Text mode.
-   'b' (Binary): Binary mode (e.g., images, audio files).

## Closing Files with '.close()'

It is good practice to always close the file when you are done with it. This frees up system resources and ensures all buffered writes are flushed to disk.

\`\`\`python
# Example: Creating a file (if it doesn't exist) and writing to it
# try:
#     f = open("newfile.txt", "w")
#     f.write("Hello, this is a new file!")
#     print("File 'newfile.txt' created and written to.")
# except Exception as e:
#     print(f"An error occurred: {e}")
# finally:
#     if 'f' in locals() and not f.closed: # Ensure 'f' exists and is open before closing
#         f.close()
#         print("File closed.")
\`\`\`

## The 'with' Statement (Recommended Way)

Using the 'with' statement is highly recommended for file handling because it automatically ensures that the file is properly closed after its block is exited, even if errors occur. This eliminates the need for explicit 'f.close()' calls and simplifies error handling.

\`\`\`python
# Example: Reading a file using 'with' statement (assuming demofile.txt exists)
# with open("demofile.txt", "r") as f:
#     content = f.read()
#     print("Content of demofile.txt:")
#     print(content)
# print("File automatically closed after 'with' block.")
\`\`\`
When the 'with' block finishes, either normally or due to an exception, Python guarantees that the file's '__exit__' method (which handles closing) is called.

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Overwriting Files</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be extremely careful when opening files in 'w' (write) mode. If the file already exists, its entire content will be **overwritten** without any warning. Use 'a' (append) mode if you want to add to existing content without deleting it, or 'x' (create) mode if you want to ensure the file does not exist before creating it.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always use the 'with' statement for file operations. It's the most Pythonic and safest way to handle files, guaranteeing proper resource management even if errors occur during file processing.
    </div>
</div>
`;

export default function PythonFileHandlingPage() {
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
          prevLesson="python-string-formatting"
          nextLesson="python-file-open"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
