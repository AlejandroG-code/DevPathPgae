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
# Python For Loops

A 'for' loop is used for iterating over a sequence (that is, a list, a tuple, a dictionary, a set, or a string). It is not as the 'for' keyword in other programming languages, but works more like an iterator method as found in other object-orientated programming languages.

With the 'for' loop we can execute a set of statements, once for each item in a list, tuple, set etc.

## Looping Through a List

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
\`\`\`
**Output:**
<pre>
<code class="language-text">
apple
banana
cherry
</code>
</pre>

## Looping Through a String

Strings are also iterable objects, they contain a sequence of characters.

\`\`\`python
for x in "banana":
  print(x)
\`\`\`
**Output:**
<pre>
<code class="language-text">
b
a
n
a
n
a
</code>
</pre>

## The 'break' Statement

With the 'break' statement, we can stop the loop before it has looped through all the items.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
  if x == "banana":
    break
\`\`\`
**Output:**
<pre>
<code class="language-text">
apple
banana
</code>
</pre>

You can also place the 'break' before the print:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  if x == "banana":
    break
  print(x)
\`\`\`
**Output:**
<pre>
<code class="language-text">
apple
</code>
</pre>

## The 'continue' Statement

With the 'continue' statement, we can stop the current iteration of the loop, and continue with the next.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  if x == "banana":
    continue # Skip 'banana'
  print(x)
\`\`\`
**Output:**
<pre>
<code class="language-text">
apple
cherry
</code>
</pre>

## The 'range()' Function

To loop through a set of code a specified number of times, we can use the 'range()' function. The 'range()' function returns a sequence of numbers, starting from 0 by default, and increments by 1 (by default), and ends at a specified number.

\`\`\`python
for x in range(6): # Numbers from 0 to 5
  print(x)
\`\`\`
**Output:**
<pre>
<code class="language-text">
0
1
2
3
4
5
</code>
</pre>

The 'range()' function defaults to 0 as a starting value, however you can specify the starting value by adding a parameter: 'range(2, 6)' (meaning values from 2 to 5).

\`\`\`python
for x in range(2, 6): # Numbers from 2 to 5
  print(x)
\`\`\`
**Output:**
<pre>
<code class="language-text">
2
3
4
5
</code>
</pre>

The 'range()' function defaults to increment the sequence by 1, however you can specify the increment value by adding a third parameter: 'range(2, 30, 3)' (meaning numbers from 2 to 29, increment by 3).

\`\`\`python
for x in range(2, 30, 3): # Numbers from 2 to 29, step by 3
  print(x)
\`\`\`
**Output:**
<pre>
<code class="language-text">
2
5
8
11
14
17
20
23
26
29
</code>
</pre>

## Else in For Loop

The 'else' keyword in a 'for' loop specifies a block of code to be executed when the loop is finished.

\`\`\`python
for x in range(6):
  print(x)
else:
  print("Finally finished!")
\`\`\`
**Output:**
<pre>
<code class="language-text">
0
1
2
3
4
5
Finally finished!
</code>
</pre>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Important Note</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The 'else' block will **not** be executed if the loop is terminated by a 'break' statement.
    </div>
</div>

\`\`\`python
for x in range(6):
  if x == 3:
    break
  print(x)
else:
  print("This will NOT run if break is hit!")
# Output:
# 0
# 1
# 2
\`\`\`

## Nested Loops

A nested loop is a loop inside a loop. The "inner loop" will be executed one time for each iteration of the "outer loop".

\`\`\`python
adj = ["red", "big", "tasty"]
fruits = ["apple", "banana", "cherry"]

for x in adj:
  for y in fruits:
    print(x, y)
\`\`\`
**Output:**
<pre>
<code class="language-text">
red apple
red banana
red cherry
big apple
big banana
big cherry
tasty apple
tasty banana
tasty cherry
</code>
</pre>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        'For' loops are your go-to for iterating over collections. Understand how to use them with lists, strings, and the 'range()' function to control flow efficiently. Remember 'break' and 'continue' for fine-grained control over iterations.
    </div>
</div>
`;

export default function PythonForLoopsPage() {
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
          prevLesson="python-while-loops"
          nextLesson="python-functions"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
