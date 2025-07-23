/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove appDir as it's default in Next.js 14
  // Optimize for production
  swcMinify: true,
  compress: true,
  // Enable static optimization
  trailingSlash: false,
  // Optimize build performance
  output: 'standalone',
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
