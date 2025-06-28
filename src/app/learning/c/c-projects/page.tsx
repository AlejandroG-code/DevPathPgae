/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-projects/page.tsx
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
# C Projects: Structuring and Building

As your C programs grow beyond a single, simple source file, proper project structuring and build management become essential. This lesson provides an overview of how to organize larger C projects, compile multiple source files, and use a basic 'Makefile' for automation.

## Why Structure Projects?

-   **Modularity:** Breaking down a large program into smaller, logical units (functions, files) improves organization.
-   **Reusability:** Functions and data structures can be shared across different parts of the project or even different projects.
-   **Maintainability:** Easier to understand, debug, and update specific parts of the code without affecting others.
-   **Collaboration:** Multiple developers can work on different files simultaneously.

## Basic Project Structure

A typical C project might have the following directory structure:

\`\`\`
my_project/
├── src/            # Source files (.c)
│   ├── main.c
│   ├── calculator.c
│   └── utils.c
├── include/        # Header files (.h)
│   ├── calculator.h
│   └── utils.h
├── build/          # Compiled object files (.o) and executable
└── Makefile        # Build instructions
\`\`\`

-   **'src/'**: Contains the implementation of your functions and the 'main' function.
-   **'include/'**: Contains header files ('.h'), which typically hold function prototypes, structure definitions, and macro definitions. These are included by source files that need to use the declarations.
-   **'build/'**: A common practice to store intermediate object files ('.o') and the final executable.
-   **'Makefile'**: A file that automates the compilation process.

## Multi-File Compilation

When you have multiple source files, you need to compile them separately into object files ('.o') and then link these object files together to create the final executable.

### Example Scenario: A Simple Calculator

Let's imagine a calculator project with:
-   'main.c': Contains the main logic.
-   'calculator.c': Contains functions like 'add', 'subtract'.
-   'calculator.h': Contains prototypes for 'add', 'subtract'.

**'include/calculator.h'**:

\`\`\`c
#ifndef CALCULATOR_H
#define CALCULATOR_H

// Function prototypes
int add(int a, int b);
int subtract(int a, int b);

#endif // CALCULATOR_H
\`\`\`

**'src/calculator.c'**:

\`\`\`c
#include "calculator.h" // Include its own header file
#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int subtract(int a, int b) {
    return a - b;
}
\`\`\`

**'src/main.c'**:

\`\`\`c
#include <stdio.h>
#include "calculator.h" // Include the calculator functions declarations

int main() {
    int x = 10, y = 5;
    printf("Sum: %d\\n", add(x, y));
    printf("Difference: %d\\n", subtract(x, y));
    return 0;
}
\`\`\`

### Manual Compilation Steps:

From the 'my_project/' directory:

1.  **Compile source files into object files:**
    The '-c' flag tells 'gcc' to compile the source file into an object file ('.o') without linking.
    The '-I include' flag tells 'gcc' to look for header files in the 'include/' directory.

    \`\`\`bash
    gcc -c src/main.c -o build/main.o -I include
    gcc -c src/calculator.c -o build/calculator.o -I include
    \`\`\`

2.  **Link object files into an executable:**
    Now, link the generated object files together.

    \`\`\`bash
    gcc build/main.o build/calculator.o -o build/my_calculator_app
    \`\`\`

3.  **Run the executable:**

    \`\`\`bash
    ./build/my_calculator_app
    \`\`\`

## Using a 'Makefile' for Automation

Manually typing compilation commands can be tedious and error-prone for larger projects. A 'Makefile' (used with the 'make' utility) automates this process.

Create a file named 'Makefile' in the 'my_project/' directory:

**'Makefile'**:

\`\`\`makefile
# Define variables
CC = gcc                     # C Compiler
CFLAGS = -Wall -Iinclude     # Compiler flags: -Wall (all warnings), -I (include path)
BUILD_DIR = build            # Directory for object files and executable
SRC_DIR = src                # Directory for source files

# Define source and object files
SRCS = $(wildcard $(SRC_DIR)/*.c)  # Find all .c files in src/
OBJS = $(patsubst $(SRC_DIR)/%.c,$(BUILD_DIR)/%.o,$(SRCS)) # Convert .c paths to .o paths

TARGET = $(BUILD_DIR)/my_calculator_app # Final executable name

# Default target: builds the application
all: $(TARGET)

# Rule to create the build directory if it doesn't exist
$(BUILD_DIR):
	@mkdir -p $(BUILD_DIR)

# Rule to link object files into the executable
$(TARGET): $(OBJS) $(BUILD_DIR)
	$(CC) $(OBJS) -o $(TARGET)

# Rule to compile each .c file into a .o file
# $<: the first prerequisite (e.g., src/main.c)
# $@: the target (e.g., build/main.o)
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.c | $(BUILD_DIR)
	$(CC) $(CFLAGS) -c $< -o $@

# Clean target: removes compiled files
clean:
	@rm -f $(BUILD_DIR)/*.o $(TARGET)
	@rmdir $(BUILD_DIR) 2>/dev/null || true # Remove dir, suppress error if not empty
\`\`\`

### Using the Makefile:

From the 'my_project/' directory:

-   To compile the project:
    \`\`\`bash
    make
    \`\`\`
-   To clean up compiled files:
    \`\`\`bash
    make clean
    \`\`\`

This 'Makefile' provides a robust way to manage your C project compilation, automatically handling dependencies (e.g., recompiling a '.c' file only if it or its included '.h' files have changed).

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For any C project beyond a single source file, adopt a structured directory layout and use a build automation tool like 'make' with a 'Makefile'. This significantly streamlines the development process, improves collaboration, and makes your projects more professional and manageable.
    </div>
</div>
`;

interface CProjectsPageProps {
  params: {
    courseId: string;
    lessonId: string;
  };
}

export default function CProjectsPage({ params }: { params: { courseId: string; lessonId: string } }) {
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
          prevLesson="c-macros"
          nextLesson=""
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
