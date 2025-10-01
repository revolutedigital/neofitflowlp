import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignora erros de ESLint durante o build de produção
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
