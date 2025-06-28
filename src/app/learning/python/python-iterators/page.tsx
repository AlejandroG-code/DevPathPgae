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
# Python Iterators

An iterator is an object that contains a countable number of values. An iterator is an object that can be iterated upon, meaning that you can traverse through all the values. In Python, an iterator is an object which implements the iterator protocol, which consists of the methods '__iter__()' and '__next__()'.

## What is an Iterator?

Almost all collections in Python (lists, tuples, dictionaries, sets, strings) are 'iterable' objects. They are containers from which you can get an iterator.

-   **Iterable:** An object that can return an iterator (e.g., list, tuple, string).
-   **Iterator:** An object that can be iterated upon. It maintains state and knows where it is in the iteration sequence.

You can get an iterator from an iterable using the built-in 'iter()' function.

\`\`\`python
my_tuple = ("apple", "banana", "cherry")
my_iterator = iter(my_tuple)

print(next(my_iterator)) # Output: apple
print(next(my_iterator)) # Output: banana
print(next(my_iterator)) # Output: cherry

# Calling next() again will raise StopIteration
# print(next(my_iterator))
\`\`\`

## Looping Through an Iterator

The 'for' loop actually creates an iterator object and executes the 'next()' method for each loop.

\`\`\`python
my_string = "Python"
for char in my_string:
  print(char)
\`\`\`
**Output:**
<pre>
<code class="language-text">
P
y
t
h
o
n
</code>
</pre>

Behind the scenes, this 'for' loop is doing something similar to:

\`\`\`python
my_string = "Python"
my_iterator = iter(my_string)

while True:
  try:
    char = next(my_iterator)
    print(char)
  except StopIteration:
    break
\`\`\`

## Creating Your Own Iterator

To create an object/class as an iterator, you have to implement the '__iter__()' and '__next__()' methods to your object.

-   '__iter__()': Returns the iterator object itself. If your object is already an iterator, it simply returns 'self'. This method is called when 'iter()' is called on your object.
-   '__next__()': Returns the next item from the iteration. It must raise a 'StopIteration' exception when there are no more items to return.

\`\`\`python
class MyNumbers:
  def __iter__(self):
    self.a = 1 # Initialize counter
    return self

  def __next__(self):
    if self.a <= 5: # Define termination condition
      x = self.a
      self.a += 1
      return x
    else:
      raise StopIteration # Signal end of iteration

my_class_obj = MyNumbers()
my_iter = iter(my_class_obj)

print(next(my_iter)) # Output: 1
print(next(my_iter)) # Output: 2
# ... and so on until StopIteration is raised
\`\`\`

You can then use your custom iterator in a 'for' loop:

\`\`\`python
for x in my_class_obj: # A new iterator will be created when the for loop starts
  print(x)
\`\`\`
**Output:**
<pre>
<code class="language-text">
1
2
3
4
5
</code>
</pre>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">InfoCard: The Iterator Protocol</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The iterator protocol is how Python internally handles iteration. Any object that implements '__iter__()' and '__next__()' (or just '__iter__()' if it returns another object that implements '__next__()') is considered an iterator. Generators (covered in advanced topics) are a simpler way to create iterators.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Understanding iterators is key to grasping how loops work in Python and building efficient data processing pipelines. They allow you to process data one element at a time, which is memory-efficient for large datasets, as the entire collection doesn't need to be loaded into memory at once.
    </div>
</div>
`;

export default function PythonIteratorsPage() {
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
          prevLesson="python-inheritance"
          nextLesson="python-scope"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
