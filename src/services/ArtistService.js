'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (param) => {
		return axios.get('/artists/' + param)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/artists')
			.then(function(response) {
				return response.data;
			});
	},
	search: (data) => {
		return axios.post('/artists/search', data)
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/artists', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/artists/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/artists/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
