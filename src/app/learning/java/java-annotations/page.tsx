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
# Java Annotations

**Annotations** in Java are a form of metadata that can be added to Java source code. They provide information about the code but do not directly affect the execution of the code itself. Annotations are used by compilers, development tools, and runtime environments to process code in various ways.

They are introduced with the '@' symbol, followed by the annotation name.

## Why Use Annotations?

Annotations serve several purposes:

1.  **Information for the Compiler:** Annotations can be used by the compiler to detect errors or suppress warnings. Examples include '@Override' and '@SuppressWarnings'.
2.  **Compile-time and Deployment-time Processing:** Software tools can read annotations to generate code, XML files, or other artifacts. For instance, build tools like Maven or Gradle, or frameworks like Spring, use annotations to configure applications.
3.  **Runtime Processing:** Annotations can be retained at runtime and queried using Java Reflection. This allows frameworks (like JUnit for testing, or ORM frameworks like Hibernate) to inspect classes and methods and apply specific logic based on the annotations present.

## Types of Annotations

Annotations can be broadly categorized into:

1.  **Built-in Annotations:** Predefined annotations provided by Java.
2.  **Meta-Annotations:** Annotations used to annotate other annotations.
3.  **Custom Annotations:** Annotations you define yourself.

---

## 1. Built-in Annotations

Java provides several standard annotations that are commonly used:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Annotation</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Target</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@Override'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that a method declaration is intended to override a method declaration in a supertype. Compiler checks if it actually overrides; if not, it throws a compile-time error.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Methods</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@Deprecated'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that a program element (class, method, field) is deprecated and should no longer be used. Compiler generates a warning if a deprecated element is used.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Classes, Methods, Fields, Constructors, Enums</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@SuppressWarnings(value)'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Instructs the compiler to suppress specific warnings for the annotated element. Common values include "unchecked", "deprecation", "rawtypes", "all".</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Classes, Methods, Fields, Parameters, Constructors, Local Variables</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@FunctionalInterface' (Java 8+)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that an interface type declaration is intended to be a functional interface (i.e., it has exactly one abstract method). Compiler checks this.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Interfaces</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@SafeVarargs' (Java 7+)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Suppresses unchecked warnings for methods or constructors with varargs parameters. Used when the compiler cannot prove type safety but the developer is confident.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Methods, Constructors</td>
        </tr>
    </tbody>
</table>

**Example of Built-in Annotations:**

\`\`\`java
import java.util.ArrayList;
import java.util.List;

class Parent {
  public void display() {
    System.out.println("Parent's display method");
  }

  @Deprecated
  public void oldMethod() {
    System.out.println("This method is old and deprecated.");
  }
}

class Child extends Parent {
  @Override // Compiler checks if this method actually overrides a parent method
  public void display() {
    System.out.println("Child's display method");
  }

  @SuppressWarnings("deprecation") // Suppresses warning for using a deprecated method
  public void useDeprecatedMethod() {
    oldMethod(); // Using a deprecated method
  }

  @SuppressWarnings({"unchecked", "rawtypes"}) // Suppress multiple warnings
  public void processRawList() {
    List rawList = new ArrayList(); // Raw type usage
    rawList.add("String");
    rawList.add(123);
    // ...
  }
}

@FunctionalInterface // Compiler ensures this interface has only one abstract method
interface MyFunctionalInterface {
  void doSomething();
  // void doAnotherThing(); // Uncommenting this would cause a compile-time error
}

public class BuiltInAnnotationsExample {
  public static void main(String[] args) {
    Child child = new Child();
    child.display();
    child.useDeprecatedMethod();

    MyFunctionalInterface func = () -> System.out.println("Doing something!");
    func.doSomething();
  }
}
\`\`\`

---

## 2. Meta-Annotations

Meta-annotations are annotations that are applied to other annotations. They define how a custom annotation can be used and where it can be applied.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Meta-Annotation</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@Retention'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Specifies how long the annotation is to be retained.
                <ul class="list-disc list-inside ml-4 mt-1 space-y-1">
                    <li>'RetentionPolicy.SOURCE': Retained only in the source file, discarded by the compiler.</li>
                    <li>'RetentionPolicy.CLASS': Retained in the .class file, but not available at runtime via reflection (default).</li>
                    <li>'RetentionPolicy.RUNTIME': Retained in the .class file and available at runtime via reflection.</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@Target'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates the contexts in which the annotation type is applicable. Uses 'ElementType' enum (e.g., 'TYPE', 'METHOD', 'FIELD', 'PARAMETER', 'CONSTRUCTOR', 'LOCAL_VARIABLE', 'ANNOTATION_TYPE', 'PACKAGE', 'TYPE_PARAMETER', 'TYPE_USE').</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@Documented'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that elements using this annotation should be documented by Javadoc and similar tools.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@Inherited'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that an annotation type is automatically inherited by subclasses. (Only applies to class declarations).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'@Repeatable' (Java 8+)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Indicates that the annotation can be applied multiple times to the same declaration. Requires a "container" annotation.</td>
        </tr>
    </tbody>
</table>

---

## 3. Custom Annotations

You can define your own annotations to add custom metadata to your code. Custom annotations are defined using the '@interface' keyword.

**Syntax:**

\`\`\`java
import java.lang.annotation.*; // Import meta-annotations

@Retention(RetentionPolicy.RUNTIME) // How long the annotation is retained
@Target(ElementType.METHOD)      // Where the annotation can be applied
@Documented                      // Include in Javadoc
public @interface MyCustomAnnotation {
  String value() default "default value"; // Element with default value
  int count() default 1;                  // Another element
}
\`\`\`

**Example: Creating and Using a Custom Annotation**

Let's create a simple custom annotation to mark methods as "Test Cases" and include a description.

\`\`\`java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Method; // For runtime reflection

// 1. Define the Custom Annotation
@Retention(RetentionPolicy.RUNTIME) // Make it available at runtime
@Target(ElementType.METHOD)      // Can only be applied to methods
@interface TestCase {
  String description() default "No description provided"; // Annotation element
  int expectedResult() default 0;
}

// 2. Use the Custom Annotation
class MyTestRunner {

  @TestCase(description = "Test for addition of two numbers", expectedResult = 10)
  public void testAddition() {
    int result = 5 + 5;
    System.out.println("testAddition: Result = " + result);
    if (result == 10) {
      System.out.println("  --> Test Passed!");
    } else {
      System.out.println("  --> Test Failed!");
    }
  }

  @TestCase(description = "Test for string concatenation")
  public void testConcatenation() {
    String result = "Hello" + "World";
    System.out.println("testConcatenation: Result = " + result);
  }

  @TestCase // Using default values
  public void testDefault() {
    System.out.println("testDefault: Running with default values.");
  }
}

// 3. Process the Custom Annotation (using Reflection)
public class CustomAnnotationProcessor {
  public static void main(String[] args) {
    MyTestRunner runner = new MyTestRunner();
    Class<?> clazz = runner.getClass();

    System.out.println("--- Running Tests ---");
    for (Method method : clazz.getDeclaredMethods()) {
      // Check if the method has our custom annotation
      if (method.isAnnotationPresent(TestCase.class)) {
        TestCase testCase = method.getAnnotation(TestCase.class);

        System.out.println("\nExecuting Test Method: " + method.getName());
        System.out.println("  Description: " + testCase.description());
        System.out.println("  Expected Result: " + testCase.expectedResult());

        try {
          // Invoke the annotated method
          method.invoke(runner); 
        } catch (Exception e) {
          System.err.println("  Error executing test: " + e.getMessage());
        }
      }
    }
  }
}
\`\`\`

## Annotation Elements (Members)

Annotation elements are defined like methods, but without parameters and with a return type. They can have default values.
-   'String value()': A special element named 'value' allows you to omit the element name when using the annotation if it's the only element or the first one.
    -   Example: '@TestCase("My Test")' instead of '@TestCase(value="My Test")'

\`\`\`java
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@interface Column {
  String name(); // Required element
  boolean nullable() default true; // Element with default value
  int length() default 255;
  String value() default ""; // Special 'value' element
}

class User {
  @Column(name = "user_id", nullable = false)
  private long id;

  @Column(name = "user_name", length = 50, value = "userName") // Using all elements
  private String username;

  @Column(name = "user_email") // Using default for nullable, length; value is empty string default
  private String email;

  // Getters and Setters
  public long getId() { return id; }
  public void setId(long id) { this.id = id; }
  public String getUsername() { return username; }
  public void setUsername(String username) { this.username = username; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
}

public class AnnotationElementsExample {
  public static void main(String[] args) {
    // This example primarily demonstrates annotation definition and usage.
    // Processing these annotations would typically involve reflection to read their values,
    // similar to the CustomAnnotationProcessor example.
    System.out.println("Annotations defined and used in User class.");
    System.out.println("To process them, reflection would be used (as shown in CustomAnnotationProcessor).");
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Annotations for Frameworks</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Annotations are extensively used in modern Java frameworks (e.g., Spring, Hibernate, JUnit, JAX-RS). They provide a declarative way to configure behavior, define relationships, and simplify boilerplate code. Understanding annotations is key to working effectively with these frameworks.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Overuse of Custom Annotations</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While powerful, avoid overusing custom annotations for simple configurations that can be handled more clearly with regular code or configuration files. Custom annotations add an extra layer of abstraction and require reflection to process at runtime, which can sometimes be less performant or harder to debug than direct method calls or property lookups. Use them when they genuinely simplify complex configurations or provide metadata for tools.
    </div>
</div>
`;

export default function JavaAnnotationsPage() {
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
          prevLesson="java-generics"
          nextLesson="java-regex"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
