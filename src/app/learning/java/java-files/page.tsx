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
# Java Files

Working with files is a fundamental aspect of many applications, allowing programs to store and retrieve data persistently. In Java, file operations are primarily handled by classes within the 'java.io' and 'java.nio' (New I/O) packages. This lesson will introduce the basics of interacting with files, focusing on the 'File' class.

## What is a File in Java?

In Java, the 'java.io.File' class is an abstraction that represents file and directory pathnames. It does not represent the actual content of the file, but rather the file's metadata and its location on the file system. You use the 'File' class to:

-   Create new files or directories.
-   Delete files or directories.
-   Rename files or directories.
-   Check file or directory existence, permissions, size, etc.
-   List contents of a directory.

For reading from or writing to files, you typically use other classes like 'FileReader', 'FileWriter', 'BufferedReader', 'BufferedWriter', 'FileInputStream', 'FileOutputStream', etc., often in conjunction with the 'File' class.

## Creating a File Object

To work with a file or directory, you first need to create a 'File' object. This does not create the actual file on the disk; it merely creates an abstract representation of the path.

**Syntax:**

\`\`\`java
import java.io.File;

// To represent a file:
File myFile = new File("path/to/your/file.txt");

// To represent a directory:
File myDirectory = new File("path/to/your/directory");
\`\`\`

You can use absolute paths or relative paths. Relative paths are resolved against the current working directory of the Java application.

### Example: Creating File Objects

\`\`\`java
import java.io.File;

public class FileObjectExample {
  public static void main(String[] args) {
    // 1. Using an absolute path (platform-dependent separator)
    // For Windows: File absoluteFile = new File("C:\\Users\\YourUser\\Documents\\my_absolute_file.txt");
    // For Unix/Linux/macOS:
    File absoluteFile = new File("/home/user/documents/my_absolute_file.txt");
    System.out.println("Absolute File Path: " + absoluteFile.getAbsolutePath());

    // 2. Using a relative path (relative to where the program is run)
    File relativeFile = new File("my_relative_file.txt");
    System.out.println("Relative File Path: " + relativeFile.getAbsolutePath());

    // 3. Representing a directory
    File myDir = new File("my_data_directory");
    System.out.println("Directory Path: " + myDir.getAbsolutePath());

    // Check if the abstract path exists (not if the file/dir exists on disk yet)
    System.out.println("Does absoluteFile exist (abstractly)? " + absoluteFile.exists()); // Will be false unless created
    System.out.println("Does relativeFile exist (abstractly)? " + relativeFile.exists()); // Will be false unless created
    System.out.println("Does myDir exist (abstractly)? " + myDir.exists()); // Will be false unless created
  }
}
\`\`\`

## Common 'File' Class Methods

The 'File' class provides numerous methods to query and manipulate file system entries.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Return Type</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'exists()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Tests whether the file or directory denoted by this abstract pathname exists.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'isFile()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Tests whether the file denoted by this abstract pathname is a normal file.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'isDirectory()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Tests whether the file denoted by this abstract pathname is a directory.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'getName()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the name of the file or directory denoted by this abstract pathname.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'String'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'getAbsolutePath()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the absolute pathname string of this abstract pathname.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'String'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'length()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the length of the file denoted by this abstract pathname.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'long' (bytes)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'canRead()', 'canWrite()', 'canExecute()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Tests whether the application can read, write, or execute the file.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'createNewFile()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Atomically creates a new, empty file named by this abstract pathname if and only if a file with this name does not yet exist.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'mkdir()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Creates the directory named by this abstract pathname.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'mkdirs()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Creates the directory named by this abstract pathname, including any necessary but nonexistent parent directories.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'delete()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Deletes the file or directory denoted by this abstract pathname.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'renameTo(File dest)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Renames the file or directory denoted by this abstract pathname.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'boolean'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'listFiles()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns an array of abstract pathnames denoting the files in the directory denoted by this abstract pathname.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'File[]'</td>
        </tr>
    </tbody>
</table>

### Example: Using File Methods

\`\`\`java
import java.io.File;
import java.io.IOException;

public class FileMethodsExample {
  public static void main(String[] args) {
    File myFile = new File("test_file.txt");
    File myDir = new File("my_temp_dir");

    try {
      // Create a new file
      if (myFile.createNewFile()) {
        System.out.println("File created: " + myFile.getName());
      } else {
        System.out.println("File already exists.");
      }

      // Check file properties
      System.out.println("File absolute path: " + myFile.getAbsolutePath());
      System.out.println("Is file? " + myFile.isFile());
      System.out.println("Is directory? " + myFile.isDirectory());
      System.out.println("File size (bytes): " + myFile.length());
      System.out.println("Can read? " + myFile.canRead());
      System.out.println("Can write? " + myFile.canWrite());

      // Create a directory
      if (myDir.mkdir()) {
        System.out.println("Directory created: " + myDir.getName());
      } else {
        System.out.println("Directory already exists or could not be created.");
      }

      // List contents of a directory (if it exists and is a directory)
      File currentDir = new File("."); // Represents current directory
      if (currentDir.isDirectory()) {
        System.out.println("\\nContents of current directory:");
        File[] files = currentDir.listFiles();
        if (files != null) {
          for (File file : files) {
            System.out.println("- " + file.getName() + (file.isDirectory() ? " (Dir)" : " (File)"));
          }
        }
      }

    } catch (IOException e) {
      System.out.println("An error occurred: " + e.getMessage());
      e.printStackTrace();
    } finally {
      // Clean up: delete created files/directories
      if (myFile.exists()) {
        myFile.delete();
        System.out.println("Cleaned up: " + myFile.getName() + " deleted.");
      }
      if (myDir.exists()) {
        myDir.delete(); // Note: mkdir() creates empty dir, so simple delete() works
        System.out.println("Cleaned up: " + myDir.getName() + " deleted.");
      }
    }
  }
}
\`\`\`

## The 'java.nio.file' Package (NIO.2)

For more modern and robust file system operations, especially starting from Java 7, the 'java.nio.file' package (NIO.2) is recommended. It provides classes like 'Path', 'Paths', and 'Files' which offer better performance, more features (e.g., symbolic links, atomic operations), and improved error handling compared to the older 'java.io.File' class.

While 'java.io.File' is still widely used and important to understand, new file system interactions should generally leverage 'java.nio.file'. We will touch upon this in later lessons when discussing reading and writing files.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use 'try-with-resources' for I/O</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When working with file streams (which will be covered in subsequent lessons), always use the 'try-with-resources' statement. This ensures that resources like 'FileReader', 'FileWriter', etc., are automatically closed, even if an exception occurs, preventing resource leaks.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: File System Permissions</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        File operations can fail due to insufficient file system permissions. Your Java application needs the necessary read, write, or execute permissions for the directories and files it attempts to access or modify. Always handle 'IOException' when performing file operations, as permission issues are a common cause.
    </div>
</div>
`;

export default function JavaFilesPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptJavaLang = document.createElement('script');
      scriptJavaLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js';
      scriptJavaLang.async = true;

      scriptJavaLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptJavaLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const javaLangScript = document.querySelector('script[src*="prism-java.min.js"]');
      if (javaLangScript && document.body.contains(javaLangScript)) {
        document.body.removeChild(javaLangScript);
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
          currentCourseId="java"
          prevLesson="java-exceptions"
          nextLesson="java-create-write-files"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
