'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ImageTile extends React.Component {
	render() {
		return (
			<div className="photo-artist">
				{
					this.props.internalLinkUrl ?
					<Link to={this.props.internalLinkUrl} className="photo-artist">
						<span className="title-overlay"><div>{this.props.artistName}</div></span>
						<img src={this.props.imageUrl}/>
					</Link> :
					<a href={this.props.linkUrl} target="_blank" className="photos-artist">
						<span className="title-overlay"><div>{this.props.artistName}</div></span>
						<img src={this.props.imageUrl}/>
					</a>
				}
			</div>
		)
	}
}

ImageTile.propTypes = {
	artistName: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	linkUrl: PropTypes.string,
	internalLinkUrl: PropTypes.string
}
