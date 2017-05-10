'use strict';

import AuthenticationConstants from '../constants/AuthenticationConstants';
import UserConstants from '../constants/UserConstants';
import RedirectConstants from '../constants/RedirectConstants';
import roleConfig from '../../../../roleConfig';
import UserService from '../services/UserService';

const _initiateRequest = (type, data) => {
    return {
        'type': type,
        'data': data
    };
};
const _returnResponse = (type, data) => {
    return {
        'type': type,
        'data': data,
        'receivedAt': Date.now()
    };
};

const _configureUser = (user, rememberMe) => {
	if (user) {
		roleConfig.forEach((role) => {
			if (role.roleFlags === user.roleFlags) {
				user.roleConfig = role;
			}
		});
		if (!user.roleConfig) {
			console.log('Oops! Make sure that the roleConfig on the UI and API have matching values.');
			throw new Error('Oops! Make sure that the roleConfig on the UI and API have matching values.');
		}
		sessionStorage.setItem('user', JSON.stringify(user));
		if (rememberMe) {
			localStorage.setItem('bcUser', JSON.stringify({
				'id_token': user.id_token,
				'username': user.username
			}));
		} else {
			localStorage.removeItem('bcUser');
		}
		console.log('Auth credentials changed.');
		return user;
	}
};

export default {
	get: (id) => {
		return (dispatch) => {
			dispatch(_initiateRequest(UserConstants.INITIATE_USER_REQUEST, id));
			return UserService.get(id).then((user) => {
				dispatch(_returnResponse(UserConstants.GET_USER, user));
				return user;
			});
		};
	},
	getAll: () => {
		return (dispatch) => {
			dispatch(_initiateRequest(UserConstants.INITIATE_USER_REQUEST));
			return UserService.getAll().then((users) => {
				dispatch(_returnResponse(UserConstants.GET_USERS, users));
				return users;
			});
		};
	},
	search: (criteria) => {
		return (dispatch) => {
			dispatch(_initiateRequest(UserConstants.INITIATE_USER_REQUEST));
			return UserService.search(criteria).then((response) => {
				dispatch(_returnResponse(UserConstants.GET_USERS, response.results));
				return response.pagination;
			});
		};
	},
	create: (data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(UserConstants.INITIATE_USER_REQUEST));
			return UserService.create(data).then((user) => {
				user = _configureUser(user, data.rememberMe);
				// dispatch(_returnResponse(UserConstants.CREATE_USER, user));
				return user;
			});
		};
	},
	update: (id, data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(UserConstants.INITIATE_USER_REQUEST));
			return UserService.update(id, data).then((user) => {
				user = _configureUser(user);
				dispatch(_returnResponse(UserConstants.UPDATE_USER, user));
				return user;
			});
		};
	},
	modify: (data) => {
		// TODO: Test that this works as expected
		let currentUser = JSON.parse(localStorage.getItem('user'));
		if (currentUser) {
			Object.assign(currentUser, data);
			sessionStorage.setItem('user', JSON.stringify(currentUser));
		}
		return (dispatch) => {
			dispatch(_returnResponse(UserConstants.UPDATE_USER, data));
		};
	},
	remove: (id) => {
		return (dispatch) => {
			dispatch(_initiateRequest(UserConstants.INITIATE_USER_REQUEST, id));
			return UserService.remove(id).then((response) => {
				dispatch(_returnResponse(UserConstants.REMOVE_USER, id));
				return response;
			});
		};
	},
  authenticate: (data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(UserConstants.INITIATE_USER_REQUEST, data));
			return UserService.authenticate(data).then((user) => {
				user = _configureUser(user, data.rememberMe);
				dispatch({
					'type': UserConstants.UPDATE_USER,
					'data': user
				});
				dispatch({
					'type': AuthenticationConstants.SET_AUTHENTICATION,
					'data': true
				});
				return user;
			});
		};
  },
  authenticateFromToken: (data) => {
		return (dispatch) => {
			dispatch(_initiateRequest(UserConstants.INITIATE_USER_REQUEST, data));
			return UserService.authenticateFromToken(data).then((user) => {
				user = _configureUser(user, data.rememberMe);
				dispatch({
					'type': UserConstants.UPDATE_USER,
					'data': user
				});
				dispatch({
					'type': AuthenticationConstants.SET_AUTHENTICATION,
					'data': true
				});
				return user;
			});
		};
  },
  setUser: (user) => {
		return (dispatch) => {
			user = _configureUser(user);
			return Promise.resolve().then(() => {
				dispatch({
					'type': UserConstants.UPDATE_USER,
					'data': user
				});
				dispatch({
					'type': AuthenticationConstants.SET_AUTHENTICATION,
					'data': true
				});
				return user;
			});
		};
  },
  logout: () => {
		// TODO: This should (maybe) make an api call that properly invalidates or deletes the existing token
  	return (dispatch) => {
			sessionStorage.removeItem('user');
			dispatch({
				'type': UserConstants.REMOVE_USER,
				'data': {}
			});
			dispatch({
				'type': AuthenticationConstants.SET_AUTHENTICATION,
				'data': false
			});
		};
  },
	setRedirect: (route) => {
		return (dispatch) => {
			dispatch({
				'type': RedirectConstants.SET_REDIRECT,
				'data': route
			});
		};
	}
};
