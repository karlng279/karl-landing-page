/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/karl-landing-page',
  assetPrefix: '/karl-landing-page',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

