/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // unoptimized : true,
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'unimig.directus.app'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'medusa.unimig.com.au'
            },
            {
                protocol: 'https',
                hostname: 'pim.unimig.com.au'
            }
        ],
    },
};

export default nextConfig;
