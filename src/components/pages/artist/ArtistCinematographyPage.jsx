'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory, Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import Iframe from '../../../library/iframe';
import ImageTile from '../../pieces/ImageTile';
import ArtistActions from '../../../actions/ArtistActions';

const mapStateToProps = (state) => {
	return {
		'artist': state.artist
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'getArtist': ArtistActions.get
	}, dispatch);
}

class ArtistCinematographyPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            artist: {
				'videos': []
			}
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Artist Cinematography";
		this.props.getArtist(this.props.params.artistParam).catch(() => {
			browserHistory.push('/photography');
		}).then(() => {
			this.configureArtist();
		});
    }

	configureArtist() {
		let artist = this.props.artist;
		let videos = [];
		artist.EmbeddableMedia.forEach((media) => {
			if (media.type === 'video') {
				videos.push(media);
			}
		});
		artist.videos = videos;
	    this.setState({
	      'artist': artist
	    });
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<h2 className=""><Link key={this.props.params.artistParam} to={`/artists/${this.props.params.artistParam}`} className="no-underline">{this.state.artist.name}</Link></h2>
					<div className="media-select">
						<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
							{
								this.state.artist.videos.map((video, i) =>
								<div key={i} className="media-artist push-bottom">
									<Iframe url={video.embedUrl} width="100%" height="360px" position="relative"/>
								</div>
								)
							}
						</Animation>
					</div>
					{
						this.state.artist.videos.length < 1 &&
						<h2 className="text-center">There are currently no results for the selected artist.</h2>
					}
		        </div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistCinematographyPage);
