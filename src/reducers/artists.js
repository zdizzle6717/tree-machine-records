'use strict';

import ArtistConstants from '../constants/ArtistConstants';

const artist = (state = {}, action) => {
	switch (action.type) {
		case ArtistConstants.GET_ARTIST:
			return Object.assign({}, state, action.data);
		case ArtistConstants.CREATE_ARTIST:
			return Object.assign({}, state, action.data);
		case ArtistConstants.UPDATE_ARTIST:
			return Object.assign({}, state, action.data);
		default:
			return state;
	}
};

const artists = (state = [], action) => {
	switch (action.type) {
		case ArtistConstants.GET_ARTISTS:
			return [...action.data];
		case ArtistConstants.CREATE_ARTIST:
			return [
				...state,
				artist(undefined, action)
			];
		case ArtistConstants.REMOVE_ARTIST:
			let artistArray = [...state];
			let index = state.findIndex((artist) => artist.id === action.data);
			if (index !== -1) {
				artistArray.splice(index, 1);
			}
			return artistArray;
		case ArtistConstants.FILTER_ARTISTS:
			return [...action.data];
		default:
			return state;
	}
}

export {
	artist,
	artists
};
