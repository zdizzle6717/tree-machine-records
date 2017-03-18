'use strict';

import React from 'react';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import store from '../store';
import routes from '../routes';
import authorizedRoutesConfig from '../constants/authorizedRoutesConfig';
import scrollTo from '../library/utilities/scrollTo';
import {UserActions, checkAuthorization} from '../library/authentication';
import {AlertActions} from '../library/alerts';
import roleConfig from '../../roleConfig';
import {googleAnalyticsKey} from '../../envVariables';
import ReactGA from 'react-ga';
ReactGA.initialize(googleAnalyticsKey);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
let _viewListener;

const mapStateToProps = (state) => {
	return {
		'currentUser': state.user,
		'isAuthenticated': state.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'setRedirect': UserActions.setRedirect,
		'setUser': UserActions.setUser
    }, dispatch);
};

class AppRoutes extends React.Component {
	constructor() {
		super();

		this.state = {
			authenticated: false,
			currentUser: {}
		}

		this.onViewChange = this.onViewChange.bind(this);
		this.showAlert = this.showAlert.bind(this);
	}

	// TODO: This works but the screen flashes when a user goes directly to an authenticated pages from an empty browser ...???
	componentWillMount() {
		_viewListener = history.listen((location) => {
			this.onViewChange(location);
		});
	}

	onViewChange(location) {
		if (!this.props.isAuthenticated) {
			authorizedRoutesConfig.forEach((route) => {
				if (location.pathname.indexOf(route.path) !== -1) {
					this.showAlert('notAuthenticated');
					this.props.setRedirect(location.pathname);
					browserHistory.push('/login');
				}
			});
		} else {
			let homeState = this.props.currentUser.roleConfig ? this.props.currentUser.roleConfig.homeState : '/';
			this.props.setRedirect(homeState);
			authorizedRoutesConfig.forEach((route) => {
				if (location.pathname.indexOf(route.path) !== -1) {
					let accessGranted = checkAuthorization(route.accessControl, this.props.currentUser, roleConfig);
					if (accessGranted) {
						return;
					} else {
						this.showAlert('notAuthorized');
						browserHistory.push('/');
					}
				}
			})
		}
	}

	handleRouteUpdate() {
		scrollTo(0, 0);
		ReactGA.set({ 'page': window.location.pathname });
		ReactGA.pageview(window.location.pathname);
	}

	componentWillUnmount() {
		_viewListener();
	}

	showAlert(selector) {
		const alerts = {
			'notAuthenticated': () => {
				this.props.addAlert({
					'title': 'Not Authenticated',
					'message': 'Please login or register to continue.',
					'type': 'info',
					'delay': 3000
				});
			},
			'notAuthorized': () => {
				this.props.addAlert({
					'title': 'Not Authorized',
					'message': 'Redirected: You do not have authorization to view this content.',
					'type': 'error',
					'delay': 3000
				});
			},
		}

		return alerts[selector]();
	}

	render() {
	    return (
			<Router history={browserHistory} routes={routes} onUpdate={this.handleRouteUpdate}/>
	    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);
