/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-enums/page.tsx
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
## C Enumerations (Enums)

In C, an **enumeration** (or "enum") is a user-defined data type that consists of a set of named integer constants. Enums are primarily used to assign names to integer values, making a program easier to read and maintain by using meaningful labels instead of "magic numbers."

### Declaring an Enum

You declare an enum using the 'enum' keyword, followed by an optional tag (the enum's name) and a list of enumerators (the named constants) enclosed in curly braces.

\`\`\`c
enum enumName {
    CONSTANT1,
    CONSTANT2,
    // ...
}; // Don't forget the semicolon!
\`\`\`

By default, the first enumerator is assigned the value 0, the second 1, and so on.

**Example: Days of the Week**

\`\`\`c
#include <stdio.h>

// Declare an enum for days of the week
enum Weekday {
    MONDAY,    // Default value: 0
    TUESDAY,   // Default value: 1
    WEDNESDAY, // Default value: 2
    THURSDAY,  // Default value: 3
    FRIDAY,    // Default value: 4
    SATURDAY,  // Default value: 5
    SUNDAY     // Default value: 6
}; // Semicolon is essential here!

int main() {
    enum Weekday today = WEDNESDAY; // Declare an enum variable and assign a value

    printf("Today is day number: %d\\n", today); // Output: Today is day number: 2

    if (today == WEDNESDAY) {
        printf("It's hump day!\\n");
    }
    return 0;
}
\`\`\`

### Assigning Custom Values to Enums

You can explicitly assign integer values to enumerators. If you assign a value to one enumerator, subsequent enumerators will automatically increment from that value.

\`\`\`c
#include <stdio.h>

enum Level {
    LOW = 1,    // Value: 1
    MEDIUM = 5,   // Value: 5
    HIGH = 10,   // Value: 10
    CRITICAL // Value: 11 (auto-increments from HIGH)
};

int main() {
    enum Level currentLevel = MEDIUM;
    printf("Current level: %d\\n", currentLevel); // Output: Current level: 5
    printf("Critical level: %d\\n", CRITICAL);   // Output: Critical level: 11
    return 0;
}
\`\`\`

### Benefits of Using Enums

* **Readability:** Makes your code more readable and self-documenting. 'MONDAY' is clearer than '0' for a day of the week.
* **Maintainability:** If you need to change the underlying integer values, you only change them in one place (the enum definition), and all references to the enumerators will automatically update.
* **Type Safety (to an extent):** While enumerators are integers, using an enum type can sometimes help the compiler catch errors where you might accidentally assign an invalid integer to a variable that is meant to hold one of the enum's specific values (though C's type checking for enums isn't as strict as in some other languages).

### Enum with 'typedef' (Common Practice)

Often, 'typedef' is used with enums to create an alias for the 'enum' type, making it easier to declare variables without repeating the 'enum' keyword.

\`\`\`c
#include <stdio.h>

// Define an enum for boolean values using typedef
typedef enum {
    FALSE = 0,
    TRUE = 1
} boolean; // 'boolean' is now an alias for this enum type

int main() {
    boolean isValid = TRUE;
    printf("Is valid? %d\\n", isValid); // Output: Is valid? 1

    if (isValid == TRUE) {
        printf("The condition is true.\\n");
    }
    return 0;
}
\`\`\`

Enums are a valuable feature in C for defining a set of related constant values, improving code clarity, and reducing the likelihood of errors caused by using raw integer values.
`;

export default function CEnumsPage() {
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
