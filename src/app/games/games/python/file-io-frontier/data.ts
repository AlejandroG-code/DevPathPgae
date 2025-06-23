// src/app/games/python/file-io-frontier/data.ts

export interface FileIOGameQuestion {
    id: string;
    task: string; // La tarea a realizar
    initialCode: string; // El código base que el usuario debe completar
    expectedOutputOrFileContent: string; // Lo que se espera que el código genere/contenga
    correctAnswerSnippet: string; // El fragmento de código que el usuario debe insertar
    explanation: string; // Explicación de la solución
    // Propiedad opcional para simular contenido inicial del archivo
    simulatedFileContent?: string;
  }
  
  export const allFileIOGameQuestions: FileIOGameQuestion[] = [
    {
      id: 'py-fio-001',
      task: "Abre el archivo 'data.txt' en modo lectura y lee su contenido completo.",
      initialCode: `file_name = 'data.txt'
  with open(file_name, 'r') as f:
      content = f.`,
      correctAnswerSnippet: `read()`,
      explanation: "El método `read()` lee el contenido completo de un archivo como una sola cadena.",
      simulatedFileContent: "Hello, Python files!\nLine 2.",
      expectedOutputOrFileContent: "Hello, Python files!\nLine 2.", // Lo que `content` debería ser
    },
    {
      id: 'py-fio-002',
      task: "Escribe la línea 'New line from Python!' al final del archivo 'log.txt'.",
      initialCode: `file_name = 'log.txt'
  line_to_write = 'New line from Python!\\n'
  with open(file_name, `,
      correctAnswerSnippet: `'a') as f:
      f.write(line_to_write)`,
      explanation: "Usa el modo 'a' (append) para añadir contenido al final del archivo. `f.write()` escribe la cadena.",
      simulatedFileContent: "Existing log content.\n", // Contenido antes de la operación
      expectedOutputOrFileContent: "Existing log content.\nNew line from Python!\n", // Contenido después
    },
    {
      id: 'py-fio-003',
      task: "Lee todas las líneas del archivo 'lines.txt' y almacénalas en una lista.",
      initialCode: `file_name = 'lines.txt'
  with open(file_name, 'r') as f:
      lines = f.`,
      correctAnswerSnippet: `readlines()`,
      explanation: "El método `readlines()` lee todas las líneas de un archivo y las devuelve como una lista de cadenas, incluyendo el carácter de nueva línea (`\\n`).",
      simulatedFileContent: "First line.\nSecond line.\nThird line.",
      expectedOutputOrFileContent: "['First line.\\n', 'Second line.\\n', 'Third line.']", // Representación de la lista
    },
    {
      id: 'py-fio-004',
      task: "Crea un nuevo archivo 'output.txt' y escribe 'This is a new file.' en él. Si ya existe, su contenido debe ser reemplazado.",
      initialCode: `file_name = 'output.txt'
  content_to_write = 'This is a new file.'
  with open(file_name, `,
      correctAnswerSnippet: `'w') as f:
      f.write(content_to_write)`,
      explanation: "Usa el modo 'w' (write) para abrir un archivo para escritura. Si el archivo no existe, lo crea; si existe, trunca su contenido.",
      simulatedFileContent: "Old content to be replaced.", // Contenido antes de la operación
      expectedOutputOrFileContent: "This is a new file.", // Contenido después
    },
    {
      id: 'py-fio-005',
      task: "Itera sobre las líneas de 'numbers.txt' e imprime cada línea (sin el caracter de nueva línea).",
      initialCode: `file_name = 'numbers.txt'
  with open(file_name, 'r') as f:
      for line in f:
          print(line.`,
      correctAnswerSnippet: `strip())`,
      explanation: "Al iterar directamente sobre un objeto de archivo, se obtienen las líneas. El método `strip()` elimina espacios en blanco (incluidos los saltos de línea) del inicio y final de la cadena.",
      simulatedFileContent: "1\n2\n3",
      expectedOutputOrFileContent: "1\n2\n3", // Salida simulada de print
    },
  ];