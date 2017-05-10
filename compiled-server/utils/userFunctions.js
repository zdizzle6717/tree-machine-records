'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserRoleFlags = exports.hashPassword = exports.verifyCredentials = exports.verifyUniqueUser = undefined;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _roleConfig = require('../../roleConfig');

var _roleConfig2 = _interopRequireDefault(_roleConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyUniqueUser = function verifyUniqueUser(req, res) {
  _models2.default.User.find({
    where: {
      $or: [{
        email: req.payload.email
      }, {
        username: req.payload.username
      }]
    }
  }).then(function (user) {
    if (user) {
      if (user.username === req.payload.username) {
        res(_boom2.default.badRequest('Username taken'));
      }
      if (user.email === req.payload.email) {
        res(_boom2.default.badRequest('Email taken'));
      }
    }

    res(req.payload);
  }).catch(function (response) {
    console.log(response);
  });
};

var hashPassword = function hashPassword(password, cb) {
  _bcrypt2.default.genSalt(10, function (err, salt) {
    _bcrypt2.default.hash(password, salt, function (error, hash) {
      return cb(err, hash);
    });
  });
};

var verifyCredentials = function verifyCredentials(req, res) {
  var password = req.payload.password;

  _models2.default.User.find({
    where: {
      $or: [{
        email: req.payload.username
      }, {
        username: req.payload.username
      }]
    }
  }).then(function (user) {
    if (user) {
      _bcrypt2.default.compare(password, user.password, function (err, isValid) {
        if (isValid) {
          res(user);
        } else {
          res(_boom2.default.badRequest('Incorrect password!'));
        }
      });
    } else {
      res(_boom2.default.badRequest('Incorrect username or email!'));
    }
  }).catch(function (response) {
    console.log(response);
  });
};

var getUserRoleFlags = function getUserRoleFlags(user) {
  var userRoleFlags = 0;
  _roleConfig2.default.forEach(function (role) {
    if (user[role.name]) {
      userRoleFlags += role.roleFlags;
    }
  });

  return userRoleFlags;
};

exports.verifyUniqueUser = verifyUniqueUser;
exports.verifyCredentials = verifyCredentials;
exports.hashPassword = hashPassword;
exports.getUserRoleFlags = getUserRoleFlags;