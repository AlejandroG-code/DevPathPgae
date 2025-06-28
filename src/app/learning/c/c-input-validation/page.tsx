// src/app/learning/c/c-input-validation/page.tsx
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
# C Input Validation

Input validation is the process of ensuring that user input or data from external sources (like files or network streams) conforms to expected formats, types, and ranges before it is processed by the program. It's a critical security and robustness measure. Failing to validate input can lead to:

-   **Program Crashes:** Due to unexpected data types or out-of-bounds access.
-   **Security Vulnerabilities:** Such as buffer overflows, SQL injection (if interacting with databases), or command injection.
-   **Incorrect Logic:** If the program operates on invalid data, its computations will be wrong.

## Common Input Validation Techniques

1.  **Checking Return Values of Input Functions:** Functions like 'scanf()' return the number of successful conversions. This is a basic but important check.
2.  **Using 'fgets()' for String Input:** Prefer 'fgets()' over 'scanf("%s", ...)' to prevent buffer overflows, as 'fgets()' allows you to specify a maximum buffer size.
3.  **Clearing Input Buffer:** After reading numeric or single-character input with 'scanf()', leftover newline characters in the input buffer can affect subsequent reads. Clearing the buffer prevents this.
4.  **Checking Numeric Ranges:** Ensuring that numeric input falls within acceptable minimum and maximum values.
5.  **Character-by-Character Validation:** For more complex string formats (e.g., email addresses, specific codes), you might read input character by character or use functions from '<ctype.h>'.

## 1. Checking 'scanf()' Return Value

'scanf()' returns the number of items successfully read and assigned. If it returns fewer than expected, or 'EOF', an error occurred.

\`\`\`c
#include <stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    
    // Attempt to read an integer
    if (scanf("%d", &age) == 1) { // Check if 1 item was successfully read
        printf("You entered age: %d\\n", age);
    } else {
        printf("Invalid input. Please enter a number.\\n");
        // Crucial: Clear the buffer if input was invalid to prevent infinite loops
        while (getchar() != '\\n'); 
    }

    // Example of another read after potential invalid input
    int score;
    printf("Enter your score: ");
    if (scanf("%d", &score) == 1) {
        printf("You entered score: %d\\n", score);
    } else {
        printf("Invalid score input.\\n");
    }

    return 0;
}
\`\`\`

## 2. Using 'fgets()' for Safer String Input

As discussed in 'C User Input', 'fgets()' is safer for strings because it takes the buffer size.

\`\`\`c
#include <stdio.h>
#include <string.h> // For strcspn()

int main() {
    char name[50];
    printf("Enter your full name: ");

    // Read input using fgets, limit to sizeof(name) - 1 characters
    if (fgets(name, sizeof(name), stdin) != NULL) {
        // Remove trailing newline if present
        name[strcspn(name, "\\n")] = 0;
        printf("Hello, %s!\\n", name);
    } else {
        printf("Error reading name.\\n");
    }

    // You can also check if the input was too long (buffer overflow attempt)
    // If name[strlen(name) - 1] != '\n' && name has no null terminator (until it's added by fgets)
    // and there are still chars in stdin, then the input was truncated.
    return 0;
}
\`\`\`

## 3. Clearing Input Buffer

When 'scanf()' fails or leaves characters like newline in the buffer, subsequent input operations might behave unexpectedly.

\`\`\`c
#include <stdio.h>

// Function to clear input buffer
void clearInputBuffer() {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main() {
    int num1, num2;

    printf("Enter first number: ");
    while (scanf("%d", &num1) != 1) {
        printf("Invalid input. Please enter a number: ");
        clearInputBuffer(); // Clear buffer on invalid input
    }
    clearInputBuffer(); // Clear leftover newline after valid input

    printf("Enter second number: ");
    while (scanf("%d", &num2) != 1) {
        printf("Invalid input. Please enter a number: ");
        clearInputBuffer(); // Clear buffer on invalid input
    }
    clearInputBuffer(); // Clear leftover newline after valid input

    printf("Sum: %d\\n", num1 + num2);
    return 0;
}
\`\`\`

## 4. Checking Numeric Ranges

After successfully reading numeric input, ensure it falls within an expected range.

\`\`\`c
#include <stdio.h>

int main() {
    int score;
    int validInput = 0;

    do {
        printf("Enter score (0-100): ");
        if (scanf("%d", &score) == 1) {
            if (score >= 0 && score <= 100) {
                validInput = 1; // Input is valid
            } else {
                printf("Score out of range (0-100).\\n");
                clearInputBuffer(); // Clear buffer for next attempt
            }
        } else {
            printf("Invalid input. Please enter a number.\\n");
            clearInputBuffer(); // Clear buffer for next attempt
        }
    } while (!validInput);

    printf("Valid score entered: %d\\n", score);
    return 0;
}

void clearInputBuffer() {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}
\`\`\`

## 5. Using '<ctype.h>' for Character Validation

The '<ctype.h>' header provides functions to check character properties (e.g., is it a digit, is it alphabetic, is it whitespace).

\`\`\`c
#include <stdio.h>
#include <ctype.h> // For isdigit(), isalpha(), etc.
#include <string.h> // For strlen()

int main() {
    char password[20];
    int hasDigit = 0;
    int hasAlpha = 0;

    printf("Enter a password (must contain at least one digit and one letter): ");
    if (fgets(password, sizeof(password), stdin) != NULL) {
        password[strcspn(password, "\\n")] = 0; // Remove newline

        for (int i = 0; i < strlen(password); i++) {
            if (isdigit(password[i])) {
                hasDigit = 1;
            }
            if (isalpha(password[i])) {
                hasAlpha = 1;
            }
        }

        if (hasDigit && hasAlpha) {
            printf("Password is valid!\\n");
        } else {
            printf("Password must contain at least one digit and one letter.\\n");
        }
    } else {
        printf("Error reading password.\\n");
    }

    return 0;
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Important!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Never trust user input implicitly. Always validate it thoroughly to protect your program from crashes, incorrect behavior, and security exploits. Combine multiple validation techniques for robust applications.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Input validation is a cornerstone of secure and reliable software. Develop a habit of validating all external inputs to ensure your program always operates on clean and expected data.
    </div>
</div>
`;


export default function CInputValidationPage() {

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
          prevLesson="c-error-handling"
          nextLesson="c-macros"
          backToContentPath={`/learning/c`}
        />
      </main>
    </div>
  );
}
