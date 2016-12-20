'use strict';

import AppDispatcher from '../dispatcher';
import { EventEmitter } from 'events';
import OverlayConstants from '../constants/OverlayConstants';

const CHANGE_EVENT = 'contact:change';

let _overlay = true;

function toggle() {
	_overlay = !_overlay;
}

class OverlayStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getOverlay() {
        return _overlay;
    }


}

const OverlayStore = new OverlayStoreClass();

OverlayStore.dispatchToken = AppDispatcher.register(action => {

    switch (action.actionType) {
		case OverlayConstants.TOGGLE_OVERLAY:
            toggle();
            OverlayStore.emitChange();
            break;

        default:
    }

});

export default OverlayStore;
