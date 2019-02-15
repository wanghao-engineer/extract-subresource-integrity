# webpack-extract-subresource-integrity

This plugin work with [webpack-subresource-integrity](https://www.npmjs.com/package/webpack-subresource-integrity), it extract all integrity infomation into a single file.

config example:

```js
const SriPlugin = require("webpack-subresource-integrity");
const ExtractSriPlugin = require("webpack-extract-subresource-integrity");

const webpackConfig = {
  // ...
  plugins: [
    new SriPlugin({
      hashFuncNames: ["sha256", "sha384"]
    }),
    new ExtractSriPlugin({
      // set to name of the output file, default to 'subresource-integrity.json'
      name: "subresource-integrity.json"
      // what kinds of files to extract integrity for, it applys to the compiled file, not source files
      extensions: ['js', 'css']
    })
  ]
};
```
