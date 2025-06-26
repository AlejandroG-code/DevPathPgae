/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-error-handling/page.tsx
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
## C Error Handling

Error handling in C involves anticipating, detecting, and responding to unexpected or erroneous conditions that may occur during program execution. Unlike languages with built-in exception handling (like Java or C++), C primarily relies on return codes, global variables ('errno'), and 'stderr' for error reporting.

### 1. Using Return Values

Many standard library functions in C return special values (like 'NULL', 'EOF', 0, or -1) to indicate success or failure. This is the most common way to handle errors in C.

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For EXIT_FAILURE

int main() {
    FILE *fptr;
    const char *filename = "non_existent_file.txt";

    // Attempt to open a file that doesn't exist in read mode
    fptr = fopen(filename, "r");

    // Check the return value
    if (fptr == NULL) {
        printf("Error: Failed to open '%s'. The file might not exist or permissions are incorrect.\\n", filename);
        return EXIT_FAILURE; // A standard way to indicate program failure
    }

    printf("File '%s' opened successfully.\\n", filename);
    fclose(fptr);
    return 0; // Indicate successful execution
}
\`\`\`

### 2. Using Global Variable 'errno'

The global variable 'errno' (defined in '<errno.h>') is set by many library functions when an error occurs during a system call. Its value indicates the type of error. The 'strerror()' function (also from '<string.h>') can convert an 'errno' value into a human-readable string.

\`\`\`c
#include <stdio.h>
#include <errno.h>    // For errno
#include <string.h>   // For strerror
#include <stdlib.h>   // For EXIT_FAILURE

int main() {
    FILE *fptr;
    const char *filename = "/non/existent/path/file.txt"; // Invalid path

    fptr = fopen(filename, "w"); // Try to write to an invalid path

    if (fptr == NULL) {
        // Print the system error message using strerror(errno)
        printf("Error opening file '%s': %s\\n", filename, strerror(errno));
        // Common errno messages:
        // ENOENT (No such file or directory) if a path component is missing.
        // EACCES (Permission denied) if you lack write permissions.
        return EXIT_FAILURE;
    }

    printf("File opened successfully.\\n");
    fclose(fptr);
    return 0;
}
\`\`\`

### 3. Using 'perror()'

The 'perror()' function (from '<stdio.h>') is a simpler way to print an error message based on the current value of 'errno'. It outputs the string you provide, followed by a colon, a space, and then the system's error message corresponding to 'errno'.

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For EXIT_FAILURE

int main() {
    FILE *fptr;
    const char *filename = "/invalid/directory/test.txt";

    fptr = fopen(filename, "w");

    if (fptr == NULL) {
        perror("Error creating file"); // Prints "Error creating file: [System error message]"
        return EXIT_FAILURE;
    }

    printf("File created successfully.\\n");
    fclose(fptr);
    return 0;
}
\`\`\`

### 4. Custom Error Handling and 'exit()'

For more complex applications, you might define your own error codes or functions to handle errors consistently. The 'exit()' function (from '<stdlib.h>') is used to terminate the program immediately, returning an exit status to the operating system. 'EXIT_SUCCESS' (0) and 'EXIT_FAILURE' (non-zero) are common macros for this.

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For exit()

// Custom error handling function
void handleError(int errorCode, const char *message) {
    fprintf(stderr, "Error %d: %s\\n", errorCode, message); // Print to standard error stream
    exit(errorCode); // Terminate program with error code
}

int divide(int a, int b) {
    if (b == 0) {
        handleError(101, "Division by zero is not allowed.");
    }
    return a / b;
}

int main() {
    printf("Result 1: %d\\n", divide(10, 2));
    printf("Result 2: %d\\n", divide(10, 0)); // This will call handleError and exit
    printf("This line will not be executed.\\n");
    return 0;
}
\`\`\`
Printing error messages to 'stderr' (standard error stream) using 'fprintf(stderr, ...)' is good practice, as 'stderr' is usually reserved for error messages and is not typically redirected like 'stdout'.

Effective error handling is crucial for writing robust and reliable C programs that can gracefully manage unexpected situations.
`;

export default function CErrorHandlingPage({ params }: LessonPageProps) {
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
