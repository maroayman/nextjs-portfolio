/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
        pathname: '/res/hashnode/image/**',
      },
      {
        protocol: 'https',
        hostname: '**.hashnode.dev',
        port: '',
        pathname: '/**',
      }
    ],
    unoptimized: true,
  },
}

export default nextConfig
