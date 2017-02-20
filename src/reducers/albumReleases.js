'use strict';

import AlbumReleaseConstants from '../constants/AlbumReleaseConstants';

const albumRelease = (state = {}, action) => {
	switch (action.type) {
		case AlbumReleaseConstants.GET_ALBUM_RELEASE:
			return Object.assign({}, state, action.data);
		case AlbumReleaseConstants.CREATE_ALBUM_RELEASE:
			return Object.assign({}, state, action.data);
		case AlbumReleaseConstants.UPDATE_ALBUM_RELEASE:
			return Object.assign({}, state, action.data);
		default:
			return state;
	}
};

const albumReleases = (state = [], action) => {
	switch (action.type) {
		case AlbumReleaseConstants.GET_ALBUM_RELEASES:
			return [...action.data];
		case AlbumReleaseConstants.CREATE_ALBUM_RELEASE:
			return [
				...state,
				albumRelease(undefined, action)
			];
		case AlbumReleaseConstants.REMOVE_ALBUM_RELEASE:
			let albumReleaseArray = [...state];
			let index = state.findIndex((albumRelease) => albumRelease.id === action.data);
			if (index !== -1) {
				albumReleaseArray.splice(index, 1);
			}
			return albumReleaseArray;
		case AlbumReleaseConstants.FILTER_ALBUM_RELEASES:
			return [...action.data];
		default:
			return state;
	}
}

export {
	albumRelease,
	albumReleases
};
