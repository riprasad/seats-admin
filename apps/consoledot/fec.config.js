module.exports = {
  appUrl: '/ansible/wisdom',
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  _unstableHotReload: process.env.HOT === 'true',
  moduleFederation: {
    shared: [],
  },
  routes: {
    '/aw-api': {
      host: 'http://localhost:3000',
    },
    '/config': {
      host: 'http://localhost:8889',
    },
    '/beta/config': {
      host: 'http://localhost:8889',
    },
  },
};
