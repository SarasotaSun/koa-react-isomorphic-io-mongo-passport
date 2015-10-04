'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _nodeWatch = require('node-watch');

var _nodeWatch2 = _interopRequireDefault(_nodeWatch);

var _lodash = require('lodash');

var server = undefined;
var started = undefined;
var serverReload = undefined;
var KOA_PATH = _path2['default'].join(__dirname, '../../server/index');

var startServer = function startServer() {
  // Define `restartServer`
  var restartServer = function restartServer() {
    (0, _debug2['default'])('dev')('restarting koa application');
    serverReload = true;
    server.kill('SIGTERM');
    return startServer();
  };

  // merge env for the new process
  var env = _extends({}, process.env, { NODE_ENV: 'development', BABEL_ENV: 'server' });
  // start the server procress
  server = _child_process2['default'].fork(KOA_PATH, { env: env });
  // when server is `online`
  server.once('message', function (message) {
    if (message.match(/^online$/)) {
      if (serverReload) {
        serverReload = false;
        _browserSync2['default'].reload();
      }
      if (!started) {
        started = true;

        // Start browserSync
        (0, _browserSync2['default'])({
          port: parseInt(process.env.PORT, 10) + 2 || 3002,
          proxy: '0.0.0.0:' + (parseInt(process.env.PORT, 10) || 3000)
        });

        // Listen for `rs` in stdin to restart server
        (0, _debug2['default'])('dev')('type `rs` in console for restarting koa application');
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function (data) {
          var parsedData = (data + '').trim().toLowerCase();
          if (parsedData === 'rs') return restartServer();
        });

        // Start watcher on server files
        // and reload browser on change
        (0, _nodeWatch2['default'])(_path2['default'].join(__dirname, '../../server'), function (file) {
          return !file.match('webpack-stats.json') ? restartServer() : (0, _lodash.noop)();
        });
      }
    }
  });
};

// kill server on exit
process.on('exit', function () {
  return server.kill('SIGTERM');
});

exports['default'] = function () {
  return !server ? startServer() : (0, _lodash.noop)();
};

module.exports = exports['default'];

//# sourceMappingURL=start-koa-compiled.js.map