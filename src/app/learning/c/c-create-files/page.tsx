/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-create-files/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import LessonSidebar from '@/app/_components/LessonSidebar'; // Adjust path if _components is not used
import { useParams } from 'next/navigation'; // Needed for useEffect dependencies

// Extend the Window interface to include the Prism property
declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

interface LessonPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

const LESSON_CONTENT = `
## C Create Files

In C, creating a file is done using the 'fopen()' function with a specific file opening mode. If the file specified in 'fopen()' does not exist, and the mode is 'w' (write), 'a' (append), 'w+' (write/read), or 'a+' (append/read), then the file will be created.

### Creating a New File using "w" mode

The easiest way to ensure a file is created (or overwritten if it already exists) is to open it in **write mode ("w")**.

\`\`\`c
#include <stdio.h> // Required for file operations

int main() {
    FILE *fptr; // Declare a file pointer

    // Open a file named "newfile.txt" in write mode ('w').
    // If it doesn't exist, it will be created.
    // If it exists, its content will be erased (truncated).
    fptr = fopen("newfile.txt", "w");

    // Check if the file was opened/created successfully
    if (fptr == NULL) {
        printf("Error: Could not create the file!\\n");
        return 1; // Indicate an error
    }

    printf("File 'newfile.txt' created successfully.\\n");

    // Close the file to save changes and release resources
    fclose(fptr); 

    return 0;
}
\`\`\`

When you run this program, a new empty file named 'newfile.txt' will be created in the same directory as your executable (or the specified path). If 'newfile.txt' already existed, its contents would be deleted.

### Creating a File with Append Mode ("a")

You can also create a new file using the **append mode ("a")**. If the file doesn't exist, 'fopen()' in append mode will create it. If it does exist, it will open it to append data to its end.

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    
    // Open a file named "log.txt" in append mode ('a').
    // If it doesn't exist, it will be created.
    // If it exists, new content will be added to the end.
    fptr = fopen("log.txt", "a");

    if (fptr == NULL) {
        printf("Error: Could not create/open the file!\\n");
        return 1;
    }

    printf("File 'log.txt' created (or opened for appending) successfully.\\n");
    
    // You can write something here, which will be covered in the next lesson.
    fprintf(fptr, "Log entry from program run.\\n"); // Example of writing
    
    fclose(fptr);
    return 0;
}
\`\`\`

### Error Handling

It's crucial to always include error handling when dealing with file operations. Checking if 'fopen()' returns 'NULL' is the standard way to detect if a file operation failed (e.g., due to invalid path, lack of permissions, or disk full).

\`\`\`c
#include <stdio.h>
#include <errno.h> // For errno and strerror

int main() {
    FILE *fptr;
    const char *filename = "my_important_file.txt";

    fptr = fopen(filename, "w");

    if (fptr == NULL) {
        // Print an error message and possibly the system error message
        printf("Error creating file '%s'. Error code: %d, Message: %s\\n", 
               filename, errno, strerror(errno));
        // Common errno values:
        // EACCES (13): Permission denied
        // ENOENT (2): No such file or directory (if parent path doesn't exist)
        return 1;
    }

    printf("File '%s' created successfully.\\n", filename);
    fclose(fptr);
    return 0;
}
\`\`\`

The 'errno' variable and 'strerror()' function (from '<errno.h>') provide more detailed information about why a system call (like 'fopen()') failed.

Creating files is the first step in enabling your C programs to interact with the file system for data storage and retrieval.
`;

export default function CCreateFilesPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true;

      scriptCLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptCLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [LESSON_CONTENT, courseId, lessonId]);

  return (
    <div className="flex min-h-screen"> 
      <LessonSidebar /> 
      
      <main className="flex-1 ml-0 md:ml-64"> 
        <div className="lesson-content p-4 md:p-8 bg-gray-900 text-white rounded-lg shadow-xl">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              code: ({ inline, className, children, ...props }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) => {
                const match = /language-(\w+)/.exec(className || '');
                const lang = match ? match[1] : 'markup'; 

                return !inline ? (
                  <pre className="my-4 rounded-lg overflow-x-auto border border-gray-700 bg-[#1a1b26] p-4 text-sm">
                    <code className={`language-${lang}`} {...props}>
                      {String(children).replace(/\n$/, '')}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-gray-700 text-vibrant-teal px-1 py-0.5 rounded-md text-xs" {...props}>
                    {children}
                  </code>
                );
              },
              h1: ({ node, ...props }) => <h1 className="text-4xl md:text-5xl font-extrabold text-vibrant-teal mb-4 mt-8 drop-shadow-md" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-3xl font-bold text-white mb-3 mt-6 border-b border-gray-700 pb-2" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-2xl font-semibold text-vibrant-teal mb-2 mt-5" {...props} />,
              p: ({ node, ...props }) => <p className="text-lg text-gray-300 mb-4 leading-relaxed" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-bold text-vibrant-teal" {...props} />,
              a: ({ node, ...props }) => <a className="text-accent-purple hover:underline" {...props} />,
              table: ({ node, ...props }) => <table className="w-full text-left border-collapse my-6" {...props} />,
              th: ({ node, ...props }) => <th className="p-3 border-b-2 border-gray-600 text-white font-semibold bg-gray-700" {...props} />,
              td: ({ node, ...props }) => <td className="p-3 border-b border-gray-700 text-gray-300" {...props} />,
            }}
          >
            {LESSON_CONTENT}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}
