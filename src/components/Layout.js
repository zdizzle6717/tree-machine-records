'use strict';

import env from '../../envVariables'

import React from 'react';
import { Link, browserHistory } from 'react-router';
import AlertActions from '../library/alerts/actions/AlertActions';
import axios from 'axios';
import Animation from 'react-addons-css-transition-group';
import LogoOverlay from './pieces/LogoOverlay'
import Footer from './pieces/Footer';
import Header from './pieces/Header';
import SideNav from './pieces/SideNav';
import ScrollToTopButton from './pieces/ScrollToTopButton';
import Alerts from '../library/alerts'
import { Loader, LoaderActions, LoaderStore } from '../library/loader';
import UserActions from '../library/authentication/actions/UserActions';
import UserStore from '../library/authentication/stores/UserStore';

let timer;
let numLoadings = 0;
let _timeout = 350;

// Global axios config
axios.defaults.baseURL = env.baseApiRoute;

// Global axios interceptor
axios.interceptors.request.use((config) => {

	let token = UserStore.getUser().id_token;

	if (token) {
	    config.headers.authorization = 'Bearer ' + token;
	}

	numLoadings++;

	if (numLoadings < 2) {
		timer = setTimeout(() => {
			LoaderActions.showLoader();
		}, _timeout);
	}

    return config;
});
axios.interceptors.response.use((response) => {
	if (numLoadings === 0) { return response; }

	if (numLoadings < 2) {
		clearTimeout(timer);
		LoaderActions.hideLoader();
	}
	numLoadings--;

    return response;
}, (error) => {
	if (error.response) {
		if (error.response.status == 401 || error.response.data.statusCode == 401) {
			UserActions.logout();
			AlertActions.addAlert({
				show: true,
				title: 'Not Authorized',
				message: 'Redirected: You do not have authorization to view this content or your session has expired. Please login to continue.',
				type: 'error',
				delay: 3000
			});
			browserHistory.push('/login');
		}
	}

	if (numLoadings === 0) {
		if (error.response) {
			Promise.reject(error.response.data);
		}
	}

	if (numLoadings < 2) {
		clearTimeout(timer);
		LoaderActions.hideLoader();
	}
	numLoadings--;

	if (error.response) {
		return Promise.reject(error.response.data);
	} else {
		return Promise.reject(error);
	}

});

export default class Layout extends React.Component {
	constructor() {
        super();

        this.state = {
			'hasScrolled': false,
			'miniLogoUrl': '/images/logo-mini.png',
            'showLoader': false
        }

		this.onChange = this.onChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
    }

	componentWillMount() {
        LoaderStore.addChangeListener(this.onChange);
		if (typeof(window) !== 'undefined') {
			window.addEventListener('scroll', this.handleScroll, {passive: true});
		}
		if (typeof(Storage) !== 'undefined'){
			let storedUser = JSON.parse(sessionStorage.getItem('user'));
			if (storedUser) {
				UserActions.setUser(storedUser);
			}
		}
    }

	componentWillUnmount() {
        LoaderStore.removeChangeListener(this.onChange);
    }

    onChange() {
		this.setState({
            showLoader: LoaderStore.getLoader()
        });
    }

	handleScroll(e) {
		if (typeof(window) !== 'undefined') {
			let pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
			let documentWidth = window.clientWidth || document.documentElement.clientWidth;
			let hasScrolled = false, miniLogoUrl = '';

			if (pageYOffset >= 58) {
				hasScrolled = true;
				miniLogoUrl = '/images/logo-mini.png';
			} else {
				hasScrolled = false;
				miniLogoUrl = '/images/logo-mini-alt.png';
			}

			this.setState({
				'hasScrolled': hasScrolled,
				'miniLogoUrl': miniLogoUrl
			})
		}
	}

    render() {
		let path = this.props.location.pathname;

	    return (
			<div>
				<Header hasScrolled={this.state.hasScrolled} logoUrl={this.state.miniLogoUrl}/>
					<SideNav/>
					<Animation transitionName="view" transitionAppear={true} transitionAppearTimeout={400} transitionEnter={true} transitionEnterTimeout={400} transitionLeave={true} transitionLeaveTimeout={500} component='div' className='content-container'>
					{React.cloneElement(this.props.children, { key: path })}
					</Animation>
					<Alerts/>
					<ScrollToTopButton duration={400}/>
					<Loader loading={this.state.showLoader} type="custom">
						<div className="logo-overlay" key="logoOverlay" onClick={this.toggleOverlay}>
							<svg viewBox="0 0 800 600">
							  <symbol id="s-text">
								<text textAnchor="middle" x="50%" y="35%" className="text-line" >
								  Tree
								</text>
								<text textAnchor="middle" x="50%" y="68%" className="text-line" >
								  Machine
								</text>
							  </symbol>
							  <g className="g-ants">
								<use xlinkHref="#s-text" className="text-copy"></use>
								<use xlinkHref="#s-text" className="text-copy"></use>
								<use xlinkHref="#s-text" className="text-copy"></use>
								<use xlinkHref="#s-text" className="text-copy"></use>
								<use xlinkHref="#s-text" className="text-copy"></use>
							  </g>
							</svg>
						</div>
					</Loader>
					<LogoOverlay/>
				<Footer/>
			</div>
	    );
    }
}
