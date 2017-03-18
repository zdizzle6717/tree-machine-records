'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, TextArea, Select} from '../../../library/validations';
import {handlers} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import ArtistActions from '../../../actions/ArtistActions';
import OriginService from '../../../services/OriginService';

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

class EditOriginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'origin': {},
			'newOrigin': false
        }

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Origin';
		if (this.props.params.originId) {
			OriginService.get(this.props.params.originId).then((origin) => {
				this.setState({
					'origin': origin
				});
			}).catch(() => {
				this.showAlert('originNotFound');
				browserHistory.push('/profile');
			});
		} else {
			this.setState({
				'newOrigin': true
			});
		}
    }

	handleInputChange(e) {
		this.setState({
			'origin': handlers.updateInput(e, this.state.origin)
		});
	}

	handleSubmit(e) {
		let origin = this.state.origin;
		if (this.state.newOrigin) {
			OriginService.create(origin).then((response) => {
				this.showAlert('originCreated');
				browserHistory.push('/profile');
			});
		} else {
			OriginService.update(origin.id, origin).then((response) => {
				this.showAlert('originUpdated');
				browserHistory.push('/profile');
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'originNotFound': () => {
				this.props.addAlert({
					'title': 'Origin Not Found',
					'message': `An origin with id ${this.props.params.originId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'originCreated': () => {
				this.props.addAlert({
					'title': 'New Origin Created',
					'message': 'A new origin was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'originUpdated': () => {
				this.props.addAlert({
					'title': 'Origin Updated',
					'message': `Origin with id of ${this.state.origin.id} was updated successfully.`,
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
						this.state.newOrigin ?
						<h1 className="push-bottom-2x">Add New Origin</h1> :
						<h1 className="push-bottom-2x">Edit Origin: <strong>{this.state.origin.title}</strong></h1>
					}
					<hr />
					<Form name="originForm" submitText={this.state.newOrigin ? 'Create Origin' : 'Update Origin'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Artist</label>
								<Select name="ArtistId" value={this.state.origin.ArtistId} handleInputChange={this.handleInputChange} required={true}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.id}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Country</label>
								<Input type="text" name="country" value={this.state.origin.country} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Country Code</label>
								<Input type="text" name="countryCode" value={this.state.origin.countryCode} handleInputChange={this.handleInputChange} required={true}/>
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label>City</label>
								<Input type="text" name="city" value={this.state.origin.city} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">State/Province</label>
								<Input type="text" name="stateProvince" value={this.state.origin.stateProvince} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">State/Province Code</label>
								<Input type="text" name="stateProvinceCode" value={this.state.origin.stateProvinceCode} handleInputChange={this.handleInputChange} required={true}/>
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOriginPage);
