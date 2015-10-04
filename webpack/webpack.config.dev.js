import path from 'path';
import webpack  from 'webpack';

let JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;
let rootPath = path.normalize(__dirname + '../../');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(rootPath, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    preLoaders: [
      {
        test: JS_REGEX,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],    
    loaders: [{
      test: JS_REGEX,
      loaders: ['babel'],
      include: path.join(rootPath, 'src')
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      exclude: /node_modules/
    }
    ]
  },
   eslint: {
    configFile: '.eslintrc'
  },
  // for koa middleware
   devServer: {
        host: process.env.USER_IP || 'localhost',
        port: 3000,
        publicPath: '/',        // Where webpack exposes bundles
                                //  on its own in-memory file system 
        hot: true,              // Switch on Hot Module Replacement
        indexEntry: 'index',    // Entry to add HNR code to (EntryChunk or CommonsChunk)
        secure: true,           // use https or http
        stats: {
            colors: true,
            hash: false,
            timings: false,
            assets: true,
            chunks: true,
            chunkModules: true,
            modules: false,
            children: true
        }
    }
};
