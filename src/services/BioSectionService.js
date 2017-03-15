'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	get: (id) => {
		return axios.get('/bioSections/' + id)
			.then(function(response) {
				return response.data;
			});
	},
	getAll: () => {
		return axios.get('/bioSections')
			.then(function(response) {
				return response.data;
			});
	},
	create: (data) => {
		return axios.post('/bioSections', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/bioSections/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/bioSections/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
