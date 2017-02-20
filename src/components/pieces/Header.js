'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import classNames from 'classnames';
import Animation from 'react-addons-css-transition-group';
import AudioPlayer from 'react-responsive-audio-player';
import AlertActions from '../../library/alerts/actions/AlertActions';
import { Link, browserHistory } from 'react-router';
import UserActions from '../../library/authentication/actions/UserActions';

const mapStateToProps = (state) => {
	return {
		'user': state.user,
		'isAuthenticated': state.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'logout': UserActions.logout
    }, dispatch);
};

class Header extends React.Component {
	constructor() {
		super();

		this.state = {
			'featuredSongs': [],
			'showMobileMenu': false
		}

		this.toggleMenu = this.toggleMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		axios.get('/songs/featuredSongs/list').then((response) => {
			let featuredSongs = response.data;
			this.setState({
				'featuredSongs': featuredSongs
			})
		});
	}

	toggleMenu() {
		this.setState({
			showMobileMenu: !this.state.showMobileMenu
		});
	}

	closeMenu() {
		this.setState({
			showMobileMenu: false
		});
	}

	logout() {
		this.props.logout();
		this.showAlert('logoutSuccess');
		browserHistory.push('/');
	}

	showAlert(selector) {
		const alerts = {
			'logoutSuccess': () => {
				this.props.addAlert({
					show: true,
					title: 'Logout Success',
					message: 'You have been successfully logged out.',
					type: 'success',
					delay: 3000
				});
			}
		}

		return alerts[selector]();
	}

	render() {
		let featuredSongs = this.state.featuredSongs;
		let playlist = featuredSongs.map((song) => {
			return {
				'url': `/audio/${song.AlbumRelease.Artist.param}/${song.AlbumRelease.param}/${song.fileName}`,
				'displayText': `${song.AlbumRelease.Artist.name} - "${song.title}"`
			}
		});

		let backdropClasses = classNames({
			'menu-backdrop': true,
			'show': this.state.showMobileMenu
		})

		let scrollNavClasses = classNames({
			'scroll-nav': true,
			'row': true,
			'active': this.props.hasScrolled
		})

	    return (
			<header>
				<div className={`top-nav ${this.props.hasScrolled ? 'scroll-active' : ''}`}>
					<div className="home-link">
						<Link key="home" to="/" className="desktop" activeClassName="active" onClick={this.closeMenu}>Home</Link>
						<Link key="home-tablet" to="/" className="tablet" activeClassName="active" onClick={this.closeMenu}>Tree Machine Records</Link>
						<Link key="home-mobile" to="/" className="mobile" activeClassName="active" onClick={this.closeMenu}>TM Records</Link>
					</div>
					<div className={ this.props.hasScrolled ? 'menu-toggle hasScrolled' : 'menu-toggle'} onClick={this.toggleMenu}>
						<i className="fa fa-bars"></i>
					</div>
					<Animation transitionName="slide-top" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
						<div className="menu-group" onClick={this.closeMenu}>
							<ul className="main-menu">
								<li className="">
									<Link key="providers" to="/artists" className="menu-link" activeClassName="active">Artists</Link>
								</li>
								<li className="">
									<Link key="countries" to="/countries" className="menu-link" activeClassName="active">Origins</Link>
								</li>
								<li className="">
									<Link key="discography" to="/discography" className="menu-link" activeClassName="active">Discography</Link>
								</li>
								<li className="">
									<a href="https://www.store.treemachinerecords.com/" target="_blank">Shop</a>
								</li>
							</ul>
							<ul className="login-menu">
								{
									this.props.isAuthenticated ?
									<li className="login-link">
										<a className="menu-link" onClick={this.logout}>Logout</a>
									</li> :
									<li className="login-link">
										<Link key="login" to="/login" className="menu-link" activeClassName="active">Login/Register</Link>
									</li>
								}
							</ul>
						</div>
						{
							this.state.showMobileMenu &&
							<div className="menu-group-mobile" onClick={this.closeMenu}>
								<ul className="main-menu">
									<li className="">
										<Link key="providers" to="/artists" className="menu-link" activeClassName="active">Artists</Link>
									</li>
									<li className="">
										<Link key="countries" to="/countries" className="menu-link" activeClassName="active">Map</Link>
									</li>
									<li className="">
										<Link key="discography" to="/discography" className="menu-link" activeClassName="active">Discography</Link>
									</li>
									<li className="">
										<a href="https://www.store.treemachinerecords.com/" target="_blank">Shop</a>
									</li>
								</ul>
								<ul className="login-menu">
									{
										this.props.isAuthenticated ?
										<li className="login-link">
											<a className="menu-link" onClick={this.logout}>Logout</a>
										</li> :
										<li className="login-link">
											<Link key="login" to="/login" className="menu-link" activeClassName="active">Login/Register</Link>
										</li>
									}
								</ul>
							</div>
						}
					</Animation>
					<div className={backdropClasses} onClick={this.closeMenu}></div>
				</div>

				<div className={scrollNavClasses}>
				    <div className="columns bottom small-12 medium-12 large-9">
				        <div className="small-7 medium-5 section-1 home-link">
				            <div className="mini-logo hover">
								<Link key="home" to="/" activeClassName="active" onClick={this.closeMenu}><img src={this.props.logoUrl}/></Link>
				            </div>
							<h4 className="hover home-text"><Link key="home" to="/" activeClassName="active">Tree Machine Records</Link></h4>
				        </div>
				        <div className="small-5 medium-7 section-2">
				            <AudioPlayer playlist={playlist} hideBackSkip={false} />
				        </div>
				    </div>
				</div>
			</header>
	    );
	}
}

Header.propTypes = {
	'logoUrl': React.PropTypes.string,
	'hasScrolled': React.PropTypes.bool
}

Header.defaultProps = {
	'logoUrl': '/images/logo-mini.png',
	'hasScrolled': false
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
