import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**', // Tüm yolları kabul etmek için
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Cloudinary hostname
        pathname: '/**', // Cloudinary'nin tüm yollarını kabul etmek için
      },
    ],
  },
};

export default nextConfig;
