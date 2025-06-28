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
# Python If...Else

Conditional statements are fundamental to programming logic. They allow your program to make decisions and execute different blocks of code based on whether a condition is true or false. Python uses 'if', 'elif' (else if), and 'else' keywords for conditional logic.

## If Statement

An 'if' statement is used to execute a block of code only if a specified condition is true.

\`\`\`python
a = 33
b = 200

if b > a:
  print("b is greater than a")
# Output: b is greater than a
\`\`\`

## Elif (Else If)

The 'elif' keyword is Python's way of saying "if the previous conditions were not true, then try this condition".

\`\`\`python
a = 33
b = 33

if b > a:
  print("b is greater than a")
elif a == b:
  print("a and b are equal")
# Output: a and b are equal
\`\`\`

## Else

The 'else' keyword catches anything which isn't caught by the preceding conditions.

\`\`\`python
a = 200
b = 33

if b > a:
  print("b is greater than a")
elif a == b:
  print("a and b are equal")
else:
  print("a is greater than b")
# Output: a is greater than b
\`\`\`

## Short Hand If (Ternary Operator)

If you have only one statement to execute, one for 'if', and one for 'else', you can put it all on one line. This is often called a ternary operator.

\`\`\`python
a = 200
b = 33

print("A") if a > b else print("B") # Output: A

# With elif
c = 33
d = 33
print("C is greater") if c > d else print("C and D are equal") if c == d else print("D is greater")
# Output: C and D are equal
\`\`\`

## Logical Operators ('and', 'or', 'not')

You can combine conditional statements using logical operators.

### 'and'

The 'and' keyword is a logical operator, and is used to combine conditional statements. Returns True if both statements are true.

\`\`\`python
a = 200
b = 33
c = 500

if a > b and c > a:
  print("Both conditions are True")
# Output: Both conditions are True
\`\`\`

### 'or'

The 'or' keyword is a logical operator, and is used to combine conditional statements. Returns True if one of the statements is true.

\`\`\`python
a = 200
b = 33
c = 500

if a > b or a > c:
  print("At least one of the conditions is True")
# Output: At least one of the conditions is True
\`\`\`

### 'not'

The 'not' keyword is a logical operator, and is used to reverse the result of the conditional statement.

\`\`\`python
a = 33
b = 200

if not b > a:
  print("b is NOT greater than a")
else:
  print("b IS greater than a")
# Output: b IS greater than a
\`\`\`

## Nested If Statements

You can have 'if' statements inside 'if' statements, which is called nesting.

\`\`\`python
x = 41

if x > 10:
  print("Above ten,")
  if x > 20:
    print("and also above 20!")
  else:
    print("but not above 20.")
# Output:
# Above ten,
# and also above 20!
\`\`\`

## The 'pass' Statement

'if' statements cannot be empty, but if for some reason you have an 'if' statement with no content, put in the 'pass' statement to avoid getting an error.

\`\`\`python
a = 33
b = 200

if b > a:
  pass # This does nothing, but allows the 'if' block to be empty
else:
  print("b is not greater than a")
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Conditional statements are the decision-makers of your code. Use 'if', 'elif', and 'else' to control program flow based on logical conditions, and combine them with 'and', 'or', 'not' for more complex decision-making.
    </div>
</div>
`;

export default function PythonIfElsePage() {
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
          prevLesson="python-dictionaries"
          nextLesson="python-while-loops"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
