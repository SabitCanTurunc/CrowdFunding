import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**', // Tüm yolları kabul etmek için
      },
    ],
  },
};


export default nextConfig;
