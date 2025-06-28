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
# Python Dates and Times (datetime module)

Python has a built-in module called 'datetime' to work with dates and times. This module provides classes for working with dates and times in a simple and efficient way.

## Current Date and Time

To get the current date and time, you can use the 'datetime' class from the 'datetime' module.

\`\`\`python
import datetime

# Get current date and time
current_datetime = datetime.datetime.now()
print(f"Current Date and Time: {current_datetime}")
# Output: Current Date and Time: 2024-06-28 09:30:15.123456 (will vary)

# Get current date only
current_date = datetime.date.today()
print(f"Current Date: {current_date}")
# Output: Current Date: 2024-06-28

# Get current time only
current_time = datetime.datetime.now().time()
print(f"Current Time: {current_time}")
# Output: Current Time: 09:30:15.123456
\`\`\`

## Creating Date Objects

To create a specific date, use the 'datetime()' class constructor. The 'datetime()' constructor requires three parameters: 'year', 'month', and 'day'.

\`\`\`python
import datetime

# Create a specific date
d = datetime.datetime(2020, 5, 17)
print(d) # Output: 2020-05-17 00:00:00

# You can also specify time (hour, minute, second, microsecond, tzinfo)
dt = datetime.datetime(2024, 7, 1, 10, 30, 45, 123456)
print(dt) # Output: 2024-07-01 10:30:45.123456
\`\`\`

## Formatting Dates and Times ('strftime()')

The 'datetime' object has a method for formatting date objects into readable strings. The 'strftime()' method (string format time) takes one parameter, 'format', to specify the format of the returned string.

Here are some common format codes:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
  <thead class="bg-gray-700">
    <tr>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Directive</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
      <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%Y'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Year (e.g., 2024)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">2024</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%m'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Month as a zero-padded decimal number (01-12)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">06</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%d'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Day of the month as a zero-padded decimal (01-31)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">28</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%H'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hour (24-hour clock) as a zero-padded decimal (00-23)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">09</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%I'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Hour (12-hour clock) as a zero-padded decimal (01-12)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">09</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%p'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">AM/PM (Locale's equivalent)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">AM</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%M'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Minute as a zero-padded decimal number (00-59)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">30</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%S'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Second as a zero-padded decimal number (00-59)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">45</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%f'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Microsecond as a decimal number (000000-999999)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">123456</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%j'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Day of the year as a zero-padded decimal number (001-366)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">180</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%w'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Weekday as a decimal number, Sunday=0, Saturday=6</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">5 (for Friday)</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%A'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Weekday's full name (e.g., Friday)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Friday</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%a'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Weekday's abbreviated name (e.g., Fri)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fri</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%B'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Month's full name (e.g., June)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">June</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%b'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Month's abbreviated name (e.g., Jun)</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Jun</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%c'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Locale's appropriate date and time representation</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Fri Jun 28 09:30:45 2024</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%x'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Locale's appropriate date representation</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">06/28/24</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%X'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Locale's appropriate time representation</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">09:30:45</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%Z'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">Time zone name</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">CST</td>
    </tr>
    <tr>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'%z'</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">UTC offset in the form +HHMM or -HHMM</td>
      <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">-0600</td>
    </tr>
  </tbody>
</table>

\`\`\`python
import datetime

dt_obj = datetime.datetime(2024, 6, 28, 9, 45, 20)

print(dt_obj.strftime("%Y-%m-%d %H:%M:%S")) # Output: 2024-06-28 09:45:20
print(dt_obj.strftime("%A, %B %d, %Y"))    # Output: Friday, June 28, 2024
print(dt_obj.strftime("Day of year: %j"))  # Output: Day of year: 180 (approx.)
print(dt_obj.strftime("%I:%M %p"))        # Output: 09:45 AM
\`\`\`

## Subtracting and Adding Dates ('timedelta')

The 'timedelta' object represents a duration, the difference between two 'datetime' or 'date' objects. It can be used to perform arithmetic on dates.

\`\`\`python
from datetime import datetime, timedelta

date1 = datetime(2024, 6, 28)
date2 = datetime(2024, 7, 5)

# Calculate difference
difference = date2 - date1
print(f"Difference: {difference}")        # Output: 7 days, 0:00:00
print(f"Days: {difference.days}")         # Output: 7
print(f"Seconds: {difference.total_seconds()}") # Output: 604800.0

# Add days to a date
future_date = date1 + timedelta(days=10)
print(f"Date + 10 days: {future_date}") # Output: 2024-07-08 00:00:00

# Subtract hours
past_time = datetime.now() - timedelta(hours=3)
print(f"3 hours ago: {past_time.strftime('%Y-%m-%d %H:%M:%S')}")
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">InfoCard: 'datetime' Objects are Immutable</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        'datetime' objects, like strings and tuples, are immutable. When you perform operations like adding a 'timedelta', you get a *new* 'datetime' object as the result; the original object remains unchanged.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        The 'datetime' module is indispensable for handling dates and times in Python. Master 'strftime()' for flexible formatting and 'timedelta' for date arithmetic. Pay attention to timezones for global applications (though the 'pytz' library is often used for more advanced timezone handling).
    </div>
</div>
`;

export default function PythonDatetimePage() {
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
          prevLesson="python-modules"
          nextLesson="python-math"
          backToContentPath={`/learning/python`}
        />
      </main>
    </div>
  );
}
