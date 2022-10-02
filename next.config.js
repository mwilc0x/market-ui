/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shdw-drive.genesysgo.net',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'devnet-solprint.infura-ipfs.io',
        pathname: '/ipfs/**'
      },
      {
        protocol: 'https',
        hostname: 'solprint.infura-ipfs.io',
        pathname: '/ipfs/**'
      },
      {
        protocol: 'https',
        hostname: 'famousfoxes.com',
        pathname: '/hd/**',
      },

      {
        protocol: 'https',
        hostname: 'assets.holaplex.tools',
        pathname: '/arweave/**',
      },
      {
        protocol: 'https',
        hostname: 'assets1.holaplex.tools',
        pathname: '/arweave/**',
      },
      {
        protocol: 'https',
        hostname: 'assets2.holaplex.tools',
        pathname: '/arweave/**',
      },
      {
        protocol: 'https',
        hostname: 'assets3.holaplex.tools',
        pathname: '/arweave/**',
      },
      {
        protocol: 'https',
        hostname: 'assets4.holaplex.tools',
        pathname: '/arweave/**',
      },

      {
        protocol: 'https',
        hostname: 'assets.holaplex.tools',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'assets1.holaplex.tools',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'assets2.holaplex.tools',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'assets3.holaplex.tools',
        pathname: '/ipfs/**',
      },
      {
        protocol: 'https',
        hostname: 'assets4.holaplex.tools',
        pathname: '/ipfs/**',
      },

      {
        protocol: 'https',
        hostname: 'famousfoxes.com',
        pathname: '/hd/**',
      },
      
    ],
  },
  experimental: {
    enableUndici: false
  }
}

module.exports = nextConfig
