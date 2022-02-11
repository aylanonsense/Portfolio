/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

const nextConfig = withSvgr({
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  }
})

module.exports = nextConfig
