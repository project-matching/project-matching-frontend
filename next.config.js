/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        destination: 'http://localhost:8080/:path*',
        // destination: 'http://3.39.48.25:8080/swagger-ui.html/:path*',
        source: '/api/:path*',
      },
    ];
  },
};
module.exports = nextConfig;
