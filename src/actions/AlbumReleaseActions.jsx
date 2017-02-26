'use strict';

import AlbumReleaseConstants from '../constants/AlbumReleaseConstants';
import AlbumReleaseService from '../services/AlbumReleaseService';

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
	get: (id) => {
		return (dispatch) => {
			dispatch(_initiateRequest(AlbumReleaseConstants.INITIATE_ALBUM_RELEASE_REQUEST, id));
			return AlbumReleaseService.get(id).then((albumRelease) => {
				dispatch(_returnResponse(AlbumReleaseConstants.GET_ALBUM_RELEASE, albumRelease));
				return albumRelease;
			});
		}
	},
	getAll: () => {
		return (dispatch, getState) => {
			dispatch(_initiateRequest(AlbumReleaseConstants.INITIATE_ALBUM_RELEASE_REQUEST));
			return AlbumReleaseService.getAll().then((albumReleases) => {
				dispatch(_returnResponse(AlbumReleaseConstants.GET_ALBUM_RELEASES, albumReleases));
			});
		};
	},
	search: (criteria) => {
		return (dispatch) => {
			dispatch(_initiateRequest(AlbumReleaseConstants.INITIATE_ALBUM_RELEASE_REQUEST));
			return AlbumReleaseService.search(criteria).then((response) => {
				dispatch(_returnResponse(AlbumReleaseConstants.GET_ALBUM_RELEASES, response.results));
				return response.pagination;
			});
		}
	},
	create: (data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(AlbumReleaseConstants.INITIATE_ALBUM_RELEASE_REQUEST));
			return AlbumReleaseService.create(data).then((albumRelease) => {
				dispatch(_returnResponse(AlbumReleaseConstants.CREATE_ALBUM_RELEASE, albumRelease));
			});
		};
	},
	update: (id, data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(AlbumReleaseConstants.INITIATE_ALBUM_RELEASE_REQUEST));
			return AlbumReleaseService.update(id, data).then((albumRelease) => {
				dispatch(_returnResponse(AlbumReleaseConstants.UPDATE_ALBUM_RELEASE, albumRelease));
			});
		};
	},
	remove: (id) => {
		return (dispatch) => {
			dispatch(_initiateRequest(AlbumReleaseConstants.INITIATE_ALBUM_RELEASE_REQUEST, id));
			return AlbumReleaseService.remove(id).then((response) => {
				dispatch(_returnResponse(AlbumReleaseConstants.REMOVE_ALBUM_RELEASE, id));
			});
		};
	},
	filter: (data) => {
		return (dispatch) => {
			dispatch({
				'type': AlbumReleaseConstants.FILTER_ALBUM_RELEASES,
				'data': data
			})
		}
	}
};
