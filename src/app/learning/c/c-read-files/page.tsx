/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-read-files/page.tsx
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
## C Read Files

Reading data from files is a common operation in C programs, allowing you to process existing information, load configurations, or retrieve stored data. The C standard library provides functions in '<stdio.h>' for reading from files.

Before reading, ensure the file exists and is opened in a read mode (e.g., '"r"', '"r+"').

### 1. 'fscanf()' (Formatted File Input)

The 'fscanf()' function is similar to 'scanf()', but it reads formatted input from a specified file instead of the console.

\`\`\`c
int fscanf(FILE *fptr, const char *format, ...);
\`\`\`

* 'fptr': The file pointer of the opened file.
* 'format': The format string (similar to 'scanf()') with format specifiers.
* '...': Pointers to variables where the read data will be stored.
* Returns the number of input items successfully matched and assigned, or 'EOF' if an input failure occurs before any data could be read.

**Example: Reading formatted data from a file**

Assume 'numbers.txt' contains:
\`\`\`
10 20.5 A
\`\`\`

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    int num;
    float value;
    char character;

    fptr = fopen("numbers.txt", "r"); // Open file in read mode

    if (fptr == NULL) {
        printf("Error: Could not open numbers.txt\\n");
        return 1;
    }

    // Read an integer, a float, and a character
    fscanf(fptr, "%d %f %c", &num, &value, &character);

    printf("Read from file: Integer=%d, Float=%.1f, Char=%c\\n", num, value, character);

    fclose(fptr);
    return 0;
}
\`\`\`
**Output (assuming numbers.txt exists with content "10 20.5 A"):**
\`\`\`
Read from file: Integer=10, Float=20.5, Char=A
\`\`\`

### 2. 'fgets()' (Read String/Line from File)

The 'fgets()' function reads a line of text (or up to a specified number of characters) from a file. It is generally safer than 'gets()' because it prevents buffer overflows.

\`\`\`c
char *fgets(char *str, int n, FILE *fptr);
\`\`\`

* 'str': A pointer to a character array where the read string will be stored.
* 'n': The maximum number of characters to read (including the null terminator). 'fgets()' stops reading after 'n-1' characters or a newline, or EOF, whichever comes first.
* 'fptr': The file pointer of the opened file.
* Returns 'str' on success, or 'NULL' on error or when end-of-file is reached.

**Example: Reading line by line**

Assume 'quotes.txt' contains:
\`\`\`
Hello world!
C programming is fun.
\`\`\`

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    char line[100]; // Buffer to store each line

    fptr = fopen("quotes.txt", "r");

    if (fptr == NULL) {
        printf("Error: Could not open quotes.txt\\n");
        return 1;
    }

    printf("Reading from quotes.txt:\\n");
    while (fgets(line, sizeof(line), fptr) != NULL) {
        printf("%s", line); // Print the line (fgets includes newline)
    }

    fclose(fptr);
    return 0;
}
\`\`\`
**Output (assuming quotes.txt exists):**
\`\`\`
Reading from quotes.txt:
Hello world!
C programming is fun.
\`\`\`

### 3. 'fgetc()' (Read Character by Character)

The 'fgetc()' function reads a single character from a file.

\`\`\`c
int fgetc(FILE *fptr);
\`\`\`

* 'fptr': The file pointer of the opened file.
* Returns the character read (as an 'int'), or 'EOF' if the end of the file is reached or an error occurs.

**Example: Reading character by character**

Assume 'message.txt' contains:
\`\`\`
ABC
\`\`\`

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    char ch;

    fptr = fopen("message.txt", "r");

    if (fptr == NULL) {
        printf("Error: Could not open message.txt\\n");
        return 1;
    }

    printf("Reading character by character:\\n");
    while ((ch = fgetc(fptr)) != EOF) { // Read until end of file
        printf("%c", ch);
    }
    printf("\\nEnd of file reached.\\n");

    fclose(fptr);
    return 0;
}
\`\`\`
**Output (assuming message.txt exists):**
\`\`\`
Reading character by character:
ABC
End of file reached.
\`\`\`

Reading files is a critical skill for developing C applications that interact with persistent storage. Always remember to open files in the correct mode and close them when you are done.
`;

export default function CReadFilesPage({ params }: LessonPageProps) {
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
