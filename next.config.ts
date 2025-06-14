import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'drill-down-users-bucket.s3.us-east-1.amazonaws.com',
      'picsum.photos',
      'randomuser.me',
    ],
  },
};

export default nextConfig;
