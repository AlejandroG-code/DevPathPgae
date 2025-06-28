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
# Python File Open (The 'open()' Function)

The 'open()' function is the primary way to interact with files in Python. It returns a file object, which has various methods for reading, writing, and manipulating the file.

## Syntax

\`\`\`python
file_object = open("filename", "mode", encoding="utf-8")
\`\`\`
-   **"filename"**: (Required) The path to the file you want to open. If just a name is given, Python looks in the current working directory.
-   **"mode"**: (Optional) A string specifying the mode in which the file is opened. Default is 'r' (read, text mode).
-   **"encoding"**: (Optional) Specifies the encoding of the file (e.g., "utf-8", "latin-1"). It's good practice to specify encoding for text files.

## Common File Modes

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Mode</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'r'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><strong>Read (default)</strong> - Opens a file for reading. Error if file doesn't exist.</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><strong>Append</strong> - Opens for appending. Creates file if it doesn't exist. Adds to end of file.</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'w'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><strong>Write</strong> - Opens for writing. Creates file if it doesn't exist. <strong>Overwrites content.</strong></td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><strong>Create</strong> - Creates the specified file. Error if file already exists.</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'t'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><strong>Text (default)</strong> - Opens in text mode (for text files).</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'b'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><strong>Binary</strong> - Opens in binary mode (for non-text files like images, audio).</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'+'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"><strong>Update</strong> - Opens a file for both reading and writing (e.g., 'r+', 'w+', 'a+').</td>
    </tr>
  </tbody>
</table>

## Opening Files in Text Mode ('t')

This is the default mode and is used for reading and writing standard text files.

\`\`\`python
# Example: Open for reading (text mode is default)
try:
    with open("example_read.txt", "r", encoding="utf-8") as f:
        content = f.read()
        print("Content read from example_read.txt:")
        print(content)
except FileNotFoundError:
    print("Error: 'example_read.txt' not found.")
except Exception as e:
    print(f"An error occurred: {e}")

# Example: Open for writing (creates/overwrites)
# with open("example_write.txt", "w", encoding="utf-8") as f:
#     f.write("This is new content.")
# print("Written to example_write.txt")

# Example: Open for appending (adds to end)
# with open("example_append.txt", "a", encoding="utf-8") as f:
#     f.write("\nAppending new line.")
# print("Appended to example_append.txt")

# Example: Open for exclusive creation
# try:
#     with open("unique_file.txt", "x", encoding="utf-8") as f:
#         f.write("This file exists only once.")
#     print("Unique file created.")
# except FileExistsError:
#     print("Error: 'unique_file.txt' already exists.")
\`\`\`
**Note:** To run the commented-out examples, you would need to uncomment them and potentially create or delete files manually to see the different behaviors.

## Opening Files in Binary Mode ('b')

Binary mode is used for non-text files where you deal with raw bytes. You don't specify encoding in binary mode.

\`\`\`python
# Example: Writing bytes to a binary file
# with open("binary_data.bin", "wb") as f:
#     f.write(b"\\x01\\x02\\x03\\xff")
# print("Binary data written.")

# Example: Reading bytes from a binary file
# with open("binary_data.bin", "rb") as f:
#     data = f.read()
#     print(f"Binary data read: {data}") # Output: b'\\x01\\x02\\x03\\xff'
\`\`\`

## Error Handling for File Operations

It's very common to use 'try...except' blocks when opening files, especially for 'FileNotFoundError' or 'PermissionError'. The 'with' statement handles ensuring the file is closed, but 'try...except' handles problems during the 'open' call itself.

\`\`\`python
# Example: Handling FileNotFoundError
try:
    with open("non_existent_file.txt", "r") as f:
        content = f.read()
        print(content)
except FileNotFoundError:
    print("The file 'non_existent_file.txt' was not found.")
except PermissionError:
    print("You don't have permission to access this file.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
# Output: The file 'non_existent_file.txt' was not found.
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always use the 'with' statement when opening files; it ensures proper closing and resource management. Be precise with your file modes ('r', 'w', 'a', 'x') to avoid accidental data loss, especially when writing to files.
    </div>
</div>
`;

export default function PythonFileOpenPage() {
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
          prevLesson="python-file-handling"
          nextLesson="python-file-write"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
