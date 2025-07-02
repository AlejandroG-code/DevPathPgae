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
# Java Get Started

To start writing and running Java programs, you need to set up your development environment. This involves installing the Java Development Kit (JDK) and optionally choosing an Integrated Development Environment (IDE).

## 1. Install the Java Development Kit (JDK)

The JDK is essential for Java development. It includes the Java Runtime Environment (JRE), which is needed to run Java applications, and a set of development tools, including the Java compiler ('javac').

**Steps to Install JDK:**

1.  **Download JDK:** Visit the official Oracle website or OpenJDK website to download the latest stable version of the JDK. Choose the version appropriate for your operating system (Windows, macOS, Linux).
    -   [Oracle JDK Download](https://www.oracle.com/java/technologies/downloads/)
    -   [OpenJDK Download](https://jdk.java.net/downloads/)
2.  **Run the Installer:** Follow the instructions provided by the installer. This typically involves accepting the license agreement and choosing an installation location.
3.  **Set Environment Variables (Optional but Recommended):**
    -   **JAVA_HOME:** Set this environment variable to the root directory of your JDK installation (e.g., 'C:\\Program Files\\Java\\jdk-17').
    -   **Path:** Add the 'bin' directory of your JDK installation to your system's 'Path' environment variable (e.g., 'C:\\Program Files\\Java\\jdk-17\\bin'). This allows you to run Java commands ('java', 'javac') from any directory in your terminal.

**Verify Installation:**
Open your terminal or command prompt and type:

\`\`\`bash
java -version
javac -version
\`\`\`

You should see output similar to this (version numbers may vary):

\`\`\`
java version "17.0.2" 2022-01-18 LTS
Java(TM) SE Runtime Environment (build 17.0.2+8-LTS-86)
Java HotSpot(TM) 64-Bit Server VM (build 17.0.2+8-LTS-86, mixed mode, sharing)

javac 17.0.2
\`\`\`
If you see these versions, your JDK is installed correctly.

## 2. Choose an Integrated Development Environment (IDE)

While you can write Java code in any text editor and compile/run it from the command line, an IDE provides powerful features that significantly boost productivity.

**Popular Java IDEs:**

-   **IntelliJ IDEA (Recommended for beginners and professionals):**
    -   Offers a powerful Community Edition (free) with excellent code completion, refactoring, and debugging.
    -   Download: [JetBrains IntelliJ IDEA](https://www.jetbrains.com/idea/download/)
-   **Eclipse:**
    -   A widely used open-source IDE, especially popular in enterprise environments.
    -   Download: [Eclipse IDE](https://www.eclipse.org/downloads/)
-   **Apache NetBeans:**
    -   Another open-source IDE that supports various programming languages, including Java.
    -   Download: [Apache NetBeans](https://netbeans.apache.org/download/index.html)
-   **VS Code (with Java extensions):**
    -   A lightweight but powerful code editor that can be extended to support Java development. Good if you're already familiar with VS Code.
    -   Download: [Visual Studio Code](https://code.visualstudio.com/)
    -   Install "Extension Pack for Java" from the VS Code Marketplace.

**Recommendation:** For beginners, **IntelliJ IDEA Community Edition** is often recommended due to its user-friendly interface and intelligent features.

## 3. Write Your First Java Program

Once your environment is set up, let's create a simple "Hello World" program.

1.  **Create a new project in your IDE** (or a new folder if using a text editor).
2.  **Create a new Java file** (e.g., 'HelloWorld.java') inside your project/folder.
3.  **Paste the following code:**

    \`\`\`java
    public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, Java World!");
        }
    }
    \`\`\`

4.  **Run the program:**
    -   **In an IDE:** Look for a "Run" button (often a green triangle icon) or a "Run" menu option. The IDE will handle compilation and execution automatically.
    -   **From Command Line:**
        -   Navigate to the directory where 'HelloWorld.java' is saved.
        -   Compile: 'javac HelloWorld.java'
        -   Run: 'java HelloWorld'

You should see "Hello, Java World!" printed in your IDE's console or your terminal.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Troubleshooting</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        If you encounter issues, double-check your JDK installation and environment variables. For IDE-specific problems, refer to the IDE's documentation or search for common setup issues online. Many online resources and communities are available to help!
    </div>
</div>
`;

export default function JavaGetStartedPage() {
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
          prevLesson="java-intro"
          nextLesson="java-syntax"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
