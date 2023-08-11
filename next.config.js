/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      loader: 'custom',
      loaderFile: './supabase-image-loader.js',
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'pjiybecehatvdpefgnck.supabase.co',
          port: '',
          pathname: '/**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;