/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: "/scrapperweb",
  rewrites() {
    return [
      {
        source: "/scrapperweb/_next/:path*",
        destination: "/_next/:path*",
      },
    ];
  },
}

module.exports = nextConfig
