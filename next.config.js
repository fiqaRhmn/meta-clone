/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://1000logos.net'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig
