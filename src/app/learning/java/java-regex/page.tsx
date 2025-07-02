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
# Java Regular Expressions (RegEx)

**Regular Expressions (RegEx or Regex)** are powerful patterns used to match character combinations in strings. They are a sequence of characters that define a search pattern, primarily used for "find and replace" operations, or input validation.

In Java, regular expressions are handled by the 'java.util.regex' package, which primarily consists of three classes:

-   **'Pattern'**: Represents a compiled regular expression. It's the compiled version of a regex pattern.
-   **'Matcher'**: An engine that performs match operations on a character sequence by interpreting a 'Pattern'.
-   **'PatternSyntaxException'**: An unchecked exception indicating a syntax error in a regular-expression pattern.

## Why Use Regular Expressions?

-   **Validation:** Checking if an input string matches a specific format (e.g., email addresses, phone numbers, passwords).
-   **Searching:** Finding specific patterns within a larger text.
-   **Manipulation:** Replacing parts of a string that match a pattern, or splitting a string based on a pattern.
-   **Parsing:** Extracting specific pieces of information from text.

## Basic RegEx Syntax Elements

Understanding the basic building blocks of regular expressions is crucial.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Element</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Matches</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Literal Characters</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Match themselves.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'abc'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'abc' in "abcdef"</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'.' (Dot)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches any single character (except newline).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a.c'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'abc', 'axc', 'a1c'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\d'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches any digit (0-9).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\d\\d'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'12', '05'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\w'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches any word character (a-z, A-Z, 0-9, _).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\w+'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'hello', 'user_name'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\s'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches any whitespace character (space, tab, newline, etc.).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'hello\\s+world'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'hello  world'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\D', '\\W', '\\S'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Non-digit, non-word, non-whitespace respectively. (Uppercase is the negation of lowercase).</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\D'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a', '!', '$'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'[abc]'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches any one character listed inside the brackets. (Character class)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'[aeiou]'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a', 'e', 'i', 'o', 'u'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'[a-z]'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches any character in the specified range.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'[A-Z0-9]'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'A', 'X', '5', '9'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'[^abc]'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches any character NOT listed inside the brackets. (Negated character class)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'[^0-9]'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a', '!', ' '</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'^' (Caret)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches the beginning of the line.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'^Hello'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Hello World' (at start)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'$' (Dollar)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches the end of the line.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'World$'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Hello World' (at end)</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'*'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches zero or more occurrences of the preceding element. (Quantifier)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a*b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'b', 'ab', 'aaab'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'+'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches one or more occurrences of the preceding element. (Quantifier)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a+b'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'ab', 'aaab' (but not 'b')</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'?'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches zero or one occurrence of the preceding element. (Quantifier)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'colou?r'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'color', 'colour'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'{n}'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches exactly 'n' occurrences of the preceding element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\d{3}'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'123', '007'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'{n,}'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches at least 'n' occurrences of the preceding element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'a{2,}'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'aa', 'aaa', 'aaaa'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'{n,m}'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Matches between 'n' and 'm' (inclusive) occurrences of the preceding element.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\d{2,4}'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'12', '123', '1234'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'|' (OR)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Acts as an OR operator.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'cat|dog'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'cat' or 'dog'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'()' (Grouping)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Groups expressions, creates capturing groups.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'(ab)+'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'ab', 'abab', 'ababab'</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\' (Backslash)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Escapes special characters (e.g., '.'). In Java strings, you need two backslashes: '\\\\.'.</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'\\.'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A literal dot '.'</td>
        </tr>
    </tbody>
</table>

---

## 1. Matching a Whole String ('matches()')

The 'Pattern.matches(String regex, CharSequence input)' static method is a convenient way to check if an entire input string matches a given regular expression. It's a shortcut for compiling a pattern and then matching it against the input.

**Example:**

\`\`\`java
import java.util.regex.Pattern;

public class RegexMatchesExample {
  public static void main(String[] args) {
    String text1 = "Hello World";
    String text2 = "Java";
    String text3 = "12345";
    String text4 = "abc";

    // Check if the entire string matches "Hello World"
    boolean match1 = Pattern.matches("Hello World", text1);
    System.out.println("'" + text1 + "' matches 'Hello World': " + match1); // Output: true

    // Check if the entire string consists of only letters
    boolean match2 = Pattern.matches("[a-zA-Z]+", text2);
    System.out.println("'" + text2 + "' matches '[a-zA-Z]+': " + match2); // Output: true

    // Check if the entire string consists of exactly 5 digits
    boolean match3 = Pattern.matches("\\d{5}", text3);
    System.out.println("'" + text3 + "' matches '\\d{5}': " + match3); // Output: true

    // Check if the entire string matches "abc" (case-insensitive)
    // For flags, we need to use Pattern and Matcher explicitly
    Pattern pattern = Pattern.compile("abc", Pattern.CASE_INSENSITIVE);
    boolean match4 = pattern.matcher(text4).matches();
    System.out.println("'" + text4 + "' matches 'abc' (case-insensitive): " + match4); // Output: true

    String email = "test@example.com";
    // Simple email validation regex (more robust ones exist)
    boolean isValidEmail = Pattern.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", email);
    System.out.println("'" + email + "' is a valid email: " + isValidEmail); // Output: true
  }
}
\`\`\`

---

## 2. Finding Occurrences ('find()')

To find one or more occurrences of a pattern within a larger string, you use the 'Pattern' and 'Matcher' classes.

-   **'Pattern.compile(String regex)'**: Compiles the given regular expression into a pattern.
-   **'Pattern.matcher(CharSequence input)'**: Creates a matcher that will match the given input against this pattern.
-   **'Matcher.find()'**: Attempts to find the next subsequence of the input sequence that matches the pattern. Returns 'true' if a match is found.
-   **'Matcher.group()'**: Returns the input subsequence matched by the previous match.
-   **'Matcher.start()'**: Returns the start index of the previous match.
-   **'Matcher.end()'**: Returns the offset after the last character matched.

**Example:**

\`\`\`java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexFindExample {
  public static void main(String[] args) {
    String text = "The quick brown fox jumps over the lazy dog. The fox is quick.";
    String regex = "fox"; // Pattern to find "fox"

    Pattern pattern = Pattern.compile(regex);
    Matcher matcher = pattern.matcher(text);

    System.out.println("Finding all occurrences of '" + regex + "':");
    while (matcher.find()) {
      System.out.println("  Found '" + matcher.group() + "' at index " + matcher.start() + " to " + (matcher.end() - 1));
    }
    // Output:
    //   Found 'fox' at index 16 to 18
    //   Found 'fox' at index 45 to 47

    // Finding digits
    String phoneNumbers = "My numbers are 123-456-7890 and 987-654-3210.";
    Pattern digitPattern = Pattern.compile("\\d{3}-\\d{3}-\\d{4}"); // Matches XXX-XXX-XXXX
    Matcher digitMatcher = digitPattern.matcher(phoneNumbers);

    System.out.println("\nFinding phone numbers:");
    while (digitMatcher.find()) {
      System.out.println("  Found phone number: " + digitMatcher.group());
    }
    // Output:
    //   Found phone number: 123-456-7890
    //   Found phone number: 987-654-3210
  }
}
\`\`\`

---

## 3. Replacing Substrings ('replaceAll()', 'replaceFirst()')

Regular expressions are very powerful for replacing parts of a string that match a pattern.

-   **'Matcher.replaceAll(String replacement)'**: Replaces every subsequence of the input sequence that matches the pattern with the given replacement string.
-   **'Matcher.replaceFirst(String replacement)'**: Replaces the first subsequence of the input sequence that matches the pattern with the given replacement string.
-   **'String.replaceAll(String regex, String replacement)'**: A convenience method on the 'String' class that internally uses 'Pattern' and 'Matcher' to replace all occurrences.
-   **'String.replaceFirst(String regex, String replacement)'**: Similar to 'replaceAll', but replaces only the first occurrence.

**Example:**

\`\`\`java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexReplaceExample {
  public static void main(String[] args) {
    String text = "The price is $100.00 and the discount is $10.50.";

    // Replace all dollar amounts with "FREE"
    String newText1 = text.replaceAll("\\$\\d+\\.\\d{2}", "FREE");
    System.out.println("After replacing all prices: " + newText1);
    // Output: The price is FREE and the discount is FREE.

    // Replace only the first dollar amount
    String newText2 = text.replaceFirst("\\$\\d+\\.\\d{2}", "FREE");
    System.out.println("After replacing first price: " + newText2);
    // Output: The price is FREE and the discount is $10.50.

    // Using Matcher explicitly for more control (e.g., using groups in replacement)
    String htmlTag = "<p>Hello</p> <span>World</span>";
    Pattern tagPattern = Pattern.compile("<(.*?)>"); // Captures content inside tags
    Matcher tagMatcher = tagPattern.matcher(htmlTag);

    // Replace tags with their content in uppercase
    StringBuffer result = new StringBuffer();
    while (tagMatcher.find()) {
      // Use Matcher.appendReplacement to build the new string
      tagMatcher.appendReplacement(result, tagMatcher.group(1).toUpperCase()); 
    }
    tagMatcher.appendTail(result); // Append the rest of the string
    System.out.println("After transforming tags: " + result.toString());
    // Output: HELLO WORLD
  }
}
\`\`\`

---

## 4. Splitting Strings ('split()')

The 'split()' method on the 'String' class (which uses regular expressions internally) allows you to split a string into an array of substrings based on a delimiter defined by a regular expression.

**Example:**

\`\`\`java
public class RegexSplitExample {
  public static void main(String[] args) {
    String data = "apple,banana;cherry orange";

    // Split by comma or semicolon
    String[] parts1 = data.split("[,;]");
    System.out.println("Split by comma or semicolon:");
    for (String part : parts1) {
      System.out.println("- " + part.trim()); // trim() to remove leading/trailing spaces
    }
    // Output:
    // - apple
    // - banana
    // - cherry orange

    String sentence = "This is   a sentence. With multiple    spaces.";
    // Split by one or more whitespace characters
    String[] words = sentence.split("\\s+");
    System.out.println("\nSplit by one or more spaces:");
    for (String word : words) {
      System.out.println("- " + word);
    }
    // Output:
    // - This
    // - is
    // - a
    // - sentence.
    // - With
    // - multiple
    // - spaces.

    String path = "/usr/local/bin/java";
    // Split by forward slash (needs escaping as '/' is special in some regex contexts, though not strictly here)
    // It's safer to escape special characters if they are literal.
    String[] pathParts = path.split("/"); 
    System.out.println("\nSplit by slash:");
    for (String part : pathParts) {
      if (!part.isEmpty()) { // split("/") on "/a/b" yields ["", "a", "b"]
        System.out.println("- " + part);
      }
    }
    // Output:
    // - usr
    // - local
    // - bin
    // - java
  }
}
\`\`\`

---

## RegEx Flags

You can modify the matching behavior of a pattern by using flags. These are typically passed as the second argument to 'Pattern.compile()'.

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Flag</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Constant</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'i'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Pattern.CASE_INSENSITIVE'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Enables case-insensitive matching.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'m'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Pattern.MULTILINE'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Enables multi-line mode. '^' and '$' match the start/end of each line, not just the entire input.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'s'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Pattern.DOTALL'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Enables dotall mode. '.' matches any character, including line terminators.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'x'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Pattern.COMMENTS'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Permits whitespace and comments in the pattern. Useful for complex regexes.</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'u'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Pattern.UNICODE_CASE'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Enables Unicode-aware case folding.</td>
        </tr>
    </tbody>
</table>

**Example with Flags:**

\`\`\`java
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexFlagsExample {
  public static void main(String[] args) {
    String text = "Hello World\\nhello java";

    // Case-insensitive matching
    Pattern pattern1 = Pattern.compile("hello", Pattern.CASE_INSENSITIVE);
    Matcher matcher1 = pattern1.matcher(text);
    System.out.println("Case-insensitive 'hello': " + matcher1.find()); // Output: true

    // Multiline mode: '^' and '$' match line beginnings/ends
    String multiLineText = "Line 1\\nLine 2\\nLine 3";
    Pattern pattern2 = Pattern.compile("^Line", Pattern.MULTILINE);
    Matcher matcher2 = pattern2.matcher(multiLineText);
    System.out.println("\nMultiline mode ('^Line'):");
    while (matcher2.find()) {
      System.out.println("  Found: " + matcher2.group());
    }
    // Output:
    //   Found: Line
    //   Found: Line
    //   Found: Line

    // Dotall mode: '.' matches newlines
    Pattern pattern3 = Pattern.compile("Line.1", Pattern.DOTALL); // . will match \n
    Matcher matcher3 = pattern3.matcher("Line\\n1");
    System.out.println("\nDotall mode ('Line.1' across newline): " + matcher3.find()); // Output: true
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Compile Patterns for Reusability</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        If you are going to use a regular expression multiple times, it's more efficient to compile it once using 'Pattern.compile()' and then reuse the 'Pattern' object. This avoids recompiling the regex every time you need to perform a match. The static 'Pattern.matches()' method compiles the pattern every time it's called, which can be inefficient in loops or frequently called methods.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Backslashes in Java Strings</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Regular expressions use the backslash ('\\') as an escape character for metacharacters (e.g., '\\d' for digit, '\\s' for space). However, the backslash is *also* an escape character in Java string literals. This means that to represent a literal backslash in your regex pattern within a Java string, you must escape it twice. For example, to match a literal dot '.', the regex is '\\\\.', because '\\.' is the regex for a literal dot, and the first '\\' escapes the second '\\' in the Java string.
        <br/><br/>
        Example: 'Pattern.compile("\\\\d+")' to match one or more digits.
    </div>
</div>
`;

export default function JavaRegExPage() {
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
          prevLesson="java-annotations"
          nextLesson="java-threads"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
