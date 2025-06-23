// src/app/games/arduino/pin-power-up/data.ts

export interface PinPowerUpQuestion {
  id: string;
  task: string; // Description of what to achieve
  codeSnippet: string; // Code template with blanks
  blankPlaceholder: string; // Text for the input field placeholder
  correctAnswer: string; // Expected code for the blank
  explanation: string; // Explanation of the solution
}

export const allPinPowerUpQuestions: PinPowerUpQuestion[] = [
  {
    id: 'pin-power-up-001',
    task: "Configure pin 7 as an OUTPUT for controlling an LED.",
    codeSnippet: `void setup() {
  pinMode(7, /* YOUR ANSWER HERE */);
}

void loop() {
  // Game logic goes here
}`,
    blankPlaceholder: "OUTPUT / INPUT",
    correctAnswer: "OUTPUT",
    explanation: "`pinMode(pin, mode)` sets the specified pin to behave either as an INPUT or an OUTPUT. For controlling an LED, the pin must be an OUTPUT."
  },
  {
    id: 'pin-power-up-002',
    task: "Turn ON an LED connected to pin 13.",
    codeSnippet: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  /* YOUR ANSWER HERE */(13, HIGH);
  delay(1000);
}`,
    blankPlaceholder: "digitalWrite / digitalRead",
    correctAnswer: "digitalWrite",
    explanation: "`digitalWrite(pin, value)` writes a HIGH or LOW value to a digital pin. HIGH means setting the pin's voltage to 5V (or 3.3V), effectively turning on an LED."
  },
  {
    id: 'pin-power-up-003',
    task: "Turn OFF an LED connected to pin 13.",
    codeSnippet: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, /* YOUR ANSWER HERE */);
  delay(1000);
}`,
    blankPlaceholder: "HIGH / LOW",
    correctAnswer: "LOW",
    explanation: "`digitalWrite(pin, LOW)` sets the pin's voltage to 0V, effectively turning off an LED connected to it."
  },
  {
    id: 'pin-power-up-004',
    task: "Read the state of a pushbutton connected to pin 2.",
    codeSnippet: `int buttonState = 0; // variable to store the button status

void setup() {
  pinMode(2, INPUT);
}

void loop() {
  buttonState = /* YOUR ANSWER HERE */(2);
}`,
    blankPlaceholder: "digitalRead / analogRead",
    correctAnswer: "digitalRead",
    explanation: "`digitalRead(pin)` reads the state of a digital pin (either HIGH or LOW), commonly used for pushbuttons or switches."
  },
  {
    id: 'pin-power-up-005',
    task: "Set pin 9 to a PWM value of 128 to dim an LED.",
    codeSnippet: `void setup() {
  // Pin 9 is usually a PWM pin by default
}

void loop() {
  /* YOUR ANSWER HERE */(9, 128);
}`,
    blankPlaceholder: "analogWrite / digitalWrite",
    correctAnswer: "analogWrite",
    explanation: "`analogWrite(pin, value)` writes an analog value (PWM wave) to a pin. For compatible pins (marked with '~'), this can be used to control LED brightness or motor speed, with values from 0 (off) to 255 (full on)."
  },
  {
    id: 'pin-power-up-006',
    task: "Pause the program for 2 seconds.",
    codeSnippet: `void setup() {
  // nothing
}

void loop() {
  // do something
  /* YOUR ANSWER HERE */(2000); // 2000 milliseconds = 2 seconds
  // do something else
}`,
    blankPlaceholder: "delay / millis",
    correctAnswer: "delay",
    explanation: "`delay(ms)` pauses the program for the specified number of milliseconds. 2000 milliseconds equals 2 seconds."
  },
  {
    id: 'pin-power-up-007',
    task: "Configure an input pin with an internal pull-up resistor (for a pushbutton).",
    codeSnippet: `void setup() {
  pinMode(4, /* YOUR ANSWER HERE */);
}

void loop() {
  // read button state
}`,
    blankPlaceholder: "INPUT_PULLUP / INPUT / OUTPUT",
    correctAnswer: "INPUT_PULLUP",
    explanation: "`INPUT_PULLUP` enables the Arduino's internal pull-up resistor on the input pin. This is useful for pushbuttons, as it ensures the pin is HIGH when the button is not pressed, and LOW when pressed (connecting to GND)."
  },
  {
    id: 'pin-power-up-008',
    task: "Read the analog value from analog pin A0.",
    codeSnippet: `void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = /* YOUR ANSWER HERE */(A0);
  Serial.println(sensorValue);
}`,
    blankPlaceholder: "analogRead / digitalRead",
    correctAnswer: "analogRead",
    explanation: "`analogRead(pin)` reads the voltage on an analog input pin (A0-A5 on most Arduinos) and converts it to a digital value between 0 and 1023."
  },
  {
    id: 'pin-power-up-009',
    task: "Declare an integer variable named 'buttonCount' and initialize it to zero.",
    codeSnippet: `void setup() {
  // ...
}

void loop() {
  /* YOUR ANSWER HERE */ buttonCount = 0;
  // ...
}`,
    blankPlaceholder: "int / float / char",
    correctAnswer: "int",
    explanation: "`int` is the data type used for storing whole numbers (integers) in Arduino (C++)."
  },
  {
    id: 'pin-power-up-010',
    task: "Use a simple 'if' statement to check if a digital pin (e.g., pin 5) is HIGH.",
    codeSnippet: `void setup() {
  pinMode(5, INPUT);
}

void loop() {
  /* YOUR ANSWER HERE */ (digitalRead(5) == HIGH) {
    // Pin is high
  }
}`,
    blankPlaceholder: "if / while / for",
    correctAnswer: "if",
    explanation: "The `if` statement is used to execute a block of code conditionally, in this case, if the state of digital pin 5 is HIGH."
  },
];