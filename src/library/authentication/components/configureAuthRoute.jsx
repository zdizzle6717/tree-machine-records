'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';
import {AlertActions} from '../../alerts';
import {RedirectWithStatus} from '../../routing';
import UserActions from '../actions/UserActions';
import checkAuthorization from '../utilities/checkAuthorization';

let _redirectPath = '/';

const mapStateToProps = (state) => {
	return {
		'user': state.user,
		'isAuthenticated': state.isAuthenticated,
		'routing': state.routing
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
		'addAlert': AlertActions.addAlert
    }, dispatch);
};

function configureAuthRoute(roleConfig) {
	class PrivateRoute extends React.Component {
		constructor() {
			super();

			this.state = {};

			this.checkAccess = this.checkAccess.bind(this);
			this.showAlert = this.showAlert.bind(this);
		}

		// Set timeouts to prevent setState call during rending
		checkAccess(accessLevels) {
			if (!this.props.isAuthenticated) {
				setTimeout(() => {
					this.showAlert('notAuthenticated');
				});
				_redirectPath = '/login';
				return false;
			} else {
				let accessGranted = checkAuthorization(accessLevels, this.props.user, roleConfig);
				if (accessGranted) {
					return true;
				} else {
					_redirectPath = '/login';
					setTimeout(() => {
						this.showAlert('notAuthorized');
					});
					return false;
				}
			}
		}

		showAlert(selector) {
			const alerts = {
				'notAuthenticated': () => {
					this.props.addAlert({
						'title': 'Not Authenticated',
						'message': 'Please login or register to continue.',
						'type': 'info',
						'delay': 4000
					});
				},
				'notAuthorized': () => {
					this.props.addAlert({
						'title': 'Not Authorized',
						'message': 'You do not have authorization to view this content.',
						'type': 'error',
						'delay': 4000
					});
				},
			}

			return alerts[selector]();
		}

		render() {
			const Component = this.props.component;
			const accessLevels = this.props.access;
			const routeProps = Object.assign({}, this.props);
			delete routeProps.access;
			delete routeProps.component;

			let isAuthorized = this.checkAccess(accessLevels);

			return (
				<Route {...routeProps} render={(props) => (
			      isAuthorized ? (
			        <Component {...props}/>
			      ) : (
			        <RedirectWithStatus status={307} to={{
			          pathname: _redirectPath,
			          state: { from: props.location }
			        }}/>
			      )
			    )}/>
			)
		}
	}

	return withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute))
}


export default configureAuthRoute;
