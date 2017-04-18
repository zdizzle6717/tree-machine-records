'use strict';

import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import formatDate from '../../library/utilities/formatJSONDate';

export default class DiscographyPreview extends React.Component {
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
			<article>
				<div className="row">
					{
						this.state.coverFileName &&
						<div className="large-5 columns">
							<p>
								<Link key={this.props.albumReleaseParam} to={`/artists/${this.props.artistParam}/discography/${this.props.albumReleaseParam}`}>
									<img src={`/images/artists/${this.props.artistParam}/albumCovers/700-${this.state.coverFileName}`} alt={this.props.title} className="hover shadow"/>
								</Link>
							</p>
						</div>
					}
					<div className="large-7 columns">
						<h5><Link key={this.props.albumReleaseParam} to={`/artists/${this.props.artistParam}/discography/${this.props.albumReleaseParam}`}>{this.props.artistName} | <i>{this.props.title}</i></Link></h5>
						<p>
							<span className="fi-torso">Release Date:</span>
							<span><i className="fi-calendar">{formatDate(this.props.releaseDate)}</i></span>
						</p>
						<p>{this.props.summary} <Link key={this.props.albumReleaseParam} to={`/artists/${this.props.artistParam}/discography/${this.props.albumReleaseParam}`}>...</Link></p>
					</div>
				</div>
			</article>
		)
	}
}

DiscographyPreview.propTypes = {
	artistParam: PropTypes.string.isRequired,
	artistName: PropTypes.string.isRequired,
	albumReleaseParam: PropTypes.string.isRequired,
	files: PropTypes.array.isRequired,
	releaseDate: PropTypes.string.isRequired,
	summary: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
}
