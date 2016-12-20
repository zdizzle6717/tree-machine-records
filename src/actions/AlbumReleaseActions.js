'use strict';

import AppDispatcher from '../dispatcher';
import AlbumReleaseConstants from '../constants/AlbumReleaseConstants';
import AlbumReleaseService from '../services/AlbumReleaseService';

export default {
    get: (id) => {
        return AlbumReleaseService
            .get(id)
            .then(albumRelease => {
                AppDispatcher.dispatch({
                    actionType: AlbumReleaseConstants.GET_ALBUM_RELEASE,
                    albumRelease: albumRelease
                });
				return albumRelease;
            });
    },

    getAll: () => {
        return AlbumReleaseService
            .getAll()
            .then((albumReleases) => {
                AppDispatcher.dispatch({
                    actionType: AlbumReleaseConstants.GET_ALBUM_RELEASES,
                    albumReleases: albumReleases
                });
				return albumReleases;
            });
    },

    search: (criteria) => {
        return AlbumReleaseService
            .search(criteria)
            .then(paginatedResponse => {
                AppDispatcher.dispatch({
                    actionType: AlbumReleaseConstants.SEARCH_ALBUM_RELEASES,
                    paginatedResponse: paginatedResponse
                });
				return paginatedResponse;
            });
    },

	create: (albumRelease) => {
        return AlbumReleaseService
            .create(albumRelease)
            .then(albumRelease => {
                AppDispatcher.dispatch({
                    actionType: AlbumReleaseConstants.CREATE_ALBUM_RELEASE,
                    albumRelease: albumRelease
                });
				return albumRelease;
            });
    },

	update: (id, albumRelease) => {
        return AlbumReleaseService
            .update(id, albumRelease)
            .then(albumRelease => {
                AppDispatcher.dispatch({
                    actionType: AlbumReleaseConstants.UPDATE_ALBUM_RELEASE,
                    albumRelease: albumRelease
                });
				return albumRelease;
            });
    },

	remove: (id) => {
        return AlbumReleaseService
            .remove(id)
            .then(albumRelease => {
                AppDispatcher.dispatch({
                    actionType: AlbumReleaseConstants.REMOVE_ALBUM_RELEASE,
                    id: id
                });
				return albumRelease;
            });
    }
};
