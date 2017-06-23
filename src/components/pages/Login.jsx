'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Form, Input, Select, FileUpload } from '../../library/validations'
import UserActions from '../../library/authentication/actions/UserActions';

const mapStateToProps = (state) => {
	return {
		'user': state.user,
		'redirectRoute': state.redirectRoute
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'authenticate': UserActions.authenticate,
		'setRedirect': UserActions.setRedirect
    }, dispatch);
};

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            'credentials': {},
			'invalidUsername': false,
			'invalidePassword': false
        }

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }


    componentDidMount() {
        document.title = "Tree Machine Records | Login";
    }

	handleInputChange(e) {
		let credentials = this.state.credentials;
		credentials[e.target.name] = e.target.value;
		if (e.target.name === 'username' || e.target.name === 'email') {
			credentials[e.target.name] = e.target.value.toLowerCase();
		}
		this.setState({
			credentials: credentials
		})
	}

	handleSubmit(e) {
		this.props.authenticate(this.state.credentials).then((response) => {
			let homeState = this.props.user.roleConfig.homeState;
			this.showAlert('loginSuccess');
			if (this.props.redirectRoute) {
				let redirectPath = this.props.redirectRoute;
				this.props.setRedirect(false);
				this.history.push.push(redirectPath);
			} else {
				this.history.push.push(homeState);
			}
		}).catch((error) => {
			if (error.message === 'Incorrect password!') {
				this.showAlert('incorrectPassword');
				this.setState({
					'invalidUsername': false,
					'invalidPassword': true
				});
			} else {
				this.showAlert('incorrectUsername');
				this.setState({
					'invalidUsername': true,
					'invalidPassword': false
				});
			}
		});
	}

	showAlert(selector) {
		const alerts = {
			'loginSuccess': () => {
				this.props.addAlert({
					title: 'Login Success',
					message: 'You have been successfully authenticated.',
					type: 'success',
					delay: 3000
				});
			},
			'incorrectPassword': () => {
				this.props.addAlert({
					title: 'Incorrect Password',
					message: 'The password you entered is incorrect.',
					type: 'error',
					delay: 3000
				});
			},
			'incorrectUsername': () => {
				this.props.addAlert({
					title: 'Incorrect Email/Username',
					message: 'No user was found with that email or username.',
					type: 'error',
					delay: 3000
				});
			},
		}

		return alerts[selector]();
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-6 medium-offset-3 large-4 large-offset-4 columns login-box">
						<h1>Login</h1>
						<Form name="loginForm" submitText="Login" handleSubmit={this.handleSubmit}>
							<div className="row">
								<div className="form-group small-12 columns">
									<label className="required">Username/Email</label>
									<Input type="text" name="username" value={this.state.credentials.username || ''} handleInputChange={this.handleInputChange} required={true} />
								</div>
							</div>
							<div className="row">
								<div className="form-group small-12 columns">
									<label className="required">Password</label>
									<Input type="password" name="password" value={this.state.credentials.password || ''} handleInputChange={this.handleInputChange} validate="password" required={true} />
								</div>
							</div>
						</Form>
						<div className="form-group small-12">
							Don't have an account? <Link key="register" to="/register"  onClick={this.closeMenu}>Register/Sign Up</Link>
						</div>
						<div className="form-group small-12 text-center push-top">
							{
								this.state.invalidUsername &&
								<div className="error-message">Invalid Username/Email</div>
							}
							{
								this.state.invalidPassword &&
								<div className="error-message">Incorrect Password!</div>
							}
						</div>
					</div>
				</div>
			</div>
		);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
