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
# Python Classes and Objects

Python is an object-oriented programming language. Almost everything in Python is an object, with its properties and methods. A 'Class' is like an object constructor, or a "blueprint" for creating objects.

## Creating a Class

To create a class, use the 'class' keyword.

\`\`\`python
class MyClass:
  x = 5

print(MyClass)
# Output: <class '__main__.MyClass'> (or similar memory address)
\`\`\`

## Creating Objects

Now we can use the class named 'MyClass' to create objects.

\`\`\`python
class MyClass:
  x = 5

p1 = MyClass() # Create an object named p1
print(p1.x)    # Access the attribute x of the object p1
# Output: 5
\`\`\`

## The '__init__()' Function

All classes have a function called '__init__()', which is always executed when the class is being initiated. Use the '__init__()' function to assign values to object properties, or other operations that are necessary to do when the object is being created.

\`\`\`python
class Person:
  def __init__(self, name, age):
    self.name = name # Attribute for name
    self.age = age   # Attribute for age

p1 = Person("John", 36) # Create an object, __init__ is called automatically

print(p1.name) # Output: John
print(p1.age)  # Output: 36
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">The 'self' Parameter</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The 'self' parameter is a reference to the current instance of the class, and is used to access variables that belong to the class. It must be the first parameter of any function in the class. It does not have to be named 'self', you can call it whatever you like, but it is conventional to call it 'self'.
    </div>
</div>

## Object Methods

Objects can also contain methods. Methods in objects are functions that belong to the object.

\`\`\`python
class Person:
  def __init__(self, name, age):
    self.name = name
    self.age = age

  def myfunc(self): # A method belonging to the Person class
    print(f"Hello, my name is {self.name} and I am {self.age} years old.")

p1 = Person("Sarah", 28)
p1.myfunc() # Call the method
# Output: Hello, my name is Sarah and I am 28 years old.
\`\`\`

## Modifying Object Properties

You can modify properties on objects.

\`\`\`python
p1.age = 40 # Change the age attribute
print(p1.age) # Output: 40
\`\`\`

## Deleting Object Properties and Objects

You can delete object properties or objects themselves using the 'del' keyword.

\`\`\`python
# To delete an object's property
# del p1.age 
# print(p1.age) # This would raise an AttributeError

# To delete an object
# del p1
# print(p1) # This would raise a NameError
\`\`\`

## Inheritance

Inheritance allows us to define a class that inherits all the methods and properties from another class.
-   **Parent class:** The class being inherited from, also called base class.
-   **Child class:** The class that inherits from another class, also called derived class.

### Create a Parent Class

\`\`\`python
class Person:
  def __init__(self, fname, lname):
    self.firstname = fname
    self.lastname = lname

  def printname(self):
    print(f"Name: {self.firstname} {self.lastname}")

x = Person("John", "Doe")
x.printname() # Output: Name: John Doe
\`\`\`

### Create a Child Class

To create a class that inherits functionality from another class, send the parent class as a parameter when creating the child class.

\`\`\`python
class Student(Person): # Student inherits from Person
  pass # Use 'pass' if you don't want to add any other properties or methods for now

s1 = Student("Mike", "Olsen")
s1.printname() # Output: Name: Mike Olsen (inherits printname from Person)
\`\`\`

### Add the '__init__()' Function to Child Class

When you add the '__init__()' function to a child class, the child class will no longer inherit the parent's '__init__()' function. To keep the inheritance of the parent's '__init__()' function, call the parent's '__init__()' explicitly or use the 'super()' function.

\`\`\`python
class Student(Person):
  def __init__(self, fname, lname, graduationyear):
    super().__init__(fname, lname) # Call parent's __init__
    self.graduationyear = graduationyear # Add new attribute

  def welcome(self):
    print(f"Welcome {self.firstname} {self.lastname} to the class of {self.graduationyear}")

s1 = Student("Emily", "Smith", 2024)
s1.printname() # Output: Name: Emily Smith
s1.welcome()   # Output: Welcome Emily Smith to the class of 2024
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Classes and objects are the core of Object-Oriented Programming (OOP) in Python. They allow you to structure your code in a modular, reusable, and scalable way by modeling real-world entities and their behaviors.
    </div>
</div>
`;

export default function PythonClassesPage() {
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
          prevLesson="python-arrays"
          nextLesson="python-inheritance"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
