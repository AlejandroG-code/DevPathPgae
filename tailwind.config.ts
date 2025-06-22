// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Nuevos colores base y acentos (si decides usarlos directamente aquí)
      colors: {
        'base-dark': '#161622', // Nuevo fondo base
        'card-bg': '#24243a',   // Fondo de tarjetas más claro y translúcido
        'vibrant-teal': '#00FFC6', // Tu teal vibrante
        'bright-orange': '#FF6B00', // Tu naranja brillante
        'accent-purple': '#6B00FF', // Un violeta/púrpura para acentos
      },
      // Configuración de background-image para gradientes radiales personalizados
      backgroundImage: {
        'radial-gradient-to-tr': 'radial-gradient(at top right, var(--tw-gradient-stops))',
        'radial-gradient-to-tl': 'radial-gradient(at top left, var(--tw-gradient-stops))',
      },
      // Animaciones personalizadas
      animation: {
        // Animación para las "luces" laterales (pulsación suave)
        'pulse-light': 'pulse-light 10s infinite ease-in-out alternate',
        // Animación para los puntos pequeños (parpadeo y pulso de tamaño)
        'dot-pulse': 'dot-pulse var(--animation-duration, 5s) infinite ease-in-out alternate, twinkle var(--animation-duration, 5s) infinite ease-in-out',
        // Animación de parpadeo (reutilizada para dot-pulse)
        twinkle: 'twinkle 3s infinite ease-in-out',
      },
      keyframes: {
        // Keyframes para la animación 'pulse-light'
        'pulse-light': {
          // Para que el `pulse-light` solo afecte escala y opacidad, los keyframes se verían así:
          '0%, 100%': { opacity: '0.7', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' }, // Pulso más sutil
        },
        // Keyframes para la animación 'dot-pulse'
        'dot-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
          '50%': { transform: 'scale(1.2)', opacity: '0.6' },
        },
        // Keyframes para la animación 'twinkle' (parpadeo, reutilizado)
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.8' },
        },
        
      },
    },
  },
  plugins: [],
};

export default config;
