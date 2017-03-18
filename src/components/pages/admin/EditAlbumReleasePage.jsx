'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link, browserHistory } from 'react-router';
import {Form, Input, Select, TextArea, CheckBox, RadioGroup, DatePicker, FileUpload} from '../../../library/validations';
import {handlers, uploadFiles} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import AlbumReleaseActions from '../../../actions/AlbumReleaseActions';
import ArtistActions from '../../../actions/ArtistActions';
import FileService from '../../../services/FileService';

const mapStateToProps = (state) => {
	return {
		'albumRelease': state.albumRelease,
		'artists': state.artists
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'getAlbumRelease': AlbumReleaseActions.get,
		'getArtist': ArtistActions.getById,
		'getArtists': ArtistActions.getAll,
		'createAlbumRelease': ArtistActions.create,
		'updateAlbumRelease': ArtistActions.update
	}, dispatch);
}

class EditAlbumReleasePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'albumRelease': {},
			'newAlbumRelease': false,
			'selectedArtist': undefined,
			'newFiles': []
        }

		this.handleArtistChange = this.handleArtistChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Album Release';
		if (this.props.params.discographyParam) {
			this.props.getAlbumRelease(this.props.params.discographyParam).then((albumRelease) => {
				this.setState({
					'albumRelease': albumRelease
				});
			}).catch(() => {
				this.showAlert('albumReleaseNotFound');
				browserHistory.push('/profile');
			});
		} else {
			this.setState({
				'newAlbumRelease': true
			});
		}
    }

	handleArtistChange(e) {
		this.props.getArtist(e.target.value).then((artist) => {
			this.setState({
				'selectedArtist': artist.param
			});
		})
	}

	handleInputChange(e) {
		this.setState({
			'albumRelease': handlers.updateInput(e, this.state.albumRelease)
		});
	}

	handleFileUpload(files) {
		let albumRelease = this.state.albumRelease;
		let newFiles = this.state.newFiles;
		this.uploadFiles(files).then((responses) => {
			responses = responses.map((response, i) => {
				response = {
					'name': response.data.file.name,
					'size': response.data.file.size,
					'type': response.data.file.type
				};
				return response;
			});
			let newFileList = responses.concat(albumRelease.Files);
			albumRelease.Files = newFileList;
			newFiles = newFiles.concat(responses);
			this.setState({
				'albumRelease': albumRelease,
				'newFiles': newFiles
			});
			this.showAlert('uploadSuccess');
		});
	}

	uploadFiles(files) {
		let directoryPath = `artists/${this.state.selectedArtist}/albumCovers/`;
		return uploadFiles(files, '/files/add', directoryPath, {
			'identifier': 'albumCover'
		});
	}

	handleSubmit(e) {
		let albumRelease = this.state.albumRelease;
		if (this.state.newAlbumRelease) {
			// TODO: Double check that FileService data values are valid
			this.props.createAlbumRelease(albumRelease).then((response) => {
				FileService.create({
					'AlbumReleaseId': response.id,
					'identifier': 'albumCover',
					'locationUrl': `artists/${this.state.selectedArtist}/albumCovers/${this.state.albumRelease.Files[0].name}`,
					'name': this.state.albumRelease.Files[0].name,
					'size': this.state.albumRelease.Files[0].size,
					'type': this.state.albumRelease.Files[0].type
				}).then(() => {
					this.showAlert('albumReleaseCreated');
					browserHistory.push('/profile');
				});
			});
		} else {
			this.props.updateAlbumRelease(albumRelease.id, albumRelease).then((response) => {
				let newFiles = this.state.newFiles;
				if (newFiles.length > 0) {
					FileService.create({
						'AlbumReleaseId': response.id,
						'identifier': 'albumCover',
						'locationUrl': `artists/${this.state.selectedArtist}/albumCovers/${this.state.albumRelease.Files[0].name}`,
						'name': this.state.albumRelease.Files[0].name,
						'size': this.state.albumRelease.Files[0].size,
						'type': this.state.albumRelease.Files[0].type
					}).then(() => {
						this.showAlert('albumReleaseUpdated');
						browserHistory.push('/profile');
					});
				} else {
					this.showAlert('albumReleaseUpdated');
					browserHistory.push('/profile');
				}
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'albumReleaseNotFound': () => {
				this.props.addAlert({
					'title': 'Album Release Not Found',
					'message': `An album with params ${this.props.params.discographyParam} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'albumReleaseCreated': () => {
				this.props.addAlert({
					'title': 'New Album Created',
					'message': 'A new album release was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'albumReleaseUpdated': () => {
				this.props.addAlert({
					'title': 'Discography Updated',
					'message': `${this.state.albumRelease.title} was updated successfully.`,
					'type': 'success',
					'delay': 3000
				});
			},
			'uploadSuccess': () => {
				this.props.addAlert({
					'title': 'Upload Success',
					'message': `New file successfully uploaded to artist, ${this.state.selectedArtist}`,
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
						this.state.newAlbumRelease ?
						<h1 className="push-bottom-2x">Add New Album Release</h1> :
						<h1 className="push-bottom-2x">Edit Album Release: <strong>{this.state.albumRelease.title}</strong></h1>
					}
					<hr />
					<Form name="discographyForm" submitText={this.state.newAlbumRelease ? 'Create Discography' : 'Update Discography'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Title</label>
								<Input type="text" name="title" value={this.state.albumRelease.title} handleInputChange={this.handleInputChange} validate="name" required={true} />
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Param</label>
								<Input type="text" name="param" value={this.state.albumRelease.param} handleInputChange={this.handleInputChange} validate="name" required={true} />
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Catalogue Number</label>
								<Input type="text" name="catalogueNumber" value={this.state.albumRelease.catalogueNumber} handleInputChange={this.handleInputChange} required={true} />
							</div>
							<div className="form-group small-12 medium-3 columns">
								<label className="required">Artist</label>
								<Select name="ArtistId" value={this.state.albumRelease.ArtistId} handleInputChange={this.handleArtistChange} required={true}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.id}>{artist.name}</option>
										)
									}
								</Select>
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Release Date</label>
								<DatePicker name="releaseDate" value={this.state.albumRelease.releaseDate} handleInputChange={this.handleInputChange}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">iTunes URL</label>
								<Input type="text" name="iTunesUrl" value={this.state.albumRelease.iTunesUrl} handleInputChange={this.handleInputChange} required={true} />
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Spotify URL</label>
								<Input type="text" name="spotifyUrl" value={this.state.albumRelease.spotifyUrl} handleInputChange={this.handleInputChange} required={true} />
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Caption</label>
								<TextArea type="text" name="caption" value={this.state.albumRelease.caption} handleInputChange={this.handleInputChange} required={true} />
							</div>
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Summary</label>
								<TextArea type="text" name="summary" value={this.state.albumRelease.summary} rows="5" handleInputChange={this.handleInputChange} required={true} />
							</div>
						</div>
						<div className="row">
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Album Cover</label>
								<FileUpload name="albumCover" value={this.state.albumRelease.Files} handleFileUpload={this.handleFileUpload} singleFile={false} maxFiles={1} required={1} disabled={!this.state.selectedArtist}/>
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAlbumReleasePage);
