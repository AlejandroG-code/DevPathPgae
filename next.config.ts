// next.config.ts
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Solo se habilitan las extensiones de archivo .ts, .tsx, .js, .jsx
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'], 
  reactStrictMode: true,
  images: {
    unoptimized: true, // Si usas optimización de imagen de Next.js, esto puede ayudar en Vercel
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL, 
  },
  experimental: {
    // Esto es necesario si sigues leyendo archivos del sistema con 'fs' en Server Components
    serverComponentsExternalPackages: ['sharp', 'sqlite3', 'fs'], 
  },
};

// Ya no hay configuración MDX, solo exportamos la configuración principal
export default nextConfig;
