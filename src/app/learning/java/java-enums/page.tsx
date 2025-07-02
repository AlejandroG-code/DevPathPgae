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
# Java Enums (Enumerations)

An **enum** (short for enumeration) in Java is a special 'class' that represents a group of constants (unchangeable variables, like 'final' fields). Enums are used when you need a fixed set of predefined constants.

## Why Use Enums?

-   **Type Safety:** Prevents invalid values from being assigned to a variable. Instead of using arbitrary integers or strings, you use specific enum constants.
-   **Readability:** Makes code more readable and understandable by giving meaningful names to a set of related constants.
-   **Maintainability:** If you need to add or remove constants, you only modify the enum definition, not every place where the constant is used.
-   **Prevents Magic Numbers/Strings:** Replaces hardcoded values with named constants.

## Declaring an Enum

Enums are declared using the 'enum' keyword, similar to classes. The constants are listed inside the enum, separated by commas.

**Syntax:**

\`\`\`java
public enum EnumName {
  CONSTANT1,
  CONSTANT2,
  CONSTANT3; // Semicolon is optional if no other members follow
}
\`\`\`

**Example: Days of the Week**

\`\`\`java
public enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY
}
\`\`\`

## Using Enum Constants

You access enum constants using the dot syntax, similar to static fields: 'EnumName.CONSTANT'.

\`\`\`java
public class EnumBasicExample {
  public enum Level {
    LOW,
    MEDIUM,
    HIGH
  }

  public static void main(String[] args) {
    Level myLevel = Level.MEDIUM;
    System.out.println(myLevel); // Output: MEDIUM

    // You can compare enum constants using '=='
    if (myLevel == Level.MEDIUM) {
      System.out.println("It's a medium level."); // Output: It's a medium level.
    }
  }
}
\`\`\`

## Enums in Switch Statements

Enums are particularly useful in 'switch' statements, providing a clean and type-safe way to handle different constant values.

\`\`\`java
public class EnumSwitchExample {
  public enum TrafficLight {
    RED,
    YELLOW,
    GREEN
  }

  public static void main(String[] args) {
    TrafficLight currentLight = TrafficLight.RED;

    switch (currentLight) {
      case RED:
        System.out.println("Stop! The light is Red.");
        break;
      case YELLOW:
        System.out.println("Prepare to stop! The light is Yellow.");
        break;
      case GREEN:
        System.out.println("Go! The light is Green.");
        break;
      default:
        System.out.println("Invalid traffic light state.");
    }
    // Output: Stop! The light is Red.
  }
}
\`\`\`

## Enums with Fields, Constructors, and Methods

Enums are more powerful than simple lists of constants. They can have:
-   **Fields (attributes):** Each enum constant can have its own specific values for these fields.
-   **Constructors:** To initialize the fields of each enum constant. Enum constructors are implicitly 'private'.
-   **Methods:** Enum constants can have their own methods, just like regular objects.

**Example: Enum with Fields and Methods**

\`\`\`java
public enum CoffeeSize {
  SMALL(100, "S"),    // Each constant calls the constructor
  MEDIUM(200, "M"),
  LARGE(300, "L");

  private final int milliliters; // Field
  private final String code;     // Field

  // Constructor (implicitly private)
  CoffeeSize(int milliliters, String code) {
    this.milliliters = milliliters;
    this.code = code;
  }

  // Getter method for milliliters
  public int getMilliliters() {
    return milliliters;
  }

  // Getter method for code
  public String getCode() {
    return code;
  }

  // Custom method
  public String getDescription() {
    return "Size: " + name() + ", Milliliters: " + milliliters + ", Code: " + code;
  }

  public static void main(String[] args) {
    CoffeeSize chosenSize = CoffeeSize.MEDIUM;

    System.out.println("Chosen size: " + chosenSize); // Output: MEDIUM
    System.out.println("Milliliters: " + chosenSize.getMilliliters()); // Output: Milliliters: 200
    System.out.println("Code: " + chosenSize.getCode());             // Output: Code: M
    System.out.println(chosenSize.getDescription());                 // Output: Size: MEDIUM, Milliliters: 200, Code: M

    // Iterating through enum constants
    System.out.println("\\nAll Coffee Sizes:");
    for (CoffeeSize size : CoffeeSize.values()) { // values() is a built-in method
      System.out.println(size.getDescription());
    }
    // Output:
    // All Coffee Sizes:
    // Size: SMALL, Milliliters: 100, Code: S
    // Size: MEDIUM, Milliliters: 200, Code: M
    // Size: LARGE, Milliliters: 300, Code: L
  }
}
\`\`\`

## Built-in Enum Methods

All enums implicitly extend 'java.lang.Enum' and thus inherit several useful methods:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Method</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'name()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the name of this enum constant, exactly as declared in its enum declaration.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'ordinal()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the ordinal of this enum constant (its position in its enum declaration, where the initial constant is assigned an ordinal of zero).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'valueOf(String name)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns the enum constant of the specified enum type with the specified name.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'values()'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns an array containing the constants of this enum type, in the order they are declared. (This is a static method automatically generated by the compiler).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'compareTo(E o)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Compares this enum with the specified object for order. Returns a negative integer, zero, or a positive integer as this object is less than, equal to, or greater than the specified object. (Based on ordinal position).</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Enum for Fixed Sets</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Use enums whenever you have a collection of related constants that represent a fixed set of values. This is ideal for things like days of the week, months of the year, cardinal directions, or predefined states in a finite state machine.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Enum Constants are Objects</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Remember that each enum constant is an object of the enum type. While you can compare them using '==', be careful when comparing them to strings obtained from user input. Always convert the input string to an enum constant using 'Enum.valueOf(String)' before comparison to avoid 'NullPointerException' or 'IllegalArgumentException'.
    </div>
</div>
`;

export default function JavaEnumsPage() {
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
          prevLesson="java-interfaces"
          nextLesson="java-user-input" // Assuming this is the next logical step
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
