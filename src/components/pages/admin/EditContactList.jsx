'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Form, Input, TextArea, Select} from '../../../library/validations';
import {handlers} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import ArtistActions from '../../../actions/ArtistActions';
import ContactListService from '../../../services/ContactListService';

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

class EditContactList extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'contactList': {},
			'newContactList': false
        }

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Contact List';
		if (this.props.params.contactListId) {
			ContactListService.get(this.props.params.contactListId).then((contactList) => {
				this.setState({
					'contactList': contactList
				});
			}).catch(() => {
				this.showAlert('contactListNotFound');
				this.props.history.push('/dashboard');
			});
		} else {
			this.setState({
				'newContactList': true
			});
		}
    }

	handleInputChange(e) {
		this.setState({
			'contactList': handlers.updateInput(e, this.state.contactList)
		});
	}

	handleSubmit(e) {
		let contactList = this.state.contactList;
		if (this.state.newContactList) {
			ContactListService.create(contactList).then((response) => {
				this.showAlert('contactListCreated');
				this.props.history.push('/dashboard');
			});
		} else {
			ContactListService.update(contactList.id, contactList).then((response) => {
				this.showAlert('contactListUpdated');
				this.props.history.push('/dashboard');
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'contactListNotFound': () => {
				this.props.addAlert({
					'title': 'Contact List Not Found',
					'message': `A contact list with id ${this.props.params.contactListId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'contactListCreated': () => {
				this.props.addAlert({
					'title': 'New Contact List Created',
					'message': 'A new contact list was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'contactListUpdated': () => {
				this.props.addAlert({
					'title': 'Contact List Updated',
					'message': `Contact List with id of ${this.state.contactList.id} was updated successfully.`,
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
						this.state.newContactList ?
						<h1 className="push-bottom-2x">Add New Contact List</h1> :
						<h1 className="push-bottom-2x">Edit Contact List: <strong>{this.state.contactList.title}</strong></h1>
					}
					<hr />
					<Form name="contactListForm" submitText={this.state.newContactList ? 'Create Contact List' : 'Update Contact List'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Artist</label>
								<Select name="ArtistId" value={this.state.contactList.ArtistId} handleInputChange={this.handleInputChange} required={true}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.id}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Band Email</label>
								<Input type="text" name="bandEmail" value={this.state.contactList.bandEmail || ''} handleInputChange={this.handleInputChange} validate="email"/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Band Phone</label>
								<Input type="text" name="bandPhone" value={this.state.contactList.bandPhone || ''} handleInputChange={this.handleInputChange} validate="foreignPhone"/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Band Mailing Address</label>
								<Input type="text" name="bandMailingAddress" value={this.state.contactList.bandMailingAddress || ''} handleInputChange={this.handleInputChange} />
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-3 columns">
								<label>Booking Manager Email</label>
								<Input type="text" name="bookingManagerEmail" value={this.state.contactList.bookingManagerEmail || ''} handleInputChange={this.handleInputChange} validate="email"/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>Booking Manager Phone</label>
								<Input type="text" name="bookingManagerPhone" value={this.state.contactList.bookingManagerPhone || ''} handleInputChange={this.handleInputChange} validate="foreignPhone"/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label className="required">General Manager Email</label>
								<Input type="text" name="generalManagerEmail" value={this.state.contactList.generalManagerEmail || ''} handleInputChange={this.handleInputChange} validate="email" required={true}/>
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label>General Manager Phone</label>
								<Input type="text" name="generalManagerPhone" value={this.state.contactList.generalManagerPhone || ''} handleInputChange={this.handleInputChange} />
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditContactList));
