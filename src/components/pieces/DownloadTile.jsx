'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ImageTile extends React.Component {
	constructor() {
		super();

		this.state = {
			'active': false
		}

		this.onHover = this.onHover.bind(this);
		this.onHoverLeave = this.onHoverLeave.bind(this);
	}

	onHover() {
		this.setState({
			'active': true
		});
	}

	onHoverLeave() {
		this.setState({
			'active': false
		});
	}

	render() {
		return (
			<div className="download-tile">
				{
					<a href={this.props.downloadUrl} download className="tile-anchor" onMouseEnter={this.onHover} onMouseLeave={this.onHoverLeave}>
						<div className={this.state.active ? 'download-overlay show' : 'download-overlay'}><span className="fa fa-download"></span></div>
						<img src={this.props.imageUrl} className="media-artist"/>
					</a>
				}
			</div>
		)
	}
}

ImageTile.propTypes = {
	label: PropTypes.string,
	imageUrl: PropTypes.string.isRequired,
	downloadUrl: PropTypes.string.isRequired
}
