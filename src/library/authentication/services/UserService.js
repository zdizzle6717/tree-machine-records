'use strict';
let axios = require('axios');

export default {
	authenticate: (credentials) => {
		return axios.post('/users/authenticate', credentials)
			.then(function(response) {
				return response.data;
			});
	},
	authenticateFromToken: (data) => {
		return axios.post('/users/getMe/' + data.id_token, {
			'rememberMe': data.rememberMe
		})
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
	remove: (id) => {
		return axios.delete('/users/' + id)
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
