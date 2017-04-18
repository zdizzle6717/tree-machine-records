'use strict';

import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import formatDate from '../../library/utilities/formatJSONDate';

export default class DiscographyCard extends React.Component {
	constructor() {
		super();

		this.state = {
			'coverFileName': null
		}
	}

	componentDidMount() {
		let coverFileName;
		this.props.files.forEach((file, i) => {
			if (file.identifier === 'albumCover') {
				coverFileName = file.name
			}
		});
		this.setState({
			'coverFileName': coverFileName
		})
	}

	componentWillReceiveProps(nextProps) {
		let coverFileName;
		nextProps.files.forEach((file, i) => {
			if (file.identifier === 'albumCover') {
				coverFileName = file.name
			}
		});
		this.setState({
			'coverFileName': coverFileName
		})
	}

	render() {
		return (
			<div className="small-12 columns push-bottom-2x">
				<div className="disc-item">
					<Link key={this.props.albumReleaseParam} to={`/artists/${this.props.artistParam}/discography/${this.props.albumReleaseParam}`} className="disc-content">
						<div className="disc-image">
							{
								this.state.coverFileName &&
								<img src={`/images/artists/${this.props.artistParam}/albumCovers/150-${this.state.coverFileName}`} alt={this.props.title} height="75px" width="75px"/>
							}
						</div>
						<div className="field">
							<label className="disc-label">Catalogue #</label>
							{this.props.catalogueNumber}
						</div>
						<div className="field">
							<label className="disc-label">Artist</label>
							{this.props.artistName}
						</div>
						<div className="field">
							<label className="disc-label">Album Title</label>
							{this.props.title}
						</div>
						<div className="field">
							<label className="disc-label">Release Date</label>
							{formatDate(this.props.releaseDate)}
						</div>
					</Link>
				</div>
			</div>
		)
	}
}

DiscographyCard.propTypes = {
	artistParam: PropTypes.string.isRequired,
	artistName: PropTypes.string.isRequired,
	albumReleaseParam: PropTypes.string.isRequired,
	catalogueNumber: PropTypes.string.isRequired,
	files: PropTypes.array.isRequired,
	releaseDate: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
}
