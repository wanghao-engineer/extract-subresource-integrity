/**
 * @param {{name: string, extensions: string[], appendPublicPath: boolean}} options
 */
function ExtractSubresourceIntegrityPlugin(options = {}) {
  this.options = options
}

ExtractSubresourceIntegrityPlugin.prototype.apply = function(compiler) {
  compiler.hooks.emit.tapAsync(
    'ExtractSubresourceIntegrityPlugin',
    (compilation, callback) => {
      const {
        name = 'subresource-integrity.json',
        extensions = ['js', 'css'],
        appendPublicPath = true,
      } = this.options

      const prefix =
        appendPublicPath && compilation.outputOptions.publicPath
          ? compilation.outputOptions.publicPath
          : ''
      const integrity = JSON.stringify(
        Object.keys(compilation.assets)
          .filter(asset => new RegExp(`(${extensions.join('|')})$`).test(asset))
          .reduce(
            (acc, asset) => ({
              ...acc,
              [`${prefix}${asset}`]: compilation.assets[asset].integrity,
            }),
            {}
          )
      )
      compilation.assets[name] = {
        source() {
          return integrity
        },
        size() {
          return integrity.length
        },
      }
      callback()
    }
  )
}

module.exports = ExtractSubresourceIntegrityPlugin
