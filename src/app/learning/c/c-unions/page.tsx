/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-unions/page.tsx
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
## C Unions

In C, a **union** is a special data type that allows you to store different data types in the same memory location. This means a union can hold *only one* of its members at any given time. Unions are useful when you want to use the same memory area for different types of data, typically to save memory.

### Declaring a Union

You declare a union using the 'union' keyword, followed by a tag (the union's name) and a list of members (variables) enclosed in curly braces.

\`\`\`c
union unionName {
    dataType member1;
    dataType member2;
    // ...
}; // Don't forget the semicolon!
\`\`\`

**Key difference from Structs:** While a 'struct' allocates enough memory to hold *all* of its members simultaneously, a 'union' allocates memory only for its *largest* member. All members share this same memory location.

### Example: 'Data' Union

\`\`\`c
#include <stdio.h>
#include <string.h>

union Data {
    int i;
    float f;
    char str[20];
}; // Semicolon is essential here!

int main() {
    union Data data; // Declare a union variable

    // Assigning a value to 'i'
    data.i = 10;
    printf("data.i: %d\\n", data.i); // Output: data.i: 10
    // If you try to access data.f or data.str now, their values will be corrupted.

    // Assigning a value to 'f' (overwrites 'i')
    data.f = 22.5;
    printf("data.f: %.1f\\n", data.f); // Output: data.f: 22.5
    // data.i is now corrupted because it's sharing the same memory.
    // printf("data.i (after f): %d\\n", data.i); // Will print garbage

    // Assigning a value to 'str' (overwrites 'f')
    strcpy(data.str, "C Programming");
    printf("data.str: %s\\n", data.str); // Output: data.str: C Programming
    // data.f and data.i are now corrupted.

    // To demonstrate memory sharing, access members after the *last* assignment
    // Only the LAST assigned member's value is valid.
    printf("\\nDemonstrating memory sharing:\\n");
    data.i = 100;
    printf("After assigning data.i = 100:\\n");
    printf("data.i: %d\\n", data.i);
    // printf("data.f: %.1f\\n", data.f); // Will likely be garbage
    // printf("data.str: %s\\n", data.str); // Will likely be garbage

    return 0;
}
\`\`\`

### Memory Allocation in Unions

The memory allocated for a union is equal to the size of its largest member.

\`\`\`c
#include <stdio.h>

union TestUnion {
    int a;    // Typically 4 bytes
    float b;  // Typically 4 bytes
    char c;   // Typically 1 byte
    double d; // Typically 8 bytes (largest member)
};

int main() {
    printf("Size of TestUnion: %zu bytes\\n", sizeof(union TestUnion));
    // Output will likely be 8 bytes (the size of 'double d')
    return 0;
}
\`\`\`

### When to Use Unions

Unions are less commonly used than structures but can be valuable in specific scenarios:

* **Memory Optimization:** When you have a variable that can hold different types of data at different times, but you only need one of them at any given moment, a union can save memory. This is particularly useful in embedded systems or low-memory environments.
* **Type Punning:** To interpret the same memory block as different data types. This is an advanced technique and can be dangerous if not handled carefully, as it bypasses C's type safety.
* **Variant Records:** When you have a data structure that can represent different "variants" of data, often managed by a "tag" field (e.g., in a structure containing the union).

\`\`\`c
#include <stdio.h>
#include <string.h>

enum Type { INT_TYPE, FLOAT_TYPE, STRING_TYPE };

struct Value {
    enum Type type; // Tag to indicate which member of the union is currently active
    union {
        int i_val;
        float f_val;
        char s_val[50];
    } data; // Anonymous union (or named, like 'u')
};

int main() {
    struct Value val1;
    val1.type = INT_TYPE;
    val1.data.i_val = 123;
    printf("Value 1: %d (Type: %d)\\n", val1.data.i_val, val1.type);

    struct Value val2;
    val2.type = STRING_TYPE;
    strcpy(val2.data.s_val, "Hello Union");
    printf("Value 2: %s (Type: %d)\\n", val2.data.s_val, val2.type);

    return 0;
}
\`\`\`
This pattern is often called a **tagged union** or **variant record**, providing a safer way to use unions by explicitly tracking the active member.

Unions provide a low-level way to manage memory by allowing multiple members to share the same storage space. Use them carefully, keeping in mind that only one member's value is valid at any given time.
`;

export default function CUnionsPage({ params }: LessonPageProps) {
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
