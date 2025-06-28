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
# Python Operators

Operators are special symbols that perform operations on variables and values. They are the backbone of any computation or logical decision in Python.

## Types of Operators

Python divides operators into the following groups:

1.  Arithmetic Operators
2.  Assignment Operators
3.  Comparison Operators
4.  Logical Operators
5.  Identity Operators
6.  Membership Operators
7.  Bitwise Operators

## 1. Arithmetic Operators
Used with numeric values to perform common mathematical operations.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
<thead class="bg-gray-700">
<tr>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Name</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">+</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Addition</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x + y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">-</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Subtraction</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x - y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">*</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Multiplication</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x * y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">/</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Division</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x / y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">%</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Modulus</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x % y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">**</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Exponentiation</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x ** y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">//</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Floor division</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x // y</td>
</tr>
</tbody>
</table>

\`\`\`python
x = 15
y = 4

print(f"x + y = {x + y}")  # 19
print(f"x - y = {x - y}")  # 11
print(f"x * y = {x * y}")  # 60
print(f"x / y = {x / y}")  # 3.75
print(f"x % y = {x % y}")  # 3 (remainder of 15/4)
print(f"x ** y = {x ** y}") # 15^4 = 50625
print(f"x // y = {x // y}") # 3 (floor division, rounds down to nearest whole number)
\`\`\`

## 2. Assignment Operators

Used to assign values to variables.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
<thead class="bg-gray-700">
<tr>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Same As</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = 5</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = 5</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">+=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x += 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x + 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">-=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x -= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x - 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">*=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x *= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x * 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">/=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x /= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x / 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">%=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x %= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x % 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">**=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x **= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x ** 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">//=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x //= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x // 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">&=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x &= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x & 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">|=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x |= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x | 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">^=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x ^= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x ^ 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">>>=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x >>= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x >> 3</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">&lt;&lt;=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x &lt;&lt;= 3</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x = x &lt;&lt; 3</td>
</tr>
</tbody>
</table>

\`\`\`python
x = 10
x += 5 # x is now 15
print(x)

y = 20
y /= 4 # y is now 5.0
print(y)
\`\`\`

## 3. Comparison Operators

Used to compare two values. They return either 'True' or 'False'.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
<thead class="bg-gray-700">
<tr>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Name</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">==</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Equal</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x == y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">!=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Not equal</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x != y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">></td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Greater than</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x > y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">&lt;</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less than</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x &lt; y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">>=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Greater than or equal to</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x >= y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">&lt;=</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less than or equal to</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x &lt;= y</td>
</tr>
</tbody>
</table>

\`\`\`python
a = 10
b = 12

print(f"a == b: {a == b}") # False
print(f"a != b: {a != b}") # True
print(f"a < b: {a < b}")   # True
print(f"a >= b: {a >= b}") # False
\`\`\`

## 4. Logical Operators

Used to combine conditional statements.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
<thead class="bg-gray-700">
<tr>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">and</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'True' if both statements are true</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x &lt; 5 and x &lt; 10</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">or</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'True' if one of the statements is true</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x &lt; 5 or x &lt; 4</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">not</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Reverses the result, returns 'False' if the result is true</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">not(x &lt; 5 and x &lt; 10)</td>
</tr>
</tbody>
</table>

\`\`\`python
age = 25
has_license = True

if age >= 18 and has_license:
    print("Eligible to drive.")
else:
    print("Not eligible to drive.")

score = 85
if score < 50 or score > 90:
    print("Score is either very low or very high.")
else:
    print("Score is average.")
\`\`\`

## 5. Identity Operators

Used to compare the objects, not if they are equal, but if they are actually the same object, with the same memory location.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
<thead class="bg-gray-700">
<tr>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">is</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'True' if both variables are the same object</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x is y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">is not</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'True' if both variables are not the same object</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x is not y</td>
</tr>
</tbody>
</table>

\`\`\`python
list1 = [1, 2, 3]
list2 = [1, 2, 3]
list3 = list1 # list3 now points to the same object as list1

print(list1 is list2)     # Output: False (different objects, even if content is same)
print(list1 == list2)     # Output: True (content is same)
print(list1 is list3)     # Output: True (same object)
\`\`\`

## 6. Membership Operators

Used to test if a sequence is presented in an object.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
<thead class="bg-gray-700">
<tr>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">in</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'True' if a sequence with the specified value is present in the object</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x in y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">not in</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Returns 'True' if a sequence with the specified value is not present in the object</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x not in y</td>
</tr>
</tbody>
</table>

\`\`\`python
fruits = ["apple", "banana", "cherry"]

print("banana" in fruits)     # Output: True
print("grape" not in fruits)  # Output: True
\`\`\`

## 7. Bitwise Operators

Used to compare (binary) numbers. These operate on the individual bits of integer operands.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
<thead class="bg-gray-700">
<tr>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Name</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
<th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
</tr>
</thead>
<tbody>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">&</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">AND</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Sets each bit to 1 if both bits are 1</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x & y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">|</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">OR</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Sets each bit to 1 if one of two bits is 1</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x | y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">^</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">XOR</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Sets each bit to 1 if only one of two bits is 1</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x ^ y</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">~</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">NOT</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Inverts all the bits</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">~x</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">&lt;&lt;</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Zero fill left shift</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Shift left by pushing zeros in from the right and let the leftmost bits fall off</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x &lt;&lt; 2</td>
</tr>
<tr>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">>></td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Signed right shift</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Shift right by pushing copies of the leftmost bit in from the left, and let the rightmost bits fall off</td>
<td class="p-3 border-b border-gray-700 text-gray-300 text-sm">x >> 2</td>
</tr>
</tbody>
</table>

\`\`\`python
a = 60            # 0011 1100
b = 13            # 0000 1101

print(f"a & b = {a & b}") # 12 (0000 1100)
print(f"a | b = {a | b}") # 61 (0011 1101)
print(f"a ^ b = {a ^ b}") # 49 (0011 0001)
print(f"~a = {~a}")       # -61 (depends on system's representation of negative numbers)
print(f"a << 2 = {a << 2}") # 240 (1111 0000)
print(f"a >> 2 = {a >> 2}") # 15 (0000 1111)
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Operators are the verbs of your Python programs. Master the different types and their precedence to build complex expressions and control program flow effectively. Pay special attention to comparison and logical operators for decision-making.
    </div>
</div>
`;

export default function PythonOperatorsPage() {
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
          prevLesson="python-booleans"
          nextLesson="python-lists"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
