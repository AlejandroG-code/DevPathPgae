/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-user-input/page.tsx
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
# C User Input

While the 'scanf()' function is a common way to get input in C, it has limitations, especially when dealing with strings that contain spaces. This lesson will expand on user input, focusing on 'fgets()' for safer string input and understanding the input buffer.

## Problems with 'scanf()' for Strings

As noted previously, 'scanf("%s", ...)' reads input until it encounters whitespace. This means it can only read single words, not entire lines of text.

\`\`\`c
#include <stdio.h>

int main() {
    char firstName[20];
    char lastName[20];

    printf("Enter your first name: ");
    scanf("%s", firstName); // Reads "John"

    printf("Enter your last name: ");
    scanf("%s", lastName); // Reads "Doe"

    printf("Hello, %s %s!\\n", firstName, lastName);
    // If user enters "John Doe" for first name, scanf reads "John"
    // and " Doe" is left in the buffer. The next scanf reads "Doe" automatically.
    return 0;
}
\`\`\`

## Using 'fgets()' for Reading Lines

The 'fgets()' function is a safer and more versatile way to read an entire line of text, including spaces, from the input stream. It's preferred over 'scanf()' for string input because it helps prevent buffer overflows.

**Syntax:**

\`\`\`c
char *fgets(char *str, int n, FILE *stream);
\`\`\`

-   'str': Pointer to a character array (where the string will be stored).
-   'n': The maximum number of characters to read (including the null terminator). 'fgets()' will read at most 'n-1' characters.
-   'stream': The input stream to read from (e.g., 'stdin' for standard input/keyboard).

'fgets()' reads characters from the stream until 'n-1' characters have been read, a newline character ('\\n') is encountered, or the end-of-file is reached. It includes the newline character if read.

**Example: Reading an entire line with 'fgets()**

\`\`\`c
#include <stdio.h>

int main() {
    char fullName[50];

    printf("Enter your full name: ");
    fgets(fullName, sizeof(fullName), stdin); // Reads up to 49 chars or until newline

    printf("Your full name is: %s", fullName); // Prints the name, including the newline
    return 0;
}
\`\`\`

**Output Example:**

\`\`\`
Enter your full name: John Doe
Your full name is: John Doe
\`\`\`

Notice the extra newline in the output. This is because 'fgets()' includes the newline character if it's present in the input.

### Removing the Trailing Newline from 'fgets()'

Often, you'll want to remove the newline character captured by 'fgets()'. You can do this by finding its position and replacing it with a null terminator.

\`\`\`c
#include <stdio.h>
#include <string.h> // Required for strlen() and strcspn()

int main() {
    char fullName[50];

    printf("Enter your full name: ");
    fgets(fullName, sizeof(fullName), stdin);

    // Find the position of the newline character
    // strcspn returns the index of the first occurrence of a character from the second string in the first string.
    // If '\\n' is found, it returns its index. If not, it returns the length of the string.
    fullName[strcspn(fullName, "\\n")] = 0; // Replace newline with null terminator

    printf("Your full name is: %s (newline removed)\\n", fullName);
    return 0;
}
\`\`\`

## Clearing the Input Buffer

A common issue in C input is when a leftover newline character in the input buffer affects subsequent 'scanf()' or 'getchar()' calls. For instance, if you read an integer with 'scanf("%d", ...)', the newline character entered by the user (when they press Enter) remains in the buffer. A subsequent 'getchar()' or 'scanf("%c", ...)' without a leading space will immediately read this leftover newline.

To clear the input buffer, you can read and discard characters until a newline or EOF is found.

\`\`\`c
#include <stdio.h>

void clearInputBuffer() {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main() {
    int age;
    char initial;

    printf("Enter your age: ");
    scanf("%d", &age); // Reads age, '\\n' remains in buffer
    
    clearInputBuffer(); // Clears the leftover '\\n'

    printf("Enter your initial: ");
    scanf(" %c", &initial); // Space before %c also consumes whitespace, but clearing is safer generally

    printf("Age: %d, Initial: %c\\n", age, initial);
    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For robust user input, especially for full lines of text, prefer 'fgets()' over 'scanf("%s", ...)'. Always remember to handle the trailing newline from 'fgets()' and be aware of clearing the input buffer for mixed input types.
    </div>
</div>
`;

interface CUserInputPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function CUserInputPage({ params }: { params: { courseId: string; lessonId: string } }) {
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
    scriptCore.async = true; // Make it async to not block rendering

    scriptCore.onload = () => {
      // Load C language component after core is loaded
      const scriptCLang = document.createElement('script');
      scriptCLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
      scriptCLang.async = true; // Make it async

      scriptCLang.onload = () => {
        // Highlight all code blocks after C language component is loaded
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptCLang);
    };
    document.body.appendChild(scriptCore);

    // Cleanup function: remove the scripts and link when the component unmounts
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
      const lang = match ? match[1] : 'markup'; // Default to 'markup' if no language is specified
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
          prevLesson="c-strings"
          nextLesson="c-memory-address"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
