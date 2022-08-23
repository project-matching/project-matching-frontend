/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: 'http://localhost:8080/:path*',
        source: '/api/:path*',
      },
    ];
  },
};
module.exports = nextConfig;
