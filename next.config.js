/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://1000logos.net', 'platform-lookaside.fbsbx.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig
