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
# Python RegEx (Regular Expressions)

A RegEx, or Regular Expression, is a sequence of characters that forms a search pattern. RegEx can be used to check if a string contains the specified search pattern.

Python has a built-in package called 're', which can be used to work with Regular Expressions.

## The 're' Module

To use RegEx in Python, you need to import the 're' module.

\`\`\`python
import re
\`\`\`

## RegEx Functions

The 're' module offers several functions to perform operations using regular expressions:

-   're.search(pattern, string)': Searches the string for a match, and returns a Match object if there is a match. If there is more than one match, only the first occurrence of the match will be returned.
-   're.findall(pattern, string)': Returns a list containing all matches.
-   're.split(pattern, string, maxsplit=0)': Returns a list where the string has been split at each match.
-   're.sub(pattern, repl, string, count=0)': Replaces the matches with the text of your choice.
-   're.match(pattern, string)': Checks for a match only at the beginning of the string.

## Metacharacters

Metacharacters are characters with a special meaning:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Metacharacter</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A set of characters</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[a-m]</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Signals a special sequence (can also be used to escape special characters)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\d (digits)</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">.</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Any character (except newline)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">he.lo</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">^</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Starts with</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">^hello</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">$</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Ends with</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">world$</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">*</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Zero or more occurrences</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">aix*</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">+</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">One or more occurrences</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">aix+</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">?</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Zero or one occurrences</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">aix?</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">{}</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Exactly the specified number of occurrences</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">al{2}</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">|</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Either or</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">falls|stays</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">()</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Capture and group</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"></td>
    </tr>
  </tbody>
</table>

## Special Sequences

A special sequence is a '\\' followed by one of the characters, and has a special meaning:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Sequence</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\A</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match if the specified characters are at the beginning of the string</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\AThe</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\b</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where the specified characters are at the beginning or at the end of a word</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">r'\\b at the beginning, r'\\bain' at the end</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\B</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where the specified characters are present, but NOT at the beginning (or at the end) of a word</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"></td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\d</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where the string contains digits (0-9)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\d</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\D</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where the string DOES NOT contain digits</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\D</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\s</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where the string contains a whitespace character</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\s</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\S</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where the string DOES NOT contain a whitespace character</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\S</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\w</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where the string contains any word characters (a-z, A-Z, 0-9, and _)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\w</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\W</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where the string DOES NOT contain any word characters</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\W</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">\\Z</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match if the specified characters are at the end of the string</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">Spain\\Z</td>
    </tr>
  </tbody>
</table>

## Sets

A set is a set of characters inside a pair of square brackets '[]' with a special meaning:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Set</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[arn]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where one of the specified characters ('a', 'r', or 'n') are present</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[a-n]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match for any lower case character, alphabetically between 'a' and 'n'</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[^arn]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match for any character EXCEPT 'a', 'r', and 'n'</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[0123]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match where any of the specified digits (0, 1, 2, or 3) are present</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[0-9]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match for any digit between 0 and 9</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[0-5][0-9]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match for any two-digit numbers from 00 and 59</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[a-zA-Z]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns a match for any character from a to z lower case, or A to Z upper case</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm font-mono">[+]</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">In sets, '+' is not a metacharacter, means: return a match for any '+' character</td>
    </tr>
  </tbody>
</table>

## The 'search()' Function

The 'search()' function searches the string for a match, and returns a Match object if there is a match. If there is more than one match, only the first occurrence of the match will be returned.

\`\`\`python
import re

txt = "The rain in Spain falls mainly in the plain!"
x = re.search("^The.*plain!$", txt) # Checks if string starts with "The" and ends with "plain!"

if x:
  print("YES! We have a match!")
else:
  print("No match")
# Output: YES! We have a match!

# Find the first occurrence of "ai"
match_obj = re.search("ai", txt)
print(match_obj) # Output: <re.Match object; span=(5, 7), match='ai'>

# Get the starting and ending position of the first match
print(match_obj.span()) # Output: (5, 7)

# Get the string passed into the function
print(match_obj.string) # Output: The rain in Spain falls mainly in the plain!

# Get the part of the string where the match was found
print(match_obj.group()) # Output: ai
\`\`\`

## The 'findall()' Function

Returns a list containing all matches.

\`\`\`python
import re

txt = "The rain in Spain falls mainly in the plain!"
x = re.findall("ai", txt)
print(x) # Output: ['ai', 'ai', 'ai']

y = re.findall("Portugal", txt)
print(y) # Output: [] (empty list, no match)
\`\`\`

## The 'split()' Function

The 'split()' function returns a list where the string has been split at each match.

\`\`\`python
import re

txt = "The rain in Spain"
x = re.split("\\s", txt) # Split at each whitespace character
print(x) # Output: ['The', 'rain', 'in', 'Spain']

# Split only at the first occurrence
y = re.split("\\s", txt, 1)
print(y) # Output: ['The', 'rain in Spain']
\`\`\`

## The 'sub()' Function

The 'sub()' function replaces the matches with the text of your choice.

\`\`\`python
import re

txt = "The rain in Spain"
x = re.sub("\\s", "_", txt) # Replace all whitespace with underscore
print(x) # Output: The_rain_in_Spain

# Replace only the first 2 occurrences
y = re.sub("\\s", "_", txt, 2)
print(y) # Output: The_rain_in Spain
\`\`\`

## Raw Strings (r-strings)

It is common practice to use raw strings (prefixing the string literal with 'r') when working with regular expressions. This prevents backslashes from being interpreted as escape sequences by Python, ensuring they are passed directly to the regex engine.

\`\`\`python
import re

# Without raw string, '\\b' would be interpreted as backspace
# pattern = "\\bcat\\b" # Might cause unexpected behavior or syntax warnings
pattern = r"\\bcat\\b" # Matches "cat" as a whole word

text = "A cat sat on the mat."
match = re.search(pattern, text)
print(match.group() if match else "No match") # Output: cat
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">InfoCard: Compiling Regular Expressions</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For patterns that will be used frequently, it's more efficient to compile the regular expression into a regex object using 're.compile()'. This compiles the pattern once, allowing for faster reuse without recompilation.
        <br/><br/>
        Example:
        <pre><code class="language-python">
import re
compiled_pattern = re.compile(r"\\d+") # Compile digit pattern
text = "The year is 2024 and version is 1.0"
matches = compiled_pattern.findall(text)
print(matches) # Output: ['2024', '1', '0']
        </code></pre>
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Regular expressions are incredibly powerful for pattern matching and text manipulation. They can be complex, so start with simple patterns and gradually build up. Online regex testers and visualizers can be very helpful for debugging and understanding your patterns.
    </div>
</div>
`;

export default function PythonRegexPage() {
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
          prevLesson="python-json"
          nextLesson="python-pip"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
