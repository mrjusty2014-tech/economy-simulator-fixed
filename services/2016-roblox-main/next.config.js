const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, path.sep + 'config.json');
if (!fs.existsSync(configPath)) {
  throw new Error('Configuration could not be found at location: ' + configPath);
}
const config = JSON.parse(fs.readFileSync(configPath).toString('utf-8'));
const backendBaseUrl = config.publicRuntimeConfig.backend.baseUrl;
const localBackendUrl = (() => {
  try {
    const url = new URL(backendBaseUrl);
    return url.hostname === 'localhost' || url.hostname === '127.0.0.1' ? url.origin : null;
  } catch {
    return null;
  }
})();

module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: config.serverRuntimeConfig,
  publicRuntimeConfig: config.publicRuntimeConfig,
  async redirects() {
    return [
      {
        source: '/catalog.aspx',
        destination: '/catalog',
        permanent: true,
      },
      /*
      {
        source: '/catalog/:id/:name',
        destination: '/redirect-item?id=:id',
        permanent: false,
      },
       */
      {
        source: '/groups/:id/:name',
        destination: '/My/Groups.aspx?gid=:id',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    if (!localBackendUrl) return [];

    return [
      {
        source: '/auth/:path*',
        destination: `${localBackendUrl}/auth/:path*`,
      },
      {
        source: '/apisite/:path*',
        destination: `${localBackendUrl}/apisite/:path*`,
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config
  },
}
