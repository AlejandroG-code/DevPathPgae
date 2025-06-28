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
# Python Inheritance

Inheritance is a fundamental concept in Object-Oriented Programming (OOP) that allows a class (child class) to inherit properties and methods from another class (parent class). This promotes code reusability and establishes a natural "is-a" relationship between classes.

-   **Parent Class (Base Class):** The class being inherited from.
-   **Child Class (Derived Class):** The class that inherits from another class.

## Creating a Parent Class

First, let's create a class that will serve as the parent.

\`\`\`python
class Person:
  def __init__(self, fname, lname):
    self.firstname = fname
    self.lastname = lname

  def printname(self):
    print(f"Name: {self.firstname} {self.lastname}")

# Example usage of the parent class
person1 = Person("John", "Doe")
person1.printname() # Output: Name: John Doe
\`\`\`

## Creating a Child Class

To create a class that inherits all the properties and methods from the 'Person' class, send the 'Person' class as a parameter when creating the 'Student' class.

\`\`\`python
class Student(Person): # Student inherits from Person
  pass # Use 'pass' if you don't want to add any other properties or methods yet

# Create an object of the Student class
student1 = Student("Mike", "Olsen")
student1.printname() # Output: Name: Mike Olsen (inherits printname from Person)
\`\`\`

Now the 'Student' class has the same properties and methods as the 'Person' class.

## Add the '__init__()' Function to Child Class

When you add the '__init__()' function to a child class, the child class will no longer inherit the parent's '__init__()' function. The child's '__init__()' will override the parent's.

To keep the inheritance of the parent's '__init__()' function, you need to explicitly call the parent's '__init__()' or use the 'super()' function.

### Calling Parent's '__init__()' Directly

\`\`\`python
class Student(Person):
  def __init__(self, fname, lname, year):
    # Call the parent class's __init__ method directly
    Person.__init__(self, fname, lname) 
    self.graduationyear = year

  def welcome(self):
    print(f"Welcome {self.firstname} {self.lastname} to the class of {self.graduationyear}")

student2 = Student("Emily", "Brown", 2024)
student2.printname() # Output: Name: Emily Brown
student2.welcome()   # Output: Welcome Emily Brown to the class of 2024
\`\`\`

### Using the 'super()' Function

The 'super()' function is a special function that will make the child class inherit all the methods and properties from its parent. Using 'super()' makes the code more maintainable, as you don't need to explicitly refer to the parent class name.

\`\`\`python
class Student(Person):
  def __init__(self, fname, lname, year):
    super().__init__(fname, lname) # Calls Person's __init__ method
    self.graduationyear = year

  def welcome(self):
    print(f"Welcome {self.firstname} {self.lastname} from the class of {self.graduationyear}")

student3 = Student("Liam", "Jones", 2025)
student3.printname() # Output: Name: Liam Jones
student3.welcome()   # Output: Welcome Liam Jones from the class of 2025
\`\`\`

## Adding Methods to Child Class

You can add new methods to the child class, or override existing methods from the parent class.

\`\`\`python
class Student(Person):
  def __init__(self, fname, lname, year):
    super().__init__(fname, lname)
    self.graduationyear = year

  def printname(self): # Overriding the parent's printname method
    print(f"Student Name: {self.firstname} {self.lastname}")

  def study(self): # New method specific to Student
    print(f"{self.firstname} is studying hard for {self.graduationyear} exams.")

student4 = Student("Olivia", "Davis", 2023)
student4.printname() # Output: Student Name: Olivia Davis (child's method)
student4.study()     # Output: Olivia is studying hard for 2023 exams.

# Original parent method still exists for Person objects
parent_person = Person("Alice", "Wonder")
parent_person.printname() # Output: Name: Alice Wonder
\`\`\`

## Multiple Inheritance

Python also supports multiple inheritance, where a class can inherit from more than one parent class.

\`\`\`python
class Father:
    def skill_father(self):
        print("Father has engineering skills.")

class Mother:
    def skill_mother(self):
        print("Mother has artistic skills.")

class Child(Father, Mother): # Child inherits from both Father and Mother
    def child_skills(self):
        print("Child learns from both parents.")

baby = Child()
baby.skill_father()   # Output: Father has engineering skills.
baby.skill_mother()   # Output: Mother has artistic skills.
baby.child_skills()   # Output: Child learns from both parents.
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Method Resolution Order (MRO)</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        With multiple inheritance, if both parent classes have methods with the same name, Python follows a specific Method Resolution Order (MRO) to determine which method to call. This can sometimes lead to complex debugging. It's often preferred to use composition over multiple inheritance when possible to avoid such complexities.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Inheritance is a powerful tool for building hierarchical relationships between classes and reusing code. Use it when you can clearly define an "is-a" relationship (e.g., a 'Student' is a 'Person').
    </div>
</div>
`;

export default function PythonInheritancePage() {
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
          prevLesson="python-classes"
          nextLesson="python-iterators"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
