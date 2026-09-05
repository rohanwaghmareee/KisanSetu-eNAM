/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep output: 'export' for static hosting, but add route support
  output: 'export',
  basePath: '/KisanSetu-eNAM',
  assetPrefix: '/KisanSetu-eNAM/',
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
  trailingSlash: true,
}

module.exports = nextConfig