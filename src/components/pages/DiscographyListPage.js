'use strict';

import React from 'react';
import Animation from 'react-addons-css-transition-group';
import SideBar from '../pieces/SideBar';
import PaginationControls from '../../library/pagination/components/PaginationControls';
import scrollTo from '../../library/utils/ScrollTo';
import DiscographyCard from '../pieces/DiscographyCard';
import AlbumReleaseActions from '../../actions/AlbumReleaseActions';
import AlbumReleaseStore from '../../stores/AlbumReleaseStore';

export default class DiscographyListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

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
        document.title = "Tree Machine Records | Discography";
		AlbumReleaseActions.search(
			{
			  'pageNumber': 1,
			  'pageSize': 10
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
			  'pageSize': 10
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
						<div className="row push-bottom">
							<div className="small-12 medium-9 columns">
								<div className="search-input">
									<input type="search" placeholder="Enter search terms..." onChange={this.handleFilter}/>
									<span className="fa fa-search search-icon"></span>
								</div>
		                    </div>
							<div className="small-12 medium-3 columns">
								<select id="orderParams" defaultValue="all" onChange={this.handleSort}>
		                            <option value="all">All Formats</option>
		                            <option value="lps">LP's</option>
		                            <option value="eps">EP's</option>
		                            <option value="compilations">Compilations</option>
		                        </select>
		                    </div>
						</div>
		                <div className="row">
							<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
								{
									this.state.albumReleases.map((albumRelease, i) =>
										<DiscographyCard key={i} artistParam={albumRelease.Artist.param} artistName={albumRelease.Artist.name} albumReleaseParam={albumRelease.param} catalogueNumber={albumRelease.catalogueNumber} files={albumRelease.Files} releaseDate={albumRelease.releaseDate} title={albumRelease.title}/>
									)
								}
							</Animation>
						</div>

	                    <PaginationControls handlePageChange={this.handlePageChange} pageNumber={this.state.pagination.pageNumber} pageSize={this.state.pagination.pageSize} totalPages={this.state.pagination.totalPages} totalResults={this.state.pagination.totalResults}/>

	                    <div className="row">
	                        <div className="large-12 columns">
	                            <h5>All discography is listed from the founding of TM Records in Bloomington, IN starting November 2010.  For more information, read <a href="/about">about the history of the label</a> and how we catalogue new music like no other label.</h5>
	                        </div>
	                    </div>
		            </div>
					<SideBar siteWideFeaturedImage={true}/>
				</div>
			</div>
        );
    }
}
