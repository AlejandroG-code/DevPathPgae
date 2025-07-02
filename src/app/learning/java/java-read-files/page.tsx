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
# Java Read Files

Reading data from files is as essential as writing to them, allowing your Java applications to process existing information. This lesson will cover how to read various types of data from files using both the traditional 'java.io' package and the modern 'java.nio.file' (NIO.2) API.

## 1. Reading Text Files with 'FileReader' (Character Stream)

'FileReader' is used for reading character-based data from a file. It's suitable for text files. It reads characters one by one or into a character array.

**Key points:**
-   Reads characters.
-   Best used when wrapped in a 'BufferedReader' for efficiency.

\`\`\`java
import java.io.FileReader;
import java.io.IOException;

public class FileReaderExample {
  public static void main(String[] args) {
    // Ensure 'sample.txt' exists with some content for this example
    // Create a sample.txt file manually or using the previous lesson's code
    // Example content for sample.txt:
    // Line 1: Hello from sample.txt
    // Line 2: This is the second line.

    try (FileReader reader = new FileReader("sample.txt")) {
      int character;
      System.out.println("Reading character by character:");
      while ((character = reader.read()) != -1) { // Reads one character at a time
        System.out.print((char) character);
      }
      System.out.println("\nSuccessfully read sample.txt character by character.");
    } catch (IOException e) {
      System.out.println("An error occurred while reading the file: " + e.getMessage());
      e.printStackTrace();
    }
  }
}
\`\`\`

---

## 2. Efficient Reading with 'BufferedReader'

For reading large amounts of character data efficiently, wrapping a 'FileReader' in a 'BufferedReader' is highly recommended. 'BufferedReader' reads text from a character-input stream, buffering characters to provide for the efficient reading of characters, arrays, and lines.

**Key points:**
-   Reads lines of text using 'readLine()'.
-   Significantly improves performance for large text files.

\`\`\`java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class BufferedReaderExample {
  public static void main(String[] args) {
    // Ensure 'sample.txt' exists with content
    try (BufferedReader reader = new BufferedReader(new FileReader("sample.txt"))) {
      String line;
      System.out.println("\nReading line by line with BufferedReader:");
      while ((line = reader.readLine()) != null) { // Reads one line at a time
        System.out.println(line);
      }
      System.out.println("Successfully read sample.txt line by line.");
    } catch (IOException e) {
      System.out.println("An error occurred while reading the file with BufferedReader: " + e.getMessage());
      e.printStackTrace();
    }
  }
}
\`\`\`

---

## 3. Reading Binary Files with 'FileInputStream' (Byte Stream)

'FileInputStream' is used for reading raw bytes (binary data) from a file. It's suitable for images, audio, or any non-textual data.

**Key points:**
-   Reads bytes.
-   Can read one byte at a time or into a byte array.

\`\`\`java
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class FileInputStreamExample {
  public static void main(String[] args) {
    // Create a dummy binary file (or use an actual image/audio file)
    // For demonstration, let's create a simple text file and read it as bytes
    // You can use the previous lesson's FileOutputStream example to create 'binary_output.bin'
    // with some content like "This is some byte data."

    try (FileInputStream fis = new FileInputStream("binary_output.bin")) {
      int byteRead;
      StringBuilder content = new StringBuilder();
      System.out.println("\nReading bytes from binary_output.bin:");
      while ((byteRead = fis.read()) != -1) {
        content.append((char) byteRead); // Convert byte to char for display (might not be readable for true binary)
      }
      System.out.println("Content as characters (may be garbled for binary): " + content.toString());
      System.out.println("Successfully read bytes from binary_output.bin.");
    } catch (IOException e) {
      System.out.println("An error occurred while reading bytes from the file: " + e.getMessage());
      e.printStackTrace();
    }
  }
}
\`\`\`

---

## 4. Simpler File Reading with 'java.nio.file.Files' (NIO.2)

The 'java.nio.file.Files' class (introduced in Java 7) provides convenient static methods for common file operations, including reading. These methods often handle resource management automatically and are generally preferred for simpler tasks.

**Key methods:**
-   'Files.readAllLines(Path path, Charset cs)': Reads all lines from a text file into a 'List<String>'.
-   'Files.readAllBytes(Path path)': Reads all bytes from a file into a 'byte[]'.

\`\`\`java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class NioReadExample {
  public static void main(String[] args) {
    Path textFilePath = Paths.get("sample.txt");
    Path binaryFilePath = Paths.get("binary_output.bin");

    // Ensure sample.txt and binary_output.bin exist with content for this example
    // (You can create them using the previous lesson's examples)

    try {
      // 1. Read all lines from a text file
      List<String> lines = Files.readAllLines(textFilePath, StandardCharsets.UTF_8);
      System.out.println("\nReading all lines with NIO.2:");
      for (String line : lines) {
        System.out.println(line);
      }
      System.out.println("Successfully read all lines from " + textFilePath.getFileName());

      // 2. Read all bytes from a file
      byte[] allBytes = Files.readAllBytes(binaryFilePath);
      System.out.println("\nReading all bytes with NIO.2:");
      System.out.println("Total bytes read: " + allBytes.length);
      // For display, convert bytes to string (assuming it's readable text)
      System.out.println("Content as string: " + new String(allBytes, StandardCharsets.UTF_8));
      System.out.println("Successfully read all bytes from " + binaryFilePath.getFileName());

    } catch (IOException e) {
      System.out.println("An error occurred during NIO.2 file reading: " + e.getMessage());
      e.printStackTrace();
    }
  }
}
\`\`\`

## Common File Reading Methods Summary

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Class/Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Purpose</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Best For</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'FileReader'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads character data from a file.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Basic character-by-character reading.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'BufferedReader' (wrapping 'FileReader')</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads character data efficiently, line by line.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reading large text files, line-oriented processing.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'FileInputStream'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads raw byte data from a file.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reading binary files (images, audio, serialized objects).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Files.readAllLines()' (NIO.2)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads all lines from a text file into a List.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Convenient for small to medium-sized text files.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Files.readAllBytes()' (NIO.2)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reads all bytes from a file into a byte array.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Convenient for small to medium-sized binary files.</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Choose the Right Stream</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Always choose the appropriate stream type: character streams ('FileReader', 'BufferedReader') for text data, and byte streams ('FileInputStream') for binary data. Using the wrong type can lead to data corruption or unexpected behavior.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Large Files and Memory</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Methods like 'Files.readAllLines()' and 'Files.readAllBytes()' read the entire file content into memory. While convenient for smaller files, this can lead to 'OutOfMemoryError' when dealing with very large files. For large files, it's better to use buffered streams ('BufferedReader', 'BufferedInputStream') and process the file in chunks or line by line to manage memory effectively.
    </div>
</div>
`;

export default function JavaReadFilesPage() {
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
          prevLesson="java-create-write-files"
          nextLesson="java-delete-files"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
