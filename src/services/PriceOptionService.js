'use strict';
let axios = require('axios');

function cleanData(data) {
	return data;
}

export default {
	create: (data) => {
		return axios.post('/priceOptions', data)
			.then(function(response) {
				return response.data;
			});
	},
	update: (id, data) => {
		return axios.put('/priceOptions/' + id, data)
			.then(function(response) {
				return response.data;
			});
	},
	remove: (id) => {
		return axios.delete('/priceOptions/' + id)
			.then(function(response) {
				return response.data;
			});
	}
};
