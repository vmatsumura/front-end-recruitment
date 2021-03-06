const Config = require('./common.config');
const Path = require('path');
const Webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');

require('babel-core/register');
require.resolve('babel-polyfill');

module.exports = {
  name: 'index',
  entry: {
    index: [
      'react-hot-loader/patch',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      Config.entryFile
    ]
  },
  output: {
    filename: `index.js`,
    path: Config.bundlePath
  },
  devServer: {
    contentBase: Config.bundlePath,
    historyApiFallback: true,
    hot: true,
    port: 8080
  },
  resolve: Config.resolve,
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        // loader : 'semistandard-loader',
        exclude: /node_modules/,
	  	use: {
    loader: 'semistandard-loader',
    options: {
      parser: 'babel-eslint'
    }
  }
      },
      ...Config.rules
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HTMLWebpackPlugin({
      // basePath: '/',
      template: Path.join(__dirname, '..', 'index.ejs')
    }),
    new Webpack.HotModuleReplacementPlugin(),
    ...Config.plugins
  ]
};
