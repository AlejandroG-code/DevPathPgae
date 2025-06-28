// src/app/learning/c/c-structures/page.tsx
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
# C Structures

In C, a **structure** (or 'struct') is a user-defined data type that allows you to combine items of different data types into a single, named unit. Structures are useful for creating complex data types that represent real-world entities, such as a record for a student, a book, or a car, where each entity has multiple attributes of varying types.

## Declaring a Structure

You declare a structure using the 'struct' keyword, followed by a tag (the name of the structure) and a list of members (variables) enclosed in curly braces.

**Syntax:**

\`\`\`c
struct structureName {
    dataType member1;
    dataType member2;
    // ...
}; // Don't forget the semicolon!
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>

// Declare a structure named 'Student'
struct Student {
    char name[50];
    int rollNumber;
    float marks;
}; // Semicolon is essential here
\`\`\`

## Defining Structure Variables

Once a structure is declared, you can define variables of that structure type.

### 1. During declaration:

\`\`\`c
struct Student {
    char name[50];
    int rollNumber;
    float marks;
} student1, student2; // student1 and student2 are variables of type Student
\`\`\`

### 2. After declaration:

\`\`\`c
struct Student {
    char name[50];
    int rollNumber;
    float marks;
};

int main() {
    struct Student student1; // Declare a variable 'student1' of type 'struct Student'
    struct Student student2;
    return 0;
}
\`\`\`

## Accessing Structure Members

You access individual members of a structure variable using the **dot operator** ('.').

**Syntax:**

\`\`\`c
structureVariable.memberName
\`\`\`

**Example: Initializing and accessing structure members**

\`\`\`c
#include <stdio.h>
#include <string.h> // For strcpy()

// Declare a structure named 'Book'
struct Book {
    char title[100];
    char author[50];
    int publicationYear;
    float price;
};

int main() {
    // Declare a variable of type 'struct Book'
    struct Book book1;

    // Initialize members of book1
    strcpy(book1.title, "The C Programming Language");
    strcpy(book1.author, "Dennis Ritchie");
    book1.publicationYear = 1978;
    book1.price = 25.99;

    // Access and print members of book1
    printf("Book Title: %s\\n", book1.title);
    printf("Author: %s\\n", book1.author);
    printf("Publication Year: %d\\n", book1.publicationYear);
    printf("Price: $%.2f\\n", book1.price);

    // Another way to initialize (C99 onwards, or compiler specific)
    struct Book book2 = {"Learn C in 24 Hours", "John Doe", 2020, 19.95};
    printf("\\nBook Title: %s\\n", book2.title);
    printf("Author: %s\\n", book2.author);

    return 0;
}
\`\`\`

## Structures and Pointers

You can also use pointers to structures. When you have a pointer to a structure, you use the **arrow operator** ('->') to access its members.

**Syntax:**

\`\`\`c
pointerToStructure->memberName
\`\`\`

**Example:**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p1 = {10, 20};
    struct Point *ptrP1; // Declare a pointer to a struct Point

    ptrP1 = &p1; // Assign the address of p1 to the pointer

    printf("Using dot operator: p1.x = %d, p1.y = %d\\n", p1.x, p1.y);

    // Access members using arrow operator through the pointer
    printf("Using arrow operator: ptrP1->x = %d, ptrP1->y = %d\\n", ptrP1->x, ptrP1->y);

    // Modify members through the pointer
    ptrP1->x = 100;
    ptrP1->y = 200;
    printf("Modified p1.x = %d, p1.y = %d\\n", p1.x, p1.y);

    return 0;
}
\`\`\`

## Nested Structures

Structures can contain other structures as members. This is called nesting structures.

**Example:**

\`\`\`c
#include <stdio.h>
#include <string.h>

struct Date {
    int day;
    int month;
    int year;
};

struct Employee {
    char name[50];
    int employeeId;
    struct Date dob; // Nested structure: Date of Birth
};

int main() {
    struct Employee emp1;

    strcpy(emp1.name, "Jane Smith");
    emp1.employeeId = 1001;
    emp1.dob.day = 15;
    emp1.dob.month = 8;
    emp1.dob.year = 1990;

    printf("Employee Name: %s\\n", emp1.name);
    printf("Employee ID: %d\\n", emp1.employeeId);
    printf("Date of Birth: %d/%d/%d\\n", emp1.dob.day, emp1.dob.month, emp1.dob.year);

    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Structures are powerful for grouping related data of different types into a single logical unit. They are fundamental for creating complex data representations in C and form the basis for concepts like Object-Oriented Programming (when used with functions acting on structs).
    </div>
</div>
`;


export default function CStructuresPage({ }: { params: { courseId: string; lessonId: string } }) {

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
          prevLesson="c-read-files"
          nextLesson="c-unions"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
