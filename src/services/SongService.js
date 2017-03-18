'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (id) => {
		return axios.get('/songs/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/songs')
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/songs', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/songs/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/songs/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
