'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (id) => {
		return axios.get('/contactLists/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/contactLists')
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/contactLists', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/contactLists/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/contactLists/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
