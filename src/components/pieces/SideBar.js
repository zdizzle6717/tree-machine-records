'use strict';

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Animation from 'react-addons-css-transition-group';
import formatDate from '../../library/utils/FormatJSONDate';
import OverlayStore from '../../stores/OverlayStore';
import OverlayActions from '../../actions/OverlayActions';

export default class SideBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'contacts': [],
			'loadTimeoutComplete': false,
			'overlay': true,
			'socialLinks': [],
			'featuredAlbums': []
		}

		this.toggleOverlay = this.toggleOverlay.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
        OverlayStore.addChangeListener(this.onChange);
		axios.get('/albumReleases/featuredAlbums/list').then((response) => {
			let featuredAlbums = response.data;
			this.setState({
				'featuredAlbums': featuredAlbums
			})
		});
    }

	componentDidMount() {
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.siteWideFeaturedImage) {
			setTimeout(() => {
				this.setState({
					'loadTimeoutComplete': true
				})
			}, 200);
		}
		let socialLinks = [
			{
				'name': 'facebook',
				'url': 'https://www.facebook.com/fwirecords/'
			},
			{
				'name': 'soundcloud',
				'url': 'https://soundcloud.com/treemachinerecords'
			},
			{
				'name': 'instagram',
				'url': 'https://instagram.com/treemachinerecords'
			},
			{
				'name': 'tumblr',
				'url': 'http://treemachinerecords.tumblr.com/'
			},
			{
				'name': 'twitter',
				'url': 'https://twitter.com/treemachinerex'
			},
			{
				'name': 'youtube',
				'url': 'https://www.youtube.com/channel/UCdU2YXyNj77L_e9KVG5xpwA'
			},
		];
		if (nextProps.featuredImage && nextProps.artistParam) {
			let featuredImage = {
				'url': `/images/artists/${nextProps.artistParam}/photos/${nextProps.featuredImage}`,
				'toLink': `/artists/${nextProps.artistParam}/photography`
			}
			this.setState({
				'featuredImage': featuredImage
			})
		}
		if (nextProps.socialLinks) {
			socialLinks = [
				{
					'name': 'facebook',
					'url': nextProps.socialLinks.facebookUrl ? nextProps.socialLinks.facebookUrl : null
				},
				{
					'name': 'soundcloud',
					'url': nextProps.socialLinks.soundcloudUrl ? nextProps.socialLinks.soundcloudUrl : null
				},
				{
					'name': 'instagram',
					'url': nextProps.socialLinks.instagramUrl ? nextProps.socialLinks.instagramUrl : null
				},
				{
					'name': 'tumblr',
					'url': nextProps.socialLinks.tumblrUrl ? nextProps.socialLinks.tumblrUrl : null
				},
				{
					'name': 'twitter',
					'url': nextProps.socialLinks.twitterUrl ? nextProps.socialLinks.twitterUrl : null
				},
				{
					'name': 'spotify',
					'url': nextProps.socialLinks.spotifyUrl ? nextProps.socialLinks.spotifyUrl : null
				},
			];
		}
		this.setState({
			'socialLinks': socialLinks
		});
		if (nextProps.contacts) {
			let contacts = [
				{
					'title': 'Band Email',
					'email': nextProps.contacts.bandEmail ? nextProps.contacts.bandEmail : null
				},
				{
					'title': 'Booking Email',
					'email': nextProps.contacts.bookingManagerEmail ? nextProps.contacts.bookingManagerEmail : null
				},
				{
					'title': 'Manager Email',
					'email': nextProps.contacts.generalManagerEmail ? nextProps.contacts.generalManagerEmail : null
				}
			];
			this.setState({
				'contacts': contacts
			});
		}
	}

	componentWillUnmount() {
		OverlayStore.removeChangeListener(this.onChange);
	}

	toggleOverlay() {
		OverlayActions.toggleOverlay();
	}

	onChange() {
		this.setState({
			overlay: OverlayStore.getOverlay()
		})
	}

	render() {
		return (
			<div className="side-bar small-12 medium-4 large-3 columns text-center">
				<div className="logo-static" key="logoStatic" onClick={this.toggleOverlay}>
					<img src="/images/logo_transparent.png" className="hover"/>
				</div>
				<aside>
					<div className="row small-up-3 push-top-20px">
						<Animation transitionName="slide-top" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
							{
								this.props.socialLinks &&
								<p className="lead" key={'linksDescriptor'}>{`${this.props.artistName}'s Links`}</p>
							}
						</Animation>
						<Animation transitionName="slide-top" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
							{
								this.state.socialLinks.map((link, i) =>
									<a key={i} className={`column text-center social-button-alt ${link.url ? '' : 'disabled'}`} href={link.url} target="_blank">
										<i className={link.name}></i>
										<h6>{link.followers}</h6>
										<p><small>{link.name.toUpperCase()}</small></p>
										<br/>
									</a>
								)
							}
						</Animation>
					</div>
					<br/>
					<div className="row column push-top-20px">
						<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionAppear={true} transitionAppearTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
							{
								!this.props.siteWideFeaturedImage && this.state.featuredImage &&
								<p key={'featuredImage'}><Link to={this.state.featuredImage.toLink}><img src={this.state.featuredImage.url} alt="Featured Photography" className="hover shadow"/></Link></p>
							}
							{
								this.props.siteWideFeaturedImage && this.state.loadTimeoutComplete &&
								<p key={'siteWideFeaturedImage'}><a href="/images/featured-image.jpg"><img src="/images/featured-image.jpg" alt="Featured Photography" className="hover shadow"/></a></p>
							}
						</Animation>
					</div>
					<br/>
					{
						this.state.contacts &&
						<div className="row column push-top-20px">
							<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
								{
									this.state.contacts.map((contact, i) =>
										<div key={i} className="contact-list">
											<p className="lead">{contact.title}</p>
											<h5><a href={`mailto:${contact.email}`}>{contact.email}</a></h5>
										</div>
									)
								}
							</Animation>
						</div>
					}
					<br/>
					<Animation transitionName="fade" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={500} transitionLeave={true} transitionLeaveTimeout={500}>
						{
							this.props.showSpotlight &&
							<div key={'spotlight'} className="row column push-top-20px">
								{
									this.state.featuredAlbums.map((album, i) =>
										<div key={i} className="media-object">
											<div className="media-object-section">
												<img className="thumbnail hover shadow" src={`/images/artists/${album.Artist.param}/albumCovers/150-${album.Files[0].name}`}/>
											</div>
											<div className="media-object-section text-left">
												<h5>{album.caption}</h5>
												<h6>{formatDate(album.releaseDate)}</h6>
											</div>
										</div>
									)
								}
							</div>
						}
					</Animation>
				</aside>
			</div>
		)
	}
}

SideBar.propTypes = {
	'featuredImage': React.PropTypes.string,
	'showSpotlight': React.PropTypes.bool,
	'siteWideFeaturedImage': React.PropTypes.bool,
	'socialLinks': React.PropTypes.object,
	'contacts': React.PropTypes.object,
	'artistName': React.PropTypes.string,
	'artistParam': React.PropTypes.string
}

SideBar.defaultProps = {
	'showSpotlight': true,
	'siteWideFeaturedImage': false
}