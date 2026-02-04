import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ===== CONFIGURATION NETLIFY =====
  // NE PAS utiliser 'standalone' avec Netlify (géré par le plugin)
  // output: 'standalone', // ❌ Désactivé pour Netlify
  
  // ===== OPTIMISATION DES IMAGES =====
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // ===== COMPILER OPTIONS =====
  compiler: {
    // Supprimer les console.log en production (sauf error et warn)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // ===== OPTIMISATION DU BUNDLE =====
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-toast',
      'date-fns',
      'recharts',
    ],
  },
  
  // ===== HEADERS DE SÉCURITÉ =====
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
    ];
  },
  
  // ===== REDIRECTIONS =====
  async redirects() {
    return [
      // Exemple: rediriger /home vers /
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // ===== CONFIGURATION TYPESCRIPT =====
  typescript: {
    // ⚠️ En production, ne pas ignorer les erreurs TypeScript
    ignoreBuildErrors: false,
  },
  
  // ===== CONFIGURATION ESLINT =====
  eslint: {
    // ⚠️ En production, ne pas ignorer les erreurs ESLint
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
