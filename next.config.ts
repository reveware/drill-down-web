import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ['*.ngrok-free.app'], // ngrok host rotates on every agent restart, hence the wildcard.
  experimental: {
    optimizePackageImports: ['date-fns', 'react-day-picker'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drill-down-*.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },

  // Dev affordance: serve the API under our own origin so one ngrok tunnel covers the whole app.
  async rewrites() {
    // Server-side hop only. The browser never sees this value,
    const apiProxyTarget = process.env.API_PROXY_TARGET ?? 'http://localhost:8080';
    return [{ source: '/api/:path*', destination: `${apiProxyTarget}/api/:path*` }];
  },
};

export default nextConfig;
