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
# Java Threads

**Threads** are lightweight sub-processes within a single program that can run concurrently. They allow a program to perform multiple tasks simultaneously, improving responsiveness and utilizing multi-core processors more efficiently. This concept is known as **multithreading**.

In Java, every program has at least one thread, the **main thread**, which executes the 'main()' method.

## Why Use Threads (Multithreading)?

-   **Responsiveness:** A GUI application can remain responsive to user input while performing a long-running background task.
-   **Performance:** Utilize multiple CPU cores to execute parts of a program in parallel, speeding up computation.
-   **Resource Sharing:** Threads within the same process share the same memory space, making data sharing easier (though requiring careful synchronization).
-   **Simplified Design:** Complex tasks can be broken down into smaller, independent threads, simplifying program design.

## Ways to Create Threads in Java

There are two primary ways to create threads in Java:

1.  **Extending the 'Thread' class.**
2.  **Implementing the 'Runnable' interface.**

---

## 1. Extending the 'Thread' Class

You can create a new thread by creating a class that extends 'java.lang.Thread' and overriding its 'run()' method. The 'run()' method contains the code that will be executed by the new thread.

**Steps:**
1.  Create a class that extends 'Thread'.
2.  Override the 'run()' method.
3.  Create an instance of your class.
4.  Call the 'start()' method on the instance (this will call the 'run()' method in a new thread).

**Example:**

\`\`\`java
class MyThread extends Thread {
  private String threadName;

  public MyThread(String name) {
    this.threadName = name;
    System.out.println("Creating " + threadName);
  }

  @Override
  public void run() {
    System.out.println("Running " + threadName);
    try {
      for (int i = 4; i > 0; i--) {
        System.out.println("Thread: " + threadName + ", " + i);
        // Pause thread for a moment
        Thread.sleep(50); 
      }
    } catch (InterruptedException e) {
      System.out.println("Thread " + threadName + " interrupted.");
    }
    System.out.println("Thread " + threadName + " exiting.");
  }
}

public class ThreadExtensionExample {
  public static void main(String args[]) {
    MyThread thread1 = new MyThread("Thread-1");
    thread1.start(); // Starts the thread, calls run()

    MyThread thread2 = new MyThread("Thread-2");
    thread2.start(); // Starts another thread

    System.out.println("Main thread finished starting other threads.");
  }
}
\`\`\`

---

## 2. Implementing the 'Runnable' Interface

This is generally the **preferred way** to create threads in Java. The 'Runnable' interface ('java.lang.Runnable') is a functional interface with a single abstract method: 'run()'.

**Steps:**
1.  Create a class that implements 'Runnable'.
2.  Implement the 'run()' method.
3.  Create an instance of your 'Runnable' class.
4.  Create a 'Thread' object, passing your 'Runnable' instance to its constructor.
5.  Call the 'start()' method on the 'Thread' object.

**Advantages of implementing 'Runnable' over extending 'Thread':**
-   **Flexibility:** Your class can still extend another class, as Java does not support multiple inheritance for classes.
-   **Separation of Concerns:** Separates the task (what the thread does) from the thread control mechanism.
-   **Resource Sharing:** Allows multiple threads to share the same 'Runnable' object instance, which can be useful for shared resources.

**Example:**

\`\`\`java
class MyRunnable implements Runnable {
  private String taskName;

  public MyRunnable(String name) {
    this.taskName = name;
    System.out.println("Creating Runnable Task: " + taskName);
  }

  @Override
  public void run() {
    System.out.println("Running Task: " + taskName);
    try {
      for (int i = 3; i > 0; i--) {
        System.out.println("Task: " + taskName + ", " + i);
        Thread.sleep(70);
      }
    } catch (InterruptedException e) {
      System.out.println("Task " + taskName + " interrupted.");
    }
    System.out.println("Task " + taskName + " exiting.");
  }
}

public class RunnableImplementationExample {
  public static void main(String args[]) {
    MyRunnable runnable1 = new MyRunnable("Task-A");
    Thread threadA = new Thread(runnable1); // Pass Runnable to Thread constructor
    threadA.start();

    MyRunnable runnable2 = new MyRunnable("Task-B");
    Thread threadB = new Thread(runnable2);
    threadB.start();

    System.out.println("Main thread finished starting runnable tasks.");
  }
}
\`\`\`

---

## Thread Lifecycle (States)

A thread goes through various states during its lifetime:

<table class="w-full text-left border-collapse my-6 bg-gray-800 rounded-lg overflow-hidden">
    <thead class="bg-gray-700">
        <tr>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">State</th>
            <th class="p-3 border-b-2 border-gray-600 text-white font-semibold text-sm">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'NEW'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A thread that has not yet started is in this state. (After 'new Thread()')</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'RUNNABLE'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A thread executing in the Java virtual machine. It might be running or waiting for its turn with the scheduler. (After 'start()')</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'BLOCKED'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A thread that is blocked waiting for a monitor lock (e.g., waiting to enter a 'synchronized' block).</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'WAITING'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A thread that is waiting indefinitely for another thread to perform a particular action (e.g., 'Object.wait()', 'Thread.join()').</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'TIMED_WAITING'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A thread that is waiting for another thread to perform an action for a specified waiting time (e.g., 'Thread.sleep()', 'Object.wait(long timeout)').</td>
        </tr>
        <tr>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">'TERMINATED'</td>
            <td class="p-3 border-b border-gray-700 text-gray-300 text-sm">A thread that has exited. (When 'run()' method completes).</td>
        </tr>
    </tbody>
</table>

## Important Thread Methods

-   **'start()'**: Causes this thread to begin execution; the Java Virtual Machine calls the 'run()' method of this thread. **Calling 'run()' directly will execute it in the current thread, not a new one.**
-   **'sleep(long millis)'**: Causes the currently executing thread to temporarily cease execution for the specified number of milliseconds. It's a static method. Throws 'InterruptedException'.
-   **'join()'**: Waits for this thread to die. The calling thread will pause its execution until the 'joined' thread completes. Throws 'InterruptedException'.
-   **'interrupt()'**: Interrupts this thread. Sets the thread's interrupted status to 'true'. It does not stop a thread immediately but signals it to stop. A thread can check its interrupted status or handle 'InterruptedException'.
-   **'isAlive()'**: Tests if this thread is alive. A thread is alive if it has been started and has not yet died.
-   **'currentThread()'**: A static method that returns a reference to the currently executing thread object.

**Example: 'join()' Method**

\`\`\`java
class WorkerThread implements Runnable {
  private String name;

  public WorkerThread(String name) {
    this.name = name;
  }

  @Override
  public void run() {
    System.out.println(name + " started.");
    try {
      Thread.sleep(2000); // Simulate work
    } catch (InterruptedException e) {
      System.out.println(name + " was interrupted.");
    }
    System.out.println(name + " finished.");
  }
}

public class ThreadJoinExample {
  public static void main(String[] args) {
    System.out.println("Main thread started.");

    Thread thread1 = new Thread(new WorkerThread("Worker-1"));
    Thread thread2 = new Thread(new WorkerThread("Worker-2"));

    thread1.start(); // Start Worker-1
    thread2.start(); // Start Worker-2

    try {
      System.out.println("Main thread waiting for Worker-1 to finish...");
      thread1.join(); // Main thread waits for thread1 to complete
      System.out.println("Worker-1 has joined the main thread.");

      System.out.println("Main thread waiting for Worker-2 to finish...");
      thread2.join(); // Main thread waits for thread2 to complete
      System.out.println("Worker-2 has joined the main thread.");

    } catch (InterruptedException e) {
      System.out.println("Main thread interrupted while waiting.");
    }

    System.out.println("Main thread finished all work.");
  }
}
\`\`\`
**Expected Output:**
(Order of "Worker-1 started" and "Worker-2 started" might vary)
Main thread started.
Worker-1 started.
Worker-2 started.
Main thread waiting for Worker-1 to finish...
Worker-1 finished.
Worker-1 has joined the main thread.
Main thread waiting for Worker-2 to finish...
Worker-2 finished.
Worker-2 has joined the main thread.
Main thread finished all work.

---

## Thread Synchronization

When multiple threads access shared resources (like a common variable or a file), there's a risk of **data inconsistency** or **race conditions**. **Synchronization** is the process of controlling access to shared resources by multiple threads to prevent such issues.

Java provides several mechanisms for synchronization:

1.  **'synchronized' keyword:** Can be applied to methods or blocks of code.
    -   **Synchronized Methods:** If a method is 'synchronized', only one thread can execute that method on a given object at a time.
    -   **Synchronized Blocks:** Allows you to synchronize on any object, providing finer-grained control.

2.  **'volatile' keyword:** Ensures that changes to a variable are always visible to other threads (prevents caching of variables in CPU registers). Does not provide atomicity.

3.  **'java.util.concurrent' package:** Provides more advanced and flexible concurrency utilities (e.g., 'Lock', 'Semaphore', 'CountDownLatch', 'ConcurrentHashMap').

### Example: 'synchronized' Method

\`\`\`java
class Counter {
  private int count = 0;

  // Synchronized method: Only one thread can execute this method at a time
  public synchronized void increment() {
    count++;
    System.out.println(Thread.currentThread().getName() + " increments. Count = " + count);
  }

  public int getCount() {
    return count;
  }
}

class CounterThread implements Runnable {
  private Counter counter;

  public CounterThread(Counter counter) {
    this.counter = counter;
  }

  @Override
  public void run() {
    for (int i = 0; i < 5; i++) {
      counter.increment();
      try {
        Thread.sleep(10); // Simulate some work
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
      }
    }
  }
}

public class SynchronizedMethodExample {
  public static void main(String[] args) throws InterruptedException {
    Counter counter = new Counter();

    Thread thread1 = new Thread(new CounterThread(counter), "Thread-A");
    Thread thread2 = new Thread(new CounterThread(counter), "Thread-B");

    thread1.start();
    thread2.start();

    // Wait for both threads to finish
    thread1.join();
    thread2.join();

    System.out.println("\nFinal Count: " + counter.getCount()); // Should be 10
  }
}
\`\`\`
Without 'synchronized', the 'Final Count' might be less than 10 due to race conditions.

### Example: 'synchronized' Block

\`\`\`java
class SharedResource {
  private int data = 0;
  private final Object lock = new Object(); // A dedicated lock object

  public void incrementData() {
    // Synchronized block: Only one thread can execute this block at a time
    synchronized (lock) { 
      data++;
      System.out.println(Thread.currentThread().getName() + " increments. Data = " + data);
    }
  }

  public int getData() {
    return data;
  }
}

class ResourceUser implements Runnable {
  private SharedResource resource;

  public ResourceUser(SharedResource resource) {
    this.resource = resource;
  }

  @Override
  public void run() {
    for (int i = 0; i < 5; i++) {
      resource.incrementData();
      try {
        Thread.sleep(10);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
      }
    }
  }
}

public class SynchronizedBlockExample {
  public static void main(String[] args) throws InterruptedException {
    SharedResource sharedResource = new SharedResource();

    Thread thread1 = new Thread(new ResourceUser(sharedResource), "Thread-X");
    Thread thread2 = new Thread(new ResourceUser(sharedResource), "Thread-Y");

    thread1.start();
    thread2.start();

    thread1.join();
    thread2.join();

    System.out.println("\nFinal Data: " + sharedResource.getData()); // Should be 10
  }
}
\`\`\`

<div class="my-6 p-4 rounded-lg border-l-4 border-green-600 bg-green-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-green-400">Tip: Prefer 'Runnable' for Thread Creation</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        While both extending 'Thread' and implementing 'Runnable' work, implementing 'Runnable' is generally preferred. It promotes better design by separating the task logic from thread management, allows your class to extend other classes, and makes it easier to share the same task instance among multiple threads.
    </div>
</div>

<div class="my-6 p-4 rounded-lg border-l-4 border-yellow-600 bg-yellow-900/[.2] shadow-md">
    <p class="font-bold text-lg mb-2 text-yellow-400">Warning: Race Conditions and Deadlock</p>
    <div class="text-base md:text-lg text-gray-200 leading-relaxed">
        Multithreading introduces complexities like **race conditions** (when multiple threads try to access and modify shared data concurrently, leading to unpredictable results) and **deadlock** (when two or more threads are blocked forever, waiting for each other to release resources). Proper synchronization is critical to avoid these issues. Over-synchronization can lead to performance bottlenecks, while under-synchronization can lead to incorrect program behavior.
    </div>
</div>
`;

export default function JavaThreadsPage() {
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
          prevLesson="java-regex"
          nextLesson="java-lambda"
          backToContentPath={`/learning/java`}
        />
      </main>
    </div>
  );
}
