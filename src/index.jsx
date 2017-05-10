'use strict';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import {createBrowserHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';
import Layout from './components/Layout';
import store from './store';

// TODO: This does not seem to be working
const browserHistory = createBrowserHistory();
let history = syncHistoryWithStore(browserHistory, store);

window.onload = () => {
    render(
		<Provider store={store}>
			<BrowserRouter history={history}>
				<Layout />
			</BrowserRouter>
		</Provider>,
		document.getElementById('main')
	);
};
