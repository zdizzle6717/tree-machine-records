'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import ImageTile from '../pieces/ImageTile';
import ArtistActions from '../../actions/ArtistActions';
import ArtistStore from '../../stores/ArtistStore';

export default class ArtistPhotographyPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            artist: {
				'photos': [{}]
			}
        }

        this.onChange = this.onChange.bind(this);
    }

	componentWillMount() {
        ArtistStore.addChangeListener(this.onChange);

    }

    componentDidMount() {
        document.title = "Tree Machine Records | Artist Photography";
		ArtistActions.get(this.props.params.artistParam).catch(() => {
			browserHistory.push('/photography');
		});
    }

	componentWillUnmount() {
		ArtistStore.removeChangeListener(this.onChange);
	}

	onChange() {
		let artist = ArtistStore.getArtist(this.props.params.artistParam);
		let photos = [];
		artist.Files.forEach((file) => {
			if (file.identifier === 'photo' || file.identifier === 'photosCoverImage' || file.identifier === 'featuredImage' || file.identifier === 'albumCover') {
				photos.push(file);
			}
		});
		artist.photos = photos;
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
								this.state.artist.photos.map((photo, i) =>
									<ImageTile key={i} imageUrl={`/images/artists/${this.props.params.artistParam}/photos/${photo.name}`} linkUrl={`/images/artists/${this.props.params.artistParam}/photos/${photo.name}`}/>
								)
							}
						</Animation>
					</div>
					{
						this.state.artist.photos.length < 1 &&
						<h2 className="text-center">There are currently no results for the selected artist.</h2>
					}
		        </div>
			</div>
        );
    }
}
