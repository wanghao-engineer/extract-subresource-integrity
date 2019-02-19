/**
 * @param {{name: string, extensions: string[]}} options
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
      } = this.options

      const integrity = JSON.stringify(
        Object.keys(compilation.assets)
          .filter(asset => new RegExp(`(${extensions.join('|')})$`).test(asset))
          .reduce(
            (acc, asset) => ({
              ...acc,
              [asset]: compilation.assets[asset].integrity,
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
