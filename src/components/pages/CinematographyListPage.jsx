'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import ImageTile from '../pieces/ImageTile';
import ArtistActions from '../../actions/ArtistActions';

const mapStateToProps = (state) => {
	return {
		'artists': state.artists
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'getArtists': ArtistActions.getAll
	}, dispatch);
}

class CinematographyListPage extends React.Component {
	constructor(props, context) {
        super(props, context);

        this.state = {
            photos: []
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Cinematography By Artist";
        this.props.getArtists().then(() => {
			this.configureArtist();
		});
    }

	configureArtist() {
		let artists = this.props.artists;
		let photos = [];
		artists.forEach((artist, i) => {
			artist.Files.forEach((file) => {
				if (file.identifier === 'photosCoverImage') {
					let data = {
						'artistParam': artist.param,
						'fileName': file.name,
						'artistName': artist.name
					}
					photos.push(data);
				}
			})
		});
	    this.setState({
	      'photos': photos
	    });
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<h1>Cinematography</h1>
					<div className="photo-select">
						{
							this.state.photos.map((photo, i) =>
								<ImageTile key={i} id={1} artistName={photo.artistName} imageUrl={`/images/artists/${photo.artistParam}/photos/${photo.fileName}`} internalLinkUrl={`/artists/${photo.artistParam}/cinematography`}/>
							)
						}
					</div>
		        </div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CinematographyListPage);
