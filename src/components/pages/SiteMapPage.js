'use strict';

import React from 'react';
import {Link} from 'react-router';
import Animation from 'react-addons-css-transition-group';
import SideBar from '../pieces/SideBar';

export default class SiteMapPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            archive: []
        }
    }

    componentDidMount() {
        document.title = "Tree Machine Records | Site Map";
    }

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					<div className="small-12 medium-8 large-9 columns">
						<h1>Site Map</h1>
						<div className="row push-bottom">
							<div className="small-12 medium-9 columns">
								<div className="search-input">
									<input type="search" placeholder="Enter search terms..." onChange={this.handleFilter}/>
									<span className="fa fa-search search-icon"></span>
								</div>
		                    </div>
							<div className="small-12 medium-3 columns">
								<select id="orderParams" defaultValue="createdAt" onChange={this.handleSort}>
		                            <option value="lastName">LP's</option>
		                            <option value="email">EP's</option>
		                            <option value="mobilePhone">Compilations</option>
		                        </select>
		                    </div>
						</div>
						<h2>Under Construction</h2>
		            </div>
					<SideBar/>
				</div>
			</div>
        );
    }
}
