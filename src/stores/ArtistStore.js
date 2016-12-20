import AppDispatcher from '../dispatcher';
import ArtistConstants from '../constants/ArtistConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'artist:change';

let _artists = [];
let _artist = {};

function setArtists(artists) {
	if (artists) {
		_artists = artists;
	}
}

function setArtist(artist) {
	if (artist) {
		_artist = artist;
	}
}

function removeArtist(id) {
	let index = _artists.findIndex((artist) => artist.id === id);

	if (index !== -1) {
		_artists.splice(index, 1);
	}
	return _artists;
}

class ArtistStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback)
    }

    getArtists() {
        return _artists;
    }

    getArtist() {
        return _artist;
    }

}

const ArtistStore = new ArtistStoreClass();

ArtistStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case ArtistConstants.GET_ARTIST:
            setArtist(action.artist);
            ArtistStore.emitChange();
            break;

        case ArtistConstants.GET_ARTISTS:
            setArtists(action.artists);
            ArtistStore.emitChange();
            break;

		case ArtistConstants.CREATE_ARTIST:
            setArtist(action.artist);
            ArtistStore.emitChange();
            break;

		case ArtistConstants.UPDATE_ARTIST:
            setArtist(action.artist);
            ArtistStore.emitChange();
            break;

		case ArtistConstants.REMOVE_ARTIST:
            removeArtist(action.id);
            ArtistStore.emitChange();
            break;

        default:
    }

});

export default ArtistStore;
