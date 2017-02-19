'use strict';

import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import SideBar from '../pieces/SideBar';
import AccessControl from '../../library/authentication/components/AccessControl';

export default class PlaylistPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            'featuredSongs': []
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Playlist";
		axios.get('/songs/featuredSongs/list').then((response) => {
			let featuredSongs = response.data;
			this.setState({
				'featuredSongs': featuredSongs
			})
		});
    }

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
						<h1>Playlist</h1>
						<table className="playlist-table">
							<thead>
								<tr>
									<th>#</th>
									<th>Title</th>
									<th>Artist</th>
									<th>Album</th>
									<th className="download-column">Download</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.featuredSongs.map((song, i) =>
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{song.title}</td>
											<td>{song.AlbumRelease.Artist.name}</td>
											<td>{song.AlbumRelease.title}</td>
											<td className="download-column">
												<AccessControl access={['subscriber']} customClasses="text-center">
													<a href={`/audio/${song.AlbumRelease.Artist.param}/${song.AlbumRelease.param}/${song.fileName}`} download><span className="fa fa-download"></span></a>
												</AccessControl>
											</td>
										</tr>
									)
								}
							</tbody>
						</table>

						<AccessControl publicOnly={true} access={['subscriber']} customClasses="text-center">
							<h3 className="text-center">Login for a free download of each track from the current playlist.</h3>
						</AccessControl>
		            </div>
					<SideBar/>
				</div>
			</div>
        );
    }
}
