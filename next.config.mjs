/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion'],
  },

  async redirects() {
    return [
      // Old domain -> new domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'drmayurkumargoyal.com' }],
        destination: 'https://mayurchildrenhospital.in/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.drmayurkumargoyal.com' }],
        destination: 'https://mayurchildrenhospital.in/:path*',
        permanent: true,
      },

      // www -> non-www on the new domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.mayurchildrenhospital.in' }],
        destination: 'https://mayurchildrenhospital.in/:path*',
        permanent: true,
      },

      // http -> https (only works if your proxy sends x-forwarded-proto)
      // Remove this rule if you use Cloudflare "Flexible" SSL (can cause a loop)
      // or if your server/hosting already handles the https redirect.
      {
        source: '/:path*',
        has: [{ type: 'header', key: 'x-forwarded-proto', value: 'http' }],
        destination: 'https://mayurchildrenhospital.in/:path*',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/images/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.mayurchildrenhospital.in' }],
      destination: 'https://mayurchildrenhospital.in/:path*',
      permanent: true,
    },
    ];
  },
};

export default nextConfig;