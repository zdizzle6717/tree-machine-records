'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (id) => {
		return axios.get('/mediaMentions/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/mediaMentions')
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/mediaMentions', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/mediaMentions/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/mediaMentions/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
