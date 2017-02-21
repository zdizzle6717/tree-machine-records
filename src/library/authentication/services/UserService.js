'use strict';
let axios = require('axios');

export default {
	get: (id) => {
		return axios.get('/users/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/users')
			.then(function(response) {
				return response.data;
			});
	},
	create: (credentials) => {
		return axios.post('/users', credentials)
			.then(function(response) {
				return response.data;
			});
	},
	authenticate: (credentials) => {
		let args = {
			'method': 'POST',
			'url': '/users/authenticate',
			'auth': {
				'username': credentials.username,
				'password': credentials.password
			},
			'data': credentials
		};

		return axios(args)
			.then(function(response) {
				return response.data;
			});
	},
};
