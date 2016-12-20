'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class CountryTile extends React.Component {
	render() {
		let countryStyle = {
		  backgroundImage: `url("/images/countries/${this.props.imageFront}")`
		};
		return (
			<div className="country hover" style={countryStyle}>
				<Link key={this.props.countryCode} to={`/countries/${this.props.countryCode}`}>
					<img src={`/images/countries/${this.props.imageFront}`} />
				</Link>
			</div>
		)
	}
}

CountryTile.propTypes = {
	countryCode: React.PropTypes.string.isRequired,
	imageFront: React.PropTypes.string.isRequired,
	imageBack: React.PropTypes.string
}
