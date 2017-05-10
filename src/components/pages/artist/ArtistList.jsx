'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Animation from 'react-addons-css-transition-group';
import ArtistTile from '../../pieces/ArtistTile';
import ArtistActions from '../../../actions/ArtistActions';

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

class ArtistList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Artists";
        this.props.getArtists();
    }

    render() {
        return (
			<div className="content-wrapper">
				<div className="row artists-list">
					<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
						{
							this.props.artists.map((artist, i) =>
								<ArtistTile key={i} files={artist.Files} name={artist.name} current={artist.isCurrent} param={artist.param}/>
							)
						}
					</Animation>
		        </div>
			</div>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistList);
