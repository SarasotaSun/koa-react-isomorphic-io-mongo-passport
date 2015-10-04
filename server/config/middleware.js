import webpack from 'webpack';
let config = require('../../webpack/webpack.config.dev.js');
let compiler = webpack(config);

module.exports = function(app){

app.use(require('koa-webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('koa-webpack-hot-middleware')(compiler));	
}