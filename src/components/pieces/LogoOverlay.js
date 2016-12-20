'use strict';

import React from 'react';
import Animation from 'react-addons-css-transition-group';
import { Link, browserHistory } from 'react-router';
import OverlayStore from '../../stores/OverlayStore';
import OverlayActions from '../../actions/OverlayActions';
import scrollTo from '../../library/utils/ScrollTo';

export default class LogoOverlay extends React.Component {
	constructor() {
		super();

		this.state = {
			overlay: true
		}

		this.toggleOverlay = this.toggleOverlay.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
        OverlayStore.addChangeListener(this.onChange);
    }

	componentWillUnmount() {
		OverlayStore.removeChangeListener(this.onChange);
	}

	toggleOverlay() {
		OverlayActions.toggleOverlay();
		scrollTo(0, 0);
	}

	onChange() {
		this.setState({
			overlay: OverlayStore.getOverlay()
		})
	}

	render() {
	    return (
			<div className="overlay">
				<Animation transitionName="fade" className="animation-wrapper"
					transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
					{
						this.state.overlay &&
						<div className="logo-overlay" key="logoOverlay" onClick={this.toggleOverlay}>
							<img src="/images/logo_transparent.png" className="hover"/>
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
					}
				</Animation>

			</div>
	    );
	}
}
