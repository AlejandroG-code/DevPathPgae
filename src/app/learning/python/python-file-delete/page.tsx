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
# Python File Delete

Being able to delete files and directories is an important aspect of file management in Python. The 'os' module in Python provides functions for interacting with the operating system, including file system operations.

## Deleting a File ('os.remove()')

To remove (delete) a file, use the 'os.remove()' function.

\`\`\`python
import os

# To demonstrate, let's assume 'demofile.txt' exists.
# You might want to create a dummy file first to test this.
# Example: Create a dummy file named 'demofile.txt'
# with open("demofile.txt", "w") as f:
#    f.write("This file will be deleted.")

# Attempt to delete the file
try:
    if os.path.exists("demofile.txt"):
        os.remove("demofile.txt")
        print("File 'demofile.txt' deleted successfully.")
    else:
        print("File 'demofile.txt' does not exist.")
except PermissionError:
    print("Permission denied: Cannot delete 'demofile.txt'.")
except OSError as e:
    print(f"Error deleting file: {e}")
\`\`\`

## Checking if File Exists ('os.path.exists()')

It's good practice to check if a file exists before attempting to delete it, to prevent a 'FileNotFoundError'.

\`\`\`python
import os

# Check if 'nonexistent_file.txt' exists
if os.path.exists("nonexistent_file.txt"):
    os.remove("nonexistent_file.txt")
    print("Nonexistent file deleted.")
else:
    print("Nonexistent file does not exist, so cannot delete.")
# Output: Nonexistent file does not exist, so cannot delete.
\`\`\`

## Deleting Folders/Directories ('os.rmdir()')

To delete an empty folder (directory), use the 'os.rmdir()' method. This method will only delete empty directories. If the directory is not empty, it will raise an 'OSError'.

\`\`\`python
import os

# To demonstrate, let's assume 'myfolder' exists and is empty.
# You might want to create a dummy empty folder first.
# os.makedirs("myfolder", exist_ok=True) # Create an empty folder

# Attempt to delete the empty folder
try:
    if os.path.exists("myfolder") and os.path.isdir("myfolder"):
        os.rmdir("myfolder")
        print("Folder 'myfolder' deleted successfully.")
    else:
        print("Folder 'myfolder' does not exist or is not a directory.")
except OSError as e:
    print(f"Error deleting folder 'myfolder': {e}")
    print("Make sure the folder is empty if you're using os.rmdir().")
\`\`\`
**Example Output if folder is not empty:**
<pre>
<code class="language-text">
Error deleting folder 'myfolder': [WinError 145] The directory is not empty: 'myfolder'
Make sure the folder is empty if you're using os.rmdir().
</code>
</pre>

## Deleting Non-Empty Folders ('shutil.rmtree()')

If you need to delete a non-empty directory and its contents, you should use the 'shutil.rmtree()' function from the 'shutil' module. Use this with extreme caution as it will permanently delete the directory and all its contents without warning!

\`\`\`python
import shutil
import os

# Create a dummy folder with a file inside for demonstration
# os.makedirs("my_non_empty_folder", exist_ok=True)
# with open("my_non_empty_folder/test.txt", "w") as f:
#     f.write("Some content.")

# Attempt to delete the non-empty folder
try:
    if os.path.exists("my_non_empty_folder") and os.path.isdir("my_non_empty_folder"):
        shutil.rmtree("my_non_empty_folder")
        print("Folder 'my_non_empty_folder' and its contents deleted successfully.")
    else:
        print("Folder 'my_non_empty_folder' does not exist or is not a directory.")
except OSError as e:
    print(f"Error deleting folder: {e}")
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Irreversible Deletion</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        File and folder deletion operations are generally **irreversible**. Always double-check your file paths and logic before executing deletion commands, especially with 'shutil.rmtree()', to prevent accidental loss of important data.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When deleting files or folders, always include robust error handling (using 'try...except') to catch issues like 'FileNotFoundError' or 'PermissionError'. Use 'os.path.exists()' and 'os.path.isdir()' for checks, and prefer 'os.remove()' for files, 'os.rmdir()' for empty directories, and 'shutil.rmtree()' for non-empty directories with extreme caution.
    </div>
</div>
`;

export default function PythonFileDeletePage() {
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
          prevLesson="python-file-read"
          nextLesson={null} // This is the last lesson in this batch
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
