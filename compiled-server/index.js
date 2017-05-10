'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _hapiSwagger = require('hapi-swagger');

var _hapiSwagger2 = _interopRequireDefault(_hapiSwagger);

var _hapiAuthJwt = require('hapi-auth-jwt2');

var _hapiAuthJwt2 = _interopRequireDefault(_hapiAuthJwt);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _envVariables = require('../envVariables');

var _envVariables2 = _interopRequireDefault(_envVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-core/register');

// Create Server
var server = new _hapi2.default.Server();
server.connection({
				port: _envVariables2.default.port
});

var options = {
				info: {
								'title': 'ReactJs, Hapi Stack API Documentation',
								'version': '0.0.1'
				},
				basePath: '/api/',
				pathPrefixSize: 2,
				tags: [{
								'name': 'movies'
				}, {
								'name': 'directors'
				}]
};

var validateUser = function validateUser(decodedToken, request, callback) {
				// TODO: Investigate ways to improve validation and allow access based on specific request and related user details
				var error = void 0;
				var credentials = {
								'id': decodedToken.id,
								'username': decodedToken.username,
								'scope': decodedToken.scope
				};

				return callback(error, true, credentials);
};

// Register Swagger Plugin ( Use for documentation and testing purpose )
server.register([_inert2.default, _vision2.default, {
				register: _hapiSwagger2.default,
				options: options
}], {
				routes: {
								prefix: '/api'
				}
}, function (err) {
				if (err) {
								server.log(['error'], 'hapi-swagger load error: ' + err);
				} else {
								server.log(['start'], 'hapi-swagger interface loaded');
				}
});

// Register hapi-auth-jwt Plugin
server.register(_hapiAuthJwt2.default, function (err) {
				if (err) {
								console.log(err);
								return;
				}
				server.auth.strategy('jsonWebToken', 'jwt', {
								key: _envVariables2.default.secret,
								validateFunc: validateUser,
								verifyOptions: {
												algorithms: ['HS256']
								}
				});

				// Routes
				server.route(_routes2.default);
});

_models2.default.sequelize.sync().then(function () {
				server.start(function (err) {
								if (err) {
												throw err;
								}
								console.log('Server running at:', server.info.uri);
				});
});