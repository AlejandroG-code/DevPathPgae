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
# Java Date and Time

Working with dates and times is a common requirement in many applications. Java provides several classes for handling date and time information. Historically, Java used 'java.util.Date' and 'java.util.Calendar' for this purpose. However, with Java 8, a new and much-improved Date and Time API (JSR-310) was introduced in the 'java.time' package, which addresses many of the shortcomings of the older API.

## Old Date/Time API (Pre-Java 8)

Before Java 8, 'java.util.Date' and 'java.util.Calendar' were used. These classes had several issues:
-   **Mutability:** 'Date' objects are mutable, which can lead to unexpected side effects in multi-threaded environments.
-   **Poor Design:** 'Date' overloaded its methods, and 'Calendar' was complex and often confusing to use.
-   **Thread Safety:** Not thread-safe.
-   **Lack of Clarity:** No clear distinction between date, time, or date-time.

### Example (Old API - for context, generally avoid in new code):

\`\`\`java
import java.util.Date;
import java.util.Calendar;

public class OldDateApiExample {
  public static void main(String[] args) {
    // Using java.util.Date
    Date currentDate = new Date(); // Represents current date and time
    System.out.println("Current Date (old Date): " + currentDate); // Output: e.g., Tue Jul 01 18:11:00 CDT 2025

    // Using java.util.Calendar
    Calendar calendar = Calendar.getInstance(); // Get a Calendar instance
    System.out.println("Current Year: " + calendar.get(Calendar.YEAR));
    System.out.println("Current Month: " + (calendar.get(Calendar.MONTH) + 1)); // Month is 0-indexed
    System.out.println("Current Day: " + calendar.get(Calendar.DAY_OF_MONTH));
    System.out.println("Current Hour (24h): " + calendar.get(Calendar.HOUR_OF_DAY));
    System.out.println("Current Minute: " + calendar.get(Calendar.MINUTE));
    System.out.println("Current Second: " + calendar.get(Calendar.SECOND));

    // Setting a specific date
    calendar.set(2023, Calendar.JANUARY, 15, 10, 30, 0);
    Date specificDate = calendar.getTime();
    System.out.println("Specific Date (old Date): " + specificDate);
  }
}
\`\`\`

---

## New Date/Time API (Java 8+) - 'java.time' Package

The 'java.time' package provides a comprehensive and immutable API for date and time manipulation. It is based on the ISO-8601 standard and offers clear distinctions between different aspects of date and time.

### Key Classes in 'java.time':

-   **'LocalDate'**: Represents a date without a time-of-day or a time-zone (e.g., '2025-07-01').
-   **'LocalTime'**: Represents a time without a date or a time-zone (e.g., '18:30:00').
-   **'LocalDateTime'**: Represents a date-time without a time-zone (e.g., '2025-07-01T18:30:00').
-   **'ZonedDateTime'**: Represents a date-time with a time-zone (e.g., '2025-07-01T18:30:00-05:00[America/Chicago]').
-   **'Instant'**: Represents a point in time on the timeline in UTC (e.g., '2025-07-01T23:30:00Z').
-   **'Duration'**: Represents a time-based amount of time (e.g., '30 seconds', '5 minutes').
-   **'Period'**: Represents a date-based amount of time (e.g., '2 years, 3 months, 4 days').
-   **'DateTimeFormatter'**: Used for formatting and parsing date-time objects.

### Example: Using 'LocalDate', 'LocalTime', 'LocalDateTime'

\`\`\`java
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter; // For formatting

public class NewDateTimeApiExample {
  public static void main(String[] args) {
    // 1. LocalDate: Date only
    LocalDate today = LocalDate.now(); // Current date
    System.out.println("Current Date: " + today); // Output: 2025-07-01

    LocalDate specificDate = LocalDate.of(2024, 12, 25); // Specific date
    System.out.println("Specific Date: " + specificDate); // Output: 2024-12-25

    // Get individual components
    System.out.println("Year: " + today.getYear());
    System.out.println("Month: " + today.getMonth()); // Enum: JULY
    System.out.println("Day of Month: " + today.getDayOfMonth());
    System.out.println("Day of Week: " + today.getDayOfWeek()); // Enum: MONDAY

    // Modifying dates (returns new immutable object)
    LocalDate nextWeek = today.plusWeeks(1);
    System.out.println("Next Week: " + nextWeek);
    LocalDate previousMonth = today.minusMonths(1);
    System.out.println("Previous Month: " + previousMonth);

    // 2. LocalTime: Time only
    LocalTime currentTime = LocalTime.now(); // Current time
    System.out.println("Current Time: " + currentTime); // Output: e.g., 18:30:45.123456789

    LocalTime specificTime = LocalTime.of(14, 30, 0); // 2:30 PM
    System.out.println("Specific Time: " + specificTime); // Output: 14:30

    // Get individual components
    System.out.println("Hour: " + currentTime.getHour());
    System.out.println("Minute: " + currentTime.getMinute());
    System.out.println("Second: " + currentTime.getSecond());

    // Modifying times
    LocalTime fiveHoursLater = currentTime.plusHours(5);
    System.out.println("5 hours later: " + fiveHoursLater);

    // 3. LocalDateTime: Date and Time
    LocalDateTime currentDateTime = LocalDateTime.now(); // Current date and time
    System.out.println("Current DateTime: " + currentDateTime); // Output: e.g., 2025-07-01T18:30:45.123456789

    LocalDateTime specificDateTime = LocalDateTime.of(2023, 1, 1, 9, 0, 0);
    System.out.println("Specific DateTime: " + specificDateTime); // Output: 2023-01-01T09:00

    // Combining LocalDate and LocalTime
    LocalDateTime combinedDateTime = LocalDate.of(2025, 7, 10).atTime(LocalTime.of(11, 45));
    System.out.println("Combined DateTime: " + combinedDateTime); // Output: 2025-07-10T11:45
  }
}
\`\`\`

## Formatting and Parsing Dates

The 'DateTimeFormatter' class is used to format date-time objects into strings and parse strings into date-time objects.

\`\`\`java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateTimeFormattingExample {
  public static void main(String[] args) {
    LocalDateTime now = LocalDateTime.now();

    // Custom formatters
    DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    String formattedDateTime1 = now.format(formatter1);
    System.out.println("Formatted 1: " + formattedDateTime1); // Output: e.g., 2025-07-01 18:30:45

    DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("dd/MM/yyyy EEEE");
    String formattedDateTime2 = now.format(formatter2);
    System.out.println("Formatted 2: " + formattedDateTime2); // Output: e.g., 01/07/2025 Tuesday

    // Parsing a string into LocalDateTime
    String dateString = "2023-03-15 14:00:00";
    DateTimeFormatter parserFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDateTime parsedDateTime = LocalDateTime.parse(dateString, parserFormatter);
    System.out.println("Parsed DateTime: " + parsedDateTime); // Output: 2023-03-15T14:00
  }
}
\`\`\`

### Common Pattern Letters for 'DateTimeFormatter':

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Letter</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Meaning</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'y'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Year</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'yyyy' -> 2025</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'M'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Month in year</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'MM' -> 07, 'MMM' -> Jul, 'MMMM' -> July</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'d'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Day in month</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'dd' -> 01</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'E'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Day of week</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'E' -> Tue, 'EEEE' -> Tuesday</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'H'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hour in day (0-23)</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'HH' -> 18</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'m'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Minute in hour</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'mm' -> 30</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'s'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Second in minute</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'ss' -> 45</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'S'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fraction of second</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'SSS' -> 123</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'z'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Time-zone name</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'z' -> CDT</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Z'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Zone offset</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'Z' -> -0500, 'XXX' -> -05:00</td>
        </tr>
    </tbody>
</table>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Prefer New Date/Time API</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        For any new development in Java 8 or later, always prefer the classes in the 'java.time' package over the older 'java.util.Date' and 'java.util.Calendar' classes. The new API is immutable, thread-safe, and provides a much clearer and more consistent way to handle date and time.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Time Zones</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Be mindful of time zones when dealing with dates and times, especially in applications that span different geographical regions. 'LocalDate', 'LocalTime', and 'LocalDateTime' do not contain time zone information. For applications requiring time zone awareness, use 'ZonedDateTime' or 'OffsetDateTime'.
    </div>
</div>
`;

export default function JavaDatePage() {
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
          prevLesson="java-user-input"
          nextLesson="java-errors"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
