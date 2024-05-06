module.exports = {
  GenerateSW: options => {
    // override GenerateSW config here
    options.clientsClaim = true
    options.skipWaiting = true
    options.exclude = [
      /\.DS_Store$/,
      /\.htaccess$/
    ]
    return options
  },
  InjectManifest: options => {
    // override InjectManifest config here
    // e.g. options.maximumFileSizeToCacheInBytes = 10 * 1024 * 1024;
    return options
  }
}
