const CracoWorkboxPlugin = require('craco-workbox')

module.exports = {
  webpack: {
    configure: (webpackConfig, { paths }) => {
      webpackConfig.resolve.alias = {
        '~': paths.appSrc + '/',
        '~components': paths.appSrc + '/@/components/src',
        '~ui': paths.appSrc + '/ui'
      }
      return webpackConfig
    }
  },
  plugins: [{
    plugin: CracoWorkboxPlugin
  }]
}
