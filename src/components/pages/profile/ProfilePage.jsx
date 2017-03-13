'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import {UserActions, AccessControl as createAccessControl} from '../../../library/authentication';
import roleConfig from '../../../../roleConfig';
const AccessControl = createAccessControl(roleConfig);
import MerchItemActions from '../../../actions/MerchItemActions';
import MerchListingRow from '../../pieces/MerchListingRow';

// TODO: Add functionality to edit user

const mapStateToProps = (state) => {
	return {
		'user': state.user,
		'users': state.users,
		'merchItems': state.merchItems
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'getUsers': UserActions.getAll,
		'getMerchItems': MerchItemActions.getAll,
	}, dispatch);
}

class ProfilePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {}

		this.removeMerchItem = this.removeMerchItem.bind(this);
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Profile";
		this.props.getUsers();
		this.props.getMerchItems();
    }

	removeMerchItem(id) {
		console.log ('Remove merch with ID ' + id);
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
						<AccessControl access={['siteAdmin']}>
							<div className="small-12">
								<h3>User List</h3>
								<ul>
									{
										this.props.users.map((user, i) => <li key={i}>{user.username} - {user.email}</li>)
									}
								</ul>
							</div>
						</AccessControl>
						<AccessControl access={['recordStore']}>
							<div className="small-12">
								<h3>Distribution Center</h3>
								<table className="stack hover text-center">
						            <thead>
						                <tr>
											<th className="text-center" width="50">SKU</th>
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
											this.props.merchItems.map((item, i) => <MerchListingRow key={i} id={item.id} catalogueNumber={item.AlbumRelease.catalogueNumber} title={item.title} artist={item.AlbumRelease.Artist.name} price={item.price} removeMerch={this.removeMerchItem} format={item.format} sku={item.sku}></MerchListingRow>)
										}
									</tbody>
								</table>
							</div>
						</AccessControl>
                    </div>
                    <div className="small-12 medium-3 columns">
						<h3>Actions</h3>
						<AccessControl access={['siteAdmin']}>
							<Link key="create-discography" to="profile/discography/create">
								<h5>Create Album Release</h5>
							</Link>
							<Link key="create-merch" to="profile/merch/create">
								<h5>Create Merch</h5>
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
