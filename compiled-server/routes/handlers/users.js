'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _envVariables = require('../../../envVariables.js');

var _envVariables2 = _interopRequireDefault(_envVariables);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _createToken = require('../../utils/createToken');

var _createToken2 = _interopRequireDefault(_createToken);

var _userFunctions = require('../../utils/userFunctions');

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _pendingAccountActivation = require('../../emailTemplates/pendingAccountActivation');

var _pendingAccountActivation2 = _interopRequireDefault(_pendingAccountActivation);

var _registrationSuccess = require('../../emailTemplates/registrationSuccess');

var _registrationSuccess2 = _interopRequireDefault(_registrationSuccess);

var _roleConfig = require('../../../roleConfig');

var _roleConfig2 = _interopRequireDefault(_roleConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var transporter = _nodemailer2.default.createTransport({
  'service': 'Gmail',
  'auth': {
    'type': 'OAuth2',
    'clientId': _envVariables2.default.email.OAuth2.clientId,
    'clientSecret': _envVariables2.default.email.OAuth2.clientSecret
  }
});

// App users
var users = {
  create: function create(request, reply) {
    (0, _userFunctions.hashPassword)(request.payload.password, function (err, hash) {
      var userConfig = {
        'email': request.payload.email,
        'username': request.payload.username,
        'firstName': request.payload.firstName,
        'lastName': request.payload.lastName,
        'password': hash
      };
      _roleConfig2.default.forEach(function (role) {
        if (role.name !== 'public') {
          userConfig[role.name] = false;
        }
      });
      userConfig[request.payload.role] = true;
      _models2.default.User.create(userConfig).then(function (user) {
        var newUserMailConfig = void 0;
        if (request.payload.role === 'artist' || request.payload.role === 'recordLabel') {
          newUserMailConfig = {
            'from': _envVariables2.default.email.user,
            'to': user.email,
            'subject': 'Welcome to Tree Machine Records!',
            'html': (0, _pendingAccountActivation2.default)(user)
          };
          transporter.sendMail({
            'from': _envVariables2.default.email.user,
            'to': _envVariables2.default.email.user,
            'subject': 'New Artist/Label Account Request',
            'html': (0, _pendingAccountActivation2.default)(user),
            'auth': {
              'user': _envVariables2.default.email.user,
              'refreshToken': _envVariables2.default.email.OAuth2.refreshToken
            }
          }, function () {
            console.log('Account Application: CCd to admin');
          });
        } else {
          newUserMailConfig = {
            'from': _envVariables2.default.email.user,
            'to': user.email,
            'subject': 'Welcome to Tree Machine Records!',
            'html': (0, _registrationSuccess2.default)(user),
            'auth': {
              'user': _envVariables2.default.email.user,
              'refreshToken': _envVariables2.default.email.OAuth2.refreshToken
            }
          };
        }
        transporter.sendMail(newUserMailConfig, function (error, info) {
          if (error) {
            console.log(error);
            reply('Something went wrong');
          } else {
            console.log(info.messageId + ': New email sent.');
            reply({
              'id': user.id,
              'email': user.email,
              'username': user.username,
              'firstName': user.firstName,
              'lastName': user.lastName,
              'roleFlags': (0, _userFunctions.getUserRoleFlags)(user),
              'id_token': (0, _createToken2.default)(user)
            }).code(201);
          }
        });
      }).catch(function (response) {
        throw _boom2.default.badRequest(response);
      });
    });
  },
  authenticate: function authenticate(request, reply) {
    reply({
      'id': request.pre.user.id,
      'email': request.pre.user.email,
      'username': request.pre.user.username,
      'firstName': request.pre.user.firstName,
      'lastName': request.pre.user.lastName,
      'roleFlags': (0, _userFunctions.getUserRoleFlags)(request.pre.user),
      'id_token': (0, _createToken2.default)(request.pre.user)
    }).code(201);
  },
  getAll: function getAll(request, reply) {
    _models2.default.User.findAll({
      'attributes': ['username', 'email', 'createdAt'],
      'limit': 50,
      'order': '"updatedAt" DESC'
    }).then(function (users) {
      reply(users).code(200);
    });
  },
  'search': function search(request, reply) {
    var searchByConfig = void 0;
    var pageSize = request.payload.pageSize || 20;
    var searchQuery = request.payload.searchQuery || '';
    var offset = (request.payload.pageNumber - 1) * pageSize;
    if (searchQuery) {
      searchByConfig = request.payload.searchBy ? _defineProperty({}, request.payload.searchBy, {
        '$like': '%' + searchQuery + '%'
      }) : {
        '$or': [{
          'username': {
            '$like': '%' + searchQuery + '%'
          }
        }, {
          'email': {
            '$like': '%' + searchQuery + '%'
          }
        }, {
          'lastName': {
            '$like': '%' + searchQuery + '%'
          }
        }]
      };
    } else {
      searchByConfig = {};
    }
    _models2.default.User.findAndCountAll({
      'where': searchByConfig,
      'offset': offset,
      'limit': pageSize
    }).then(function (response) {
      var count = response.count;
      var results = response.rows;
      var totalPages = Math.ceil(count === 0 ? 1 : count / pageSize);

      reply({
        'pagination': {
          'pageNumber': request.payload.pageNumber,
          'pageSize': pageSize,
          'totalPages': totalPages,
          'totalResults': count
        },
        'results': results
      }).code(200);
    });
  },
  update: function update(request, reply) {
    _models2.default.User.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (user) {
      if (user) {
        user.updateAttributes({
          'subscriber': request.payload.subscriber,
          'artist': request.payload.artist,
          'recordStore': request.payload.recordStore,
          'recordLabel': request.payload.recordLabel
        }).then(function (user) {
          reply(user).code(200);
        });
      } else {
        reply().code(404);
      }
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.User.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (user) {
      if (user) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = users;