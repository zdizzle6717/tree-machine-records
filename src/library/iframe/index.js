"use strict";

import React from 'react';

// TODO: Make sure this doesn't update everytime the url changes slightly for video playback

export default class Iframe extends React.Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	shouldComponentUpdate(nextProps) {
		return this.props.url !== nextProps.url;
	}

	render() {
		return React.createElement('iframe', {
			'ref': 'iframe',
            'frameBorder': '0',
            'src': this.props.url,
            'style': {
				'position': this.props.position,
				'height': this.props.height,
				'width': this.props.width
			},
            'height': this.props.height,
			'width': this.props.width
		});
	}
}

Iframe.propTypes = {
	'url': React.PropTypes.string.isRequired,
	'width': React.PropTypes.string,
	'height': React.PropTypes.string
}

Iframe.defaultProps = {
	'height': '100%',
	'width': '100%',
	'position': 'fixed'
}
