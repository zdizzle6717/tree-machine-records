'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import classNames from 'classnames';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import AudioPlayer from 'react-responsive-audio-player';
import PropTypes from 'prop-types';
import AlertActions from '../../library/alerts/actions/AlertActions';
import {withRouter, Link} from 'react-router-dom';
import UserActions from '../../library/authentication/actions/UserActions';
import CartSummary from './CartSummary';

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
			'showAccountMenu': false,
			'showMobileMenu': false
		}

		this.toggleMenu = this.toggleMenu.bind(this);
		this.toggleAccountMenu = this.toggleAccountMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.closeMenus = this.closeMenus.bind(this);
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
			'showMobileMenu': !this.state.showMobileMenu
		});
	}

	toggleAccountMenu() {
		this.setState({
			'showAccountMenu': !this.state.showAccountMenu
		});
	}

	closeMenu() {
		this.setState({
			'showMobileMenu': false
		});
	}

	closeMenus() {
		this.setState({
			'showMobileMenu': false,
			'showAccountMenu': false
		});
	}

	logout() {
		this.props.logout();
		this.showAlert('logoutSuccess');
		this.props.history.push('/');
	}

	showAlert(selector) {
		const alerts = {
			'logoutSuccess': () => {
				this.props.addAlert({
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
			'show': this.state.showMobileMenu || this.state.showAccountMenu
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
						<Link key="home" to="/" className="desktop" activeClassName="active" onClick={this.closeMenus}>Home</Link>
						<Link key="home-tablet" to="/" className="tablet" activeClassName="active" onClick={this.closeMenus}>Tree Machine Records</Link>
						<Link key="home-mobile" to="/" className="mobile" activeClassName="active" onClick={this.closeMenus}>TM Records</Link>
					</div>
					<div className={ this.props.hasScrolled ? 'menu-toggle hasScrolled' : 'menu-toggle'} onClick={this.toggleMenu}>
						<i className="fa fa-bars"></i>
					</div>
					<Animation transitionName="slide-top" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
						<div className="menu-group">
							<ul className="main-menu" onClick={this.closeMenus}>
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
								<CartSummary></CartSummary>
								{
									this.props.isAuthenticated ?
									<li className="login-link">
										<a className="menu-link" onClick={this.toggleAccountMenu}>
											{
												this.state.showAccountMenu ?
												<span className="fa fa-toggle-up"></span> :
												<span className="fa fa-toggle-down"></span>
											}
										</a>
										<ul className={this.state.showAccountMenu ? 'account-menu show': 'account-menu'}>
											<li>
												<Link key="dashboard" to="/dashboard" activeClassName="active" onClick={this.closeMenus}>Dashboard</Link>
											</li>
											<li className="account-link" onClick={this.closeMenus}>
												<a onClick={this.logout}>Logout</a>
											</li>
										</ul>
									</li> :
									<li className="login-link">
										<Link key="login" to="/login" className="menu-link" activeClassName="active">Login/Register</Link>
									</li>
								}
							</ul>
						</div>
						{
							this.state.showMobileMenu &&
							<div className="menu-group-mobile">
								<ul className="main-menu" onClick={this.closeMenus}>
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
									<CartSummary></CartSummary>
									{
										this.props.isAuthenticated ?
										<li className="login-link">
											<a className="menu-link" onClick={this.toggleAccountMenu}>
												{
													this.state.showAccountMenu ?
													<span className="fa fa-toggle-up"></span> :
													<span className="fa fa-toggle-down"></span>
												}
											</a>
											<ul className={this.state.showAccountMenu ? 'account-menu show': 'account-menu'}>
												<li>
													<Link key="dashboard" to="/dashboard" activeClassName="active">Dashboard</Link>
												</li>
												<li className="account-link">
													<a onClick={this.logout}>Logout</a>
												</li>
											</ul>
										</li> :
										<li className="login-link">
											<Link key="login" to="/login" className="menu-link" activeClassName="active">Login/Register</Link>
										</li>
									}
								</ul>
							</div>
						}
					</Animation>
					<div className={backdropClasses} onClick={this.closeMenus}></div>
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
	'logoUrl': PropTypes.string,
	'hasScrolled': PropTypes.bool
}

Header.defaultProps = {
	'logoUrl': '/images/logo-mini.png',
	'hasScrolled': false
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
