/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilitar compresión para mejorar la velocidad de carga
  compress: true,
  // Optimizar para producción
  reactStrictMode: true,
  // Optimizar fuentes
  optimizeFonts: true,
  headers: async () => [
    {
      source: '/:all*(svg|jpg|png|webp)',
      locale: false,
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
        },
        {
          key: 'Pragma',
          value: 'no-cache'
        },
        {
          key: 'Expires',
          value: '0'
        }
      ]
    },
    {
      source: '/_next/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
        },
        {
          key: 'Pragma',
          value: 'no-cache'
        },
        {
          key: 'Expires',
          value: '0'
        }
      ]
    },
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate'
        },
        {
          key: 'Pragma',
          value: 'no-cache'
        },
        {
          key: 'Expires',
          value: '0'
        }
      ]
    }
  ],
  images: {
    domains: ['i.imgur.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 0,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    };

    // Optimización de chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 70000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    };

    return config;
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
    modularizeImports: {
      'react-icons/?(((\\w*)?/?)*)': {
        transform: 'react-icons/{{ matches.[1] }}/{{member}}',
        skipDefaultConversion: true
      }
    }
  },
  swcMinify: true
};

module.exports = nextConfig;
