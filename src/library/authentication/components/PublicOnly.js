'use strict';

import React from 'react';
import UserStore from '../stores/UserStore';
import UserActions from '../actions/UserActions';

export default class PublicOnly extends React.Component {

	constructor() {
		super();

		this.state = {
			authorized: false
		}

		this.onUserChange = this.onUserChange.bind(this);
	}

	componentWillMount() {
		this.setState({
			authorized: UserStore.checkAuthorization(this.props.access)
		});
		UserStore.addChangeListener(this.onUserChange);
	}

	componentWillUnmount() {
		UserStore.removeChangeListener(this.onUserChange);
	}

	onUserChange() {
		this.setState({
			authorized: UserStore.checkAuthorization(this.props.access)
		});
	}

	render() {
		return (
			<span className={this.props.customClasses ? `access-control ${this.props.customClasses}` : 'access-control'}>
				{ !this.state.authorized && this.props.children }
			</span>
		)
	}
}

PublicOnly.propTypes = {
	'access': React.PropTypes.array.isRequired,
	'customClasses': React.PropTypes.string
}
