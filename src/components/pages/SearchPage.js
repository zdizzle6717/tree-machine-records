'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import SideBar from '../pieces/SideBar';

export default class SearchPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            archive: []
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Search";
    }

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
						<h1>Search</h1>
		                <h2>Under Construction</h2>
		                <h4><a href="mailto: treemachinerecords@gmail.com">TreeMachineRecords (at) gmail.com</a></h4>
		            </div>
					<SideBar/>
				</div>
			</div>
        );
    }
}
