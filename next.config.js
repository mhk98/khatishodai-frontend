// const nextSettings = {
//     //transpilePackages: ['ahooks'],
//     // optimizeFonts: false,

//     eslint: {
//         ignoreDuringBuilds: true,
//     },
//     env: {
//         title: 'Martfury',
//         titleDescription: 'Multipurpose Marketplace React Ecommerce Template',
//     },
//     experimental: {
//         missingSuspenseWithCSRBailout: false,
//     },
//     images: {
//         remotePatterns: [

//             {
//                 protocol: 'https',
//                 hostname: 'api.fishnmeatbd.com',
//                 port: '8080', // HTTPS এর জন্য কোনও নির্দিষ্ট পোর্ট প্রয়োজন নেই
//                 pathname: '/**', // নিশ্চিত করুন যে সঠিক পাথ ব্যবহার করছেন
//               },
//             {
//                 protocol: 'http',
//                 hostname: 'localhost',
//                 port: '8080',
//                 pathname: '/**', // নিশ্চিত করুন যে সঠিক পাথ ব্যবহার করছেন
//               },
//         ],
//     },

// };

// module.exports = nextSettings;

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

module.exports = nextConfig;
