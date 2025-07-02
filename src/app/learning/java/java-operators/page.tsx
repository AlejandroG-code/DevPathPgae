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
# Java Operators

Operators are special symbols that perform operations on one or more operands (variables or values). They are the building blocks of any programming language, allowing you to manipulate data and make decisions.

## Types of Operators in Java

Java provides a rich set of operators, which can be broadly categorized as:

1.  **Arithmetic Operators**
2.  **Assignment Operators**
3.  **Comparison (Relational) Operators**
4.  **Logical Operators**
5.  **Bitwise Operators** (Less common for beginners, but good to know)
6.  **Conditional (Ternary) Operator**

---

## 1. Arithmetic Operators

Arithmetic operators are used to perform common mathematical operations.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Result</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&#43;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Addition: Adds two operands</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a &#43; b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">13</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'-'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Subtraction: Subtracts the right operand from the left</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a - b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">7</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'*'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Multiplication: Multiplies two operands</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a * b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">30</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'/'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Division: Divides the left operand by the right</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a / b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">3</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Modulus: Returns the remainder of a division</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a % b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">1</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&#43;&#43;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Increment: Increases the value of an operand by 1</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a&#43;&#43;' (a becomes 11)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"></td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'--'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Decrement: Decreases the value of an operand by 1</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'b--' (b becomes 2)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm"></td>
        </tr>
    </tbody>
</table>

**Example:**

\`\`\`java
public class ArithmeticOperators {
  public static void main(String[] args) {
    int a = 10, b = 3;

    System.out.println("a + b = " + (a + b)); // 13
    System.out.println("a - b = " + (a - b)); // 7
    System.out.println("a * b = " + (a * b)); // 30
    System.out.println("a / b = " + (a / b)); // 3 (integer division)
    System.out.println("a % b = " + (a % b)); // 1

    a++; // a becomes 11
    System.out.println("a after increment = " + a); // 11

    b--; // b becomes 2
    System.out.println("b after decrement = " + b); // 2
  }
}
\`\`\`

---

## 2. Assignment Operators

Assignment operators are used to assign values to variables. The most basic assignment operator is '='.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Same as</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = 5'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = 5'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&#43;='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x &#43;= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x &#43; 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'-='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x -= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x - 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'*='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x *= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x * 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'/='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x /= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x / 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x %= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x % 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&amp;='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x &amp;= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x &amp; 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'|='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x |= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x | 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'^='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x ^= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x ^ 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&gt;&gt;='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x &gt;&gt;= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x &gt;&gt; 3'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&lt;&lt;='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x &lt;&lt;= 3'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x = x &lt;&lt; 3'</td>
        </tr>
    </tbody>
</table>

**Example:**

\`\`\`java
public class AssignmentOperators {
  public static void main(String[] args) {
    int x = 10;
    System.out.println("Initial x: " + x); // 10

    x += 5; // x = x + 5;
    System.out.println("x after x += 5: " + x); // 15

    x -= 3; // x = x - 3;
    System.out.println("x after x -= 3: " + x); // 12

    x *= 2; // x = x * 2;
    System.out.println("x after x *= 2: " + x); // 24

    x /= 4; // x = x / 4;
    System.out.println("x after x /= 4: " + x); // 6

    x %= 5; // x = x % 5;
    System.out.println("x after x %= 5: " + x); // 1
  }
}
\`\`\`

---

## 3. Comparison (Relational) Operators

Comparison operators are used to compare two values and return a 'boolean' result ('true' or 'false').

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Result (if a=10, b=5)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'=='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Equal to: Returns true if operands are equal</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a == b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">false</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'!='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Not equal to: Returns true if operands are not equal</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a != b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">true</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&gt;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Greater than: Returns true if left operand is greater than the right</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a &gt; b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">true</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&lt;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less than: Returns true if left operand is less than the right</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a &lt; b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">false</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&gt;='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Greater than or equal to: Returns true if left operand is greater than or equal to the right</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a &gt;= b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">true</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&lt;='</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Less than or equal to: Returns true if left operand is less than or equal to the right</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a &lt;= b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">false</td>
        </tr>
    </tbody>
</table>

**Example:**

\`\`\`java
public class ComparisonOperators {
  public static void main(String[] args) {
    int x = 10, y = 5;

    System.out.println("x == y: " + (x == y)); // false
    System.out.println("x != y: " + (x != y)); // true
    System.out.println("x > y: " + (x > y));   // true
    System.out.println("x < y: " + (x < y));   // false
    System.out.println("x >= y: " + (x >= y)); // true
    System.out.println("x <= y: " + (x <= y)); // false
  }
}
\`\`\`

---

## 4. Logical Operators

Logical operators are used to combine conditional statements.

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
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&amp;&amp;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Logical AND: Returns true if both statements are true</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(x &gt; 5 &amp;&amp; y &lt; 10)'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'||'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Logical OR: Returns true if one of the statements is true</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(x &gt; 5 || y &gt; 10)'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'!'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Logical NOT: Reverses the result, returns false if the result is true</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'!(x &gt; 5 &amp;&amp; y &lt; 10)'</td>
        </tr>
    </tbody>
</table>

**Example:**

\`\`\`java
public class LogicalOperators {
  public static void main(String[] args) {
    int x = 10, y = 20;

    System.out.println("(x > 5 && y < 25): " + (x > 5 && y < 25)); // true && true = true
    System.out.println("(x > 15 || y < 15): " + (x > 15 || y < 15)); // false || false = false
    System.out.println("!(x > 5 && y < 25): " + !(x > 5 && y < 25)); // !(true) = false
  }
}
\`\`\`

---

## 5. Bitwise Operators

Bitwise operators perform operations on individual bits of integer types ('byte', 'short', 'int', 'long'). They are less commonly used in general application programming but are important in low-level programming, graphics, and cryptography.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Operator</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&amp;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Bitwise AND</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'|'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Bitwise OR</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'^'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Bitwise XOR (Exclusive OR)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'~'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Bitwise NOT (One's Complement)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&lt;&lt;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Left Shift</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&gt;&gt;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Signed Right Shift</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'&gt;&gt;&gt;'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Unsigned Right Shift (fills with zeros on the left)</td>
        </tr>
    </tbody>
</table>

**Example:**

\`\`\`java
public class BitwiseOperators {
  public static void main(String[] args) {
    int a = 60; // 60 = 0011 1100
    int b = 13; // 13 = 0000 1101
    int c = 0;

    c = a & b;  // 12 = 0000 1100
    System.out.println("a & b = " + c);

    c = a | b;  // 61 = 0011 1101
    System.out.println("a | b = " + c);

    c = a ^ b;  // 49 = 0011 0001
    System.out.println("a ^ b = " + c);

    c = ~a;   // -61 = 1100 0011 (in 2's complement)
    System.out.println("~a = " + c);

    c = a << 2; // 240 = 1111 0000
    System.out.println("a << 2 = " + c);

    c = a >> 2; // 15 = 0000 1111
    System.out.println("a >> 2 = " + c);

    c = a >>> 2; // 15 = 0000 1111 (for positive numbers, same as >>)
    System.out.println("a >>> 2 = " + c);
  }
}
\`\`\`

---

## 6. Conditional (Ternary) Operator

The conditional operator is a shorthand for an 'if-then-else' statement. It's the only ternary operator in Java (takes three operands).

**Syntax:**
'variable = (condition) ? expressionTrue : expressionFalse;'

**Example:**

\`\`\`java
public class TernaryOperator {
  public static void main(String[] args) {
    int time = 20;
    String result = (time < 18) ? "Good day." : "Good evening.";
    System.out.println(result); // Output: Good evening.

    int score = 75;
    String status = (score >= 60) ? "Pass" : "Fail";
    System.out.println("Status: " + status); // Output: Status: Pass
  }
}
\`\`\`

---

## Operator Precedence

Operator precedence determines the order in which operators are evaluated in an expression. Operators with higher precedence are evaluated before operators with lower precedence. When operators have the same precedence, their associativity (left-to-right or right-to-left) determines the order.

For example, multiplication ('*') has higher precedence than addition ('+'), so '10 + 5 * 2' evaluates to '10 + 10' = '20', not '15 * 2' = '30'.

You can use parentheses '()' to override the default precedence.

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Parentheses for Clarity</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Even if you know operator precedence, using parentheses '()' can significantly improve the readability of complex expressions, making your code easier to understand and less prone to errors.
    </div>
</div>
`;

export default function JavaOperatorsPage() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-okaidia.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const scriptCore = document.createElement('script');
    scriptCore.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    scriptCore.async = true;

    scriptCore.onload = () => {
      const scriptJavaLang = document.createElement('script');
      scriptJavaLang.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js';
      scriptJavaLang.async = true;

      scriptJavaLang.onload = () => {
        if (window.Prism) {
          window.Prism.highlightAll();
        }
      };
      document.body.appendChild(scriptJavaLang);
    };
    document.body.appendChild(scriptCore);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(scriptCore)) {
        document.body.removeChild(scriptCore);
      }
      const javaLangScript = document.querySelector('script[src*="prism-java.min.js"]');
      if (javaLangScript && document.body.contains(javaLangScript)) {
        document.body.removeChild(javaLangScript);
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
          currentCourseId="java"
          prevLesson="java-type-casting"
          nextLesson="java-strings"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
