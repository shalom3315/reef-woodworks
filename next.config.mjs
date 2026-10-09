/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false }
    return config
  },
  images: {
    // Supabase sends no-cache; without this Vercel re-fetches originals every minute.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: '*.gstatic.com' },
    ],
  },
  async redirects() {
    const oldHosts = [
      'reef-woodworks.vercel.app',
      'woodworking-landing-three.vercel.app',
      'woodworking-landing-reef-woodworks.vercel.app',
      'woodworking-landing-git-main-reef-woodworks.vercel.app',
    ]
    return oldHosts.map((host) => ({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: 'https://reefwoodwork.com/:path*',
      permanent: true,
    }))
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
}

export default nextConfig
