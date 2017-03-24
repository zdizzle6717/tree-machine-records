'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Animation from 'react-addons-css-transition-group';
import SideBar from '../pieces/SideBar';
import DiscographyPreview from '../pieces/DiscographyPreview';
import PaginationControls from '../../library/pagination/components/PaginationControls';
import scrollTo from '../../library/utilities/scrollTo';
import AlbumReleaseActions from '../../actions/AlbumReleaseActions';
import Iframe from '../../library/iframe';

const mapStateToProps = (state) => {
	return {
		'albumReleases': state.albumReleases
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'searchAlbumReleases': AlbumReleaseActions.search
	}, dispatch);
}

class IndexPage extends React.Component {
    constructor() {
        super();

		this.state = {
            'albumReleases': [],
			'pagination': {}
        }
		this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        document.title = "Tree Machine Records";
		this.props.searchAlbumReleases(
			{
			  'pageNumber': 1,
			  'pageSize': 5
			}
		).then((pagination) => {
			this.setState({'albumReleases': this.props.albumReleases});
			this.setState({'pagination': pagination});
		});
    }

	handlePageChange(pageNumber) {
        this.props.searchAlbumReleases({'searchQuery': '', 'pageNumber': pageNumber, 'pageSize': 5}).then((pagination) => {
			this.setState({'albumReleases': this.props.albumReleases});
            this.setState({'pagination': pagination});
			scrollTo(0, 0);
        });
    }

    render() {
		return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
						<article>
							<div className="row">
								<div className="small-12 columns home-video">
									<Iframe url={`https://www.youtube.com/embed/tRlL_N9HSCY?showinfo=0`} width="100%" height="360px" position="relative"/>
								</div>
							</div>
						</article>
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

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
