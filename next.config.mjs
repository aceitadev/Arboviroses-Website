/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    // Remove console.* em produção, exceto erros/avisos.
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    // three e libs 3D são grandes; otimiza imports de barrels.
    optimizePackageImports: ['lucide-react', '@react-three/drei'],
  },
};

export default nextConfig;
