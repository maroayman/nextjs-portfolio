/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',

  // Disable image optimization (not supported in static export)
  // Images will load directly from source URLs
  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // React Compiler for automatic optimizations
  reactCompiler: true,

  // Compression
  compress: true,

  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,
}

export default nextConfig
