'use strict';

import OverlayConstants from '../constants/OverlayConstants';

const overlay = (state = true, action) => {
	switch (action.type) {
		case OverlayConstants.TOGGLE_OVERLAY:
			return !state;
		case OverlayConstants.SHOW_OVERLAY:
			return true;
		case OverlayConstants.HIDE_OVERLAY:
			return false;
		default:
			return state;
	}
};

export {
	overlay
};
