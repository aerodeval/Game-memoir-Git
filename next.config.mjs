/** @type {import('next').NextConfig} */
const nextConfig = {
    deploy: 'npm run build && gh-pages -d build',
    target: 'server',
 


};

export default nextConfig;
