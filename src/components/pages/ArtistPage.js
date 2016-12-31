'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router';
import Animation from 'react-addons-css-transition-group';
import Iframe from '../../library/iframe';
import SideBar from '../pieces/SideBar';
import ArtistActions from '../../actions/ArtistActions';
import ArtistStore from '../../stores/ArtistStore';

export default class ArtistPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            'artist': {
				'AlbumReleases': [],
				'BioSection': {
					'content': []
				},
				'EmbeddableMedia': [
					{}
				],
				'Origin': {},
				'videos': []
			}
        }
        this.onChange = this.onChange.bind(this);
    }

	componentWillMount() {
        ArtistStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = 'Tree Machine Records | Artist';
		ArtistActions.get(this.props.params.artistParam).catch(() => {
			browserHistory.push('/artists');
		});
    }

	componentWillUnmount() {
		ArtistStore.removeChangeListener(this.onChange);
	}

	onChange() {
		let artist = ArtistStore.getArtist(this.props.params.artistParam);
		let videos = [];
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
	      'artist': artist
	    });
	}

    render() {
        return (
			<div className="content-wrapper artist-page">
				{
					this.state.artist.featuredTrack &&
					<div className="row featured-track">
						<div className="small-12 columns">
							<Iframe url={this.state.artist.featuredTrack.embedUrl} width="100%" height="166px" position="relative"/>
						</div>
			        </div>
				}
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
		                <div className="row">
		                    <div className="large-12 columns push-bottom">
								{
									this.state.artist.featuredImage &&
									<a href={`/images/artists/${this.state.artist.param}/photos/${this.state.artist.featuredImage}`} target="_blank" className="artist-image"><img src={`/images/artists/${this.state.artist.param}/photos/${this.state.artist.featuredImage}`} className="full-width shadow"/></a>
								}
		                        <h3>{this.state.artist.name}</h3>
								{
									this.state.artist.Origin &&
									<h3>Locale: {this.state.artist.Origin.stateProvince} ({this.state.artist.Origin.country})</h3>
								}
								{
									this.state.artist.BioSection &&
									this.state.artist.BioSection.content.map((section, i) =>
										<p key={i}>{section}</p>
									)
								}
		                    </div>
		                </div>
						{
							this.state.artist.AlbumReleases.length > 0 &&
							<div className="row push-top-20px">
			                    <h3 className="text-center artist-disc-title">Discography</h3>
			                    <div className="large-12 columns artist-disc-items">
									{
										this.state.artist.AlbumReleases.map((release, i) =>
											<Link key={i} to={`/artists/${this.state.artist.param}/discography/${release.param}`}><img key={i} src={`/images/artists/${this.state.artist.param}/albumCovers/150-${release.Files[0] ? release.Files[0].name : ''}`} /></Link>
										)
									}
								</div>
			                </div>
						}
						{
							this.state.artist.videos.length > 0 &&
							<div className="row push-top-20px">
			                    <h3 className="text-center artist-disc-title">Media</h3>
			                    {
									this.state.artist.videos.map((media, i) =>
										<div key={i} className="large-6 columns media-block">
											<Iframe url={media.embedUrl} width="100%" height="360px" position="relative"/>
										</div>
									)
								}
			                </div>
						}
		            </div>
					<SideBar artistName={this.state.artist.name} artistParam={this.state.artist.param} showSpotlight={false} featuredImage={this.state.artist.photosCoverImage} socialLinks={this.state.artist.SocialLinkList} contacts={this.state.artist.ContactList}/>
				</div>
			</div>
        );
    }
}
