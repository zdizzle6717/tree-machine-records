'use strict';

import AppDispatcher from '../dispatcher';
import OverlayConstants from '../constants/OverlayConstants';

export default {
	toggleOverlay: () => {
		AppDispatcher.dispatch({
			actionType: OverlayConstants.TOGGLE_OVERLAY
		});
    }
}
