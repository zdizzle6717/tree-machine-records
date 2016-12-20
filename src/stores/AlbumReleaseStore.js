import AppDispatcher from '../dispatcher';
import AlbumReleaseConstants from '../constants/AlbumReleaseConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'albumRelease:change';

let _albumReleases = [];
let _albumRelease = {};
let _pagination = {};

function setAlbumReleases(albumReleases) {
	if (albumReleases) {
		_albumReleases = albumReleases;
	}
}

function setPagination(pagination) {
	if (pagination) {
		_pagination = pagination;
	}
}

function setAlbumRelease(albumRelease) {
	if (albumRelease) {
		_albumRelease = albumRelease;
	}
}

function removeAlbumRelease(id) {
	let index = _albumReleases.findIndex((albumRelease) => albumRelease.id === id);

	if (index !== -1) {
		_albumReleases.splice(index, 1);
	}
	return _albumReleases;
}

class AlbumReleaseStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getAlbumReleases() {
        return _albumReleases;
    }

    getPagination() {
        return _pagination;
    }

    getAlbumRelease() {
        return _albumRelease;
    }
}

const AlbumReleaseStore = new AlbumReleaseStoreClass();

AlbumReleaseStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case AlbumReleaseConstants.GET_ALBUM_RELEASE:
            setAlbumRelease(action.albumRelease);
            AlbumReleaseStore.emitChange();
            break;

        case AlbumReleaseConstants.GET_ALBUM_RELEASES:
            setAlbumReleases(action.albumReleases);
            AlbumReleaseStore.emitChange();
            break;

        case AlbumReleaseConstants.SEARCH_ALBUM_RELEASES:
            setAlbumReleases(action.paginatedResponse.results);
            setPagination(action.paginatedResponse.pagination);
            AlbumReleaseStore.emitChange();
            break;

        case AlbumReleaseConstants.CREATE_ALBUM_RELEASE:
            setAlbumRelease(action.albumRelease);
            AlbumReleaseStore.emitChange();
            break;

        case AlbumReleaseConstants.UPDATE_ALBUM_RELEASE:
            setAlbumRelease(action.albumRelease);
            AlbumReleaseStore.emitChange();
            break;

        case AlbumReleaseConstants.REMOVE_ALBUM_RELEASE:
            removeAlbumRelease(action.id);
            AlbumReleaseStore.emitChange();
            break;

        default:
    }

});

export default AlbumReleaseStore;
