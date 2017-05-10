'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import DownloadTile from '../../pieces/DownloadTile';
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

class ArtistDigitalDownloads extends React.Component {
    constructor(props, context) {
        super(props, context);

		this.state = {
            'artist': {
				'downloads': []
			}
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Artist Digital Downloads";
		this.props.getArtist(this.props.params.artistParam).catch(() => {
			this.props.history.push('/photography');
		}).then(() => {
			this.configureArtist();
		});
    }

	configureArtist() {
		let artist = this.props.artist;
		let downloads = [];
		artist.Files.forEach((file) => {
			if (file.identifier === 'download' || file.identifier === 'song') {
				downloads.push(file);
			}
		});
		artist.downloads = downloads;
	    this.setState({
	      'artist': artist
	    });
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<h2 className=""><Link key={this.props.params.artistParam} to={`/artists/${this.props.params.artistParam}`} className="no-underline">{this.state.artist.name}</Link></h2>
					<div className="photo-select">
						<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
							{
								this.state.artist.downloads.map((download, i) =>
								<div key={i}>
									{
										download.identifier === 'song' &&
										<DownloadTile key={i} imageUrl={`/images/artists/${this.props.params.artistParam}/albumCovers/700-${download.Song.AlbumRelease.Files[0].name}`} downloadUrl={`/audio/${this.props.params.artistParam}/${download.Song.AlbumRelease.param}/${download.name}`} label={download.Song.title}/>
									}
									{
										download.identifier === 'download' &&
										<DownloadTile key={i} imageUrl={`/images/artists/${this.props.params.artistParam}/digitalDownloads/${download.imageUrl}`} downloadUrl={`/images/artists/${this.props.params.artistParam}/digitalDownloads/${download.name}`} label={download.label}/>
									}
								</div>
								)
							}
						</Animation>
					</div>
					{
						this.state.artist.downloads.length < 1 &&
						<h2 className="text-center">There are currently no results for the selected artist.</h2>
					}
		        </div>
			</div>

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistDigitalDownloads));
