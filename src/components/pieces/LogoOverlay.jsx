'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import {Link} from 'react-router-dom';
import OverlayActions from '../../actions/OverlayActions';
import scrollTo from '../../library/utilities/scrollTo';

let overlayTimeout;

const mapStateToProps = (state) => {
	return {
		'overlay': state.overlay
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'toggleOverlay': OverlayActions.toggle,
		'showOverlay': OverlayActions.show,
		'hideOverlay': OverlayActions.hide,
	}, dispatch);
}

class LogoOverlay extends React.Component {
	constructor() {
		super();

		this.hideOverlay = this.hideOverlay.bind(this);
	}

	componentDidMount() {
		overlayTimeout = setTimeout(() => {
			this.props.hideOverlay();
		}, 2000);
	}

	hideOverlay() {
		clearTimeout(overlayTimeout);
		this.props.hideOverlay();
	}

	render() {
	    return (
			<div className="overlay">
				<Animation transitionName="fade" className="animation-wrapper"
					transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
					{
						this.props.overlay &&
						<div className="logo-overlay" key="logoOverlay" onClick={this.hideOverlay}>
							<img src="/images/logo_transparent.png" className="hover"/>
							<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 600">
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
					}
				</Animation>

			</div>
	    );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoOverlay);
