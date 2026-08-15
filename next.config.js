/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the workspace root so Next doesn't pick a parent lockfile
  turbopack: {
    root: __dirname,
  },
  // Allow the Emergent preview proxy hosts to reach Next dev resources (HMR, chunks)
  allowedDevOrigins: [
    'luxury-photo-demo.cluster-7.preview.emergentcf.cloud',
    '*.preview.emergentcf.cloud',
    '*.cluster-7.preview.emergentcf.cloud',
    '*.preview.emergentagent.com',
    '*.emergentcf.cloud',
    '*.emergentagent.com',
  ],
};

module.exports = nextConfig;
