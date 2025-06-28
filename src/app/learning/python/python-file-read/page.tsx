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
# Python File Read

Reading from files is a common task in Python, allowing your programs to process data stored in external files. The 'open()' function with 'r' (read) mode is used for this.

## Reading the Entire File ('read()')

The 'read()' method reads the entire content of the file as a single string.

\`\`\`python
# To make this example runnable, let's assume 'demofile.txt' exists with some content.
# Example content for demofile.txt:
# Hello! Welcome to demofile.txt
# This file is for testing purposes.
# Good Luck!

try:
    with open("demofile.txt", "r", encoding="utf-8") as f:
        content = f.read()
        print("Content of demofile.txt:")
        print(content)
except FileNotFoundError:
    print("Error: 'demofile.txt' not found. Please create it with some content.")
except Exception as e:
    print(f"An error occurred: {e}")
\`\`\`
**Expected Output (if 'demofile.txt' exists):**
<pre>
<code class="language-text">
Content of demofile.txt:
Hello! Welcome to demofile.txt
This file is for testing purposes.
Good Luck!
</code>
</pre>

### Reading Only Parts of the File

You can specify the number of characters to read by passing a number to the 'read()' method.

\`\`\`python
# Reads the first 5 characters
# with open("demofile.txt", "r", encoding="utf-8") as f:
#   content_part = f.read(5)
#   print(content_part) # Output: Hello
\`\`\`

## Reading Lines ('readline()' and Looping)

### Reading One Line ('readline()')

The 'readline()' method reads one line from the file. Each subsequent call to 'readline()' will read the next line.

\`\`\`python
# with open("demofile.txt", "r", encoding="utf-8") as f:
#   line1 = f.readline()
#   line2 = f.readline()
#   print(f"Line 1: {line1.strip()}") # Use .strip() to remove trailing newline
#   print(f"Line 2: {line2.strip()}")
# Output:
# Line 1: Hello! Welcome to demofile.txt
# Line 2: This file is for testing purposes.
\`\`\`

### Looping Through Lines

You can loop through the file object itself to read line by line. This is memory-efficient for large files as it reads one line at a time.

\`\`\`python
print("\nReading file line by line:")
try:
    with open("demofile.txt", "r", encoding="utf-8") as f:
        for line in f:
            print(line.strip()) # .strip() removes newline characters from end of line
except FileNotFoundError:
    print("Error: 'demofile.txt' not found.")
\`\`\`
**Expected Output:**
<pre>
<code class="language-text">
Reading file line by line:
Hello! Welcome to demofile.txt
This file is for testing purposes.
Good Luck!
</code>
</pre>

## Reading All Lines into a List ('readlines()')

The 'readlines()' method reads all lines from the file and returns them as a list of strings, where each string is a line from the file (including the newline character).

\`\`\`python
# with open("demofile.txt", "r", encoding="utf-8") as f:
#   all_lines = f.readlines()
#   print("All lines as a list:")
#   print(all_lines)
# Output:
# All lines as a list:
# ['Hello! Welcome to demofile.txt\\n', 'This file is for testing purposes.\\n', 'Good Luck!']
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Large Files with 'read()' or 'readlines()'</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be cautious when using 'f.read()' or 'f.readlines()' on very large files. These methods load the entire file content into memory, which can lead to 'MemoryError' for extremely large files. For processing large files, it's generally better to iterate line by line using a 'for' loop on the file object.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always use the 'with' statement for file reading to ensure the file is closed automatically. Choose the appropriate reading method: 'read()' for small files, 'readline()' for line-by-line processing when you need precise control, and iterating over the file object for memory-efficient line-by-line reading of large files.
    </div>
</div>
`;

export default function PythonFileReadPage() {
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
          prevLesson="python-file-write"
          nextLesson="python-file-delete"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
