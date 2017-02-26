'use strict';

import env from '../../envVariables'
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Animation from 'react-addons-css-transition-group';
import LogoOverlay from './pieces/LogoOverlay'
import Footer from './pieces/Footer';
import Header from './pieces/Header';
import SideNav from './pieces/SideNav';
import ScrollToTopButton from './pieces/ScrollToTopButton';
import GooeyMenuButton from './pieces/GooeyMenuButton';
import OverlayActions from '../actions/OverlayActions';
import {Alerts} from '../library/alerts'
import {Loader} from '../library/loader';
import {UserActions} from '../library/authentication';
import initInterceptors from '../interceptors';
import {baseApiRoute} from '../../envVariables';

// Initialize global interceptors such as 401, 403
initInterceptors(baseApiRoute, 300);

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'hideOverlay': OverlayActions.hide
	}, dispatch);
}

class Layout extends React.Component {
	constructor() {
        super();

        this.state = {
			'hasScrolled': false,
			'miniLogoUrl': '/images/logo-mini.png'
        }

		this.handleScroll = this.handleScroll.bind(this);
    }

	componentWillMount() {
		if (typeof(window) !== 'undefined') {
			window.addEventListener('scroll', this.handleScroll, {passive: true});
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
		let path = this.props.location.pathname;

	    return (
			<div>
				<Header hasScrolled={this.state.hasScrolled} logoUrl={this.state.miniLogoUrl}/>
					<SideNav/>
					<Animation transitionName="view" transitionAppear={true} transitionAppearTimeout={400} transitionEnter={true} transitionEnterTimeout={400} transitionLeave={true} transitionLeaveTimeout={500} component='div' className='content-container'>
					{React.cloneElement(this.props.children, { key: path })}
					</Animation>
					<Alerts/>
						<ScrollToTopButton/>
						<GooeyMenuButton duration={400}/>
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
						<LogoOverlay/>
				<Footer/>
			</div>
	    );
    }
}

export default connect(null, mapDispatchToProps)(Layout);
