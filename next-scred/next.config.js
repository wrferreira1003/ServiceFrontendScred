/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      "images.unsplash.com",
      "tailwindui.com",
      "github.com",
      "127.0.0.1",
      'rcfacil.cloud',
    ],
  },
};

module.exports = nextConfig;
