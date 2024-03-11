/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/me/:path*',
        missing: [
          {
            type: 'cookie',
            key: 'AUTHED_USER_SESSION',
          },
        ],

        permanent: false,
        destination: '/login',
      },
      {
        source: '/register',
        has: [
          {
            type: 'cookie',
            key: 'AUTHED_USER_SESSION',
          },
        ],

        permanent: false,
        destination: '/me',
      },
      {
        source: '/auth/confirm/registration/:token',
        has: [
          {
            type: 'cookie',
            key: 'AUTHED_USER_SESSION',
          },
        ],
        permanent: false,
        destination: '/me',
      },
      {
        source: '/login',
        has: [
          {
            type: 'cookie',
            key: 'AUTHED_USER_SESSION',
          },
        ],

        permanent: false,
        destination: '/me',
      },
    ];
  },
  output: 'standalone',
  reactStrictMode: false,
  rewrites: async () => {
    return [
      {
        source: '/xx/:path',
        destination: '/author',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
