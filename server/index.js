'use strict';

require('babel-core/register');

import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import HapiAuthJwt from 'hapi-auth-jwt2';
import models from './models';
import routes from './routes';
import env from '../envVariables';

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
	if (err) {
		console.log(err);
		return;
	}
	server.auth.strategy('jsonWebToken', 'jwt', {
		key: env.secret,
		validateFunc: validateUser,
		verifyOptions: {
			algorithms: ['HS256']
		}
	});

	// Routes
	server.route(routes);
});

models.sequelize.sync().then(function() {
    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
