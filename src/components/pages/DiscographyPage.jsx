'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import formatDate from '../../library/utilities/formatJSONDate';
import SideBar from '../pieces/SideBar';
import AlbumReleaseActions from '../../actions/AlbumReleaseActions';
import ArtistActions from '../../actions/ArtistActions';

const mapStateToProps = (state) => {
	return {
		'artist': state.artist,
		'albumRelease': state.albumRelease
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'getArtist': ArtistActions.get,
		'getAlbumRelease': AlbumReleaseActions.get,
		'searchAlbumReleases': AlbumReleaseActions.search
	}, dispatch);
}

class DiscographyPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            'albumRelease': {
				'Files': []
			},
			'artist': {
				'EmbeddableMedia': [],
				'Files': []
			}
        }
    }

	componentDidMount() {
        document.title = 'Tree Machine Records | Artist Discography';
		this.props.getArtist(this.props.params.artistParam).then(() => {
			this.props.getAlbumRelease(this.props.params.discographyParam).catch(() => {
				console.log('caught disco');
				browserHistory.push('/discography');
			}).then(() => {
				this.configureAlbumRelease();
			})
		}).catch(() => {
			console.log('caught artist');
			browserHistory.push('/artists');
		});
    }

	configureAlbumRelease() {
		let albumRelease = this.props.albumRelease;
		let artist = this.props.artist;
		let videos = [];
		albumRelease.Files.forEach((file) => {
			if (file.identifier === 'albumCover') {
				albumRelease.albumCover = file.name;
			}
		});
		artist.EmbeddableMedia.forEach((media) => {
			if (media.type === 'featuredTrack') {
				artist.featuredTrack = media;
			}
			if (media.type === 'video') {
				videos.push(media);
			}
		});
		artist.Files.forEach((file) => {
			if (file.identifier === 'featuredImage') {
				artist.featuredImage = file.name;
			}
			if (file.identifier === 'photosCoverImage') {
				artist.photosCoverImage = file.name;
			}
		});
		artist.videos = videos;
	    this.setState({
			'albumRelease': albumRelease,
	    	'artist': artist
	    });
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
						{
							this.state.albumRelease.title &&
							<div key={'discographyPageBody'} className="small-12 medium-8 large-9 columns">
								<div className="row">
									<div className="large-12 columns push-bottom">
										{
											this.state.albumRelease.albumCover &&
											<a href={`/images/artists/${this.state.artist.param}/albumCovers/700-${this.state.albumRelease.albumCover}`} className="discography-image"><img src={`/images/artists/${this.state.artist.param}/albumCovers/700-${this.state.albumRelease.albumCover}`} className="full-width shadow"/></a>
										}
										<h1>{this.state.albumRelease.title}</h1>
										<h2>by <Link key={this.state.artist.name} to={`/artists/${this.state.artist.param}`} className="no-underline">{this.state.artist.name}</Link></h2>
										<h3>{formatDate(this.state.albumRelease.releaseDate)} | {this.state.albumRelease.catalogueNumber}</h3>
										<div className="button-link-group">
											{
												this.state.albumRelease.iTunesUrl &&
												<div className="small-12 large-6 columns button-group">
													<a className="itunes-btn" href={this.state.albumRelease.iTunesUrl} target="_blank">
														<span className="fa fa-apple"></span> iTunes
													</a>
												</div>
											}
											{
												this.state.albumRelease.spotifyUrl &&
												<div className="small-12 large-6 columns button-group">
													<a className="spotify-btn" href={this.state.albumRelease.spotifyUrl} target="_blank">
														<span className="fa fa-spotify"></span> Spotify
													</a>
												</div>
											}
										</div>
										<p>{this.state.albumRelease.summary}</p>
										<p style={{'visibility': 'hidden'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse semper purus eget felis consequat, molestie gravida tellus sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
									</div>
								</div>
							</div>
						}
					</Animation>
					<SideBar artistName={this.state.artist.name} artistParam={this.state.artist.param} showSpotlight={false} featuredImage={this.state.artist.photosCoverImage} socialLinks={this.state.artist.SocialLinkList} contacts={this.state.artist.ContactList}/>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscographyPage);
