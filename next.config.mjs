/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // React Compiler for automatic optimizations
  reactCompiler: true,

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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Compression
  compress: true,

  // Performance headers
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(js|css)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Short cache for documents that get updated (resume, etc.)
      {
        source: '/:all*(pdf|doc|docx)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache', // Always check server for latest version
          },
        ],
      },
    ]
  },

  // Experimental performance features
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
