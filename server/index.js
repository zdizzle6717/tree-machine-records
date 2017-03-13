'use strict';

require('babel-core/register');

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiAuthJwt = require('hapi-auth-jwt2');
let models = require('./models');
let env = require('../envVariables');

// Create Server
const server = new Hapi.Server();
server.connection({
    port: env.port
});

const options = {
    info: {
        'title': 'ReactJs, Hapi Stack API Documentation',
        'version': '0.0.1',
    },
    basePath: '/api/',
    pathPrefixSize: 2,
    tags: [{
        'name': 'movies'
    }, {
        'name': 'directors'
    }],
};

const validateUser = (decodedToken, request, callback) => {
	// TODO: Investigate ways to improve validation and allow access based on specific request and related user details
	let error;
	let credentials = {
		'id': decodedToken.id,
		'username': decodedToken.username,
		'scope': decodedToken.scope
	};

	return callback(error, true, credentials);
};

// Register Swagger Plugin ( Use for documentation and testing purpose )
server.register([
    Inert,
    Vision, {
        register: HapiSwagger,
        options: options
    }],
	{
	    routes: {
	        prefix: '/api'
	    }
	},
	function(err) {
	    if (err) {
	        server.log(['error'], 'hapi-swagger load error: ' + err);
	    } else {
	        server.log(['start'], 'hapi-swagger interface loaded');
	    }
	}
);

// Register hapi-auth-jwt Plugin
server.register(HapiAuthJwt, (err) => {
	server.auth.strategy('jsonWebToken', 'jwt', {
		key: env.secret,
		validateFunc: validateUser,
		verifyOptions: {
			algorithms: ['HS256']
		}
	});
});

// Routes
server.route(require('./routes'));

models.sequelize.sync().then(function() {
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
