'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

exports['default'] = function () {
  var DIST_PATH = _path2['default'].resolve(__dirname, '../../dist/*');
  _del2['default'].sync([DIST_PATH]);
  (0, _debug2['default'])('dev')('cleaned `dist` directory');
};

module.exports = exports['default'];

//# sourceMappingURL=clean-dist-compiled.js.map