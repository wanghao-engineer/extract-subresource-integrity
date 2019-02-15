/**
 * @param {{fileName: string}} options
 */
function ExtractSubresourceIntegrityPlugin(options = {}) {
  this.options = options;
}

ExtractSubresourceIntegrityPlugin.prototype.apply = function(compiler) {
  compiler.hooks.emit.tapAsync(
    "ExtractSubresourceIntegrityPlugin",
    (compilation, callback) => {
      const integrity = JSON.stringify(
        compilation.chunks.reduce(
          (acc, chunk) => ({
            ...acc,
            ...chunk.files.reduce(
              (files, file) => ({
                ...files,
                [file]: compilation.assets[file].integrity
              }),
              {}
            )
          }),
          {}
        )
      );
      const fileName = this.options.fileName || "subresource-integrity.json";
      compilation.assets[fileName] = {
        source() {
          return integrity;
        },
        size() {
          return integrity.length;
        }
      };
      callback();
    }
  );
};

module.exports = ExtractSubresourceIntegrityPlugin;
