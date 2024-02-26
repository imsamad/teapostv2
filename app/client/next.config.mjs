/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["shared"],
  async redirects() {
    return [
      {
        source: "/me",
        missing: [
          {
            type: "cookie",
            key: "auth-session",
          },
        ],

        permanent: false,
        destination: "/login",
      },
      {
        source: "/register",
        has: [
          {
            type: "cookie",
            key: "auth-session",
          },
        ],

        permanent: false,
        destination: "/me",
      },
      {
        source: "/auth/confirm/registration/:token",
        has: [
          {
            type: "cookie",
            key: "auth-session",
          },
        ],
        permanent: false,
        destination: "/me",
      },
      {
        source: "/login",
        has: [
          {
            type: "cookie",
            key: "auth-session",
          },
        ],

        permanent: false,
        destination: "/me",
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
