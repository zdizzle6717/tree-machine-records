'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import SideBar from '../pieces/SideBar';
import { Form, Input, Select } from '../../library/validations';
import formatDate from '../../library/utilities/formatJSONDate';
import scrollTo from '../../library/utilities/scrollTo';
import PaginationControls from '../../library/pagination/components/PaginationControls';
import ArtistActions from '../../actions/ArtistActions';
import AlbumReleaseActions from '../../actions/AlbumReleaseActions';

const mapStateToProps = (state) => {
	return {
		'albumReleases': state.albumReleases,
		'artists': state.artists,
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'searchArtists': ArtistActions.search,
		'searchAlbumReleases': AlbumReleaseActions.search
	}, dispatch);
}

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'results': [],
			'filter': 'artists',
			'initialSearch': true,
			'pagination': {},
			'searchQuery': ''
        }

		this.filterDiscography = this.filterDiscography.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
		this.paginateResults = this.paginateResults.bind(this);
		this.setFilter = this.setFilter.bind(this);
    }

	componentDidMount() {
        document.title = "Tree Machine Records | Search";
    }

	filterDiscography(e) {
		this.setState({
			'searchQuery': e.target.value
		});
		this.paginateResults(e.target.value, null, 1, 10);
	}

	paginateResults(searchQuery, filter, pageNumber, pageSize) {
		if (this.state.filter === 'artists') {
			this.props.searchArtists(
				{
					'searchQuery': searchQuery,
					'filter': filter,
					'pageNumber': pageNumber,
					'pageSize': pageSize
				}
			).then((pagination) => {
				this.setState({'results': this.props.artists});
				this.setState({'pagination': pagination});
			});
		} else if (this.state.filter === 'discography') {
			this.props.searchAlbumReleases(
				{
					'searchQuery': searchQuery,
					'filter': filter,
					'pageNumber': pageNumber,
					'pageSize': pageSize
				}
			).then((pagination) => {
				this.setState({'results': this.props.albumReleases});
				this.setState({'pagination': pagination});
			});;
		}
	}

	handlePageChange(pageNumber) {
		this.paginateResults(this.state.searchQuery, this.state.filter, pageNumber, 10);
		scrollTo(0, 0);
	}

	setFilter(e) {
		let filter = e.target.value;
		this.setState({
			'results': [],
			'filter': filter
		});
		setTimeout(() => {
			this.paginateResults(this.state.searchQuery, filter, 1, 10);
		});
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
						<h1>Search</h1>
						<Form name="searchSite" submitButton={false} customClass="row push-bottom">
							<div className="small-12 medium-9 columns">
								<div className="search-input">
									<Input type="search" name="searchQuery" value={this.state.searchQuery} placeholder="Enter search terms..." handleInputChange={this.filterDiscography}/>
									<span className="fa fa-search search-icon"></span>
								</div>
		                    </div>
							<div className="small-12 medium-3 columns">
								<Select name="filter" value={this.state.filter} id="filter" defaultValue="artists" handleInputChange={this.setFilter}>
									<option value="artists">Artists</option>
									<option value="discography">Discography</option>
		                        </Select>
		                    </div>
						</Form>
						{
							this.state.results.length < 1 && this.state.initialSearch &&
							<h3 className="push-top-2x text-center">Set a filter and begin typing to search Tree Machine</h3>
						}
						{
							this.state.results.length < 1 && !this.state.initialSearch &&
							<h3 className="push-top-2x text-center">No results found with the given criteria</h3>
						}

						{
							this.state.filter === 'artists' &&
							<div className="row">
								{
									this.state.results.map((result, i) =>
									<div className="small-12 columns" key={i}>
										<Link key={i} to={`/artists/${result.param}`}><h5>{result.name}{result.isCurrent ? ' (current artist)' : ' (previous artist)'}</h5></Link>
										{
											result.BioSection &&
											<p>{result.BioSection.content[0].substring(0, 265)}<Link key={i} to={`/artists/${result.param}`}>...</Link></p>
										}
									</div>
									)
								}
							</div>
						}
						{
							this.state.filter === 'discography' &&
							<div className="row">
								{
									this.state.results.map((result, i) =>
									<div className="small-12 columns" key={i}>
										<Link key={i} to={`/artists/${result.Artist.param}/discography/${result.param}`}><h5>{result.title} | {formatDate(result.releaseDate)} | {result.catalogueNumber}</h5></Link>
									<p>{result.summary.substring(0, 265)}<Link key={i} to={`/artists/${result.Artist.param}/discography/${result.param}`}>...</Link></p>
									</div>
									)
								}
							</div>
						}

						<PaginationControls handlePageChange={this.handlePageChange} pageNumber={this.state.pagination.pageNumber} pageSize={this.state.pagination.pageSize} totalPages={this.state.pagination.totalPages} totalResults={this.state.pagination.totalResults}/>
		            </div>
					<SideBar/>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
