/* eslint-disable */
require('babel/register');
// clean `.tmp` && `dist`
require('./utils/clean-dist')();

var path = require('path');
var webpack = require('webpack');
var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;
var rootPath = path.normalize(__dirname + '../../')

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index'
  ],
  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: JS_REGEX,
      loaders: ['babel'],
      include: path.join(rootPath, 'app')
    },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
