'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (id) => {
		return axios.get('/albumReleases/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/albumReleases')
			.then(function(response) {
				return response.data;
			});
	},
	search: (data) => {
		return axios.post('/albumReleases/search', data)
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/albumReleases', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/albumReleases/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/albumReleases/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
