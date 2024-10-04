// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['our-general-spotify-bucket.s3.eu-north-1.amazonaws.com', 'general-spotify-bucket.s3.eu-north-1.amazonaws.com', 'general-bucket-spotify.s3.eu-north-1.amazonaws.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'our-general-spotify-bucket.s3.eu-north-1.amazonaws.com',
          port: '',
          pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'general-spotify-bucket.s3.eu-north-1.amazonaws.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'general-bucket-spotify.s3.eu-north-1.amazonaws.com',
            port: '',
            pathname: '/**',
          },
      ],
    },
  };
  
  export default nextConfig;
  