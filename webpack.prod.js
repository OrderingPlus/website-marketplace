const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const settings = require('./src/config.json')
const theme = require('./src/theme.json')

module.exports = merge(common, {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[contenthash].js'
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
      maximumFileSizeToCacheInBytes: 1024 * 1024 * 70,
      exclude: [/\.DS_Store$/, /\.htaccess$/]
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'public/icons', to: 'icons' },
    //   ]
    // }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 2500000
    },
    minimizer: [
      '...',
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true, optimizationLevel: 7 }],
              ['jpegtran', { progressive: true, optimizationLevel: 7 }],
              ['optipng', { optimizationLevel: 7 }],
              [
                'svgo',
                {
                  plugins: [
                    {
                      name: 'removeViewBox',
                      active: false
                    },
                    {
                      name: 'addAttributesToSVGElement',
                      params: {
                        attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
                      }
                    }
                  ]
                }
              ]
            ]
          }
        }
      })
    ]
  }
})
