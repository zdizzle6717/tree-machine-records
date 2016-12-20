'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class ArtistTile extends React.Component {
	constructor() {
		super();

		this.state = {
			'frontFileName': null
		}
	}

	componentDidMount() {
		let frontFileName;
		this.props.files.forEach((file, i) => {
			if (file.identifier === 'artistTileFront') {
				frontFileName = file.name
			}
		});
		this.setState({
			'frontFileName': frontFileName
		})
	}

	render() {
		let artistStyle = {
		  backgroundImage: this.state.frontFileName ? `url('/images/artists/${this.props.param}/artistTiles/${this.state.frontFileName}')` : `url('/images/blankTile.jpg')`
		};
		return (
			<div className={`small-12 medium-4 large-3 columns artist-tile ${this.props.current ? 'show' : ''}`}>
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
	files: React.PropTypes.array.isRequired,
	name: React.PropTypes.string.isRequired,
	param: React.PropTypes.string.isRequired,
	current: React.PropTypes.bool.isRequired
}
