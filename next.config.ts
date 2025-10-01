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
  output: 'standalone',
  // Força SSR para todas as páginas ao invés de SSG
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
