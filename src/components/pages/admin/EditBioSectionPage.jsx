'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, TextArea, Select} from '../../../library/validations';
import {handlers} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import ArtistActions from '../../../actions/ArtistActions';
import BioSectionService from '../../../services/BioSectionService';

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

class EditBioSectionPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'bioSection': {
				'content': ['']
			},
			'newBioSection': false
        }

		this.addParagraph = this.addParagraph.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleParagraphChange = this.handleParagraphChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Bio Section';
		if (this.props.params.bioSectionId) {
			BioSectionService.get(this.props.params.bioSectionId).then((bioSection) => {
				this.setState({
					'bioSection': bioSection
				});
			}).catch(() => {
				this.showAlert('bioSectionNotFound');
				browserHistory.push('/profile');
			});
		} else {
			this.setState({
				'newBioSection': true
			});
		}
    }

	addParagraph(e) {
		e.preventDefault();
		let bioSection = this.state.bioSection;
		bioSection.content.push('');
		console.log(bioSection.content);
		this.setState({
			'bioSection': bioSection
		});
	}

	removeParagraph(index, e) {
		e.preventDefault();
		console.log(index);
		let bioSection = this.state.bioSection;
		bioSection.content.splice(index, 1);
		this.setState({
			'bioSection': bioSection
		});
	}

	handleInputChange(e) {
		this.setState({
			'bioSection': handlers.updateInput(e, this.state.bioSection)
		});
	}

	handleParagraphChange(e) {
		e.preventDefault();
		let bioSection = this.state.bioSection;
		let index = parseInt(e.target.name, 10);
		bioSection.content[index] = e.target.value;
		this.setState({
			'bioSection': bioSection
		});
	}

	handleSubmit(e) {
		let bioSection = this.state.bioSection;
		if (this.state.newBioSection) {
			BioSectionService.create(bioSection).then((response) => {
				this.showAlert('bioSectionCreated');
				browserHistory.push('/profile');
			});
		} else {
			BioSectionService.update(bioSection.id, bioSection).then((response) => {
				this.showAlert('bioSectionUpdated');
				browserHistory.push('/profile');
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'bioSectionNotFound': () => {
				this.props.addAlert({
					'title': 'Bio Section Not Found',
					'message': `A bio section with id ${this.props.params.bioSectionId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'bioSectionCreated': () => {
				this.props.addAlert({
					'title': 'New Bio Section Created',
					'message': 'A new bio section was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'bioSectionUpdated': () => {
				this.props.addAlert({
					'title': 'Bio Section Updated',
					'message': `Bio from ${this.state.bioSection.sourceName} was updated successfully.`,
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
						this.state.newBioSection ?
						<h1 className="push-bottom-2x">Add New Bio Section</h1> :
						<h1 className="push-bottom-2x">Edit Bio Section: <strong>{this.state.bioSection.title}</strong></h1>
					}
					<hr />
					<Form name="bioSectionForm" submitText={this.state.newBioSection ? 'Create Bio Section' : 'Update Bio Section'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Artist</label>
								<Select name="ArtistId" value={this.state.bioSection.ArtistId} handleInputChange={this.handleInputChange} required={true}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.id}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Source Name</label>
								<Input type="text" name="sourceName" value={this.state.bioSection.sourceName} handleInputChange={this.handleInputChange} required={true} />
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Source Url</label>
								<Input type="text" name="sourceUrl" value={this.state.bioSection.sourceUrl} handleInputChange={this.handleInputChange} required={true} />
							</div>
						</div>
						<div className="row">
							{
								this.state.bioSection.content.map((paragraph, i) =>
									<div className="form-group small-12 columns" key={i}>
										<label className={i === 0 ? 'required' : ''}>Content Paragraph {i + 1}</label>
										<TextArea type="text" name={`${i}`} value={this.state.bioSection.content[i]} handleInputChange={this.handleParagraphChange} required={i === 0} />
										{
											i > 0 &&
											<button className="button error push-top" onClick={this.removeParagraph.bind(this, i)}><i className="fa fa-minus"></i></button>
										}
									</div>
								)
							}
							<div className="form-group small-12 columns text-right push-bottom-2x">
								<button className="button success" onClick={this.addParagraph}><i className="fa fa-plus"></i> Add Paragraph</button>
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBioSectionPage);
