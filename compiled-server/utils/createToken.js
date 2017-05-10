'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _envVariables = require('../../envVariables');

var _envVariables2 = _interopRequireDefault(_envVariables);

var _roleConfig = require('../../roleConfig');

var _roleConfig2 = _interopRequireDefault(_roleConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createToken = function createToken(user) {
  var scopes = [];
  _roleConfig2.default.forEach(function (role) {
    if (user[role.name]) {
      scopes.push(role.name);
    }
  });

  // Sign the JWT
  return _jsonwebtoken2.default.sign({ id: user.id, username: user.username, scope: scopes }, _envVariables2.default.secret, { algorithm: 'HS256', expiresIn: '2h' });
};

exports.default = createToken;