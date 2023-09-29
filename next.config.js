/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
        serverActions: true,
        esmExternals: 'loose',
        serverComponentsExternalPackages: ['mongoose'],
    },
    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000/api' // development api
                : 'http://localhost:3000/api', // production api
    },
    webpack: (config) => {
        config.experiments = {
            topLevelAwait: true,
            layers: true,
        };
        return config;
    },
};

module.exports = nextConfig;
