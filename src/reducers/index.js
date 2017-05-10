'use strict';

import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

// Library
import {cartIsActive, cartItems, cartQtyPlaceholders} from '../library/cart';

// App
import {albumRelease, albumReleases} from './albumReleases';
import {artist, artists} from './artists';
import {merchItem, merchItems} from './merchItems';
import {overlay} from './overlay';
import {alerts} from '../library/alerts';
import {user, users, isAuthenticated, redirectRoute} from '../library/authentication';
import {loader} from '../library/loader';
import {forms} from '../library/validations';

export default combineReducers({
	// library
	alerts,
	cartIsActive,
	cartItems,
	cartQtyPlaceholders,
	forms,
	isAuthenticated,
	loader,
	redirectRoute,
	user,
	users,

	// App
	routing,
	artist,
	artists,
	albumRelease,
	albumReleases,
	merchItem,
	merchItems,
	overlay
});
