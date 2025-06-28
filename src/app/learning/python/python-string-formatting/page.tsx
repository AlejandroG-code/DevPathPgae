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
# Python String Formatting

String formatting is crucial for creating dynamic and readable text output. Python provides several ways to format strings, from older methods to more modern and powerful techniques.

## 1. f-strings (Formatted String Literals - Python 3.6+)

f-strings are the most modern and recommended way to format strings in Python. They offer a concise and readable way to embed expressions inside string literals.

**Syntax:** Prefix the string literal with 'f' or 'F'. Variables and expressions can be placed inside curly braces '{}'.

\`\`\`python
name = "Alice"
age = 30
salary = 50000.75

# Basic f-string
message = f"Hello, my name is {name} and I am {age} years old."
print(message) # Output: Hello, my name is Alice and I am 30 years old.

# Expressions inside f-strings
print(f"Next year, {name} will be {age + 1} years old.") # Output: Next year, Alice will be 31 years old.

# Formatting numbers
print(f"Her salary is $\{salary:.2f}") # Output: Her salary is $50000.75 (2 decimal places)
print(f"Her salary is $\{salary:,.2f}") # Output: Her salary is $50,000.75 (with comma separator)

# Padding and alignment
product = "Laptop"
price = 1200
print(f"{product:<10} | $\{price:>10.2f}") # Left-align product, right-align price
# Output:
# Laptop     |  $1200.00
\`\`\`

## 2. The 'str.format()' Method

The 'str.format()' method is an older but still very common way to format strings. It's more versatile than the '%' operator and handles more complex formatting.

**Syntax:** Use curly braces '{}' as placeholders in the string, and then call the '.format()' method on the string, passing the values as arguments.

\`\`\`python
# Positional arguments
message = "Hello, my name is {} and I am {} years old.".format("Bob", 25)
print(message) # Output: Hello, my name is Bob and I am 25 years old.

# Numbered placeholders
message_numbered = "The {0} is {1} and the {1} is {0}.".format("fox", "quick")
print(message_numbered) # Output: The fox is quick and the quick is fox.

# Keyword arguments
order_summary = "Order: {item}, Quantity: {qty}, Price: $\{price:.2f}".format(
    item="Book", qty=2, price=29.99
)
print(order_summary) # Output: Order: Book, Quantity: 2, Price: $29.99

# Align and pad
formatted_table = "{:<10} {:>10}".format("Item", "Cost")
print(formatted_table)
print("{:<10} {:>10.2f}".format("Pencils", 1.50))
print("{:<10} {:>10.2f}".format("Pens", 5.75))
# Output:
# Item         Cost
# Pencils         1.50
# Pens            5.75
\`\`\`

## 3. The '%' Operator (Old Style Formatting)

This is the oldest method for string formatting in Python, inherited from C's 'printf()' function. While still functional, it's generally discouraged for new code in favor of f-strings or '.format()'.

**Syntax:** Use format specifiers like '%s' (string), '%d' (integer), '%f' (float) in the string, then follow the string with a '%' and a tuple of values.

\`\`\`python
name = "Charlie"
age = 40
height = 1.80

# Basic usage
message = "My name is %s and I am %d years old." % (name, age)
print(message) # Output: My name is Charlie and I am 40 years old.

# Floating point precision
price = 123.45678
print("The price is %.2f" % price) # Output: The price is 123.46 (rounds)

# Padding and alignment
item = "Keyboard"
cost = 75
print("%-15s %10.2f" % (item, cost)) # Left-align string, right-align float
# Output: Keyboard            75.00
\`\`\`
<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Use f-strings for New Code</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While '.format()' and the '%' operator still work, **f-strings are generally preferred for new code** due to their conciseness, readability, and performance benefits. You might encounter the older methods in legacy codebases, but stick to f-strings for modern Python.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Choose the string formatting method that best suits your project's Python version and style guide. For Python 3.6+, f-strings offer the best combination of readability and power. Practice with them to quickly master dynamic string creation.
    </div>
</div>
`;

export default function PythonStringFormattingPage() {
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
          prevLesson="python-user-input"
          nextLesson="python-file-handling"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
