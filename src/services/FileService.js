'use strict';
let axios = require('axios');

export default {
	create: (data) => {
		return axios.post('/files', data)
			.then((response) => {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.post('/files/' + id, data)
			.then((response) => {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/files/' + id)
			.then((response) => {
				return response.data;
			});
	}
};
