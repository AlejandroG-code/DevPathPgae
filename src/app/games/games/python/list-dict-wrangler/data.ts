// src/app/games/python/list-dict-wrangler/data.ts

export interface ListDictWranglerQuestion {
    id: string;
    task: string; // Descripción de la tarea
    codeSnippet: string; // El código incompleto donde el usuario debe escribir
    correctAnswer: string; // La parte del código que debe insertar el usuario
    explanation: string; // Explicación de la solución
  }
  
  export const allListDictWranglerQuestions: ListDictWranglerQuestion[] = [
    {
      id: 'py-ldw-001',
      task: "Accede al tercer elemento de la lista 'my_list'. (Recuerda que los índices empiezan en 0)",
      codeSnippet: `my_list = [10, 20, 30, 40, 50]
  result = my_list[`,
      correctAnswer: `2]`,
      explanation: "En Python, los índices de las listas comienzan en 0. Para el tercer elemento (valor 30), usamos el índice 2.",
    },
    {
      id: 'py-ldw-002',
      task: "Añade el número 60 al final de la lista 'my_list'.",
      codeSnippet: `my_list = [10, 20, 30]
  my_list.`,
      correctAnswer: `append(60)`,
      explanation: "El método `append()` se utiliza para añadir un elemento al final de una lista en Python.",
    },
    {
      id: 'py-ldw-003',
      task: "Obtén el valor asociado a la clave 'city' del diccionario 'person'.",
      codeSnippet: `person = {'name': 'Alice', 'age': 30, 'city': 'New York'}
  city_name = person['`,
      correctAnswer: `city']`,
      explanation: "Puedes acceder a los valores de un diccionario usando la clave entre corchetes.",
    },
    {
      id: 'py-ldw-004',
      task: "Calcula la suma de todos los números en la lista 'numbers'.",
      codeSnippet: `numbers = [5, 10, 15, 20]
  total = sum(`,
      correctAnswer: `numbers)`,
      explanation: "La función incorporada `sum()` se puede usar para sumar todos los elementos de un iterable como una lista.",
    },
    {
      id: 'py-ldw-005',
      task: "Crea una nueva lista que contenga solo los números pares de 'original_list' usando una comprensión de lista.",
      codeSnippet: `original_list = [1, 2, 3, 4, 5, 6]
  even_numbers = [num for num in original_list if num % `,
      correctAnswer: `2 == 0]`,
      explanation: "Una comprensión de lista permite crear una nueva lista aplicando una expresión a cada elemento de un iterable y opcionalmente filtrando con una condición `if`.",
    },
  ];