/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    env: {
        title: 'Martfury',
        titleDescription: 'Multipurpose Marketplace React Ecommerce Template',
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'backend.eaconsultancy.info/', // Production hostname
                pathname: '/**', // Allow all paths
            },
            {
                protocol: 'http',
                hostname: 'localhost', // Local development hostname
                port: '5000', // Port for localhost (if required)
                pathname: '/**', // Allow all paths
            },
        ],
    },
};

module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: [
//             'backend.eaconsultancy.info', // আপনার live backend
//             'localhost', // dev server এর জন্য
//         ],
//     },
// };

// module.exports = nextConfig;
