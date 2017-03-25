'use strict';

import React from 'react';
import { Link } from 'react-router';

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
	artistName: React.PropTypes.string.isRequired,
	imageUrl: React.PropTypes.string.isRequired,
	linkUrl: React.PropTypes.string,
	internalLinkUrl: React.PropTypes.string
}
