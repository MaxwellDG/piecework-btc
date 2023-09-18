/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    experimental: {
        serverActions: true,
    },
    serverRuntimeConfig: {
        connectionString: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.t0meamb.mongodb.net/?retryWrites=true&w=majority`,
        secret: process.env.JWT_SECRET,
    },
    publicRuntimeConfig: {
        apiUrl:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000/api' // development api
                : 'http://localhost:3000/api', // production api
    },
};

module.exports = nextConfig;
