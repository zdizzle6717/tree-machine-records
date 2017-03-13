'use strict';
let axios = require('axios');

export default {
	create: (data) => {
		return axios.post('/files', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.post('/files/' + id, data)
			.then(function(response) {
				return response.data;
			});
	}
};
