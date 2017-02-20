'use strict';

import {combineReducers} from 'redux';
import {syncHistoryWithStore, routerReducer as routing} from 'react-router-redux';
import {albumRelease, albumReleases} from './albumReleases';
import {artist, artists} from './artists';
import {overlay} from './overlay';
import {alerts} from '../library/alerts';
import {user, users, isAuthenticated, redirectRoute} from '../library/authentication';
import {loader} from '../library/loader';
import {forms} from '../library/validations';

export default combineReducers({
	routing,
	artist,
	artists,
	albumRelease,
	albumReleases,
	overlay,

	// library
	alerts,
	forms,
	isAuthenticated,
	loader,
	redirectRoute,
	user,
	users,
});
