// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // tailwind.config.ts
theme: {
    extend: {
        keyframes: {
            'move-slow': {
              '0%': { transform: 'translateX(0) translateY(0)' },
              '100%': { transform: 'translateX(20px) translateY(20px)' },
            },
            'move-medium': {
              '0%': { transform: 'translateX(0) translateY(0)' },
              '100%': { transform: 'translateX(40px) translateY(-30px)' },
            },
            'move-fast': {
              '0%': { transform: 'translateX(0) translateY(0)' },
              '100%': { transform: 'translateX(-60px) translateY(40px)' },
            },
            'star-twinkle': {
            '0%, 100%': { opacity: '0.2' },
            '50%': { opacity: '1' },
            },
            'pulse-slow': {
            '0%, 100%': { opacity: '0.5' },
            '50%': { opacity: '1' },
            },
            'float-fast': {
            '0%, 100%': { transform: 'translateY(-10px)' },
            '50%': { transform: 'translateY(10px)' },
            },
            'float-medium': {
            '0%, 100%': { transform: 'translateY(-6px)' },
            '50%': { transform: 'translateY(6px)' },
            },
          },
      boxShadow: {
        neumorphic: '8px 8px 16px #0a0a12, -8px -8px 16px #16161e',
        insetNeumorphic: 'inset 4px 4px 8px #0a0a12, inset -4px -4px 8px #16161e',
      },
      borderRadius: {
        'neumorphic': '1.5rem',
      },
      colors: {
        surface: '#0e0e15',
        highlight: '#1a1a27',
      },
      animation: {
    'move-slow': 'move-slow 20s ease-in-out infinite alternate',
    'move-medium': 'move-medium 15s ease-in-out infinite alternate',
    'move-fast': 'move-fast 10s ease-in-out infinite alternate',
    'star-twinkle': 'star-twinkle 4s ease-in-out infinite',
    'pulse-slow': 'pulse-slow 6s ease-in-out infinite',
    'float-fast': 'float-fast 5s ease-in-out infinite',
    'float-medium': 'float-medium 8s ease-in-out infinite',
    'pulse-medium': 'pulse-slow 4s ease-in-out infinite',

  },
    },
  },
  
  },
  plugins: [],
  

};

export default config;
