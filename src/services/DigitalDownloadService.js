'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (id) => {
		return axios.get('/digitalDownloads/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/digitalDownloads')
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/digitalDownloads', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/digitalDownloads/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/digitalDownloads/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
