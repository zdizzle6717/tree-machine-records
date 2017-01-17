'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class CountryTile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'background': `url("/images/countries/${props.imageFront}")`
		}

		this.hoverIn = this.hoverIn.bind(this);
		this.hoverOut = this.hoverOut.bind(this);
	}

	hoverIn() {
		this.setState({
			'background': `url("/images/countries/${this.props.imageBack}")`
		});
	}

	hoverOut() {
		this.setState({
			'background': `url("/images/countries/${this.props.imageFront}")`
		});
	}

	render() {
		let countryStyle = {
		  backgroundImage: this.state.background
		};
		return (
			<div className="country hover" style={countryStyle} onMouseOver={this.hoverIn} onMouseOut={this.hoverOut}>
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
