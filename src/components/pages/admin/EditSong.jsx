'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Form, Input, TextArea, Select, FileUpload} from '../../../library/validations';
import {handlers, uploadFiles} from '../../../library/utilities';
import {AlertActions} from '../../../library/alerts';
import AlbumReleaseActions from '../../../actions/AlbumReleaseActions';
import ArtistActions from '../../../actions/ArtistActions';
import SongService from '../../../services/SongService';
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
		'getArtist': ArtistActions.getById,
		'getArtists': ArtistActions.getAll
	}, dispatch);
}

class EditSong extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
			'song': {},
			'newSong': false,
			'selectedArtist': undefined,
			'albumReleases': [],
			'newFilesUploaded': false
        }

		this.handleArtistChange = this.handleArtistChange.bind(this);
		this.handleDeleteFile = this.handleDeleteFile.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
		this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {
		this.props.getArtists();
        document.title = 'Tree Machine Records | Edit Song';
		if (this.props.params.songId) {
			SongService.get(this.props.params.songId).then((song) => {
				this.props.getArtist(song.ArtistId).then((artist) => {
					this.setState({
						'albumReleases': artist.AlbumReleases,
						'selectedArtist': artist.param,
						'song': song
					});
				});
			}).catch(() => {
				this.showAlert('songNotFound');
				this.props.history.push('/dashboard');
			});
		} else {
			this.setState({
				'newSong': true
			});
		}
    }

	handleArtistChange(e) {
		let artistParam = e.target.value;
		let song = this.state.song;
		this.props.getArtist(artistParam).then((artist) => {
			song.ArtistId = artist.id;
			this.setState({
				'albumReleases': artist.AlbumReleases,
				'selectedArtist': artistParam,
				'song': song
			});
		});
	}

	handleDeleteFile(fileId) {
		FileService.remove(fileId).then(() => {
			this.showAlert('fileRemoved');
		});
	}

	handleFileUpload(files) {
		let song = this.state.song;
		this.uploadFiles(files).then((responses) => {
			responses = responses.map((response) => {
				response = {
					'name': response.data.file.name,
					'size': response.data.file.size,
					'type': response.data.file.type
				};
				return response;
			});
			song.File = responses[0];
			this.setState({
				'song': song,
				'newFilesUploaded': true,
				'skuIsDisabled': true
			});
		});
	}

	uploadFiles(files) {
		let directoryPath = `artists/${this.state.selectedArtist}/songs/`;
		return uploadFiles(files, '/files/add', directoryPath, {
			'identifier': 'download'
		});
	}

	handleInputChange(e) {
		this.setState({
			'song': handlers.updateInput(e, this.state.song)
		});
	}

	handleSubmit(e) {
		let song = this.state.song;
		song.fileName = this.state.song.File.name;
		if (this.state.newSong) {
			SongService.create(song).then((response) => {
				FileService.create({
					'SongId': response.id,
					'identifier': 'download',
					'locationUrl': `artists/${this.state.selectedArtist}/song/${this.state.song.File.name}`,
					'name': this.state.song.File.name,
					'size': this.state.song.File.size,
					'type': this.state.song.File.type
				}).then(() => {
					this.showAlert('songCreated');
					this.props.history.push('/dashboard');
				})
			});
		} else {
			SongService.update(song.id, song).then((response) => {
				if (this.state.newFilesUploaded) {
					FileService.create({
						'SongId': response.id,
						'identifier': 'download',
						'locationUrl': `artists/${this.state.selectedArtist}/song/${this.state.song.File.name}`,
						'name': this.state.song.File.name,
						'size': this.state.song.File.size,
						'type': this.state.song.File.type
					}).then(() => {
						this.showAlert('songUpdated');
						this.props.history.push('/dashboard');
					});
				} else {
					this.showAlert('songUpdated');
					this.props.history.push('/dashboard');
				}
			});
		}
	}

	showAlert(selector) {
		const alerts = {
			'songNotFound': () => {
				this.props.addAlert({
					'title': 'Song Not Found',
					'message': `A song with id ${this.props.params.songId} was not found.`,
					'type': 'error',
					'delay': 3000
				});
			},
			'songCreated': () => {
				this.props.addAlert({
					'title': 'New Song Created',
					'message': 'A new song was successfully created.',
					'type': 'success',
					'delay': 3000
				});
			},
			'songUpdated': () => {
				this.props.addAlert({
					'title': 'Song Updated',
					'message': `Song with id of ${this.state.song.id} was updated successfully.`,
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
						this.state.newSong ?
						<h1 className="push-bottom-2x">Add New Song</h1> :
						<h1 className="push-bottom-2x">Edit Song: <strong>{this.state.song.title}</strong></h1>
					}
					<hr />
					<Form name="songForm" submitText={this.state.newSong ? 'Create Song' : 'Update Song'} handleSubmit={this.handleSubmit}>
						<div className="row">
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Title</label>
								<Input type="text" name="title" value={this.state.song.title} handleInputChange={this.handleInputChange} required={true}/>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Artist</label>
								<Select name="selectedArtist" value={this.state.selectedArtist} handleInputChange={this.handleArtistChange} required={true}>
									<option value="">--Select--</option>
									{
										this.props.artists.map((artist, i) =>
											<option key={i} value={artist.param}>{artist.name}</option>
										)
									}
								</Select>
							</div>
							<div className="form-group small-12 medium-4 columns">
								<label className="required">Release Title</label>
								<Select name="AlbumReleaseId" value={this.state.song.AlbumReleaseId} handleInputChange={this.handleInputChange} required={true}>
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
								<label className="required">Song File</label>
								<FileUpload name="songFile" value={this.state.song.File} handleFileUpload={this.handleFileUpload} handleDeleteFile={this.handleDeleteFile} maxFiles={1} required={1} disabled={!this.state.selectedArtist}/>
							</div>
						</div>
					</Form>
				</div>
			</div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditSong));
