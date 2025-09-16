import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['react-markdown', 'remark-gfm'],
  typescript: {
    // Completely ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  experimental: {
    esmExternals: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Ignore specific node_modules TypeScript errors
    config.module.rules.push({
      test: /node_modules.*\.(ts|tsx)$/,
      use: 'ignore-loader',
    });
    
    // Add ignore-loader for problematic packages
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-markdown/lib/complex-types': false,
    };
    
    if (!dev) {
      // Production optimizations
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
