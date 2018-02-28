const path = require('path');
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",

  // Necessary for __dirname and __filename to work correctly when bundling with Webpack for the dev environment.
  // XXX See https://github.com/webpack/webpack/issues/1599
  node: {
    __dirname: true,
    __filename: true,
  },
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          helperDirs: path.join(__dirname, 'src/helpers'),
          partialDirs: path.join(__dirname, 'src/partials'),
          precompileOptions: {
            knownHelpersOnly: false, // Allow additional helpers at runtime
          },
        },
      }
    ]
  },
};