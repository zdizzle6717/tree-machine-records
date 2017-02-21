'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import {UserActions, AccessControl as createAccessControl} from '../../../library/authentication';
import roleConfig from '../../../../roleConfig';
const AccessControl = createAccessControl(roleConfig);

const mapStateToProps = (state) => {
	return {
		'user': state.user,
		'users': state.users,
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'getUsers': UserActions.getAll,
	}, dispatch);
}

class ProfilePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {}
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Profile";
		this.props.getUsers()
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

                    </div>
                    <div className="small-12 medium-3 columns">
						<h3>Order History</h3>
						<h5>Under Construction</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
