'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Form, Input, Select, FileUpload } from '../../library/validations'
import UserActions from '../../library/authentication/actions/UserActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'createUser': UserActions.create
    }, dispatch);
};

class Register extends React.Component {
    constructor() {
        super();

        this.state = {
            credentials: {},
			passwordRepeat: ''
        }

		this.handleInputMatch = this.handleInputMatch.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Register";
    }

	handleInputMatch(e) {
		this.setState({
			passwordRepeat: e.target.value
		})
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
		this.props.createUser(this.state.credentials).then((response) => {
			let homeState = this.props.user.roleConfig.homeState;
			this.showAlert('registrationSuccess');
			this.props.history.push(homeState);
		}).catch((error) => {
			if (error.message === 'Username taken') {
				this.showAlert('invalidUsername');
			}
			if (error.message === 'Email taken') {
				this.showAlert('invalidEmail');
			}
		});
	}

	showAlert(selector) {
		const alerts = {
			'registrationSuccess': () => {
				this.props.addAlert({
					title: 'Registration Success',
					message: 'You have successfully registered an account and were automatically logged in.',
					type: 'success',
					delay: 3000
				});
			},
			'invalidUsername': () => {
				this.props.addAlert({
					title: 'Invalid Username',
					message: 'An account with that username is already in use.',
					type: 'error',
					delay: 3000
				});
			},
			'invalidEmail': () => {
				this.props.addAlert({
					title: 'Invalid Email',
					message: 'An account with that email is already in use.',
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
					<div className="small-12 medium-6 medium-offset-3 large-4 large-offset-4 columns registration-box">
						<h1>Register/Sign Up</h1>
						<Form name="registrationForm" submitText="Register" handleSubmit={this.handleSubmit}>
							<div className="row">
								<div className="form-group small-12 columns">
									<label className="required">Username</label>
									<Input type="text" name="username" value={this.state.credentials.username || ''} handleInputChange={this.handleInputChange} validate="username" required={true} />
								</div>
							</div>
							<div className="row">
								<div className="form-group small-12 columns">
									<label className="required">Email</label>
									<Input type="text" name="email" value={this.state.credentials.email || ''} handleInputChange={this.handleInputChange} validate="email" required={true} />
								</div>
							</div>
							<div className="row">
								<div className="form-group small-12 columns">
									<label className="required">First Name</label>
									<Input type="text" name="firstName" value={this.state.credentials.firstName || ''} handleInputChange={this.handleInputChange} validate="name" required={true} />
								</div>
							</div>
							<div className="row">
								<div className="form-group small-12 columns">
									<label className="required">Last Name</label>
									<Input type="text" name="lastName" value={this.state.credentials.lastName || ''} handleInputChange={this.handleInputChange} validate="name" required={true} />
								</div>
							</div>
							<label className="required">User Role</label>
							<Select name="role" value={this.state.credentials.role} handleInputChange={this.handleInputChange} required={true}>
								<option value="">--Select--</option>
								<option value="subscriber">Fan</option>
								<option value="artist">Artist</option>
								<option value="recordStore">Record Store</option>
								<option value="recordLabel">Record Label</option>
							</Select>
							<div className="row">
								<div className="form-group small-12 columns">
									<label className="required">Password</label>
									<Input type="password" name="password" value={this.state.credentials.password || ''} handleInputChange={this.handleInputChange} validate="password" required={true} inputMatch={this.state.passwordRepeat}/>
								</div>
							</div>
							<div className="row">
								<div className="form-group small-12 columns">
									<label className="required">Repeat Password</label>
									<Input type="password" name="passwordRepeat" value={this.state.passwordRepeat || ''} handleInputChange={this.handleInputMatch} validate="password" required={true} inputMatch={this.state.credentials.password}/>
								</div>
							</div>
						</Form>
						<div className="form-group small-12">
							Already have an account? <Link key="login" to="/login"  onClick={this.closeMenu}>Go to Login</Link>
						</div>
					</div>
				</div>
			</div>
		);
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Register));
