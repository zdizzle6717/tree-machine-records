'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, TextArea, Select} from '../../../library/validations';
import {handlers} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import ArtistActions from '../../../actions/ArtistActions';
import EmbeddableMediaService from '../../../services/EmbeddableMediaService';

const mapStateToProps = (state) => {
	return {
		'artists': state.artists
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'getArtists': ArtistActions.getAll
	}, dispatch);
}

class EditEmbeddableMediaPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'embeddableMedia': {},
			'newEmbeddableMedia': false
        }

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Embeddable Media';
		if (this.props.params.embeddableMediaId) {
			EmbeddableMediaService.get(this.props.params.embeddableMediaId).then((embeddableMedia) => {
				this.setState({
					'embeddableMedia': embeddableMedia
				});
			}).catch(() => {
				this.showAlert('embeddableMediaNotFound');
				browserHistory.push('/profile');
			});
		} else {
			this.setState({
				'newEmbeddableMedia': true
			});
		}
    }

	handleInputChange(e) {
		this.setState({
			'embeddableMedia': handlers.updateInput(e, this.state.embeddableMedia)
		});
	}

	handleSubmit(e) {
		let embeddableMedia = this.state.embeddableMedia;
		if (this.state.newEmbeddableMedia) {
			EmbeddableMediaService.create(embeddableMedia).then((response) => {
				this.showAlert('embeddableMediaCreated');
				browserHistory.push('/profile');
			});
		} else {
			EmbeddableMediaService.update(embeddableMedia.id, embeddableMedia).then((response) => {
				this.showAlert('embeddableMediaUpdated');
				browserHistory.push('/profile');
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'embeddableMediaNotFound': () => {
				this.props.addAlert({
					'title': 'Embeddable Media Not Found',
					'message': `An embeddable media with id ${this.props.params.embeddableMediaId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'embeddableMediaCreated': () => {
				this.props.addAlert({
					'title': 'New Embeddable Media Created',
					'message': 'A new embeddable media was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'embeddableMediaUpdated': () => {
				this.props.addAlert({
					'title': 'Embeddable Media Updated',
					'message': `Embeddable Media with id of ${this.state.embeddableMedia.id} was updated successfully.`,
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
						this.state.newEmbeddableMedia ?
						<h1 className="push-bottom-2x">Add New Embeddable Media</h1> :
						<h1 className="push-bottom-2x">Edit Embeddable Media: <strong>{this.state.embeddableMedia.title}</strong></h1>
					}
					<hr />
					<Form name="embeddableMediaForm" submitText={this.state.newEmbeddableMedia ? 'Create Embeddable Media' : 'Update Embeddable Media'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Artist</label>
								<Select name="ArtistId" value={this.state.embeddableMedia.ArtistId} handleInputChange={this.handleInputChange} required={true}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.id}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Title</label>
								<Input type="text" name="title" value={this.state.embeddableMedia.title} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Type</label>
								<Input type="text" name="type" value={this.state.embeddableMedia.type} handleInputChange={this.handleInputChange} required={true}/>
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Link Url</label>
								<Input type="text" name="linkUrl" value={this.state.embeddableMedia.linkUrl} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Embed Url</label>
								<Input type="text" name="embedUrl" value={this.state.embeddableMedia.embedUrl} handleInputChange={this.handleInputChange} required={true}/>
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEmbeddableMediaPage);
