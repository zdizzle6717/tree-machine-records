'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
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

class ArtistPhotography extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            'artist': {
				'photos': []
			}
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Artist Photography";
		this.props.getArtist(this.props.params.artistParam).catch(() => {
			this.props.history.push('/photography');
		}).then(() => {
			this.configureArtist();
		});
    }

	configureArtist() {
		let artist = this.props.artist;
		let photos = [];
		artist.Files.forEach((file) => {
			if (file.identifier === 'photo' || file.identifier === 'photosCoverImage' || file.identifier === 'featuredImage') {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArtistPhotography));
