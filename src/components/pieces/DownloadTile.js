'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class ImageTile extends React.Component {
	render() {
		return (
			<div>
				{
					<a href={this.props.downloadUrl} target="_self">
						<img src={this.props.imageUrl} className="media-artist"/>
					</a>
				}
			</div>
		)
	}
}

ImageTile.propTypes = {
	imageUrl: React.PropTypes.string.isRequired,
	downloadUrl: React.PropTypes.string.isRequired
}
