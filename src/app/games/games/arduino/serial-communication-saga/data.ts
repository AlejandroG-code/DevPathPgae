// src/app/games/arduino/serial-communication-saga/data.ts

export interface SerialCommunicationQuestion {
    id: string;
    task: string; // Description of what to achieve
    codeSnippet: string; // Code template with blanks
    blankPlaceholder: string; // Text for the input field placeholder
    correctAnswer: string; // Expected code for the blank
    explanation: string; // Explanation of the solution
  }
  
  export const allSerialCommunicationQuestions: SerialCommunicationQuestion[] = [
    {
      id: 'serial-saga-001',
      task: "Initialize serial communication at a common baud rate of 9600.",
      codeSnippet: `void setup() {
    Serial./* YOUR ANSWER HERE */(9600);
  }
  
  void loop() {
    // Main loop
  }`,
      blankPlaceholder: "begin / print",
      correctAnswer: "begin",
      explanation: "`Serial.begin(baudRate)` initializes the serial port, setting the data rate in bits per second (baud)."
    },
    {
      id: 'serial-saga-002',
      task: "Print the text 'Hello Serial!' to the Serial Monitor, followed by a new line.",
      codeSnippet: `void setup() {
    Serial.begin(9600);
  }
  
  void loop() {
    Serial./* YOUR ANSWER HERE */("Hello Serial!");
    delay(1000);
  }`,
      blankPlaceholder: "print / println",
      correctAnswer: "println",
      explanation: "`Serial.println()` prints data to the serial port followed by a carriage return and a newline character, moving the cursor to the next line in the Serial Monitor."
    },
    {
      id: 'serial-saga-003',
      task: "Print the value of a variable 'sensorValue' to the Serial Monitor without a new line.",
      codeSnippet: `int sensorValue = 102;
  void setup() {
    Serial.begin(9600);
  }
  
  void loop() {
    Serial./* YOUR ANSWER HERE */(sensorValue);
    delay(100);
  }`,
      blankPlaceholder: "print / println",
      correctAnswer: "print",
      explanation: "`Serial.print()` prints data to the serial port. Unlike `println()`, it does not append a newline character, allowing subsequent prints to appear on the same line."
    },
    {
      id: 'serial-saga-004',
      task: "Check if there is incoming serial data available to be read.",
      codeSnippet: `void setup() {
    Serial.begin(9600);
  }
  
  void loop() {
    if (Serial./* YOUR ANSWER HERE */() > 0) {
      // Data is available
    }
  }`,
      blankPlaceholder: "available / read",
      correctAnswer: "available",
      explanation: "`Serial.available()` returns the number of bytes (characters) available for reading from the serial buffer. A value greater than 0 means there's data to read."
    },
    {
      id: 'serial-saga-005',
      task: "Read the first incoming byte of serial data.",
      codeSnippet: `char incomingByte;
  void setup() {
    Serial.begin(9600);
  }
  
  void loop() {
    if (Serial.available() > 0) {
      incomingByte = Serial./* YOUR ANSWER HERE */();
      Serial.print("Received: ");
      Serial.println(incomingByte);
    }
  }`,
      blankPlaceholder: "read / write",
      correctAnswer: "read",
      explanation: "`Serial.read()` reads the first incoming byte of serial data. This byte is then removed from the serial buffer."
    },
    {
      id: 'serial-saga-006',
      task: "Clear the serial input buffer (e.g., after reading an entire command).",
      codeSnippet: `void setup() {
    Serial.begin(9600);
  }
  
  void loop() {
    if (Serial.available() > 0) {
      Serial.read(); // Read one byte
      Serial./* YOUR ANSWER HERE */(); // Clear the rest
    }
  }`,
      blankPlaceholder: "flush / end",
      correctAnswer: "flush",
      explanation: "`Serial.flush()` waits for the transmission of outgoing serial data to complete. **Note:** On newer Arduino cores (like ESP32/ESP8266), `Serial.flush()` might also clear the input buffer, but its primary purpose is output. For reliably clearing input buffer, a loop with `while(Serial.available()) Serial.read();` is often preferred."
    },
    {
      id: 'serial-saga-007',
      task: "Print the ASCII value of a character 'c'.",
      codeSnippet: `char myChar = 'A';
  void setup() {
    Serial.begin(9600);
    Serial.print("ASCII value of A: ");
    Serial./* YOUR ANSWER HERE */((int)myChar);
  }
  
  void loop() {
    // nothing
  }`,
      blankPlaceholder: "println / print",
      correctAnswer: "println",
      explanation: "`Serial.println()` can print different data types. Casting `myChar` to `(int)` forces `Serial.println()` to print its ASCII integer value rather than the character itself, followed by a new line."
    },
    {
      id: 'serial-saga-008',
      task: "Check if the serial port is ready for use (especially useful for boards with native USB serial).",
      codeSnippet: `void setup() {
    while (!Serial) {
      ; // wait for serial port to connect. Needed for native USB port only
    }
    Serial./* YOUR ANSWER HERE */(9600);
  }
  
  void loop() {
    // communication
  }`,
      blankPlaceholder: "begin / ready",
      correctAnswer: "begin", // The while (!Serial) block ensures the USB serial is ready before calling begin.
      explanation: "For boards with native USB serial (like Leonardo, ESP32, ESP8266), `while (!Serial)` is a common idiom in `setup()` to wait until the serial connection is established with the computer before proceeding with `Serial.begin()` or other serial operations."
    },
    {
      id: 'serial-saga-009',
      task: "Send a byte value (e.g., 65) over the serial port.",
      codeSnippet: `void setup() {
    Serial.begin(9600);
  }
  
  void loop() {
    Serial./* YOUR ANSWER HERE */(65); // Sends ASCII 'A'
    delay(1000);
  }`,
      blankPlaceholder: "write / print",
      correctAnswer: "write",
      explanation: "`Serial.write()` sends raw binary data (a byte or array of bytes) over the serial port. When given an integer, it sends the byte corresponding to that integer's value (e.g., 65 is ASCII for 'A')."
    },
    {
      id: 'serial-saga-010',
      task: "Use a formatted print function to combine text and a variable using F-macros for efficiency.",
      codeSnippet: `int value = 123;
  void setup() {
    Serial.begin(9600);
    Serial.print(/* YOUR ANSWER HERE */("Value: "));
    Serial.println(value);
  }
  
  void loop() {
    // nothing
  }`,
      blankPlaceholder: "F / String",
      correctAnswer: "F",
      explanation: "The `F()` macro is used to store string literals in Flash memory (program memory) instead of RAM (dynamic memory). This is crucial for memory-constrained Arduinos to save valuable RAM space when dealing with constant strings."
    },
  ];