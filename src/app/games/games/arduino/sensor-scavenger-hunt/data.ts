// src/app/games/arduino/sensor-scavenger-hunt/data.ts

export interface SensorScavengerHuntQuestion {
    id: string;
    task: string; // Describes the sensor and what to do
    codeSnippet: string; // Code template with blanks
    blankPlaceholder: string; // Text for the input field placeholder
    correctAnswer: string; // Expected code for the blank
    explanation: string; // Explanation of the solution
  }
  
  export const allSensorScavengerHuntQuestions: SensorScavengerHuntQuestion[] = [
    {
      id: 'sensor-hunt-001',
      task: "You have a photoresistor (LDR) connected to analog pin A0. Read its value and print it to Serial Monitor.",
      codeSnippet: `void setup() {
    Serial.begin(9600);
  }
  
  void loop() {
    int lightValue = analogRead(A0);
    Serial./* YOUR ANSWER HERE */(lightValue);
    delay(100);
  }`,
      blankPlaceholder: "println / print",
      correctAnswer: "println",
      explanation: "`Serial.println()` is used to print the `lightValue` to the Serial Monitor, followed by a newline for readability. An LDR (Light Dependent Resistor) provides analog input based on light intensity."
    },
    {
      id: 'sensor-hunt-002',
      task: "A common way to connect a photoresistor (LDR) to an analog pin (A0) for reading is with a 10k ohm resistor forming a voltage divider. Where should the 10k ohm resistor be connected?",
      codeSnippet: `// LDR connection:
  // One LDR leg to 5V.
  // The other LDR leg to A0.
  // And from that same A0 pin, connect a 10k ohm resistor to /* YOUR ANSWER HERE */.
  `,
      blankPlaceholder: "GND / 3.3V / Digital Pin",
      correctAnswer: "GND",
      explanation: "To create a voltage divider with an LDR and read it with an analog pin, one end of the LDR goes to 5V, the other to the analog pin, and from that same analog pin, a fixed resistor (e.g., 10kΩ) goes to GND. The analog pin then reads the voltage drop across the fixed resistor."
    },
    {
      id: 'sensor-hunt-003',
      task: "You're using a passive buzzer connected to digital pin 8. Make it produce a tone at 500 Hz for 1 second.",
      codeSnippet: `void setup() {
    pinMode(8, OUTPUT); // Buzzer pin
  }
  
  void loop() {
    /* YOUR ANSWER HERE */(8, 500, 1000); // pin, frequency, duration
    delay(2000); // Wait 2 seconds before next tone
  }`,
      blankPlaceholder: "tone / noTone",
      correctAnswer: "tone",
      explanation: "`tone(pin, frequency, duration)` generates a square wave of the specified frequency (in Hz) on a pin for a given duration (in milliseconds). This is used for buzzers."
    },
    {
      id: 'sensor-hunt-004',
      task: "Stop the tone being produced by the buzzer on pin 8.",
      codeSnippet: `void setup() {
    pinMode(8, OUTPUT);
  }
  
  void loop() {
    tone(8, 500, 1000);
    delay(1000);
    /* YOUR ANSWER HERE */(8); // Stop the tone
    delay(2000);
  }`,
      blankPlaceholder: "noTone / tone",
      correctAnswer: "noTone",
      explanation: "`noTone(pin)` stops the generation of a square wave initiated by `tone()` on a specific pin."
    },
    {
      id: 'sensor-hunt-005',
      task: "You have a potentiometer connected to analog pin A1. Read its value and map it to a range of 0 to 255 for an LED brightness (PWM).",
      codeSnippet: `int potValue = 0;
  int ledBrightness = 0;
  
  void setup() {
    pinMode(9, OUTPUT); // PWM pin for LED
  }
  
  void loop() {
    potValue = analogRead(A1);
    ledBrightness = /* YOUR ANSWER HERE */(potValue, 0, 1023, 0, 255);
    analogWrite(9, ledBrightness);
  }`,
      blankPlaceholder: "map / constrain",
      correctAnswer: "map",
      explanation: "`map(value, fromLow, fromHigh, toLow, toHigh)` re-maps a number from one range to another. Here, it converts the analog read range (0-1023) to the PWM range (0-255)."
    },
    {
      id: 'sensor-hunt-006',
      task: "Read the state of a PIR motion sensor connected to digital pin 4 (active HIGH). Print 'Motion detected!' if motion is found.",
      codeSnippet: `void setup() {
    Serial.begin(9600);
    pinMode(4, INPUT); // PIR sensor pin
  }
  
  void loop() {
    int pirState = digitalRead(4);
    if (pirState == /* YOUR ANSWER HERE */) {
      Serial.println("Motion detected!");
    }
    delay(500);
  }`,
      blankPlaceholder: "HIGH / LOW",
      correctAnswer: "HIGH",
      explanation: "Many PIR motion sensors output a HIGH signal when motion is detected and LOW when there's no motion. Therefore, you check if `digitalRead(4)` is HIGH."
    },
    {
      id: 'sensor-hunt-007',
      task: "You're using a DS18B20 temperature sensor (OneWire protocol) connected to pin 2. What library is typically required to communicate with it?",
      codeSnippet: `#include <OneWire.h>
  /* YOUR ANSWER HERE */ <DallasTemperature.h>
  
  OneWire oneWire(2);
  DallasTemperature sensors(&oneWire);
  
  void setup() {
    Serial.begin(9600);
    sensors.begin(); // Start the sensor
  }
  
  void loop() {
    // read temperature
  }`,
      blankPlaceholder: "#include / #define",
      correctAnswer: "#include",
      explanation: "The `#include` directive is used to include external libraries in your sketch. For the DS18B20, you typically need both `OneWire.h` and `DallasTemperature.h`."
    },
    {
      id: 'sensor-hunt-008',
      task: "After requesting temperatures from a DS18B20 sensor, retrieve the temperature in Celsius from the first device found.",
      codeSnippet: `#include <OneWire.h>
  #include <DallasTemperature.h>
  
  OneWire oneWire(2);
  DallasTemperature sensors(&oneWire);
  
  void setup() {
    Serial.begin(9600);
    sensors.begin();
  }
  
  void loop() {
    sensors.requestTemperatures(); // Send the command to get temperatures
    float tempC = sensors./* YOUR ANSWER HERE */(0); // Get temp from the first device
    Serial.print("Temperature: ");
    Serial.println(tempC);
    delay(2000);
  }`,
      blankPlaceholder: "getTempCByIndex / getTempFByIndex",
      correctAnswer: "getTempCByIndex",
      explanation: "`sensors.getTempCByIndex(index)` retrieves the temperature in Celsius from a specific device on the OneWire bus, identified by its index (0 for the first device)."
    },
    {
      id: 'sensor-hunt-009',
      task: "Control a Servo motor connected to pin 9 to move to an angle of 90 degrees.",
      codeSnippet: `#include <Servo.h>
  
  Servo myServo;
  
  void setup() {
    myServo.attach(9); // Attaches the servo on pin 9
  }
  
  void loop() {
    myServo./* YOUR ANSWER HERE */(90); // Move to 90 degrees
    delay(1000);
  }`,
      blankPlaceholder: "write / read",
      correctAnswer: "write",
      explanation: "`myServo.write(angle)` sets the servo to the specified angle, usually between 0 and 180 degrees."
    },
    {
      id: 'sensor-hunt-010',
      task: "You have a standard ultrasonic sensor (HC-SR04) with its 'Trig' pin on D9 and 'Echo' pin on D10. Measure the distance.",
      codeSnippet: `const int trigPin = 9;
  const int echoPin = 10;
  long duration; // Variable for the duration of sound wave travel
  int distanceCm; // Variable for the distance measurement
  
  void setup() {
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
    Serial.begin(9600);
  }
  
  void loop() {
    // Clear the trigPin by setting it LOW for 2 microseconds:
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    // Set the trigPin on HIGH state for 10 microseconds:
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
  
    // Read the echoPin, returns the sound wave travel time in microseconds:
    duration = /* YOUR ANSWER HERE */(echoPin, HIGH);
    
    // Calculate the distance:
    distanceCm = duration * 0.034 / 2; // Speed of sound in cm/µs divided by 2 (round trip)
    Serial.print("Distance: ");
    Serial.print(distanceCm);
    Serial.println(" cm");
    delay(100);
  }`,
      blankPlaceholder: "pulseIn / digitalRead",
      correctAnswer: "pulseIn",
      explanation: "`pulseIn(pin, value)` reads a pulse (either HIGH or LOW) on a pin. It waits for the pin to go to `value`, starts timing, waits for the pin to go to the other `value`, and stops timing, returning the duration of the pulse in microseconds. This is ideal for ultrasonic sensors to measure the time it takes for sound to travel."
    },
  ];