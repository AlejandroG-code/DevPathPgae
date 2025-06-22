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
    },
  },
  
  },
  plugins: [],
};

export default config;
