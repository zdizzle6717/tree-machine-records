'use strict';

const React = require('react');
const RR = require('react-router');

class NavLink extends React.Component {
	render() {
		return (
			<RR.Link {...this.props} activeClassName="active"/>
		);
	}
};

class Header extends React.Component {
	render() {
		return (
			<header className="row site-header text-center">
				<ul>
					<li><NavLink to="/store/home">Home</NavLink></li>
					<li><NavLink to="/store/users">Users</NavLink></li>
				</ul>
			</header>
		);
	}
};

module.exports = Header;
