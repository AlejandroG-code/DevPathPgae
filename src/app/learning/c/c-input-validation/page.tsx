/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/learning/c/c-input-validation/page.tsx
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
## C Input Validation

Input validation is the process of ensuring that user input meets specific criteria before it is processed by the program. It's a critical aspect of writing robust and secure C applications, as invalid input can lead to bugs, crashes, security vulnerabilities (like buffer overflows), or incorrect program behavior.

### Why Validate Input?

* **Prevent Crashes:** Incorrect data types (e.g., entering text where a number is expected) can cause 'scanf()' to fail or lead to undefined behavior.
* **Security:** Malicious input can exploit vulnerabilities (e.g., buffer overflows if string input exceeds buffer size).
* **Correctness:** Ensure that the data adheres to logical rules (e.g., age cannot be negative, grades must be within a certain range).
* **User Experience:** Provide clear feedback to the user about what kind of input is expected.

### Common Input Validation Scenarios

#### 1. Validating Numeric Input

When reading numbers, 'scanf()' returns the number of items successfully read. You can check this return value to ensure a number was actually entered.

\`\`\`c
#include <stdio.h>

int main() {
    int age;
    int input_status;

    do {
        printf("Enter your age (a positive number): ");
        input_status = scanf("%d", &age); // scanf returns 1 if successful, 0 if no match, EOF on error

        // Check if input was not an integer OR if the number is not positive
        if (input_status != 1 || age <= 0) {
            printf("Invalid input. Please enter a positive integer.\\n");
            // Clear input buffer: Discard remaining characters (e.g., "abc\n")
            while (getchar() != '\\n'); 
        }
    } while (input_status != 1 || age <= 0); // Loop until valid input is received

    printf("Your age is: %d\\n", age);
    return 0;
}
\`\`\`

**Explanation:**
* 'scanf("%d", &age)': Tries to read an integer.
* 'input_status != 1': Checks if 'scanf' failed to read an integer (e.g., user typed "hello").
* 'age <= 0': Checks for the logical validity of the number itself (age must be positive).
* 'while (getchar() != '\\n');': This loop clears the input buffer. If the user types "abc\n", 'scanf' reads "a" (fails), but "bc\n" remains. 'getchar()' reads characters one by one until a newline is found, discarding the invalid input.

#### 2. Validating String Length

When using 'scanf("%s", ...)' for strings, it's unsafe because it doesn't check buffer size, leading to buffer overflows if input is too long. 'fgets()' is safer as it limits the number of characters read.

\`\`\`c
#include <stdio.h>
#include <string.h> // For strlen()

int main() {
    char username[15]; // Max 14 characters + null terminator
    int max_len = sizeof(username) - 1; // Max characters we want to allow

    printf("Enter username (max %d chars): ", max_len);
    fgets(username, sizeof(username), stdin);

    // Remove newline character if fgets included it
    // Check if a newline exists and replace it with null terminator
    username[strcspn(username, "\\n")] = 0; 

    // Validate length
    if (strlen(username) == 0) {
        printf("Username cannot be empty.\\n");
    } else if (strlen(username) > max_len) {
        printf("Username too long. Max %d characters allowed.\\n", max_len);
    } else {
        printf("Welcome, %s!\\n", username);
    }
    return 0;
}
\`\`\`
**Explanation:**
* 'fgets(username, sizeof(username), stdin)': Reads up to 'sizeof(username)-1' characters or until newline/EOF.
* 'username[strcspn(username, "\\n")] = 0;': A common idiom to remove the trailing newline added by 'fgets()'. 'strcspn' finds the first occurrence of '\n' (or any char in the second arg) and returns its index. We then place '\0' there.

#### 3. Validating Character Input

\`\`\`c
#include <stdio.h>
#include <ctype.h> // For isalpha, isdigit, etc.

int main() {
    char choice;

    do {
        printf("Enter 'Y' or 'N': ");
        // Use a space before %c to consume any leftover newline characters from previous inputs
        scanf(" %c", &choice); 

        // Convert to uppercase for case-insensitive comparison
        choice = toupper(choice); 

        if (choice != 'Y' && choice != 'N') {
            printf("Invalid choice. Please enter 'Y' or 'N'.\\n");
            while (getchar() != '\\n'); // Clear buffer
        }
    } while (choice != 'Y' && choice != 'N');

    printf("You chose: %c\\n", choice);
    return 0;
}
\`\`\`
**Explanation:**
* 'scanf(" %c", &choice)': The space before '%c' is important. It tells 'scanf' to skip any whitespace characters (including newlines) left in the input buffer from a previous input operation.
* 'toupper(choice)': Converts the character to uppercase for easier comparison, making 'y' and 'Y' (and 'n' and 'N') valid.

Input validation is a fundamental security and robustness practice. Always assume user input is hostile and validate it thoroughly before use.
`;

export default function CInputValidationPage({ params }: LessonPageProps) {
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
