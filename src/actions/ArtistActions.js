'use strict';

import AppDispatcher from '../dispatcher';
import ArtistConstants from '../constants/ArtistConstants';
import ArtistService from '../services/ArtistService';

export default {
	get: (param) => {
        return ArtistService
            .get(param).then(artist => {
				AppDispatcher.dispatch({
					actionType: ArtistConstants.GET_ARTIST,
					artist: artist
				});
				return artist;
            });
    },

    getAll: () => {
        return ArtistService
            .getAll()
            .then(artists => {
                AppDispatcher.dispatch({
                    actionType: ArtistConstants.GET_ARTISTS,
                    artists: artists
                });
				return artists;
            });
    },

	search: (criteria) => {
        return ArtistService
            .search(criteria)
            .then(paginatedResponse => {
                AppDispatcher.dispatch({
                    actionType: ArtistConstants.SEARCH_ARTISTS,
                    paginatedResponse: paginatedResponse
                });
				return paginatedResponse;
            });
    },

	create: (data) => {
        return ArtistService
            .create(data)
            .then(artist => {
                AppDispatcher.dispatch({
                    actionType: ArtistConstants.CREATE_ARTIST,
                    artist: artist
                });
				return artist;
            });
    },

	update: (id, data) => {
        return ArtistService
            .update(id, data)
            .then(artist => {
                AppDispatcher.dispatch({
                    actionType: ArtistConstants.UPDATE_ARTIST,
                    artist: artist
                });
				return artist;
            });
    },

	remove: (id) => {
        return ArtistService
            .remove(id)
            .then(artist => {
                AppDispatcher.dispatch({
                    actionType: ArtistConstants.REMOVE_ARTIST,
                    id: id
                });
				return artist;
            });
    }
}
