// src/app/games/python/function-flow-fun/data.ts

export interface FunctionFlowFunQuestion {
    id: string;
    code: string; // El código completo de la función/es a analizar
    question: string; // La pregunta (ej. "¿Cuál será la salida en la consola?")
    options: string[]; // Posibles salidas para selección múltiple
    correctAnswer: string; // La opción correcta
    explanation: string; // Explicación del flujo de ejecución
  }
  
  export const allFunctionFlowFunQuestions: FunctionFlowFunQuestion[] = [
    {
      id: 'py-fff-001',
      code: `def greet(name):
      return f"Hello, {name}!"
  
  message = greet("Alice")
  print(message)
  `,
      question: "What will be printed to the console?",
      options: ["Hello, Alice!", "greet Alice", "message", "Error"],
      correctAnswer: "Hello, Alice!",
      explanation: "The `greet` function returns a formatted string, which is then assigned to `message` and printed.",
    },
    {
      id: 'py-fff-002',
      code: `def add(a, b):
      return a + b
  
  def multiply(x, y):
      return x * y
  
  result = multiply(add(2, 3), 4)
  print(result)
  `,
      question: "What will be the final value of 'result'?",
      options: ["20", "15", "12", "Error"],
      correctAnswer: "20",
      explanation: "First, `add(2, 3)` is called, which returns 5. Then, `multiply(5, 4)` is called, returning 20.",
    },
    {
      id: 'py-fff-003',
      code: `def calculate(num):
      if num > 5:
          return "Large"
      else:
          return "Small"
  
  output1 = calculate(7)
  output2 = calculate(3)
  print(output1)
  print(output2)
  `,
      question: "What will be the output, line by line?",
      options: ["Large\nSmall", "Small\nLarge", "Large", "Small"],
      correctAnswer: "Large\nSmall",
      explanation: "For `calculate(7)`, the `if` condition (7 > 5) is true, returning 'Large'. For `calculate(3)`, the `else` block is executed, returning 'Small'.",
    },
    {
      id: 'py-fff-004',
      code: `def outer_func(x):
      def inner_func(y):
          return x + y
      return inner_func
  
  closure = outer_func(10)
  result = closure(5)
  print(result)
  `,
      question: "What will be printed to the console?",
      options: ["15", "10", "5", "Error"],
      correctAnswer: "15",
      explanation: "This demonstrates a closure. `outer_func(10)` returns `inner_func` with `x` 'remembered' as 10. When `closure(5)` is called, `y` is 5, so 10 + 5 = 15.",
    },
    {
      id: 'py-fff-005',
      code: `def power(base, exp=2):
      return base ** exp
  
  print(power(3))
  print(power(2, 3))
  `,
      question: "What will be printed to the console, line by line?",
      options: ["9\n8", "6\n5", "9\n6", "8\n9"],
      correctAnswer: "9\n8",
      explanation: "The first call `power(3)` uses the default exponent of 2 (3**2 = 9). The second call `power(2, 3)` overrides the default, using 3 as the exponent (2**3 = 8).",
    },
  ];