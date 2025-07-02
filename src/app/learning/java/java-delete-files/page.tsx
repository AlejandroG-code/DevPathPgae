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
# Java Delete Files

Deleting files and directories is another essential file system operation in Java. This lesson will cover how to remove files and empty directories using both the traditional 'java.io.File' class and the modern 'java.nio.file.Files' (NIO.2) API.

## 1. Deleting Files with 'java.io.File.delete()'

The 'delete()' method of the 'java.io.File' class is used to delete the file or directory denoted by the abstract pathname.

**Key points:**
-   Returns 'true' if the file or directory was successfully deleted, 'false' otherwise (e.g., if the file does not exist, or if it's a non-empty directory).
-   It cannot delete non-empty directories. For directories, it only works if the directory is empty.

**Example:**

\`\`\`java
import java.io.File;
import java.io.IOException;
import java.io.FileWriter; // To create a file for deletion

public class FileDeleteExample {
  public static void main(String[] args) {
    File fileToDelete = new File("file_to_delete.txt");
    File emptyDirToDelete = new File("empty_dir_to_delete");
    File nonEmptyDirToDelete = new File("non_empty_dir_to_delete");
    File fileInNonEmptyDir = new File(nonEmptyDirToDelete, "inner_file.txt");

    try {
      // 1. Create a file to delete
      if (fileToDelete.createNewFile()) {
        System.out.println("Created file: 'file_to_delete.txt'");
        try (FileWriter writer = new FileWriter(fileToDelete)) {
          writer.write("Some content.");
        }
      }

      // 2. Create an empty directory to delete
      if (emptyDirToDelete.mkdir()) {
        System.out.println("Created empty directory: 'empty_dir_to_delete'");
      }

      // 3. Create a non-empty directory for demonstration
      if (nonEmptyDirToDelete.mkdir()) {
        System.out.println("Created non-empty directory: 'non_empty_dir_to_delete'");
        if (fileInNonEmptyDir.createNewFile()) {
          System.out.println("Created file inside non-empty directory: 'inner_file.txt'");
        }
      }

      System.out.println("\n--- Attempting Deletions ---");

      // Delete the file
      if (fileToDelete.delete()) {
        System.out.println("Successfully deleted file: 'file_to_delete.txt'");
      } else {
        System.out.println("Failed to delete file: 'file_to_delete.txt' (might not exist or permission issue)");
      }

      // Delete the empty directory
      if (emptyDirToDelete.delete()) {
        System.out.println("Successfully deleted empty directory: 'empty_dir_to_delete'");
      } else {
        System.out.println("Failed to delete empty directory: 'empty_dir_to_delete' (might not exist or not empty)");
      }

      // Attempt to delete non-empty directory (will fail)
      if (nonEmptyDirToDelete.delete()) {
        System.out.println("Successfully deleted non-empty directory: 'non_empty_dir_to_delete' (UNEXPECTED)");
      } else {
        System.out.println("Failed to delete non-empty directory: 'non_empty_dir_to_delete' (as expected, it's not empty)");
      }

    } catch (IOException e) {
      System.out.println("An I/O error occurred: " + e.getMessage());
      e.printStackTrace();
    } finally {
      // Clean up remaining files/directories if any
      System.out.println("\n--- Final Cleanup ---");
      if (fileInNonEmptyDir.exists()) {
        fileInNonEmptyDir.delete();
        System.out.println("Deleted 'inner_file.txt' for cleanup.");
      }
      if (nonEmptyDirToDelete.exists()) {
        nonEmptyDirToDelete.delete(); // Now it should be empty and can be deleted
        System.out.println("Deleted 'non_empty_dir_to_delete' for cleanup.");
      }
    }
  }
}
\`\`\`

---

## 2. Deleting Files and Directories with 'java.nio.file.Files' (NIO.2)

The 'java.nio.file.Files' class (introduced in Java 7) provides more robust and convenient methods for deleting files and directories.

-   'Files.delete(Path path)': Deletes a file or an empty directory. Throws 'IOException' if the file/directory does not exist, or if the directory is not empty.
-   'Files.deleteIfExists(Path path)': Deletes a file or an empty directory if it exists. Returns 'true' if deleted, 'false' if it didn't exist. Does not throw an exception if the file/directory does not exist.

**Key points:**
-   Both methods throw 'DirectoryNotEmptyException' if attempting to delete a non-empty directory.
-   They throw 'NoSuchFileException' if the path does not exist (for 'delete()').

**Example:**

\`\`\`java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class NioDeleteExample {
  public static void main(String[] args) {
    Path nioFileToDelete = Paths.get("nio_file_to_delete.txt");
    Path nioEmptyDirToDelete = Paths.get("nio_empty_dir_to_delete");
    Path nioNonEmptyDir = Paths.get("nio_non_empty_dir");
    Path nioFileInNonEmptyDir = nioNonEmptyDir.resolve("nio_inner_file.txt");

    try {
      // 1. Create files/directories for deletion
      Files.createFile(nioFileToDelete);
      System.out.println("Created file: '" + nioFileToDelete.getFileName() + "'");

      Files.createDirectory(nioEmptyDirToDelete);
      System.out.println("Created empty directory: '" + nioEmptyDirToDelete.getFileName() + "'");

      Files.createDirectory(nioNonEmptyDir);
      System.out.println("Created non-empty directory: '" + nioNonEmptyDir.getFileName() + "'");
      Files.createFile(nioFileInNonEmptyDir);
      System.out.println("Created file inside non-empty directory: '" + nioFileInNonEmptyDir.getFileName() + "'");

      System.out.println("\n--- Attempting Deletions with NIO.2 ---");

      // Delete file using Files.delete()
      Files.delete(nioFileToDelete);
      System.out.println("Successfully deleted file: '" + nioFileToDelete.getFileName() + "'");

      // Delete empty directory using Files.deleteIfExists()
      if (Files.deleteIfExists(nioEmptyDirToDelete)) {
        System.out.println("Successfully deleted empty directory: '" + nioEmptyDirToDelete.getFileName() + "'");
      } else {
        System.out.println("Failed to delete empty directory: '" + nioEmptyDirToDelete.getFileName() + "'");
      }

      // Attempt to delete non-empty directory (will throw DirectoryNotEmptyException)
      try {
        Files.delete(nioNonEmptyDir);
        System.out.println("Successfully deleted non-empty directory: '" + nioNonEmptyDir.getFileName() + "' (UNEXPECTED)");
      } catch (IOException e) {
        System.out.println("Caught expected error: " + e.getMessage());
        System.out.println("Failed to delete non-empty directory: '" + nioNonEmptyDir.getFileName() + "'");
      }

    } catch (IOException e) {
      System.out.println("An I/O error occurred during setup or deletion: " + e.getMessage());
      e.printStackTrace();
    } finally {
      // Clean up remaining files/directories if any
      System.out.println("\n--- Final NIO.2 Cleanup ---");
      try {
        Files.deleteIfExists(nioFileInNonEmptyDir);
        System.out.println("Deleted '" + nioFileInNonEmptyDir.getFileName() + "' for cleanup.");
        Files.deleteIfExists(nioNonEmptyDir); // Now it should be empty and can be deleted
        System.out.println("Deleted '" + nioNonEmptyDir.getFileName() + "' for cleanup.");
      } catch (IOException e) {
        System.out.println("Error during NIO.2 cleanup: " + e.getMessage());
      }
    }
  }
}
\`\`\`

## Deleting Non-Empty Directories (Recursive Deletion)

Neither 'File.delete()' nor 'Files.delete()' can delete a directory that contains files or other subdirectories. To delete a non-empty directory, you must first delete all its contents recursively. This often involves traversing the directory tree.

**Example: Recursive Directory Deletion (using NIO.2 'Files.walk')**

\`\`\`java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.stream.Stream;

public class RecursiveDeleteExample {

  public static void deleteDirectoryRecursively(Path path) throws IOException {
    if (Files.exists(path) && Files.isDirectory(path)) {
      try (Stream<Path> walk = Files.walk(path)) {
        // Sort in reverse order to delete files before directories
        walk.sorted(Comparator.reverseOrder())
            .forEach(p -> {
              try {
                Files.delete(p);
                System.out.println("Deleted: " + p.getFileName());
              } catch (IOException e) {
                System.err.println("Failed to delete " + p.getFileName() + ": " + e.getMessage());
              }
            });
      }
      System.out.println("Successfully deleted directory and its contents: " + path.getFileName());
    } else if (Files.exists(path) && Files.isRegularFile(path)) {
        Files.delete(path);
        System.out.println("Deleted single file: " + path.getFileName());
    } else {
        System.out.println("Path does not exist or is not a directory: " + path.getFileName());
    }
  }

  public static void main(String[] args) {
    Path rootDir = Paths.get("my_recursive_dir");
    Path subDir = rootDir.resolve("sub_dir");
    Path file1 = rootDir.resolve("file1.txt");
    Path file2 = subDir.resolve("file2.txt");

    try {
      // Create a nested directory structure with files
      Files.createDirectories(subDir); // Creates rootDir and subDir
      Files.createFile(file1);
      Files.createFile(file2);
      System.out.println("Created directory structure for recursive deletion.");

      // Perform recursive deletion
      deleteDirectoryRecursively(rootDir);

      // Verify deletion
      System.out.println("\nDoes 'my_recursive_dir' exist after deletion? " + Files.exists(rootDir));

    } catch (IOException e) {
      System.out.println("An error occurred during recursive deletion setup or process: " + e.getMessage());
      e.printStackTrace();
    }
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Use NIO.2 for Modern File Operations</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For most file and directory operations in modern Java applications (Java 7+), prefer the classes and methods in the 'java.nio.file' package (like 'Path', 'Paths', and 'Files') over the older 'java.io.File' class. NIO.2 offers better performance, more features, and a more consistent API.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Irreversible Deletion</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        File deletion operations are generally irreversible. Once a file or directory is deleted, it's often permanently removed from the file system and cannot be recovered easily. Always exercise extreme caution when implementing deletion logic, especially recursive deletion, and consider adding user confirmation or backup mechanisms for critical data.
    </div>
</div>
`;

export default function JavaDeleteFilesPage() {
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
          prevLesson="java-read-files"
          nextLesson="java-data-structures"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
