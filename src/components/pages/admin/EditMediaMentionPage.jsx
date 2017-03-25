'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, TextArea, Select, DatePicker} from '../../../library/validations';
import {handlers} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import ArtistActions from '../../../actions/ArtistActions';
import MediaMentionService from '../../../services/MediaMentionService';

const mapStateToProps = (state) => {
	return {
		'artists': state.artists
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'getArtist': ArtistActions.getById,
		'getArtists': ArtistActions.getAll
	}, dispatch);
}

class EditMediaMentionPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'albumReleases': [],
			'mediaMention': {},
			'newMediaMention': false
        }

		this.handleArtistChange = this.handleArtistChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Media Mention';
		if (this.props.params.mediaMentionId) {
			MediaMentionService.get(this.props.params.mediaMentionId).then((mediaMention) => {
				this.props.getArtist(mediaMention.ArtistId).then((artist) => {
					this.setState({
						'albumReleases': artist.AlbumReleases,
						'mediaMention': mediaMention
					});
				});
			}).catch(() => {
				this.showAlert('mediaMentionNotFound');
				browserHistory.push('/profile');
			});
		} else {
			this.setState({
				'newMediaMention': true
			});
		}
    }

	handleArtistChange(e) {
		let mediaMention = this.state.mediaMention;
		mediaMention.ArtistId = e.target.value;
		this.props.getArtist(e.target.value).then((artist) => {
			this.setState({
				'albumReleases': artist.AlbumReleases,
				'mediaMention': mediaMention
			});
		});
	}

	handleInputChange(e) {
		this.setState({
			'mediaMention': handlers.updateInput(e, this.state.mediaMention)
		});
	}

	handleSubmit(e) {
		let mediaMention = this.state.mediaMention;
		if (this.state.newMediaMention) {
			MediaMentionService.create(mediaMention).then((response) => {
				this.showAlert('mediaMentionCreated');
				browserHistory.push('/profile');
			});
		} else {
			MediaMentionService.update(mediaMention.id, mediaMention).then((response) => {
				this.showAlert('mediaMentionUpdated');
				browserHistory.push('/profile');
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'mediaMentionNotFound': () => {
				this.props.addAlert({
					'title': 'Media Mention Not Found',
					'message': `A media mention with id ${this.props.params.mediaMentionId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'mediaMentionCreated': () => {
				this.props.addAlert({
					'title': 'New Media Mention Created',
					'message': 'A new media mention was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'mediaMentionUpdated': () => {
				this.props.addAlert({
					'title': 'Media Mention Updated',
					'message': `Media Mention with id of ${this.state.mediaMention.id} was updated successfully.`,
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
						this.state.newMediaMention ?
						<h1 className="push-bottom-2x">Add New Media Mention</h1> :
						<h1 className="push-bottom-2x">Edit Media Mention: <strong>{this.state.mediaMention.title}</strong></h1>
					}
					<hr />
					<Form name="mediaMentionForm" submitText={this.state.newMediaMention ? 'Create Media Mention' : 'Update Media Mention'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Title</label>
								<Input type="text" name="title" value={this.state.mediaMention.title} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Artist</label>
								<Select name="ArtistId" value={this.state.mediaMention.ArtistId} handleInputChange={this.handleArtistChange} required={true}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.id}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Album Release</label>
								<Select name="AlbumReleaseId" value={this.state.mediaMention.AlbumReleaseId} handleInputChange={this.handleInputChange}>
									<option value="">--Select--</option>
									{
										this.state.albumReleases.map((albumRelease, i) =>
											<option key={i} value={albumRelease.id}>{albumRelease.title}</option>
										)
									}
								</Select>
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Author</label>
								<Input type="text" name="author" value={this.state.mediaMention.author} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Link Url</label>
								<Input type="text" name="linkUrl" value={this.state.mediaMention.linkUrl} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Date</label>
								<DatePicker name="date" value={this.state.mediaMention.date} handleInputChange={this.handleInputChange} required={true}/>
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 columns">
								<label className="required">Text</label>
								<TextArea type="text" name="text" value={this.state.mediaMention.text} handleInputChange={this.handleInputChange} required={true} />
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMediaMentionPage);
