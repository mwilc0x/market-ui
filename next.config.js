/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      remotePatterns: [
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
  }
}

module.exports = nextConfig
