/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-structures/page.tsx
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
## C Structures (structs)

In C, a **structure** (often referred to as a "struct") is a user-defined data type that allows you to combine items of different data types under a single name. Structs are useful for representing a record, where each piece of data belongs to a single entity (e.g., a student record with name, ID, and grade).

### Declaring a Structure

You declare a structure using the 'struct' keyword, followed by a tag (the structure's name) and a list of members (variables) enclosed in curly braces.

\`\`\`c
struct structureName {
    dataType member1;
    dataType member2;
    // ...
}; // Don't forget the semicolon!
\`\`\`

**Example: Declaring a 'Person' structure**

\`\`\`c
struct Person {
    char name[50];
    int age;
    float height;
}; // Semicolon is essential here!
\`\`\`
This declaration defines a new data type called 'struct Person', but it does not allocate any memory for it yet.

### Creating Structure Variables

Once a structure is declared, you can create variables of that structure type.

\`\`\`c
#include <stdio.h>
#include <string.h> // For strcpy

struct Person {
    char name[50];
    int age;
    float height;
};

int main() {
    // Creating a structure variable
    struct Person person1; 

    // Accessing and assigning values to members using the dot (.) operator
    strcpy(person1.name, "Alice"); // For strings, use strcpy
    person1.age = 30;
    person1.height = 1.65;

    // Accessing and printing values
    printf("Person Name: %s\\n", person1.name);
    printf("Person Age: %d\\n", person1.age);
    printf("Person Height: %.2f\\n", person1.height);

    return 0;
}
\`\`\`

### Initializing Structures

You can initialize structure members during declaration, similar to arrays:

\`\`\`c
struct Person person2 = {"Bob", 25, 1.80};
\`\`\`

Or using designated initializers (since C99), which can be more readable:

\`\`\`c
struct Person person3 = {.name = "Charlie", .age = 22, .height = 1.78};
\`\`\`

### Structures as Function Arguments

You can pass structures to functions. By default, structures are passed by value (a copy is made). For efficiency, especially with large structures, they are often passed by reference using pointers.

**Passing by Value:**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Point {
    int x;
    int y;
};

// Function that takes a Point struct by value
void displayPoint(struct Point p) {
    printf("Point coordinates (inside function): (%d, %d)\\n", p.x, p.y);
    p.x = 100; // This modification will NOT affect the original struct
}

int main() {
    struct Point myPoint = {10, 20};
    printf("Original Point: (%d, %d)\\n", myPoint.x, myPoint.y); // Output: (10, 20)
    
    displayPoint(myPoint); // Pass a copy
    
    printf("After function call (original): (%d, %d)\\n", myPoint.x, myPoint.y); // Output: (10, 20)
    return 0;
}
\`\`\`

**Passing by Reference (using Pointers to Structures):**

When passing a pointer to a structure, you use the arrow operator ('->') to access its members.

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Point {
    int x;
    int y;
};

// Function that takes a pointer to a Point struct
void modifyPoint(struct Point *pPtr) {
    // Use -> (arrow operator) to access members via a pointer
    pPtr->x = 50; 
    pPtr->y = 60;
    printf("Modified Point (inside function): (%d, %d)\\n", pPtr->x, pPtr->y);
}

int main() {
    struct Point myPoint = {10, 20};
    printf("Original Point: (%d, %d)\\n", myPoint.x, myPoint.y); // Output: (10, 20)
    
    modifyPoint(&myPoint); // Pass the address of myPoint
    
    printf("After function call (original): (%d, %d)\\n", myPoint.x, myPoint.y); // Output: (50, 60)
    return 0;
}
\`\`\`

### Nested Structures

Structures can also contain other structures as members.

\`\`\`c
struct Address {
    char street[50];
    int houseNumber;
};

struct Employee {
    char name[50];
    int id;
    struct Address homeAddress; // Nested structure
};

int main() {
    struct Employee emp1;
    strcpy(emp1.name, "Jane Doe");
    emp1.id = 101;
    strcpy(emp1.homeAddress.street, "Main St"); // Access nested member
    emp1.homeAddress.houseNumber = 123;
    // ...
    return 0;
}
\`\`\`

Structures are a powerful way to represent complex real-world entities in C programs, grouping related data into a single, manageable unit.
`;

export default function CStructuresPage() {
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
