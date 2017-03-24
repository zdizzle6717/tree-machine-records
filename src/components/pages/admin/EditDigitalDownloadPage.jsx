'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Form, Input, TextArea, Select, FileUpload} from '../../../library/validations';
import {handlers, uploadFiles} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import AlbumReleaseActions from '../../../actions/AlbumReleaseActions';
import ArtistActions from '../../../actions/ArtistActions';
import DigitalDownloadService from '../../../services/DigitalDownloadService';
import FileService from '../../../services/FileService';

const mapStateToProps = (state) => {
	return {
		'albumReleases': state.albumReleases,
		'artists': state.artists
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'getAlbumRelease': AlbumReleaseActions.get,
		'getArtist': ArtistActions.getById,
		'getArtists': ArtistActions.getAll
	}, dispatch);
}

class EditDigitalDownloadPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'digitalDownload': {},
			'newDigitalDownload': false,
			'albumReleases': [],
			'pastedCodes': '',
			'newFilesUploaded': false,
			'selectedArtist': '',
			'fileUploaded': false
        }

		this.handleArtistChange = this.handleArtistChange.bind(this);
		this.handleDeleteFile = this.handleDeleteFile.bind(this);
		this.handleDownloadCodeChange = this.handleDownloadCodeChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Digital Download';
		if (this.props.params.digitalDownloadId) {
			DigitalDownloadService.get(this.props.params.digitalDownloadId).then((digitalDownload) => {
				this.props.getArtist(song.ArtistId).then((artist) => {
					this.setState({
						'albumReleases': artist.AlbumReleases,
						'selectedArtist': artist.param,
						'digitalDownload': digitalDownload,
						'fileUploaded': true
					});
				});
			}).catch(() => {
				this.showAlert('digitalDownloadNotFound');
				browserHistory.push('/profile');
			});
		} else {
			this.setState({
				'newDigitalDownload': true
			});
		}
    }

	handleArtistChange(e) {
		let digitalDownload = this.state.digitalDownload;
		digitalDownload.ArtistId = e.target.value;
		this.props.getArtist(e.target.value).then((artist) => {
			this.setState({
				'albumReleases': artist.AlbumReleases,
				'digitalDownload': digitalDownload,
				'selectedArtist': artist.param
			});
		});
	}

	handleDownloadCodeChange(e) {
		let digitalDownload = this.state.digitalDownload;
		let pastedCodes = e.target.value;
		pastedCodes = pastedCodes.replace(/ /g, '');
		digitalDownload.downloadCodes = pastedCodes.split(',');
		this.setState({
			'pastedCodes': pastedCodes,
			'digitalDownload': digitalDownload
		});

	}

	handleDeleteFile(fileId) {
		FileService.remove(fileId).then(() => {
			this.showAlert('fileRemoved');
		});
	}

	handleFileUpload(files) {
		let digitalDownload = this.state.digitalDownload;
		this.uploadFiles(files).then((responses) => {
			responses = responses.map((response) => {
				response = {
					'name': response.data.file.name,
					'size': response.data.file.size,
					'type': response.data.file.type
				};
				return response;
			});
			digitalDownload.File = responses[0];
			this.setState({
				'digitalDownload': digitalDownload,
				'newFilesUploaded': true,
				'skuIsDisabled': true,
				'fileUploaded': true
			});
		});
	}

	uploadFiles(files) {
		let directoryPath = `artists/${this.state.selectedArtist}/digitalDownloads/`;
		return uploadFiles(files, '/files/add', directoryPath, {
			'identifier': 'download'
		});
	}

	handleInputChange(e) {
		this.setState({
			'digitalDownload': handlers.updateInput(e, this.state.digitalDownload)
		});
	}

	handleSubmit(e) {
		let digitalDownload = this.state.digitalDownload;
		digitalDownload.fileName = this.state.digitalDownload.File.name;;
		if (this.state.newDigitalDownload) {
			DigitalDownloadService.create(digitalDownload).then((response) => {
				FileService.create({
					'AlbumReleaseId': response.id,
					'identifier': 'download',
					'locationUrl': `artists/${this.state.selectedArtist}/digitalDownload/${this.state.digitalDownload.File.name}`,
					'name': this.state.digitalDownload.File.name,
					'size': this.state.digitalDownload.File.size,
					'type': this.state.digitalDownload.File.type
				}).then(() => {
					this.showAlert('digitalDownloadCreated');
					browserHistory.push('/profile');
				})
			});
		} else {
			DigitalDownloadService.update(digitalDownload.id, digitalDownload).then((response) => {
				if (this.state.newFilesUploaded) {
					FileService.create({
						'AlbumReleaseId': response.id,
						'identifier': 'download',
						'locationUrl': `artists/${this.state.selectedArtist}/digitalDownload/${this.state.digitalDownload.File.name}`,
						'name': this.state.digitalDownload.File.name,
						'size': this.state.digitalDownload.File.size,
						'type': this.state.digitalDownload.File.type
					}).then(() => {
						this.showAlert('digitalDownloadUpdated');
						browserHistory.push('/profile');
					});
				} else {
					this.showAlert('digitalDownloadUpdated');
					browserHistory.push('/profile');
				}
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'digitalDownloadNotFound': () => {
				this.props.addAlert({
					'title': 'Digital Download Not Found',
					'message': `A digital download with id ${this.props.params.digitalDownloadId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'digitalDownloadCreated': () => {
				this.props.addAlert({
					'title': 'New Digital Download Created',
					'message': 'A new digital download was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'digitalDownloadUpdated': () => {
				this.props.addAlert({
					'title': 'Digital Download Updated',
					'message': `Digital Download with id of ${this.state.digitalDownload.id} was updated successfully.`,
					'type': 'success',
					'delay': 3000
				});
			},
			'fileRemoved': () => {
				this.props.addAlert({
					'title': 'File Deleted',
					'message': `File was successfully deleted.`,
					'type': 'info',
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
						this.state.newDigitalDownload ?
						<h1 className="push-bottom-2x">Add New Digital Download</h1> :
						<h1 className="push-bottom-2x">Edit Digital Download: <strong>{this.state.digitalDownload.title}</strong></h1>
					}
					<hr />
					<Form name="digitalDownloadForm" submitText={this.state.newDigitalDownload ? 'Create Digital Download' : 'Update Digital Download'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Title</label>
								<Input type="text" name="title" value={this.state.digitalDownload.title} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Artist</label>
								<Select name="ArtistId" value={this.state.digitalDownload.ArtistId} handleInputChange={this.handleArtistChange} required={true} disabled={this.state.fileUploaded}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.id}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Release Title</label>
								<Select name="AlbumReleaseId" value={this.state.digitalDownload.AlbumReleaseId} handleInputChange={this.handleInputChange} required={true} disabled={this.state.fileUploaded}>
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
							<div className="form-group small-12 medium-6 columns">
								<label className="required">Digital Download File</label>
								<FileUpload name="digitalDownloadFile" value={this.state.digitalDownload.File} handleFileUpload={this.handleFileUpload} handleDeleteFile={this.handleDeleteFile} maxFiles={1} required={1} disabled={!this.state.selectedArtist || !this.state.digitalDownload.AlbumReleaseId}/>
							</div>
							<div className="form-group small-12 medium-6 columns">
								<label>Download Codes (example: 'CODE123, CODE243, CODE543, etc.')</label>
								<TextArea type="text" name="pastedCodes" value={this.state.pastedCodes} handleInputChange={this.handleDownloadCodeChange} />
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDigitalDownloadPage);
