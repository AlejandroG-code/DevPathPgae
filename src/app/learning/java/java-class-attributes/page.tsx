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
# Java Class Attributes (Fields)

In Object-Oriented Programming, objects have characteristics that define their state. These characteristics are called **attributes** or **fields** (or member variables) in Java. Attributes are variables declared within a class but outside any method.

## Declaring Attributes

Attributes are declared just like regular variables, but they are placed directly inside the class definition.

\`\`\`java
public class MyClass {
  int x;          // An integer attribute
  String name;    // A String attribute
  boolean isActive; // A boolean attribute
}
\`\`\`

## Accessing Attributes

To access the attributes of a class, you first need to create an object of that class, and then use the dot syntax ('.') followed by the attribute name.

\`\`\`java
public class AccessAttributes {
  String brand = "Ford";
  String model = "Mustang";
  int year = 1969;

  public static void main(String[] args) {
    AccessAttributes myCar = new AccessAttributes(); // Create an object

    // Access attributes using the object
    System.out.println("Brand: " + myCar.brand);
    System.out.println("Model: " + myCar.model);
    System.out.println("Year: " + myCar.year);
    // Output:
    // Brand: Ford
    // Model: Mustang
    // Year: 1969
  }
}
\`\`\`

## Modifying Attributes

You can modify the value of an attribute after an object has been created.

\`\`\`java
public class ModifyAttributes {
  String brand = "Ford";

  public static void main(String[] args) {
    ModifyAttributes myCar = new ModifyAttributes();
    System.out.println("Original brand: " + myCar.brand); // Output: Original brand: Ford

    myCar.brand = "Opel"; // Change the value of the 'brand' attribute
    System.out.println("New brand: " + myCar.brand);     // Output: New brand: Opel
  }
}
\`\`\`

You can also assign initial values to attributes when declaring them, or later using the dot syntax.

## Multiple Objects, Multiple Attributes

Each object created from a class has its own copy of the instance attributes. This means changes to one object's attributes do not affect another object's attributes.

\`\`\`java
public class MultipleObjects {
  String color;
  int speed;

  public static void main(String[] args) {
    MultipleObjects car1 = new MultipleObjects();
    car1.color = "Red";
    car1.speed = 120;

    MultipleObjects car2 = new MultipleObjects();
    car2.color = "Blue";
    car2.speed = 100;

    System.out.println("Car 1 color: " + car1.color + ", speed: " + car1.speed);
    System.out.println("Car 2 color: " + car2.color + ", speed: " + car2.speed);
    // Output:
    // Car 1 color: Red, speed: 120
    // Car 2 color: Blue, speed: 100
  }
}
\`\`\`

## The 'final' Keyword for Attributes

If you want to prevent attributes from being overridden or changed, declare them with the 'final' keyword. This makes them constants.

\`\`\`java
public class FinalAttribute {
  final int x = 10; // 'x' cannot be changed after initialization

  public static void main(String[] args) {
    FinalAttribute myObj = new FinalAttribute();
    // myObj.x = 25; // This would cause a compile-time error
    System.out.println(myObj.x); // Output: 10
  }
}
\`\`\`
'final' attributes must be initialized either at the time of declaration or within a constructor.

## The 'static' Keyword for Attributes (Class Attributes)

The 'static' keyword is used to declare attributes that belong to the class itself, rather than to any specific object of the class. There is only one copy of a static attribute, shared by all instances of the class.

\`\`\`java
public class StaticAttribute {
  String instanceName; // Instance attribute
  static String className = "MyStaticClass"; // Static attribute

  public StaticAttribute(String name) {
    this.instanceName = name;
  }

  public static void main(String[] args) {
    StaticAttribute obj1 = new StaticAttribute("Object 1");
    StaticAttribute obj2 = new StaticAttribute("Object 2");

    System.out.println("Obj1 instance name: " + obj1.instanceName); // Output: Object 1
    System.out.println("Obj2 instance name: " + obj2.instanceName); // Output: Object 2

    // Access static attribute directly via class name
    System.out.println("Class name (via class): " + StaticAttribute.className); // Output: MyStaticClass

    // You can also access static attributes via an object, but it's not recommended practice
    System.out.println("Class name (via obj1): " + obj1.className); // Output: MyStaticClass

    // Modifying a static attribute affects all objects
    StaticAttribute.className = "UpdatedStaticClass";
    System.out.println("Class name (after update): " + StaticAttribute.className); // Output: UpdatedStaticClass
    System.out.println("Class name (via obj1 after update): " + obj1.className); // Output: UpdatedStaticClass
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Encapsulation and Access Modifiers</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While you can directly access and modify 'public' attributes as shown, in real-world OOP, it's a best practice to make attributes 'private' and provide 'public' getter and setter methods to access and modify them. This is a core principle of Encapsulation, which you will learn about soon.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Static vs. Instance Attributes</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Confusing static and instance attributes is a common mistake. Remember: instance attributes are unique to each object, while static attributes are shared by all objects of the class. Access static attributes using the class name, not an object reference, for clarity and correctness.
    </div>
</div>
`;

export default function JavaAttributesPage() {
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
          prevLesson="java-classes-objects"
          nextLesson="java-class-methods"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
