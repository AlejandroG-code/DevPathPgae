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
# Python File Write

Writing to files is a common operation, whether you're logging data, saving user preferences, or generating reports. Python provides methods to write content to files, either by overwriting existing content or appending to it.

## Writing to an Existing File ('w' or 'a' mode)

To write to an existing file, you must open it in either 'a' (append) mode or 'w' (write) mode.

-   **'a' (Append):** Will append to the end of the file. If the file does not exist, it will be created.
-   **'w' (Write):** Will overwrite any existing content. If the file does not exist, it will be created.

### Using 'w' Mode (Overwrite)

\`\`\`python
# Example 1: Overwriting file content
# with open("demofile2.txt", "w", encoding="utf-8") as f:
#   f.write("Woops! I have deleted the content!")
# print("File 'demofile2.txt' has been overwritten.")

# After running, if you read demofile2.txt, it will only contain: "Woops! I have deleted the content!"
\`\`\`
<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Data Loss</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Using 'w' mode is powerful but can be dangerous as it **deletes all existing content** in the file before writing new data. Be absolutely certain you want to overwrite the file when using this mode.
    </div>
</div>

### Using 'a' Mode (Append)

\`\`\`python
# Example 2: Appending to file content
# with open("demofile2.txt", "a", encoding="utf-8") as f:
#   f.write("\\nNow the file has more content!") # Add a newline character
# print("Content appended to 'demofile2.txt'.")

# After running, if demofile2.txt previously had "Hello", it would become:
# Hello
# Now the file has more content!
\`\`\`

## Writing Multiple Lines

You can write multiple lines to a file. Remember to add newline characters ('\\n') yourself if you want content to appear on separate lines.

\`\`\`python
# Example 3: Writing multiple lines
lines_to_write = [
    "First line.",
    "Second line.",
    "Third line that is much longer."
]

# Using 'w' to write a new file or overwrite
# with open("multi_line_file.txt", "w", encoding="utf-8") as f:
#     for line in lines_to_write:
#         f.write(line + "\\n") # Add newline after each line
# print("Multiple lines written to 'multi_line_file.txt'.")
\`\`\`

## Creating a New File ('w' or 'x' mode)

If the file you specify in 'open()' does not exist, both 'w' and 'a' modes will create a new, empty file.

However, if you specifically want to *create* a file and raise an error if it already exists, use 'x' (create) mode.

\`\`\`python
# Example 4: Creating a new file with 'w' mode (if it doesn't exist)
# (If 'newfile_w.txt' exists, it will be overwritten)
# with open("newfile_w.txt", "w", encoding="utf-8") as f:
#     f.write("This file was created by 'w' mode.")
# print("File 'newfile_w.txt' created/overwritten.")

# Example 5: Creating a new file with 'x' mode (raises error if exists)
# try:
#     with open("newfile_x.txt", "x", encoding="utf-8") as f:
#         f.write("This file was created by 'x' mode and is unique.")
#     print("File 'newfile_x.txt' created uniquely.")
# except FileExistsError:
#     print("Error: 'newfile_x.txt' already exists and 'x' mode prevents overwrite.")
# except Exception as e:
#     print(f"An unexpected error occurred: {e}")
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always use the 'with' statement for file writing, even for simple tasks, as it guarantees the file is properly closed. Choose the correct mode ('w', 'a', or 'x') carefully to prevent accidental data loss or to ensure unique file creation.
    </div>
</div>
`;

export default function PythonFileWritePage() {
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
          prevLesson="python-file-open"
          nextLesson="python-file-read"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
