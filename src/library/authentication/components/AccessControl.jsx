'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import checkAuthorization from '../utilities/checkAuthorization';

export default function(roleConfig) {
	const mapStateToProps = (state) => {
		return {
			'user': state.user
		}
	};

	class AccessControl extends React.Component {
		constructor() {
			super();

			this.state = {
				'authorized': false
			}
		}

		componentWillMount() {
			this.setState({
				'authorized': checkAuthorization(this.props.access, this.props.user, roleConfig)
			});
		}

		componentWillReceiveProps(nextProps) {
			if (nextProps.user.roleFlags !== this.props.user.roleFlags) {
				this.setState({
					'authorized': checkAuthorization(this.props.access, nextProps.user, roleConfig)
				});
			}
		}

		render() {
			if (this.state.authorized && !this.props.publicOnly || !this.state.authorized && this.props.publicOnly) {
				if (this.props.element === 'div') {
					return (
						<div className={this.props.customClasses ? `access-control ${this.props.customClasses}` : 'access-control'}>
							{this.props.children}
						</div>
					)
				} else if (this.props.element === 'li') {
					return (
						<li className={this.props.customClasses ? `access-control ${this.props.customClasses}` : 'access-control'}>
							{this.props.children}
						</li>
					)
				} else if (this.props.element === 'td') {
					return (
						<td className={this.props.customClasses ? `access-control ${this.props.customClasses}` : 'access-control'}>
							{this.props.children}
						</td>
					)
				} else {
					return (
						<span className={this.props.customClasses ? `access-control ${this.props.customClasses}` : 'access-control'}>
							{this.props.children}
						</span>
					)
				}
			} else {
				return null;
			}
		}
	}

	AccessControl.propTypes = {
		'access': PropTypes.array,
		'customClasses': PropTypes.string,
		'element': PropTypes.string,
		'publicOnly': PropTypes.bool
	}

	AccessControl.defaultProps = {
		'access': [],
		'publicOnly': false
	}

	return withRouter(connect(mapStateToProps)(AccessControl));
}
