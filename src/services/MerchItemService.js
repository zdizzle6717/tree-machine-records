'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (id) => {
		return axios.get('/merchItems/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/merchItems')
			.then(function(response) {
				return response.data;
			});
	},
	search: (data) => {
		return axios.post('/merchItems/search', data)
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/merchItems', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/merchItems/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/merchItems/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
