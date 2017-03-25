'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import {UserActions, AccessControl as createAccessControl} from '../../../library/authentication';
import {PaginationControls} from '../../../library/pagination';
import roleConfig from '../../../../roleConfig';
const AccessControl = createAccessControl(roleConfig);
import MerchItemActions from '../../../actions/MerchItemActions';
import MerchListingRow from '../../pieces/MerchListingRow';

// TODO: Add functionality to edit user
// TODO: Fix featured song list to allow ordering
// Add edit page for featured song list and featured album list

const mapStateToProps = (state) => {
	return {
		'user': state.user,
		'users': state.users,
		'merchItems': state.merchItems
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'searchUsers': UserActions.search,
		'searchMerch': MerchItemActions.search,
		'getMerchItems': MerchItemActions.getAll,
	}, dispatch);
}

class ProfilePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'merchPagination': {},
			'userPagination': {},
		}

		this.removeMerchItem = this.removeMerchItem.bind(this);
		this.searchMerch = this.searchMerch.bind(this);
		this.searchUsers = this.searchUsers.bind(this);
		this.handleMerchPageChange = this.handleMerchPageChange.bind(this);
		this.handleUserPageChange = this.handleUserPageChange.bind(this);
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Profile";
		this.searchMerch(1);
		this.searchUsers(1);
    }

	removeMerchItem(id) {
		console.log ('Remove merch with ID ' + id);
	}

	searchUsers(pageNumber = 1) {
		this.props.searchUsers({
			'pageNumber': pageNumber,
			'pageSize': 1
		}).then((pagination) => {
			this.setState({
				'userPagination': pagination
			});
		});
	}

	searchMerch(pageNumber = 1) {
		this.props.searchMerch({
			'pageNumber': pageNumber,
			'pageSize': 1
		}).then((pagination) => {
			this.setState({
				'userPagination': pagination
			});
		});
	}

	handleMerchPageChange(pageNumber) {
		this.searchMerch(pageNumber);
	}

	handleUserPageChange(pageNumber) {
		this.searchUsers(pageNumber);
	}

    render() {
        return (
            <div className="content-wrapper artist-page">
                <div className="row">
                    <div className="small-12 medium-3 columns">
						<h3>Username</h3>
						<h5>{this.props.user.username}</h5>
						<hr/>
						<h3>Name</h3>
						<h5>Zack Anselm</h5>
						<hr/>
						<h3>Email</h3>
						<h5>{this.props.user.email}</h5>
						<hr/>
                    </div>
                    <div className="small-12 medium-6 columns">
						<h1>Dashboard</h1>
						<Link key="digital-downloads" to="digital-downloads"><h3>Digital Downloads</h3></Link>
						<hr/>
						<AccessControl access={['recordStore']}>
							<div className="small-12">
								<h3>Distribution Center</h3>
								<table className="stack text-center">
						            <thead>
						                <tr>
			                                <th className="text-center" width="150">Ctlg #</th>
			                                <th className="text-center" width="250">Title</th>
			                                <th className="text-center" width="250">Artist</th>
			                                <th className="text-center" width="100">Format</th>
			                                <th className="text-center" width="100">Price</th>
			                                <th className="text-center" width="100">Quantity</th>
			                                <th className="text-center" width="150">View/Edit</th>
						                </tr>
						            </thead>
						            <tbody>
										{
											this.props.merchItems.map((item, i) => <MerchListingRow key={i} id={item.id} catalogueNumber={item.AlbumRelease.catalogueNumber} title={item.title} artist={item.Artist.name} price={item.price} removeMerch={this.removeMerchItem} format={item.format}></MerchListingRow>)
										}
									</tbody>
								</table>
								<PaginationControls pageNumber={this.state.merchPagination.pageNumber} pageSize={this.state.merchPagination.pageSize} totalPages={this.state.merchPagination.totalPages} totalResults={this.state.merchPagination.totalResults} handlePageChange={this.handleMerchPageChange}></PaginationControls>
							</div>
						</AccessControl>
						<AccessControl access={['siteAdmin']}>
							<div className="small-12">
								<h3>User List</h3>
								<ul>
									{
										this.props.users.map((user, i) => <li key={i}>{user.username} - {user.email}</li>)
									}
								</ul>
								<PaginationControls pageNumber={this.state.userPagination.pageNumber} pageSize={this.state.userPagination.pageSize} totalPages={this.state.userPagination.totalPages} totalResults={this.state.userPagination.totalResults} handlePageChange={this.handleUserPageChange}></PaginationControls>
							</div>
						</AccessControl>
                    </div>
                    <div className="small-12 medium-3 columns">
						<h3>Actions</h3>
						<AccessControl access={['siteAdmin']} customClasses="flex-column">
							<Link key="create-discography" to="admin/discography/create">
								<h5>Create Album Release</h5>
							</Link>
							<Link key="create-bio-section" to="admin/bio-section/create">
								<h5>Create Bio Section</h5>
							</Link>
							<Link key="create-embeddable-media" to="admin/embeddable-media/create">
								<h5>Create Embeddable Media</h5>
							</Link>
							<Link key="create-digital-download" to="admin/digital-download/create">
								<h5>Create Digital Download</h5>
							</Link>
							<Link key="create-contact-list" to="admin/contact-list/create">
								<h5>Create Contact List</h5>
							</Link>
							<Link key="create-media-mention" to="admin/media-mention/create">
								<h5>Create Media Mention</h5>
							</Link>
							<Link key="create-merch" to="admin/merch/create">
								<h5>Create Merch</h5>
							</Link>
							<Link key="create-origin" to="admin/origin/create">
								<h5>Create Origin</h5>
							</Link>
							<Link key="create-social-link-list" to="admin/social-link-list/create">
								<h5>Create Social Link List</h5>
							</Link>
							<Link key="create-song" to="admin/song/create">
								<h5>Create Song</h5>
							</Link>
							<hr/>
						</AccessControl>
						<h3>Order History</h3>
						<h5>Under Construction</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
