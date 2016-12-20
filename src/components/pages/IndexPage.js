'use strict';

import React from 'react';
import Animation from 'react-addons-css-transition-group';
import SideBar from '../pieces/SideBar';
import DiscographyPreview from '../pieces/DiscographyPreview';
import PaginationControls from '../../library/pagination/components/PaginationControls';
import scrollTo from '../../library/utils/ScrollTo';
import AlbumReleaseActions from '../../actions/AlbumReleaseActions';
import AlbumReleaseStore from '../../stores/AlbumReleaseStore';

export default class IndexPage extends React.Component {
    constructor() {
        super();

		this.state = {
            'albumReleases': [],
			'pagination': {}
        }
		this.handlePageChange = this.handlePageChange.bind(this);
		this.onChange = this.onChange.bind(this);
    }

	componentWillMount() {
        AlbumReleaseStore.addChangeListener(this.onChange);
    }

    componentDidMount() {
        document.title = "Tree Machine Records";
		AlbumReleaseActions.search(
			{
			  'pageNumber': 1,
			  'pageSize': 5
			}
		);
    }

	componentWillUnmount() {
		AlbumReleaseStore.removeChangeListener(this.onChange);
	}

	handlePageChange(pageNumber) {
		AlbumReleaseActions.search(
			{
			  'pageNumber': pageNumber,
			  'pageSize': 5
			}
		);
		scrollTo(0, 0);
	}

	onChange() {
	    this.setState({
	      albumReleases: AlbumReleaseStore.getAlbumReleases(),
		  pagination: AlbumReleaseStore.getPagination()
	    });
	}

    render() {
		return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
						{
							this.state.albumReleases.map((albumRelease, i) =>
								<DiscographyPreview key={i} artistParam={albumRelease.Artist.param} artistName={albumRelease.Artist.name} albumReleaseParam={albumRelease.param} summary={albumRelease.summary} files={albumRelease.Files} releaseDate={albumRelease.releaseDate} title={albumRelease.title}/>
							)
						}
						<PaginationControls handlePageChange={this.handlePageChange} pageNumber={this.state.pagination.pageNumber} pageSize={this.state.pagination.pageSize} totalPages={this.state.pagination.totalPages} totalResults={this.state.pagination.totalResults}/>
					</div>
					<SideBar siteWideFeaturedImage={true}/>
				</div>
			</div>
	    );
	}
}
