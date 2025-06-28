// src/app/learning/c/c-create-files/page.tsx
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
# C File Handling: Creating Files

File handling in C allows your programs to interact with files on the computer's storage. This enables persistent storage of data, allowing your program to read from and write to files. The standard library for file I/O in C is '<stdio.h>'.

## The 'FILE' Pointer

To perform any file operation (create, open, read, write, close), you first need a pointer of type 'FILE'. This pointer is used by the standard library functions to manage the file stream.

\`\`\`c
FILE *fptr; // Declare a file pointer
\`\`\`

## Opening a File: 'fopen()'

The 'fopen()' function is used to open a file. If the file does not exist, it can be created depending on the mode specified.

**Syntax:**

\`\`\`c
FILE *fopen(const char *filename, const char *mode);
\`\`\`

-   'filename': A string containing the name (and optionally path) of the file to open.
-   'mode': A string specifying the mode in which the file is to be opened.

## Common File Opening Modes

<div class="my-6 overflow-x-auto rounded-lg shadow-xl border border-gray-700">
    <table class="w-full text-left border-collapse bg-gray-800">
        <thead>
            <tr>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Mode</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">Description</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">File if not exists</th>
                <th class="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700 text-sm">File if exists</th>
            </tr>
        </thead>
        <tbody>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'r'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Read mode. Opens a file for reading.</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns NULL (error)</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Opens from beginning</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'w'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Write mode. Opens a file for writing.</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Creates new file</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Truncates to zero length (empties content)</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Append mode. Opens a file for writing, appending to the end.</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Creates new file</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Appends to end of file</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'r+'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Read/Update mode. Opens for reading and writing.</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns NULL (error)</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Opens from beginning, no truncate</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'w+'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Write/Update mode. Opens for reading and writing.</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Creates new file</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Truncates to zero length</td></tr>
            <tr><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a+'</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Append/Update mode. Opens for reading and appending.</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Creates new file</td><td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Appends to end of file</td></tr>
        </tbody>
    </table>
</div>

'fopen()' returns a 'FILE' pointer on success, or 'NULL' if the file cannot be opened (e.g., file not found in 'r' mode, or permissions error). **Always check if 'fopen()' returned 'NULL' before proceeding with file operations.**

## Closing a File: 'fclose()'

After you're done with file operations, it's essential to close the file using 'fclose()'. This flushes any buffered data to the file and releases the resources associated with the file stream.

**Syntax:**

\`\`\`c
int fclose(FILE *stream);
\`\`\`

-   'stream': The 'FILE' pointer associated with the file to be closed.
Returns 0 on success, or 'EOF' (End Of File) if an error occurs.

## Example: Creating a New File

This program will create a new file named 'mynewfile.txt'. If it already exists, 'w' mode will truncate it (empty its contents).

\`\`\`c
#include <stdio.h> // Required for file operations

int main() {
    FILE *fptr; // Declare a file pointer

    // Open the file in write mode ("w")
    // If 'mynewfile.txt' does not exist, it will be created.
    // If it exists, its content will be truncated (emptied).
    fptr = fopen("mynewfile.txt", "w");

    // Check if the file was opened successfully
    if (fptr == NULL) {
        printf("Error: Could not open the file 'mynewfile.txt'.\\n");
        return 1; // Indicate an error
    }

    printf("File 'mynewfile.txt' created/opened successfully for writing.\\n");

    // Close the file
    fclose(fptr);
    printf("File 'mynewfile.txt' closed.\\n");

    return 0; // Indicate success
}
\`\`\`

After running this program, you should find a new (possibly empty) file named 'mynewfile.txt' in the same directory as your executable.

## Example: Creating a File in Append Mode ('a')

Using 'a' mode will create the file if it doesn't exist, but if it does exist, it will open it for writing at the end of the file without truncating its content.

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;

    // Open the file in append mode ("a")
    // If 'mylog.txt' does not exist, it will be created.
    // If it exists, new data will be appended to its end.
    fptr = fopen("mylog.txt", "a");

    if (fptr == NULL) {
        printf("Error: Could not open the file 'mylog.txt'.\\n");
        return 1;
    }

    printf("File 'mylog.txt' created/opened successfully for appending.\\n");
    // We will write content to this file in the next lesson.

    fclose(fptr);
    printf("File 'mylog.txt' closed.\\n");

    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Important!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always remember to close files using 'fclose()' after you are finished with them. Failing to close files can lead to data loss (buffered data not written), resource leaks, and other unexpected behavior.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Creating files is the first step in file handling. The choice of file mode ('w', 'a', etc.) is critical as it determines the initial state of the file and how write operations will behave.
    </div>
</div>
`;


export default function CCreateFilesPage({ }: { params: { courseId: string; lessonId: string } }) {

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
    // Custom renderers for markdown elements to apply Tailwind CSS
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
          prevLesson="c-math-functions"
          nextLesson="c-write-to-files"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
