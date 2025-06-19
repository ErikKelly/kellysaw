/** @type {import('next').NextConfig} */
const nextConfig = {
//  output: 'export',
  // Add any other configurations you need
  images: {
    unoptimized: true, // Required for static export with images
  },
}

module.exports = nextConfig