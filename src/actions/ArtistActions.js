'use strict';

import ArtistConstants from '../constants/ArtistConstants';
import ArtistService from '../services/ArtistService';

const _initiateRequest = (type, data) => {
	return {
		'type': type,
		'data': data
	};
};
const _returnResponse = (type, data) => {
	return {
		'type': type,
		'data': data,
		'receivedAt': Date.now()
	};
};

export default {
	get: (param) => {
		return (dispatch) => {
			dispatch(_initiateRequest(ArtistConstants.INITIATE_ARTIST_REQUEST, param));
			return ArtistService.get(param).then((artist) => {
				dispatch(_returnResponse(ArtistConstants.GET_ARTIST, artist));
				return artist;
			});
		}
	},
	getById: (id) => {
		return (dispatch) => {
			dispatch(_initiateRequest(ArtistConstants.INITIATE_ARTIST_REQUEST, id));
			return ArtistService.getById(id).then((artist) => {
				dispatch(_returnResponse(ArtistConstants.GET_ARTIST, artist));
				return artist;
			});
		}
	},
	getAll: () => {
		return (dispatch) => {
			dispatch(_initiateRequest(ArtistConstants.INITIATE_ARTIST_REQUEST));
			return ArtistService.getAll().then((contacts) => {
				dispatch(_returnResponse(ArtistConstants.GET_ARTISTS, contacts));
			});
		};
	},
	search: (criteria) => {
		return (dispatch) => {
			dispatch(_initiateRequest(ArtistConstants.INITIATE_ARTIST_REQUEST));
			return ArtistService.search(criteria).then((response) => {
				dispatch(_returnResponse(ArtistConstants.GET_ARTISTS, response.results));
				return response.pagination;
			});
		}
	},
	create: (data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(ArtistConstants.INITIATE_ARTIST_REQUEST));
			return ArtistService.create(data).then((contact) => {
				dispatch(_returnResponse(ArtistConstants.CREATE_ARTIST, contact));
			});
		};
	},
	update: (id, data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(ArtistConstants.INITIATE_ARTIST_REQUEST));
			return ArtistService.update(id, data).then((contact) => {
				dispatch(_returnResponse(ArtistConstants.UPDATE_ARTIST, contact));
			});
		};
	},
	remove: (id) => {
		return (dispatch) => {
			dispatch(_initiateRequest(ArtistConstants.INITIATE_ARTIST_REQUEST, id));
			return ArtistService.remove(id).then((response) => {
				dispatch(_returnResponse(ArtistConstants.REMOVE_ARTIST, id));
			});
		};
	}
}
