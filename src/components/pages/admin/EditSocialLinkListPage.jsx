'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, TextArea, Select} from '../../../library/validations';
import {handlers} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import ArtistActions from '../../../actions/ArtistActions';
import SocialLinkListService from '../../../services/SocialLinkListService';

const mapStateToProps = (state) => {
	return {
		'artists': state.artists
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'getArtists': ArtistActions.getAll
	}, dispatch);
}

class EditSocialLinkListPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'socialLinkList': {},
			'newSocialLinkList': false
        }

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Social Link List';
		if (this.props.params.socialLinkListId) {
			SocialLinkListService.get(this.props.params.socialLinkListId).then((socialLinkList) => {
				this.setState({
					'socialLinkList': socialLinkList
				});
			}).catch(() => {
				this.showAlert('socialLinkListNotFound');
				browserHistory.push('/profile');
			});
		} else {
			this.setState({
				'newSocialLinkList': true
			});
		}
    }

	handleInputChange(e) {
		this.setState({
			'socialLinkList': handlers.updateInput(e, this.state.socialLinkList)
		});
	}

	handleSubmit(e) {
		let socialLinkList = this.state.socialLinkList;
		if (this.state.newSocialLinkList) {
			SocialLinkListService.create(socialLinkList).then((response) => {
				this.showAlert('socialLinkListCreated');
				browserHistory.push('/profile');
			});
		} else {
			SocialLinkListService.update(socialLinkList.id, socialLinkList).then((response) => {
				this.showAlert('socialLinkListUpdated');
				browserHistory.push('/profile');
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'socialLinkListNotFound': () => {
				this.props.addAlert({
					'title': 'Social Link List Not Found',
					'message': `A social link list with id ${this.props.params.socialLinkListId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'socialLinkListCreated': () => {
				this.props.addAlert({
					'title': 'New Social Link List Created',
					'message': 'A new social link list was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'socialLinkListUpdated': () => {
				this.props.addAlert({
					'title': 'Social Link List Updated',
					'message': `Social Link List with id of ${this.state.socialLinkList.id} was updated successfully.`,
					'type': 'success',
					'delay': 3000
				});
			}
		}

		return alerts[selector]();
	}

    render() {
        return (
			<div className="content-wrapper">
				<div className="row">
					{
						this.state.newSocialLinkList ?
						<h1 className="push-bottom-2x">Add New Social Link List</h1> :
						<h1 className="push-bottom-2x">Edit Social Link List: <strong>{this.state.socialLinkList.id}</strong></h1>
					}
					<hr />
					<Form name="socialLinkListForm" submitText={this.state.newSocialLinkList ? 'Create Social Link List' : 'Update Social Link List'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Artist</label>
								<Select name="ArtistId" value={this.state.socialLinkList.ArtistId} handleInputChange={this.handleInputChange} required={true}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.id}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Facebook Url</label>
								<Input type="text" name="facebookUrl" value={this.state.socialLinkList.facebookUrl} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Twitter Url</label>
								<Input type="text" name="twitterUrl" value={this.state.socialLinkList.twitterUrl} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Instagram Url</label>
								<Input type="text" name="instagramUrl" value={this.state.socialLinkList.instagramUrl} handleInputChange={this.handleInputChange} />
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-3 columns">
								<label>Soundcloud Url</label>
								<Input type="text" name="soundcloudUrl" value={this.state.socialLinkList.soundcloudUrl} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Bandcamp Url</label>
								<Input type="text" name="bandcampUrl" value={this.state.socialLinkList.bandcampUrl} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Homepage Url</label>
								<Input type="text" name="homepageUrl" value={this.state.socialLinkList.homepageUrl} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Tumblr Url</label>
								<Input type="text" name="tumblrUrl" value={this.state.socialLinkList.tumblrUrl} handleInputChange={this.handleInputChange} />
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label>Spotify Url</label>
								<Input type="text" name="spotifyUrl" value={this.state.socialLinkList.spotifyUrl} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label>Youtube Url</label>
								<Input type="text" name="youtubeUrl" value={this.state.socialLinkList.youtubeUrl} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label>Display Flags</label>
								<Input type="number" name="displayFlag" value={this.state.socialLinkList.displayFlag} handleInputChange={this.handleInputChange}/>
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSocialLinkListPage);
