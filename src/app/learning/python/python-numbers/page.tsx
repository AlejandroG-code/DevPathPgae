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
# Python Numbers

In Python, numbers are a fundamental data type used to store numerical values. Python supports three main numeric types:

1.  'int' (Integers)
2.  'float' (Floating-point numbers)
3.  'complex' (Complex numbers)

You can check the type of any number using the 'type()' function.

## 1. Integers ('int')

Integers are whole numbers, positive or negative, without decimals, and of **unlimited length**.

\`\`\`python
x = 1         # Positive integer
y = 12345678901234567890 # Large integer
z = -32       # Negative integer

print(type(x))
print(type(y))
print(type(z))
\`\`\`
**Output:**
<pre>
<code class="language-text">
<class 'int'>
<class 'int'>
<class 'int'>
</code>
</pre>

## 2. Floating-point numbers ('float')

Floats are numbers, positive or negative, containing one or more decimals.

\`\`\`python
x = 1.10      # Positive float
y = 1.0       # Float
z = -35.59    # Negative float

print(type(x))
print(type(y))
print(type(z))
\`\`\`
**Output:**
<pre>
<code class="language-text">
<class 'float'>
<class 'float'>
<class 'float'>
</code>
</pre>

Floats can also be scientific numbers with an "e" to indicate the power of 10.

\`\`\`python
x = 35e3    # 35 * 10^3 = 35000.0
y = 12E4    # 12 * 10^4 = 120000.0
z = -87.7e100 # -87.7 * 10^100

print(type(x))
print(type(y))
print(type(z))
\`\`\`
**Output:**
<pre>
<code class="language-text">
<class 'float'>
<class 'float'>
<class 'float'>
</code>
</pre>

## 3. Complex numbers ('complex')

Complex numbers are written with a "j" as the imaginary part.

\`\`\`python
x = 3 + 5j
y = 5j
z = -5j

print(type(x))
print(type(y))
print(type(z))
\`\`\`
**Output:**
<pre>
<code class="language-text">
<class 'complex'>
<class 'complex'>
<class 'complex'>
</code>
</pre>

## Type Conversion (Casting)

You can convert from one number type to another using functions like 'int()', 'float()', and 'complex()'.

\`\`\`python
x = 1    # int
y = 2.8  # float
z = 1j   # complex

# Convert from int to float:
a = float(x)

# Convert from float to int:
b = int(y)

# Convert from int to complex:
c = complex(x)

print(a)
print(b)
print(c)

print(type(a))
print(type(b))
print(type(c))
\`\`\`
**Output:**
<pre>
<code class="language-text">
1.0
2
(1+0j)
<class 'float'>
<class 'int'>
<class 'complex'>
</code>
</pre>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning!</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        When converting a float to an integer using 'int()', the decimal part is *truncated* (cut off), not rounded. For example, 'int(2.8)' becomes 2, not 3.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Understanding how Python handles different number types is crucial for accurate calculations. Use 'int' for whole numbers, 'float' for numbers with decimals, and 'complex' for advanced mathematical operations.
    </div>
</div>
`;

export default function PythonNumbersPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Prism core JS
    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      // Load Python language component after core is loaded
      const scriptPythonLang = document.createElement('script');
      scriptPythonLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js';
      scriptPythonLang.async = true;

      scriptPythonLang.onload = () => {
        // Highlight all code blocks after Python language component is loaded
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
          prevLesson="python-datatypes"
          nextLesson="python-casting"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
