'use strict';

import React from 'react';
import scrollTo from '../../library/utilities/ScrollTo';

export default class ScrollToTopButton extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="scroll-top hover" onClick={() => scrollTo(0, 400)}>
				<img src="/images/escalator.png" />
			</div>
		)
	}
}

ScrollToTopButton.propTypes = {
	to: React.PropTypes.number,
	duration: React.PropTypes.number
}

ScrollToTopButton.defaultProps = {
	to: 0,
	duration: 500
}
