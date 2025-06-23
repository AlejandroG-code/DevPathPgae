// src/app/games/javascript/event-listener-labyrinth/data.ts

export interface EventListenerLabyrinthQuestion {
    id: string;
    description: string; // Descripción de la situación y la pregunta
    htmlSnippet: string; // El HTML del escenario
    jsSnippet: string; // El JavaScript con los event listeners
    triggerAction: string; // Qué acción dispara el evento (ej. "Clicking the 'Inner' div")
    correctOutput: string; // La salida esperada en la consola (formato multilínea)
    explanation: string; // Explicación del porqué de la salida
    options: string[]; // Opciones de selección múltiple para la salida
  }
  
  export const allEventListenerLabyrinthQuestions: EventListenerLabyrinthQuestion[] = [
    {
      id: 'js-ell-001',
      description: "Given the HTML and JavaScript, what will be logged to the console when the 'Inner' div is clicked?",
      htmlSnippet: `
  <div id="outer">
    Outer
    <div id="inner">
      Inner
    </div>
  </div>
      `,
      jsSnippet: `
  document.getElementById('outer').addEventListener('click', () => {
    console.log('Outer Clicked - Bubbling');
  });
  
  document.getElementById('inner').addEventListener('click', () => {
    console.log('Inner Clicked - Bubbling');
  });
      `,
      triggerAction: "Clicking the 'Inner' div",
      correctOutput: "Inner Clicked - Bubbling\nOuter Clicked - Bubbling",
      explanation: "When 'Inner' is clicked, its event listener fires first. Due to event bubbling, the event then propagates up to the 'Outer' div, whose listener also fires.",
      options: [
        "Inner Clicked - Bubbling\nOuter Clicked - Bubbling",
        "Outer Clicked - Bubbling\nInner Clicked - Bubbling",
        "Inner Clicked - Bubbling",
        "No output",
      ],
    },
    {
      id: 'js-ell-002',
      description: "Given the HTML and JavaScript, what will be logged to the console when the 'Inner' div is clicked? (Note the 'true' for capturing phase)",
      htmlSnippet: `
  <div id="outer">
    Outer
    <div id="inner">
      Inner
    </div>
  </div>
      `,
      jsSnippet: `
  document.getElementById('outer').addEventListener('click', () => {
    console.log('Outer Clicked - Bubbling');
  });
  
  document.getElementById('inner').addEventListener('click', () => {
    console.log('Inner Clicked - Bubbling');
  });
  
  document.getElementById('outer').addEventListener('click', () => {
    console.log('Outer Clicked - Capturing');
  }, true); // Capturing phase
      `,
      triggerAction: "Clicking the 'Inner' div",
      correctOutput: "Outer Clicked - Capturing\nInner Clicked - Bubbling\nOuter Clicked - Bubbling",
      explanation: "Event propagation starts with the capturing phase (from window down to target) then the bubbling phase (from target up to window). The capturing listener on 'Outer' fires first, then the 'Inner' div's bubbling listener, and finally the 'Outer' div's bubbling listener.",
      options: [
        "Outer Clicked - Capturing\nInner Clicked - Bubbling\nOuter Clicked - Bubbling",
        "Inner Clicked - Bubbling\nOuter Clicked - Bubbling\nOuter Clicked - Capturing",
        "Outer Clicked - Bubbling\nInner Clicked - Bubbling",
        "Outer Clicked - Capturing\nInner Clicked - Bubbling",
      ],
    },
    {
      id: 'js-ell-003',
      description: "What happens when 'Inner' is clicked? (`event.stopPropagation()`)",
      htmlSnippet: `
  <div id="outer">
    Outer
    <div id="inner">
      Inner
    </div>
  </div>
      `,
      jsSnippet: `
  document.getElementById('outer').addEventListener('click', () => {
    console.log('Outer Clicked');
  });
  
  document.getElementById('inner').addEventListener('click', (event) => {
    event.stopPropagation();
    console.log('Inner Clicked');
  });
      `,
      triggerAction: "Clicking the 'Inner' div",
      correctOutput: "Inner Clicked",
      explanation: "`event.stopPropagation()` prevents the event from bubbling up (or down in capturing phase) to parent elements. So, 'Outer' div's listener will not be triggered.",
      options: [
        "Inner Clicked",
        "Inner Clicked\nOuter Clicked",
        "Outer Clicked\nInner Clicked",
        "No output",
      ],
    },
    {
      id: 'js-ell-004',
      description: "What happens when the link is clicked? (`event.preventDefault()`)",
      htmlSnippet: `
  <a id="mylink" href="https://example.com">Visit Example</a>
      `,
      jsSnippet: `
  document.getElementById('mylink').addEventListener('click', (event) => {
    event.preventDefault();
    console.log('Link click prevented!');
  });
      `,
      triggerAction: "Clicking the 'Visit Example' link",
      correctOutput: "Link click prevented!",
      explanation: "`event.preventDefault()` stops the default action associated with an event. For a link, the default action is navigation. The `console.log` will still run.",
      options: [
        "Link click prevented!",
        "Link click prevented!\nNavigates to example.com",
        "Navigates to example.com",
        "Error",
      ],
    },
    {
      id: 'js-ell-005',
      description: "What will be logged to the console when the button inside the parent is clicked?",
      htmlSnippet: `
  <div id="parent">
    <button id="myButton">Click Me</button>
  </div>
      `,
      jsSnippet: `
  document.getElementById('parent').addEventListener('click', (event) => {
    if (event.target.id === 'myButton') {
      console.log('Button clicked via parent listener!');
    }
  });
  
  document.getElementById('myButton').addEventListener('click', () => {
    console.log('Button clicked directly!');
  });
      `,
      triggerAction: "Clicking the 'Click Me' button",
      correctOutput: "Button clicked directly!\nButton clicked via parent listener!",
      explanation: "When the button is clicked, its direct listener fires first. Then, due to bubbling, the event propagates to the 'parent' div, and its listener (which checks `event.target`) also fires.",
      options: [
        "Button clicked directly!\nButton clicked via parent listener!",
        "Button clicked via parent listener!\nButton clicked directly!",
        "Button clicked directly!",
        "Button clicked via parent listener!",
      ],
    },
  ];