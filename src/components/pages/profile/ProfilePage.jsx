'use strict';

import React from 'react';
import {Link, browserHistory} from 'react-router';
import Animation from 'react-addons-css-transition-group';

export default class ProfilePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {}
    }

    componentDidMount() {
		document.title = "Tree Machine Records | Profile";
	}

    render() {
        return (
            <div className="content-wrapper artist-page">
                <div className="row">
                    <div className="small-12 medium-3 columns">Left Side Bar</div>
                    <div className="small-12 medium-6 columns">User Actions</div>
                    <div className="small-12 medium-3 columns">Order History</div>
                </div>
            </div>
        );
    }
}
