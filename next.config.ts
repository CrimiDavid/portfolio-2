import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        // This will completely ignore all TypeScript errors during build
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
