'use strict';
let axios = require('axios');

export default {
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
	create: (credentials) => {
		return axios.post('/users', credentials)
			.then(function(response) {
				return response.data;
			});
	},
	search: (criteria) => {
		return axios.post('/search/users', criteria)
			.then(function(response) {
				return response.data;
			});
	}
};
