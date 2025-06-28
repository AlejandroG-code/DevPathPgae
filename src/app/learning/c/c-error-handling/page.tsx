/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-error-handling/page.tsx
'use client'; 

import React, { useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useParams } from 'next/navigation';

import LessonNavigationButtons from '@/app/_components/LessonNavigationButtons';

declare global {
  interface Window {
    Prism?: {
      highlightAll: () => void;
    };
  }
}

interface LessonMetadata {
  id: string;
  title: string;
  description: string;
}

const LESSON_CONTENT = `
# C Error Handling

While the previous lesson discussed different types of errors, this lesson focuses on **how to handle errors** gracefully in your C programs. Proper error handling ensures your program behaves predictably, especially when unexpected situations arise, such as failed file operations or invalid user input.

## Strategies for Error Handling

1.  **Checking Return Values:** Many standard library functions (like 'malloc()', 'fopen()', 'scanf()') return specific values (e.g., 'NULL', 'EOF', number of items read) to indicate success or failure. Always check these return values.
2.  **Using 'errno' and 'perror()':** The C standard library provides a global variable 'errno' and a function 'perror()' (from '<stdio.h>') to get more detailed information about the last error that occurred.
3.  **Exiting with Status Codes:** Programs can exit with a status code ('0' for success, non-zero for error) using 'exit()' (from '<stdlib.h>') or by returning from 'main()'.
4.  **Custom Error Messages:** Providing informative error messages to the user or to logs.

## 1. Checking Return Values

This is the most fundamental form of error handling.

**Example: 'fopen()' and 'malloc()'**

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For malloc, exit

int main() {
    FILE *filePtr;
    int *dynamicArray;
    int size = 10;

    // Attempt to open a file for reading
    filePtr = fopen("non_existent_file.txt", "r");
    if (filePtr == NULL) {
        printf("Error: Failed to open file. Exiting.\\n");
        return 1; // Indicate error
    }
    printf("File opened successfully.\\n");
    fclose(filePtr); // Close if successful

    // Attempt to allocate memory
    dynamicArray = (int *) malloc(size * sizeof(int));
    if (dynamicArray == NULL) {
        printf("Error: Memory allocation failed. Exiting.\\n");
        return 2; // Indicate error
    }
    printf("Memory allocated successfully.\\n");

    // Use allocated memory (e.g., initialize)
    for (int i = 0; i < size; i++) {
        dynamicArray[i] = i * 2;
    }
    printf("First element: %d\\n", dynamicArray[0]);

    free(dynamicArray); // Free memory when done
    dynamicArray = NULL;

    return 0; // Indicate success
}
\`\`\`

## 2. Using 'errno' and 'perror()'

When a standard library function fails, it often sets the global integer variable 'errno' to an error code. You can then use 'perror()' to print a descriptive error message corresponding to 'errno'. You need to include '<errno.h>'.

**Example:**

\`\`\`c
#include <stdio.h>  // For perror, fopen
#include <stdlib.h> // For exit
#include <errno.h>  // For errno

int main() {
    FILE *fptr;

    // Try to open a file with an invalid mode (or path)
    // Forcing an error by trying to open a non-existent file for reading
    fptr = fopen("non_existent_file_for_errno.txt", "r");

    if (fptr == NULL) {
        // perror() prints a string provided by you, followed by ': ' and then
        // a system-specific error message corresponding to the current errno value.
        perror("Error opening file"); 
        // Example output: Error opening file: No such file or directory

        // You can also print errno directly and use strerror for the message
        printf("errno value: %d\\n", errno); // Will be a specific integer code
        // #include <string.h> for strerror
        // printf("Error message: %s\\n", strerror(errno)); 
        
        return 1; // Indicate error
    }

    printf("File opened successfully.\\n");
    fclose(fptr);
    return 0;
}
\`\`\`

## 3. Exiting with Status Codes

The 'main' function typically returns '0' for successful execution and a non-zero integer for an error. You can use 'exit()' from '<stdlib.h>' to terminate the program immediately from any function.

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For exit

void riskyOperation(int value) {
    if (value == 0) {
        printf("Error: Value cannot be zero in riskyOperation.\\n");
        exit(EXIT_FAILURE); // Terminate with a failure status
    }
    printf("Risky operation completed with value: %d\\n", value);
}

int main() {
    printf("Starting program.\\n");
    riskyOperation(10);
    riskyOperation(0); // This will cause the program to exit
    printf("Program finished normally (this won't be printed if riskyOperation(0) is called).\\n");
    return 0; // EXIT_SUCCESS is equivalent to 0
}
\`\`\`
'EXIT_SUCCESS' and 'EXIT_FAILURE' are macros defined in '<stdlib.h>' for standard success (0) and failure (non-zero) return codes.

## 4. Custom Error Messages and Functions

For more complex error handling, you might create your own error codes or functions.

\`\`\`c
#include <stdio.h>
#include <stdlib.h> // For exit

// Define custom error codes (often using enums for readability)
typedef enum {
    SUCCESS = 0,
    ERROR_INVALID_INPUT = 1,
    ERROR_FILE_NOT_FOUND = 2,
    ERROR_MEMORY_ALLOCATION = 3
} ErrorCode;

// A function that might return an error code
ErrorCode processData(int *data, int count) {
    if (data == NULL) {
        return ERROR_INVALID_INPUT;
    }
    if (count <= 0) {
        return ERROR_INVALID_INPUT;
    }
    // Simulate a successful process
    // ... actual data processing ...
    return SUCCESS;
}

int main() {
    int myData[] = {1, 2, 3};
    ErrorCode result = processData(myData, 3);

    if (result != SUCCESS) {
        printf("An error occurred: ");
        switch (result) {
            case ERROR_INVALID_INPUT:
                printf("Invalid input provided.\\n");
                break;
            case ERROR_FILE_NOT_FOUND:
                printf("Required file not found.\\n");
                break;
            case ERROR_MEMORY_ALLOCATION:
                printf("Failed to allocate memory.\\n");
                break;
            default:
                printf("Unknown error.\\n");
                break;
        }
        return (int)result; // Exit with the custom error code
    }

    printf("Data processed successfully.\\n");
    return SUCCESS;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Important!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Never ignore error conditions in your C programs. Unhandled errors can lead to crashes, unexpected behavior, and security vulnerabilities. Always check return values, use 'perror()' for system errors, and design your program to handle failures gracefully.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Effective error handling is a hallmark of robust and reliable C code. Prioritize identifying potential failure points and implementing clear mechanisms to report and respond to those failures.
    </div>
</div>
`;

interface CErrorHandlingPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function CErrorHandlingPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const { courseId, lessonId } = params;

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
          prevLesson="c-errors"
          nextLesson="c-input-validation"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
