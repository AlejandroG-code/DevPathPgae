/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-unions/page.tsx
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
# C Unions

In C, a **union** is a special data type that allows different data types to be stored in the same memory location. It's similar to a structure, but with a key difference: **all members of a union share the same memory space**. This means that at any given time, a union can only hold a value of *one* of its members.

Unions are primarily used for memory management when you need to store different types of data in the same variable at different times, but you only need one of those types to be active at any given moment.

## Declaring a Union

You declare a union using the 'union' keyword, followed by a tag (the name of the union) and a list of members (variables) enclosed in curly braces.

**Syntax:**

\`\`\`c
union unionName {
    dataType member1;
    dataType member2;
    // ...
}; // Don't forget the semicolon!
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

// Declare a union named 'Data'
union Data {
    int i;
    float f;
    char str[20];
}; // Semicolon is essential here
\`\`\`

## Memory Allocation in Unions

The compiler allocates memory for a union based on the **largest member** of the union. All other members then share this same memory location.

**Example:**

\`\`\`c
#include <stdio.h>

union TestUnion {
    int intValue;
    float floatValue;
    char charValue;
};

int main() {
    union TestUnion tu;

    printf("Size of int: %zu bytes\\n", sizeof(tu.intValue));
    printf("Size of float: %zu bytes\\n", sizeof(tu.floatValue));
    printf("Size of char: %zu bytes\\n", sizeof(tu.charValue));
    printf("Size of union TestUnion: %zu bytes\\n", sizeof(tu));
    // Output will likely be 4 bytes (size of int/float, assuming char is 1 byte)
    // The union's size is determined by the largest member.
    return 0;
}
\`\`\`

## Accessing Union Members

You access individual members of a union variable using the **dot operator** ('.'), just like with structures. However, you must be careful: if you write to one member and then try to read from another, the data might be corrupted or misinterpreted, as they share the same memory.

**Example: Using a Union**

\`\`\`c
#include <stdio.h>
#include <string.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    union Data data; // Declare a union variable

    // 1. Store an integer
    data.i = 10;
    printf("data.i (after assigning int): %d\\n", data.i);
    // At this point, data.f and data.str contain garbage values (or bits representing 10)

    // 2. Store a float (this overwrites the integer data)
    data.f = 22.5f;
    printf("data.f (after assigning float): %f\\n", data.f);
    // Now, data.i and data.str contain garbage values (or bits representing 22.5f)
    printf("data.i (after assigning float, incorrect read): %d\\n", data.i); // Will print garbage

    // 3. Store a string (this overwrites the float data)
    strcpy(data.str, "C Programming");
    printf("data.str (after assigning string): %s\\n", data.str);
    // Now, data.i and data.f contain garbage values (or bits representing "C Programming")
    printf("data.f (after assigning string, incorrect read): %f\\n", data.f); // Will print garbage

    return 0;
}
\`\`\`

**Output will vary for garbage values, but principle remains:**

\`\`\`
data.i (after assigning int): 10
data.f (after assigning float): 22.500000
data.i (after assigning float, incorrect read): 1075055616
data.str (after assigning string): C Programming
data.f (after assigning string, incorrect read): 1009139265886561000000000000000000.000000 // Large garbage float
\`\`\`

## Difference between Structures and Unions

| Feature       | Structure ('struct')                            | Union ('union')                                    |
| :------------ | :---------------------------------------------- | :------------------------------------------------- |
| **Memory** | Each member gets its own separate memory space. | All members share the same memory space.           |
| **Size** | Sum of sizes of all its members (plus padding). | Size of its largest member.                        |
| **Usage** | Use when you need to store *all* members simultaneously. | Use when you need to store *one* member at a time. |
| **Access** | All members can be accessed at any time.        | Only the last assigned member can be accessed reliably. |

## Use Cases for Unions

Unions are less common than structures but have specific use cases:

1.  **Memory Optimization:** When memory is very limited, and you know that only one type of data will be active at a time.
2.  **Type Punning:** (Advanced/Dangerous) Treating the same memory location as different data types. For example, interpreting the raw bytes of an integer as a float. This is often non-portable and undefined behavior if not done carefully.
3.  **Variant Records (with an 'enum'):** Often combined with an 'enum' type in a structure to indicate which member of the union is currently valid. This creates a "tagged union" or "variant," a safer way to use unions.

**Example of a Tagged Union (Variant):**

\`\`\`c
#include <stdio.h>
#include <string.h>

// Define an enum to tag the type of data stored in the union
enum Type { INT_TYPE, FLOAT_TYPE, STRING_TYPE };

// Define a structure that contains both the type tag and the union
struct Value {
    enum Type type;
    union { // Anonymous union (members can be accessed directly)
        int i;
        float f;
        char str[50];
    } data; // Named union can also be used: union Data data;
};

void printValue(struct Value v) {
    switch (v.type) {
        case INT_TYPE:
            printf("Integer Value: %d\\n", v.data.i);
            break;
        case FLOAT_TYPE:
            printf("Float Value: %f\\n", v.data.f);
            break;
        case STRING_TYPE:
            printf("String Value: %s\\n", v.data.str);
            break;
        default:
            printf("Unknown Type\\n");
            break;
    }
}

int main() {
    struct Value val1;
    val1.type = INT_TYPE;
    val1.data.i = 123;
    printValue(val1);

    struct Value val2;
    val2.type = FLOAT_TYPE;
    val2.data.f = 98.76f;
    printValue(val2);

    struct Value val3;
    val3.type = STRING_TYPE;
    strcpy(val3.data.str, "Hello Union");
    printValue(val3);

    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be extremely careful when using unions, especially if you don't use a type tag. Incorrectly reading from a union member that was not the last one written to is a common source of bugs and **undefined behavior**. Always ensure you know which member is currently active.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Unions are a memory-efficient tool in C, best used when you have mutually exclusive data types that need to occupy the same memory space. Combine them with an enumeration for safer and more robust "variant" data types.
    </div>
</div>
`;

interface CUnionsPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function CUnionsPage({ params }: { params: { courseId: string; lessonId: string } }) {
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
          prevLesson="c-structures"
          nextLesson="c-enums"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
