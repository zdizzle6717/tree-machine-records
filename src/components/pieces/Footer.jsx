'use strict';

import React from 'react';
import classNames from 'classnames';
import { Link, browserHistory } from 'react-router';

export default class Header extends React.Component {
	constructor() {
		super();

		this.state = {
		}
	}

	render() {
		return (
			<footer>
			    <div className="row expanded callout secondary"></div>
			    <div className="row expanded">
			        <div className="small-12 medium-7 columns">
			            <ul className="menu">
							<li><Link key="archive" to="/archive" activeClassName="active">Archive</Link></li>
							<li><Link key="siteMap" to="/site-map" activeClassName="active">Site Map</Link></li>
							<li><Link key="about" to="/about" activeClassName="active">About/Contact</Link></li>
			            </ul>
			        </div>
			        <div className="small-12 medium-5 columns">
			            <ul className="menu align-right">
			                <li className="menu-text copyright">Copyright © 2010 Tree Machine Records</li>
			            </ul>
			        </div>
			    </div>
			</footer>
	    );
	}
}
