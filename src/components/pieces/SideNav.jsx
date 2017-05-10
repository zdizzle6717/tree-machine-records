'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export default class SideNav extends React.Component {
	constructor() {
		super();

		this.state = {
			'showSideNav': false
		}

		this.toggleSideNav = this.toggleSideNav.bind(this);
	}

	toggleSideNav() {
		this.setState({
			showSideNav: !this.state.showSideNav
		})
	}

	render() {
		let sideNavClasses = classNames({
			'side-nav': true,
			'active': this.state.showSideNav
		});

		return (
			<div className={sideNavClasses}>
			    <div className="nav-controls">
			        <Link key={1} to="/search" className="row" activeClassName="active">
			            <span className="fa fa-search fa-2x"></span>
			        </Link>
			        <Link key={2} to="/playlist" className="row" activeClassName="active">
			            <span className="fa fa-headphones fa-2x"></span>
			        </Link>
			        <Link key={3} to="/photography" className="row" activeClassName="active">
			            <span className="fa fa-camera fa-2x"></span>
			        </Link>
			        <Link key={4} to="/cinematography" className="row" activeClassName="active">
			            <span className="fa fa-video-camera fa-2x"></span>
			        </Link>
			        <Link key={5} to="/digital-downloads" className="row" activeClassName="active">
			            <span className="fa fa-download fa-2x"></span>
			        </Link>
			        <div className="row" onClick={this.toggleSideNav}>
			            <span className={ this.state.showSideNav ? 'fa fa-2x fa-ellipsis-v' : 'fa fa-2x fa-ellipsis-h'}></span>
			        </div>
			    </div>
			</div>
		)
	}
}

SideNav.propTypes = {
}

SideNav.defaultProps = {
}
