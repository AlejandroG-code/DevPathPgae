// src/app/learning/c/c-enums/page.tsx
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
# C Enumerations (Enums)

In C, an **enumeration** (or 'enum') is a user-defined data type that consists of a set of named integer constants. Enums are used to assign names to integral values, making a program easier to read and maintain, as well as preventing errors by limiting the range of possible values a variable can take.

## Declaring an Enumeration

You declare an enumeration using the 'enum' keyword, followed by an optional tag (the name of the enum type) and a list of enumerators (the named constants) enclosed in curly braces.

**Syntax:**

\`\`\`c
enum enumName {
    CONSTANT1,
    CONSTANT2,
    // ...
    CONSTANTN
}; // Don't forget the semicolon!
\`\`\`

By default, the first enumerator is assigned the value 0, the second 1, and so on.

**Example:**

\`\`\`c
#include <stdio.h>

// Declare an enumeration named 'Day'
enum Day {
    SUNDAY,    // Automatically assigned 0
    MONDAY,    // Automatically assigned 1
    TUESDAY,   // Automatically assigned 2
    WEDNESDAY, // Automatically assigned 3
    THURSDAY,  // Automatically assigned 4
    FRIDAY,    // Automatically assigned 5
    SATURDAY   // Automatically assigned 6
}; // Semicolon is essential here
\`\`\`

## Assigning Specific Values to Enumerators

You can explicitly assign integer values to enumerators. If you assign a value to an enumerator, subsequent enumerators without explicit assignments will continue from that value.

**Example:**

\`\`\`c
#include <stdio.h>

enum Season {
    SPRING = 1, // SPRING is 1
    SUMMER,     // SUMMER is 2
    AUTUMN = 5, // AUTUMN is 5
    WINTER      // WINTER is 6
};

int main() {
    printf("SPRING: %d\\n", SPRING);
    printf("SUMMER: %d\\n", SUMMER);
    printf("AUTUMN: %d\\n", AUTUMN);
    printf("WINTER: %d\\n", WINTER);
    return 0;
}
\`\`\`

**Output:**

\`\`\`
SPRING: 1
SUMMER: 2
AUTUMN: 5
WINTER: 6
\`\`\`

## Using Enum Variables

You can declare variables of an enumerated type and assign them any of the enumerator values. Internally, these variables store the integer value associated with the enumerator.

**Example:**

\`\`\`c
#include <stdio.h>

enum TrafficLight {
    RED,
    YELLOW,
    GREEN
};

int main() {
    enum TrafficLight currentLight = GREEN; // Declare and initialize an enum variable

    if (currentLight == GREEN) {
        printf("Go!\\n");
    } else if (currentLight == YELLOW) {
        printf("Prepare to stop!\\n");
    } else if (currentLight == RED) {
        printf("Stop!\\n");
    }

    printf("The value of RED is: %d\\n", RED);       // Output: 0
    printf("The value of YELLOW is: %d\\n", YELLOW); // Output: 1
    printf("The value of GREEN is: %d\\n", GREEN);   // Output: 2

    return 0;
}
\`\`\`

## Type-Aliasing Enums with 'typedef'

Similar to structures, you can use 'typedef' with enums to create a new alias for the enum type, making the code cleaner by omitting the 'enum' keyword when declaring variables.

**Example:**

\`\`\`c
#include <stdio.h>

typedef enum { // Anonymous enum
    LOW,
    MEDIUM,
    HIGH
} Priority; // 'Priority' is now an alias for this enum type

int main() {
    Priority taskPriority = MEDIUM;

    switch (taskPriority) {
        case LOW:
            printf("Low priority task.\\n");
            break;
        case MEDIUM:
            printf("Medium priority task.\\n");
            break;
        case HIGH:
            printf("High priority task.\\n");
            break;
        default:
            printf("Unknown priority.\\n");
            break;
    }
    return 0;
}
\`\`\`

## Why Use Enums?

-   **Readability:** Using named constants like 'RED', 'YELLOW', 'GREEN' is much more readable than using raw integer values like 0, 1, 2.
-   **Maintainability:** If the underlying integer values need to change, you only change the enum definition, not every place where the value is used.
-   **Self-Documenting Code:** Enums make the intent of your code clearer.
-   **Error Prevention:** They help prevent assigning invalid or out-of-range values to variables that are logically restricted to a specific set of options.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Enums are excellent for representing a fixed set of named integer values, improving code readability, maintainability, and reducing the likelihood of errors by providing a clear set of options.
    </div>
</div>
`;


export default function CEnumsPage({ }: { params: { courseId: string; lessonId: string } }) {

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
          prevLesson="c-unions"
          nextLesson="c-memory-management"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
