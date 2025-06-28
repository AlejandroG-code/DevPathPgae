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
# Python User Input

Getting input from the user is a common requirement in interactive programs. Python provides a built-in function, 'input()', to read a line of text from the console.

## The 'input()' Function

The 'input()' function prompts the user to enter something and reads their input as a string.

\`\`\`python
# Example 1: Basic input
# name = input("Enter your name: ")
# print(f"Hello, {name}!")

# Since we can't run interactive input here, we'll simulate it:
simulated_name = "Alice"
print(f"Hello, {simulated_name}!")
# Expected interactive output:
# Enter your name: Alice
# Hello, Alice!
\`\`\`

## 'input()' Always Returns a String

It's crucial to remember that the 'input()' function *always* returns a string, regardless of what the user types. If you expect numerical input (integers or floats), you must explicitly convert (cast) the string to the desired numeric type.

\`\`\`python
# Example 2: Inputting numbers (simulated)
# age_str = input("Enter your age: ")
simulated_age_str = "30" # User typed '30'

print(f"Type of simulated_age_str: {type(simulated_age_str)}")
# Output: Type of simulated_age_str: <class 'str'>

# Attempting arithmetic directly would cause a TypeError if not cast:
# print(simulated_age_str + 5) # This would try to concatenate '30' and 5, causing error
\`\`\`

## Casting User Input to Numbers

To use numerical input in calculations, cast the input string to an 'int' or 'float' using 'int()' or 'float()'.

\`\`\`python
# Example 3: Casting input to int (simulated)
# num_str = input("Enter a whole number: ")
simulated_num_str = "42"
num_int = int(simulated_num_str)
print(f"You entered: {num_int}, Type: {type(num_int)}")
print(f"Result of calculation: {num_int * 2}")
# Output:
# You entered: 42, Type: <class 'int'>
# Result of calculation: 84

# Example 4: Casting input to float (simulated)
# price_str = input("Enter a price (e.g., 19.99): ")
simulated_price_str = "99.95"
price_float = float(simulated_price_str)
print(f"Price: {price_float}, Type: {type(price_float)}")
print(f"Price with tax: {price_float * 1.05}")
# Output:
# Price: 99.95, Type: <class 'float'>
# Price with tax: 104.9475
\`\`\`

## Handling Input Errors (with 'try...except')

What if the user types something that cannot be converted to the expected type? For example, entering "abc" when an integer is expected. This would cause a 'ValueError'. It's good practice to use 'try...except' blocks to handle such potential errors gracefully.

\`\`\`python
# Example 5: Handling invalid numerical input (simulated)
# user_input = input("Enter a number: ")
simulated_bad_input = "hello"

try:
  number = int(simulated_bad_input)
  print(f"Valid number entered: {number}")
except ValueError:
  print(f"Error: '{simulated_bad_input}' is not a valid whole number.")
except Exception as e: # Catch any other unexpected errors
  print(f"An unexpected error occurred: {e}")
# Output: Error: 'hello' is not a valid whole number.

simulated_good_input = "123"
try:
  number = int(simulated_good_input)
  print(f"Valid number entered: {number}")
except ValueError:
  print(f"Error: '{simulated_good_input}' is not a valid whole number.")
# Output: Valid number entered: 123
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">InfoCard: Prompts and User Experience</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The string passed to 'input()' serves as a prompt for the user. Make your prompts clear and descriptive so the user knows what kind of input is expected. This improves the overall user experience of your command-line applications.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always assume user input might be incorrect or in an unexpected format. Validate and cast input carefully, and use 'try...except' blocks to handle errors gracefully, ensuring your program doesn't crash when faced with invalid data.
    </div>
</div>
`;

export default function PythonUserInputPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptPythonLang = document.createElement('script');
      scriptPythonLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js';
      scriptPythonLang.async = true;

      scriptPythonLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptPythonLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const pythonLangScript = document.querySelector('script[src*="prism-python.min.js"]');
      if (pythonLangScript && document.body.contains(pythonLangScript)) {
        document.body.removeChild(pythonLangScript);
      }
    };
  }, [LESSON_CONTENT]);

  const components: Components = {
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
          currentCourseId="python"
          prevLesson="python-try-except"
          nextLesson="python-string-formatting"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
