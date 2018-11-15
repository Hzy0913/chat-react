const path = require('path');

module.exports = {
  dev: {
    host: '0.0.0.0',
    port: 8080,
    proxyTable: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    },
    useEslint: true,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    showEslintErrorsInOverlay: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    devtool: 'cheap-module-eval-source-map',
    poll: false,
    cacheBusting: true,
    cssSourceMap: false
  },
  build: {
    bundleAnalyzerReport: false,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  }
};
