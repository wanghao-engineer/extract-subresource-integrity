# webpack-extract-subresource-integrity

This plugin work with [webpack-subresource-integrity](https://www.npmjs.com/package/webpack-subresource-integrity), it extract all integrity infomation into a single file.

## config example

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
      name: "subresource-integrity.json"
      extensions: ['js', 'css']
    })
  ]
};
```

## params

| param            | type       | usage                                                                                               | default value                |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| name             | `string`   | set the name of the extracted file                                                                  | `subresource-integrity.json` |
| extensions       | `string[]` | what kinds of files to extract integrity for                                                        | `['js', 'css']`              |
| appendPublicPath | `boolean`  | whether to append webpackConfig.output.publicPath(if exist) to the file names in the extracted file | `true`                       |
