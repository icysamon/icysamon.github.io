import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.icysamon.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
