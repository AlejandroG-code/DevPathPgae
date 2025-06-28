/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-write-files/page.tsx
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
# C File Handling: Writing to Files

After opening a file, you can write data to it using various functions provided by '<stdio.h>'. The choice of function depends on the type of data you want to write (characters, strings, or formatted data).

## 1. Writing Characters: 'fputc()'

The 'fputc()' function writes a single character to a file.

**Syntax:**

\`\`\`c
int fputc(int character, FILE *stream);
\`\`\`

-   'character': The character to be written (passed as an 'int').
-   'stream': The 'FILE' pointer to the file.
Returns the character written on success, or 'EOF' on error.

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    fptr = fopen("char_output.txt", "w"); // Open for writing, creates/truncates

    if (fptr == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    fputc('H', fptr);
    fputc('e', fptr);
    fputc('l', fptr);
    fputc('l', fptr);
    fputc('o', fptr);
    fputc('\\n', fptr); // Write a newline character

    fclose(fptr);
    printf("Characters written to char_output.txt\\n");
    return 0;
}
\`\`\`

## 2. Writing Strings: 'fputs()'

The 'fputs()' function writes a string (character array) to a file. It does **not** automatically add a newline character.

**Syntax:**

\`\`\`c
int fputs(const char *str, FILE *stream);
\`\`\`

-   'str': The null-terminated string to be written.
-   'stream': The 'FILE' pointer to the file.
Returns a non-negative value on success, or 'EOF' on error.

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    fptr = fopen("string_output.txt", "w");

    if (fptr == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    fputs("This is the first line.\\n", fptr); // Remember to add \\n manually
    fputs("This is the second line.\\n", fptr);
    fputs("And a third line.", fptr);

    fclose(fptr);
    printf("Strings written to string_output.txt\\n");
    return 0;
}
\`\`\`

## 3. Writing Formatted Output: 'fprintf()'

The 'fprintf()' function is similar to 'printf()', but instead of writing to the console, it writes formatted output to a specified file. It supports format specifiers like '%d', '%f', '%s', etc.

**Syntax:**

\`\`\`c
int fprintf(FILE *stream, const char *format, ...);
\`\`\`

-   'stream': The 'FILE' pointer to the file.
-   'format': The format string, just like in 'printf()'.
-   '...': Variable number of arguments to be formatted.
Returns the number of characters written on success, or a negative value on error.

**Example:**

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    int age = 30;
    double height = 1.75;
    char name[] = "Alice";

    fptr = fopen("formatted_output.txt", "w");

    if (fptr == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    fprintf(fptr, "Name: %s\\n", name);
    fprintf(fptr, "Age: %d years old\\n", age);
    fprintf(fptr, "Height: %.2lf meters\\n", height);
    fprintf(fptr, "This is a number: %d and a float: %.1f\\n", 123, 45.6f);

    fclose(fptr);
    printf("Formatted data written to formatted_output.txt\\n");
    return 0;
}
\`\`\`

## Binary Mode Writing

Files can also be opened in binary mode ('wb', 'ab', 'w+b', etc.). In binary mode, data is written byte-for-byte without any character translations (like '\\n' to '\\r\\n' on Windows). This is crucial for non-textual data (images, executables). The 'fwrite()' function is commonly used for binary writing.

**Syntax for 'fwrite()':**

\`\`\`c
size_t fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream);
\`\`\`

-   'ptr': Pointer to the data to be written.
-   'size': Size of each data item in bytes.
-   'nmemb': Number of data items to write.
-   'stream': The 'FILE' pointer.
Returns the number of items successfully written.

**Example: Writing integers in binary mode**

\`\`\`c
#include <stdio.h>

int main() {
    FILE *fptr;
    int numbers[] = {10, 20, 30, 40, 50};
    int num_elements = sizeof(numbers) / sizeof(numbers[0]);

    fptr = fopen("binary_data.bin", "wb"); // 'wb' for write binary

    if (fptr == NULL) {
        printf("Error opening file!\\n");
        return 1;
    }

    // Write the entire array as a block of bytes
    fwrite(numbers, sizeof(int), num_elements, fptr);

    fclose(fptr);
    printf("Binary data written to binary_data.bin\\n");
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Important!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always check the return value of file writing functions and ensure 'fptr' is not 'NULL' after 'fopen()'. Errors can occur due to insufficient disk space, permission issues, or invalid file paths.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Choose the appropriate writing function ('fputc', 'fputs', 'fprintf', 'fwrite') based on the data type and format you need to store. Remember to close the file to ensure all buffered data is written to disk.
    </div>
</div>
`;

interface CWriteFilesPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function CWriteFilesPage({ params }: { params: { courseId: string; lessonId: string } }) {
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
          prevLesson="c-write-to-files"
          nextLesson="c-structures"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
