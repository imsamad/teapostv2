/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ];
  },
};

export default nextConfig;
