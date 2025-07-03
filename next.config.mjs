/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.infolomba.id',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rbnysgijwzdfbqcjpupr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;