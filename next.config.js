/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: [
      'dicoding-web-img.sgp1.cdn.digitaloceanspaces.com',
      'dicoding.com',
      'www.dicoding.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dicoding-web-img.sgp1.cdn.digitaloceanspaces.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.dicoding.com',
        pathname: '/**',
      }
    ]
  },
  // Generate static files for Netlify only in production
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  // Ensure trailing slashes are used for better compatibility
  trailingSlash: true,
  // Only set distDir in production to avoid development server issues
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
}

module.exports = nextConfig
