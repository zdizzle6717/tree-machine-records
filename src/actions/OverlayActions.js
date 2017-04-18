'use strict';

import OverlayConstants from '../constants/OverlayConstants';

export default {
	toggle: () => {
		return (dispatch) => {
			dispatch({
				'type': OverlayConstants.TOGGLE_OVERLAY
			});
		};
  },
	show: () => {
		return (dispatch) => {
			dispatch({
				'type': OverlayConstants.SHOW_OVERLAY
			});
		};
  },
	hide: () => {
		return (dispatch) => {
			dispatch({
				'type': OverlayConstants.HIDE_OVERLAY
			});
		};
  }
}
