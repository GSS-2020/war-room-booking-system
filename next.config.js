/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Optimize for production
  swcMinify: true,
  compress: true,
  // Enable static optimization
  trailingSlash: false,
  // Environment variables for client side (if needed)
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // Image domains (if using next/image with external sources)
  images: {
    domains: [],
  },
}

module.exports = nextConfig
