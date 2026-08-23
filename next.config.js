/** @type {import('next').NextConfig} */
const nextConfig = {
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