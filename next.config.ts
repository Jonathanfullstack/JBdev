import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  // o root layout fica em app/[lang]; o 404 global precisa de arquivo próprio
  experimental: { globalNotFound: true },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/cartao/index.html', destination: '/cartao', permanent: true },
    ];
  },
  async rewrites() {
    // O cartão digital continua sendo a página estática antiga, na mesma URL.
    return [{ source: '/cartao', destination: '/cartao/index.html' }];
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/assents/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/assents/img/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
};

export default nextConfig;
