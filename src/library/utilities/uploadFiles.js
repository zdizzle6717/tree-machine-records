'use strict'

import axios from 'axios';

export default function(files, apiRoute = '/files/add', path = '', moreInfo) {
	let promises = [];
	files.forEach((file) => {
		let data = new FormData();
		let config = {
				'onUploadProgress': function(progressEvent) {
					let percentCompleted = progressEvent.loaded / progressEvent.total;
				}
			};
		data.append('file', file);
		data.append('path', path);
		data.append('fileSize', file.size);
		if (moreInfo) {
			for (let prop in moreInfo) {
				data.append(prop, moreInfo[prop]);
			}
		}
		promises.push(axios.post(apiRoute, data, config));
	});

	return axios.all(promises);
}
