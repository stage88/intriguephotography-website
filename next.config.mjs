/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'bin',
}

export default config
