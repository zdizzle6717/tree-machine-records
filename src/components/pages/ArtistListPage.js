'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import ArtistTile from '../pieces/ArtistTile';
import ArtistActions from '../../actions/ArtistActions';
import ArtistStore from '../../stores/ArtistStore';

export default class ArtistListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            artists: []
        }
        this.onChange = this.onChange.bind(this);
    }

	componentWillMount() {
        ArtistStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Artists";
        ArtistActions.getAll();
    }

	componentWillUnmount() {
		ArtistStore.removeChangeListener(this.onChange);
	}

	onChange() {
	    this.setState({
	      artists: ArtistStore.getArtists()
	    });
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row artists-list">
					<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
						{
							this.state.artists.map((artist, i) =>
								<ArtistTile key={i} files={artist.Files} name={artist.name} current={artist.isCurrent} param={artist.param}/>
							)
						}
					</Animation>
		        </div>
			</div>

        );
    }
}
