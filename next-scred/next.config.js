/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images:{
    domains: [
      'images.unsplash.com',
      'tailwindui.com',
    ]
  },
  modularizeImports: {
    "@phosphor-icons/react": {
      transform: "@phosphor-icons/react/dist/icons/{{member}}",
    },
  },
}

module.exports = nextConfig
