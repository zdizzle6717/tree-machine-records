'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (id) => {
		return axios.get('/embeddableMedias/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/embeddableMedias')
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/embeddableMedias', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/embeddableMedias/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/embeddableMedias/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
