/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-write-to-files/page.tsx
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
## C Write To Files

After opening a file in a write or append mode ('"w"', '"a"', '"w+"', '"a+"'), you can write data to it using various functions provided by the C standard library. The most common functions for writing are 'fprintf()', 'fputs()', and 'fputc()'.

### 1. 'fprintf()' (Formatted File Output)

The 'fprintf()' function is similar to 'printf()', but instead of printing to the console, it writes formatted output to a specified file.

\`\`\`c
int fprintf(FILE *fptr, const char *format, ...);
\`\`\`

* 'fptr': The file pointer of the opened file.
* 'format': The format string (similar to 'printf()') with format specifiers.
* '...': Optional arguments to be inserted into the format string.
* Returns the number of characters written on success, or a negative value on error.

**Example: Writing Text and Variables to a File**

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    int age = 30;
    float height = 1.75;

    // Open file in write mode ('w') - creates or overwrites "data.txt"
    fptr = fopen("data.txt", "w"); 

    if (fptr == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    fprintf(fptr, "Name: Alice\\n");
    fprintf(fptr, "Age: %d\\n", age);
    fprintf(fptr, "Height: %.2f meters\\n", height);

    printf("Data written to data.txt successfully.\\n");

    fclose(fptr);
    return 0;
}
\`\`\`
After running this program, a file named 'data.txt' will be created (or overwritten) with the following content:
\`\`\`
Name: Alice
Age: 30
Height: 1.75 meters
\`\`\`

### 2. 'fputs()' (Write String to File)

The 'fputs()' function writes a string (null-terminated character array) to a specified file. It does **not** automatically add a newline character.

\`\`\`c
int fputs(const char *str, FILE *fptr);
\`\`\`

* 'str': The string to be written.
* 'fptr': The file pointer of the opened file.
* Returns a non-negative value on success, or EOF on error.

**Example: Writing Lines of Text**

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    char line1[] = "This is the first line.\\n";
    char line2[] = "This is the second line.\\n";

    fptr = fopen("log.txt", "w"); // Overwrite or create log.txt

    if (fptr == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    fputs(line1, fptr);
    fputs(line2, fptr);

    printf("Lines written to log.txt successfully.\\n");

    fclose(fptr);
    return 0;
}
\`\`\`

### 3. 'fputc()' (Write Character to File)

The 'fputc()' function writes a single character to a specified file.

\`\`\`c
int fputc(int character, FILE *fptr);
\`\`\`

* 'character': The character to be written (passed as an 'int').
* 'fptr': The file pointer of the opened file.
* Returns the character written on success, or EOF on error.

**Example: Writing Characters One by One**

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    char text[] = "Hello";
    int i = 0;

    fptr = fopen("output.txt", "w");

    if (fptr == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    while (text[i] != '\\0') { // Loop until the null terminator
        fputc(text[i], fptr);
        i++;
    }
    fputc('\\n', fptr); // Add a newline at the end

    printf("Characters written to output.txt successfully.\\n");

    fclose(fptr);
    return 0;
}
\`\`\`

### Appending to a File ('"a"' mode)

To add new content to the end of an existing file without deleting its current content, open the file in **append mode ('"a"')**.

\`\`\`c
#include <stdio.h>
#include <time.h> // For time and localtime
#include <string.h> // For strcat

int main() {
    FILE *fptr;
    
    // Open file in append mode ('a') - creates if not exists, appends if exists
    fptr = fopen("activity_log.txt", "a");

    if (fptr == NULL) {
        printf("Error opening file for appending!\\n");
        return 1;
    }

    // Get current time
    time_t rawtime;
    struct tm *info;
    char buffer[80];
    time(&rawtime);
    info = localtime(&rawtime);
    strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", info);

    fprintf(fptr, "[%s] User logged in.\\n", buffer); // Append new entry with timestamp

    printf("New log entry appended to activity_log.txt.\\n");

    fclose(fptr);
    return 0;
}
\`\`\`

When performing file write operations, always remember to check if 'fopen()' returned 'NULL' for error handling, and crucially, always call 'fclose()' when you are done to ensure data is saved and resources are released.
`;

export default function CWriteToFilesPage() {
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
