/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  // },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "aybrnzyhfswsxnkrtyeo.supabase.co",
            port: ""
          },
        ],
      },
};

module.exports = nextConfig;
