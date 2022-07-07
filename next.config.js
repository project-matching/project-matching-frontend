/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: 'http://3.39.48.25:8080/:path*',
        source: '/api/:path*',
      },
    ];
  },
};
module.exports = nextConfig;
