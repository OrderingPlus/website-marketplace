const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const settings = require('./src/config.json')
const theme = require('./src/theme.json')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8400,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Ordering',
      ogTitle: theme?.my_products?.components?.website_settings?.components?.values?.name || settings.openGraphTags?.title,
      ogDescription: theme?.my_products?.components?.website_settings?.components?.values?.description || settings.openGraphTags?.description,
      ogSiteName: settings.openGraphTags?.site_name,
      ogImage: settings.openGraphTags?.image,
      template: './src/index.html'
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 70
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'public/icons', to: 'icons' },
    //   ]
    // }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
