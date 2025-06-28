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
# Python JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. JSON is a text format that is completely language independent.

Python has a built-in package called 'json', which can be used to work with JSON data.

## JSON to Python (Decoding JSON)

If you have a JSON string, you can parse it by using the 'json.loads()' method. The result will be a Python dictionary.

\`\`\`python
import json

# some JSON string
json_string = '{ "name":"John", "age":30, "city":"New York"}'

# parse json_string
python_dict = json.loads(json_string)

print(python_dict)        # Output: {'name': 'John', 'age': 30, 'city': 'New York'}
print(type(python_dict))  # Output: <class 'dict'>

print(python_dict["age"]) # Access elements like a dictionary
# Output: 30
\`\`\`

## Python to JSON (Encoding JSON)

If you have a Python object (dictionary or list), you can convert it into a JSON string by using the 'json.dumps()' method.

\`\`\`python
import json

# a Python dictionary
python_dict = {
  "name": "Jane",
  "age": 25,
  "city": "London"
}

# convert into JSON string
json_string = json.dumps(python_dict)

print(json_string)       # Output: {"name": "Jane", "age": 25, "city": "London"}
print(type(json_string)) # Output: <class 'str'>
\`\`\`

### Formatting the JSON Output

The 'json.dumps()' method has parameters to make the output more readable.

-   'indent': Use the 'indent' parameter to define the number of indents.
-   'separators': Use the 'separators' parameter to change the default separators.
-   'sort_keys': Use the 'sort_keys' parameter to specify if the result should be sorted by key or not.

\`\`\`python
import json

python_data = {
  "name": "Alice",
  "age": 28,
  "isStudent": False,
  "courses": ["Math", "Science"],
  "address": {
    "street": "123 Main St",
    "zip": "10001"
  }
}

# Pretty print JSON with 4-space indent
formatted_json = json.dumps(python_data, indent=4)
print("Formatted JSON:")
print(formatted_json)
# Output:
# Formatted JSON:
# {
#     "name": "Alice",
#     "age": 28,
#     "isStudent": false,
#     "courses": [
#         "Math",
#         "Science"
#     ],
#     "address": {
#         "street": "123 Main St",
#         "zip": "10001"
#     }
# }

# JSON with specific separators and sorted keys
compact_json = json.dumps(python_data, indent=None, separators=(",", ":"), sort_keys=True)
print("\nCompact JSON (sorted keys):")
print(compact_json)
# Output:
# Compact JSON (sorted keys):
# {"address":{"street":"123 Main St","zip":"10001"},"age":28,"courses":["Math","Science"],"isStudent":false,"name":"Alice"}
\`\`\`

## Python Objects to JSON Equivalents

When converting from Python to JSON, Python objects are converted into JSON (JavaScript) equivalents:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Python</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">JSON</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">dict</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Object</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">list, tuple</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Array</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">str</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">String</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">int, float</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Number</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">True</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">true</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">False</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">false</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">None</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">null</td>
    </tr>
  </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning! Non-JSON Compatible Types</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The 'json' module cannot directly handle all Python types. For example, 'set' objects, custom class instances, or 'datetime' objects are not directly JSON serializable. You'll need to convert them to JSON-compatible types (e.g., list for set, string for datetime) or provide a custom JSON encoder.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        JSON is the de facto standard for data exchange on the web. Python's 'json' module makes it incredibly easy to work with JSON data, enabling seamless communication between your Python applications and web services or other systems. Always use 'indent' when pretty-printing JSON for better human readability during development.
    </div>
</div>
`;

export default function PythonJsonPage() {
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
          prevLesson="python-math"
          nextLesson="python-regex"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
