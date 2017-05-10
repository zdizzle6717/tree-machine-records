'use strict';

import React from 'react'
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import LogoOverlay from './pieces/LogoOverlay'
import Footer from './pieces/Footer';
import Header from './pieces/Header';
import SideNav from './pieces/SideNav';
import ScrollToTopButton from './pieces/ScrollToTopButton';
import GooeyMenuButton from './pieces/GooeyMenuButton';
import OverlayActions from '../actions/OverlayActions';
import {configureAuthRoute} from '../library/authentication';
import {RedirectWithStatus} from '../library/routing';
import {Alerts} from '../library/alerts'
import {Loader} from '../library/loader';
import {scrollTo} from '../library/utilities';
import {UserActions} from '../library/authentication';
import initInterceptors from '../interceptors';
import roleConfig from '../../roleConfig';
import {googleAnalyticsKey, baseApiRoute} from '../../envVariables';
import ReactGA from 'react-ga';
const AuthRoute = configureAuthRoute(roleConfig);
import routes from '../routes';

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'hideOverlay': OverlayActions.hide,
		'setUser': UserActions.setUser
	}, dispatch);
}

let = _viewListener;

class Layout extends React.Component {
	constructor() {
        super();

		this.state = {
			'clientHasLoaded': false,
			'hasScrolled': false,
			'miniLogoUrl': '/images/logo-mini.png'
		}

		this.handleScroll = this.handleScroll.bind(this);
		this.onViewChange = this.onViewChange.bind(this);
    }

	componentWillMount() {
		if (typeof(window) !== 'undefined') {
			window.addEventListener('scroll', this.handleScroll, {passive: true});
		}
		// TODO: Check if this should be initialized in index with history passed as argument
		// Initialize global interceptors such as 401, 403
		initInterceptors(this.props.history, baseApiRoute, 300);
		_viewListener = this.props.history.listen((location, action) => {
			this.onViewChange(location);
		});
    }

	componentDidMount() {
		ReactGA.initialize(googleAnalyticsKey);
		this.setState({
			'clientHasLoaded': true
		});
	}

	onViewChange(location) {
		scrollTo(0, 100);
		if (typeof(window) !== 'undefined') {
			ReactGA.set({ 'page': window.location.pathname });
			ReactGA.pageview(window.location.pathname);
		}
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
		// Cloak the view so it doesn't flash before client mounts
		if (this.state.clientHasLoaded) {
			return (
				<div>
					<Header hasScrolled={this.state.hasScrolled} logoUrl={this.state.miniLogoUrl}/>
					<LogoOverlay/>
					<SideNav/>

					<Animation transitionName="view" transitionAppear={true} transitionAppearTimeout={250} transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250} component='div' className='content-container'>
						<Switch>
							{routes.map((route, i) => {
								if (route.access) {
									return (
										<AuthRoute location={this.props.location} key={i} {...route}/>
									)
								} else {
									return (
										<Route location={this.props.location} key={i} {...route}/>
									)
								}
							})}
							<RedirectWithStatus location={this.props.location} from="/redirect" to="/" />
						</Switch>
					</Animation>

					<Loader type="custom">
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

					<Alerts></Alerts>
					<ScrollToTopButton/>
					<GooeyMenuButton duration={400}/>

					<Footer/>
				</div>
			)
		} else {
			// Opportunity to add a loader of graphical display
			return (
				<div>
					<header>
						<TopNav/>
					</header>
				</div>
			)
		}
	}

	componentWillUnmount() {
		_viewListener();
	}
}

export default connect(null, mapDispatchToProps)(Layout);
