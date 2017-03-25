'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import SideBar from '../pieces/SideBar';
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

class CountryPage extends React.Component {
	constructor(props, context) {
        super(props, context);

        this.state = {
            photos: []
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Artists by Origin";
        this.props.getArtists().then(() => {
			this.configureArtists();
		});
    }

	configureArtists() {
		let artists = this.props.artists;
		let photos = [];
		let newArtistArray = [];
		artists.forEach((artist, i) => {
			if (artist.Origin) {
				if (artist.Origin.countryCode === this.props.params.countryCode && artist.isCurrent) {
					newArtistArray.push(artist);
				}
			}
		});
		newArtistArray.forEach((artist, i) => {
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
					<div className="photo-select">
						{
							this.state.photos.map((photo, i) =>
								<ImageTile key={i} artistName={photo.artistName} imageUrl={`/images/artists/${photo.artistParam}/photos/${photo.fileName}`} internalLinkUrl={`/artists/${photo.artistParam}`}/>
							)
						}
					</div>
		        </div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryPage);
