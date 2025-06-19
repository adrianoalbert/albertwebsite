/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'www.credly.com',
      'learn.microsoft.com',
      'images.credly.com',
      'media.licdn.com',
      'www.youracclaim.com'
    ],
  },
  // Allow external access
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig 