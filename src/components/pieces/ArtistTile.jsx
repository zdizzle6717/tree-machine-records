'use strict';

import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default class ArtistTile extends React.Component {
	constructor() {
		super();

		this.state = {
			'imageName': null,
			'frontFileName': null,
			'backFileName': null,
		}

		this.hoverIn = this.hoverIn.bind(this);
		this.hoverOut = this.hoverOut.bind(this);
	}

	componentDidMount() {
		let frontFileName, backFileName;
		this.props.files.forEach((file, i) => {
			if (file.identifier === 'artistTileFront') {
				frontFileName = file.name
			}
			if (file.identifier === 'artistTileBack') {
				backFileName = file.name
			}
		});
		this.setState({
			'imageName': frontFileName,
			'frontFileName': frontFileName,
			'backFileName': backFileName,
		});
	}

	hoverIn() {
		this.setState({
			'imageName': this.state.backFileName
		});
	}

	hoverOut() {
		this.setState({
			'imageName': this.state.frontFileName
		});
	}

	render() {
		let artistStyle = {
		  backgroundImage: this.state.imageName ? `url('/images/artists/${this.props.param}/artistTiles/${this.state.imageName}')` : `url('/images/blankTile.jpg')`
		};
		return (
			<div className={`small-12 medium-4 large-3 columns artist-tile ${this.props.current ? 'show' : ''}`} onMouseOver={this.hoverIn} onMouseOut={this.hoverOut}>
				<Link key={this.props.param} to={`/artists/${this.props.param}`}>
					<div className="background-image hover" style={artistStyle}>
						<img src="/images/blankTile.jpg" className="full-width front" />
					</div>
				</Link>
				<h5 className="text-center"><Link key="1" to={`/artists/${this.props.param}`} className="action">{this.props.name}</Link></h5>
			</div>
		)
	}
}

ArtistTile.propTypes = {
	files: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	param: PropTypes.string.isRequired,
	current: PropTypes.bool.isRequired
}
